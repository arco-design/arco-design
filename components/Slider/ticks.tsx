import React, { memo } from 'react';
import { plus } from 'number-precision';
import { formatPercent, getOffset, valueInRange } from './utils';
import cs from '../_util/classNames';

interface TicksProps {
  step: number;
  min: number;
  max: number;
  value: number[];
  prefixCls: string;
  vertical: boolean;
  reverse?: boolean;
}

export default memo(function Ticks(props: TicksProps) {
  const { step, min, max, value, prefixCls, vertical, reverse } = props;

  const steps = [];
  const stepsLength = Math.floor((max - min) / step);
  for (let i = 0; i <= stepsLength; i++) {
    const stepVal = plus(i * step, min);
    if (stepVal <= min || stepVal >= max) continue;
    steps.push({
      offset: formatPercent(getOffset(stepVal, [min, max])),
      isActive: valueInRange(stepVal, value),
    });
  }
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
