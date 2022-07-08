`````
组件 / 数据输入

# 评分 Rate

评分打星组件。
`````

%%Content%%

## API

### Rate

|参数名|描述|类型|默认值|
|---|---|---|---|
|allowClear|是否允许清除|boolean |`-`|
|allowHalf|是否允许半选|boolean |`-`|
|disabled|是否禁用|boolean |`-`|
|grading|笑脸分级|boolean |`-`|
|readonly|是否只读，不能选择|boolean |`-`|
|count|星的总数|number |`5`|
|defaultValue|默认值|number |`-`|
|value|星的个数，受控值|number |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|tooltips|自定义每一项的提示信息|string[] |`-`|
|character|自定义字符|ReactNode \| ((index: number) => ReactNode) |`<IconStarFill />`|
|onChange|选择时的回调|(value: number) => void |`-`|
|onHoverChange|鼠标经过时数值变化的回调|(value: number) => void |`-`|
