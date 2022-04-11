import { Dayjs } from 'dayjs';
import { CSSProperties, ReactNode } from 'react';
import { TimePickerProps } from '../TimePicker/interface';
import { TriggerProps } from '../Trigger/index';
import { Omit } from '../_util/type';

export type CalendarValue = number | string | Date | Dayjs;

export type ShortcutType = {
  text: ReactNode;
  value: () => Dayjs | Dayjs[];
} & Record<string, any>;

export type IconsType = {
  prev?: ReactNode;
  prevDouble?: ReactNode;
  next?: ReactNode;
  nextDouble?: ReactNode;
  inputSuffix?: ReactNode;
};

export type DisabledTimeProps = {
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
};

export type DisabledRangeTimeFunc = (current: Dayjs, type: 'start' | 'end') => DisabledTimeProps;
export type DisabledTimeFunc = (current?: Dayjs) => DisabledTimeProps;

export type ModeType = 'date' | 'month' | 'week' | 'year' | 'quarter';

export type PrivateCType = {
  setPageShowDate?: (d: Dayjs) => void;
  getHeaderOperations?: (mode?: ModeType) => {
    onPrev?: () => void;
    onNext?: () => void;
    onSuperPrev?: () => void;
    onSuperNext?: () => void;
  };
};

/**
 * @title Picker Props
 */
export interface PickerProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否禁用
   * @en Whether to disable
   */
  disabled?: boolean | boolean[];
  /**
   * @zh 允许清除
   * @en Allow Clear
   * @defaultValue true
   */
  allowClear?: boolean;
  /**
   * @zh 每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。
   * @en The first day of the week starts on the day of the week, `0`-Sunday, `1`-Monday, and so on.
   * @defaultValue 0
   * @version 2 - 6 in `2.20.0`
   */
  dayStartOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * @zh 弹出的框的位置
   * @en The position of the popup
   */
  position?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br';
  /**
   * @zh 弹出框挂载的父节点
   * @en The parent node of the popup
   * @defaultValue bl
   */
  getPopupContainer?: (node: HTMLElement) => Element;
  /**
   * @zh 提示文案
   * @en The placeholder of date input
   */
  placeholder?: string | string[];
  /**
   * @zh 预设时间范围快捷选择
   * @en Shortcut selection of preset time range
   */
  shortcuts?: ShortcutType[];
  /**
   * @zh 预设范围选择放在面板左侧，用于大量预设时间的场景。
   * @en The preset range selection is placed on the left side of the panel for a large number of scenes with preset time.
   */
  shortcutsPlacementLeft?: boolean;
  /**
   * @zh 是否为报错状态
   * @en error style
   */
  error?: boolean;
  /**
   * @zh 是否在隐藏的时候销毁 DOM 结构
   * @en Whether to destroy popup when hidden
   */
  unmountOnExit?: boolean;
  /**
   * @zh 日期选择器的尺寸
   * @en The size of input box
   * @defaultValue true
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 指定弹框打开或者关闭状态。
   * @en Whether the popup is visible or not
   */
  popupVisible?: boolean;
  /**
   * @zh 打开或关闭时的回调
   * @en Callback when the visibility of the popup is changed
   */
  onVisibleChange?: (visible?: boolean) => void;
  /**
   * @zh 日历组件值发生改变时的回调
   * @en Callback when the selected value changes
   */
  onChange?: (dateString: string, date: Dayjs) => void;
  /**
   * @zh 选中日期发生改变但组件值未改变时的回调
   * @en Callback when the show date changes but the selected value does not change
   */
  onSelect?: (dateString: string, date: Dayjs) => void;
  /**
   * @zh 点击清除按钮后的回调
   * @en Callback when clicking the clear button
   */
  onClear?: () => void;
  /**
   * @zh 自定义日期单元格的内容。
   * @en Customize the contents of the date cell.
   */
  dateRender?: (currentDate: Dayjs) => ReactNode;
  /**
   * @zh 是否可输入。
   * @en Whether input box can be entered.
   * @defaultValue true
   */
  editable?: boolean;
  /**
   * @zh 可以传入 `Trigger` 组件的参数。
   * @en The props of the `Trigger` component.
   */
  triggerProps?: Partial<TriggerProps>;
  /**
   * @zh 点击快捷选择时的回调。
   * @en Callback when click shortcut selection.
   */
  onSelectShortcut?: (shortcut: ShortcutType) => void;
  /**
   * @zh 日历翻页的图标配置。
   * @en Icon configuration of panel.
   * @version 2.20.0
   */
  icons?: {
    prev?: ReactNode;
    prevDouble?: ReactNode;
    next?: ReactNode;
    nextDouble?: ReactNode;
    inputSuffix?: ReactNode;
  };
  /**
   * @zh
   * 国际化配置
   * @en
   * Internationalization configuration.
   */
  locale?: Record<string, any>;
  /**
   * @zh 范围选择器输入框内的分割符号
   * @en Separator symbol in the range selector input box
   */
  separator?: ReactNode;
  /**
   * @zh 不可选取的日期
   * @en Specify the date that cannot be selected
   */
  disabledDate?: (current: Dayjs) => boolean;
  /**
   * @zh 额外的页脚
   * @en Extra footer
   */
  extra?: ReactNode;
  /**
   * @zh 点击确认按钮的回调
   * @en Callback when click confirm button
   */
  onOk?: (dateString: string, date: Dayjs) => void;
  /**
   * @zh 触发元素。
   * @en Trigger element.
   * @version 2.9.0
   */
  triggerElement?: ReactNode;
  /**
   * @zh 默认面板显示的日期
   * @en Default displayed date of panel
   */
  defaultPickerValue?: CalendarValue;
  /**
   * @zh 面板显示的日期。
   * @en Displayed date of panel.
   * @version 2.9.0
   */
  pickerValue?: CalendarValue;
  /**
   * @zh 面板日期改变的回调。
   * @en Callback when date of panel changes.
   * @version 2.9.0
   */
  onPickerValueChange?: (dateString: string, value: Dayjs) => void;
  /**
   * @zh 面板隐藏不在当前时间范围的灰色日期
   * @en The panel hides gray dates that are not in the current time range
   * @version 2.20.0
   */
  hideNotInViewDates?: boolean;
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
 * @title DatePicker
 * @zh `type CalendarValue = number | string | Date | Dayjs`。
 * @en `type CalendarValue = number | string | Date | Dayjs`。
 */
