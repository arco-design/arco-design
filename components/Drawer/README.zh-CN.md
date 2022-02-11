`````
组件 / 反馈

# 抽屉 Drawer

触发命令后，从屏幕一侧滑出的抽屉式的面板。
`````

%%Content%%

## API
### Drawer

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|wrapClassName|设置外层容器的类名|`string \| string[]`|`-`|-|
|title|弹出框的标题（设置为 null 时，不显示标题栏）|`ReactNode`|`-`|-|
|footer|自定义按钮确认和取消按钮，为 null 的话没有按钮组|`ReactNode`|`-`|-|
|headerStyle|头部的样式|`CSSProperties`|`-`|2.9.0|
|bodyStyle|内容区域的样式|`CSSProperties`|`-`|2.9.0|
|maskStyle|设置遮罩层的样式|`CSSProperties`|`-`|-|
|okText|确认按钮文案|`string`|`-`|-|
|cancelText|取消按钮文案|`string`|`-`|-|
|okButtonProps|确认按钮的 props|`ButtonProps`|`-`|2.26.0|
|cancelButtonProps|取消按钮的 props|`ButtonProps`|`-`|2.26.0|
|placement|抽屉的方向 `top` `right` `bottom` `left`|`string`|`right`|-|
|width|抽屉的宽度，`placement`为 `left` `right` 时生效|`string \| number`|`250`|-|
|height|抽屉的高度，`placement`为 `top` `bottom` 时生效|`string \| number`|`250`|-|
|escToExit|按 `ESC` 键关闭|`boolean`|`true`|2.10.0|
|mask|是否显示遮罩|`boolean`|`true`|-|
|visible|是否显示弹出框|`boolean`|`-`|-|
|closable|是否显示右上角关闭按钮|`boolean`|`true`|-|
|maskClosable|点击蒙层是否可以关闭|`boolean`|`true`|-|
|confirmLoading|确认按钮是否为加载中状态|`boolean`|`-`|-|
|mountOnEnter|是否在初次打开对话框时才渲染 dom。|`boolean`|`true`|-|
|unmountOnExit|是否在隐藏的时候销毁 DOM 结构|`boolean`|`-`|-|
|onOk|点击确认按钮的回调|`(e: Event) => void`|`-`|-|
|onCancel|关闭弹出框的回调|`(e: MouseEvent \| Event) => void`|`-`|-|
|afterOpen|抽屉打开之后的回调|`() => void`|`-`|-|
|afterClose|抽屉关闭之后的回调|`() => void`|`-`|-|
|getPopupContainer|指定弹出框挂载的父节点|`() => Element`|`() => document.body`|-|
|getChildrenPopupContainer|抽屉里的弹出框 `Select` `Tooltip` 等挂载的容器，默认挂载在对话框内。|`(node: HTMLElement) => Element`|`-`|-|
|autoFocus|是否默认聚焦第一个可聚焦元素，只在 `focusLock` 开启时生效。|`boolean`|`-`|2.13.0|
|focusLock|是否将焦点锁定在弹出框内。|`boolean`|`-`|2.13.0|
