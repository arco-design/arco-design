import React, { memo, useEffect, useState } from 'react';
import InputNumber from '../InputNumber';
import cs from '../_util/classNames';

interface InputProps {
  min?: number;
  max?: number;
  step?: number;
  value: number[];
  range?: boolean;
  disabled?: boolean;
  prefixCls?: string;
  onChange?: (val: number[]) => void;
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
  const [innerValue, setInnerValue] = useState(value);
  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const handleChange = (val: number[]) => {
    onChange?.(val);
  };

  const handleBlur = () => {
    setInnerValue([...value].sort((a, b) => a - b));
  };

  return (
    <div
      className={cs(`${prefixCls}-input`, { [`${prefixCls}-input-group`]: range })}
      onBlur={handleBlur}
    >
      {range && [
        <InputNumber
          value={innerValue[0]}
          key={0}
          {...inputProps}
          onChange={(val) => {
            handleChange([val, innerValue[1]]);
          }}
        />,
        <div key={1} className={`${prefixCls}-input-range`}>
          <span className={`${prefixCls}-input-range-content`} />
        </div>,
      ]}
      <InputNumber
        key={2}
        value={innerValue[1]}
        {...inputProps}
        onChange={(val) => {
          handleChange([innerValue[0], val]);
        }}
      />
    </div>
  );
};

export default memo(Input);
