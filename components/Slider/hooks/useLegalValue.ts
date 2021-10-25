import { useMemo } from 'react';
import { isArray, isNumber, isUndefined, isObject, isEmptyObject } from '../../_util/is';
import { getPrecision } from '../utils';

export default function useLegalValue(props: {
  isRange: boolean;
  min: number;
  max: number;
  onlyMarkValue: boolean;
  step: number;
  marks: object;
}) {
  const { isRange, min, max, onlyMarkValue, step, marks } = props;
  const precision = useMemo(() => getPrecision(step), [step]);

  // 在只允许选择 marks 中的值的时候，找到离value最接近的值
  function getMarkValue(val: number): number {
    if (!isObject(marks) || isEmptyObject(marks)) {
      console.warn('marks must be an object when onlyMarkValue is true');
      return min;
    }
    if (marks[val]) {
      return val;
    }
    const keys = Object.keys(marks);
    const diffs = keys.map((x) => Math.abs(val - parseFloat(x)));
    const minIndex = diffs.indexOf(Math.min.apply(null, diffs));
    return parseFloat(keys[minIndex]);
  }

  // 判断值是否在[min, max]区间内，并且满足步长或是标签值
  function getLegalValue(val: number): number {
    if (isUndefined(val)) return min;
    if (val <= min) return min;
    if (val >= max) return max;
    if (onlyMarkValue) return getMarkValue(val);

    const steps = Math.round(val / step);
    return parseFloat(Number(steps * step).toFixed(precision));
  }

  function isLegalValue(val) {
    return getLegalValue(val) === val;
  }

  // 获取合法的 range value
  function getLegalRangeValue(val: number | number[]) {
    let [beginVal, endVal] = [min, min];
    if (isRange) {
      if (isArray(val)) {
        beginVal = getLegalValue(val[0]);
        endVal = getLegalValue(val[1]);
      } else {
        console.error('value must be an array when range is true');
      }
    } else if (isNumber(val)) {
      endVal = getLegalValue(val);
    } else {
      console.error('value must be a number when range is false');
    }
    return [beginVal, endVal];
  }

  return {
    getLegalRangeValue,
    getLegalValue,
    isLegalValue,
  };
}
