import React, { memo } from 'react';
import { isObject, isFunction } from '../_util/is';
import { formatPercent, getIntervalOffset, isNotEmpty } from './utils';
import { IntervalConfig } from './hooks/useInterval';

type MaskType = {
  key: number | string;
  content: any;
};

interface MaskProps {
  data: MaskType[];
  vertical?: boolean;
  prefixCls?: string;
  onMouseDown?: (val: number) => void;
  reverse?: boolean;
  intervalConfigs?: IntervalConfig[];
}

const Marks = function (props: MaskProps) {
  const { data = [], vertical, prefixCls, reverse, intervalConfigs } = props;

  if (!data.length) return null;

  return (
    <div className={`${prefixCls}-marks`}>
      {data.map(({ key, content }) => {
        const offset = formatPercent(getIntervalOffset(+key, intervalConfigs));
        let dom = null;
        if (isObject(content) && isNotEmpty(content.text)) {
          dom = content.text;
        } else if (isNotEmpty(content)) {
          dom = content;
        }
        return (
          isNotEmpty(dom) && (
            <div
              className={`${prefixCls}-marks-text`}
              aria-hidden
              key={key}
              style={
                vertical
                  ? { [reverse ? 'top' : 'bottom']: offset }
                  : { [reverse ? 'right' : 'left']: offset }
              }
              onMouseDown={(e) => {
                e.stopPropagation();

                isFunction(props.onMouseDown) && props.onMouseDown(parseFloat(key as string));
              }}
            >
              {dom}
            </div>
          )
        );
      })}
    </div>
  );
};

export default memo<MaskProps>(Marks);
