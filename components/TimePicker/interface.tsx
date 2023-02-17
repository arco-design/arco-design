import { Dayjs } from 'dayjs';
import { CSSProperties, ReactNode } from 'react';
import { TriggerProps } from '../Trigger/index';

export type CalendarValue = Dayjs | Date | string | number;

/**
 * @title Picker
 * @zh `TimePicker` 和 `RangePicker` 的通用属性
 * @en Common properties of `TimePicker` and `RangePicker`
 */
export interface PickerProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean;
  /**
   * @zh 是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)
   * @en Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)
   * @deprecated
   */
  error?: boolean;
  /**
   * @zh 状态
   * @en Status
   * @version 2.45.0
   */
  status?: 'error' | 'warning';
  /**
   * @zh 前缀
   * @en prefix
   * @version 2.43.0
   */
  prefix?: ReactNode;
  /**
   * @zh 允许清除
   * @en Whether to show clear button
   * @defaultValue true
   */
  allowClear?: boolean;
  /**
   * @zh 禁用确认步骤，开启后直接点选时间不需要点击确认按钮。
   * @en Disable the confirm step, click to select time directly without click the confirm button.
   * @version 2.12.0
   */
  disableConfirm?: boolean;
  /**
   * @zh 弹出的框的位置
   * @en The position of the popup box
   * @defaultValue bl
   */
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
  /**
   * @zh 弹出框挂载的父节点
   * @en The parent node of the popup
   */
  getPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 提示文案
   * @en The placeholder of input box
   */
  placeholder?: string | string[];
  /**
   * @zh 展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)
   * @en Date format, refer to [dayjs](https://github.com/iamkun/dayjs)
   * @defaultValue HH:mm:ss
   */
  format?: string;
  /**
   * @zh 12 小时制
   * @en Display as 12 hours format, with default format h:mm:ss a
   */
  use12Hours?: boolean;
  /**
   * @zh 点击清除按钮的回调
   * @en Callback when click the clear button
   */
  onClear?: () => void;
  /**
   * @zh 控制弹出框打开或者关闭
   * @en Whether the popup is visible or not
   */
  popupVisible?: boolean;
  /**
   * @zh 触发元素。
   * @en Trigger element.
   * @version 2.38.0
   */
  triggerElement?: ReactNode;
  /**
   * @zh 可以传入 `Trigger` 组件的参数
   * @en The props of the `Trigger` component
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 设置 时 / 分 / 秒 的选择间隔
   * @en Set the hour/minute/second selection interval.
   */
  step?: { hour?: number; minute?: number; second?: number };
  /**
   * @zh 禁用的部分小时选项
   * @en To specify the hours that cannot be selected
   */
  disabledHours?: () => number[];
  /**
   * @zh 禁用的部分分钟选项
   * @en To specify the minutes that cannot be selected
   */
  disabledMinutes?: (selectedHour) => number[];
  /**
   * @zh 禁用的部分秒数选项
   * @en To specify the seconds that cannot be selected
   */
  disabledSeconds?: (selectedHour, selectedMinute) => number[];
  /**
   * @zh 隐藏禁止选择的选项
   * @en Hide the disabled options
   */
  hideDisabledOptions?: boolean;
  /**
   * @zh 输入框尺寸
   * @en Input box size
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 时间列在滚动的时候自动吸附和选中
   * @en The time column is automatically adsorbed and selected when scrolling
   * @defaultValue true
   * @version 2.23.0
   */
  scrollSticky?: boolean;
  /**
   * @zh 是否可手动输入
   * @en Whether input box can be entered
   * @defaultValue true
   */
  editable?: boolean;
  /**
   * @zh 用于配置图标
   * @en Used to configure icons
   */
  icons?: { inputSuffix?: ReactNode };
  /**
   * @zh 底部附加内容
   * @en Additional content at the bottom
   */
  extra?: ReactNode;
  /**
   * @zh 是否在关闭后销毁 dom 结构
   * @en Whether to destroy popup when hidden
   */
  unmountOnExit?: boolean;
  /**
   * @zh 设置时区偏移，如果需要 utc 时间则设置为 0。
   * @en Set the timezone offset, set to 0 if utc time is required.
   */
  utcOffset?: number;
  /**
   * @zh 设置时区, 如果设置了 `utcOffset`，则以 `utcOffset` 为准。
   * @en timezone name, if `utcOffset` is set, `utcOffset` takes effect.
   */
  timezone?: string;
}

/**
 * @title TimePicker
 */
export type BaseTimePickerProps = {
  /**
   * @zh 组件值发生改变时的回调
   * @en Callback when select time
   */
  onSelect?: (valueString: string, value: Dayjs) => void;
  /**
   * @zh 选择时间时的回调
   * @en Callback when selected value changes
   */
  onChange?: (valueString: string, value: Dayjs) => void;
  /**
   * @zh 默认时间
   * @en To set default time
   */
  defaultValue?: CalendarValue;
  /**
   * @zh 组件的值，受控模式
   * @en To set time
   */
  value?: CalendarValue;
  /**
   * @zh 是否显示选择当前时间的按钮
   * @en Whether to show the button to select current time
   * @defaultValue true
   * @version 2.21.0
   */
  showNowBtn?: boolean;
};

export type TimePickerProps = BaseTimePickerProps & PickerProps;

/**
 * @title TimePicker.RangePicker
 */
export type BaseRangePickerProps = {
  /**
   * @zh 日历组件值发生改变时的回调
   * @en Callback when the selected value changes
   */
  onChange?: (valueString: string[], value: Dayjs[]) => void;
  /**
   * @zh 选择日期时的回调
   * @en Callback when select time
   */
  onSelect?: (valueString: string[], value: Dayjs[]) => void;
  /**
   * @zh 默认时间
   * @en To set default time
   */
  defaultValue?: CalendarValue[];
  /**
   * @zh 日历组件的值
   * @en To set time
   */
  value?: CalendarValue[];
  /**
   * @zh 提示文案
   * @en The placeholder of input box
   */
  placeholder?: string[];
  /**
   * @zh 起止时间是否自动排序
   * @en Whether the start and end times are automatically sorted
   * @defaultValue true
   * @version 2.21.0
   */
  order?: boolean;
};

export type RangePickerProps = BaseRangePickerProps & PickerProps;

export interface TimePickerDecorator extends React.ComponentClass<TimePickerProps> {
  RangePicker: React.ComponentClass<RangePickerProps>;
}
