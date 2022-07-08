`````
组件 / 通用

# 按钮 Button

按钮是一种命令组件，可发起一个即时操作。
`````

%%Content%%

## API

### Button

|参数名|描述|类型|默认值|
|---|---|---|---|
|disabled|是否禁用|boolean |`-`|
|iconOnly|只有图标，按钮宽高相等。如果指定 `icon` 且没有 children，`iconOnly` 默认为 true|boolean |`-`|
|loading|按钮是否是加载状态|boolean |`-`|
|loadingFixedWidth|当 loading 的时候，不改变按钮的宽度。|boolean |`-`|
|long|按钮宽度随容器自适应。|boolean |`-`|
|href|添加跳转链接，设置此属性，button表现跟a标签一致|string |`-`|
|target|a 链接的 target 属性，href 存在时生效|string |`-`|
|htmlType|按钮原生的 html type 类型|'button' \| 'submit' \| 'reset' |`button`|
|shape|按钮形状，`circle` - 圆形， `round` - 全圆角， `square` - 长方形|'circle' \| 'round' \| 'square' |`square`|
|size|按钮的尺寸|'mini' \| 'small' \| 'default' \| 'large' |`default`|
|status|按钮状态|'warning' \| 'danger' \| 'success' \| 'default' |`default`|
|type|按钮主要分为六种按钮类型：主要按钮、次级按钮、虚框按钮、文字按钮、线性按钮，`default` 为次级按钮。|'default' \| 'primary' \| 'secondary' \| 'dashed' \| 'text' \| 'outline' |`default`|
|icon|设置按钮的图标|ReactNode |`-`|
|anchorProps|a 链接的原生属性，href 存在时生效|HTMLProps&lt;HTMLAnchorElement&gt; |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|onClick|点击按钮的回调|(e: Event) => void |`-`|
