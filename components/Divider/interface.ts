import { CSSProperties, ReactNode } from 'react';

/**
 * @title Divider
 */
export interface DividerProps {
  children?: ReactNode;
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 分割线的类型，是水平还是竖直，分别对应 `horizontal` 和 `vertical`
   * @en Two types are available: `horizontal` and `vertical`
   * @defaultValue horizontal
   */
  type?: 'horizontal' | 'vertical';
  /**
   * @zh 分割线文字的位置
   * @en The position of description content in Divider
   * @defaultValue center
   */
  orientation?: 'left' | 'right' | 'center';
}
