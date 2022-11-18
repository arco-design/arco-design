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
|lineless|Hidden lines|boolean |`-`|
|current|Current step|number |`1`|
|direction|Direction of the step bar|'vertical' \| 'horizontal' |`horizontal`|
|labelPlacement|Where to place description,the default `horizontal` is placed on the right side of the icon, optional `vertical` is placed below the icon|'horizontal' \| 'vertical' |`horizontal`|
|size|To specify the size of the step bar|'default' \| 'small' |`default`|
|status|Status of current step|'wait' \| 'process' \| 'finish' \| 'error' |`-`|
|type|Type of step|'default' \| 'arrow' \| 'dot' \| 'navigation' |`default`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|customDot|Customize the step,arrow type is not supported|(IconDot: ReactNode, stepConfig: [CustomDotRecord](#customdotrecord)) => ReactNode |`-`|
|onChange|Callback when click step, after setting this prop, the step bar will switch when clicked.|(current: number, id: any) => void |`-`|

### Steps.Step

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|disabled|Disable click event|boolean |`-`|-|
|status|Status of step|'wait' \| 'process' \| 'finish' \| 'error' |`-`|-|
|description|Description of step|string \| ReactNode |`-`|-|
|title|Title of step|string \| ReactNode |`-`|-|
|className|The additional css className|string \| string[] |`-`|2.11.0|
|id|Specify the ID of the node, which will be used as a parameter in callback onChange|any |`-`|-|
|style|The additional css style|CSSProperties |`-`|2.11.0|
|onClick|Callback when item is clicked|(index: number, id: any, e) => void |`-`|`e` in `2.40.0`|

### CustomDotRecord

```js
export type CustomDotRecord = {
  index: number;
  status: string;
  title: ReactNode;
  description: ReactNode;
};
```
