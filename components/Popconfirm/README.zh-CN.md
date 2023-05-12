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
|autoFocus|是否自动聚焦弹出框内的可聚焦元素|boolean |`-`|-|
|defaultPopupVisible|默认弹出框是打开还是关闭|boolean |`-`|-|
|disabled|是否禁用|boolean |`-`|2.11.0|
|focusLock|是否将焦点锁定在弹出框内|boolean |`-`|-|
|popupVisible|弹出框是打开还是关闭。(受控)|boolean |`-`|-|
|unmountOnExit|是否在隐藏的时候销毁 DOM 节点|boolean |`true`|-|
|okType|确认按钮的类型|ButtonProps['type'] |`primary`|-|
|position|弹出框的方位，有 12 个方位可供选择|\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb' |`top`|-|
|trigger|触发方式|[TriggerProps](trigger#trigger)['trigger'] |`click`|-|
|cancelText|取消按钮文字|ReactNode |`-`|-|
|icon|标题前的图标|ReactNode |`<IconExclamationCircleFill />`|-|
|okText|确认按钮文字|ReactNode |`-`|-|
|cancelButtonProps|取消按钮的参数，可接受 `Button` 组件的所有参数|ButtonProps |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|okButtonProps|确定按钮的参数，可接受 `Button` 组件的所有参数|ButtonProps |`-`|-|
|onOk|点击确认按钮的回调函数。回调函数 `event` 参数在 `2.29.0` 支持|(e: React.MouseEvent) =&gt; Promise&lt;any&gt; \| void |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|可以接受所有 Trigger 的参数|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|content|内容.函数类型在 `2.48.0` 支持|ReactNode \| (() => ReactNode) |`-`|2.44.0|
|getPopupContainer|弹出挂载的节点|(node: HTMLElement) => Element |`-`|-|
|onCancel|点击取消按钮的回调函数。 回调函数 `event` 参数在 `2.29.0` 支持|(e: React.MouseEvent) => void |`-`|-|
|onVisibleChange|弹出打开和关闭触发的回调|(visible: boolean) => void |`-`|-|
|title|标题。 函数类型在 `2.48.0` 支持|ReactNode \| (() => ReactNode) |`-`|-|
