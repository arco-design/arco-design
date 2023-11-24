import React, { useContext, useState } from 'react';
import { ControlBar } from './control-bar';
import { ConfigContext } from '../ConfigProvider';
import { Palette } from './palette';
import Select from '../Select';
import { InputRgb } from './input-rgb';
import { InputHex } from './input-hex';
import { Color, HSV } from './interface';
import { hexToRgb, rgbToHsv } from '../_util/color';

interface PanelProps {
  value: Color;
  current: string;
  colors: string[];
  onHsvChange: (value: HSV) => void;
  onAlphaChange: (value: number) => void;
}

export const Panel: React.FC<PanelProps> = ({
  value,
  current,
  colors,
  onHsvChange,
  onAlphaChange,
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');
  const [format, setFormat] = useState<'hex' | 'rgb'>('hex');

  const onHexInputChange = (_value: string) => {
    const _rgb = hexToRgb(_value) || {
      r: 255,
      g: 0,
      b: 0,
    };
    const _hsv = rgbToHsv(_rgb.r, _rgb.g, _rgb.b);
    onHsvChange(_hsv);
  };

  const renderInput = () => {
    if (format === 'rgb') {
      return <InputRgb value={value} onHsvChange={onHsvChange} onAlphaChange={onAlphaChange} />;
    }
    return <InputHex value={value} onHsvChange={onHsvChange} onAlphaChange={onAlphaChange} />;
  };

  const renderColorBlock = (color: string) => {
    return (
      <div
        className={`${prefixCls}-color-block`}
        style={{ backgroundColor: color }}
        onClick={() => {
          onHexInputChange(color);
        }}
      />
    );
  };

  return (
    <div className={`${prefixCls}-panel`}>
      <Palette
        h={value.hsv.h}
        s={value.hsv.s}
        v={value.hsv.v}
        onChange={(s, v) => onHsvChange({ ...value.hsv, s, v })}
      />
      <div className={`${prefixCls}-panel-control`}>
        <div className={`${prefixCls}-control-wrapper`}>
          <div>
            <ControlBar
              type="hue"
              x={value.hsv.h}
              current={current}
              onChange={(h) => onHsvChange({ ...value.hsv, h })}
            />
            <ControlBar
              style={{ marginTop: 16 }}
              type="alpha"
              x={value.alpha}
              color={value.rgb}
              current={current}
              onChange={onAlphaChange}
            />
          </div>
          <div className={`${prefixCls}-preview`} style={{ backgroundColor: current }} />
        </div>
        <div className={`${prefixCls}-input-wrapper`}>
          <Select
            className={`${prefixCls}-select-type`}
            options={[
              {
                value: 'hex',
                label: 'Hex',
              },
              {
                value: 'rgb',
                label: 'RGB',
              },
            ]}
            value={format}
            onChange={setFormat}
          />
          <div className={`${prefixCls}-group-wrapper`}>{renderInput()}</div>
        </div>
      </div>
      <div className={`${prefixCls}-panel-colors`}>
        <div className={`${prefixCls}-colors-text`}>最近使用颜色</div>
        <div className={`${prefixCls}-colors-wrapper`}>暂无</div>
        <div className={`${prefixCls}-colors-text`}>系统预设颜色</div>
        <div className={`${prefixCls}-colors-wrapper`}>{colors?.map(renderColorBlock)}</div>
      </div>
    </div>
  );
};
