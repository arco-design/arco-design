`````
组件 / 数据展示

# 头像 Avatar

用作头像显示，可以为图片、图标或字符形式展示。
`````

%%Content%%

## API

### Avatar

|参数名|描述|类型|默认值|
|---|---|---|---|
|autoFixFontSize|是否自动根据头像尺寸调整字体大小。|boolean |`true`|
|size|头像的尺寸大小，单位是 `px`|number |`-`|
|shape|头像的形状，有圆形(circle)和正方形(square)两种|'circle' \| 'square' |`circle`|
|triggerType|可点击的头像交互类型。|'mask' \| 'button' |`button`|
|triggerIcon|可点击的头像交互图标。|ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|triggerIconStyle|交互图标的样式|CSSProperties |`-`|
|onClick|点击回调|(e) => void |`-`|

### Avatar.Group

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|autoFixFontSize|是否自动根据头像尺寸调整字体大小，(优先级低于 Avatar 组件本身)|boolean |`true`|-|
|zIndexAscend|头像组内的头像 `z-index` 递增，默认是递减。|boolean |`-`|2.3.0|
|maxCount|头像组最多显示的头像数量，多余头像将以 `+x` 的形式展示。|number |`-`|2.4.0|
|size|头像的尺寸大小，单位是 `px`，(优先级低于 Avatar 组件本身)|number |`-`|-|
|shape|头像的形状，(优先级低于 Avatar 组件本身)|'circle' \| 'square' |`circle`|-|
|className|节点类名|string \| string[] |`-`|-|
|maxPopoverTriggerProps|多余头像气泡的 `TriggerProps`。|[TriggerProps](trigger#trigger) |`-`|2.4.0|
|maxStyle|多余头像样式。|CSSProperties |`-`|2.4.0|
|style|节点样式|CSSProperties |`-`|-|
