import React, { useContext, PropsWithChildren } from 'react';
import cs from '../_util/classNames';
import Group, { RadioGroupContext } from './group';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import useMergeValue from '../_util/hooks/useMergeValue';
import IconHover from '../_class/icon-hover';
import { RadioProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

function Radio(baseProps: PropsWithChildren<RadioProps>) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<RadioProps>>(baseProps, {}, componentConfig?.Radio);

  const context = useContext(RadioGroupContext);

  const prefixCls = getPrefixCls('radio');

  const mergeProps = { ...props };

  if (context.group) {
    mergeProps.checked = context.value === props.value;
    mergeProps.disabled = !!(context.disabled || props.disabled);
  }

  const { disabled, children, value, style, className, ...rest } = mergeProps;

  const [checked, setChecked] = useMergeValue(false, {
    value: mergeProps.checked,
    defaultValue: mergeProps.defaultChecked,
  });

  const classNames = cs(
    `${prefixCls}${context.type === 'button' ? '-button' : ''}`,
    {
      [`${prefixCls}-checked`]: checked,
      [`${prefixCls}-disabled`]: disabled,
    },
    className
  );

  const onChange = (event) => {
    const { onChange, value } = mergeProps;
    if (disabled) {
      return;
    }
    if (context.group) {
      context.onChangeValue && context.onChangeValue(value, event);
    } else if (!('checked' in props) && !checked) {
      setChecked(true);
    }
    !checked && onChange && onChange(true, event);
  };

  return (
    <label {...omit(rest, ['checked', 'onChange'])} style={style} className={classNames}>
      <input
        disabled={disabled}
        value={value || ''}
        type="radio"
        {...(context.name ? { name: context.name } : {})}
        checked={checked}
        onChange={(event) => {
          event.persist();
          onChange(event);
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      {context.type === 'radio' && (
        <>
          <IconHover
            prefix={prefixCls}
            className={`${prefixCls}-mask-wrapper`}
            disabled={checked || disabled}
          >
            <div className={`${prefixCls}-mask`} />
          </IconHover>
          {children && <span className={`${prefixCls}-text`}>{children}</span>}
        </>
      )}
      {context.type === 'button' && <span className={`${prefixCls}-button-inner`}>{children}</span>}
    </label>
  );
}

Radio.__BYTE_RADIO = true;

Radio.displayName = 'Radio';

Radio.Group = Group;

Radio.GroupContext = RadioGroupContext;

export default Radio;

export { RadioProps };
