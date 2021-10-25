`````
Component / Navigation

# Steps

Show the task flow and the current degree of completion, and guide users to follow the steps to complete the task.
`````

%%Content%%

## API

### Steps

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|type|Type of step|`'default' \| 'arrow' \| 'dot' \| 'navigation'`|`default`|
|size|To specify the size of the step bar|`'default' \| 'small'`|`default`|
|direction|Direction of the step bar|`'vertical' \| 'horizontal'`|`horizontal`|
|labelPlacement|Where to place description,the default `horizontal` is placed on the right side of the icon, optional `vertical` is placed below the icon|`'horizontal' \| 'vertical'`|`horizontal`|
|current|Current step|`number`|`1`|
|status|Status of current step|`'wait' \| 'process' \| 'finish' \| 'error'`|`-`|
|customDot|Customize the step,arrow type is not supported|`(IconDot: React.ReactNode, stepConfig: CustomDotRecord) => React.ReactNode`|`-`|
|onChange|Callback when click step, after setting this prop, the step bar will switch when clicked.|`(current: number, id: any) => void`|`-`|
|lineless|Hidden lines|`boolean`|`-`|

### Steps.Step

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|The additional css style|`CSSProperties`|`-`|2.11.0|
|className|The additional css className|`string \| string[]`|`-`|2.11.0|
|id|Specify the ID of the node, which will be used as a parameter in callback onChange|`any`|`-`|-|
|title|Title of step|`string \| ReactNode`|`-`|-|
|description|Description of step|`string \| ReactNode`|`-`|-|
|status|Status of step|`'wait' \| 'process' \| 'finish' \| 'error'`|`-`|-|
|disabled|Disable click event|`boolean`|`-`|-|
