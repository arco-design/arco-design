`````
组件 / 反馈

# 对话框 Modal

在当前页面打开一个浮层，承载相关操作。
`````

%%Content%%

## API

### Modal

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|alignCenter|弹出框垂直水平居中|boolean |`true`|-|
|autoFocus|是否默认聚焦第一个可聚焦元素，只在 `focusLock` 开启时生效。|boolean |`true`|-|
|closable|是否显示右上角的关闭按钮|boolean |`-`|-|
|confirmLoading|确认按钮加载中|boolean |`-`|-|
|escToExit|按 `ESC` 键关闭|boolean |`true`|-|
|focusLock|是否将焦点锁定在弹出框内|boolean |`true`|-|
|mask|是否显示遮罩|boolean |`true`|-|
|maskClosable|点击蒙层是否可以关闭|boolean |`true`|-|
|mountOnEnter|是否在初次打开对话框时才渲染 dom|boolean |`true`|-|
|simple|简洁模式的样式，没有分割线，底部按钮居中显示。默认通过方法调用的提示类型的弹窗会展示`simple`样式。设置为true时，默认不显示右上角关闭图标|boolean |`-`|-|
|unmountOnExit|是否在隐藏之后销毁DOM结构|boolean |`-`|-|
|visible|弹出框是否可见|boolean |`-`|-|
|cancelText|取消按钮文案|ReactNode |`-`|-|
|closeIcon|自定义右上角的关闭按钮节点|ReactNode |`-`|2.21.0|
|okText|确认按钮文案|ReactNode |`-`|-|
|title|弹出框的标题|string \| ReactNode |`-`|-|
|cancelButtonProps|取消按钮的 props|ButtonProps |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|maskStyle|蒙层的样式|CSSProperties |`-`|2.6.0|
|okButtonProps|确认按钮的 props|ButtonProps |`-`|-|
|onOk|点击确认按钮的回调|(e?: MouseEvent) =&gt; Promise&lt;any&gt; \| void |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|wrapClassName|弹出框外层 dom 类名|string \| string[] |`-`|-|
|wrapStyle|弹出框外层样式|CSSProperties |`-`|2.16.0|
|afterClose|弹框关闭之后的回调|() => void |`-`|-|
|afterOpen|弹框打开之后的回调|() => void |`-`|-|
|footer|自定义页脚，传入 null 则不显示|ReactNode \| ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode) |`-`|2.12.0|
|getChildrenPopupContainer|对话框里的弹出框 `Select` `Tooltip` 等挂载的容器，默认挂载在对话框内。|(node: HTMLElement) => Element |`-`|-|
|getPopupContainer|指定弹出框挂载的父节点|() => Element |`() => document.body`|-|
|modalRender|自定义渲染对话框|(modalNode: ReactNode) => ReactNode |`-`|2.2.0|
|onCancel|关闭弹出框的回调|() => void |`-`|-|

### Modal.method(config)
包括以下几种：
* `Modal.confirm(config)`
* `Modal.info(config)`
* `Modal.success(config)`
* `Modal.warning(config)`
* `Modal.error(config)`

以上函数都会返回一个对象，可用来更新或者关闭对话框。如：

```js
const info = Modal.info({ title: 'Info' });
info.update({ title: 'Updated Title' });
info.close();
```

`config` 的具体参数如下所示（继承所有 Modal 的参数）：

|参数名|描述|类型|默认值|
|---|:---:|:---:|---:|
|content|对话框的内容|`ReactNode`|`-`|
|icon|自定义图标|`ReactNode \| null`|`-`|

### Modal.config 方法

全局设置 `Modal.confirm|success|info|error|warning` 的属性，类似 `Message.config` 方法，`<Modal />` 的使用方式会从 `ConfigProvider` 获取上下文配置。

```js
Modal.config({
  // 自定义前缀
  prefixCls: 'arco',
  // 是否静态方法以简洁样式展示信息
  simple: true
});
```

### Modal.destroyAll 方法

调用 `Modal.destroyAll`，会关闭所有弹出的确认框（包括 `Modal.confirm` `Modal.info` `Modal.success` `Modal.error` `Modal.warning`），一般用于路由改动时，关闭所有弹出。

```js
Modal.destroyAll();
```

### Modal.useModal 方法

通过方法去使用对话框，像是 `Modal.confirm` `Modal.warning`，因为是通过 `ReactDOM.render` 直接渲染，所以不在上下文中，因此拿不到 `context`。
如果希望获取上下文 `context`，那么可以通过 `useModal` 去通过 hook 的方法调用，将 `contextHolder` 放到上下文中。

```js
const [modal, contextHolder] = Modal.useModal();

<Context.Provider>
  {contextHolder}
  <Button onClick={() => modal.warning({ title: 'Title', content: 'content' })}>Open</Button>
</Context.Provider>
```
