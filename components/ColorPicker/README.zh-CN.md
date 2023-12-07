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
|showHistory|显示历史颜色|boolean |`-`|
|showPreset|显示预设颜色|boolean |`-`|
|showText|显示颜色值|boolean |`-`|
|unmountOnExit|隐藏后是否销毁 DOM 结构|boolean |`true`|
|defaultValue|默认值|string |`-`|
|value|颜色值，受控模式|string |`-`|
|format|颜色值的格式|'hex' \| 'rgb' |`-`|
|size|输入框的尺寸|[InputProps](input#input)['size'] |`default`|
|className|节点类名|string \| string[] |`-`|
|historyColors|历史颜色的颜色数组|string[] |`-`|
|presetColors|预设颜色的颜色数组|string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|triggerProps|可以接受所有 Trigger 组件的 Props|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|
|onChange|颜色值改变时触发|(value: string) => void |`-`|
|onVisibleChange|下拉框收起展开时触发。|(visible: boolean) => void |`-`|
