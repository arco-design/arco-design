---
file: interface
---

`````
组件 / 反馈

# 对话框 Modal

在当前页面打开一个浮层，承载相关操作。
`````

%%Content%%

## API

%%Props%%

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
