export function getColorString(color, format) {
  const colorObj = color[format]();
  let colorString;
  if (format === 'hex') {
    colorString = colorObj;
  } else {
    colorString = colorObj.round().string();
  }

  return colorString;
}
