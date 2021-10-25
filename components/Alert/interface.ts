import { CSSProperties, ReactNode } from 'react';

/**
 * @title Alert
 */
export interface AlertProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 自定义操作项
   * @en Custom action item
   */
  action?: ReactNode;
  /**
   * @zh 是否可关闭
   * @en Whether Alert can be closed
   */
  closable?: boolean;
  closeable?: boolean; // typo
  /**
   * @zh 关闭的回调
   * @en Callback when Alert is closed
   */
  onClose?: (e) => void;
  /**
   * @zh 关闭动画结束后执行的回调
   * @en Callback when Alert close animation is complete
   */
  afterClose?: () => void;
  /**
   * @zh 警告的类型
   * @en Type of Alert
   * @defaultValue info
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * @zh 标题
   * @en Alert title
   */
  title?: ReactNode;
  /**
   * @zh 内容
   * @en Alert content
   */
  content?: ReactNode;
  /**
   * @zh 可以指定自定义图标，`showIcon` 为 `true` 时生效。
   * @en Custom icon, effective when `showIcon` is `true`
   */
  icon?: ReactNode;
  /**
   * @zh 自定义关闭按钮
   * @en Custom close button
   */
  closeElement?: ReactNode;
  /**
   * @zh 是否显示图标
   * @en Whether to show icon
   * @defaultValue true
   */
  showIcon?: boolean;
  /**
   * @zh 是否用作顶部公告
   * @en Whether to show as banner
   */
  banner?: boolean;
}
