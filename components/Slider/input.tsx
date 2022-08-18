import React, { memo, useEffect, useState } from 'react';
import InputNumber, { InputNumberProps } from '../InputNumber';
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
  extra?: InputNumberProps[];
}

const Input = function (props: InputProps) {
  const { value, range, min, max, step, disabled, prefixCls, onChange, extra = [] } = props;
  const baseProps = {
    min,
    max,
    step,
    disabled,
  };
  const [innerValue, setInnerValue] = useState(value);
  const beginExtraProps = extra[0];
  const endExtraProps = range ? extra[1] : extra[0];

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
          {...{ hideControl: true, ...beginExtraProps, ...baseProps }}
          value={innerValue[0]}
          key={0}
          onChange={(val) => {
            handleChange([val, innerValue[1]]);
            beginExtraProps?.onChange && beginExtraProps?.onChange(val);
          }}
        />,
        <div key={1} className={`${prefixCls}-input-range`}>
          <span className={`${prefixCls}-input-range-content`} />
        </div>,
      ]}
      <InputNumber
        {...{ hideControl: true, ...endExtraProps, ...baseProps }}
        key={2}
        value={innerValue[1]}
        onChange={(val) => {
          handleChange([innerValue[0], val]);
          endExtraProps?.onChange && endExtraProps?.onChange(val);
        }}
      />
    </div>
  );
};

export default memo(Input);
