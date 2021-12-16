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
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|

### Typography.Title

|参数名|描述|类型|默认值|
|---|---|---|---|
|heading|标题级别，相当于 `h1` `h2` `h3` `h4` `h5` `h6`|`1 \| 2 \| 3 \| 4 \| 5 \| 6`|`1`|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|type|文本类型|`'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'`|`-`|
|bold|粗体|`boolean`|`-`|
|disabled|禁用状态|`boolean`|`-`|
|mark|标记样式|`boolean \| { color: string }`|`-`|
|underline|下划线样式|`boolean`|`-`|
|delete|删除线样式|`boolean`|`-`|
|code|代码块样式|`boolean`|`-`|
|copyable|开启复制功能|`\| boolean\| {text?: string;onCopy?: (text: string) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];}`|`-`|
|editable|开启可编辑功能|`\| boolean\| {editing?: boolean;onStart?: (text) => void;onChange?: (text) => void;onEnd?: (text) => void;}`|`-`|
|ellipsis|自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)|`boolean \| EllipsisConfig`|`-`|

### Typography.Paragraph

|参数名|描述|类型|默认值|
|---|---|---|---|
|blockquote|长引用|`boolean`|`-`|
|spacing|段落的的行高，长文本(大于5行)的时候推荐使用默认行高，短文本(小于等于3行)推荐使用 `close` 紧密的行高。|`'default' \| 'close'`|`default`|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|type|文本类型|`'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'`|`-`|
|bold|粗体|`boolean`|`-`|
|disabled|禁用状态|`boolean`|`-`|
|mark|标记样式|`boolean \| { color: string }`|`-`|
|underline|下划线样式|`boolean`|`-`|
|delete|删除线样式|`boolean`|`-`|
|code|代码块样式|`boolean`|`-`|
|copyable|开启复制功能|`\| boolean\| {text?: string;onCopy?: (text: string) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];}`|`-`|
|editable|开启可编辑功能|`\| boolean\| {editing?: boolean;onStart?: (text) => void;onChange?: (text) => void;onEnd?: (text) => void;}`|`-`|
|ellipsis|自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)|`boolean \| EllipsisConfig`|`-`|

### Typography.Text

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|type|文本类型|`'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'`|`-`|
|bold|粗体|`boolean`|`-`|
|disabled|禁用状态|`boolean`|`-`|
|mark|标记样式|`boolean \| { color: string }`|`-`|
|underline|下划线样式|`boolean`|`-`|
|delete|删除线样式|`boolean`|`-`|
|code|代码块样式|`boolean`|`-`|
|copyable|开启复制功能|`\| boolean\| {text?: string;onCopy?: (text: string) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];}`|`-`|
|editable|开启可编辑功能|`\| boolean\| {editing?: boolean;onStart?: (text) => void;onChange?: (text) => void;onEnd?: (text) => void;}`|`-`|
|ellipsis|自动溢出省略（只支持字符串），具体参数配置看 [EllipsisConfig](#ellipsisconfig)|`boolean \| EllipsisConfig`|`-`|

### EllipsisConfig

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|cssEllipsis|自动溢出省略（只支持字符串），在简单的单行省略情况下，会默认使用 css 处理省略，避免复杂计算。|`boolean`|`true`|-|
|rows|显示省略的行数|`number`|`1`|-|
|expandable|是否支持展开/折叠|`boolean`|`-`|-|
|ellipsisStr|省略号|`string`|`...`|-|
|suffix|后缀|`string`|`-`|-|
|expandNodes|配置 折叠 / 展开 的元素|`ReactNode[]`|`-`|-|
|onEllipsis|在省略发生改变的时候触发，通常是窗口resize情况会触发。|`(isEllipsis: boolean) => void`|`-`|-|
|onExpand|在折叠/展开状态发生改变的时候触发，通常是点击折叠/展开按钮触发。|`(isExpand: boolean, e) => void`|`-`|e in `2.27.0`|
|showTooltip|配置省略时的弹出框|`boolean \| { type?: 'tooltip' \| 'popover'; props?: Record<string, any> }`|`-`|-|
