import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ColorPickerMode, GradientColor, HSV, InternalGradientColor } from '../interface';
import { formatInputToHSVA } from '../../_util/color';
import useMergeValue from '../../_util/hooks/useMergeValue';
import useIsFirstRender from '../../_util/hooks/useIsFirstRender';
import { getInitialActiveMode, isGradientMode, isSingleMode } from '../mode';
import {
  getColorFromHsv,
  formatRgba,
  formatHex,
  getRandomId,
  isEqualsColors,
  equalsHsv,
  mapValueToGradientColor,
} from '../utils';

interface UseColorPickerProps {
  mode?: 'single' | 'gradient' | ['single', 'gradient'];
  value?: string | GradientColor[];
  defaultValue?: string | GradientColor[];
  defaultPopupVisible?: boolean;
  disabledAlpha?: boolean;
  popupVisible?: boolean;
  format?: 'hex' | 'rgb';
  onChange?: (value: string | GradientColor[]) => void;
  onVisibleChange?: (visible: boolean) => void;
}

export const useColorPicker = (props: UseColorPickerProps) => {
  const { mode = ColorPickerMode.Single, defaultValue, format, onChange, disabledAlpha } = props;

  const isFirstRender = useIsFirstRender();

  const [popupVisible, setPopupVisible] = useMergeValue(false, {
    defaultValue: props.defaultPopupVisible,
    value: props.popupVisible,
  });

  const [activeMode, setActiveMode] = useState<ColorPickerMode>(
    (defaultValue && !Array.isArray(defaultValue)) || (props.value && !Array.isArray(props.value))
      ? ColorPickerMode.Single
      : getInitialActiveMode(mode as ColorPickerMode | ColorPickerMode[])
  );

  const [value, setValue] = useMergeValue(
    activeMode === ColorPickerMode.Gradient ? undefined : '',
    props
  );

  const [_gradientColors, _setGradientColors] = useState<InternalGradientColor[]>(
    isGradientMode(activeMode) && Array.isArray(value)
      ? mapValueToGradientColor(value as GradientColor[], disabledAlpha)
      : []
  );
  const [_activeColorId, _setActiveColorId] = useState(_gradientColors[0]?.id);
  const gradientColorsRef = useRef(_gradientColors);
  const activeColorIdRef = useRef(_activeColorId);
  const gradientColors = gradientColorsRef.current;
  const activeColorId = activeColorIdRef.current;
  const setGradientColors = (
    newColors:
      | InternalGradientColor[]
      | ((colors: InternalGradientColor[]) => InternalGradientColor[])
  ) => {
    _setGradientColors(newColors);
    gradientColorsRef.current =
      typeof newColors === 'function' ? newColors(gradientColorsRef.current) : newColors;
  };
  const setActiveColorId = (newId: string) => {
    _setActiveColorId(newId);
    activeColorIdRef.current = newId;
  };

  const activeColorIndex = useMemo(() => {
    const activeIndex = gradientColors.findIndex((item) => item.id === activeColorId);
    return activeIndex !== -1 ? activeIndex : 0;
  }, [gradientColors, activeColorId]);

  const formatInput = Array.isArray(value)
    ? formatInputToHSVA((value as GradientColor[])[activeColorIndex].color)
    : formatInputToHSVA(value as string);

  const [hsv, setHsv] = useState<HSV>({
    h: formatInput.h,
    s: formatInput.s,
    v: formatInput.v,
  });
  const [alpha, setAlpha] = useState(formatInput.a);

  const color = useMemo(() => getColorFromHsv(hsv), [hsv]);

  const formatSingleValue = useCallback(
    (r, g, b, alpha) => {
      return format === 'rgb' ? formatRgba(r, g, b, alpha) : formatHex(r, g, b, alpha);
    },
    [format]
  );

  const formatValue = useMemo(() => {
    if (isSingleMode(activeMode)) {
      const { r, g, b } = color.rgb;
      return formatSingleValue(r, g, b, alpha);
    }
    return gradientColors.map((item) => {
      const { r, g, b } = item.color.rgb;
      return {
        color: formatSingleValue(r, g, b, item.alpha),
        percent: item.percent,
      };
    });
  }, [activeMode, gradientColors, color.rgb, formatSingleValue, alpha]);

  useEffect(() => {
    setValue(formatValue);
    if (!isFirstRender && !isEqualsColors(value, formatValue)) {
      onChange?.(formatValue);
    }
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
      alpha: disabledAlpha ? 100 : alpha,
    };
    setGradientColors(newGradientColors);
  }, [alpha]);

  const onActiveModeChange = (newMode: ColorPickerMode) => {
    if (newMode === activeMode) {
      return;
    }
    if (newMode === ColorPickerMode.Single) {
      setActiveColorId(gradientColors[0]?.id);
    } else {
      setGradientColors([
        {
          id: getRandomId(),
          color,
          alpha,
          percent: 0,
        },
        {
          id: getRandomId(),
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
    gradientColorsRef,
    activeColorId,
    activeColorIdRef,
    popupVisible,
    color,
    alpha,
    onHsvChange,
    onAlphaChange,
    onVisibleChange,
    onActiveModeChange,
    onActiveColorIdChange: setActiveColorId,
    onGradientColorsChange: setGradientColors,
  };
};
