import React, { useContext, useEffect, useState } from 'react';
import Input from '../Input';
import { Color, HSV } from './interface';
import { InputAlpha } from './input-alpha';
import { hexToRgb, rgbToHsv } from '../_util/color';
import { ConfigContext } from '../ConfigProvider';

interface InputHexProps {
  color: Color;
  alpha: number;
  onHsvChange: (value: HSV) => void;
  onAlphaChange: (value: number) => void;
}

export const InputHex: React.FC<InputHexProps> = ({ color, alpha, onHsvChange, onAlphaChange }) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');
  const [hex, setHex] = useState(color.hex);

  useEffect(() => {
    if (color.hex !== hex) {
      setHex(color.hex);
    }
  }, [color]);

  const onInputChange = (value: string) => {
    const matchValue = value.match(/[a-fA-F0-9]*/g)?.join('') ?? '';
    if (matchValue !== hex) {
      setHex(matchValue.toUpperCase());
    }
  };

  const onBlur = () => {
    const _rgb = hexToRgb(hex) || {
      r: 255,
      g: 0,
      b: 0,
    };
    const _hsv = rgbToHsv(_rgb.r, _rgb.g, _rgb.b);
    onHsvChange(_hsv);
  };

  const onPaste = (ev: ClipboardEvent) => {
    let text = ev.clipboardData.getData('Text');
    if (text.startsWith('#')) {
      text = text.slice(1);
    }
    onInputChange(text);
    ev.preventDefault();
  };

  return (
    <Input.Group className={`${prefixCls}-input-group`} compact>
      <Input
        className={`${prefixCls}-input-hex`}
        prefix="#"
        size="mini"
        maxLength={6}
        value={hex}
        onChange={onInputChange}
        onBlur={onBlur}
        onPressEnter={onBlur}
        onPaste={onPaste as any}
      />
      <InputAlpha value={alpha} onChange={onAlphaChange} />
    </Input.Group>
  );
};
