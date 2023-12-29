`````
组件 / 通用

# 排版 Typography

用于展示标题、段落、文本内容。
`````

%%Content%%

## API

### Typography

|参数名|描述|类型|默认值|
|---|---|---|---|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|

### Typography.Title

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|bold|粗体|boolean |`-`|-|
|code|代码块样式|boolean |`-`|-|
|delete|删除线样式|boolean |`-`|-|
|disabled|禁用状态|boolean |`-`|-|
|underline|下划线样式|boolean |`-`|-|
|type|文本类型|'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|ellipsis|自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)|boolean \| [EllipsisConfig](typography#ellipsisconfig) |`-`|-|
|heading|标题级别，相当于 `h1` `h2` `h3` `h4` `h5` `h6`|1 \| 2 \| 3 \| 4 \| 5 \| 6 |`1`|-|
|mark|标记样式|boolean \| { color: string } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|copyable|开启复制功能|\| boolean\| {text?: string;onCopy?: (text: string, e) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];tooltipProps?: [TooltipProps](tooltip#tooltip);} |`-`|`onCopy` params `e` in `2.31.0`|
|editable|开启可编辑功能|\| boolean\| {editing?: boolean;tooltipProps?: [TooltipProps](tooltip#tooltip);onStart?: (text, e) => void;onChange?: (text) => void;onEnd?: (text) => void;} |`-`|`onStart` params `e` in `2.31.0`|

### Typography.Paragraph

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|blockquote|长引用|boolean |`-`|-|
|bold|粗体|boolean |`-`|-|
|code|代码块样式|boolean |`-`|-|
|delete|删除线样式|boolean |`-`|-|
|disabled|禁用状态|boolean |`-`|-|
|underline|下划线样式|boolean |`-`|-|
|spacing|段落的的行高，长文本(大于5行)的时候推荐使用默认行高，短文本(小于等于3行)推荐使用 `close` 紧密的行高。|'default' \| 'close' |`default`|-|
|type|文本类型|'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|ellipsis|自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)|boolean \| [EllipsisConfig](typography#ellipsisconfig) |`-`|-|
|mark|标记样式|boolean \| { color: string } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|copyable|开启复制功能|\| boolean\| {text?: string;onCopy?: (text: string, e) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];tooltipProps?: [TooltipProps](tooltip#tooltip);} |`-`|`onCopy` params `e` in `2.31.0`|
|editable|开启可编辑功能|\| boolean\| {editing?: boolean;tooltipProps?: [TooltipProps](tooltip#tooltip);onStart?: (text, e) => void;onChange?: (text) => void;onEnd?: (text) => void;} |`-`|`onStart` params `e` in `2.31.0`|

### Typography.Text

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|bold|粗体|boolean |`-`|-|
|code|代码块样式|boolean |`-`|-|
|delete|删除线样式|boolean |`-`|-|
|disabled|禁用状态|boolean |`-`|-|
|underline|下划线样式|boolean |`-`|-|
|type|文本类型|'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|ellipsis|自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)|boolean \| [EllipsisConfig](typography#ellipsisconfig) |`-`|-|
|mark|标记样式|boolean \| { color: string } |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|copyable|开启复制功能|\| boolean\| {text?: string;onCopy?: (text: string, e) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];tooltipProps?: [TooltipProps](tooltip#tooltip);} |`-`|`onCopy` params `e` in `2.31.0`|
|editable|开启可编辑功能|\| boolean\| {editing?: boolean;tooltipProps?: [TooltipProps](tooltip#tooltip);onStart?: (text, e) => void;onChange?: (text) => void;onEnd?: (text) => void;} |`-`|`onStart` params `e` in `2.31.0`|

### EllipsisConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|cssEllipsis|自动溢出省略（只支持字符串），在大量使用情况下建议开启提高性能。|boolean |`-`|`2.36.0` 将默认值改为 `false` 并支持多行CSS省略。|
|defaultExpanded|默认展开|boolean |`-`|`2.33.0`|
|expandable|显示展开/折叠按钮|boolean |`-`|-|
|expanded|是否展开|boolean |`-`|`2.33.0`|
|rows|显示省略的行数|number |`1`|-|
|ellipsisStr|省略号|string |`...`|-|
|suffix|后缀|string |`-`|-|
|showTooltip|配置省略时的弹出框|boolean \| { type?: 'tooltip' \| 'popover'; props?: Record&lt;string, any&gt; } |`-`|-|
|expandNodes|配置 折叠 / 展开 的元素|ReactNode[] |`-`|-|
|onEllipsis|在省略发生改变的时候触发，通常是窗口resize情况会触发。|(isEllipsis: boolean) => void |`-`|-|
|onExpand|在折叠/展开状态发生改变的时候触发，通常是点击折叠/展开按钮触发。|(isExpand: boolean, e) => void |`-`|e in `2.27.0`|

## 关于超出省略

超出省略目前通过两种方式实现分别是 **js二分法计算截断值** 和 **CSS超出省略** 两种优缺点如下：

|指标|js二分法|CSS省略|
|---|---|---|
|性能|差(二分法多次操作dom计算)|好|
|功能|好|差（只支持字符串)|

- 默认使用 **js二分法** 不断进行截断计算从而得到省略临界值，同时 `resize` 时还会多次触发重新计算。所以在大量使用对性能影响较大，但此方法不会在排版组件下插入额外样式dom。

- 开启 `ellipsis.cssEllipsis` 将通过 **CSS样式** 进行省略展示，对于大量使用场景下会有显著性能提高。但因为需要添加 `text-overflow` 样式，`.arco-typography` 节点下将会新增两个 `<span/>` dom.

**注意 `2.36.0` 版本对超出省略进行重构优化，造成Breaking Change 主要如下：**
- 开启 `ellipsis.cssEllipsis` 时，为了添加 `text-overflow` 在排版组件下插入了额外样式 dom，造成 dom 结构变化。
- `ellipsis.cssEllipsis` 支持多行省略场景，并且默认值由 `true` 变为 `false` （规避升级后 dom 结构变化）。
