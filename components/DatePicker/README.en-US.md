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
|allowClear|Allow Clear|boolean |`true`|-|
|editable|Whether input box can be entered.|boolean |`true`|-|
|error|Whether the textarea is error.(Deprecated, removed in the next major version, use status='error' instead)|boolean |`-`|-|
|hideNotInViewDates|The panel hides gray dates that are not in the current time range|boolean |`-`|2.20.0|
|popupVisible|Whether the popup is visible or not|boolean |`-`|-|
|shortcutsPlacementLeft|The preset range selection is placed on the left side of the panel for a large number of scenes with preset time.|boolean |`-`|-|
|unmountOnExit|Whether to destroy popup when hidden|boolean |`-`|-|
|utcOffset|Set the timezone offset, set to 0 if utc time is required.|number |`-`|-|
|timezone|timezone name, if `utcOffset` is set, `utcOffset` takes effect.|string |`-`|-|
|position|The position of the popup|'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br' |`-`|-|
|size|The size of input box|'mini' \| 'small' \| 'default' \| 'large' |`default`|-|
|status|Status|'error' \| 'warning' |`-`|2.45.0|
|extra|Extra footer|ReactNode |`-`|-|
|prefix|prefix|ReactNode |`-`|2.43.0|
|separator|Separator symbol in the range selector input box|ReactNode |`-`|-|
|triggerElement|Trigger element.|ReactNode |`-`|2.9.0|
|className|Additional css class|string \| string[] |`-`|-|
|dayStartOfWeek|The first day of the week starts on the day of the week, `0`-Sunday, `1`-Monday, and so on.|0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 |`-`|2 - 6 in `2.20.0`|
|defaultPickerValue|Default displayed date of panel|[CalendarValue](#calendarvalue) |`-`|-|
|disabled|Whether to disable|boolean \| boolean[] |`-`|-|
|icons|Icon configuration of panel.|{prev?: ReactNode;prevDouble?: ReactNode;next?: ReactNode;nextDouble?: ReactNode;inputSuffix?: ReactNode;} |`-`|2.20.0|
|locale|Internationalization configuration.|Record&lt;string, any&gt; |`-`|-|
|pickerValue|Displayed date of panel.|[CalendarValue](#calendarvalue) |`-`|2.9.0|
|placeholder|The placeholder of date input|string \| string[] |`-`|-|
|shortcuts|Shortcut selection of preset time range|[ShortcutType](#shortcuttype)[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|triggerProps|The props of the `Trigger` component.|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|dateRender|Customize the contents of the date cell.|(currentDate: Dayjs) => ReactNode |`-`|-|
|disabledDate|Specify the date that cannot be selected|(current: Dayjs) => boolean |`-`|-|
|getPopupContainer|The parent node of the popup|(node: HTMLElement) => Element |`bl`|-|
|onChange|Callback when the selected value changes|(dateString: string, date: Dayjs) => void |`-`|-|
|onClear|Callback when clicking the clear button|() => void |`-`|-|
|onOk|Callback when click confirm button|(dateString: string, date: Dayjs) => void |`-`|-|
|onPickerValueChange|Callback when date of panel changes.|(dateString: string, value: Dayjs) => void |`-`|2.9.0|
|onSelect|Callback when the show date changes but the selected value does not change|(dateString: string, date: Dayjs) => void |`-`|-|
|onSelectShortcut|Callback when click shortcut selection.|(shortcut: [ShortcutType](#shortcuttype)) => void |`-`|-|
|onVisibleChange|Callback when the visibility of the popup is changed|(visible?: boolean) => void |`-`|-|
|panelRender|Customize the panel node.|(panelNode: ReactNode) => ReactNode |`-`|2.34.0|

### DatePicker

`type CalendarValue = number | string | Date | Dayjs`。

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|showNowBtn|When displaying `showTime`, button to select current time.|boolean |`true`|
|defaultValue|To set default date|[CalendarValue](#calendarvalue) |`-`|
|showTime|Whether to show time selection|boolean \| [TimePickerProps](#timepickerprops) |`-`|
|timepickerProps|Parameters of TimePicker, refer to [TimePickerProps](/react/components/time-picker), which has the same function as `showTime`.|[TimePickerProps](#timepickerprops) |`-`|
|value|To set date|[CalendarValue](#calendarvalue) |`-`|
|disabledTime|Specify the time that cannot be selected|(current?: Dayjs) => [DisabledTimeProps](#disabledtimeprops) |`-`|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs). When using a `string`, manual editing is allowed. When using `(value: Dayjs) => string`, value must be picked from Picker.|string \| ((value: Dayjs) => string) |`YYYY-MM-DD`|

### WeekPicker

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|string |`gggg-wo`|
|defaultValue|To set default date|[CalendarValue](#calendarvalue) |`-`|
|value|To set date|[CalendarValue](#calendarvalue) |`-`|

### MonthPicker

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|string |`YYYY-MM`|
|defaultValue|To set default date|[CalendarValue](#calendarvalue) |`-`|
|value|To set date|[CalendarValue](#calendarvalue) |`-`|

### YearPicker

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|string |`YYYY`|
|defaultValue|To set default date|[CalendarValue](#calendarvalue) |`-`|
|value|To set date|[CalendarValue](#calendarvalue) |`-`|

### QuarterPicker

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|string |`YYYY-[Q]Q`|
|defaultValue|To set default date|[CalendarValue](#calendarvalue) |`-`|
|value|To set date|[CalendarValue](#calendarvalue) |`-`|

### RangePicker

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|clearRangeOnReselect|When reselect the range, the previous range will be cleared for next selection|boolean |`-`|2.23.0|
|disabledTime|Specify the time that cannot be selected|(current: Dayjs, type: 'start' \| 'end') => [DisabledTimeProps](#disabledtimeprops) |`-`|-|
|mode|The type of RangePicker|'date' \| 'month' \| 'week' \| 'year' \| 'quarter' |`date`|-|
|onSelect|Callback when the show value changes but the selected value does not change|(dateString: string[], value: Dayjs[], extra: { type: 'start' \| 'end' }) => void |`-`|`extra` in `2.23.0`|
|triggerElement|Trigger element.|ReactNode |`-`|2.9.0|
|defaultPickerValue|Default displayed date of panel.|[CalendarValue](#calendarvalue)[] |`-`|-|
|defaultValue|To set default date|[CalendarValue](#calendarvalue)[] |`-`|-|
|disabled|Whether to disable input box|boolean \| boolean[] |`-`|-|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|string \| string[] |`YYYY-MM-DD`|string[] in 2.55.0|
|pickerValue|Displayed date of panel.|[CalendarValue](#calendarvalue)[] |`-`|2.9.0|
|placeholder|The placeholder of input|string[] |`-`|-|
|showTime|Whether to show time selection, if an object is passed in, the parameters will be passed to the built-in TimePicker.|boolean \| [TimePickerRangeProps](#timepickerrangeprops) |`-`|-|
|timepickerProps|Parameters of TimePicker, refer to [TimePickerProps](/react/components/time-picker), which has the same function as `showTime`.|[TimePickerProps](#timepickerprops) |`-`|-|
|value|To set date|[CalendarValue](#calendarvalue)[] |`-`|-|
|onChange|Callback when the selected value changes|(dateString: string[], date: Dayjs[]) => void |`-`|-|
|onOk|Callback when click confirm button|(dateString: string[], date: Dayjs[]) => void |`-`|-|
|onPickerValueChange|Callback when date of panel changes.|(dateString: string[], value: Dayjs[]) => void |`-`|2.9.0|

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
