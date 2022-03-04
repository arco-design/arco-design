import React, { memo, useMemo } from 'react';
import { plus } from 'number-precision';
import { formatPercent, getIntervalOffset, valueInRange } from './utils';
import cs from '../_util/classNames';
import { IntervalConfig } from './hooks/useInterval';

interface TicksProps {
  min: number;
  max: number;
  value: number[];
  prefixCls: string;
  vertical: boolean;
  reverse?: boolean;
  intervalConfigs?: IntervalConfig[];
}

export default memo(function Ticks(props: TicksProps) {
  const { min, max, value, prefixCls, vertical, reverse, intervalConfigs } = props;

  const stepsMap: Map<string, { offset: string; isActive: boolean }> = new Map();

  const getCurrentSteps = (interval: IntervalConfig) => {
    const { step, begin, end } = interval;
    const stepsLength = Math.floor((end - begin) / step);
    for (let i = 0; i <= stepsLength; i++) {
      const stepVal = plus(i * step, begin);
      if (stepVal <= min || stepVal >= max) continue;
      const offset = formatPercent(getIntervalOffset(stepVal, intervalConfigs));
      stepsMap.set(offset, { offset, isActive: valueInRange(stepVal, value) });
    }
  };

  const steps = useMemo(() => {
    stepsMap.clear();
    intervalConfigs.forEach((interval) => getCurrentSteps(interval));
    return Array.from(stepsMap.values());
  }, [intervalConfigs]);

  return (
    <div className={`${prefixCls}-ticks`}>
      {steps.map((item, index) => (
        <div
          key={index}
          className={cs(`${prefixCls}-tick`, { [`${prefixCls}-tick-active`]: item.isActive })}
          style={
            vertical
              ? { [reverse ? 'top' : 'bottom']: item.offset }
              : { [reverse ? 'right' : 'left']: item.offset }
          }
        />
      ))}
    </div>
  );
});
