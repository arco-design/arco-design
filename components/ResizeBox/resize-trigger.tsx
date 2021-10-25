import React, { useContext, CSSProperties, ReactNode, PropsWithChildren } from 'react';
import cs from '../_util/classNames';
import ResizeObserver from '../_util/resizeObserver';
import { ConfigContext } from '../ConfigProvider';
import IconDragDotVertical from '../../icon/react-icon/IconDragDotVertical';
import IconDragDot from '../../icon/react-icon/IconDragDot';

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
}

export default function ResizeTrigger(props: PropsWithChildren<ResizeTriggerProps>) {
  const { className, direction, icon, onMouseDown, onResize, children } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('resizebox-trigger');
  const isHorizontal = direction === 'horizontal';
  const classNames = cs(
    prefixCls,
    `${prefixCls}-${isHorizontal ? 'horizontal' : 'vertical'}`,
    className
  );

  const renderIcon = () => {
    return (
      <div className={`${prefixCls}-icon-wrapper`}>
        <span className={`${prefixCls}-icon`}>
          {icon || (isHorizontal ? <IconDragDot /> : <IconDragDotVertical />)}
        </span>
      </div>
    );
  };

  return (
    <ResizeObserver onResize={onResize}>
      <div className={classNames} onMouseDown={onMouseDown}>
        {children || renderIcon()}
      </div>
    </ResizeObserver>
  );
}
