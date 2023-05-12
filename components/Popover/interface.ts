import { CSSProperties, ReactNode } from 'react';
import { TooltipProps } from '../Tooltip';

/**
 * @title Popover
 */
export interface PopoverProps extends Omit<TooltipProps, 'mini'> {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 标题.  函数类型在 `2.48.0` 支持
   * @en Title of the popup card. Function types are supported in `2.48.0`
   */
  title?: ReactNode | (() => ReactNode);
  /**
   * @zh 是否禁用
   * @en Whether to disabled
   * @version 2.11.0
   */
  disabled?: boolean;
}
