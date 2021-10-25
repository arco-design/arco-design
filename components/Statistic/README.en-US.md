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
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|styleValue|The css style of statistic's value|`CSSProperties`|`-`|-|
|title|The title|`string \| ReactNode`|`-`|-|
|value|Display value|`string \| number \| Dayjs`|`-`|-|
|precision|The precision of the value|`number`|`-`|-|
|groupSeparator|Whether to display thousands separator|`boolean`|`-`|-|
|prefix|The prefix element|`string \| ReactNode`|`-`|-|
|suffix|The suffix element|`string \| ReactNode`|`-`|-|
|extra|he extra content to be rendered under the value|`ReactNode`|`-`|-|
|countUp|Whether the value becomes larger dynamically|`boolean`|`-`|-|
|countFrom|The number that the value starts to increase dynamically|`number`|`0`|-|
|countDuration|Dynamic time (ms)|`number`|`2000`|-|
|format|[dayjs](https://github.com/iamkun/dayjs)'s format|`string`|`-`|-|
|loading|Is the number loading|`boolean`|`-`|2.20.0|

### Statistic.Countdown

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|styleValue|The css style of statistic's value|`CSSProperties`|`-`|
|title|The title element|`string \| ReactNode`|`-`|
|value|To set value|`number \| string \| Date \| Dayjs`|`-`|
|format|[dayjs](https://github.com/iamkun/dayjs)'s format|`string`|`HH:mm:ss`|
|onFinish|Callback at the end of the countdown|`() => void`|`-`|
|start|Whether to start the countdown|`boolean`|`true`|
|now|The current time. Used to correct the initialization time|`number \| string \| Date \| Dayjs`|`-`|
