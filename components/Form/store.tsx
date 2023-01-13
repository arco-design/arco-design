import React from 'react';
import get from 'lodash/get';
import setWith from 'lodash/setWith';
import has from 'lodash/has';
import omit from 'lodash/omit';
import { cloneDeep, set, iterativelyGetKeys } from './utils';
import { isArray, isObject, isString } from '../_util/is';
import Control from './control';
import {
  FieldError,
  FormProps,
  ValidateFieldsErrors,
  FieldState,
  KeyType,
  FormValidateFn,
} from './interface';
import promisify from './promisify';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * setFieldValue: setFieldsValue, setFieldValue, setFields
 * innerSetValue: such as Input change
 * reset： 重置
 */
export type NotifyType = 'setFieldValue' | 'reset' | 'innerSetValue';

export type innerCallbackType = 'onValuesChange' | 'onSubmit' | 'onChange' | 'onSubmitFailed';

export type StoreChangeInfo<T> = {
  prev: any;
  field?: T | T[];
  isFormList?: boolean;
  ignore?: boolean;
  changeValues?: {
    [key in KeyType]: unknown;
  };
  data?: {
    errors?: FieldError;
    warnings?: React.ReactNode;
    touched?: boolean;
  };
};

class Store<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> {
  // 是否正在提交
  private isSubmitting: boolean = false;

  private registerFields: Control<FormData, FieldValue, FieldKey>[] = [];

  // 所有 form item value 的变动，都会通知这里注册到的 watcher
  private registerWatchers: (() => void)[] = [];

  // 所有 form item 内部 errors, validating, touched 状态的变化，都会通知这里注册到的 watcher
  private registerStateWatchers: (() => void)[] = [];

  // 和formControl 的 touched属性不一样。 只要被改过的字段，这里就会存储。并且不会跟随formControl被卸载而清除。
  // reset 的时候清除
  private touchedFields: { [key: string]: unknown } = {};

  private store: Partial<FormData> = {};

  private initialValues: Partial<FormData> = {};

  private callbacks: Pick<FormProps<FormData, FieldValue, FieldKey>, innerCallbackType> & {
    onValidateFail?: (errors: { [key in FieldKey]: FieldError<FieldValue> }) => void;
  } = {};

  private notifyWatchers() {
    this.registerWatchers.forEach((item) => {
      item();
    });
  }

  private notifyStateWatchers() {
    this.registerStateWatchers.forEach((item) => {
      item();
    });
  }

  private triggerValuesChange(value: Partial<FormData>) {
    if (value && Object.keys(value).length) {
      const { onValuesChange } = this.callbacks;
      onValuesChange && onValuesChange(value, this.getFields());
    }

    this.notifyWatchers();
  }

  private triggerTouchChange(value: Partial<FormData>) {
    if (value && Object.keys(value).length) {
      const { onChange } = this.callbacks;
      onChange && onChange(value, this.getFields());
    }
  }

  // 告知 form 状态改变，进行状态收集
  public innerCollectFormState = () => {
    this.notifyStateWatchers();
  };

  public innerSetCallbacks = (
    values: Pick<FormProps<FormData, FieldValue, FieldKey>, innerCallbackType> & {
      onValidateFail?: (errors: { [key in FieldKey]: FieldError<FieldValue> }) => void;
    }
  ) => {
    this.callbacks = values;
  };

  public registerStateWatcher = (item) => {
    this.registerStateWatchers.push(item);

    return () => {
      this.registerStateWatchers = this.registerStateWatchers.filter((x) => x !== item);
    };
  };

  public registerWatcher = (item) => {
    this.registerWatchers.push(item);

    return () => {
      this.registerWatchers = this.registerWatchers.filter((x) => x !== item);
    };
  };

  // 收集所有control字段，并在组件卸载时移除
  public registerField = (item: Control<FormData, FieldValue, FieldKey>) => {
    this.registerFields.push(item);
    this.notifyWatchers();

    return () => {
      this.registerFields = this.registerFields.filter((x) => x !== item);
      this.notifyWatchers();
    };
  };

