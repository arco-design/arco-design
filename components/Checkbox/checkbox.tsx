import React, { useContext, useCallback, useRef, useEffect } from 'react';
import Group, { CheckboxGroupContext } from './group';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import useCheckbox from './useCheckbox';
import useMergeValue from '../_util/hooks/useMergeValue';
import omit from '../_util/omit';
import Hover from '../_class/icon-hover';
import IconCheck from './icon-check';
import { CheckboxProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { isFunction } from '../_util/is';

function Checkbox<T extends React.ReactText>(baseProps: CheckboxProps<T>, ref) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<CheckboxProps>(baseProps, {}, componentConfig?.Checkbox);

  const context = useContext(CheckboxGroupContext);
  const prefixCls = getPrefixCls('checkbox');
  const { onGroupChange } = context;

  const mergeProps = { ...props };

  if (context.isCheckboxGroup) {
    mergeProps.checked = context.checkboxGroupValue.indexOf(props.value) !== -1;
    mergeProps.disabled = 'disabled' in props ? props.disabled : context.disabled;
  }

  const { disabled, children, className, value, style, indeterminate, error, ...rest } = mergeProps;

  const [checked, setChecked] = useMergeValue(false, {
    value: mergeProps.checked,
    defaultValue: mergeProps.defaultChecked,
  });

  const classNames = cs(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: !!disabled,
      [`${prefixCls}-indeterminate`]: !!indeterminate,
      [`${prefixCls}-checked`]: checked,
      error,
    },
    className
  );

  useEffect(() => {
    context.registerValue(value);

    return () => {
      context.unRegisterValue(value);
    };
  }, [value]);

  const onChange = useCallback(
    (e) => {
      e.persist();
      e.stopPropagation();
      setChecked(e.target.checked);
      if (context.isCheckboxGroup) {
        onGroupChange && onGroupChange(props.value, e.target.checked, e);
      }
      props.onChange && props.onChange(e.target.checked, e);
    },
    [onGroupChange, context.isCheckboxGroup, props.onChange, props.value]
  );

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
      ref={ref}
      aria-disabled={disabled}
      {...omit(rest, ['onChange'])}
      onClick={onLabelClick}
      className={classNames}
      style={style}
    >
      <input
        value={value}
        disabled={!!disabled}
        ref={inputRef}
        checked={!!checked}
        onChange={onChange}
        // To avoid triggering onChange twice in Select if it's used in Select option.
        onClick={(e) => e.stopPropagation()}
        type="checkbox"
      />

      {isFunction(children) ? (
        children({ checked, indeterminate })
      ) : (
        <>
          <Hover
            prefix={prefixCls}
            className={`${prefixCls}-mask-wrapper`}
            disabled={checked || disabled || indeterminate}
          >
            <div className={`${prefixCls}-mask`}>
              <IconCheck className={`${prefixCls}-mask-icon`} />
            </div>
          </Hover>
          {children && <span className={`${prefixCls}-text`}>{children}</span>}
        </>
      )}
    </label>
  );
}

interface ForwardRefCheckboxType
  extends React.ForwardRefExoticComponent<
    React.PropsWithoutRef<CheckboxProps> & React.RefAttributes<unknown>
  > {
  <T extends React.ReactText = any>(
    props: React.PropsWithChildren<CheckboxProps<T>> & {
      ref?: React.Ref<unknown>;
    }
  ): React.ReactElement;
  Group: typeof Group;
  useCheckbox: typeof useCheckbox;
}

const CheckboxComponent = React.forwardRef(Checkbox) as ForwardRefCheckboxType;

CheckboxComponent.displayName = 'Checkbox';

CheckboxComponent.Group = Group;

CheckboxComponent.useCheckbox = useCheckbox;

export default CheckboxComponent;

export { CheckboxProps };
