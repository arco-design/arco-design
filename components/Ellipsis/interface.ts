import { CSSProperties, ReactNode } from 'react';

/**
 * @title Ellipsis
 */
export interface EllipsisProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 显示省略的行数
   * @en The number of omitted rows
   * @defaultValue 1
   */
  rows?: number;
  /**
   * @zh 配置省略弹出框
   * @en Show Tooltip when ellipsis
   */
  tooltip?: boolean;
  /**
   * @zh 是否显示操控按钮
   * @en Whether to display control button
   */
  action?: boolean;
  /**
   * @zh 自定义渲染操控按钮
   * @en Custom rendering control buttons
   */
  actionRender?: (expanded: boolean) => ReactNode;
}
