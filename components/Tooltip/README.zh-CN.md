`````
组件 / 数据展示

# 文字气泡 Tooltip

鼠标悬停、聚焦或点击在某个组件时，弹出的文字提示。
`````

%%Content%%

## API

### Tooltip

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|trigger|触发方式，目前仅支持 `hover`|`TriggerProps['trigger']`|`hover`|-|
|content|弹出的内容|`ReactNode`|`-`|-|
|color|弹出层背景色|`string`|`-`|2.22.0|
|getPopupContainer|弹出框挂载的节点|`(node: HTMLElement) => Element`|`-`|-|
|position|弹出框的方位，有 12 个方位可供选择|`\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb'`|`top`|-|
|mini|迷你尺寸|`boolean`|`-`|-|
|unmountOnExit|是否在隐藏的时候销毁 DOM 结构|`boolean`|`true`|-|
|defaultPopupVisible|默认的弹出框状态|`boolean`|`-`|-|
|popupVisible|弹出框是打开还是关闭状态|`boolean`|`-`|-|
|onVisibleChange|显示或隐藏时触发的回调|`(visible: boolean) => void`|`-`|-|
|popupHoverStay|鼠标移入弹出框的话，弹出框会保留而不销毁|`boolean`|`true`|-|
|blurToHide|是否在失去焦点的时候关闭弹出框|`boolean`|`true`|-|
|disabled|是否禁用弹出|`boolean`|`-`|-|
|triggerProps|可以接受所有 `Trigger` 组件的参数|`Partial<TriggerProps>`|`-`|-|
|childrenPrefix|会在打开状态给元素加上一个类，格式为 `${childrenPrefix}-open`。|`string`|`-`|-|
