import { CSSProperties, ReactNode } from 'react';

/**
 * @title Timeline
 */
export interface TimelineProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否倒序
   * @en Whether Reverse order
   */
  reverse?: boolean;
  /**
   * @zh 时间轴方向
   * @en Timeline direction
   * @defaultValue vertical
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @zh 时间轴的展示类型：时间轴在左侧/右侧(垂直方向)、上方/下方（水平方向），或交替出现。
   * @en The display mode of Timeline
   * @defaultValue left(vertical) | top(horizontal)
   */
  mode?: 'left' | 'right' | 'top' | 'bottom' | 'alternate';
  /**
   * @zh 是否展示幽灵节点，设置为 true 时候只展示幽灵节点。传入ReactNode时，会作为节点内容展示。
   * @en Whether to display ghost nodes. When set to true, only ghost nodes are displayed. When passed to ReactNode, it will be displayed as node content
   */
  pending?: boolean | ReactNode;
  /**
   * @zh 可以传入 ReactNode 定制幽灵节点
   * @en You can pass in ReactNode to customize the ghost node
   * @defaultValue <Spin size={12} />
   */
  pendingDot?: ReactNode;
  /**
   * @zh 设置标签文本的位置
   * @en Position of label text
   * @defaultValue same
   */
  labelPosition?: 'relative' | 'same';
}

/**
 * @title Timeline.Item
 */
export interface TimelineItemProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 节点颜色
   * @en Dot color
   */
  dotColor?: string;
  /**
   * @zh 节点类型：空心圆/实心圆
   * @en Dot type
   * @defaultValue solid
   */
  dotType?: 'hollow' | 'solid';
  /**
   * @zh 自定义节点
   * @en Custom Dot
   */
  dot?: string | ReactNode;
  /**
   * @zh 时间轴类型：实线/虚线/点状线
   * @en Line type
   * @defaultValue solid
   */
  lineType?: 'solid' | 'dashed' | 'dotted';
  /**
   * @zh 时间轴颜色
   * @en Line Color
   */
  lineColor?: string;
  /**
   * @zh 标签文本
   * @en Label text
   */
  label?: string | ReactNode;
  /**
   * @zh 时间轴节点的位置。 在时间轴组件 `mode=alternate` 时候生效
   * @en The position of the timeline node. Take effect when set `mode=alternate`
   */
  labelPosition?: 'relative' | 'same';
  /**
   * @zh 是否自动适配自定义节点尺寸到 16px
   * @en Whether to automatically adapt the custom node size to 16px
   * @defaultValue true
   */
  autoFixDotSize?: boolean;
  position?: 'left' | 'right';
  direction?: 'horizontal' | 'vertical';
  children?: ReactNode;
}
