`````
组件 / 反馈

# 警告提示 Alert

向用户显示警告的信息时，通过警告提示，展现需要关注的信息。
`````

%%Content%%

## API

### Alert

|参数名|描述|类型|默认值|
|---|---|---|---|
|banner|是否用作顶部公告|boolean |`-`|
|closable|是否可关闭|boolean |`-`|
|showIcon|是否显示图标|boolean |`true`|
|type|警告的类型|'info' \| 'success' \| 'warning' \| 'error' |`info`|
|action|自定义操作项|ReactNode |`-`|
|closeElement|自定义关闭按钮|ReactNode |`-`|
|content|内容|ReactNode |`-`|
|icon|可以指定自定义图标，`showIcon` 为 `true` 时生效。|ReactNode |`-`|
|title|标题|ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|afterClose|关闭动画结束后执行的回调|() => void |`-`|
|onClose|关闭的回调|(e) => void |`-`|
