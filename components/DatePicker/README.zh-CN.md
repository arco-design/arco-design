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
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|disabled|是否禁用|`boolean \| boolean[]`|`-`|-|
|allowClear|允许清除|`boolean`|`true`|-|
|dayStartOfWeek|每周的第一天开始于周几，0 - 周日，1 - 周一，以此类推。|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2 - 6 in `2.20.0`|
|position|弹出的框的位置|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`-`|-|
|getPopupContainer|弹出框挂载的父节点|`(node: HTMLElement) => Element`|`bl`|-|
|placeholder|提示文案|`string \| string[]`|`-`|-|
|shortcuts|预设时间范围快捷选择|`ShortcutType[]`|`-`|-|
|shortcutsPlacementLeft|预设范围选择放在面板左侧，用于大量预设时间的场景。|`boolean`|`-`|-|
|error|是否为报错状态|`boolean`|`-`|-|
|unmountOnExit|是否在隐藏的时候销毁 DOM 结构|`boolean`|`-`|-|
|size|日期选择器的尺寸|`'mini' \| 'small' \| 'default' \| 'large'`|`true`|-|
|popupVisible|指定弹框打开或者关闭状态。|`boolean`|`-`|-|
|onVisibleChange|打开或关闭时的回调|`(visible?: boolean) => void`|`-`|-|
|onChange|日历组件值发生改变时的回调|`(dateString: string, date: Dayjs) => void`|`-`|-|
|onSelect|选中日期发生改变但组件值未改变时的回调|`(dateString: string, date: Dayjs) => void`|`-`|-|
|onClear|点击清除按钮后的回调|`() => void`|`-`|-|
|dateRender|自定义日期单元格的内容。|`(currentDate: Dayjs) => ReactNode`|`-`|-|
|editable|是否可输入。|`boolean`|`true`|-|
|triggerProps|可以传入 `Trigger` 组件的参数。|`Partial<TriggerProps>`|`-`|-|
|onSelectShortcut|点击快捷选择时的回调。|`(shortcut: ShortcutType) => void`|`-`|-|
|icons|日历翻页的图标配置。|`{prev?: ReactNode;prevDouble?: ReactNode;next?: ReactNode;nextDouble?: ReactNode;inputSuffix?: ReactNode;}`|`-`|2.20.0|
|locale|国际化配置|`Record<string, any>`|`-`|-|
|separator|范围选择器输入框内的分割符号|`ReactNode`|`-`|-|
|disabledDate|不可选取的日期|`(current: Dayjs) => boolean`|`-`|-|
|extra|额外的页脚|`ReactNode`|`-`|-|
|onOk|点击确认按钮的回调|`(dateString: string, date: Dayjs) => void`|`-`|-|
|triggerElement|触发元素。|`ReactNode`|`-`|2.9.0|
|defaultPickerValue|默认面板显示的日期|`CalendarValue`|`-`|-|
|pickerValue|面板显示的日期。|`CalendarValue`|`-`|2.9.0|
|onPickerValueChange|面板日期改变的回调。|`(dateString: string, value: Dayjs) => void`|`-`|2.9.0|
|hideNotInViewDates|面板隐藏不在当前时间范围的灰色日期|`boolean`|`-`|2.20.0|
|utcOffset|设置时区偏移，如果需要 utc 时间则设置为 0。|`number`|`-`|-|
|timezone|设置时区, 如果设置了 `utcOffset`，则以 `utcOffset` 为准。|`string`|`-`|-|

### DatePicker

`type CalendarValue = number | string | Date | Dayjs`。

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|`string \| ((value: Dayjs) => string)`|`YYYY-MM-DD`|
|defaultValue|默认日期|`CalendarValue`|`-`|
|value|日历组件的值|`CalendarValue`|`-`|
|showTime|是否增加时间选择|`boolean \| TimePickerProps`|`-`|
|timepickerProps|时间显示的参数，参考 [TimePickerProps](/react/components/time-picker)，作用同 `showTime`。|`TimePickerProps`|`-`|
|showNowBtn|是否显示 `showTime` 时，选择当前时间的按钮。|`boolean`|`true`|
|disabledTime|不可选取的时间|`(current?: Dayjs) => DisabledTimeProps`|`-`|

### WeekPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|`string`|`gggg-wo`|
|defaultValue|默认日期|`CalendarValue`|`-`|
|value|日历组件的值|`CalendarValue`|`-`|

### MonthPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|`string`|`YYYY-MM`|
|defaultValue|默认日期|`CalendarValue`|`-`|
|value|日历组件的值|`CalendarValue`|`-`|

### YearPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|`string`|`YYYY`|
|defaultValue|默认日期|`CalendarValue`|`-`|
|value|日历组件的值|`CalendarValue`|`-`|

### QuarterPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|`string`|`YYYY-[Q]Q`|
|defaultValue|默认日期|`CalendarValue`|`-`|
|value|日历组件的值|`CalendarValue`|`-`|

### RangePicker

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|是否禁用|`boolean \| boolean[]`|`-`|-|
|format|展示日期的格式，参考[dayjs](https://github.com/iamkun/dayjs)|`string`|`YYYY-MM-DD`|-|
|onChange|日历组件值发生改变时的回调|`(dateString: string[], date: Dayjs[]) => void`|`-`|-|
|onSelect|选中日期发生改变但组件值未改变时的回调|`(dateString: string[], value: Dayjs[], extra: { type: 'start' \| 'end' }) => void`|`-`|`extra` in `2.23.0`|
|defaultValue|默认日期|`CalendarValue[]`|`-`|-|
|value|日历组件的值|`CalendarValue[]`|`-`|-|
|mode|范围选择器的类型，可以是日期、月份。|`'date' \| 'month' \| 'week' \| 'year' \| 'quarter'`|`date`|-|
|showTime|是否增加时间选择，如果传入的是个对象，会把参数传给内置的 TimePicker。|`boolean \| TimePickerRangeProps`|`-`|-|
|placeholder|提示文案|`string[]`|`-`|-|
|timepickerProps|时间显示的参数，参考 [TimePickerProps](/react/components/time-picker)，作用同 `showTime`。|`TimePickerProps`|`-`|-|
|onOk|点击确认按钮的回调|`(dateString: string[], date: Dayjs[]) => void`|`-`|-|
|disabledTime|不可选取的时间|`(current: Dayjs, type: 'start' \| 'end') => DisabledTimeProps`|`-`|-|
|triggerElement|触发元素。|`ReactNode`|`-`|2.9.0|
|defaultPickerValue|默认面板显示的日期|`CalendarValue[]`|`-`|-|
|pickerValue|面板显示的日期。|`CalendarValue[]`|`-`|2.9.0|
|onPickerValueChange|面板日期改变的回调。|`(dateString: string[], value: Dayjs[]) => void`|`-`|2.9.0|
|clearRangeOnReselect|当重新选择范围的时候，会清空之前的范围重新进行选择|`boolean`|`-`|2.23.0|

```js
type DisabledTimeProps = {
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
};
```
