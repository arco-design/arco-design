import { ReactNode, CSSProperties } from 'react';

/**
 * @title Empty
 */
export interface EmptyProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 显示文案
   * @en Description of empty content
   */
  description?: ReactNode;
  /**
   * @zh 自定义显示图案
   * @en Custom icon
   */
  icon?: ReactNode;
  /**
   * @zh 将图标替换为图片
   * @en Replace icon with picture
   */
  imgSrc?: string;
}
