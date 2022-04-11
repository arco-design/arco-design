import { ReactNode, CSSProperties } from 'react';
import { Dayjs } from 'dayjs';

export type CalendarValue = Dayjs | Date | string | number;

/**
 * @title Calendar
 */
export interface CalendarProps {
  style?: CSSProperties;
  className?: string | string[];
  /**
   * @zh 是否允许选中和切换日期，`panel` 模式下默认可选中切换
   * @en Whether to allow the selection and switching of the date. It's enabled by default in `panel` mode
   */
  allowSelect?: boolean;
  /**
   * @zh 是否放在容器中进行展示。
   * @en Whether to be displayed in a container.
   */
  panel?: boolean;
  /**
   * @zh 卡片模式的宽度
   * @en The width of the calendar in card mode
   * @defaultValue 265
   */
  panelWidth?: number | string;
  /**
   * @zh 是否显示跳转到今天的按钮
   * @en Whether to display the button to jump to today
   */
  panelTodayBtn?: boolean;
  /**
   * @zh 卡片模式下配置操作按钮
   * @en Operation buttons configuration in card mode
   */
  panelOperations?: Array<'left' | 'double-left' | 'right' | 'double-right'>;
  /**
   * @zh 周选择
   * @en Select Week date
   */
  isWeek?: boolean;
  /**
   * @zh 每周的第一天开始于周几，0 - 周日，1 - 周一。
   * @en The first day of the week starts on the day of the week, `0`-Sunday, `1`-Monday.
   * @defaultValue 0
   */
  dayStartOfWeek?: 0 | 1;
  defaultValue?: CalendarValue;
  value?: CalendarValue;
  defaultPageShowDate?: CalendarValue;
  pageShowDate?: CalendarValue;
  /**
   * @zh 选择日期的月日历和选择月份的年日历。
   * @en The default display mode of the calendar
   * @defaultValue month
   */
  defaultMode?: 'day' | 'week' | 'month' | 'year';
  /**
   * @zh 选择日期的月日历和选择月份的年日历，受控模式。
   * @en The display mode of the calendar
   */
  mode?: 'day' | 'week' | 'month' | 'year';
  modes?: ('day' | 'week' | 'month' | 'year')[];
  /**
   * @zh 不可选取的时间
   * @en Function that specifies the dates that cannot be selected
   */
  disabledDate?: (current: Dayjs) => boolean;
  /**
   * @zh 日期变化触发的回调。
   * @en Callback when date change.
   */
  onChange?: (date: Dayjs) => void;
  /**
   * @zh 面板日期发生改变触发的回调。
   * @en Callback when the panel date changes.
   */
  onPanelChange?: (date: Dayjs) => void;
  /** 
   * @zh 定制日期显示，会完全覆盖日期单元格。
   * @en Customize the date display, which will completely cover the date cell.
   */
  dateRender?: (currentDate: Dayjs) => ReactNode;
  /**
   * @zh 定制月份显示，会完全覆盖月份单元格。
   * @en Customize the month display, which will completely cover the month cell.
   */
  monthRender?: (currentDate: Dayjs) => ReactNode;
  /**
   * @zh 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
   * @en Customize the date cell, the content will be added to the cell, and it will only work in the full-screen calendar mode.
   */
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  /**
   * @zh 自定义头部渲染。
   * @en Custom header renderer.
   */
  headerRender?: (props: {
    value?: Dayjs;
    pageShowDate?: Dayjs;
    mode?: string;
    onChange;
    onChangePageDate;
    onChangeMode;
  }) => ReactNode;
  /**
   * @zh
   * 国际化配置
   * @en
   * Internationalization configuration.
   */
  locale?: Record<string, any>;
  /**
   * @zh 有两种头部可供选择，默认的按钮类型和下拉框类型，只在全屏日历模式下生效。
   * @en There are two types of headers to choose from. Only work in full-screen calendar mode.
   * @defaultValue button
   */
  headerType?: 'button' | 'select';
  rangeValues?: Dayjs[];
  hoverRangeValues?: Dayjs[];
  onMouseEnterCell?: (time: Dayjs, disabled: boolean) => void;
  onMouseLeaveCell?: (time: Dayjs, disabled: boolean) => void;
}
