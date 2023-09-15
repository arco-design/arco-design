import { CSSProperties, ReactNode, ReactInstance } from 'react';

/**
 * @title Notification
 */
export interface NotificationProps {
  style?: CSSProperties;
  className?: string | string;
  /**
   * @zh 通知标题
   * @en Notification title
   */
  title?: ReactNode | string;
  /**
   * @zh 通知内容
   * @en Notification content
   */
  content: ReactNode | string;
  /**
   * @zh 是否显示图标
   * @en Whether to show the icon
   * @defaultValue true
   */
  showIcon?: boolean;
  /**
   * @zh 自定义图标
   * @en Custom icon
   */
  icon?: ReactNode;
  /**
   * @zh 自动关闭的时间，单位为 `ms`
   * @en Automatic shutdown time, the unit is `ms`
   * @defaultValue 3000
   */
  duration?: number;
  /**
   * @zh 关闭时的回调
   * @en Callback when close
   */
  onClose?: () => void;
  /**
   * @zh 当前通知的唯一标识，可以用来更新消息
   * @en The unique identifier of the current notification, which can be used to update the message
   */
  id?: string;
  /**
   * @zh 消息的位置，分为 `topLeft` 左上方、`topRight` 右上方、`bottomLeft` 左下方和 `bottomRight` 右下方
   * @en The position of the message
   */
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  /**
   * @zh 添加操作按钮
   * @en Add action button
   */
  btn?: ReactNode;
  /**
   * @zh 是否显示关闭按钮
   * @en Whether to show the close button
   * @defaultValue true
   */
  closable?: boolean;
  /**
   * @zh 自定义右上角关闭按钮
   * @en Custom the close button on top-right of the drawer dialog
   * @version 2.50.0
   */
  closeIcon?: ReactNode;
  type?: string;
}

type notificationHookFunction = (config: NotificationProps) => ReactInstance;

export type NotificationHookReturnType = {
  info?: notificationHookFunction;
  success?: notificationHookFunction;
  warning?: notificationHookFunction;
  error?: notificationHookFunction;
  normal?: notificationHookFunction;
};
