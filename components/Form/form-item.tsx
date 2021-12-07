import React, {
  cloneElement,
  ReactElement,
  forwardRef,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useRef,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import cs from '../_util/classNames';
import { isArray, isFunction, isUndefined, isObject } from '../_util/is';
import Grid from '../Grid';
import { FormItemProps, FieldError, KeyType, FormContextProps, VALIDATE_STATUS } from './interface';
import Control from './control';
import {
  FormItemContext as RawFormItemContext,
  FormItemContextType as RawFormItemContextType,
  FormContext,
} from './context';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import FormItemLabel from './form-label';

const Row = Grid.Row;
const Col = Grid.Col;

interface FormItemTipProps extends Pick<FormItemProps, 'prefixCls' | 'help'> {
  errors: FieldError[];
  warnings: ReactNode[];
}

// 错误提示文字
const FormItemTip: React.FC<FormItemTipProps> = ({
  prefixCls,
  help,
  errors: propsErrors,
  warnings,
}) => {
  const errorTip = propsErrors.map((item, i) => {
    if (item) {
      return <div key={i}>{item.message}</div>;
    }
  });
  const warningTip = [];
  warnings.map((item, i) => {
    warningTip.push(
      <div key={i} className={`${prefixCls}-message-help-warning`}>
        {item}
      </div>
    );
  });
  const isHelpTip = !isUndefined(help) || !!warningTip.length;
  const visible = isHelpTip || !!errorTip.length;

  return (
    visible && (
      <CSSTransition in={visible} appear classNames="formblink" timeout={300} unmountOnExit>
        <div
          className={cs(`${prefixCls}-message`, {
            [`${prefixCls}-message-help`]: isHelpTip,
          })}
        >
          {!isUndefined(help) ? (
            help
          ) : (
            <>
              {errorTip.length > 0 && errorTip}
              {warningTip.length > 0 && warningTip}
            </>
          )}
        </div>
      </CSSTransition>
    )
  );
};

const Item = <
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
>(
  props: PropsWithChildren<FormItemProps<FormData, FieldValue, FieldKey>>,
  ref: React.Ref<typeof Row['prototype']>
) => {
  const { getPrefixCls, prefixCls: prefix } = useContext(ConfigContext);
  const topFormContext = useContext(RawFormItemContext);
  const [errors, setErrors] = useState<{
    [key: string]: FieldError<FieldValue>;
  }>(null);
  const [warnings, setWarnings] = useState<{
    [key: string]: ReactNode[];
  }>(null);
  const formContext = useContext(FormContext);
  const prefixCls = formContext.prefixCls || getPrefixCls('form');
  const formLayout = props.layout || formContext.layout;
  const labelAlign = props.labelAlign || formContext.labelAlign;
  const isDestroyed = useRef(false);

  // update error status
  const updateInnerFormItem = (
    field: string,
    params: {
      errors?: FieldError<FieldValue>;
      warnings?: ReactNode[];
    } = {}
  ) => {
    if (isDestroyed.current) {
      return;
    }
    const { errors, warnings } = params || {};

    setErrors((innerErrors) => {
      const newErrors = { ...(innerErrors || {}) };
      if (errors) {
        newErrors[field] = errors;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
    setWarnings((current) => {
      const newVal = { ...(current || {}) };
      if (warnings && warnings.length) {
        newVal[field] = warnings;
      } else {
        delete newVal[field];
      }
      return newVal;
    });
  };

  const updateFormItem =
    isObject(props.noStyle) && props.noStyle.showErrorTip && topFormContext.updateFormItem
      ? topFormContext.updateFormItem
      : updateInnerFormItem;

  useEffect(() => {
    return () => {
      isDestroyed.current = true;
      setErrors(null);
      setWarnings(null);
    };
  }, []);

  const contextProps = {
    ...(formContext as React.Context<FormContextProps<FormData, FieldValue, FieldKey>>),
    prefixCls,
    updateFormItem,
    disabled: 'disabled' in props ? props.disabled : formContext.disabled,
  };

  const { label, extra, className, style, validateStatus, ...rest } = props;
  const labelClassNames = cs(`${prefixCls}-label-item`, {
    [`${prefixCls}-label-item-left`]: labelAlign === 'left',
  });

  const errorInfo = errors ? Object.values(errors) : [];
  const warningInfo = warnings
    ? Object.values(warnings).reduce((total, next) => total.concat(next), [])
    : [];

  const itemStatus = useMemo(() => {
    if (validateStatus) {
      return validateStatus;
    }
    if (errorInfo.length) {
      return VALIDATE_STATUS.error;
    }
    if (warningInfo.length) {
      return VALIDATE_STATUS.warning;
    }
    return undefined;
  }, [errors, warnings, validateStatus]);

  const hasHelp = useMemo(() => {
    return !isUndefined(props.help) || warningInfo.length > 0;
  }, [props.help, warnings]);

  const classNames = cs(
    `${prefixCls}-item`,
    {
      [`${prefixCls}-item-error`]:
        hasHelp || (!validateStatus && itemStatus === VALIDATE_STATUS.error),
      [`${prefixCls}-item-status-${itemStatus}`]: itemStatus,
      [`${prefixCls}-item-has-help`]: hasHelp,
      [`${prefixCls}-item-has-feedback`]: itemStatus && props.hasFeedback,
    },
    `${prefixCls}-layout-${formLayout}`,
    className
  );

  const cloneElementWithDisabled = () => {
    const { field, children } = props;
    const disabled = 'disabled' in props ? props.disabled : formContext.disabled;

    if (isFunction(children)) {
      return (
        <Control disabled={disabled} {...(props as any)} {...(field ? { key: field } : {})}>
          {(...rest) => children(...rest)}
        </Control>
      );
    }

    if (isArray(children)) {
      const childrenDom = React.Children.map(children, (child, i) => {
        const key = (isObject(child) && (child as ReactElement).key) || i;
        const childProps = !isUndefined(disabled) ? { key, disabled } : { key };
        return isObject(child) ? cloneElement(child as ReactElement, childProps) : child;
      });
      return (
        <Control {...(props as any)} field={undefined}>
          {childrenDom}
        </Control>
      );
    }
    if (React.Children.count(children) === 1) {
      if (field) {
        return (
          <Control disabled={disabled} {...(props as any)} key={field}>
            {children}
          </Control>
        );
      }
      if (isObject(children)) {
        // Compatible Form.Control
        if ((children as any).type?.isFormControl) {
          return children;
        }
        const childProps = isUndefined(disabled) ? {} : { disabled };
        return (
          <Control {...(props as any)} field={undefined}>
            {cloneElement(children as ReactElement, childProps)}
          </Control>
        );
      }
    }

    return children;
  };

  const FormItemContext = RawFormItemContext as unknown as RawFormItemContextType<
    FormData,
    FieldValue,
    FieldKey
  >;

  const newFormContext = {
    ...formContext,
  };
  if (!props.noStyle) {
    newFormContext.wrapperCol = undefined;
    newFormContext.labelCol = undefined;
  }

  return (
    <FormContext.Provider value={newFormContext}>
      <FormItemContext.Provider value={contextProps}>
        {props.noStyle ? (
          cloneElementWithDisabled()
        ) : (
          <Row
            ref={ref}
            {...omit(rest, [
              'children',
              'prefixCls',
              'store',
              'initialValue',
              'field',
              'labelCol',
              'wrapperCol',
              'colon',
              'disabled',
              'rules',
              'trigger',
              'triggerPropName',
              'validateTrigger',
              'noStyle',
              'required',
              'hasFeedback',
              'help',
              'normalize',
              'formatter',
              'getValueFromEvent',
              'shouldUpdate',
              'field',
              'isInner',
              'labelAlign',
              'layout',
              'requiredSymbol',
              'isFormList',
            ])}
            className={classNames}
            div={formLayout !== 'horizontal'}
            style={style}
          >
            {label ? (
              <Col
                {...(props.labelCol || formContext.labelCol)}
                className={cs(
                  labelClassNames,
                  props.labelCol?.className,
                  formContext.labelCol?.className,
                  {
                    [`${prefixCls}-label-item-flex`]: !props.labelCol && !formContext.labelCol,
                  }
                )}
              >
                <FormItemLabel
                  htmlFor={props.field && formContext.getFormElementId(props.field)}
                  label={label}
                  prefix={prefix}
                  requiredSymbol={
                    'requiredSymbol' in props ? props.requiredSymbol : formContext.requiredSymbol
                  }
                  required={props.required}
                  rules={props.rules}
                  showColon={'colon' in props ? props.colon : formContext.colon}
                />
              </Col>
            ) : null}
            <Col
              className={cs(`${prefixCls}-item-wrapper`, {
                [`${prefixCls}-item-wrapper-flex`]: !props.wrapperCol && !formContext.wrapperCol,
              })}
              {...(props.wrapperCol || formContext.wrapperCol)}
            >
              {cloneElementWithDisabled()}
              <FormItemTip
                prefixCls={prefixCls}
                help={props.help}
                errors={errorInfo}
                warnings={warningInfo}
              />
              {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
            </Col>
          </Row>
        )}
      </FormItemContext.Provider>
    </FormContext.Provider>
  );
};

const ItemComponent = forwardRef(Item);

ItemComponent.defaultProps = {
  trigger: 'onChange',
  triggerPropName: 'value',
  validateTrigger: 'onChange',
};

ItemComponent.displayName = 'FormItem';

export default ItemComponent as <
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
>(
  props: React.PropsWithChildren<FormItemProps<FormData, FieldValue, FieldKey>> & {
    ref?: React.Ref<typeof Row['prototype']>;
  }
) => React.ReactElement;
