import { CSSProperties, ReactNode, HTMLAttributes } from 'react';

/**
 * @title Trigger
 */
export interface TriggerProps {
  className?: string | string[];
  /**
   * @zh 弹出框（外部）的样式
   * @en The additional css class
   */
  style?: CSSProperties;
  /**
   * @zh 弹出框（内部）的样式
   * @en The css style of the content of the popup
   */
  popupStyle?: CSSProperties;
  /**
   * @zh 弹出层跟随鼠标位置
   * @en The popup will align mouse position
   */
  alignPoint?: boolean;
  /**
   * @zh 自动对齐子元素的宽度设置弹出框的宽度
   * @en Set the width of the popup by the width of the child element
   */
  autoAlignPopupWidth?: boolean;
  /**
   * @zh 自动对齐子元素的宽度设置弹出框的最小宽度
   * @en Set the minimum width of the popup by the width of the child element
   */
  autoAlignPopupMinWidth?: boolean;
  /**
   * @zh 动画类名
   * @en Animation class name
   * @defaultValue fadeId
   */
  classNames?: string;
  /**
   * @zh 动画过渡时间
   * @en Animation transition time
   * @defaultValue 200
   */
  duration?: number | { exit?: number; enter?: number; appear?: number };
  /**
   * @zh 设置这个参数后，打开弹出后，children 上会添加一个名为 `${childrenPrefix}-open` 的类。
   * @en Set an additional class name(`${childrenPrefix}-open`) for the container of the popup.
   */
  childrenPrefix?: string;
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh mouseenter 触发延时的毫秒数
   * @en Delay time to show when mouse enter. unit: ms.
   * @defaultValue 100
   */
  mouseEnterDelay?: number;
  /**
   * @zh mouseleave 触发延时的毫秒数
   * @en Delay time to show when mouse leave. unit: ms.
   * @defaultValue 100
   */
  mouseLeaveDelay?: number;
  /**
   * @zh focus 触发延时的毫秒数
   * @en Delay time to show when focus. unit: ms.
   */
  focusDelay?: number;
  /**
   * @zh 在该元素上执行 clickOutside，触发弹出框关闭
   * @en Return a element which will be attached click event to close trigger
   * @defaultValue () => window.document
   */
  getDocument?: () => Element;
  /**
   * @zh 设置弹出内容所插入的父元素
   * @en Set the parent node which the popup will be rendered to.
   */
  getPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 隐藏后是否销毁 DOM 结构
   * @en Whether to destroy the popup when hidden
   * @defaultValue true
   */
  unmountOnExit?: boolean;
  /**
   * @zh 触发方式
   * @en Types of events that cause the popup to show
   * @defaultValue hover
   */
  trigger?:
    | 'hover'
    | 'click'
    | 'focus'
    | 'contextMenu'
    | Array<'hover' | 'click' | 'focus' | 'contextMenu'>;
  /**
   * @zh 弹出位置，一共有 12 个方位可供选择
   * @en The position of the popup relative to the child node.
   * @defaultValue bottom
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
   * @zh 弹出框的内容
   * @en The content of the popup
   */
  popup?: () => ReactNode;
  /**
   * @zh 是否根据空间自动调整弹出框的位置
   * @en Whether to automatically adjust the position of the popup according to the viewport
   * @defaultValue true
   */
  autoFitPosition?: boolean;
  /**
   * @zh 是否在鼠标移出触发节点，移入弹出框时保留弹出框。
   * @en Whether the popup is visible when the mouse hovers over the popup.
   * @defaultValue true
   */
  popupHoverStay?: boolean;
  /**
   * @zh 是否在触发节点失去焦点的时候关闭弹出框，仅在 `trigger` 中含有 `focus` 时生效
   * @en Whether close the popup when the child node losing focus. Only work when the `trigger` containers `focus`
   * @defaultValue true
   */
  blurToHide?: boolean;
  /**
   * @zh 是否在鼠标移出触发节点和弹出层的时候关闭弹出层
   * @en Whether to allow close the popup by clicking the child node.
   * @defaultValue true
   * @version 2.22.0
   */
  mouseLeaveToClose?: boolean;
  /**
   * @zh 是否能通过点击触发节点来关闭弹出框
   * @en Whether to allow close the popup by clicking the child node.
   * @defaultValue true
   */
  clickToClose?: boolean;
  /**
   * @zh 是否在点击空白处（触发节点和弹出框以外的区域）时关闭弹出层。 关闭时会触发 `onVisibleChange`。
   * @en Whether to allow close the popup by clicking the area outside the child node and the popup box.
   * @defaultValue true
   */
  clickOutsideToClose?: boolean;
  /**
   * @zh 是否允许按 `ESC` 键关闭弹出框。
   * @en Whether to allow close the popup by pressing `ESC`.
   * @defaultValue false
   */
  escToClose?: boolean;
  /**
   * @zh 按钮点击事件（`trigger` 包含 `click` 时生效）
   * @en Callback when click the child node. (Only work when `trigger` contains `click`)
   */
  onClick?: (popupVisible: boolean) => void;
  /**
   * @zh 点击触发节点和弹出框以外的区域的回调。
   * @en Callback when click the area outside the child and the popup
   */
  onClickOutside?: Function;
  /**
   * @zh
   * 调整弹出框的位置，有四个属性值，`left`, `right`, `top`, `bottom`，分别表示向该方向移动几个像素。
   * 具体可查看 [示例](/react/components/trigger#设置弹窗位置偏移量)
   * @en
   * Adjust the position of the popup. Indicates moving a few pixels in one direction. [example](/react/en-US/components/trigger#popupAlign)
   * @defaultValue {}
   */
  popupAlign?: {
    left?: number | [number, number];
    right?: number | [number, number];
    top?: number | [number, number];
    bottom?: number | [number, number];
  };
  /**
   * @zh 默认弹出框开启或关闭
   * @en Whether the popup is visible by default
   */
  defaultPopupVisible?: boolean;
  /**
   * @zh 设置弹出框开启或关闭
   * @en Whether the popup is visible
   */
  popupVisible?: boolean;
  /**
   * @zh 显示或隐藏时触发的回调
   * @en Callback when the visibility of the popup is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @zh 当内容发生变化导致内容区域尺寸发生变化，自动进行重新定位。
   * @en Whether to automatically reposition when the popup's size changes.
   * @defaultValue true
   */
  autoFixPosition?: boolean;
  /**
   * @zh 是否展示箭头元素
   * @en Whether to display arrow node
   */
  showArrow?: boolean;
  /**
   * @zh 箭头元素的所有 html 参数
   * @en The html attributes of the arrow node
   */
  arrowProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * @zh 是否在容器滚动时更新弹出框的位置
   * @en Whether to update the popover's position when the container is scrolled
   * @version 2.32.0
   */
  updateOnScroll?: boolean;
}

export type MouseLocationType = { clientX: number; clientY: number };
