import React, { memo } from 'react';
import { isObject, isFunction } from '../_util/is';
import { formatPercent, getOffset, valueInRange } from './utils';
import cs from '../_util/classNames';

type MaskType = {
  key: number | string;
  content: any;
};

interface MaskProps {
  data: MaskType[];
  min?: number;
  max?: number;
  value?: number[];
  vertical?: boolean;
  prefixCls?: string;
  reverse?: boolean;
  onMouseDown?: (val: number) => void;
}

const Dots = function (props: MaskProps) {
  const { data = [], min, max, value = [], vertical, prefixCls, reverse } = props;

  if (!data.length) return null;

  return (
    <div className={`${prefixCls}-dots`}>
      {data.map(({ key, content }) => {
        const offset = formatPercent(getOffset(key, [min, max]));
        return (
          <div
            className={`${prefixCls}-dot-wrapper`}
            key={key}
            style={{
              ...(vertical
                ? { [reverse ? 'top' : 'bottom']: offset }
                : { [reverse ? 'right' : 'left']: offset }),
              ...(+key === min || +key === max ? { visibility: 'hidden' } : {}), // 边界点不显示
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
