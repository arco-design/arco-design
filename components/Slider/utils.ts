export function getPrecision(val) {
  const decimal = `${val}`.split('.')[1];
  return (decimal && decimal.length) || 0;
}

export function formatPercent(val) {
  return `${val * 100}%`;
}

export function getOffset(val: number | string, range?: number[]) {
  const value = Number(val);
  if (range && !isNaN(value)) {
    const [min, max] = range;
    return (value - min) / (max - min);
  }
  return 0;
}

export function valueInRange(val: number | string, range: number[]) {
  const value = Number(val);
  range.sort((a, b) => a - b);
  return value >= range[0] && value <= range[1];
}

export function isNotEmpty(val) {
  return val || val === 0;
}

export function formatMarks(params = {}) {
  const keys = Object.keys(params);

  keys.sort((a, b) => {
    const formatA = !isNaN(Number(a)) ? Number(a) : a;
    const formatB = !isNaN(Number(b)) ? Number(b) : a;
    if (formatA > formatB) {
      return 1;
    }
    if (formatA < formatB) {
      return -1;
    }
    return 0;
  });
  return keys.map((key) => ({ key, content: params[key] }));
}
