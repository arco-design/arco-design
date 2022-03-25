import { useMemo } from 'react';
import { SliderProps } from '..';
import { isNumber, isFunction } from '../../_util/is';
import { rateToFloat } from '../utils';

function getIntervals(nums: number[]): number[][] {
  if (nums.length < 2) {
    return [];
  }
  const result = [];
  for (let i = 1; i < nums.length; i++) {
    const begin = nums[i - 1];
    const end = nums[i];
    result.push([begin, end]);
  }
  return result;
}

export interface IntervalConfig {
  begin: number;
  end: number;
  width: number;
  step: number;
  // 起点相对于全长的比例；
  beginOffset?: number;
  // 终点相对于全长的比例；
  endOffset?: number;
}

function useInterval(props: {
  marks: SliderProps['marks'];
  getIntervalConfig?: SliderProps['getIntervalConfig'];
  min: number;
  max: number;
  onlyMarkValue: boolean;
  step: number;
}) {
  const { marks = {}, getIntervalConfig, max, min } = props;
  const { markIntervals, markList } = useMemo(() => {
    const markKeys = Object.keys(marks)
      .filter((key) => isNumber(+key) && +key >= min && +key <= max)
      .sort((a, b) => (+a > +b ? 1 : -1));
    const markList = markKeys.map((key) => ({ key, content: marks[key] }));
    let markValues = markKeys.map((key) => +key);
    // 如果没有传入marks，那么就等于只有一个区间，就是 [min,max]
    if (markValues.length === 0) {
      markValues = [min, max];
    } else {
      if (markValues[0] > min) {
        markValues.unshift(min);
        // 传入了 marks 需要显示首尾断点
        markList.unshift({ key: `${min}`, content: '' });
      }
      if (markValues.slice(-1)[0] < max) {
        markValues.push(max);
        markList.push({ key: `${max}`, content: '' });
      }
    }
    const markIntervals = getIntervals(markValues);
    return { markIntervals, markList };
  }, [marks, min, max]);

  const getStepAndWidth = ([begin, end], index) => {
    const config = { step: props.step, width: 0 };
    if (isFunction(getIntervalConfig)) {
      const customConfig = getIntervalConfig([begin, end], index) || {};
      const step = customConfig.step;
      const width = rateToFloat(customConfig.width);
      // 如果用户传入了step
      if (isNumber(step) && step) {
        config.step = step;
      }
      // 用户传入了width
      if (isNumber(width) && width) {
        config.width = width;
      }
    }

    return config;
  };

  const getIntervalConfigs = () => {
    let remainWidth = 1;
    let remainLen = max - min;

    const stepAndWidthConfig = markIntervals.map(([begin, end], index) => {
      const stepAndWidth = getStepAndWidth([begin, end], index);
      let width = stepAndWidth.width;
      // 主要是计算出剩余的 width 和 剩余的长度
      if (width) {
        width = Math.min(remainWidth, width);
        const len = end - begin;
        remainLen -= len;
        remainWidth -= width;
      }
      return { width, step: stepAndWidth.step };
    });

    const allConfigs: IntervalConfig[] = [];
    markIntervals.forEach(([begin, end], index) => {
      const { step, width } = stepAndWidthConfig[index];
      const config: IntervalConfig = { begin, end, step, beginOffset: 0, endOffset: 0, width };
      // 用户没有配置 width，按照区间长度来分配剩余的width
      if (!config.width) {
        config.width = remainWidth * ((end - begin) / remainLen);
      }
      const prevIndex = allConfigs.length - 1;
      // 当前区间的 beginOffset 是前一个区间的 endOffset
      if (allConfigs[prevIndex]) {
        config.beginOffset = allConfigs[prevIndex].endOffset;
      }
      config.endOffset = Math.min(1, config.beginOffset + config.width);
      allConfigs.push(config);
    });

    return allConfigs;
  };

  const intervalConfigs = getIntervalConfigs();
  return {
    intervalConfigs,
    markList,
  };
}

export default useInterval;
