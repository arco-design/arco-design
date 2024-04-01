// 精确 加减乘除
import { plus, minus, times, divide } from 'number-precision';
import { IntervalConfig } from './hooks/useInterval';

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
    // 精确算出=> (value - min) / (max - min);
    return divide(minus(value, min), minus(max, min));
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

// 把 20% => 0.2
export function rateToFloat(val: string | number) {
  const rate = parseFloat(val as string);
  const fixedRate = rate > 1 ? (rate / 100).toFixed(2) : rate;
  const floatRate = parseFloat(fixedRate as string);
  if (!isNaN(floatRate) && floatRate >= 0 && floatRate <= 1) {
    return floatRate;
  }
  return undefined;
}

export function getIntervalOffset(val, intervalConfig: IntervalConfig[]) {
  // 当前值所在的区间
  const currentInterval = intervalConfig.find((config) => val >= config.begin && val <= config.end);
  if (currentInterval) {
    const { beginOffset, begin, end, endOffset } = currentInterval;

    const offsetInInterval = getOffset(val, [begin, end]);

    // endOffset - beginOffset
    const intervalOffset = minus(endOffset, beginOffset);

    // 当前值在整个滑动轴上占的比例 = 在区间占的比例 * 区间相对于整个轴的比例
    // offsetInInterval* intervalOffset
    const offset = times(offsetInInterval, intervalOffset);

    return plus(beginOffset, offset);
  }
}

// 从小到大排序
export function sortNumberArray(arr: number[]) {
  const copyArr = arr.slice(0);
  copyArr.sort((a, b) => a - b);
  return copyArr;
}

// 是否需要排序
export function needSort(arr: number[]) {
  return arr.some((x, i) => x > arr[i + 1]);
}

// 找到 value 在 array 中的索引。value: 5 ,arrry: [1, 3, 8]， return: 2.
export function findNearestIndex(value: number, array: number[]): [number, number] {
  let valueIndex = array.indexOf(value);
  if (valueIndex === -1) {
    const arr = sortNumberArray(array.concat(value));

    valueIndex = arr.indexOf(value);

    return [Math.max(valueIndex - 1, 0), Math.min(valueIndex, array.length - 1)];
  }
  return [valueIndex, valueIndex + 1];
}