export interface BaseDatePickerProps {
  /**
   * @zh 展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)
   * @en Date format, refer to [dayjs](https://github.com/iamkun/dayjs)
   * @defaultValue YYYY-MM-DD
   */
  format?: string | ((value: Dayjs) => string);
  /**
   * @zh 默认日期
   * @en To set default date
   */
  defaultValue?: CalendarValue;
  /**
   * @zh 日历组件的值
   * @en To set date
   */
  value?: CalendarValue;
  /**
   * @zh 是否增加时间选择
   * @en Whether to show time selection
   */
  showTime?: boolean | TimePickerProps;
  /**
   * @zh 时间显示的参数，参考 [TimePickerProps](/react/components/time-picker)，作用同 `showTime`。
   * @en Parameters of TimePicker, refer to [TimePickerProps](/react/components/time-picker), which has the same function as `showTime`.
   */
  timepickerProps?: TimePickerProps;
  /**
   * @zh 是否显示 `showTime` 时，选择当前时间的按钮。
   * @en When displaying `showTime`, button to select current time.
   * @defaultValue true
   */
  showNowBtn?: boolean;
  /**
   * @zh 不可选取的时间
   * @en Specify the time that cannot be selected
   */
  disabledTime?: (current?: Dayjs) => DisabledTimeProps;
}

export type DatePickerProps = BaseDatePickerProps & PickerProps;

/**
 * @title WeekPicker
 */
export interface BaseWeekPickerProps {
  /**
   * @zh 展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)
   * @en Date format, refer to [dayjs](https://github.com/iamkun/dayjs)
   * @defaultValue gggg-wo
   */
  format?: string;
  /**
   * @zh 默认日期
   * @en To set default date
   */
  defaultValue?: CalendarValue;
  /**
   * @zh 日历组件的值
   * @en To set date
   */
  value?: CalendarValue;
}

export type WeekPickerProps = BaseWeekPickerProps & PickerProps;

/**
 * @title MonthPicker
 */
export interface BaseMonthPickerProps {
  /**
   * @zh 展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)
   * @en Date format, refer to [dayjs](https://github.com/iamkun/dayjs)
   * @defaultValue YYYY-MM
   */
  format?: string;
  /**
   * @zh 默认日期
   * @en To set default date
   */
  defaultValue?: CalendarValue;
  /**
   * @zh 日历组件的值
   * @en To set date
   */
  value?: CalendarValue;
}

export type MonthPickerProps = BaseMonthPickerProps & PickerProps;

/**
 * @title YearPicker
 */
export interface BaseYearPickerProps {
  /**
   * @zh 展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)
   * @en Date format, refer to [dayjs](https://github.com/iamkun/dayjs)
   * @defaultValue YYYY
   */
  format?: string;
  /**
   * @zh 默认日期
   * @en To set default date
   */
  defaultValue?: CalendarValue;
  /**
   * @zh 日历组件的值
   * @en To set date
   */
  value?: CalendarValue;
}

export type YearPickerProps = BaseYearPickerProps & PickerProps;

/**
 * @title QuarterPicker
 */
