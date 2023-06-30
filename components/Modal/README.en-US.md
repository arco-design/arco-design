`````
Component / Feedback

# Modal

Open a floating layer on the current page to carry related operations.
`````

%%Content%%

## API

### Modal

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|alignCenter|Modal is centered vertically and horizontally|boolean |`true`|-|
|autoFocus|Whether to focus the first focusable element|boolean |`true`|-|
|closable|Whether to show the close button in TitleBar|boolean |`-`|-|
|confirmLoading|Whether The `ok` button is loading|boolean |`-`|-|
|escToExit|Whether enable press `ESC` to close Modal|boolean |`true`|-|
|focusLock|Whether to lock the focus in the Modal|boolean |`true`|-|
|mask|Whether show mask|boolean |`true`|-|
|maskClosable|Whether enable click mask to close Modal.|boolean |`true`|-|
|mountOnEnter|Whether to render DOM when first opened|boolean |`true`|-|
|simple|Simple Mode, no dividing line, the bottom button is displayed in the center.The Alter Modal called by the default method will use `simple` mode. When set to true, the close icon is not display|boolean |`-`|-|
|unmountOnExit|Whether to destroy DOM after closed|boolean |`-`|-|
|visible|Whether the Modal is visible|boolean |`-`|-|
|cancelText|The text of `cancel` button|ReactNode |`-`|-|
|closeIcon|Customize the close icon|ReactNode |`-`|2.21.0|
|okText|The text of `ok` button|ReactNode |`-`|-|
|title|The title of Modal|string \| ReactNode |`-`|-|
|cancelButtonProps|The props of `cancel` button|ButtonProps |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|maskStyle|The style of mask|CSSProperties |`-`|2.6.0|
|okButtonProps|The props of `ok` button|ButtonProps |`-`|-|
|onOk|Callback when click ok button|(e?: MouseEvent) =&gt; Promise&lt;any&gt; \| void |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|wrapClassName|The class of the wrapped dom|string \| string[] |`-`|-|
|wrapStyle|The style of the wrapped dom|CSSProperties |`-`|2.16.0|
|afterClose|Callback when Modal closed|() => void |`-`|-|
|afterOpen|Callback when Modal opened|() => void |`-`|-|
|footer|Custom `footer`. if it is null, the footer will not be displayed.|ReactNode \| ((cancelButtonNode: ReactNode, okButtonNode: ReactNode) => ReactNode) |`-`|2.12.0|
|getChildrenPopupContainer|The Popup in Modal. Such as `Select` and `Tooltip` are mounted in the Modal|(node: HTMLElement) => Element |`-`|-|
|getPopupContainer|Specify the parent node of the Modal|() => Element |`() => document.body`|-|
|modalRender|Custom the render of Modal|(modalNode: ReactNode) => ReactNode |`-`|2.2.0|
|onCancel|Callback when click cancel button|() => void |`-`|-|

### Modal.method(config)

Including the following:

* `Modal.confirm(config)`
* `Modal.info(config)`
* `Modal.success(config)`
* `Modal.warning(config)`
* `Modal.error(config)`

The above functions will return an object, which can be used to update or close the Modal. Ex:

```js
const info = Modal.info({ title: 'Info' });
info.update({ title: 'Updated Title' });
info.close();
```

`config`'s details (extends all Modal's props):

|Property|Description|Type|Default|
|---|:---:|:---:|---:|
|content|The content of Modal|`ReactNode`|`-`|
|icon|The icon of Modal|`ReactNode`|`-`|

### Modal.config Options

Global Set `Modal.confirm|success|info|error|warning` Props, Similar `Message.config` Options, The `<Modal />` will get the context config from `ConfigProvider`.

```js
Modal.config({
  // Custom prefix
  prefixCls: 'arco',
  // Display in Simple Mode
  simple: true
});
```

### Modal.destroyAll

`Modal.destroyAll` will close all confirm modal (including `Modal.confirm` `Modal.info` `Modal.success` `Modal.error` `Modal.warning`), generally used when routing changes, Close all popups.

```js
Modal.destroyAll();
```

### Modal.useModal

Use method function to open Modal, such as `Modal.confirm` `Modal.warning`, because it is directly rendered through `ReactDOM.render`, so it is not in the context, so you cannot get `context`.
If you want to get context, you can use `useModal`, Put the `contextHolder` in the context.

```js
const [modal, contextHolder] = Modal.useModal();

<Context.Provider>
   {contextHolder}
   <Button onClick={() => modal.warning({ title:'Title', content:'content' })}>Open</Button>
</Context.Provider>
```
