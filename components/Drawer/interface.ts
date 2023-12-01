import { ReactNode, CSSProperties, MouseEvent } from 'react';
import { ButtonProps } from '../Button';
/**
 * @title Drawer
 */
export interface DrawerProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 设置抽屉的 zIndex
   * @en Set the zIndex of the drawer
   * @version 2.42.0
   */
  zIndex?: number;
  children?: ReactNode;
  /**
   * @zh 设置外层容器的类名
   * @en The additional class name of the container of the drawer dialog
   */
  wrapClassName?: string | string[];
  /**
   * @zh 弹出框的标题（设置为 null 时，不显示标题栏）
   * @en The title element. Drawer will not render the title element when `title` is `null`
   */
  title?: ReactNode;
  /**
   * @zh 自定义按钮确认和取消按钮，为 null 的话没有按钮组
   * @en The footer element. Drawer will not render the footer element when `footer` is `null`
   */
  footer?: ReactNode;
  /**
   * @zh 头部的样式
   * @en The additional css style for header
   * @version 2.9.0
   */
  headerStyle?: CSSProperties;
  /**
   * @zh 内容区域的样式
   * @en The additional css style for content
   * @version 2.9.0
   */
  bodyStyle?: CSSProperties;
  /**
   * @zh 设置遮罩层的样式
   * @en Style of the drawer mask
   */
  maskStyle?: CSSProperties;
  /**
   * @zh 确认按钮文案
   * @en Text of the OK button
   */
  okText?: ReactNode;
  /**
   * @zh 取消按钮文案
   * @en Text of the Cancel button
   */
  cancelText?: ReactNode;
  /**
   * @zh 确认按钮的 props
   * @en The props of `ok` button
   * @version 2.26.0
   */
  okButtonProps?: ButtonProps;
  /**
   * @zh 取消按钮的 props
   * @en The props of `cancel` button
   * @version 2.26.0
   */
  cancelButtonProps?: ButtonProps;
  /**
   * @zh 抽屉的方向 `top` `right` `bottom` `left`
   * @en The placement of the drawer: `top` `right` `bottom` `left`
   * @defaultValue right
   */
  placement?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * @zh 抽屉的宽度，`placement`为 `left` `right` 时生效
   * @en The width of the drawer dialog. Only works when `placement` is `left` or `right`
   * @defaultValue 250
   */
  width?: string | number;
  /**
   * @zh 抽屉的高度，`placement`为 `top` `bottom` 时生效
   * @en The height of the drawer dialog. Only works when `placement` is `top` or `bottom`
   * @defaultValue 250
   */
  height?: string | number;
  /**
   * @zh  按 `ESC` 键关闭
   * @en Whether to enable pressing `ESC` to close the drawer.
   * @defaultValue true
   * @version 2.10.0
   */
  escToExit?: boolean;
  /**
   * @zh 是否显示遮罩
   * @en Whether to show mask
   * @defaultValue true
   */
  mask?: boolean;
  /**
   * @zh 是否显示弹出框
   * @en Visibility of the drawer
   */
  visible?: boolean;
  /**
   * @zh 是否显示右上角关闭按钮
   * @en Whether to show the close button on top-right of the drawer dialog
   * @defaultValue true
   */
  closable?: boolean;
  /**
   * @zh 自定义右上角关闭按钮
   * @en Custom the close button on top-right of the drawer dialog
   * @version 2.49.0
   */
  closeIcon?: ReactNode;
  /**
   * @zh 点击蒙层是否可以关闭
   * @en Whether to close the drawer when the mask is clicked
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * @zh 确认按钮是否为加载中状态
   * @en Whether the OK button is in loading state
   */
  confirmLoading?: boolean;
  /**
   * @zh 是否在初次打开对话框时才渲染 dom。
   * @en Whether to render the drawer component only when it is opened initially.
   * @defaultValue true
   */
  mountOnEnter?: boolean;
  /**
   * @zh 是否在隐藏的时候销毁 DOM 结构
   * @en Whether to unmount component when hidden
   */
  unmountOnExit?: boolean;
  /**
   * @zh 点击确认按钮的回调
   * @en Callback when the OK button is clicked
   */
  onOk?: (e: Event) => void;
  /**
   * @zh 关闭弹出框的回调
   * @en Callback when the Cancel button is clicked
   */
  onCancel?: (e: MouseEvent | Event) => void;
  /**
   * @zh 抽屉打开之后的回调
   * @en Callback when drawer is opened
   */
  afterOpen?: () => void;
  /**
   * @zh 抽屉关闭之后的回调
   * @en Callback when drawer is closed
   */
  afterClose?: () => void;
  /**
   * @zh 指定弹出框挂载的父节点
   * @en Parent node which the drawer should be rendered to.
   * @defaultValue () => document.body
   */
  getPopupContainer?: () => Element;
  /**
   * @zh  抽屉里的弹出框 `Select` `Tooltip` 等挂载的容器，默认挂载在对话框内。
   * @en Set the mount node for popup such as `Select`, `Tooltip`, etc. Default to the drawer dialog.
   */
  getChildrenPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 是否默认聚焦第一个可聚焦元素，只在 `focusLock` 开启时生效。
   * @en Whether to focus on the first focusable element by default. Only works when `focusLock` is turned on.
   * @defaultValue true
   * @version 2.13.0
   */
  autoFocus?: boolean;
  /**
   * @zh 是否将焦点锁定在弹出框内。
   * @en Whether to lock the focus in the drawer box.
   * @defaultValue true
   * @version 2.13.0
   */
  focusLock?: boolean;
}
