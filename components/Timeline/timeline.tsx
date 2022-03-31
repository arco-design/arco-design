import React, { PropsWithChildren, useContext, ReactElement, RefObject } from 'react';
import cs from '../_util/classNames';
import Item from './item';
import { ConfigContext } from '../ConfigProvider';
import Spin from '../Spin';
import { TimelineProps } from './interface';
import useMergeProps from '../_util/hooks/useMergeProps';

const getDefaultPosition = (position, index, mode, direction) => {
  let map = ['left', 'right'];
  if (direction === 'horizontal') {
    map = ['top', 'bottom'];
  }
  const res = mode === 'alternate' ? position || map[index % 2] : mode;

  return map.indexOf(res) > -1 ? res : map[0];
};

const defaultProps: TimelineProps = {
  mode: 'left',
  direction: 'vertical',
  pendingDot: <Spin size={12} />,
  labelPosition: 'same',
};

function Timeline(baseProps: PropsWithChildren<TimelineProps>, ref: RefObject<HTMLDivElement>) {
  const { getPrefixCls, componentConfig } = useContext(ConfigContext);
  const props = useMergeProps<PropsWithChildren<TimelineProps>>(
    baseProps,
    defaultProps,
    componentConfig?.Timeline
  );
  const {
    className,
    mode,
    reverse,
    children,
    style,
    direction,
    pending,
    labelPosition,
    pendingDot,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('timeline');

  const items =
    React.Children.map(children, (child: ReactElement) => {
      if (child && child.type && (child.type as typeof Item).isTimelineItem) {
        return child;
      }
      return null;
    }) || [];

  if (pending) {
    items.push(
      <Item lineType="dashed" dot={pendingDot}>
        {pending === true ? '' : pending}
      </Item>
    );
  }

  if (reverse) {
    items.reverse();
  }

  return (
    <div
      role="list"
      {...rest}
      ref={ref}
      className={cs(
        prefixCls,
        `${prefixCls}-${mode}`,
        `${prefixCls}-direction-${direction}`,
        className
      )}
      style={style}
    >
      {items.map((child: ReactElement, index) => {
        if (!child) {
          return null;
        }

        const { position } = child.props;
        let lineType = child.props.lineType;
        if (pending) {
          if (reverse) {
            if (index === 0) {
              lineType = 'dashed';
            }
          } else if (items.length - 2 === index) {
            lineType = 'dashed';
          }
        }
        return React.cloneElement(child, {
          key: index,
          className: cs(child.props.className, {
            [`${prefixCls}-item-last`]: items.length - 1 === index,
          }),
          labelPosition,
          position: getDefaultPosition(position, index, mode, direction),
          direction,
          lineType,
        });
      })}
    </div>
  );
}

const ForwardRefTimeline = React.forwardRef<unknown, PropsWithChildren<TimelineProps>>(Timeline);

const TimelineComponent = ForwardRefTimeline as typeof ForwardRefTimeline & { Item: typeof Item };

TimelineComponent.displayName = 'Timeline';

TimelineComponent.Item = Item;

export default TimelineComponent;

export { TimelineProps };
