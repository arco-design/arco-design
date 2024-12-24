import { useEffect, useMemo, useState } from 'react';
import { ColorPickerMode, GradientColor, HSV, InternalGradientColor } from '../interface';
import { formatInputToHSVA } from '../../_util/color';
import useMergeValue from '../../_util/hooks/useMergeValue';
import useIsFirstRender from '../../_util/hooks/useIsFirstRender';
import { getInitialActiveMode, isGradientMode, isSingleMode } from '../mode';
import { getColorFromHsv, formatRgba, formatHex } from '../utils';

interface UseColorPickerProps {
  mode?: ColorPickerMode | ColorPickerMode[];
  value?: string | GradientColor[];
  defaultValue?: string | GradientColor[];
  defaultPopupVisible?: boolean;
  disabledAlpha?: boolean;
  popupVisible?: boolean;
  format?: 'hex' | 'rgb';
  onChange?: (value: string | GradientColor[]) => void;
  onVisibleChange?: (visible: boolean) => void;
}

const mapValueToGradientColor = (value: GradientColor[]): InternalGradientColor[] =>
  (value as GradientColor[]).map((item) => {
    const formatInput = formatInputToHSVA(item.color);
    return {
      color: getColorFromHsv(formatInput),
      alpha: formatInput.a,
      percent: item.percent,
    };
  });

const equalsHsv = (a: HSV, b: HSV) => {
  return a.h === b.h && a.s === b.s && a.v === b.v;
};

export const useColorPicker = (props: UseColorPickerProps) => {
  const { mode = ColorPickerMode.Single, format, onChange, disabledAlpha } = props;

  const isFirstRender = useIsFirstRender();

  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    defaultValue: props.defaultPopupVisible,
    value: props.popupVisible,
  });

  const [activeMode, setActiveMode] = useState<ColorPickerMode>(getInitialActiveMode(mode));

  const [value, setValue] = useMergeValue(activeMode === ColorPickerMode.Gradient ? [] : '', props);

  const [gradientColors, setGradientColors] = useState<InternalGradientColor[]>([]);
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  useEffect(() => {
    if (isGradientMode(activeMode) && Array.isArray(value)) {
      setGradientColors(mapValueToGradientColor(value as GradientColor[]));
    }
  }, []);

  const formatInput = isGradientMode(activeMode)
    ? formatInputToHSVA((value as GradientColor[])[activeColorIndex].color)
    : formatInputToHSVA(value as string);

  /** editing values */
  const [hsv, setHsv] = useState<HSV>({
    h: formatInput.h,
    s: formatInput.s,
    v: formatInput.v,
  });
  const [alpha, setAlpha] = useState(formatInput.a);

  const color = getColorFromHsv(hsv);

  const formatValue = useMemo(() => {
    if (isSingleMode(activeMode)) {
      const { r, g, b } = color.rgb;
      return format === 'rgb' ? formatRgba(r, g, b, alpha) : formatHex(r, g, b, alpha);
    }
    return gradientColors.map((item) => {
      const { r, g, b } = item.color.rgb;
      return {
        color: format === 'rgb' ? formatRgba(r, g, b, item.alpha) : formatHex(r, g, b, item.alpha),
        percent: item.percent,
      };
    });
  }, [activeMode, alpha, hsv, format, gradientColors]);

  useEffect(() => {
    setValue(formatValue);
    !isFirstRender && onChange?.(formatValue);
  }, [formatValue]);

  const onVisibleChange = (newVisible) => {
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
  };

  const onHsvChange = (_value: HSV) => {
    setHsv(_value);
    if (disabledAlpha && alpha !== 100) {
      setAlpha(100);
    }
  };

  const onAlphaChange = (_value: number) => {
    setAlpha(_value);
  };

  useEffect(() => {
    if (!isGradientMode(activeMode) || !gradientColors.length) return;
    if (equalsHsv(gradientColors[activeColorIndex].color.hsv, hsv)) return;
    const newGradientColors = [...gradientColors];
    newGradientColors[activeColorIndex] = {
      ...newGradientColors[activeColorIndex],
      color: getColorFromHsv(hsv),
    };
    setGradientColors(newGradientColors);
  }, [hsv]);

  useEffect(() => {
    if (!isGradientMode(activeMode) || !gradientColors.length) return;
    if (gradientColors[activeColorIndex].alpha === alpha) return;
    const newGradientColors = [...gradientColors];
    newGradientColors[activeColorIndex] = {
      ...newGradientColors[activeColorIndex],
      alpha,
    };
    setGradientColors(newGradientColors);
  }, [alpha]);

  const onActiveModeChange = (newMode: ColorPickerMode) => {
    if (newMode === activeMode) {
      return;
    }
    if (newMode === ColorPickerMode.Single) {
      setActiveColorIndex(0);
    } else {
      setGradientColors([
        {
          color,
          alpha,
          percent: 0,
        },
        {
          color,
          alpha,
          percent: 100,
        },
      ]);
    }
    setActiveMode(newMode);
  };

  return {
    value,
    activeMode,
    gradientColors,
    activeColorIndex,
    popupVisible,
    color,
    alpha,
    onHsvChange,
    onAlphaChange,
    onVisibleChange,
    onActiveModeChange,
    onActiveColorIndexChange: setActiveColorIndex,
    onGradientColorsChange: setGradientColors,
  };
};
