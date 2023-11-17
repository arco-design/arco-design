import { plus, times } from 'number-precision';
import { useCallback } from 'react';
import { isArray, isNumber, isUndefined, isObject, isEmptyObject } from '../../_util/is';
import { getPrecision } from '../utils';
import { IntervalConfig } from './useInterval';

export default function useLegalValue(props: {
  isRange: boolean;
  min: number;
  max: number;
  onlyMarkValue: boolean;
  step: number;
  intervalConfigs: IntervalConfig[];
  marks: object;
}) {
  const { isRange, min, max, onlyMarkValue, intervalConfigs, marks } = props;
  const getPrecisionValue = useCallback(
    (val: number) => {
      const interval = intervalConfigs.find((config) => {
        return val >= config.begin && val <= config.end;
      });

      if (interval) {
        const { begin, step } = interval;
        const offsetVal = val - begin;
        const stepNum = Math.round(offsetVal / step);
        const precision = getPrecision(step);
        const currentIntervalPrecision = parseFloat(times(step, stepNum).toFixed(precision));
        return plus(begin, currentIntervalPrecision);
      }

      return val;
    },
    [intervalConfigs]
  );

  // 在只允许选择 marks 中的值的时候，找到离value最接近的值
  const getMarkValue = useCallback(
    (val: number) => {
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
    },
    [marks, min]
  );

  // 判断值是否在[min, max]区间内，并且满足步长或是标签值
  const getLegalValue = useCallback(
    (val) => {
      if (isUndefined(val)) return min;
      if (val <= min) return min;
      if (val >= max) return max;
      if (onlyMarkValue) return getMarkValue(val);
      return getPrecisionValue(val);
    },
    [getMarkValue, getPrecisionValue, max, min, onlyMarkValue]
  );

  const isLegalValue = useCallback(
    (val) => {
      return getLegalValue(val) === val;
    },
    [getLegalValue]
  );

  // 获取合法的 range value
  const getLegalRangeValue = useCallback(
    (val: number | number[]) => {
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
    },
    [getLegalValue, isRange, min]
  );

  const getNextMarkValue = useCallback(
    (value: number, type: 'addition' | 'subtraction') => {
      // arrow Left or arrowRight
      const multi = type === 'subtraction' ? -1 : 1;

      let newValue = plus(value, multi * props.step);
      if (props.onlyMarkValue) {
        const markKeys = Object.keys(props.marks);
        const currentIndex = markKeys.findIndex((key) => Number(key) === value);
        newValue =
          markKeys[currentIndex + multi] !== undefined
            ? Number(markKeys[currentIndex + multi])
            : value;
      }
      return newValue;
    },
    [props.marks, props.onlyMarkValue, props.step]
  );

  return {
    getLegalRangeValue,
    getLegalValue,
    isLegalValue,
    getNextMarkValue,
  };
}
