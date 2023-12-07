import { useCallback, useEffect, useMemo, useState } from 'react';
import { HSV } from '../interface';
import { formatInputToHSVA, hsvToRgb, rgbaToHex, rgbToHex } from '../../_util/color';
import useMergeValue from '../../_util/hooks/useMergeValue';

interface UseColorPickerProps {
  value?: string;
  defaultValue?: string;
  defaultPopupVisible?: boolean;
  popupVisible?: boolean;
  format?: 'hex' | 'rgb';
  onChange?: (value: string) => void;
  onVisibleChange?: (visible: boolean) => void;
}

export const useColorPicker = (props: UseColorPickerProps) => {
  const { format, onChange } = props;

  const [value, setValue] = useMergeValue('', props);

  const formatInput = useMemo(() => {
    return formatInputToHSVA(value);
  }, [value]);

  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    defaultValue: props.defaultPopupVisible,
    value: props.popupVisible,
  });

  const [hsv, setHsv] = useState<HSV>({
    h: formatInput.h,
    s: formatInput.s,
    v: formatInput.v,
  });
  const [alpha, setAlpha] = useState(formatInput.a);

  const color = useMemo(() => {
    const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    return {
      hsv,
      rgb,
      hex,
    };
  }, [hsv]);

  const colorString = useMemo(() => {
    const { r, g, b } = color.rgb;
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
  }, [color, alpha]);

  const formatValue = useMemo(() => {
    const { r, g, b } = color.rgb;
    if (format === 'rgb') {
      return alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})` : `rgb(${r}, ${g}, ${b})`;
    }
    return alpha < 1 ? `#${rgbaToHex(r, g, b, alpha)}` : `#${rgbToHex(r, g, b)}`;
  }, [color, alpha, format]);

  useEffect(() => {
    setValue(formatValue);
    onChange?.(formatValue);
  }, [formatValue]);

  const onVisibleChange = useCallback(
    (newVisible) => {
      if (newVisible && value !== formatValue) {
        const { h, s, v, a } = formatInput;
        setHsv({ h, s, v });
        setAlpha(a);
      }

      if (newVisible !== popupVisible) {
        props.onVisibleChange && props.onVisibleChange(newVisible);
        if (!('popupVisible' in props)) {
          setPopupVisible(newVisible);
        }
      }
    },
    [props.onVisibleChange, popupVisible, value]
  );

  const onHsvChange = (_value: HSV) => {
    setHsv(_value);
  };

  const onAlphaChange = (_value: number) => {
    setAlpha(_value);
  };

  return {
    value,
    popupVisible,
    color,
    alpha,
    colorString,
    onHsvChange,
    onAlphaChange,
    onVisibleChange,
  };
};
