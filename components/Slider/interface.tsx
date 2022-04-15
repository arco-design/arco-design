import { CSSProperties, ReactNode } from 'react';
import { InputNumberProps } from '../InputNumber';

export type TooltipPosition =
  | 'top'
  | 'tl'
  | 'tr'
  | 'bottom'
  | 'bl'
  | 'br'
  | 'left'
  | 'lt'
  | 'lb'
  | 'right'
  | 'rt'
  | 'rb';

/**
 * @title Slider
 */
export interface SliderProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 控制 tooltip 的展示。设置为 `true` 时，将一直展示 tooltip。设置为 `false` 时，将一直隐藏 tooltip。
   * @en If true, `Tooltip` will show always, or it will hidden anyway,  even if dragging or hovering
   */
  tooltipVisible?: boolean;
  /**
   * @zh tooltip 的位置
   * @en The position of the tooltip
   */
  tooltipPosition?:
    | 'top'
    | 'tl'
    | 'tr'
    | 'bottom'
    | 'bl'
    | 'br'
    | 'left'
    | 'lt'
    | 'lb'
    | 'right'
    | 'rt'
    | 'rb';
  /**
   * @zh 是否禁用
   * @en Whether to disable the component
   */
  disabled?: boolean;
  /**
   * @zh 滑动范围最小值
   * @en Minimum value of sliding range
   * @defaultValue 0
   */
  min?: number;
  /**
   * @zh 滑动范围最大值
   * @en Maximum value of sliding range
   * @defaultValue 100
   */
  max?: number;
  /**
   * @zh 是否是范围选择
   * @en Whether to allow range selection
   * @version 2.14.0
   */
  range?: boolean | { draggableBar: boolean };
  /**
   * @zh 步长
   * @en Slide the value of one step
   * @defaultValue 1
   */
  step?: number;
  /**
   * @zh 是否显示步长刻度线
   * @en Whether to display step tick marks
   */
  showTicks?: boolean;
  /**
   * @zh 标签。是一个对象。key 为在[min, max]内的整数。
   * @en The labels on the render ruler. `marks` is an Object, it's `key` is an integer within [min, max].
   */
  marks?: Record<number, ReactNode>;
  /**
   * @zh 针对区间配置，返回区间步长和相对于整个滑动轴的宽度比例(如 0.5 或 "50%")。**只在`marks`场景下生效**
   * @en For interval configuration, returns the interval step size and the ratio of the width relative to the entire sliding axis (e.g. 0.5 or "50%"). **Only valid in `marks` scene**
   * @version 2.30.0
   */
  getIntervalConfig?: (
    range: number[],
    index: number
  ) => { step?: number; width?: number | string };
  /**
   * @zh 只能选择标签值，此时step将会被忽略
   * @en Whether only the mark value can be selected
   */
  onlyMarkValue?: boolean;

  /**
   * @zh 默认值
   * @en To set default value
   */
  defaultValue?: number | number[];
  /**
   * @zh 值
   * @en To set value
   */
  value?: number | number[];
  /**
   * @zh 是否竖直方向
   * @en Whether to display the slider in the vertical direction
   */
  vertical?: boolean;
  /**
   * @zh 是否展示输入框，`onlyMarkValue` 为 `true` 时输入框始终隐藏。可接受 `InputNumber` 的 `props`。
   * @en Whether to display the input box. If `onlyMarkValue` is `true`, the input box will always be hidden. Accepts `props` for `InputNumber`.
   * @version `InputNumberProps` in `2.32.0`
   */
  showInput?: boolean | InputNumberProps | InputNumberProps[];
  /**
   * @zh 设置 `tooltip` 所插入的父元素
   * @en The parent node which the `tooltip` will be rendered to
   */
  getTooltipContainer?: () => Element;
  /**
   * @zh 格式化 `tooltip` 内容
   * @en Format the content of `tooltip`
   */
  formatTooltip?: (value: number) => string | ReactNode;
  /**
   * @zh 反向坐标轴
   * @en Reverse axis
   */
  reverse?: boolean;
  /**
   * @zh 触发时机在 `mouseup`，参数是当前值
   * @en Callback when `onmouseup` is fired
   * @version 2.20.0
   */
  onAfterChange?: (val: number | number[]) => void;
  /**
   * @zh 选择值变化时触发
   * @en Callback when the user changed the slider's value
   */
  onChange?: (val: number | number[]) => void;
}
