import React, { CSSProperties, forwardRef, useContext } from 'react';
import cs from '../_util/classNames';
import { ConfigContext } from '../ConfigProvider';
import LineProgress from './line-progess';
import CircleProgress from './circle-progress';
import StepsProgress from './steps-progress';
import { ProgressProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';
import omit from '../_util/omit';

const defaultProps: ProgressProps = {
  type: 'line',
  showText: true,
  percent: 0,
  size: 'default',
};

function Progress(baseProps: ProgressProps, ref) {
  const { getPrefixCls, componentConfig, rtl } = useContext(ConfigContext);
  const props = useMergeProps<ProgressProps>(baseProps, defaultProps, componentConfig?.Progress);
  const { className, style, size, width, strokeWidth, steps, percent, ...rest } = props;

  const type = steps && props.type !== 'circle' ? 'steps' : props.type;

  const prefixCls = getPrefixCls('progress');
  const status = 'status' in props ? props.status : percent >= 100 ? 'success' : 'normal';

  const widthStyle: CSSProperties = { width };

  if (size === 'mini' && type === 'line') {
    widthStyle.width = width || 16;
    widthStyle.height = width || 16;
  }

  return (
    <div
      ref={ref}
      className={cs(
        prefixCls,
        `${prefixCls}-${type}`,
        `${prefixCls}-${size}`,
        {
          [`${prefixCls}-is-${status}`]: status !== 'normal',
          [`${prefixCls}-rtl`]: rtl,
        },
        className
      )}
      style={{ ...widthStyle, ...style }}
      {...omit(rest, [
        'type',
        'animation',
        'status',
        'color',
        'trailColor',
        'showText',
        'formatText',
        'buffer',
        'bufferColor',
      ])}
    >
      {type === 'steps' && (
        <StepsProgress {...props} type={type} status={status} prefixCls={prefixCls} />
      )}

      {type === 'circle' && (
        <CircleProgress
          width={props.width as any}
          {...props}
          pathStrokeColor={props.trailColor}
          status={status}
          prefixCls={prefixCls}
        />
      )}
      {type === 'line' &&
        (size === 'mini' ? (
          <CircleProgress
            pathStrokeColor={props.trailColor}
            {...props}
            pathStrokeWidth={strokeWidth || 4}
            width={(width as number) || 16}
            strokeWidth={strokeWidth || 4}
            prefixCls={prefixCls}
            status={status}
          />
        ) : (
          <LineProgress {...props} status={status} prefixCls={prefixCls} />
        ))}
    </div>
  );
}

const ProgressRef = forwardRef(Progress);

ProgressRef.displayName = 'Progress';

export default ProgressRef;

export { ProgressProps };
