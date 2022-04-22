`````
Component / Data Display

# Calendar

Container for displaying data in calendar form.
`````

%%Content%%

## API

### Calendar

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|allowSelect|Whether to allow the selection and switching of the date. It's enabled by default in `panel` mode|`boolean`|`-`|
|panel|Whether to be displayed in a container.|`boolean`|`-`|
|panelWidth|The width of the calendar in card mode|`number \| string`|`265`|
|panelTodayBtn|Whether to display the button to jump to today|`boolean`|`-`|
|panelOperations|Operation buttons configuration in card mode|`Array<'left' \| 'double-left' \| 'right' \| 'double-right'>`|`-`|
|isWeek|Select Week date|`boolean`|`-`|
|dayStartOfWeek|The first day of the week starts on the day of the week, `0`-Sunday, `1`-Monday.|`0 \| 1`|`0`|
|defaultMode|The default display mode of the calendar|`'day' \| 'week' \| 'month' \| 'year'`|`month`|
|mode|The display mode of the calendar|`'day' \| 'week' \| 'month' \| 'year'`|`-`|
|disabledDate|Function that specifies the dates that cannot be selected|`(current: Dayjs) => boolean`|`-`|
|onChange|Callback when date change.|`(date: Dayjs) => void`|`-`|
|onPanelChange|Callback when the panel date changes.|`(date: Dayjs) => void`|`-`|
|dateRender|Customize the date display, which will completely cover the date cell.|`(currentDate: Dayjs) => ReactNode`|`-`|
|monthRender|Customize the month display, which will completely cover the month cell.|`(currentDate: Dayjs) => ReactNode`|`-`|
|dateInnerContent|Customize the date cell, the content will be added to the cell, and it will only work in the full-screen calendar mode.|`(currentDate: Dayjs) => ReactNode`|`-`|
|headerRender|Custom header renderer.|`(props: {value?: Dayjs;pageShowDate?: Dayjs;mode?: string;onChange;onChangePageDate;onChangeMode;}) => ReactNode`|`-`|
|locale|Internationalization configuration.|`Record<string, any>`|`-`|
|headerType|There are two types of headers to choose from. Only work in full-screen calendar mode.|`'button' \| 'select'`|`button`|
