`````
组件 / 反馈

# 通知提醒框 Notification

全局展示通知提醒，将信息及时有效的传达给用户。
`````

%%Content%%

## API

### Notification

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|closable|是否显示关闭按钮|boolean |`true`|-|
|showIcon|是否显示图标|boolean |`true`|-|
|duration|自动关闭的时间，单位为 `ms`|number |`3000`|-|
|id|当前通知的唯一标识，可以用来更新消息|string |`-`|-|
|position|消息的位置，分为 `topLeft` 左上方、`topRight` 右上方、`bottomLeft` 左下方和 `bottomRight` 右下方|'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight' |`-`|-|
|btn|添加操作按钮|ReactNode |`-`|-|
|closeIcon|自定义右上角关闭按钮|ReactNode |`-`|2.50.0|
|icon|自定义图标|ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|content|通知内容|ReactNode \| string  **(必填)**|`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|title|通知标题|ReactNode \| string |`-`|-|
|onClose|关闭时的回调|() => void |`-`|-|

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
