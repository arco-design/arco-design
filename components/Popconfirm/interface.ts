import React, { CSSProperties, ReactNode } from 'react';
import { TriggerProps } from '../Trigger';
import { ButtonProps } from '../Button';

/**
 * @title Popconfirm
 */
export interface PopconfirmProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 弹出挂载的节点
   * @en The parent node which the confirmation box will be rendered to.
   */
  getPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 弹出框的方位，有 12 个方位可供选择
   * @en The position of the confirmation box relative to the target.
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
   * @zh 标题
   * @en Title of Popconfirm
   */
  title?: ReactNode;
  /**
   * @zh 内容
   * @en Content of Popconfirm
   * @version 2.44.0
   */
  content?: ReactNode;
  /**
   * @zh 是否禁用
   * @en whether to disabled
   * @version 2.11.0
   */
  disabled?: boolean;
  /**
   * @zh 取消按钮文字
   * @en The text of the cancel button
   */
  cancelText?: ReactNode;
  /**
   * @zh 确认按钮文字
   * @en The text of the ok button
   */
  okText?: ReactNode;
  /**
   * @zh 确认按钮的类型
   * @en The type of the ok button
   * @defaultValue primary
   */
  okType?: ButtonProps['type'];
  /**
   * @zh 确定按钮的参数，可接受 `Button` 组件的所有参数
   * @en The props of the ok button
   */
  okButtonProps?: ButtonProps;
  /**
   * @zh 取消按钮的参数，可接受 `Button` 组件的所有参数
   * @en The props of the cancel button
   */
  cancelButtonProps?: ButtonProps;
  /**
   * @zh 点击确认按钮的回调函数。回调函数 `event` 参数在 `2.29.0` 支持
   * @en Callback when click the ok button. Callback `event` params is supported in `2.29.0`
   */
  onOk?: (e: React.MouseEvent) => Promise<any> | void;
  /**
   * @deprecated 统一为 onOk, onConfirm 保留，不建议使用
   */
  onConfirm?: (e: React.MouseEvent) => Promise<any> | void;
  /**
   * @zh 点击取消按钮的回调函数。 回调函数 `event` 参数在 `2.29.0` 支持
   * @en Callback when click the cancel button. Callback `event` params is supported in `2.29.0`
   */
  onCancel?: (e: React.MouseEvent) => void;
  /**
   * @zh 默认弹出框是打开还是关闭
   * @en Whether the confirmation box is visible by default
   */
  defaultPopupVisible?: boolean;
  /**
   * @zh 弹出框是打开还是关闭。(受控)
   * @en Whether the confirmation box is visible
   */
  popupVisible?: boolean;
  /**
   * @zh 弹出打开和关闭触发的回调
   * @en Callback when the visibility of the confirmation box is changed
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * @zh 标题前的图标
   * @en Customize icon of the confirmation box
   * @defaultValue <IconExclamationCircleFill />
   */
  icon?: ReactNode;
  blurToHide?: boolean;
  /**
   * @zh 是否在隐藏的时候销毁 DOM 节点
   * @en Whether to destroy the confirmation box when hidden
   * @defaultValue true
   */
  unmountOnExit?: boolean;
  /**
   * @zh 触发方式
   * @en Trigger mode
   * @defaultValue click
   */
  trigger?: TriggerProps['trigger'];
  escToClose?: TriggerProps['escToClose'];
  /**
   * @zh 可以接受所有 Trigger 的参数
   * @en The Props of the `Trigger` component
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 是否自动聚焦弹出框内的可聚焦元素
   * @en Whether to automatically focus the first focusable element in the confirmation box
   */
  autoFocus?: boolean;
  /**
   * @zh 是否将焦点锁定在弹出框内
   * @en Whether to lock the focus in the confirmation box
   */
  focusLock?: boolean;
}
