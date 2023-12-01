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
|autoFocus|是否默认聚焦第一个可聚焦元素，只在 `focusLock` 开启时生效。|boolean |`true`|2.13.0|
|closable|是否显示右上角关闭按钮|boolean |`true`|-|
|confirmLoading|确认按钮是否为加载中状态|boolean |`-`|-|
|escToExit|按 `ESC` 键关闭|boolean |`true`|2.10.0|
|focusLock|是否将焦点锁定在弹出框内。|boolean |`true`|2.13.0|
|mask|是否显示遮罩|boolean |`true`|-|
|maskClosable|点击蒙层是否可以关闭|boolean |`true`|-|
|mountOnEnter|是否在初次打开对话框时才渲染 dom。|boolean |`true`|-|
|unmountOnExit|是否在隐藏的时候销毁 DOM 结构|boolean |`-`|-|
|visible|是否显示弹出框|boolean |`-`|-|
|zIndex|设置抽屉的 zIndex|number |`-`|2.42.0|
|placement|抽屉的方向 `top` `right` `bottom` `left`|'top' \| 'right' \| 'bottom' \| 'left' |`right`|-|
|cancelText|取消按钮文案|ReactNode |`-`|-|
|closeIcon|自定义右上角关闭按钮|ReactNode |`-`|2.49.0|
|footer|自定义按钮确认和取消按钮，为 null 的话没有按钮组|ReactNode |`-`|-|
|okText|确认按钮文案|ReactNode |`-`|-|
|title|弹出框的标题（设置为 null 时，不显示标题栏）|ReactNode |`-`|-|
|bodyStyle|内容区域的样式|CSSProperties |`-`|2.9.0|
|cancelButtonProps|取消按钮的 props|ButtonProps |`-`|2.26.0|
|className|节点类名|string \| string[] |`-`|-|
|headerStyle|头部的样式|CSSProperties |`-`|2.9.0|
|height|抽屉的高度，`placement`为 `top` `bottom` 时生效|string \| number |`250`|-|
|maskStyle|设置遮罩层的样式|CSSProperties |`-`|-|
|okButtonProps|确认按钮的 props|ButtonProps |`-`|2.26.0|
|style|节点样式|CSSProperties |`-`|-|
|width|抽屉的宽度，`placement`为 `left` `right` 时生效|string \| number |`250`|-|
|wrapClassName|设置外层容器的类名|string \| string[] |`-`|-|
|afterClose|抽屉关闭之后的回调|() => void |`-`|-|
|afterOpen|抽屉打开之后的回调|() => void |`-`|-|
|getChildrenPopupContainer|抽屉里的弹出框 `Select` `Tooltip` 等挂载的容器，默认挂载在对话框内。|(node: HTMLElement) => Element |`-`|-|
|getPopupContainer|指定弹出框挂载的父节点|() => Element |`() => document.body`|-|
|onCancel|关闭弹出框的回调|(e: MouseEvent \| Event) => void |`-`|-|
|onOk|点击确认按钮的回调|(e: Event) => void |`-`|-|
