`````
组件 / 数据展示

# 气泡卡片 Popover

鼠标悬停、聚焦或点击在某个组件时，弹出的气泡式的卡片浮层。可以对卡片上的元素进行操作。
`````

%%Content%%

## API

### Popover

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|title|标题|`ReactNode`|`-`|-|
|disabled|是否禁用|`boolean`|`-`|2.11.0|
|triggerProps|可以接受所有 `Trigger` 组件的参数|`Partial<TriggerProps>`|`-`|-|
|getPopupContainer|弹出框挂载的节点|`(node: HTMLElement) => Element`|`-`|-|
|color|弹出层背景色|`string`|`-`|2.22.0|
|position|弹出框的方位，有 12 个方位可供选择|`\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb'`|`top`|-|
|popupVisible|弹出框是打开还是关闭状态|`boolean`|`-`|-|
|unmountOnExit|是否在隐藏的时候销毁 DOM 结构|`boolean`|`true`|-|
|onVisibleChange|显示或隐藏时触发的回调|`(visible: boolean) => void`|`-`|-|
|trigger|触发方式，目前支持 `'hover' \| 'click' \| 'focus'` |`TriggerProps['trigger']`|`hover`|-|
|content|弹出的内容|`ReactNode`|`-`|-|
|defaultPopupVisible|默认的弹出框状态|`boolean`|`-`|-|
|popupHoverStay|鼠标移入弹出框的话，弹出框会保留而不销毁|`boolean`|`true`|-|
|blurToHide|是否在失去焦点的时候关闭弹出框|`boolean`|`true`|-|
|childrenPrefix|会在打开状态给元素加上一个类，格式为 `${childrenPrefix}-open`。|`string`|`-`|-|
