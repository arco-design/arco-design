`````
组件 / 数据展示

# 折叠面板 Collapse

可以折叠 / 展开的内容区域。
`````

%%Content%%

## API

### Collapse

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|accordion|是否是手风琴模式|boolean |`-`|-|
|bordered|无边框样式|boolean |`true`|-|
|destroyOnHide|是否销毁被折叠的面板|boolean |`-`|-|
|lazyload|设置为 `true` 时，挂载时不会渲染被隐藏的面板。|boolean |`true`|-|
|expandIconPosition|展开图标的位置|'left' \| 'right' |`left`|-|
|triggerRegion|可触发折叠操作的区域|'header' \| 'icon' |`-`|2.41.0|
|expandIcon|自定义展开图标|ReactNode |`-`|-|
|activeKey|当前面板选中值|string \| string[] |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultActiveKey|默认展开的面板|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|onChange|展开面板改变时触发|(key: string, keys: string[], e) => void |`-`|-|

### Collapse.Item

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|destroyOnHide|面板被折叠时是否销毁节点，优先级高于 `Collapse` 的 `destroyOnHide`|boolean |`-`|-|
|disabled|是否禁用|boolean |`-`|-|
|showExpandIcon|是否展示展开按钮|boolean |`true`|-|
|name|对应 activeKey，当前面板组件的的唯一标识|string  **(必填)**|`-`|-|
|expandIcon|自定义展开图标|ReactNode |`-`|-|
|extra|额外节点|ReactNode |`-`|-|
|header|折叠面板头部内容，允许自定义|ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|contentStyle|内容区域的附加样式。|CSSProperties |`-`|2.15.0|
|style|节点样式|CSSProperties |`-`|-|
