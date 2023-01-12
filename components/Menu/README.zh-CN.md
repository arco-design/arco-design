`````
组件 / 导航

# 菜单 Menu

收纳、排列并展示一系列选项的列表。
`````

%%Content%%

## API

### Menu

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|accordion|开启手风琴效果|boolean |`-`|-|
|autoOpen|默认展开所有多级菜单|boolean |`-`|-|
|autoScrollIntoView|是否自动滚动选中项目到可见区域|boolean |`-`|-|
|collapse|是否水平折叠收起菜单|boolean |`-`|-|
|hasCollapseButton|是否内置折叠按钮|boolean |`-`|-|
|selectable|菜单选项是否可选|boolean |`true`|-|
|levelIndent|层级之间的缩进量|number |`-`|-|
|mode|菜单类型，目前支持垂直（vertical）、水平菜单（horizontal）、弹出（pop）|'vertical' \| 'horizontal' \| 'pop' \| 'popButton' |`vertical`|-|
|theme|菜单风格|'light' \| 'dark' |`light`|-|
|className|节点类名|string \| string[] |`-`|-|
|defaultOpenKeys|初始展开的子菜单 key 数组|string[] |`-`|-|
|defaultSelectedKeys|初始选中的菜单项 key 数组|string[] |`-`|-|
|ellipsis|水平菜单是否自动溢出省略|\| boolean\| {text?: ReactNode;} |`true`|2.24.0|
|icons|用于定制图标|{horizontalArrowDown?: ReactNode \| null;popArrowRight?: ReactNode \| null;collapseDefault?: ReactNode \| null;collapseActive?: ReactNode \| null;} |`-`|-|
|openKeys|展开的子菜单 key 数组（受控模式）|string[] |`-`|-|
|scrollConfig|滚动到可见区域的配置项，接收所有[scroll-into-view-if-needed](https://github.com/stipsan/scroll-into-view-if-needed)的参数|{ [key: string]: any } |`-`|-|
|selectedKeys|选中的菜单项 key 数组（受控模式）|string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|tooltipProps|弹出模式下可接受所有 `ToolTip` 的 `Props`|Partial&lt;[TooltipProps](tooltip#tooltip)&gt; |`-`|-|
|triggerProps|弹出模式下可接受所有 `Trigger` 的 `Props`|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|-|
|onClickMenuItem|点击菜单项的回调|(key: string, event, keyPath: string[]) => any |`-`|`event` in 2.15.0, `keyPath` in 2.19.0|
|onClickSubMenu|点击子菜单标题的回调|(key: string, openKeys: string[], keyPath: string[]) => void |`-`|`keyPath` in 2.19.0|
|onCollapseChange|折叠状态改变时的回调|(collapse: boolean) => void |`-`|-|

### Menu.SubMenu

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|selectable|是否将多级菜单头也作为一个菜单项，支持点击选中等状态。|boolean |`-`|-|
|key|唯一标志|string  **(必填)**|`-`|-|
|title|子菜单的标题|string \| ReactNode |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|triggerProps|弹出模式下可接受所有 `Trigger` 的 `Props`|Partial&lt;[TriggerProps](trigger#trigger)&gt; |`-`|2.19.0|
|popup|是否强制使用弹出模式，`level` 表示当前子菜单的层级|boolean \| ((level: number) => boolean) |`-`|2.8.0|

### Menu.ItemGroup

|参数名|描述|类型|默认值|
|---|---|---|---|
|title|菜单组的标题|string \| ReactNode |`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Menu.Item

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|disabled|菜单项禁止选中|boolean |`-`|-|
|key|唯一标志|string  **(必填)**|`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|wrapper|配置最外层标签，可以是 html 标签或是组件|string \| React.FC&lt;any&gt; \| React.ComponentClass&lt;any&gt; |`div`|2.16.0|
