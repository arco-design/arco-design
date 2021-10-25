`````
Component / Data Entry

# TimePicker

Select the time on the popup panel to conveniently complete the time input control.
`````

%%Content%%

## API

### Picker

Common properties of `TimePicker` and `RangePicker`

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|disabled|Whether to disable|`boolean`|`-`|-|
|error|Error style|`boolean`|`-`|-|
|allowClear|Whether to show clear button|`boolean`|`true`|-|
|disableConfirm|Disable the confirm step, click to select time directly without click the confirm button.|`boolean`|`-`|2.12.0|
|position|The position of the popup box|`'top' \| 'tl' \| 'tr' \| 'bottom' \| 'bl' \| 'br'`|`bl`|-|
|getPopupContainer|The parent node of the popup|`(node: HTMLElement) => Element`|`-`|-|
|placeholder|The placeholder of input box|`string \| string[]`|`-`|-|
|format|Date format, refer to [dayjs](https://github.com/iamkun/dayjs)|`string`|`HH:mm:ss`|-|
|use12Hours|Display as 12 hours format, with default format h:mm:ss a|`boolean`|`-`|-|
|onClear|Callback when click the clear button|`() => void`|`-`|-|
|popupVisible|Whether the popup is visible or not|`boolean`|`-`|-|
|triggerProps|The props of the `Trigger` component|`Partial<TriggerProps>`|`-`|-|
|step|Set the hour/minute/second selection interval.|`{ hour?: number; minute?: number; second?: number }`|`-`|-|
|disabledHours|To specify the hours that cannot be selected|`() => number[]`|`-`|-|
|disabledMinutes|To specify the minutes that cannot be selected|`(selectedHour) => number[]`|`-`|-|
|disabledSeconds|To specify the seconds that cannot be selected|`(selectedHour, selectedMinute) => number[]`|`-`|-|
|hideDisabledOptions|Hide the disabled options|`boolean`|`-`|-|
|size|Input box size|`'mini' \| 'small' \| 'default' \| 'large'`|`-`|-|
|scrollSticky|The time column is automatically adsorbed and selected when scrolling|`boolean`|`true`|2.23.0|
|editable|Whether input box can be entered|`boolean`|`true`|-|
|icons|Used to configure icons|`{ inputSuffix?: ReactNode }`|`-`|-|
|extra|Additional content at the bottom|`ReactNode`|`-`|-|
|unmountOnExit|Whether to destroy popup when hidden|`boolean`|`-`|-|

### TimePicker

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|onSelect|Callback when select time|`(valueString: string, value: Dayjs) => void`|`-`|-|
|onChange|Callback when selected value changes|`(valueString: string, value: Dayjs) => void`|`-`|-|
|defaultValue|To set default time|`CalendarValue`|`-`|-|
|value|To set time|`CalendarValue`|`-`|-|
|showNowBtn|Whether to show the button to select current time|`boolean`|`true`|2.21.0|

### TimePicker.RangePicker

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|onChange|Callback when the selected value changes|`(valueString: string[], value: Dayjs[]) => void`|`-`|-|
|onSelect|Callback when select time|`(valueString: string[], value: Dayjs[]) => void`|`-`|-|
|defaultValue|To set default time|`CalendarValue[]`|`-`|-|
|value|To set time|`CalendarValue[]`|`-`|-|
|placeholder|The placeholder of input box|`string[]`|`-`|-|
|order|Whether the start and end times are automatically sorted|`boolean`|`true`|2.21.0|
