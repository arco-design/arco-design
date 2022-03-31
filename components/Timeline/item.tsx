import React, { useEffect, useRef, useContext, RefObject } from 'react';
import cs from '../_util/classNames';
import { ConfigContext, ConfigProviderProps } from '../ConfigProvider';
import { TimelineItemProps } from './interface';

function Item(props: TimelineItemProps, ref: RefObject<HTMLDivElement>) {
  const {
    children,
    className,
    style,
    label,
    position,
    dot,
    dotColor,
    dotType = 'solid',
    lineType = 'solid',
    lineColor,
    direction,
    labelPosition,
    autoFixDotSize = true,
    ...rest
  } = props;

  const dotRef = useRef<HTMLDivElement>();
  const { getPrefixCls } = useContext<ConfigProviderProps>(ConfigContext);

  const prefixCls = getPrefixCls('timeline');

  const autoFixSize = () => {
    if (dotRef.current) {
      const dotWidth = dotRef.current.offsetWidth;
      const scale = 16 / dotWidth; // 16 是允许的节点最大宽度。
      if (scale < 1) {
        dotRef.current.style.transform = `translateX(-50%) translateY(-50%) scale(${scale})`;
      }
    }
  };

  useEffect(() => {
    autoFixDotSize && autoFixSize();
  }, [props]);

  const labelDom = label && <div className={`${prefixCls}-item-label`}>{label}</div>;

  return (
    <div
      ref={ref}
      role="listitem"
      {...rest}
      className={cs(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-${direction}-${position}`]: direction,
          [`${prefixCls}-item-label-${labelPosition}`]: labelPosition,
        },
        className
      )}
      style={style}
    >
      <div className={`${prefixCls}-item-dot-wrapper`}>
        <div
          className={`${prefixCls}-item-dot-line ${prefixCls}-item-dot-line-is-${direction}`}
          style={{
            [`${direction === 'horizontal' ? 'borderTopStyle' : 'borderLeftStyle'}`]: lineType,
            ...(lineColor ? { borderColor: lineColor } : {}),
          }}
        />
        <div className={`${prefixCls}-item-dot-content`}>
          {dot ? (
            <div className={`${prefixCls}-item-dot-custom`} ref={dotRef}>
              {dot}
            </div>
          ) : (
            <div
              className={cs(`${prefixCls}-item-dot`, `${prefixCls}-item-dot-${dotType}`)}
              style={
                dotType === 'solid' ? { backgroundColor: dotColor } : { borderColor: dotColor }
              }
            />
          )}
        </div>
      </div>
      <div className={`${prefixCls}-item-content-wrapper`}>
        {children && <div className={`${prefixCls}-item-content`}>{children}</div>}
        {labelPosition !== 'relative' && labelDom}
      </div>
      {labelPosition === 'relative' && labelDom}
    </div>
  );
}

const ForwardRefItem = React.forwardRef(Item);

const TimelineItem = ForwardRefItem as typeof ForwardRefItem & {
  isTimelineItem?: boolean;
};

TimelineItem.displayName = 'TimelineItem';

TimelineItem.isTimelineItem = true;

export default TimelineItem;

export { TimelineItemProps };
