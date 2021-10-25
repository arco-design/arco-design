`````
Component / Data Display

# Timeline

Display information content in chronological or reverse order.
`````

%%Content%%

## API

**Note: Not `Timeline.Item` components will be filtered out and will not be displayed**

### Timeline

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|reverse|Whether Reverse order|`boolean`|`-`|
|direction|Timeline direction|`'horizontal' \| 'vertical'`|`vertical`|
|mode|The display mode of Timeline|`'left' \| 'right' \| 'alternate'`|`left`|
|pending|Whether to display ghost nodes. When set to true, only ghost nodes are displayed. When passed to ReactNode, it will be displayed as node content|`boolean \| ReactNode`|`-`|
|pendingDot|You can pass in ReactNode to customize the ghost node|`ReactNode`|`<Spin size={12} />`|
|labelPosition|Position of label text|`'relative' \| 'same'`|`same`|

### Timeline.Item

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|dotColor|Dot color|`string`|`-`|
|dotType|Dot type|`'hollow' \| 'solid'`|`solid`|
|dot|Custom Dot|`string \| ReactNode`|`-`|
|lineType|Line type|`'solid' \| 'dashed' \| 'dotted'`|`solid`|
|lineColor|Line Color|`string`|`-`|
|label|Label text|`string \| ReactNode`|`-`|
|labelPosition|The position of the timeline node. Take effect when set `mode=alternate`|`'relative' \| 'same'`|`-`|
|autoFixDotSize|Whether to automatically adapt the custom node size to 16px|`boolean`|`true`|
