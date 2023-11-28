import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { ColorPickerProps, HSV } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { Panel } from './panel';
import { formatInputToRgb, hsvToRgb, rgbaToHex, rgbToHex, rgbToHsv } from '../_util/color';
import useMergeValue from '../_util/hooks/useMergeValue';
import cs from '../_util/classNames';
import Trigger from '../Trigger';
import { colors } from './colors';

const defaultProps: ColorPickerProps = {
  size: 'default' as const,
  presetColors: colors,
};

function ColorPicker(baseProps: ColorPickerProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<ColorPickerProps>(
    baseProps,
    defaultProps,
    componentConfig?.ColorPicker,
  );
  const {
    style,
    className,
    size,
    disabled,
    onChange,
    triggerProps = {},
    unmountOnExit,
    format,
    showText,
    historyColors,
    presetColors,
    showHistory,
    showPreset,
    renderHistory,
    renderPreset,
    renderPickSection,
  } = props;

  const prefixCls = getPrefixCls('color-picker');

  const [value, setValue] = useMergeValue('', props);

  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    defaultValue: props.defaultPopupVisible,
    value: props.popupVisible,
  });

  const hsvaFromInput = useMemo(() => {
    const rgb = formatInputToRgb(value);

    if (rgb) {
      const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      return {
        ...hsv,
        a: rgb.a ?? 1,
      };
    }
    return {
      h: 0,
      s: 1,
      v: 1,
      a: 1,
    };
  }, [value]);

  const handleVisibleChange = useCallback(
    (newVisible) => {
      if (newVisible) {
        setHsv({
          h: hsvaFromInput.h,
          s: hsvaFromInput.s,
          v: hsvaFromInput.v,
        });
        setA(hsvaFromInput.a);
      }

      if (newVisible !== popupVisible) {
        props.onVisibleChange && props.onVisibleChange(newVisible);
        if (!('popupVisible' in props)) {
          setPopupVisible(newVisible);
        }
      }
    },
    [props.onVisibleChange, popupVisible, value],
  );

  const [hsv, setHsv] = useState<HSV>({
    h: hsvaFromInput.h,
    s: hsvaFromInput.s,
    v: hsvaFromInput.v,
  });
  const [a, setA] = useState(hsvaFromInput.a);

  const rgb = useMemo(() => {
    return hsvToRgb(hsv.h, hsv.s, hsv.v);
  }, [hsv]);

  const hex = useMemo(() => {
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }, [rgb]);

  const onHsvChange = (_value: HSV) => {
    setHsv(_value);
  };

  const onAlphaChange = (_value: number) => {
    setA(_value);
  };

  useEffect(() => {
    let _value = '';
    if (format === 'rgb') {
      _value = a < 1 ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a.toFixed(2)})` : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else {
      _value = a < 1 ? `#${rgbaToHex(rgb.r, rgb.g, rgb.b, a)}` : `#${rgbToHex(rgb.r, rgb.g, rgb.b)}`;
    }
    setValue(_value);
    onChange?.(_value);
  }, [format, rgb, a]);

  const currentColor = useMemo(() => {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a.toFixed(2)})`;
  }, [rgb, a]);

  const renderInput = () => {
    return (
      <div
        className={cs(prefixCls, className, {
          [`${prefixCls}-size-${size}`]: size,
          [`${prefixCls}-disabled`]: disabled,
        })}
        style={style}
        ref={ref}
      >
        <div className={`${prefixCls}-preview`} style={{ backgroundColor: value }} />
        {Boolean(showText) && <div className={`${prefixCls}-value`}>{value}</div>}
        <input className={`${prefixCls}-input`} value={value} disabled={disabled} />
      </div>
    );
  };

  const renderPanel = () => {
    return (
      <Panel
        value={{
          hsv,
          rgb,
          hex,
          alpha: a,
        }}
        current={currentColor}
        historyColors={historyColors}
        presetColors={presetColors}
        showHistory={showHistory}
        showPreset={showPreset}
        renderHistory={renderHistory}
        renderPreset={renderPreset}
        renderPickSection={renderPickSection}
        onHsvChange={onHsvChange}
        onAlphaChange={onAlphaChange}
      />
    );
  };

  return (
    <Trigger
      popup={renderPanel}
      trigger='click'
      position='bl'
      popupAlign={{
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
      }}
      disabled={disabled}
      popupVisible={popupVisible}
      classNames='slideDynamicOrigin'
      unmountOnExit={unmountOnExit}
      {...triggerProps}
      onVisibleChange={handleVisibleChange}
    >
      {renderInput()}
    </Trigger>
  );
}

const ColorPickerComponent = React.forwardRef<unknown, ColorPickerProps>(ColorPicker);

ColorPickerComponent.displayName = 'ColorPicker';

export default ColorPickerComponent;

export { ColorPickerProps };
