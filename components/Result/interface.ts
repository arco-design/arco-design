import { CSSProperties, ReactNode } from 'react';

export type ResultStatus = null | 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

/**
 * @title Result
 */
export interface ResultProps {
  className?: string | string[];
  style?: CSSProperties;
  /**
   * @zh 标题文字
   * @en The title
   */
  title?: ReactNode;
  /**
   * @zh 子标题文字
   * @en The subTitle
   */
  subTitle?: ReactNode;
  /**
   * @zh 不同状态，传入 null 时，需要通过 `icon` 属性设置图标，并且默认没有背景色以及图标颜色
   * @en The result status, if `null` the icon and the background color will not be displayed. [example](/react/en-US/components/result#custom-icon)
   * @defaultValue info
   */
  status?: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500' | null;
  /**
   * @zh 自定义图标
   * @en Customize the icon
   */
  icon?: ReactNode;
  /**
   * @zh 额外内容
   * @en The operating area
   */
  extra?: ReactNode;
}
