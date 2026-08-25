import { CSSProperties, ReactNode, HTMLAttributes } from 'react';

/**
 * @title Log
 */
export interface LogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'ref'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 日志内容
   * @en Log content
   */
  content?: ReactNode;
  /**
   * @zh 日志类型
   * @en Type of Log
   * @defaultValue default
   */
  type?: 'default' | 'info' | 'success' | 'warning' | 'error';
  /**
   * @zh 是否显示图标
   * @en Whether to show icon
   * @defaultValue true
   */
  showIcon?: boolean;
  /**
   * @zh 自定义图标
   * @en Custom icon, effective when `showIcon` is `true`
   */
  icon?: ReactNode;
  /**
   * @zh 是否显示时间戳
   * @en Whether to show timestamp
   * @defaultValue false
   */
  showTimestamp?: boolean;
  /**
   * @zh 时间戳
   * @en Timestamp
   */
  timestamp?: string | number | Date;
}
