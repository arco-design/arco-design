import { ReactNode, CSSProperties } from 'react';
import { ButtonProps } from '../Button';
import { ConfirmProps } from './confirm';

/**
 * @title Modal
 */
export interface ModalProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 关闭弹出框的回调
   * @en Callback when click cancel button
   */
  onCancel?: () => void;
  /**
   * @zh 点击确认按钮的回调
   * @en Callback when click ok button
   */
  onOk?: (e?: MouseEvent) => Promise<any> | void;
  // 统一为 onOk，onConfirm保留，不建议使用
  onConfirm?: (e?: MouseEvent) => Promise<any> | void;
  /**
   * @zh 指定弹出框挂载的父节点
   * @en Specify the parent node of the Modal
   * @defaultValue () => document.body
   */
  getPopupContainer?: () => Element;
  /**
   * @zh 对话框里的弹出框 `Select` `Tooltip` 等挂载的容器，默认挂载在对话框内。
   * @en The Popup in Modal. Such as `Select` and `Tooltip` are mounted in the Modal
   */
  getChildrenPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 弹出框的标题
   * @en The title of Modal
   */
  title?: string | ReactNode;
  /**
   * @zh 弹出框是否可见
   * @en Whether the Modal is visible
   */
  visible?: boolean;
  /**
   * @zh 是否显示遮罩
   * @en Whether show mask
   * @defaultValue true
   */
  mask?: boolean;
  /**
   * @zh
   * 简洁模式的样式，没有分割线，底部按钮居中显示。默认通过方法调用的提示类型的弹窗会展示`simple`样式。设置为true时，默认不显示右上角关闭图标
   * @en
   * Simple Mode, no dividing line, the bottom button is displayed in the center.
   * The Alter Modal called by the default method will use `simple` mode. When set to true, the close icon is not display
   */
  simple?: boolean;
  /**
   * @zh 确认按钮文案
   * @en The text of `ok` button
   */
  okText?: ReactNode;
  /**
   * @zh 取消按钮文案
   * @en The text of `cancel` button
   */
  cancelText?: ReactNode;
  /**
   * @zh 确认按钮的 props
   * @en The props of `ok` button
   */
  okButtonProps?: ButtonProps;
  /**
   * @zh 取消按钮的 props
   * @en The props of `cancel` button
   */
  cancelButtonProps?: ButtonProps;
  /**
   * @zh 自定义页脚，传入 null 则不显示
   * @en Custom `footer`. if it is null, the footer will not be displayed.
   * @version 2.12.0
   */
  footer?: ReactNode | ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode);
  /**
   * @zh 是否显示右上角的关闭按钮
   * @en Whether to show the close button in TitleBar
   */
  closable?: boolean;
  /**
   * @zh 自定义右上角的关闭按钮节点
   * @en Customize the close icon
   * @version 2.21.0
   */
  closeIcon?: ReactNode;
  /**
   * @zh 点击蒙层是否可以关闭
   * @en Whether enable click mask to close Modal.
   * @defaultValue true
   */
  maskClosable?: boolean;
  /**
   * @zh 蒙层的样式
   * @en The style of mask
   * @version 2.6.0
   */
  maskStyle?: CSSProperties;
  /**
   * @zh 弹框打开之后的回调
   * @en Callback when Modal opened
   */
  afterOpen?: () => void;
  /**
   * @zh 弹框关闭之后的回调
   * @en Callback when Modal closed
   */
  afterClose?: () => void;
  /**
   * @zh 确认按钮加载中
   * @en Whether The `ok` button is loading
   */
  confirmLoading?: boolean;
  /**
   * @zh 是否在初次打开对话框时才渲染 dom
   * @en Whether to render DOM when first opened
   * @defaultValue true
   */
  mountOnEnter?: boolean;
  /**
   * @zh 是否在隐藏之后销毁DOM结构
   * @en Whether to destroy DOM after closed
   */
  unmountOnExit?: boolean;
  /**
   * @zh 按 `ESC` 键关闭
   * @en Whether enable press `ESC` to close Modal
   * @defaultValue true
   */
  escToExit?: boolean;
  /**
   * @zh 弹出框垂直水平居中
   * @en Modal is centered vertically and horizontally
   * @defaultValue true
   */
  alignCenter?: boolean;
  /**
   * @zh 弹出框外层 dom 类名
   * @en The class of the wrapped dom
   */
  wrapClassName?: string | string[];
  /**
   * @zh 弹出框外层样式
   * @en The style of the wrapped dom
   * @version 2.16.0
   */
  wrapStyle?: CSSProperties;
  hideCancel?: boolean;
  /**
   * @zh 是否默认聚焦第一个可聚焦元素，只在 `focusLock` 开启时生效。
   * @en Whether to focus the first focusable element
   * @defaultValue true
   */
  autoFocus?: boolean;
  /**
   * @zh 是否将焦点锁定在弹出框内
   * @en Whether to lock the focus in the Modal
   * @defaultValue true
   */
  focusLock?: boolean;
  /**
   * @zh 自定义渲染对话框
   * @en Custom the render of Modal
   * @version 2.2.0
   */
  modalRender?: (modalNode: ReactNode) => ReactNode;
  prefixCls?: string;
}

export type ModalReturnProps = { update: Function; close: Function };

type modalHookFunction = (config: ConfirmProps) => {
  close: () => void;
  update: (config: ConfirmProps) => void;
};

export type ModalHookReturnType = {
  confirm?: modalHookFunction;
  info?: modalHookFunction;
  success?: modalHookFunction;
  warning?: modalHookFunction;
  error?: modalHookFunction;
};
