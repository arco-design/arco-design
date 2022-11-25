import React, { createContext, useContext, PropsWithChildren } from 'react';
import cs from '../_util/classNames';
import { isArray, isObject } from '../_util/is';
import Radio from './radio';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import { RadioGroupProps, RadioGroupContextProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { pickDataAttributes } from '../_util/pick';
import { pickTriggerPropsFromRest } from '../_util/constant';

const defaultContextValue: RadioGroupContextProps = {
  type: 'radio',
};

const defaultProps: RadioGroupProps = {
  type: 'radio',
  mode: 'outline',
  direction: 'horizontal',
};

export const RadioGroupContext = createContext<RadioGroupContextProps>(defaultContextValue);

export const ClearRadioGroupContext = ({ children }: PropsWithChildren<{}>) => {
  return <RadioGroupContext.Provider children={children} value={defaultContextValue} />;
};

function Group(baseProps: PropsWithChildren<RadioGroupProps>) {
  const { getPrefixCls, size: ctxSize, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<RadioGroupProps>>(
    baseProps,
    defaultProps,
    componentConfig?.['Radio.Group']
  );
  const { style, className, name, children, direction, type, mode, options, disabled } = props;

  const [value, setValue] = useMergeValue(undefined, {
    defaultValue: props.defaultValue,
    value: props.value,
  });
  const size = props.size || ctxSize;
  const prefixCls = getPrefixCls('radio');
  const classNames = cs(
    `${prefixCls}-group`,
    {
      [`${prefixCls}-group-type-button`]: type !== 'radio',
      [`${prefixCls}-size-${size}`]: !!size,
      [`${prefixCls}-mode-${mode}`]: !!mode,
      [`${prefixCls}-group-disabled`]: disabled,
      [`${prefixCls}-group-direction-vertical`]: direction === 'vertical',
      [`${prefixCls}-group-rtl`]: rtl,
    },
    className
  );

  const onChangeValue = (v: any, event): void => {
    const { onChange } = props;
    if (v !== value) {
      if (!('value' in props)) {
        setValue(v);
      }
      onChange && onChange(v, event);
    }
  };

  const contextProp = {
    onChangeValue,
    type,
    value,
    disabled,
    group: true,
    name,
  };
  return (
    <RadioGroupContext.Provider value={contextProp}>
      <div
        className={classNames}
        role="radiogroup"
        style={style}
        {...pickTriggerPropsFromRest(props)}
        {...pickDataAttributes(props)}
      >
        {options && isArray(options)
          ? options.map((option, index) => {
              if (isObject(option)) {
                return (
                  <Radio
                    key={option.value}
                    disabled={disabled || option.disabled}
                    value={option.value}
                  >
                    {option.label}
                  </Radio>
                );
              }
              return (
                <Radio key={index} value={option} disabled={disabled}>
                  {option}
                </Radio>
              );
            })
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
}

Group.displayName = 'RadioGroup';

export default Group;

export { RadioGroupProps, RadioGroupContextProps };
