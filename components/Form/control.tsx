import React, { Component, ReactElement } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import has from 'lodash/has';
import set from 'lodash/set';
import get from 'lodash/get';
import setWith from 'lodash/setWith';
import { FormControlProps, FieldError, FormItemContextProps, KeyType } from './interface';
import { FormItemContext } from './context';
import { isArray, isFunction } from '../_util/is';
import warn from '../_util/warning';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';
import IconCloseCircleFill from '../../icon/react-icon/IconCloseCircleFill';
import IconCheckCircleFill from '../../icon/react-icon/IconCheckCircleFill';
import IconLoading from '../../icon/react-icon/IconLoading';
import { NotifyType, StoreChangeInfo } from './store';
import classNames from '../_util/classNames';
import { isSyntheticEvent, schemaValidate } from './utils';

function isFieldMath(field, fields) {
  const fieldObj = setWith({}, field, undefined, Object);

  return fields.some((item) => has(fieldObj, item));
}

export default class Control<
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
> extends Component<FormControlProps<FormData, FieldValue, FieldKey>> {
  static defaultProps = {
    trigger: 'onChange',
    triggerPropName: 'value',
    validateTrigger: 'onChange',
  };

  static isFormControl = true;

  static contextType = FormItemContext;

  context: FormItemContextProps<FormData, FieldValue, FieldKey>;

  private errors: FieldError<FieldValue> = null;

  private warnings: React.ReactNode[] = null;

  private isDestroyed = false;

  private touched: boolean;

  private removeRegisterField: () => void;

  constructor(
    props: FormControlProps<FormData, FieldValue, FieldKey>,
    context: FormItemContextProps<FormData, FieldValue, FieldKey>
  ) {
    super(props);
    if ('initialValue' in props && this.hasFieldProps()) {
      const innerMethods = context.store.getInnerMethods(true);
      innerMethods.innerSetInitialValue(props.field, props.initialValue);
    }
  }

  componentDidMount() {
    const { store } = this.context;
    if (store) {
      const innerMethods = store.getInnerMethods(true);
      this.removeRegisterField = innerMethods.registerField(this);
    }
  }

  componentWillUnmount() {
    this.removeRegisterField && this.removeRegisterField();

    this.removeRegisterField = null;

    // destroy errors
    const { updateFormItem } = this.context;
    updateFormItem && updateFormItem(this.props.field as string, { errors: null, warnings: null });
    this.isDestroyed = true;
  }

  getErrors = (): FieldError<FieldValue> | null => {
    return this.errors;
  };

  isTouched = (): boolean => {
    return this.touched;
  };

  public hasFieldProps = (): boolean => {
    return !!this.props.field;
  };

  private updateFormItem = () => {
    if (this.isDestroyed) return;
    this.forceUpdate();
    const { updateFormItem } = this.context;
    updateFormItem &&
      updateFormItem(this.props.field as string, {
        errors: this.errors,
        warnings: this.warnings,
      });
  };

  public onStoreChange = (type: NotifyType, info: StoreChangeInfo<FieldKey> & { current: any }) => {
    const fields = isArray(info.field) ? info.field : [info.field];
    const { field, shouldUpdate } = this.props;

    // isInner: the value is changed by innerSetValue
    const shouldUpdateItem = (extra?: { isInner?: boolean; isFormList?: boolean }) => {
      if (shouldUpdate) {
        let shouldRender = false;
        if (isFunction(shouldUpdate)) {
          shouldRender = shouldUpdate(info.prev, info.current, {
            field: info.field,
            ...extra,
          });
        } else {
          shouldRender = !isEqualWith(info.prev, info.current);
        }
        if (shouldRender) {
          this.updateFormItem();
        }
      }
    };

    switch (type) {
      case 'reset':
        this.touched = false;
        this.errors = null;
        this.warnings = null;
        this.updateFormItem();
        break;
      case 'innerSetValue':
        if (isFieldMath(field, fields)) {
          this.touched = true;
          this.updateFormItem();
          return;
        }
        shouldUpdateItem({
          isInner: true,
          isFormList: info.isFormList,
        });
        break;
      case 'setFieldValue':
        if (isFieldMath(field, fields)) {
          this.touched = true;
          if (info.data && 'touched' in info.data) {
            this.touched = info.data.touched;
          }
          if (info.data && 'warnings' in info.data) {
            this.warnings = [].concat(info.data.warnings);
          }
          if (info.data && 'errors' in info.data) {
            this.errors = info.data.errors;
          } else if (!isEqualWith(get(info.prev, field), get(info.current, field))) {
            this.errors = null;
          }
          this.updateFormItem();
          return;
        }
        shouldUpdateItem();
        break;
      default:
        break;
    }
  };

  innerSetFieldValue = (field: FieldKey, value: FieldValue) => {
    if (!field) return;
    const { store } = this.context;
    const methods = store.getInnerMethods(true);
    methods.innerSetFieldValue(field, value);

    const changedValue = {} as Partial<FormData>;
    set(changedValue, field, value);

    this.props.onValuesChange &&
      this.props.onValuesChange(changedValue, {
        ...store.getFieldsValue(),
      });
  };

  handleTrigger = (_value, ...args) => {
    const { store } = this.context;
    const { field, trigger, normalize, getValueFromEvent } = this.props;
    const value = isFunction(getValueFromEvent) ? getValueFromEvent(_value, ...args) : _value;
    const children = this.props.children as ReactElement;
    let normalizeValue = value;
    // break if value is instance of SyntheticEvent, 'cos value is missing
    if (isSyntheticEvent(value)) {
      warn(
        true,
        'changed value missed, please check whether extra elements is outta input/select controled by Form.Item'
      );
      value.stopPropagation();
      return;
    }

    if (typeof normalize === 'function') {
      normalizeValue = normalize(value, store.getFieldValue(field), {
        ...store.getFieldsValue(),
      });
    }
    this.touched = true;
    this.innerSetFieldValue(field, normalizeValue);

    this.validateField(trigger);

    if (children && children.props && children.props[trigger as string]) {
      children.props[trigger as string](normalizeValue, ...args);
    }
  };

  /**
   *
   * @param triggerType the value of validateTrigger.
   * @returns
   */
  validateField = (
    triggerType?: string
  ): Promise<{
    error: FieldError<FieldValue> | null;
    value: FieldValue;
    field: FieldKey;
  }> => {
    const { store } = this.context;
    const { field, rules, validateTrigger } = this.props;
    const value = store.getFieldValue(field);
    const _rules = !triggerType
      ? rules
      : (rules || []).filter((rule) => {
          const triggers = [].concat(rule.validateTrigger || validateTrigger);
          return triggers.indexOf(triggerType) > -1;
        });
    if (_rules && _rules.length && field) {
      return schemaValidate(field, value, _rules).then(({ error, warning }) => {
        this.errors = error ? error[field] : null;
        this.warnings = warning || null;
        this.updateFormItem();
        return Promise.resolve({ error, value, field });
      });
    }
    if (this.errors) {
      this.errors = null;
      this.warnings = null;
      this.updateFormItem();
    }
    return Promise.resolve({ error: null, value, field });
  };

  /**
   * 收集rules里的validateTrigger字段
   */
  getValidateTrigger(): string[] {
    const _validateTrigger = this.props.validateTrigger || 'onChange';
    const rules = this.props.rules || [];

    let result: string[] = [];
    rules.map((item) => {
      result = result.concat(item.validateTrigger || _validateTrigger);
    });
    return Array.from(new Set(result));
  }

  renderControl(children: React.ReactNode, id) {
    const {
      field,
      trigger = 'onChange',
      triggerPropName = 'value',
      validateStatus,
      formatter,
    } = this.props;
    const { store, disabled: ctxDisabled } = this.context;
    const disabled = 'disabled' in this.props ? this.props.disabled : ctxDisabled;
    const child = React.Children.only(children) as ReactElement;
    const childProps: any = {
      // used by label
      id: classNames(child.props?.id, { [`${id}_input`]: id }),
    };

    this.getValidateTrigger().forEach((vt) => {
      childProps[vt] = (e) => {
        this.validateField(vt);
        child.props[vt] && child.props[vt](e);
      };
    });

    childProps[trigger] = this.handleTrigger;

    if (disabled !== undefined) {
      childProps.disabled = disabled;
    }
    let _value = store.getFieldValue(field);

    if (isFunction(formatter)) {
      _value = formatter(_value);
    }

    childProps[triggerPropName] = _value;
    if (!validateStatus && this.errors) {
      childProps.error = true;
    }

    return React.cloneElement(child, childProps);
  }

  getChild = () => {
    const { children } = this.props;
    const { store } = this.context;
    if (isFunction(children)) {
      return children(store.getFields(), {
        ...store,
      });
    }
    return children;
  };

  render() {
    const { noStyle, field, isFormList, hasFeedback } = this.props;
    const validateStatus = this.props.validateStatus || (this.errors ? 'error' : '');
    const { prefixCls, getFormElementId } = this.context;
    let child = this.getChild();
    const id = this.hasFieldProps() ? getFormElementId(field) : undefined;
    if (this.hasFieldProps() && !isFormList && React.Children.count(child) === 1) {
      child = this.renderControl(child, id);
    }

    if (noStyle) {
      return child;
    }
    return (
      <div className={`${prefixCls}-item-control-wrapper`}>
        <div className={`${prefixCls}-item-control`} id={id}>
          <div className={`${prefixCls}-item-control-children`}>
            {child}

            {validateStatus && hasFeedback && (
              <div className={`${prefixCls}-item-feedback`}>
                {validateStatus === 'warning' && <IconExclamationCircleFill />}
                {validateStatus === 'success' && <IconCheckCircleFill />}
                {validateStatus === 'error' && <IconCloseCircleFill />}
                {validateStatus === 'validating' && <IconLoading />}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
