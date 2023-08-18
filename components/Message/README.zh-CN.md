`````
组件 / 反馈

# 全局提示 Message

由用户的操作触发的轻量级全局反馈。
`````

%%Content%%

## API

### Message

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|closable|是否显示关闭按钮|boolean |`true`|-|
|showIcon|是否显示图标|boolean |`true`|-|
|duration|自动关闭的时间，单位为 `ms`|number |`3000`|-|
|id|当前消息的唯一标识，可以用来更新消息|string |`-`|-|
|transitionClassNames|消息弹出动画的类名，见 react-transition-group 的 `classNames`|string |`-`|-|
|position|消息的位置，分为 `top` 上方和 `bottom` 下方|'top' \| 'bottom' |`-`|-|
|closeIcon|自定义右上角关闭按钮|ReactNode |`-`|2.50.0|
|icon|自定义图标|ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|content|消息内容|ReactNode \| string  **(必填)**|`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|transitionTimeout|动画持续时间，见 react-transition-group 的 `timeout`|{enter?: number;exit?: number;} |`{enter: 100, exit: 300}`|2.43.0|
|onClose|关闭时的回调|() => void |`-`|-|

### 使用方法

- `Message.info(content: String)` / `Message.info(config: Object)`
- `Message.success(content: String)` / `Message.success(config: Object)`
- `Message.warning(content: String)` / `Message.warning(config: Object)`
- `Message.error(content: String)` / `Message.error(config: Object)`
- `Message.normal(content: String)` / `Message.normal(config: Object)`
- `Message.loading(content: String)` / `Message.loading(config: Object)`
- `Message.clear()`

### 全局设置

`Message.config(options)`

|参数名|描述|类型|默认值|
|---|:---:|:---:|---:|
|maxCount|最大通知数量|`number`|`-`|
|getContainer|放置通知的容器|`() => HTMLElement`|`() => document.body`|
|duration|通知自动关闭的时间|`number`|`3000`|
|prefixCls|类名前缀|`string`|`arco`|

