import React, { ReactNode, useContext, useMemo, useState } from 'react';
import { ControlBar } from './control-bar';
import { ConfigContext } from '../ConfigProvider';
import { Palette } from './palette';
import Radio from '../Radio';
import Select from '../Select';
import { InputRgb } from './input-rgb';
import { InputHex } from './input-hex';
import { Color, ColorPickerMode, GradientColor, HSV, InternalGradientColor } from './interface';
import { getColorString, hexToRgb, rgbToHsv } from '../_util/color';
import { isGradientMode, isMultiMode } from './mode';
import { getColorByGradients, renderGradientBackground, sortGradientColors } from './utils';

const RadioGroup = Radio.Group;

interface PanelProps {
  value: string | GradientColor[];
  mode: ColorPickerMode | ColorPickerMode[];
  activeMode: ColorPickerMode;
  gradientColors: InternalGradientColor[];
  activeColorIndex: number;
  color: Color;
  alpha: number;
  disabledAlpha: boolean;
  showHistory?: boolean;
  historyColors?: string[];
  showPreset?: boolean;
  presetColors?: string[];
  renderHistory?: () => ReactNode;
  renderPreset?: () => ReactNode;
  renderPickSection?: () => ReactNode;
  renderFooter?: () => ReactNode;
  onHsvChange: (value: HSV) => void;
  onAlphaChange: (value: number) => void;
  onActiveModeChange: (value: ColorPickerMode) => void;
  onGradientColorsChange: (value: InternalGradientColor[]) => void;
  // | ((fn: (value: InternalGradientColor[]) => InternalGradientColor[]) => void);
  onActiveColorIndexChange: (index: number) => void;
}

export const Panel: React.FC<PanelProps> = ({
  value,
  mode,
  activeMode,
  gradientColors,
  activeColorIndex,
  color,
  alpha,
  disabledAlpha,
  historyColors,
  presetColors,
  showHistory,
  showPreset,
  renderPreset,
  renderHistory,
  renderPickSection,
  renderFooter,
  onHsvChange,
  onAlphaChange,
  onActiveModeChange,
  onGradientColorsChange,
  onActiveColorIndexChange,
}) => {
  const { getPrefixCls, locale } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('color-picker');
  const [format, setFormat] = useState<'hex' | 'rgb'>('hex');
  const history = useMemo(() => {
    const set = new Set(historyColors ?? []);
    return Array.from(set);
  }, [historyColors]);
  const { h, s, v } = color.hsv;
  const { r, g, b } = color.rgb;

  const onHexInputChange = (_value: string) => {
    const _rgb = hexToRgb(_value) || {
      r: 255,
      g: 0,
      b: 0,
    };
    const _hsv = rgbToHsv(_rgb.r, _rgb.g, _rgb.b);
    onHsvChange(_hsv);
  };

  const renderModeTag = () => {
    return (
      <RadioGroup
        className={`${prefixCls}-panel-control-gradient-tag`}
        type="button"
        size="small"
        value={activeMode}
        onChange={onActiveModeChange}
      >
        <Radio value={ColorPickerMode.Single}>{locale.ColorPicker.singleColor}</Radio>
        <Radio value={ColorPickerMode.Gradient}>{locale.ColorPicker.gradientColor}</Radio>
      </RadioGroup>
    );
  };

  const renderGradientBar = () => {
    const handleAdd = (x: number) => {
      const percent = Math.round(x * 100);
      const newColor = getColorByGradients(gradientColors, percent);
      const newColors = sortGradientColors(gradientColors.concat(newColor));
      onGradientColorsChange(newColors);
      onActiveColorIndexChange(newColors.findIndex((item) => percent === item.percent));
      onHsvChange(newColor.color.hsv);
      onAlphaChange(newColor.alpha);
    };
    const handleChange = (x: number) => {
      if (activeColorIndex === 0 || activeColorIndex === gradientColors.length - 1) {
        return;
      }
      onGradientColorsChange(
        sortGradientColors(
          gradientColors.map((item, index) => {
            if (index === activeColorIndex) {
              return getColorByGradients(gradientColors, x * 100);
            }
            return item;
          })
        )
      );
    };

    const handleActive = (index: number) => {
      onActiveColorIndexChange(index);
      onHsvChange(gradientColors[index].color.hsv);
      onAlphaChange(gradientColors[index].alpha);
    };
    return (
      <div className={`${prefixCls}-control-bar-gradient`}>
        <ControlBar
          multiple
          value={gradientColors.map((item) => item.percent / 100)}
          onAdd={handleAdd}
          onChange={handleChange}
          onActive={handleActive}
          style={{
            background: renderGradientBackground(gradientColors),
          }}
          renderHandlerStyle={(index) => {
            if (activeColorIndex === index) {
              return {
                outline: '1px solid rgb(var(--primary-6))',
              };
            }
            return {};
          }}
          renderHandlerCenterStyle={(index) => {
            const {
              color: {
                rgb: { r, g, b },
              },
              alpha,
            } = gradientColors[index];
            return {
              background: getColorString(r, g, b, alpha),
            };
          }}
        />
      </div>
    );
  };

  const renderInput = () => {
    if (format === 'rgb') {
      return (
        <InputRgb
          color={color}
          alpha={alpha}
          onHsvChange={onHsvChange}
          onAlphaChange={onAlphaChange}
          disabledAlpha={disabledAlpha}
        />
      );
    }
    return (
      <InputHex
        color={color}
        alpha={alpha}
        onHsvChange={onHsvChange}
        onAlphaChange={onAlphaChange}
        disabledAlpha={disabledAlpha}
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
      <div className={isMultiMode(mode) && `${prefixCls}-panel-control-gradient`}>
        {isMultiMode(mode) && renderModeTag()}
        {isGradientMode(activeMode) && renderGradientBar()}
        <Palette
          color={color}
          onChange={(s, v) => {
            onHsvChange({ h, s, v });
          }}
        />
      </div>
      <div className={`${prefixCls}-panel-control`}>
        <div className={`${prefixCls}-control-wrapper`}>
          <div>
            <ControlBar
              className={`${prefixCls}-control-bar-hue`}
              value={h}
              onChange={(h) => onHsvChange({ h, s, v })}
              renderHandlerCenterStyle={() => ({
                background: getColorString(r, g, b, 1),
              })}
            />
            {!disabledAlpha && (
              <div className={`${prefixCls}-control-bar-bg`}>
                <ControlBar
                  className={`${prefixCls}-control-bar-alpha`}
                  style={{
                    background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${r}, ${g}, ${b}))`,
                  }}
                  value={alpha}
                  onChange={onAlphaChange}
                  renderHandlerCenterStyle={() => ({
                    background: getColorString(r, g, b, alpha),
                  })}
                />
              </div>
            )}
          </div>
          <div
            className={`${prefixCls}-preview`}
            style={{ backgroundColor: getColorString(r, g, b, alpha) }}
          />
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
      {typeof renderFooter === 'function' ? renderFooter() : null}
    </div>
  );
};
