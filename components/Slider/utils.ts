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
