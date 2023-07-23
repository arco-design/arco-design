import React, { useContext, useRef } from 'react';
import cs from '../_util/classNames';
import Group, { RadioGroupContext } from './group';
import { ConfigContext } from '../ConfigProvider';
import omit from '../_util/omit';
import useMergeValue from '../_util/hooks/useMergeValue';
import IconHover from '../_class/icon-hover';
import { RadioProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isFunction, isNullOrUndefined } from '../_util/is';

function Radio(baseProps: RadioProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<RadioProps>(baseProps, {}, componentConfig?.Radio);

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
      [`${prefixCls}-rtl`]: rtl,
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

  const onLabelClick = React.useCallback(
    (e) => {
      if (isFunction(props.children)) {
        // 避免children中含有表单元素造成label无法触发input的onchange的情况
        e.preventDefault();
        inputRef.current && inputRef.current.click();
      }
      rest.onClick && rest.onClick(e);
    },
    [props.children, rest.onClick]
  );

  return (
    <label
      {...omit(rest, ['checked', 'onChange'])}
      onClick={onLabelClick}
      style={style}
      className={classNames}
    >
      <input
        ref={inputRef}
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
      {isFunction(children) ? (
        children({ checked })
      ) : context.type === 'radio' ? (
        <>
          <IconHover
            prefix={prefixCls}
            className={`${prefixCls}-mask-wrapper`}
            disabled={checked || disabled}
          >
            <div className={`${prefixCls}-mask`} />
          </IconHover>
          {!isNullOrUndefined(children) && <span className={`${prefixCls}-text`}>{children}</span>}
        </>
      ) : (
        context.type === 'button' && <span className={`${prefixCls}-button-inner`}>{children}</span>
      )}
    </label>
  );
}

Radio.__BYTE_RADIO = true;

Radio.displayName = 'Radio';

Radio.Group = Group;

Radio.GroupContext = RadioGroupContext;

export default Radio;

export { RadioProps };
