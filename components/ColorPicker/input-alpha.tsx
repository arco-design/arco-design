import React, { useContext } from 'react';
import InputNumber from '../InputNumber';
import { ConfigContext } from '../ConfigProvider';

interface InputAlphaProps {
  value: number;
  onChange: (value: number) => void;
}

export const InputAlpha: React.FC<InputAlphaProps> = ({ value, onChange }) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');

  return (
    <InputNumber
      className={`${prefixCls}-input-alpha`}
      size="mini"
      min={0}
      max={100}
      value={Math.round(value * 100)}
      suffix="%"
      onChange={(a) => onChange(a / 100)}
    />
  );
};
