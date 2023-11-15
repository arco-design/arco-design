`````
组件 / 数据输入

# 日期选择器 DatePicker

选择日期。支持年、月、周、日类型，支持范围选择等。
`````

%%Content%%

## API

**Picker 为所有组件共有的属性**

### Picker Props

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|allowClear|允许清除|boolean |`true`|-|
|editable|是否可输入。|boolean |`true`|-|
|error|是否是错误状态。(废弃，下个大版本移除，使用 status='error' 替代)|boolean |`-`|-|
|hideNotInViewDates|面板隐藏不在当前时间范围的灰色日期|boolean |`-`|2.20.0|
|popupVisible|指定弹框打开或者关闭状态。|boolean |`-`|-|
|shortcutsPlacementLeft|预设范围选择放在面板左侧，用于大量预设时间的场景。|boolean |`-`|-|
|unmountOnExit|是否在隐藏的时候销毁 DOM 结构|boolean |`-`|-|
|utcOffset|设置时区偏移，如果需要 utc 时间则设置为 0。|number |`-`|-|
|timezone|设置时区, 如果设置了 `utcOffset`，则以 `utcOffset` 为准。|string |`-`|-|
|position|弹出的框的位置|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`-`|-|
|size|日期选择器的尺寸|'mini' \| 'small' \| 'default' \| 'large' |`default`|-|
|status|状态|'error' \| 'warning' |`-`|2.45.0|
|extra|额外的页脚|ReactNode |`-`|-|
|prefix|前缀|ReactNode |`-`|2.43.0|
|separator|范围选择器输入框内的分割符号|ReactNode |`-`|-|
|triggerElement|触发元素。|ReactNode |`-`|2.9.0|
|className|节点类名|string \| string[] |`-`|-|
|dayStartOfWeek|每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。|0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 |`-`|2 - 6 in `2.20.0`|
|defaultPickerValue|默认面板显示的日期|[CalendarValue](#calendarvalue) |`-`|-|
|disabled|是否禁用|boolean \| boolean[] |`-`|-|
|icons|日历翻页的图标配置。|{prev?: ReactNode;prevDouble?: ReactNode;next?: ReactNode;nextDouble?: ReactNode;inputSuffix?: ReactNode;} |`-`|2.20.0|
|locale|国际化配置|Record&lt;string, any&gt; |`-`|-|
|pickerValue|面板显示的日期。|[CalendarValue](#calendarvalue) |`-`|2.9.0|
|placeholder|提示文案|string \| string[] |`-`|-|
|shortcuts|预设时间范围快捷选择|[ShortcutType](#shortcuttype)[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以传入 `Trigger` 组件的参数。|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|dateRender|自定义日期单元格的内容。|(currentDate: Dayjs) => ReactNode |`-`|-|
|disabledDate|不可选取的日期|(current: Dayjs) => boolean |`-`|-|
|getPopupContainer|弹出框挂载的父节点|(node: HTMLElement) => Element |`bl`|-|
|onChange|日历组件值发生改变时的回调|(dateString: string, date: Dayjs) => void |`-`|-|
|onClear|点击清除按钮后的回调|() => void |`-`|-|
|onOk|点击确认按钮的回调|(dateString: string, date: Dayjs) => void |`-`|-|
|onPickerValueChange|面板日期改变的回调。|(dateString: string, value: Dayjs) => void |`-`|2.9.0|
|onSelect|选中日期发生改变但组件值未改变时的回调|(dateString: string, date: Dayjs) => void |`-`|-|
|onSelectShortcut|点击快捷选择时的回调。|(shortcut: [ShortcutType](#shortcuttype)) => void |`-`|-|
|onVisibleChange|打开或关闭时的回调|(visible?: boolean) => void |`-`|-|
|panelRender|自定义渲染面板|(panelNode: ReactNode) => ReactNode |`-`|2.34.0|

### DatePicker

`type CalendarValue = number | string | Date | Dayjs`。

|参数名|描述|类型|默认值|
|---|---|---|---|
|showNowBtn|是否显示 `showTime` 时，选择当前时间的按钮。|boolean |`true`|
|defaultValue|默认日期|[CalendarValue](#calendarvalue) |`-`|
|showTime|是否增加时间选择|boolean \| [TimePickerProps](#timepickerprops) |`-`|
|timepickerProps|时间显示的参数，参考 [TimePickerProps](/react/components/time-picker)，作用同 `showTime`。|[TimePickerProps](#timepickerprops) |`-`|
|value|日历组件的值|[CalendarValue](#calendarvalue) |`-`|
|disabledTime|不可选取的时间|(current?: Dayjs) => [DisabledTimeProps](#disabledtimeprops) |`-`|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)。使用 `string` 时，可以手动键入和编辑日期。使用 `(value: Dayjs) => string` 时，只能在 Picker 中选取日期。|string \| ((value: Dayjs) => string) |`YYYY-MM-DD`|

### WeekPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|string |`gggg-wo`|
|defaultValue|默认日期|[CalendarValue](#calendarvalue) |`-`|
|value|日历组件的值|[CalendarValue](#calendarvalue) |`-`|

### MonthPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|string |`YYYY-MM`|
|defaultValue|默认日期|[CalendarValue](#calendarvalue) |`-`|
|value|日历组件的值|[CalendarValue](#calendarvalue) |`-`|

### YearPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|string |`YYYY`|
|defaultValue|默认日期|[CalendarValue](#calendarvalue) |`-`|
|value|日历组件的值|[CalendarValue](#calendarvalue) |`-`|

### QuarterPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|string |`YYYY-[Q]Q`|
|defaultValue|默认日期|[CalendarValue](#calendarvalue) |`-`|
|value|日历组件的值|[CalendarValue](#calendarvalue) |`-`|

### RangePicker

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|clearRangeOnReselect|当重新选择范围的时候，会清空之前的范围重新进行选择|boolean |`-`|2.23.0|
|disabledTime|不可选取的时间|(current: Dayjs, type: 'start' \| 'end') => [DisabledTimeProps](#disabledtimeprops) |`-`|-|
|mode|范围选择器的类型，可以是日期、月份。|'date' \| 'month' \| 'week' \| 'year' \| 'quarter' |`date`|-|
|onSelect|选中日期发生改变但组件值未改变时的回调|(dateString: string[], value: Dayjs[], extra: { type: 'start' \| 'end' }) => void |`-`|`extra` in `2.23.0`|
|triggerElement|触发元素。|ReactNode |`-`|2.9.0|
|defaultPickerValue|默认面板显示的日期|[CalendarValue](#calendarvalue)[] |`-`|-|
|defaultValue|默认日期|[CalendarValue](#calendarvalue)[] |`-`|-|
|disabled|是否禁用|boolean \| boolean[] |`-`|-|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|string \| string[] |`YYYY-MM-DD`|string[] in 2.55.0|
|pickerValue|面板显示的日期。|[CalendarValue](#calendarvalue)[] |`-`|2.9.0|
|placeholder|提示文案|string[] |`-`|-|
|showTime|是否增加时间选择，如果传入的是个对象，会把参数传给内置的 TimePicker。|boolean \| [TimePickerRangeProps](#timepickerrangeprops) |`-`|-|
|timepickerProps|时间显示的参数，参考 [TimePickerProps](/react/components/time-picker)，作用同 `showTime`。|[TimePickerProps](#timepickerprops) |`-`|-|
|value|日历组件的值|[CalendarValue](#calendarvalue)[] |`-`|-|
|onChange|日历组件值发生改变时的回调|(dateString: string[], date: Dayjs[]) => void |`-`|-|
|onOk|点击确认按钮的回调|(dateString: string[], date: Dayjs[]) => void |`-`|-|
|onPickerValueChange|面板日期改变的回调。|(dateString: string[], value: Dayjs[]) => void |`-`|2.9.0|

### ShortcutType

```js
export type ShortcutType = {
  text: ReactNode;
  value: () => Dayjs | Dayjs[];
} & Record<string, any>;
```

### CalendarValue

```js
export type CalendarValue = number | string | Date | Dayjs;
```

### TimePickerProps

```js
export type TimePickerProps = BaseTimePickerProps & PickerProps;
```

### DisabledTimeProps

```js
export type DisabledTimeProps = {
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
};
```

### TimePickerRangeProps

```js
export type TimePickerRangeProps = Omit<TimePickerProps, "defaultValue"> & {
  defaultValue?: CalendarValue[];
};
```