  // hasField为true时，只返回传入field属性的control实例
  private getRegisteredFields = (hasField?: boolean): Control<FormData, FieldValue, FieldKey>[] => {
    if (hasField) {
      return this.registerFields.filter(
        (control) => control.hasFieldProps() && !control.props?.isFormList
      );
    }
    return this.registerFields;
  };

  // 获取props.field === field 的control组件。
  public getRegisteredField = (field?: FieldKey) => {
    return this.registerFields.filter((x) => x.props.field === field)[0];
  };

  // 通知所有的FormItem进行更新。
  // setFieldValue: 外部调用setFieldsValue (setFieldValue等)方法触发更新
  // innerSetValue: 控件例如Input，通过onChange事件触发的更新
  // reset：重置
  private notify = (type: NotifyType, info: StoreChangeInfo<FieldKey>) => {
    if (type === 'setFieldValue' || (type === 'innerSetValue' && !info.ignore)) {
      // type = reset时，在reset函数里处理
      // if info.field is a[0], get a.0
      this._pushTouchField(
        info.changeValues
          ? iterativelyGetKeys(info.changeValues)
          : this._getIterativelyKeysByField(info.field)
      );
    }
    this.registerFields.forEach((item) => {
      item.onStoreChange &&
        item.onStoreChange(type, {
          ...info,
          current: this.store,
        });
    });
  };

  public innerSetInitialValues = (values: Partial<FormData>) => {
    if (!values) return;
    this.initialValues = cloneDeep(values);

    Object.keys(values).forEach((field) => {
      set(this.store, field, values[field]);
    });
  };

  public innerSetInitialValue = (field: FieldKey, value: FieldValue) => {
    if (!field) return;
    this.initialValues[field as string] = value;
    // 组件在创建的时候，需要判断store里存的对应field的值是否生效。只要没有被操作过（touchedFields里不存在），就生效
    if (!this._inTouchFields(field)) {
      set(this.store, field, get(this.initialValues, field));
    }
  };

  private _getIterativelyKeysByField(field: FieldKey | FieldKey[]) {
    if (!field) {
      return [];
    }
    const fields = [].concat(field);
    const keys = fields
      .map((item) => iterativelyGetKeys(set({}, item, undefined)))
      .reduce((total, next) => {
        return total.concat(next);
      }, []);
    return [field, ...keys];
  }

  private _inTouchFields(field?: FieldKey) {
    const keys = this._getIterativelyKeysByField(field);

    // return fields.some((item) => has(fieldObj, item));

    return keys.some((item) => has(this.touchedFields, item));
  }

  private _popTouchField(field?: FieldKey | FieldKey[]) {
    if (field === undefined) {
      this.touchedFields = {};
    }
    const keys = this._getIterativelyKeysByField(field);
    this.touchedFields = omit(this.touchedFields, keys);
  }

  private _pushTouchField(field: FieldKey | FieldKey[]) {
    [].concat(field).forEach((key) => {
      setWith(this.touchedFields, key, undefined, Object);
    });
  }

  /**
   *
   * 内部使用，更新value，会同时触发onChange 和 onValuesChange
   * @options.isFormList  强制更新field对应的组件包括其子组件,form
   */
  public innerSetFieldValue = (
    field: FieldKey,
    value: FieldValue,
    options?: { isFormList?: boolean; ignore?: boolean }
  ) => {
    if (!field) return;
    const prev = cloneDeep(this.store);
    set(this.store, field, value);
    this.triggerValuesChange({ [field]: value } as unknown as Partial<FormData>);
    this.triggerTouchChange({ [field]: value } as unknown as Partial<FormData>);

    this.notify('innerSetValue', { prev, field, ...options, changeValues: { [field]: value } });
  };

  // 内部使用
  public innerGetStore = () => {
    return this.store;
  };

  // 获取所有被操作过的字段
  public getTouchedFields = (): FieldKey[] => {
    return this.getRegisteredFields(true)
      .filter((item) => {
        return item.isTouched();
      })
      .map((x) => x.props.field);
  };

  // 外部调用设置表单字段值
  public setFieldValue = (field: FieldKey, value: FieldValue) => {
    if (!field) return;
    this.setFields({
      [field]: { value },
    } as any);
  };

