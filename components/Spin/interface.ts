import { CSSProperties, ReactNode } from 'react';

/**
 * @title Spin
 */
export interface SpinProps {
  style?: CSSProperties;
  className?: string | string[];
  children?: ReactNode;
  /**
   * @zh 是否为加载状态
   * @en Whether is loading status
   */
  loading?: boolean;
  /**
   * @zh 加载动画的尺寸
   * @en The size of loading icon
   */
  size?: number;
  /**
   * @zh 自定义图标，会自动旋转。
   * @en Customize icon which will be rotated automatically.
   */
  icon?: ReactNode;
  /**
   * @zh 自定义元素，非图标，不附带旋转效果。可用于设置为 gif 图片等。
   * @en Customize element which won't be rotated automatically, such as image/gif.
   */
  element?: ReactNode;
  /**
   * @zh 加载的文案
   * @en Customize description content when Spin has children
   */
  tip?: string | ReactNode;
  /**
   * @zh 延迟显示加载的时间 (ms)
   * @en Specifies a delay(ms) for loading state
   */
  delay?: number;
  /**
   * @zh 是否使用点类型的动画
   * @en Whether to use dot type animation
   */
  dot?: boolean;

  /**
   * @zh 是否为块级元素, `block` 属性在 `2.29.0` 支持
   * @en Whether it is a block-level element, `block` attribute is supported in `2.29.0`
   */
  block?: boolean;
}
