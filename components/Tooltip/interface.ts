import { CSSProperties, ReactNode } from 'react';
import { TriggerProps } from '../Trigger';

/**
 * @title Tooltip
 */
export interface TooltipProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 触发方式
   * @en Trigger mode
   * @defaultValue hover
   */
  trigger?: TriggerProps['trigger'];
  escToClose?: TriggerProps['escToClose'];
  /**
   * @zh 弹出的内容
   * @en The content shown in popup
   */
  content?: ReactNode;
  /**
   * @zh 弹出层背景色
   * @en background color of the popup-layer
   * @version 2.22.0
   */
  color?: string;
  /**
   * @zh 弹出框挂载的节点
   * @en The parent node which the popup will be rendered to.
   */
  getPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 弹出框的方位，有 12 个方位可供选择
   * @en The position of the popup relative to the target.
   * @defaultValue top
   */
  position?:
    | 'top'
    | 'tl'
    | 'tr'
    | 'bottom'
    | 'bl'
    | 'br'
    | 'left'
    | 'lt'
    | 'lb'
    | 'right'
    | 'rt'
    | 'rb';
  /**
   * @zh 迷你尺寸
   * @en Whether show mini style
   */
  mini?: boolean;
  prefixCls?: string;
  /**
   * @zh 是否在隐藏的时候销毁 DOM 结构
   * @en Whether to destroy the popup when hidden
   * @defaultValue true
   */
  unmountOnExit?: boolean;
  /**
   * @zh 默认的弹出框状态
   * @en Whether the popup is visible by default
   */
  defaultPopupVisible?: boolean;
  /**
   * @zh 弹出框是打开还是关闭状态
   * @en Whether the popup is visible
   */
  popupVisible?: boolean;
  /**
   * @zh 显示或隐藏时触发的回调
   * @en Callback when the visibility of the popup is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @zh 鼠标移入弹出框的话，弹出框会保留而不销毁
   * @en Whether the popup is visible when the mouse hovers over the popup
   * @defaultValue true
   */
  popupHoverStay?: boolean;
  /**
   * @zh 是否在失去焦点的时候关闭弹出框
   * @en Whether close the popup when the target element losing focus
   * @defaultValue true
   */
  blurToHide?: boolean;
  /**
   * @zh 是否禁用弹出
   * @en Whether disable popup
   */
  disabled?: boolean;
  /**
   * @zh 可以接受所有 `Trigger` 组件的参数
   * @en The Props of the `Trigger` component
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 会在打开状态给元素加上一个类，格式为 `${childrenPrefix}-open`。
   * @en Set an additional class name(`${childrenPrefix}-open`) for the container of the popup.
   */
  childrenPrefix?: string;
}
