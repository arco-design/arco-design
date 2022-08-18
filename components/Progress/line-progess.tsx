import React, { useCallback } from 'react';
import cs from '../_util/classNames';
import { isFunction, isObject } from '../_util/is';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';

const getBackground = (color: string | object, percent?: number) => {
  if (isObject(color)) {
    const val = Object.keys(color)
      .map((key) => `${color[key]} ${key}`)
      .join(',');
    const sizeProps = percent ? { backgroundSize: `${(100 * 100) / percent}%` } : {};
    return {
      backgroundImage: `linear-gradient(to right, ${val})`,
      ...sizeProps,
    };
  }
  return {
    backgroundColor: color,
  };
};

const defaultStrokeWidth = {
  small: 3,
  default: 4,
  large: 8,
};

function LineProgress(props) {
  const {
    // textInside,
    type,
    size,
    prefixCls,
    buffer,
    percent,
    status,
    color,
    animation,
    showText,
    bufferColor,
    formatText,
    trailColor,
  } = props;

  const strokeWidth = props.strokeWidth || defaultStrokeWidth[size];
  const cls = `${prefixCls}-${type}`;
  const height = strokeWidth;
  const isFinish = status === 'success' || status === 'error' || percent >= 100;

  const getText = useCallback(() => {
    if (isFunction(formatText)) {
      return formatText(percent);
    }
    switch (status) {
      case 'error':
        return (
          <span>
            {percent}% <IconExclamationCircleFill />
          </span>
        );
      default:
        return `${percent}%`;
    }
  }, [formatText, percent, status]);

  return (
    <div className={`${cls}-wrapper`}>
      <div
        className={`${cls}-outer`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        style={{ height, backgroundColor: trailColor }}
      >
        {buffer && !isFinish && (
          <div
            className={`${cls}-inner-buffer`}
            style={{
              width: `${percent > 0 ? percent + 10 : 0}%`,
              ...getBackground(bufferColor),
            }}
          />
        )}
        <div
          className={cs(`${cls}-inner`, { [`${cls}-inner-animate`]: animation })}
          style={{
            width: `${percent}%`,
            ...getBackground(color, percent),
          }}
        />
      </div>
      {showText && (
        <div className={cs(`${cls}-text`, { [`${cls}-text-with-icon`]: status })}>{getText()}</div>
      )}
    </div>
  );
}

LineProgress.defaultProps = {
  showText: true,
  size: 'default',
  status: 'normal',
};

export default LineProgress;