  // 外部调用，设置多个表单控件的值
  public setFieldsValue = (values: DeepPartial<FormData>) => {
    if (isObject(values)) {
      const fields = Object.keys(values);
      const obj = {} as {
        [field in FieldKey]: {
          value?: FieldValue;
          error?: FieldError<FieldValue>;
        };
      };
      fields.forEach((field) => {
        obj[field] = {
          value: values[field],
        };
      });
      this.setFields(obj);
    }
  };

  // 外部调用，设置多个表单控件的值，以及 error，touch 信息。
  public setFields = (obj: {
    [field in FieldKey]?: {
      value?: FieldValue;
      error?: FieldError<FieldValue>;
      touched?: boolean;
      warning?: React.ReactNode;
    };
  }) => {
    const fields = Object.keys(obj) as FieldKey[];
    const changeValues = {} as any;
    fields.forEach((field) => {
      const item = obj[field];
      const prev = cloneDeep(this.store);
      if (item) {
        const info: StoreChangeInfo<FieldValue>['data'] = {};
        if ('error' in item) {
          info.errors = item.error;
        }
        if ('warning' in item) {
          info.warnings = item.warning;
        }
        if ('touched' in item) {
          info.touched = item.touched;
        }
        if ('value' in item) {
          set(this.store, field, item.value);
          changeValues[field] = item.value;
        }

        this.notify('setFieldValue', {
          data: info,
          prev,
          field,
          changeValues: { [field]: item.value },
        });
      }
    });
    this.triggerValuesChange(changeValues);
  };

  public getFieldValue = (field: FieldKey): FieldValue => {
    return cloneDeep(get(this.store, field));
  };

  // 获取单个字段的错误信息。
  public getFieldError = (field: FieldKey): FieldError<FieldValue> | null => {
    const item = this.getRegisteredField(field);
    return item ? item.getErrors() : null;
  };

  // 获取传入字段/全部的错误信息
  public getFieldsError = (fields?: FieldKey[]) => {
    const errors = {} as { [key in FieldKey]?: FieldError<FieldValue> };
    if (isArray(fields)) {
      fields.map((field) => {
        const error = this.getFieldError(field);
        if (error) {
          errors[field] = error;
        }
      });
    } else {
      this.getRegisteredFields(true).forEach((item) => {
        if (item.getErrors()) {
          errors[item.props.field] = item.getErrors();
        }
      });
    }
    return errors;
  };

  public getFields = (): Partial<FormData> => {
    return cloneDeep(this.store);
  };

  public getFieldsValue = (fields?: FieldKey[]): Partial<FormData> => {
    const values = {};

    if (isArray(fields)) {
      fields.forEach((key) => {
        set(values, key, this.getFieldValue(key));
      });
      return values;
    }
    this.getRegisteredFields(true).forEach(({ props: { field } }) => {
      const value = get(this.store, field);
      set(values, field, value);
    });
    return values;
  };

  public resetFields = (fieldKeys?: FieldKey | FieldKey[]) => {
    const prev = cloneDeep(this.store);
    const fields = isString(fieldKeys) ? [fieldKeys as FieldKey] : fieldKeys;
    if (fields && isArray(fields)) {
      const changeValues = {} as any;
      fields.forEach((field) => {
        set(this.store, field, this.initialValues[field as unknown as keyof FormData]);
        changeValues[field] = get(this.store, field);
      });

      this.triggerValuesChange(changeValues);

      this.notify('reset', { prev, field: fields });
      this._popTouchField(fields);
    } else {
      const newValues = {} as FormData;
      const changeValues = cloneDeep(this.store);

      Object.keys(this.initialValues).forEach((field) => {
        set(newValues, field, this.initialValues[field]);
      });
      this.store = newValues;
      this.getRegisteredFields(true).forEach((item) => {
        const key = item.props.field;
        set(changeValues, key, get(this.store, key));
      });

      this.triggerValuesChange(changeValues);
      this._popTouchField();

      this.notify('reset', { prev, field: Object.keys(changeValues) as FieldKey[] });
    }
  };

