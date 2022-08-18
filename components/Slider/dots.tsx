import React, { memo } from 'react';
import { isObject, isFunction } from '../_util/is';
import { formatPercent, valueInRange, getIntervalOffset } from './utils';
import cs from '../_util/classNames';
import { IntervalConfig } from './hooks/useInterval';

type MaskType = {
  key: number | string;
  content: any;
};

interface MaskProps {
  data: MaskType[];
  value?: number[];
  vertical?: boolean;
  prefixCls?: string;
  reverse?: boolean;
  onMouseDown?: (val: number) => void;
  intervalConfigs?: IntervalConfig[];
}

const Dots = function (props: MaskProps) {
  const { data = [], value = [], vertical, prefixCls, reverse, intervalConfigs } = props;
  if (!data.length) return null;

  return (
    <div className={`${prefixCls}-dots`}>
      {data.map(({ key, content }) => {
        const offset = formatPercent(getIntervalOffset(+key, intervalConfigs));
        return (
          <div
            className={`${prefixCls}-dot-wrapper`}
            key={key}
            style={{
              ...(vertical
                ? { [reverse ? 'top' : 'bottom']: offset }
                : { [reverse ? 'right' : 'left']: offset }),
            }}
            onMouseDown={(e) => {
              e.stopPropagation();

              isFunction(props.onMouseDown) && props.onMouseDown(parseFloat(key as string));
            }}
          >
            {isObject(content) && content.dot ? (
              content.dot
            ) : (
              <div
                className={cs(`${prefixCls}-dot`, {
                  [`${prefixCls}-dot-active`]: valueInRange(key, value),
                })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default memo<MaskProps>(Dots);
