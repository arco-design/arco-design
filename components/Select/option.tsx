import React from 'react';
import cs from '../_util/classNames';
import Checkbox from '../Checkbox';
import { OptionProps } from './interface';
import omit from '../_util/omit';

function Option(props: OptionProps, ref) {
  const {
    style,
    className,
    wrapperClassName,
    children,
    disabled,
    prefixCls,
    isMultipleMode,
    value: propValue,
    valueActive,
    valueSelect,
    onMouseEnter,
    onMouseLeave,
    onClickOption,
    ...rest
  } = props;

  const value = 'value' in props ? propValue : children.toString();
  const isChecked = isMultipleMode
    ? (valueSelect as any[]).indexOf(value) !== -1
    : valueSelect === value;

  const optionLabelProps = {
    style,
    className: cs(
      `${prefixCls}-option`,
      {
        [`${prefixCls}-option-selected`]: isChecked,
        [`${prefixCls}-option-disabled`]: disabled,
        [`${prefixCls}-option-hover`]: value === valueActive,
        [`${prefixCls}-option-empty`]: !children,
      },
      className
    ),
    onMouseEnter: () => onMouseEnter && onMouseEnter(value),
    onMouseLeave: () => onMouseLeave && onMouseLeave(),
    onClick: (event) => {
      onClickOption && onClickOption(value, disabled);
      rest.onClick && rest.onClick(event);
    },
    ...omit(rest, ['_key', 'extra', 'isSelectOption', 'onClick', 'onMouseEnter', 'onMouseLeave']),
  };

  if (isMultipleMode) {
    return (
      <li
        ref={ref}
        className={cs(
          `${prefixCls}-option-wrapper`,
          {
            [`${prefixCls}-option-wrapper-selected`]: isChecked,
            [`${prefixCls}-option-wrapper-disabled`]: disabled,
          },
          wrapperClassName
        )}
      >
        <Checkbox
          className={`${prefixCls}-checkbox`}
          checked={isChecked}
          disabled={disabled}
          onChange={optionLabelProps.onClick}
        />
        <span {...optionLabelProps}>{children}</span>
      </li>
    );
  }

  return <li {...optionLabelProps}>{children}</li>;
}

const OptionComponent = React.forwardRef<unknown, OptionProps>(Option);

OptionComponent.defaultProps = {
  // private use
  isSelectOption: true,
};

export default OptionComponent;
