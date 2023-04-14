import { ReactNode, CSSProperties } from 'react';
import { Dayjs } from 'dayjs';

/**
 * @title Statistic
 */
export interface StatisticProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 数值的样式
   * @en The css style of statistic's value
   */
  styleValue?: CSSProperties;
  /**
   * @zh 数值小数部分的样式
   * @en The style of the decimal part of the value
   * @version 2.47.0
   */
  styleDecimal?: CSSProperties;
  /**
   * @zh 数值的标题
   * @en The title
   */
  title?: string | ReactNode;
  /**
   * @zh 数值
   * @en Display value
   */
  value?: string | number | Dayjs;
  /**
   * @zh 数字精度
   * @en The precision of the value
   */
  precision?: number;
  /**
   * @zh 显示千位分割符
   * @en Whether to display thousands separator
   */
  groupSeparator?: boolean;
  /**
   * @zh 前缀
   * @en The prefix element
   */
  prefix?: string | ReactNode;
  /**
   * @zh 后缀
   * @en The suffix element
   */
  suffix?: string | ReactNode;
  /**
   * @zh 在数值下展示额外内容
   * @en he extra content to be rendered under the value
   */
  extra?: ReactNode;
  /**
   * @zh 数字动态变大
   * @en Whether the value becomes larger dynamically
   */
  countUp?: boolean;
  /**
   * @zh 从什么数字开始动态变大
   * @en The number that the value starts to increase dynamically
   * @defaultValue 0
   */
  countFrom?: number;
  /**
   * @zh 动态变大的过渡时间 (ms)
   * @en Dynamic time (ms)
   * @defaultValue 2000
   */
  countDuration?: number;
  /**
   * @zh [dayjs](https://github.com/iamkun/dayjs)'s format
   * @en [dayjs](https://github.com/iamkun/dayjs)'s format
   */
  format?: string;
  /**
   * @zh 自定义 render 函数。`formattedValue` 表示格式化后的值。
   * @en Custom render function. `formattedValue` represents the formatted value.
   * @version 2.36.0
   */
  renderFormat?: (value: StatisticProps['value'], formattedValue: string) => ReactNode;
  /**
   * @zh 数字是否加载中
   * @en Is the number loading
   * @version 2.20.0
   */
  loading?: boolean;
}

/**
 * @title Statistic.Countdown
 */
export interface CountdownProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 数值的样式
   * @en The css style of statistic's value
   */
  styleValue?: CSSProperties;
  /**
   * @zh 数值的标题
   * @en The title element
   */
  title?: string | ReactNode;
  /**
   * @zh 倒计时的时间
   * @en To set value
   */
  value?: number | string | Date | Dayjs;
  /**
   * @zh [dayjs](https://github.com/iamkun/dayjs)'s format
   * @en [dayjs](https://github.com/iamkun/dayjs)'s format
   * @defaultValue HH:mm:ss
   */
  format?: string;
  /**
   * @zh 自定义 render 函数。`valueDiff` 表示两个时间的时间差，`formattedDiff` 表示格式化后的时间差，
   * @en Custom render function, the input parameter is the result formatted by `dayjs`
   * @version 2.36.0
   */
  renderFormat?: (valueDiff: number, formattedDiff: string) => ReactNode;
  /**
   * @zh 倒计时完成后触发的回调
   * @en Callback at the end of the countdown
   */
  onFinish?: () => void;
  /**
   * @zh 是否开始倒计时，默认为 `true`，可以通过设置该值控制倒计时的时机
   * @en Whether to start the countdown
   * @defaultValue true
   */
  start?: boolean;
  /**
   * @zh 用于修正初始化时间显示不正确
   * @en The current time. Used to correct the initialization time
   */
  now?: number | string | Date | Dayjs;
}
