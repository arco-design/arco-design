import React, { useContext } from 'react';
import Input from '../Input';
import InputNumber from '../InputNumber';
import { Color, HSV, RGB } from './interface';
import { ConfigContext } from '../ConfigProvider';
import { InputAlpha } from './input-alpha';
import { rgbToHsv } from '../_util/color';

interface InputRgbProps {
  value: Color;
  onHsvChange: (value: HSV) => void;
  onAlphaChange: (value: number) => void;
}

export const InputRgb = ({ value, onHsvChange, onAlphaChange }: InputRgbProps) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');

  const onInputChange = (_value: RGB) => {
    const hsv = rgbToHsv(_value.r, _value.g, _value.b);
    onHsvChange(hsv);
  };

  return (
    <Input.Group className={`${prefixCls}-input-group`} compact>
      <InputNumber
        min={0}
        max={255}
        value={value.rgb.r}
        onChange={(r) => onInputChange({ ...value.rgb, r })}
      />
      <InputNumber
        min={0}
        max={255}
        value={value.rgb.g}
        onChange={(g) => onInputChange({ ...value.rgb, g })}
      />
      <InputNumber
        min={0}
        max={255}
        value={value.rgb.b}
        onChange={(b) => onInputChange({ ...value.rgb, b })}
      />
      <InputAlpha value={value.alpha} onChange={onAlphaChange} />
    </Input.Group>
  );
};
