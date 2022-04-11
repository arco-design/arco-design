`````
Component / Data Entry

# DatePicker

Choose a date. Support year, month, week, day type, support range selection, etc.
`````

%%Content%%

## API

**picker are shared by all types**

### Picker Props

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|disabled|Whether to disable|`boolean \| boolean[]`|`-`|-|
|allowClear|Allow Clear|`boolean`|`true`|-|
|dayStartOfWeek|The first day of the week starts on the day of the week, `0`-Sunday, `1`-Monday, and so on.|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|`0`|2 - 6 in `2.20.0`|
|position|The position of the popup|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`-`|-|
|getPopupContainer|The parent node of the popup|`(node: HTMLElement) => Element`|`bl`|-|
|placeholder|The placeholder of date input|`string \| string[]`|`-`|-|
|shortcuts|Shortcut selection of preset time range|`ShortcutType[]`|`-`|-|
|shortcutsPlacementLeft|The preset range selection is placed on the left side of the panel for a large number of scenes with preset time.|`boolean`|`-`|-|
|error|error style|`boolean`|`-`|-|
|unmountOnExit|Whether to destroy popup when hidden|`boolean`|`-`|-|
|size|The size of input box|`'mini' \| 'small' \| 'default' \| 'large'`|`true`|-|
|popupVisible|Whether the popup is visible or not|`boolean`|`-`|-|
|onVisibleChange|Callback when the visibility of the popup is changed|`(visible?: boolean) => void`|`-`|-|
|onChange|Callback when the selected value changes|`(dateString: string, date: Dayjs) => void`|`-`|-|
|onSelect|Callback when the show date changes but the selected value does not change|`(dateString: string, date: Dayjs) => void`|`-`|-|
|onClear|Callback when clicking the clear button|`() => void`|`-`|-|
|dateRender|Customize the contents of the date cell.|`(currentDate: Dayjs) => ReactNode`|`-`|-|
|editable|Whether input box can be entered.|`boolean`|`true`|-|
|triggerProps|The props of the `Trigger` component.|`Partial<TriggerProps>`|`-`|-|
|onSelectShortcut|Callback when click shortcut selection.|`(shortcut: ShortcutType) => void`|`-`|-|
|icons|Icon configuration of panel.|`{prev?: ReactNode;prevDouble?: ReactNode;next?: ReactNode;nextDouble?: ReactNode;inputSuffix?: ReactNode;}`|`-`|2.20.0|
|locale|Internationalization configuration.|`Record<string, any>`|`-`|-|
|separator|Separator symbol in the range selector input box|`ReactNode`|`-`|-|
|disabledDate|Specify the date that cannot be selected|`(current: Dayjs) => boolean`|`-`|-|
|extra|Extra footer|`ReactNode`|`-`|-|
|onOk|Callback when click confirm button|`(dateString: string, date: Dayjs) => void`|`-`|-|
|triggerElement|Trigger element.|`ReactNode`|`-`|2.9.0|
|defaultPickerValue|Default displayed date of panel|`CalendarValue`|`-`|-|
|pickerValue|Displayed date of panel.|`CalendarValue`|`-`|2.9.0|
|onPickerValueChange|Callback when date of panel changes.|`(dateString: string, value: Dayjs) => void`|`-`|2.9.0|
|hideNotInViewDates|The panel hides gray dates that are not in the current time range|`boolean`|`-`|2.20.0|
|utcOffset|Set the timezone offset, set to 0 if utc time is required.|`number`|`-`|-|
|timezone|timezone name, if `utcOffset` is set, `utcOffset` takes effect.|`string`|`-`|-|

### DatePicker

`type CalendarValue = number | string | Date | Dayjs`。

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|`string \| ((value: Dayjs) => string)`|`YYYY-MM-DD`|
|defaultValue|To set default date|`CalendarValue`|`-`|
|value|To set date|`CalendarValue`|`-`|
|showTime|Whether to show time selection|`boolean \| TimePickerProps`|`-`|
|timepickerProps|Parameters of TimePicker, refer to [TimePickerProps](/react/components/time-picker), which has the same function as `showTime`.|`TimePickerProps`|`-`|
|showNowBtn|When displaying `showTime`, button to select current time.|`boolean`|`true`|
|disabledTime|Specify the time that cannot be selected|`(current?: Dayjs) => DisabledTimeProps`|`-`|

### WeekPicker

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|`string`|`gggg-wo`|
|defaultValue|To set default date|`CalendarValue`|`-`|
|value|To set date|`CalendarValue`|`-`|

### MonthPicker

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|`string`|`YYYY-MM`|
|defaultValue|To set default date|`CalendarValue`|`-`|
|value|To set date|`CalendarValue`|`-`|

### YearPicker

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|`string`|`YYYY`|
|defaultValue|To set default date|`CalendarValue`|`-`|
|value|To set date|`CalendarValue`|`-`|

### QuarterPicker

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|`string`|`YYYY-[Q]Q`|
|defaultValue|To set default date|`CalendarValue`|`-`|
|value|To set date|`CalendarValue`|`-`|

### RangePicker

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|disabled|Whether to disable input box|`boolean \| boolean[]`|`-`|-|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|`string`|`YYYY-MM-DD`|-|
|onChange|Callback when the selected value changes|`(dateString: string[], date: Dayjs[]) => void`|`-`|-|
|onSelect|Callback when the show value changes but the selected value does not change|`(dateString: string[], value: Dayjs[], extra: { type: 'start' \| 'end' }) => void`|`-`|`extra` in `2.23.0`|
|defaultValue|To set default date|`CalendarValue[]`|`-`|-|
|value|To set date|`CalendarValue[]`|`-`|-|
|mode|The type of RangePicker|`'date' \| 'month' \| 'week' \| 'year' \| 'quarter'`|`date`|-|
|showTime|Whether to show time selection, if an object is passed in, the parameters will be passed to the built-in TimePicker.|`boolean \| TimePickerRangeProps`|`-`|-|
|placeholder|The placeholder of input|`string[]`|`-`|-|
|timepickerProps|Parameters of TimePicker, refer to [TimePickerProps](/react/components/time-picker), which has the same function as `showTime`.|`TimePickerProps`|`-`|-|
|onOk|Callback when click confirm button|`(dateString: string[], date: Dayjs[]) => void`|`-`|-|
|disabledTime|Specify the time that cannot be selected|`(current: Dayjs, type: 'start' \| 'end') => DisabledTimeProps`|`-`|-|
|triggerElement|Trigger element.|`ReactNode`|`-`|2.9.0|
|defaultPickerValue|Default displayed date of panel.|`CalendarValue[]`|`-`|-|
|pickerValue|Displayed date of panel.|`CalendarValue[]`|`-`|2.9.0|
|onPickerValueChange|Callback when date of panel changes.|`(dateString: string[], value: Dayjs[]) => void`|`-`|2.9.0|
|clearRangeOnReselect|When reselect the range, the previous range will be cleared for next selection|`boolean`|`-`|2.23.0|

```js
type DisabledTimeProps = {
  disabledHours?: () => number[];
  disabledMinutes?: () => number[];
  disabledSeconds?: () => number[];
};
```
