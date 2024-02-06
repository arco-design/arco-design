import React, { useContext } from 'react';
import Input from '../Input';
import InputNumber from '../InputNumber';
import { Color, HSV, RGB } from './interface';
import { ConfigContext } from '../ConfigProvider';
import { InputAlpha } from './input-alpha';
import { rgbToHsv } from '../_util/color';

interface InputRgbProps {
  color: Color;
  alpha: number;
  onHsvChange: (value: HSV) => void;
  onAlphaChange: (value: number) => void;
}

export const InputRgb = ({ color, alpha, onHsvChange, onAlphaChange }: InputRgbProps) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');

  const onInputChange = (_value: RGB) => {
    const hsv = rgbToHsv(_value.r, _value.g, _value.b);
    onHsvChange(hsv);
  };

  const { r, g, b } = color.rgb;

  return (
    <Input.Group className={`${prefixCls}-input-group`} compact>
      <InputNumber
        size="mini"
        min={0}
        max={255}
        hideControl
        value={r}
        onChange={(r) => onInputChange({ r, g, b })}
      />
      <InputNumber
        size="mini"
        min={0}
        max={255}
        hideControl
        value={g}
        onChange={(g) => onInputChange({ r, g, b })}
      />
      <InputNumber
        size="mini"
        min={0}
        max={255}
        hideControl
        value={b}
        onChange={(b) => onInputChange({ r, g, b })}
      />
      <InputAlpha value={alpha} onChange={onAlphaChange} />
    </Input.Group>
  );
};
