import { CSSProperties, ReactNode } from 'react';

/**
 * @title Progress
 */
export interface ProgressProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 进度条类型
   * @en The type of Progress
   * @defaultValue line
   */
  type?: 'line' | 'circle';
  /**
   * @zh 显示步骤进度条
   * @en Show step progress
   * @version 2.10.0
   */
  steps?: number;
  /**
   * @zh 动画效果，仅在 `type=line` 时可用
   * @en Whether show animation, Only available when `type="line"`
   */
  animation?: boolean;
  /**
   * @zh 进度条状态
   * @en Progress status.
   * @version 2.16.0
   */
  status?: 'success' | 'error' | 'normal' | 'warning';
  /**
   * @zh 进度条颜色，优先级高于 `status`。传入对象时，会显示渐变色进度条。
   * @en Progress color, priority is higher than `status`
   * @version 2.10.0
   */
  color?: string | { [key: string]: string };
  /**
   * @zh 剩余进度条颜色。
   * @en The rest of progress bar color.
   */
  trailColor?: string;
  /**
   * @zh 是否展示文本
   * @en Whether display text
   * @defaultValue true
   */
  showText?: boolean;
  /**
   * @zh 进度条文本函数
   * @en Progress text function
   */
  formatText?: (percent: number) => ReactNode;
  /**
   * @zh 百分比
   * @en percent
   * @defaultValue 0
   */
  percent: number;
  /**
   * @zh 进度条线的宽度
   * @en The stroke width of Progress
   */
  strokeWidth?: number;
  /**
   * @zh 进度条的宽度。`circle` 类型的进度条仅支持数字类型的`width`
   * @en The Progress width. The `circle` type Progress only supports the number type `width`
   */
  width?: string | number;
  /**
   * @zh 不同尺寸的进度条
   * @en The size of Progress
   * @defaultValue default
   */
  size?: 'small' | 'default' | 'mini' | 'large';
  /**
   * @zh 加载中的进度条是否显示缓冲区。仅对 `type=line` 且加载中的进度条有效。
   * @en Whether the Progress show buffer. Only available when `type=line`
   */
  buffer?: boolean;
  /**
   * @zh 缓冲区的颜色
   * @en Buffer color
   */
  bufferColor?: string | object;
}
