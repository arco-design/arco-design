import React, { useCallback } from 'react';
import cs from '../_util/classNames';
import { isFunction } from '../_util/is';
import IconExclamationCircleFill from '../../icon/react-icon/IconExclamationCircleFill';

export const StepsProgress = (props) => {
  const { size, prefixCls, percent, status, color, type, showText, formatText, trailColor } = props;

  const strokeWidth = props.strokeWidth || (size === 'small' ? 8 : 4);
  const cls = `${prefixCls}-${type}`;
  const height = strokeWidth;

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
        style={{ height }}
      >
        {[...new Array(props.steps)].map((_, index) => {
          const isActive = percent > (100 / props.steps) * index;
          return (
            <div
              key={index}
              className={cs(`${cls}-item`, {
                [`${cls}-item-active`]: isActive,
              })}
              style={{
                backgroundColor: isActive ? color : trailColor || '',
              }}
            />
          );
        })}
      </div>
      {showText && (
        <div className={cs(`${cls}-text`, { [`${cls}-text-with-icon`]: status })}>{getText()}</div>
      )}
    </div>
  );
};

StepsProgress.defaultProps = {
  showText: true,
  size: 'default',
  status: 'normal',
};

export default StepsProgress;
