---
file: interface
---

`````
Component / Feedback

# Modal

Open a floating layer on the current page to carry related operations.
`````

%%Content%%

## API

%%Props%%

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
