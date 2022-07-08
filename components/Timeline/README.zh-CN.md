`````
组件 / 数据展示

# 时间轴 Timeline

按照时间顺序或倒序规则的展示信息内容。
`````

%%Content%%

## API

**注意: 非 `Timeline.Item` 组件将会被过滤掉，不会被展示**

### Timeline

|参数名|描述|类型|默认值|
|---|---|---|---|
|reverse|是否倒序|boolean |`-`|
|direction|时间轴方向|'horizontal' \| 'vertical' |`vertical`|
|labelPosition|设置标签文本的位置|'relative' \| 'same' |`same`|
|mode|时间轴的展示类型：时间轴在左侧/右侧(垂直方向)、上方/下方（水平方向），或交替出现。|'left' \| 'right' \| 'top' \| 'bottom' \| 'alternate' |`left(vertical) \| top(horizontal)`|
|pending|是否展示幽灵节点，设置为 true 时候只展示幽灵节点。传入ReactNode时，会作为节点内容展示。|boolean \| ReactNode |`-`|
|pendingDot|可以传入 ReactNode 定制幽灵节点|ReactNode |`<Spin size={12} />`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Timeline.Item

|参数名|描述|类型|默认值|
|---|---|---|---|
|autoFixDotSize|是否自动适配自定义节点尺寸到 16px|boolean |`true`|
|dotColor|节点颜色|string |`-`|
|lineColor|时间轴颜色|string |`-`|
|dotType|节点类型：空心圆/实心圆|'hollow' \| 'solid' |`solid`|
|labelPosition|时间轴节点的位置。 在时间轴组件 `mode=alternate` 时候生效|'relative' \| 'same' |`-`|
|lineType|时间轴类型：实线/虚线/点状线|'solid' \| 'dashed' \| 'dotted' |`solid`|
|dot|自定义节点|string \| ReactNode |`-`|
|label|标签文本|string \| ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
