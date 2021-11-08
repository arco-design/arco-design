import get from 'lodash/get';
import setWith from 'lodash/setWith';
import has from 'lodash/has';
import omit from 'lodash/omit';
import { cloneDeep, set, iterativelyGetKeys } from './utils';
import { isArray, isObject, isString } from '../_util/is';
import Control from './control';
import { FieldError, FormProps, ValidateFieldsErrors, KeyType, FormValidateFn } from './interface';
import promisify from './promisify';

type DeepPartial<T> = T extends
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | symbol
  | Date
  ? T | undefined
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : {
      [K in keyof T]?: DeepPartial<T[K]>;
    };

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
    touched?: boolean;
  };
};

class Store<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> {
  private registerFields: Control<FormData, FieldValue, FieldKey>[] = [];

  // 和formControl 的 touched属性不一样。 只要被改过的字段，这里就会存储。并且不会跟随formControl被卸载而清除。
  // reset 的时候清除
  private touchedFields: { [key: string]: unknown } = {};

  private store: Partial<FormData> = {};

  private initialValues: Partial<FormData> = {};

  private callbacks: Pick<FormProps<FormData, FieldValue, FieldKey>, innerCallbackType> & {
    onValidateFail?: (errors: { [key in FieldKey]: FieldError<FieldValue> }) => void;
  } = {};

  private triggerValuesChange(value: Partial<FormData>) {
    if (value && Object.keys(value).length) {
      const { onValuesChange } = this.callbacks;
      onValuesChange && onValuesChange(value, this.getFields());
    }
  }

  private triggerTouchChange(value: Partial<FormData>) {
    if (value && Object.keys(value).length) {
      const { onChange } = this.callbacks;
      onChange && onChange(value, this.getFields());
    }
  }

  public innerSetCallbacks = (
    values: Pick<FormProps<FormData, FieldValue, FieldKey>, innerCallbackType> & {
      onValidateFail?: (errors: { [key in FieldKey]: FieldError<FieldValue> }) => void;
    }
  ) => {
    this.callbacks = values;
  };

  // 收集所有control字段，并在组件卸载时移除
  public registerField = (item: Control<FormData, FieldValue, FieldKey>) => {
    this.registerFields.push(item);

    return () => {
      this.registerFields = this.registerFields.filter((x) => x !== item);
    };
  };

  // hasField为true时，只返回传入field属性的control实例
  private getRegistedFields = (hasField?: boolean): Control<FormData, FieldValue, FieldKey>[] => {
    if (hasField) {
      return this.registerFields.filter(
        (control) => control.hasFieldProps() && !control.props?.isFormList
      );
    }
    return this.registerFields;
  };

  // 获取props.field === field 的contorl组件。
  public getRegistedField = (field?: FieldKey) => {
    return this.registerFields.filter((x) => x.props.field === field)[0];
  };

  // 通知所有的formitem进行更新。
  // setfielValue: 外部调用setFieldsValue (setFieldValue等)方法触发更新
  // innerSetValue: 控件例如Input，通过onChange事件触发的更新
  // reset： 重置
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
    this.triggerValuesChange(({ [field]: value } as unknown) as Partial<FormData>);
    this.triggerTouchChange(({ [field]: value } as unknown) as Partial<FormData>);

    this.notify('innerSetValue', { prev, field, ...options, changeValues: { [field]: value } });
  };

  // 内部使用
  public innerGetStore = () => {
    return this.store;
  };

  // 获取所有被操作过的字段
  public getTouchedFields = (): FieldKey[] => {
    return this.getRegistedFields(true)
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
  public setFields = (
    obj: {
      [field in FieldKey]?: {
        value?: FieldValue;
        error?: FieldError<FieldValue>;
        touched?: boolean;
      };
    }
  ) => {
    const fields = Object.keys(obj) as FieldKey[];
    const changeValues = {} as any;
    fields.forEach((field) => {
      const item = obj[field];
      const prev = cloneDeep(this.store);
      if (item) {
        const info: { errors?: FieldError; touched?: boolean } = {};
        if ('error' in item) {
          info.errors = item.error;
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
    return get(this.store, field);
  };

  // 获取单个字段的错误信息。
  public getFieldError = (field: FieldKey): FieldError<FieldValue> | null => {
    const item = this.getRegistedField(field);
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
      this.getRegistedFields(true).forEach((item) => {
        if (item.getErrors()) {
          errors[item.props.field] = item.getErrors();
        }
      });
    }
    return errors;
  };

  public getFields = (): Partial<FormData> => {
    const values = cloneDeep(this.store);

    return values;
  };

  public getFieldsValue = (fields?: FieldKey[]): Partial<FormData> => {
    const values = {};

    if (isArray(fields)) {
      fields.forEach((key) => {
        set(values, key, this.getFieldValue(key));
      });
      return values;
    }
    this.getRegistedFields(true).forEach(({ props: { field } }) => {
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
        set(this.store, field, this.initialValues[(field as unknown) as keyof FormData]);
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
      this.getRegistedFields(true).forEach((item) => {
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
      let controlItems = this.getRegistedFields(true);

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

  public submit = () => {
    this.validate((errors, values) => {
      if (!errors) {
        const { onSubmit } = this.callbacks;
        onSubmit && onSubmit(values);
      } else {
        const { onSubmitFailed } = this.callbacks;
        onSubmitFailed && onSubmitFailed(errors);
      }
    });
  };
}

export default Store;
