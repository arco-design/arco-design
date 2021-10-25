import React, { createContext, useContext, PropsWithChildren, ChangeEvent } from 'react';
import cs from '../_util/classNames';
import { isArray, isObject } from '../_util/is';
import Radio from './radio';
import { ConfigContext } from '../ConfigProvider';
import useMergeValue from '../_util/hooks/useMergeValue';
import { RadioGroupProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

export interface RadioGroupContextProps {
  type: 'radio' | 'button';
  value?: any;
  onChangeValue?: (value: any, event: ChangeEvent) => void;
  disabled?: boolean;
  group?: boolean;
  name?: RadioGroupProps['name'];
}

export const RadioGroupContext = createContext<RadioGroupContextProps>({
  type: 'radio',
});

const defaultProps: RadioGroupProps = {
  type: 'radio',
  mode: 'outline',
  direction: 'horizontal',
};

function Group(baseProps: PropsWithChildren<RadioGroupProps>) {
  const { getPrefixCls, size: ctxSize, componentConfig } = useContext(ConfigContext);
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
      <div className={classNames} style={style}>
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

export { RadioGroupProps };
