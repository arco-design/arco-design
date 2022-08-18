import React, { ReactNode } from 'react';
import Checkbox from '../../Checkbox';
import IconRight from '../../../icon/react-icon/IconRight';
import IconLeft from '../../../icon/react-icon/IconLeft';
import IconLoading from '../../../icon/react-icon/IconLoading';
import IconCheck from '../../../icon/react-icon/IconCheck';
import Node from '../base/node';
import { OptionProps } from '../interface';

export interface CascaderOptionProps<T> {
  prefixCls?: string;
  rtl?: boolean;
  multiple?: boolean;
  selected?: boolean;
  isLeaf?: boolean;
  option: Node<T>;
  renderOption?: () => ReactNode;
  onClickOption?: () => void;
  onDoubleClickOption?: () => void;
  onMouseEnter?: () => void;
  onMultipleChecked?: (checked: boolean) => void;
}

const Option = <T extends OptionProps>(props: CascaderOptionProps<T>) => {
  const { prefixCls, multiple, option, renderOption, selected, rtl } = props;

  const checkboxDisabled = option.disabled || (multiple && option.disableCheckbox);

  return (
    <>
      {multiple ? (
        <Checkbox
          disabled={checkboxDisabled}
          checked={option._checked}
          indeterminate={option._halfChecked}
          onChange={props.onMultipleChecked}
          value={option.value}
        />
      ) : (
        ''
      )}
      <div
        className={`${prefixCls}-list-item-label`}
        onClick={option.disabled ? undefined : props.onClickOption}
        onMouseEnter={props.onMouseEnter}
        onDoubleClick={checkboxDisabled ? undefined : props.onDoubleClickOption}
      >
        {renderOption ? renderOption() : option.label}
        {option.isLeaf ? (
          selected && <IconCheck />
        ) : option.loading ? (
          <IconLoading />
        ) : rtl ? (
          <IconLeft />
        ) : (
          <IconRight />
        )}
      </div>
    </>
  );
};
export default Option;
