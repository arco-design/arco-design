`````
Component / Data Display

# Statistic

Display statistic number.
`````

%%Content%%

## API

### Statistic

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|countUp|Whether the value becomes larger dynamically|boolean |`-`|-|
|groupSeparator|Whether to display thousands separator|boolean |`-`|-|
|loading|Is the number loading|boolean |`-`|2.20.0|
|countDuration|Dynamic time (ms)|number |`2000`|-|
|countFrom|The number that the value starts to increase dynamically|number |`0`|-|
|precision|The precision of the value|number |`-`|-|
|format|[dayjs](https://github.com/iamkun/dayjs)'s format|string |`-`|-|
|renderFormat|Custom render function. `formattedValue` represents the formatted value.|(value: [StatisticProps](statistic#statistic)['value'], formattedValue: string) => ReactNode |`-`|2.36.0|
|extra|he extra content to be rendered under the value|ReactNode |`-`|-|
|prefix|The prefix element|string \| ReactNode |`-`|-|
|suffix|The suffix element|string \| ReactNode |`-`|-|
|title|The title|string \| ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|styleDecimal|The style of the decimal part of the value|CSSProperties |`-`|2.47.0|
|styleValue|The css style of statistic's value|CSSProperties |`-`|-|
|value|Display value|string \| number \| Dayjs |`-`|-|

### Statistic.Countdown

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|start|Whether to start the countdown|boolean |`true`|-|
|format|[dayjs](https://github.com/iamkun/dayjs)'s format|string |`HH:mm:ss`|-|
|title|The title element|string \| ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|now|The current time. Used to correct the initialization time|number \| string \| Date \| Dayjs |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|styleValue|The css style of statistic's value|CSSProperties |`-`|-|
|value|To set value|number \| string \| Date \| Dayjs |`-`|-|
|onFinish|Callback at the end of the countdown|() => void |`-`|-|
|renderFormat|Custom render function, the input parameter is the result formatted by `dayjs`|(valueDiff: number, formattedDiff: string) => ReactNode |`-`|2.36.0|
