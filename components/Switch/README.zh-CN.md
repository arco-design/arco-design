`````
组件 / 数据输入

# 开关 Switch

互斥性的操作控件，用户可打开或关闭某个功能。
`````

%%Content%%

## API

### Switch

|参数名|描述|类型|默认值|
|---|---|---|---|
|checked|开关是否打开|boolean |`-`|
|defaultChecked|默认是否选中|boolean |`-`|
|disabled|是否禁用|boolean |`-`|
|loading|加载中状态|boolean |`-`|
|size|开关的尺寸，有 `small` 和 `default` 可供选择。|'small' \| 'default' |`-`|
|type|三种样式类型|'circle' \| 'round' \| 'line' |`circle`|
|checkedIcon|开关打开时，按钮上显示的图标|ReactNode |`-`|
|checkedText|开关打开时的文案，small 尺寸不生效。|ReactNode |`-`|
|uncheckedIcon|开关关闭时，按钮上显示的图标|ReactNode |`-`|
|uncheckedText|开关关闭时的文案，small 尺寸不生效。|ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|onChange|点击开关的回调|(value: boolean, event) => void |`-`|