export interface BaseQuarterPickerProps {
  /**
   * @zh 展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)
   * @en Date format, refer to [dayjs](https://github.com/iamkun/dayjs)
   * @defaultValue YYYY-[Q]Q
   */
  format?: string;
  /**
   * @zh 默认日期
   * @en To set default date
   */
  defaultValue?: CalendarValue;
  /**
   * @zh 日历组件的值
   * @en To set date
   */
  value?: CalendarValue;
}

export type QuarterPickerProps = BaseQuarterPickerProps & PickerProps;

export type TimePickerRangeProps = Omit<TimePickerProps, 'defaultValue'> & {
  defaultValue?: CalendarValue[];
};

/**
 * @title RangePicker
 */
export interface BaseRangePickerProps {
  /**
   * @zh 是否禁用
   * @en Whether to disable input box
   */
  disabled?: boolean | boolean[];
  /**
   * @zh 展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)
   * @en Date format, refer to [dayjs](https://github.com/iamkun/dayjs)
   * @defaultValue YYYY-MM-DD
   */
  format?: string;
  /**
   * @zh 日历组件值发生改变时的回调
   * @en Callback when the selected value changes
   */
  onChange?: (dateString: string[], date: Dayjs[]) => void;
  /**
   * @zh 选中日期发生改变但组件值未改变时的回调
   * @en Callback when the show value changes but the selected value does not change
   * @version `extra` in `2.23.0`
   */
  onSelect?: (dateString: string[], value: Dayjs[], extra: { type: 'start' | 'end' }) => void;
  /**
   * @zh 默认日期
   * @en To set default date
   */
  defaultValue?: CalendarValue[];
  /**
   * @zh 日历组件的值
   * @en To set date
   */
  value?: CalendarValue[];
  /**
   * @zh 范围选择器的类型，可以是日期、月份。
   * @en The type of RangePicker
   * @defaultValue date
   */
  mode?: 'date' | 'month' | 'week' | 'year' | 'quarter';
  /**
   * @zh 是否增加时间选择，如果传入的是个对象，会把参数传给内置的 TimePicker。
   * @en Whether to show time selection, if an object is passed in, the parameters will be passed to the built-in TimePicker.
   */
  showTime?: boolean | TimePickerRangeProps;
  /**
   * @zh 提示文案
   * @en The placeholder of input
   */
  placeholder?: string[];
  /**
   * @zh 时间显示的参数，参考 [TimePickerProps](/react/components/time-picker)，作用同 `showTime`。
   * @en Parameters of TimePicker, refer to [TimePickerProps](/react/components/time-picker), which has the same function as `showTime`.
   */
  timepickerProps?: TimePickerProps;
  /**
   * @zh 点击确认按钮的回调
   * @en Callback when click confirm button
   */
  onOk?: (dateString: string[], date: Dayjs[]) => void;
  /**
   * @zh 不可选取的时间
   * @en Specify the time that cannot be selected
   */
  disabledTime?: (current: Dayjs, type: 'start' | 'end') => DisabledTimeProps;
  /**
   * @zh 触发元素。
   * @en Trigger element.
   * @version 2.9.0
   */
  triggerElement?: ReactNode;
  /**
   * @zh 默认面板显示的日期
   * @en Default displayed date of panel.
   */
  defaultPickerValue?: CalendarValue[];
  /**
   * @zh 面板显示的日期。
   * @en Displayed date of panel.
   * @version 2.9.0
   */
  pickerValue?: CalendarValue[];
  /**
   * @zh 面板日期改变的回调。
   * @en Callback when date of panel changes.
   * @version 2.9.0
   */
  onPickerValueChange?: (dateString: string[], value: Dayjs[]) => void;
  /**
   * @zh 当重新选择范围的时候，会清空之前的范围重新进行选择
   * @en When reselect the range, the previous range will be cleared for next selection
   * @version 2.23.0
   */
  clearRangeOnReselect?: boolean;
}

export type RangePickerProps = BaseRangePickerProps &
  Omit<
    PickerProps,
    'onChange' | 'onSelect' | 'onOk' | 'defaultPickerValue' | 'pickerValue' | 'onPickerValueChange'
  >;

export interface ShortcutsProps {
  prefixCls?: string;
  shortcuts?: ShortcutType[];
  onSelectShortcut?: (shortcut: ShortcutType, e) => void;
  onMouseEnterShortcut?: (e) => void;
  onMouseLeaveShortcut?: (e) => void;
  showNowBtn?: boolean;
  onSelectNow?: () => void;
  nowText?: ReactNode;
  showTime?: boolean | TimePickerProps;
}

export interface DatePickerDecorator extends React.ComponentClass<DatePickerProps> {
  MonthPicker: React.ComponentClass<MonthPickerProps>;
  YearPicker: React.ComponentClass<YearPickerProps>;
  WeekPicker: React.ComponentClass<WeekPickerProps>;
  QuarterPicker: React.ComponentClass<QuarterPickerProps>;
  RangePicker: React.ComponentClass<RangePickerProps>;
}
