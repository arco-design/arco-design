import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ConfigContext } from '../ConfigProvider';
import { ColorPickerProps, HSV } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import { Panel } from './panel';
import { hexToRgb, hsvToRgb, rgbToHex, rgbToHsv } from '../_util/color';
import useMergeValue from '../_util/hooks/useMergeValue';
import cs from '../_util/classNames';
import Trigger from '../Trigger';
import { colors } from './colors';

const defaultProps = {
  size: 'default' as const,
};

function ColorPicker(baseProps: ColorPickerProps, ref) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<ColorPickerProps>(
    baseProps,
    defaultProps,
    componentConfig?.ColorPicker
  );
  const {
    style,
    className,
    size,
    disabled,
    readOnly,
    onChange,
    triggerProps = {},
    unmountOnExit,
  } = props;

  const prefixCls = getPrefixCls('color-picker');

  const [value, setValue] = useMergeValue('', props);

  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    defaultValue: props.defaultPopupVisible,
    value: props.popupVisible,
  });

  const handleVisibleChange = useCallback(
    (newVisible) => {
      if (newVisible !== popupVisible) {
        props.onVisibleChange && props.onVisibleChange(newVisible);
        if (!('popupVisible' in props)) {
          setPopupVisible(newVisible);
        }
      }
    },
    [props.onVisibleChange, popupVisible]
  );

  useEffect(() => {
    const _rgb = hexToRgb(value) || {
      r: 255,
      g: 0,
      b: 0,
    };
    const _hsv = rgbToHsv(_rgb.r, _rgb.g, _rgb.b);
    if (_hsv.h !== hsv.h || _hsv.h !== hsv.h || _hsv.h !== hsv.h) {
      setHsv(_hsv);
    }
  }, [value]);

  const [hsv, setHsv] = useState<HSV>({
    h: 0,
    s: 1,
    v: 1,
  });
  const [a, setA] = useState(1);

  const rgb = useMemo(() => {
    return hsvToRgb(hsv.h, hsv.s, hsv.v);
  }, [hsv]);

  const hex = useMemo(() => {
    return rgbToHex(rgb.r, rgb.g, rgb.b);
  }, [rgb]);

  const onHsvChange = (_value: HSV) => {
    setHsv(_value);
    onChange?.(`#${hex}`);
  };

  const onAlphaChange = (_value: number) => {
    setA(_value);
    onChange?.(`#${hex}`);
  };

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
      >
        <div className={`${prefixCls}-preview`} style={{ backgroundColor: currentColor }} />
        <div className={`${prefixCls}-value`}>{`#${hex}`}</div>
        <input className={`${prefixCls}-input`} value={`#${hex}`} />
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
        colors={colors}
        onHsvChange={onHsvChange}
        onAlphaChange={onAlphaChange}
      />
    );
  };

  return (
    <Trigger
      popup={renderPanel}
      trigger="click"
      position="bl"
      popupAlign={{
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
      }}
      // disabled={disabled as boolean}
      // popupAlign={triggerPopupAlign}
      // getPopupContainer={getPopupContainer}
      // onVisibleChange={visibleChange}
      popupVisible={popupVisible}
      classNames="slideDynamicOrigin"
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
