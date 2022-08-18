import React, { useCallback, useMemo } from 'react';
import { isFunction, isObject } from '../_util/is';
import IconCheck from '../../icon/react-icon/IconCheck';
import IconExclamation from '../../icon/react-icon/IconExclamation';
import Tooltip from '../Tooltip';
import { ProgressProps } from './interface';

const defaultStrokeWidth = {
  mini: 4,
  small: 3,
  default: 4,
  large: 4,
};

const defaultWidth = {
  mini: 16,
  small: 48,
  default: 64,
  large: 80,
};

let __ARCO_PROGRESS_SEED = 0;

const CircleProgress = (
  props: ProgressProps & {
    prefixCls?: string;
    width: number;
    pathStrokeWidth?: number;
    pathStrokeColor?: string;
  }
) => {
  const { size, percent = 0, prefixCls, showText, status, formatText } = props;
  const isLinearGradient = isObject(props.color);

  const width = props.width || defaultWidth[size];

  const strokeWidth = props.strokeWidth || (size === 'mini' ? width / 2 : defaultStrokeWidth[size]);

  const radius = (width - strokeWidth) / 2;
  const perimeter = Math.PI * 2 * radius;
  const center = width / 2;

  const cls = `${prefixCls}-circle`;
  const svgCls = `${cls}-svg`;

  const getText = useCallback(
    (status) => {
      if (isFunction(formatText)) {
        return formatText(percent);
      }
      switch (status) {
        case 'success':
          return <IconCheck />;
        case 'error':
          return <IconExclamation />;
        default:
          return `${percent}%`;
      }
    },
    [formatText, percent]
  );

  const linearGradientId = useMemo(() => {
    __ARCO_PROGRESS_SEED += 1;
    return `${prefixCls}-linear-gradient-${__ARCO_PROGRESS_SEED}`;
  }, []);

  const color = isLinearGradient ? `url(#${linearGradientId})` : (props.color as string);

  let dom = (
    <div
      className={`${cls}-wrapper`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      style={{ width, height: width }}
    >
      <svg viewBox={`0 0 ${width} ${width}`} className={`${svgCls}`}>
        {isLinearGradient && (
          <defs>
            <linearGradient id={linearGradientId} x1="0" y1="1" x2="0" y2="0">
              {Object.keys(props.color)
                .sort()
                .map((key) => {
                  return <stop offset={key} key={key} stopColor={props.color[key]} />;
                })}
            </linearGradient>
          </defs>
        )}
        <circle
          className={`${cls}-mask`}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={
            props.pathStrokeWidth || (size === 'mini' ? strokeWidth : Math.max(2, strokeWidth - 2))
          }
          style={{
            stroke: props.pathStrokeColor,
          }}
        />
        <circle
          className={`${cls}-path`}
          fill="none"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          style={{
            stroke: color,
            strokeDasharray: perimeter,
            strokeDashoffset: (percent > 100 ? 100 : 1 - percent / 100) * perimeter,
          }}
        />
      </svg>
      {showText && size !== 'mini' && <div className={`${cls}-text`}>{getText(status)}</div>}
    </div>
  );

  // type === line 时候，返回的是一个圆环
  if (size === 'mini' && status === 'success' && props.type === 'circle') {
    dom = (
      <div className={`${cls}-wrapper`} style={{ width, height: width }}>
        <IconCheck style={{ fontSize: width - 2, color }} />
      </div>
    );
  }

  return size === 'mini' && showText ? (
    <Tooltip content={<div className={`${cls}-text`}>{getText('normal')}</div>}>{dom}</Tooltip>
  ) : (
    dom
  );
};

export default CircleProgress;
