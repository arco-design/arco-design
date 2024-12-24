import { getColorString, hsvToRgb, rgbToHex, rgbToHsv, rgbaToHex } from '../_util/color';
import { HSV, InternalGradientColor, RGB } from './interface';

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

export const getColorByGradients = (
  gradientColors: InternalGradientColor[],
  percent: number
): InternalGradientColor => {
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
    color: getColorFromHsv(rgbToHsv(r, g, b)),
    alpha: a,
    percent,
  };
};
