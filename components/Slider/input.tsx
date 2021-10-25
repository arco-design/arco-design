import React, { memo } from 'react';
import cs from '../_util/classNames';
import InputNumber from '../InputNumber';

interface InputProps {
  min?: number;
  max?: number;
  step?: number;
  value: number[];
  range?: boolean;
  disabled?: boolean;
  prefixCls?: string;
  onChange: (val: number[]) => void;
}

const Input = function(props: InputProps) {
  const { value, range, min, max, step, disabled, prefixCls, onChange } = props;
  const inputProps = {
    min,
    max,
    step,
    disabled,
    hideControl: true,
  };
  const sortValue = [...value].sort((a, b) => a - b);

  function handleChange(val) {
    onChange(val);
  }

  return (
    <div className={cs(`${prefixCls}-input`, { [`${prefixCls}-input-group`]: range })}>
      {range && [
        <InputNumber
          value={sortValue[0]}
          key={0}
          {...inputProps}
          onChange={(val) => {
            handleChange([val, sortValue[1]]);
          }}
        />,
        <div key={1} className={`${prefixCls}-input-range`}>
          <span className={`${prefixCls}-input-range-content`} />
        </div>,
      ]}
      <InputNumber
        key={2}
        value={sortValue[1]}
        {...inputProps}
        onChange={(val) => {
          handleChange([sortValue[0], val]);
        }}
      />
    </div>
  );
};

export default memo(Input);
