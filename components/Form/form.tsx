import React, {
  useImperativeHandle,
  useEffect,
  forwardRef,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react';
import scrollIntoView, { Options as ScrollIntoViewOptions } from 'scroll-into-view-if-needed';
import cs from '../_util/classNames';
import useForm from './useForm';
import type { FormProps, FormInstance, FieldError, KeyType } from './interface';
import ConfigProvider, { ConfigContext } from '../ConfigProvider';
import { FormContext as RawFormContext, FormContextType as RawFormContextType } from './context';
import { isObject } from '../_util/is';
import omit from '../_util/omit';
import useMergeProps from '../_util/hooks/useMergeProps';

function getFormElementId<FieldKey extends KeyType = string>(
  prefix: string | undefined,
  field: FieldKey
): string {
  const id = (field as string).replace(/[\[\.]/g, '_').replace(/\]/g, '');
  return prefix ? `${prefix}-${id}` : `${id}`;
}

const defaultProps = {
  layout: 'horizontal' as const,
  labelCol: { span: 5, offset: 0 },
  labelAlign: 'right' as const,
  wrapperCol: { span: 19, offset: 0 },
  requiredSymbol: true,
  wrapper: 'form' as FormProps['wrapper'],
};

const Form = <
  FormData extends unknown = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
>(
  baseProps: PropsWithChildren<FormProps<FormData, FieldValue, FieldKey>>,
  ref: React.Ref<FormInstance<FormData, FieldValue, FieldKey>>
) => {
  const ctx = useContext(ConfigContext);
  const wrapperRef = useRef<HTMLElement>(null);
  const [formInstance] = useForm<FormData, FieldValue, FieldKey>(baseProps.form);
  const isMount = useRef<boolean>();

  const props = useMergeProps<FormProps>(baseProps, defaultProps, ctx.componentConfig?.Form);

  const {
    layout,
    labelCol,
    wrapperCol,
    wrapper: Wrapper,
    id,
    requiredSymbol,
    labelAlign,
    disabled,
    colon,
    className,
    prefixCls: formPrefixCls,
    ...rest
  } = props;
  const prefixCls = formPrefixCls || ctx.getPrefixCls('form');
  const size = 'size' in props ? props.size : ctx.size;
  const innerMethods = formInstance.getInnerMethods(true);
  if (!isMount.current) {
    innerMethods.innerSetInitialValues(props.initialValues);
  }
  useEffect(() => {
    isMount.current = true;
  }, []);

  useImperativeHandle(ref, () => {
    return formInstance;
  });

  // 滚动到目标表单字段位置
  formInstance.scrollToField = (field: FieldKey, options?: ScrollIntoViewOptions) => {
    const node = wrapperRef.current;
    const id = props.id;
    if (!node) {
      return;
    }
    const fieldNode = node.querySelector(`#${getFormElementId(id, field as string)}`);
    fieldNode &&
      scrollIntoView(fieldNode, {
        behavior: 'smooth',
        block: 'nearest',
        scrollMode: 'if-needed',
        ...options,
      });
  };

  innerMethods.innerSetCallbacks({
    onValuesChange: props.onValuesChange,
    onChange: props.onChange,
    onValidateFail: (errors: { [key in FieldKey]: FieldError<FieldValue> }) => {
      if (props.scrollToFirstError) {
        const options = isObject(props.scrollToFirstError) ? props.scrollToFirstError : {};
        formInstance.scrollToField((Object.keys(errors) as FieldKey[])[0], options);
      }
    },
    onSubmitFailed: props.onSubmitFailed,
    onSubmit: props.onSubmit,
  });

  const contextProps = {
    requiredSymbol,
    labelAlign,
    disabled,
    colon,
    labelCol,
    wrapperCol,
    layout,
    store: formInstance,
    prefixCls,
    getFormElementId: (field: FieldKey) => getFormElementId(id, field),
  };

  const FormContext = RawFormContext as unknown as RawFormContextType<
    FormData,
    FieldValue,
    FieldKey
  >;

  return (
    <ConfigProvider {...ctx} size={size}>
      <FormContext.Provider value={contextProps}>
        <Wrapper
          ref={wrapperRef}
          {...omit(rest, [
            'form',
            'size',
            'initialValues',
            'onValuesChange',
            'onChange',
            'wrapperProps',
            'scrollToFirstError',
            'onSubmit',
            'onSubmitFailed',
          ])}
          {...props.wrapperProps}
          className={cs(
            prefixCls,
            `${prefixCls}-${layout}`,
            `${prefixCls}-size-${size}`,
            className
          )}
          style={props.style}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            formInstance.submit();
          }}
          id={id}
        >
          {props.children}
        </Wrapper>
      </FormContext.Provider>
    </ConfigProvider>
  );
};

const FormComponent = forwardRef(Form);

FormComponent.displayName = 'Form';

export default FormComponent as <
  FormData = any,
  FieldValue = FormData[keyof FormData],
  FieldKey extends KeyType = keyof FormData
>(
  props: React.PropsWithChildren<FormProps<FormData, FieldValue, FieldKey>> & {
    ref?: React.Ref<FormInstance<FormData, FieldValue, FieldKey>>;
  }
) => React.ReactElement;
