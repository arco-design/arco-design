---
file: interface
---

`````
组件 / 反馈

# 通知提醒框 Notification

全局展示通知提醒，将信息及时有效的传达给用户。
`````

%%Content%%

## API

%%Props%%

### 使用方法

- `Notification.info(config)`
- `Notification.success(config)`
- `Notification.warning(config)`
- `Notification.error(config)`
- `Notification.normal(config)`
- `Notification.remove(id)`
- `Notification.clear()`

### 全局设置

`Notification.config(options)`

|参数名|描述|类型|默认值|
|---|:---:|:---:|---:|
|maxCount|最大通知数量|`number`|`-`|
|getContainer|放置通知的容器|`() => HTMLElement`|`() => document.body`|
|duration|通知自动关闭的时间|`number`|`3000`|
|prefixCls|类名前缀|`string`|`arco`|
