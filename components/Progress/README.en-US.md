`````
Component / Feedback

# Progress

Give users feedback on the current running tasks, which is mostly used in scenes that run for a period of time, effectively reducing the anxiety of users in waiting.
`````

%%Content%%

## API

### Progress

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|animation|Whether show animation, Only available when `type="line"`|boolean |`-`|-|
|buffer|Whether the Progress show buffer. Only available when `type=line`|boolean |`-`|-|
|showText|Whether display text|boolean |`true`|-|
|percent|percent|number  **(Required)**|`0`|-|
|steps|Show step progress|number |`-`|2.10.0|
|strokeWidth|The stroke width of Progress|number |`-`|-|
|trailColor|The rest of progress bar color.|string |`-`|-|
|size|The size of Progress|'small' \| 'default' \| 'mini' \| 'large' |`default`|-|
|status|Progress status.|'success' \| 'error' \| 'normal' \| 'warning' |`-`|2.16.0|
|type|The type of Progress|'line' \| 'circle' |`line`|-|
|bufferColor|Buffer color|string \| object |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|color|Progress color, priority is higher than `status`|string \| { [key: string]: string } |`-`|2.10.0|
|style|Additional style|CSSProperties |`-`|-|
|width|The Progress width. The `circle` type Progress only supports the number type `width`|string \| number |`-`|-|
|formatText|Progress text function|(percent: number) => ReactNode |`-`|-|
