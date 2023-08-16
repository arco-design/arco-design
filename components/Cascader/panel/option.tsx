import React, { ReactNode } from 'react';
import Checkbox from '../../Checkbox';
import Node from '../base/node';
import { OptionProps } from '../interface';

export interface CascaderOptionProps<T> {
  prefixCls?: string;
  rtl?: boolean;
  multiple?: boolean;
  selected?: boolean;
  isLeaf?: boolean;
  option: Node<T>;
  icons?: {
    loading?: ReactNode;
    checked?: ReactNode;
    next?: ReactNode;
  };
  renderOption?: () => ReactNode;
  onClickOption?: () => void;
  onDoubleClickOption?: () => void;
  onMouseEnter?: () => void;
  onMultipleChecked?: (checked: boolean) => void;
}

const Option = <T extends OptionProps>(props: CascaderOptionProps<T>) => {
  const { prefixCls, multiple, option, renderOption, selected, icons } = props;

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
        {option.isLeaf ? selected && icons.checked : option.loading ? icons.loading : icons.next}
      </div>
    </>
  );
};
export default Option;
