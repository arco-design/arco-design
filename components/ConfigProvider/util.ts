// Less lighten

function hexToRgb(hex) {
  const rgb: number[] = [];
  let _hex = hex.substr(1);

  // converts #abc to #aabbcc
  if (hex.length === 3) {
    _hex = hex.replace(/(.)/g, '$1$1');
  }

  _hex.replace(/../g, (color: string) => {
    rgb.push(parseInt(color, 0x10));
  });

  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    rgb: `rgb(${rgb.join(',')})`,
  };
}

function getRgb(color: string) {
  const rgb = hexToRgb(color);
  return { r: rgb.r, g: rgb.g, b: rgb.b };
}

function getHsl(color: string) {
  const rgb = getRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  return { h: hsl.h, s: hsl.s, l: hsl.l };
}

function rgbToHsl(r: number, g: number, b: number) {
  const _r = r / 255;
  const _g = g / 255;
  const _b = b / 255;
  const max = Math.max(_r, _g, _b);
  const min = Math.min(_r, _g, _b);
  const l = (max + min) / 2;
  let h;
  let s;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case _r:
        h = (_g - _b) / d + (_g < _b ? 6 : 0);
        break;
      case _g:
        h = (_b - _r) / d + 2;
        break;
      case _b:
        h = (_r - _g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return {
    h,
    s,
    l,
    hsl: `hsl(${h * 360}, ${s * 100}%, ${l * 100}%)`,
  };
}

export function lighten(color: string, percent: number) {
  const hsl = getHsl(color);
  const h = +hsl.h;
  const s = +hsl.s;
  const l = +hsl.l * 100 + +percent;

  // return `hsl(${h * 360}, ${s * 100}%, ${l}%)`;
  const res = hsltorgb([h * 360, s * 100, l]);
  return res.join(',');
}

// copy from https://github.com/Qix-/color-convert/blob/master/conversions.js
export function hsltorgb(hsl) {
  const h = hsl[0] / 360;
  const s = hsl[1] / 100;
  const l = hsl[2] / 100;
  let t2;
  let t3;
  let val;

  if (s === 0) {
    val = l * 255;
    return [val, val, val];
  }

  if (l < 0.5) {
    t2 = l * (1 + s);
  } else {
    t2 = l + s - l * s;
  }

  const t1 = 2 * l - t2;

  const rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1);
    if (t3 < 0) {
      t3++;
    }

    if (t3 > 1) {
      t3--;
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3;
    } else if (2 * t3 < 1) {
      val = t2;
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
    } else {
      val = t1;
    }

    rgb[i] = val * 255;
  }

  return rgb;
}
