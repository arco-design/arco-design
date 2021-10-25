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
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|type|The type of Progress|`'line' \| 'circle'`|`line`|-|
|steps|Show step progress|`number`|`-`|2.10.0|
|animation|Whether show animation, Only available when `type="line"`|`boolean`|`-`|-|
|status|Progress status.|`'success' \| 'error' \| 'normal' \| 'warning'`|`-`|2.16.0|
|color|Progress color, priority is higher than `status`|`string \| { [key: string]: string }`|`-`|2.10.0|
|showText|Whether display text|`boolean`|`true`|-|
|formatText|Progress text function|`(percent: number) => ReactNode`|`-`|-|
|percent|percent|`number` **(Required)**|`0`|-|
|strokeWidth|The stroke width of Progress|`number`|`-`|-|
|width|The Progress width. The `circle` type Progress only supports the number type `width`|`string \| number`|`-`|-|
|size|The size of Progress|`'small' \| 'default' \| 'mini' \| 'large'`|`default`|-|
|buffer|Whether the Progress show buffer. Only available when `type=line`|`boolean`|`-`|-|
|bufferColor|Buffer color|`string \| object`|`-`|-|
