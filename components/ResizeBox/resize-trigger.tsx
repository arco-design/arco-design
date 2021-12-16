import React, { useContext, CSSProperties, ReactNode, PropsWithChildren } from 'react';
import cs from '../_util/classNames';
import ResizeObserver from '../_util/resizeObserver';
import { ConfigContext } from '../ConfigProvider';
import IconDragDotVertical from '../../icon/react-icon/IconDragDotVertical';
import IconDragDot from '../../icon/react-icon/IconDragDot';
import IconCaretRight from '../../icon/react-icon/IconCaretRight';
import IconCaretLeft from '../../icon/react-icon/IconCaretLeft';
import IconCaretDown from '../../icon/react-icon/IconCaretDown';
import IconCareUp from '../../icon/react-icon/IconCaretUp';
import { isFunction, isObject } from '../_util/is';

export interface ResizeTriggerProps {
  style?: CSSProperties;
  className?: string | string[];
  /** 方向，可选值为水平 `horizontal`，垂直 `vertical` */
  direction: string;
  /** 定制图标 */
  icon?: ReactNode;
  /** 鼠标按下的事件 */
  onMouseDown?: (e) => void;
  /** resize 事件 */
  onResize?: (e) => void;
  /** 支持伸缩 */
  resizable?: boolean;
  /** 支持快速收缩 */
  collapsible?: {
    prev?: {
      icon?: ReactNode;
      onClick?: (e) => void;
      collapsed?: boolean;
    };
    next?: {
      icon?: ReactNode;
      onClick?: (e) => void;
      collapsed?: boolean;
    };
  };
  renderChildren?: (prev: ReactNode, trigger: ReactNode, next: ReactNode) => ReactNode;
}

export default function ResizeTrigger(props: PropsWithChildren<ResizeTriggerProps>) {
  const {
    className,
    direction,
    icon,
    onMouseDown,
    onResize,
    children,
    collapsible = {},
    resizable = true,
    renderChildren,
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('resizebox-trigger');
  const isHorizontal = direction === 'horizontal';
  const classNames = cs(
    prefixCls,
    `${prefixCls}-${isHorizontal ? 'horizontal' : 'vertical'}`,
    { [`${prefixCls}-not-resizable`]: !resizable },
    className
  );

  const prevCollapsedConfig: ResizeTriggerProps['collapsible']['prev'] = isObject(collapsible.prev)
    ? {
        ...collapsible.prev,
        icon: collapsible.prev.icon || (isHorizontal ? <IconCareUp /> : <IconCaretLeft />),
      }
    : {};
  const nextCollapsedConfig: ResizeTriggerProps['collapsible']['next'] = isObject(collapsible.next)
    ? {
        ...collapsible.next,
        icon: collapsible.next.icon || (isHorizontal ? <IconCaretDown /> : <IconCaretRight />),
      }
    : {};

  const renderPrevCollapsedTrigger = () => {
    // 1. 传入了prev
    // 当前不在收缩状态，或者在反方向收缩状态时展示
    if (
      (prevCollapsedConfig.icon && !prevCollapsedConfig.collapsed) ||
      nextCollapsedConfig.collapsed
    ) {
      return (
        <span
          className={cs(`${prefixCls}-icon`, cs(`${prefixCls}-prev`))}
          onClick={prevCollapsedConfig.onClick}
        >
          {prevCollapsedConfig.icon}
        </span>
      );
    }
    return <span className={cs(`${prefixCls}-icon-empty`)} />;
  };

  const renderNextCollapsedTrigger = () => {
    if (
      (nextCollapsedConfig.icon && !nextCollapsedConfig.collapsed) ||
      prevCollapsedConfig.collapsed
    ) {
      return (
        <span
          className={cs(`${prefixCls}-icon`, cs(`${prefixCls}-next`))}
          onClick={nextCollapsedConfig.onClick}
        >
          {nextCollapsedConfig.icon}
        </span>
      );
    }
    return <span className={cs(`${prefixCls}-icon-empty`)} />;
  };

  const renderResizeTrigger = () => {
    if (resizable) {
      return (
        <span className={`${prefixCls}-icon`}>
          {icon || (isHorizontal ? <IconDragDot /> : <IconDragDotVertical />)}
        </span>
      );
    }
    return <span className={cs(`${prefixCls}-icon-empty`)} />;
  };

  const prev = renderPrevCollapsedTrigger();
  const trigger = renderResizeTrigger();
  const next = renderNextCollapsedTrigger();

  const renderIcon = () => {
    return (
      <div className={`${prefixCls}-icon-wrapper`}>
        {prev}
        {trigger}
        {next}
      </div>
    );
  };

  if (!resizable) {
    return (
      <div className={classNames}>
        {isFunction(renderChildren)
          ? renderChildren(prev, trigger, next)
          : children || renderIcon()}
      </div>
    );
  }

  return (
    <ResizeObserver onResize={onResize}>
      <div className={classNames} onMouseDown={onMouseDown}>
        {isFunction(renderChildren)
          ? renderChildren(prev, trigger, next)
          : children || renderIcon()}
      </div>
    </ResizeObserver>
  );
}