  public validate: FormValidateFn<FormData, FieldValue, FieldKey> = promisify<FormData>(
    (
      fieldsOrCallback?:
        | FieldKey[]
        | ((errors?: ValidateFieldsErrors<FieldValue, FieldKey>, values?: FormData) => void),
      cb?: (errors?: ValidateFieldsErrors<FieldValue, FieldKey>, values?: FormData) => void
    ) => {
      let callback: (
        errors?: ValidateFieldsErrors<FieldValue, FieldKey>,
        values?: Partial<FormData>
      ) => void = () => {};
      let controlItems = this.getRegisteredFields(true);

      if (isArray(fieldsOrCallback) && fieldsOrCallback.length > 0) {
        controlItems = controlItems.filter((x) => fieldsOrCallback.indexOf(x.props.field) > -1);
        callback = cb || callback;
      } else if (typeof fieldsOrCallback === 'function') {
        callback = fieldsOrCallback;
      }

      const promises = controlItems.map((x) => x.validateField());
      Promise.all(promises).then((result) => {
        let errors = {} as ValidateFieldsErrors<FieldValue, FieldKey>;
        const values = {} as Partial<FormData>;

        result.map((x) => {
          if (x.error) {
            errors = { ...errors, ...x.error };
          }
          set(values, x.field, x.value);
        });

        if (Object.keys(errors).length) {
          const { onValidateFail } = this.callbacks;
          onValidateFail && onValidateFail(errors);
          callback && callback(errors, cloneDeep(values));
        } else {
          callback && callback(null, cloneDeep(values));
        }
      });
    }
  );

  private toggleSubmitting = () => {
    this.isSubmitting = !this.isSubmitting;
    this.innerCollectFormState();
  };

  public submit = () => {
    this.toggleSubmitting();
    this.validate((errors, values) => {
      let result;
      const { onSubmit, onSubmitFailed } = this.callbacks;
      if (!errors && onSubmit) {
        result = onSubmit(values);
      }
      if (errors && onSubmitFailed) {
        result = onSubmitFailed(errors);
      }

      if (result && result.then) {
        // resolve 或者 reject， 都需要更新 submitting 的提交状态
        result.then(this.toggleSubmitting, (error) => {
          this.toggleSubmitting();
          // 保持以前的逻辑
          return Promise.reject(error);
        });
      } else {
        this.toggleSubmitting();
      }
    });
  };

  public getFieldsState = (fields?: FieldKey[]): { [key in FieldKey]?: FieldState<FieldValue> } => {
    const result = {} as { [key in FieldKey]?: FieldState<FieldValue> };

    const getItemState = (item) => {
      if (!item) {
        return null;
      }
      const error = item.getErrors();
      return {
        errors: error ? [error] : [],
        warnings: item.getWarnings(),
        validateStatus: item.getValidateStatus(),
        isSubmitting: this.isSubmitting,
        isTouched: item.isTouched(),
      };
    };

    if (isArray(fields)) {
      fields.forEach((key) => {
        result[key] = getItemState(this.getRegisteredField(key));
      });
      return result;
    }
    this.getRegisteredFields(true).forEach((item) => {
      result[item.props.field] = getItemState(item);
    });
    return result;
  };

  public clearFields = (fieldKeys?: FieldKey | FieldKey[]) => {
    const prev = cloneDeep(this.store);
    const fields = isString(fieldKeys) ? [fieldKeys as FieldKey] : fieldKeys;
    if (fields && isArray(fields)) {
      const changeValues = {} as any;
      fields.forEach((field) => {
        set(this.store, field, undefined);
        changeValues[field] = get(this.store, field);
      });

      this.triggerValuesChange(changeValues);

      this.notify('setFieldValue', {
        prev,
        field: fields,
        data: {
          errors: null,
          warnings: null,
        },
      });
      // this._popTouchField(fields);
    } else {
      const changeValues = {};
      this.store = {};
      this.getRegisteredFields(true).forEach((item) => {
        const key = item.props.field;
        set(changeValues, key, undefined);
      });

      this.triggerValuesChange(changeValues);
      // this._popTouchField();

      this.notify('setFieldValue', {
        prev,
        field: Object.keys(changeValues) as FieldKey[],
        data: {
          errors: null,
          warnings: null,
        },
      });
    }
  };
}

export default Store;
