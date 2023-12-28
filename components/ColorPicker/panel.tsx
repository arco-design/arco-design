import React, { ReactNode, useContext, useMemo, useState } from 'react';
import { ControlBar } from './control-bar';
import { ConfigContext } from '../ConfigProvider';
import { Palette } from './palette';
import Select from '../Select';
import { InputRgb } from './input-rgb';
import { InputHex } from './input-hex';
import { Color, HSV } from './interface';
import { hexToRgb, rgbToHsv } from '../_util/color';

interface PanelProps {
  color: Color;
  alpha: number;
  colorString: string;
  showHistory?: boolean;
  historyColors?: string[];
  showPreset?: boolean;
  presetColors?: string[];
  renderHistory?: () => ReactNode;
  renderPreset?: () => ReactNode;
  renderPickSection?: () => ReactNode;
  onHsvChange: (value: HSV) => void;
  onAlphaChange: (value: number) => void;
}

export const Panel: React.FC<PanelProps> = ({
  color,
  alpha,
  colorString,
  historyColors,
  presetColors,
  showHistory,
  showPreset,
  renderPreset,
  renderHistory,
  renderPickSection,
  onHsvChange,
  onAlphaChange,
}) => {
  const { getPrefixCls, locale } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');
  const [format, setFormat] = useState<'hex' | 'rgb'>('hex');
  const { h, s, v } = color.hsv;
  const history = useMemo(() => {
    const set = new Set(historyColors ?? []);
    return Array.from(set);
  }, [historyColors]);

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
      return (
        <InputRgb
          color={color}
          alpha={alpha}
          onHsvChange={onHsvChange}
          onAlphaChange={onAlphaChange}
        />
      );
    }
    return (
      <InputHex
        color={color}
        alpha={alpha}
        onHsvChange={onHsvChange}
        onAlphaChange={onAlphaChange}
      />
    );
  };

  const renderColorBlock = (color: string) => {
    return (
      <div
        key={color}
        className={`${prefixCls}-color-block`}
        onClick={() => {
          onHexInputChange(color);
        }}
      >
        <div className={`${prefixCls}-block`} style={{ backgroundColor: color }} />
      </div>
    );
  };

  const renderHistorySec = () => {
    if (renderHistory) {
      return renderHistory();
    }
    if (showHistory) {
      return (
        <div className={`${prefixCls}-colors-section`}>
          <div className={`${prefixCls}-colors-text`}>{locale.ColorPicker.history}</div>
          <div className={`${prefixCls}-colors-wrapper`}>
            {history?.length ? (
              <div className={`${prefixCls}-colors-list`}>{history.map(renderColorBlock)}</div>
            ) : (
              <span className={`${prefixCls}-colors-empty`}>{locale.ColorPicker.empty}</span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderPresetSec = () => {
    if (renderPreset) {
      return renderPreset();
    }
    if (showPreset) {
      return (
        <div className={`${prefixCls}-colors-section`}>
          <div className={`${prefixCls}-colors-text`}>{locale.ColorPicker.preset}</div>
          <div className={`${prefixCls}-colors-wrapper`}>
            <div className={`${prefixCls}-colors-list`}>{presetColors?.map(renderColorBlock)}</div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderColorSec = () => {
    if (renderPickSection) {
      return renderPickSection();
    }
    if (showHistory || showPreset) {
      return (
        <div className={`${prefixCls}-panel-colors`}>
          {renderHistorySec()}
          {renderPresetSec()}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`${prefixCls}-panel`}>
      <Palette color={color} onChange={(s, v) => onHsvChange({ h, s, v })} />
      <div className={`${prefixCls}-panel-control`}>
        <div className={`${prefixCls}-control-wrapper`}>
          <div>
            <ControlBar
              type="hue"
              x={h}
              color={color}
              colorString={colorString}
              onChange={(h) => onHsvChange({ h, s, v })}
            />
            <ControlBar
              type="alpha"
              x={alpha}
              color={color}
              colorString={colorString}
              onChange={onAlphaChange}
            />
          </div>
          <div className={`${prefixCls}-preview`} style={{ backgroundColor: colorString }} />
        </div>
        <div className={`${prefixCls}-input-wrapper`}>
          <Select
            className={`${prefixCls}-select-type`}
            size="mini"
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
            triggerProps={{
              className: `${prefixCls}-type-dropdown`,
            }}
            onChange={setFormat}
          />
          <div className={`${prefixCls}-group-wrapper`}>{renderInput()}</div>
        </div>
      </div>
      {renderColorSec()}
    </div>
  );
};
