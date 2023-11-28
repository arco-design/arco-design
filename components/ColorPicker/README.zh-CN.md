`````
组件 / 数据输入

# 颜色选择器 ColorPicker

用于选择和展示颜色
`````

%%Content%%

## API
### ColorPicker

|参数名|描述|类型|默认值|
|---|---|---|---|
|defaultPopupVisible|默认弹出框是打开还是关闭|boolean |`-`|
|disabled|禁用|boolean |`-`|
|disabledAlpha|禁用透明通道|boolean |`-`|
|popupVisible|弹出框是打开还是关闭。(受控)|boolean |`-`|
|readOnly|只读|boolean |`-`|
|defaultValue|默认值|string |`-`|
|value|颜色值，受控模式|string |`-`|
|format|颜色值的格式|'hex' \| 'rgb' |`-`|
|size|输入框的尺寸|[InputProps](input#input)['size'] |`default`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|triggerProps|可以接受所有 Trigger 组件的 Props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|
|onVisibleChange|下拉框收起展开时触发。|(visible: boolean) => void |`-`|
