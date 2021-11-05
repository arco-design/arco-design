import React, {
  cloneElement,
  ReactElement,
  forwardRef,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import cs from '../_util/classNames';
import { isArray, isFunction, isUndefined, isObject } from '../_util/is';
import Grid from '../Grid';
import { FormItemProps, FieldError, KeyType, FormContextProps } from './interface';
import Control from './control';
import {
  FormItemContext as RawFormItemContext,
  FormItemContextType as RawFormItemContextType,
  FormContext,
} from './context';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';

const Row = Grid.Row;
const Col = Grid.Col;

interface FormItemLabelProps
  extends Pick<FormItemProps, 'label' | 'requiredSymbol' | 'required' | 'rules'> {
  showColon: boolean;
  prefix: string;
  htmlFor?: string;
}

// 标签
const FormItemLabel: React.FC<FormItemLabelProps> = ({
  htmlFor,
  showColon,
  label,
  requiredSymbol,
  required,
  rules,
  prefix,
}) => {
  const isRequiredRule = isArray(rules) && rules.some((rule) => rule && rule.required);
  const symbolPosition = isObject(requiredSymbol) ? requiredSymbol.position : 'start';

  const symbolNode = (required || isRequiredRule) && !!requiredSymbol && (
    <strong className={`${prefix}-form-item-symbol`}>
      <svg fill="currentColor" viewBox="0 0 1024 1024" width="1em" height="1em">
        <path d="M583.338667 17.066667c18.773333 0 34.133333 15.36 34.133333 34.133333v349.013333l313.344-101.888a34.133333 34.133333 0 0 1 43.008 22.016l42.154667 129.706667a34.133333 34.133333 0 0 1-21.845334 43.178667l-315.733333 102.4 208.896 287.744a34.133333 34.133333 0 0 1-7.509333 47.786666l-110.421334 80.213334a34.133333 34.133333 0 0 1-47.786666-7.509334L505.685333 706.218667 288.426667 1005.226667a34.133333 34.133333 0 0 1-47.786667 7.509333l-110.421333-80.213333a34.133333 34.133333 0 0 1-7.509334-47.786667l214.186667-295.253333L29.013333 489.813333a34.133333 34.133333 0 0 1-22.016-43.008l42.154667-129.877333a34.133333 34.133333 0 0 1 43.008-22.016l320.512 104.106667L412.672 51.2c0-18.773333 15.36-34.133333 34.133333-34.133333h136.533334z" />
      </svg>
    </strong>
  );

  return label ? (
    <label htmlFor={htmlFor && `${htmlFor}_input`}>
      {symbolPosition !== 'end' && symbolNode} {label}
      {symbolPosition === 'end' && <> {symbolNode}</>}
      {showColon ? ':' : ''}
    </label>
  ) : null;
};

interface FormItemTipProps extends Pick<FormItemProps, 'prefixCls' | 'help'> {
  errors: FieldError[];
}

// 错误提示文字
const FormItemTip: React.FC<FormItemTipProps> = ({ prefixCls, help, errors: propsErrors }) => {
  const errorTip = propsErrors.map((item, i) => {
    if (item) {
      return <div key={i}>{item.message}</div>;
    }
  });
  const show = help !== undefined || !!errorTip.length;

  const tip = help !== undefined ? help : errorTip.length > 0 && errorTip;

  return (
    show && (
      <CSSTransition in={show} appear classNames="formblink" timeout={300} unmountOnExit>
        <div
          className={cs(`${prefixCls}-message`, {
            [`${prefixCls}-message-help`]: help !== undefined,
          })}
        >
          {tip}
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
  const formContext = useContext(FormContext);
  const prefixCls = formContext.prefixCls || getPrefixCls('form');
  const formLayout = props.layout || formContext.layout;
  const labelAlign = props.labelAlign || formContext.labelAlign;
  const isDestroyed = useRef(false);

  // update error status
  const updateInnerFormItem = (field: string, errors?: FieldError<FieldValue>) => {
    if (isDestroyed.current) {
      return;
    }
    setErrors((innerErrors) => {
      const newErrors = { ...innerErrors };
      if (errors) {
        newErrors[field] = errors;
      } else {
        delete newErrors[field];
      }
      return newErrors;
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

  const isErrorStatus = useMemo(() => {
    return errors && Object.values(errors).length;
  }, [errors]);
  const itemStatus = validateStatus || (isErrorStatus ? 'error' : '');

  const classNames = cs(
    `${prefixCls}-item`,
    {
      [`${prefixCls}-item-error`]: isErrorStatus || props.help !== undefined,
      [`${prefixCls}-item-status-${itemStatus}`]: itemStatus,
      [`${prefixCls}-item-has-help`]: props.help !== undefined,
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

  const FormItemContext = (RawFormItemContext as unknown) as RawFormItemContextType<
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
                errors={isErrorStatus ? Object.values(errors) : []}
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
