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
|reverse|Whether Reverse order|boolean |`-`|
|direction|Timeline direction|'horizontal' \| 'vertical' |`vertical`|
|labelPosition|Position of label text|'relative' \| 'same' |`same`|
|mode|The display mode of Timeline|'left' \| 'right' \| 'top' \| 'bottom' \| 'alternate' |`left(vertical) \| top(horizontal)`|
|pending|Whether to display ghost nodes. When set to true, only ghost nodes are displayed. When passed to ReactNode, it will be displayed as node content|boolean \| ReactNode |`-`|
|pendingDot|You can pass in ReactNode to customize the ghost node|ReactNode |`<Spin size={12} />`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

### Timeline.Item

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|autoFixDotSize|Whether to automatically adapt the custom node size to 16px|boolean |`true`|
|dotColor|Dot color|string |`-`|
|lineColor|Line Color|string |`-`|
|dotType|Dot type|'hollow' \| 'solid' |`solid`|
|labelPosition|The position of the timeline node. Take effect when set `mode=alternate`|'relative' \| 'same' |`-`|
|lineType|Line type|'solid' \| 'dashed' \| 'dotted' |`solid`|
|dot|Custom Dot|string \| ReactNode |`-`|
|label|Label text|string \| ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
