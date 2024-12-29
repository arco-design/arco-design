import {
  formatInputToHSVA,
  formatInputToRGBA,
  getColorString,
  hsvToRgb,
  rgbToHex,
  rgbToHsv,
  rgbaToHex,
} from '../_util/color';
import { GradientColor, HSV, InternalGradientColor, RGB } from './interface';

interface RGBA extends RGB {
  a: number;
}

export const sortGradientColors = (gradientColors: InternalGradientColor[]) => {
  return gradientColors.sort((a, b) => {
    return a.percent - b.percent;
  });
};

export const mix = (source: RGBA, target: RGBA, progress: number): RGBA =>
  Object.keys(source).reduce(
    (previousObject, currentKey) => ({
      ...previousObject,
      [currentKey]: source[currentKey] + (target[currentKey] - source[currentKey]) * progress,
    }),
    { ...source }
  );

export const getGradientString = (gradientColors: InternalGradientColor[]) =>
  gradientColors
    .map(
      ({
        color: {
          rgb: { r, g, b },
        },
        alpha,
        percent,
      }) => `${getColorString(r, g, b, alpha)} ${percent}%`
    )
    .join(', ');

export const renderGradientBackground = (gradientColors: InternalGradientColor[]) => {
  return `linear-gradient(to right, ${getGradientString(gradientColors)})`;
};

export const formatRgba = (r: number, g: number, b: number, a: number) =>
  a < 1 ? `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})` : `rgb(${r}, ${g}, ${b})`;

export const formatHex = (r: number, g: number, b: number, a: number) =>
  a < 1 ? `#${rgbaToHex(r, g, b, a)}` : `#${rgbToHex(r, g, b)}`;

export const getColorFromHsv = (hsv: HSV) => {
  const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  return {
    hsv,
    rgb,
    hex,
  };
};

export const getRandomId = () => Math.random().toFixed(10).slice(2);

export const mapValueToGradientColor = (value: GradientColor[]): InternalGradientColor[] =>
  (value as GradientColor[]).map((item) => {
    const formatInput = formatInputToHSVA(item.color);
    return {
      id: getRandomId(),
      color: getColorFromHsv(formatInput),
      alpha: formatInput.a,
      percent: item.percent,
    };
  });

export const getColorByGradients = (
  gradientColors: InternalGradientColor[],
  percent: number,
  id?: string
): InternalGradientColor => {
  const index = gradientColors.findIndex((item) => item.percent === percent);
  if (index !== -1) {
    return {
      ...gradientColors[index],
      id: id ?? getRandomId(),
    };
  }
  const latterColorIndex = gradientColors.findIndex((item) => item.percent > percent);
  const previousColorIndex = latterColorIndex - 1;
  const {
    color: previousColor,
    alpha: previousAlpha,
    percent: previousPercent,
  } = gradientColors[previousColorIndex];
  const {
    color: latterColor,
    alpha: latterAlpha,
    percent: latterPercent,
  } = gradientColors[latterColorIndex];
  const interpolatedColor = mix(
    {
      ...previousColor.rgb,
      a: previousAlpha,
    },
    {
      ...latterColor.rgb,
      a: latterAlpha,
    },
    (percent - previousPercent) / (latterPercent - previousPercent)
  );
  const { r, g, b, a } = interpolatedColor;
  return {
    id: id ?? getRandomId(),
    color: getColorFromHsv(rgbToHsv(r, g, b)),
    alpha: a,
    percent,
  };
};

export const equalsHsv = (a: HSV, b: HSV) => {
  return a.h === b.h && a.s === b.s && a.v === b.v;
};
export const equalsRgba = (a: RGBA, b: RGBA) => {
  return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
};

export const isEqualsColors = (
  colorA: string | GradientColor[],
  colorB: string | GradientColor[]
) => {
  if (typeof colorA === 'string' && typeof colorB === 'string') {
    return colorA === colorB;
  }
  if (Array.isArray(colorA) && Array.isArray(colorB)) {
    return (
      colorA.length === colorB.length &&
      colorA.every((itemA, index) => {
        const itemB = colorB[index];
        return (
          equalsRgba(formatInputToRGBA(itemA.color), formatInputToRGBA(itemB.color)) &&
          itemA.percent === itemB.percent
        );
      })
    );
  }
  return false;
};
