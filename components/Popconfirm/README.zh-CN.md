`````
组件 / 反馈

# 气泡确认框 Popconfirm

点击元素，弹出气泡式的确认框。
`````

%%Content%%

## API

### Popconfirm

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|getPopupContainer|弹出挂载的节点|`(node: HTMLElement) => Element`|`-`|-|
|position|弹出框的方位，有 12 个方位可供选择|`\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb'`|`top`|-|
|title|标题|`ReactNode`|`-`|-|
|disabled|是否禁用|`boolean`|`-`|2.11.0|
|cancelText|取消按钮文字|`string`|`-`|-|
|okText|确认按钮文字|`string`|`-`|-|
|okType|确认按钮的类型|`ButtonProps['type']`|`primary`|-|
|okButtonProps|确定按钮的参数，可接受 `Button` 组件的所有参数|`ButtonProps`|`-`|-|
|cancelButtonProps|取消按钮的参数，可接受 `Button` 组件的所有参数|`ButtonProps`|`-`|-|
|onOk|点击确认按钮的回调函数|`(e: React.MouseEvent) => void`|`-`|-|
|onCancel|点击取消按钮的回调函数|`(e: React.MouseEvent) => void`|`-`|-|
|defaultPopupVisible|默认弹出框是打开还是关闭|`boolean`|`-`|-|
|popupVisible|弹出框是打开还是关闭。(受控)|`boolean`|`-`|-|
|onVisibleChange|弹出打开和关闭触发的回调|`(visible: boolean) => void`|`-`|-|
|icon|标题前的图标|`ReactNode`|`<IconExclamationCircleFill />`|-|
|unmountOnExit|是否在隐藏的时候销毁 DOM 节点|`boolean`|`true`|-|
|trigger|触发方式|`TriggerProps['trigger']`|`click`|-|
|triggerProps|可以接受所有 Trigger 的参数|`Partial<TriggerProps>`|`-`|-|
|autoFocus|是否自动聚焦弹出框内的可聚焦元素|`boolean`|`-`|-|
|focusLock|是否将焦点锁定在弹出框内|`boolean`|`-`|-|
