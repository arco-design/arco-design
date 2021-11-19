import { CSSProperties, ReactNode } from 'react';

/**
 * @title ResizeBox
 */
export interface ResizeBoxProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 宽度，受控属性
   * @en The width of ResizeBox
   * @version 2.7.0
   */
  width?: number;
  /**
   * @zh 高度，受控属性
   * @en The height of ResizeBox
   * @version 2.7.0
   */
  height?: number;
  /**
   * @zh 伸缩框的 html 标签
   * @en The html tag of ResizeBox
   * @defaultValue div
   */
  component?: string;
  /**
   * @zh 可以进行伸缩的边，有上、下、左、右可以使用，默认是右方向。
   * @en The edges can be Resize, It can be `up`, `down`, `left`, `right`
   * @defaultValue ['right']
   */
  directions?: Array<'left' | 'right' | 'top' | 'bottom'>;
  /**
   * @zh 定制伸缩杆的图标，四个方向都支持定制。
   * @en Custom the icon of Split,All four directions are supported
   * @defaultValue {}
   */
  resizeIcons?: {
    top?: ReactNode;
    bottom?: ReactNode;
    left?: ReactNode;
    right?: ReactNode;
  };
  /**
   * @zh 定制伸缩杆的内容，四个方向都支持定制。
   * @en Custom the content of Split,All four directions are supported
   * @defaultValue {}
   */
  resizeTriggers?: {
    top?: ReactNode;
    bottom?: ReactNode;
    left?: ReactNode;
    right?: ReactNode;
  };
  /**
   * @zh 开始拖拽之前的回调
   * @en Callback when the start of resize.
   */
  onMovingStart?: () => void;
  /**
   * @zh 拖拽中的回调
   * @en Callback when resizing
   * @version `size` in `2.7.0`
   */
  onMoving?: (e: MouseEvent, size: { width: number; height: number }) => void;
  /**
   * @zh 拖拽结束之后的回调
   * @en Callback when the end of resize
   */
  onMovingEnd?: () => void;
}

/**
 * @title ResizeBox.Split
 */
export interface SplitProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 分割框的 html 标签
   * @en The html tag of Split
   * @defaultValue div
   */
  component?: string;
  /**
   * @zh 分割方向分为水平 `horizontal` 和垂直 `vertical`，默认是水平分割
   * @en The direction of Split. It can be `horizontal` and `vertical`
   * @defaultValue horizontal
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @zh 定制伸缩杆的图标
   * @en Custom the icon of Split
   */
  icon?: ReactNode;
  /**
   * @zh 定制伸缩杆的内容
   * @en Custom the content of Split
   */
  trigger?: ReactNode;
  /**
   * @zh 分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px
   * @en Split size. It can be 0~1 representing a percentage, or a specific number of pixels, ex 300px
   * @defaultValue 0.5
   */
  size?: number | string;
  /**
   * @zh 最小阈值
   * @en Minimum threshold
   */
  min?: number | string;
  /**
   * @zh 最大阈值
   * @en Maximum threshold
   */
  max?: number | string;
  /**
   * @zh 面板，[firstPane, secondPane]
   * @en panes,[firstPane, secondPane]
   */
  panes: ReactNode[];
  /**
   * @zh 禁用
   * @en Whether the split is disabled
   */
  disabled?: boolean;
  /**
   * @zh 开始拖拽之前的回调
   * @en Callback when the start of resize
   */
  onMovingStart?: () => void;
  /**
   * @zh 拖拽中的回调
   * @en Callback when moving
   * @version `size` in `2.14.0`
   */
  onMoving?: (e: MouseEvent, size: number | string) => void;
  /**
   * @zh 拖拽结束之后的回调
   * @en Callback when the end of resize
   */
  onMovingEnd?: () => void;
  /**
   * @zh 面板大小变化的回调
   * @en Callback when pane resized
   * @version 2.25.0
   */
  onPaneResize?: (paneContainers: HTMLElement[]) => void;
}
