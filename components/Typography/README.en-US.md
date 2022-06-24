`````
Component / General

# Typography

Used to display titles, paragraphs, and text content.
`````

%%Content%%

## API

### Typography

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|

### Typography.Title

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|heading|Heading level, equivalent to `h1` `h2` `h3` `h4` `h5` `h6`|`1 \| 2 \| 3 \| 4 \| 5 \| 6`|`1`|-|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|type|Text type|`'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'`|`-`|-|
|bold|Bold style|`boolean`|`-`|-|
|disabled|Disabled style|`boolean`|`-`|-|
|mark|Mark style|`boolean \| { color: string }`|`-`|-|
|underline|Underline style|`boolean`|`-`|-|
|delete|Strikethrough style|`boolean`|`-`|-|
|code|Code block style|`boolean`|`-`|-|
|copyable|Whether to be copyable|`\| boolean\| {text?: string;onCopy?: (text: string, e) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];}`|`-`|`onCopy` params `e` in `2.31.0`|
|editable|If editable. Can control edit state when is object|`\| boolean\| {editing?: boolean;onStart?: (text, e) => void;onChange?: (text) => void;onEnd?: (text) => void;}`|`-`|`onStart` params `e` in `2.31.0`|
|ellipsis|Auto overflow omitted, see [EllipsisConfig](#ellipsisconfig)|`boolean \| EllipsisConfig`|`-`|-|

### Typography.Paragraph

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|blockquote|Blockquote style|`boolean`|`-`|-|
|spacing|The line height of the paragraph. The default line height is recommended for long text (more than 5 lines),and the close line height of `close` is recommended for short text (less than or equal to 3 lines).|`'default' \| 'close'`|`default`|-|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|type|Text type|`'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'`|`-`|-|
|bold|Bold style|`boolean`|`-`|-|
|disabled|Disabled style|`boolean`|`-`|-|
|mark|Mark style|`boolean \| { color: string }`|`-`|-|
|underline|Underline style|`boolean`|`-`|-|
|delete|Strikethrough style|`boolean`|`-`|-|
|code|Code block style|`boolean`|`-`|-|
|copyable|Whether to be copyable|`\| boolean\| {text?: string;onCopy?: (text: string, e) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];}`|`-`|`onCopy` params `e` in `2.31.0`|
|editable|If editable. Can control edit state when is object|`\| boolean\| {editing?: boolean;onStart?: (text, e) => void;onChange?: (text) => void;onEnd?: (text) => void;}`|`-`|`onStart` params `e` in `2.31.0`|
|ellipsis|Auto overflow omitted, see [EllipsisConfig](#ellipsisconfig)|`boolean \| EllipsisConfig`|`-`|-|

### Typography.Text

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|type|Text type|`'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning'`|`-`|-|
|bold|Bold style|`boolean`|`-`|-|
|disabled|Disabled style|`boolean`|`-`|-|
|mark|Mark style|`boolean \| { color: string }`|`-`|-|
|underline|Underline style|`boolean`|`-`|-|
|delete|Strikethrough style|`boolean`|`-`|-|
|code|Code block style|`boolean`|`-`|-|
|copyable|Whether to be copyable|`\| boolean\| {text?: string;onCopy?: (text: string, e) => void;icon?: ReactNode;tooltips?: [ReactNode, ReactNode];}`|`-`|`onCopy` params `e` in `2.31.0`|
|editable|If editable. Can control edit state when is object|`\| boolean\| {editing?: boolean;onStart?: (text, e) => void;onChange?: (text) => void;onEnd?: (text) => void;}`|`-`|`onStart` params `e` in `2.31.0`|
|ellipsis|Auto overflow omitted, see [EllipsisConfig](#ellipsisconfig)|`boolean \| EllipsisConfig`|`-`|-|

### EllipsisConfig

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|cssEllipsis|Automatic overflow omission (only strings are supported). In the case of simple single-line, css will be used by default to handle ellipsis to avoid complicated calculations.|`boolean`|`true`|-|
|rows|The number of omitted rows|`number`|`1`|-|
|expandable|Whether to support expand|`boolean`|`-`|-|
|ellipsisStr|ellipsis string|`string`|`...`|-|
|suffix|Suffix|`string`|`-`|-|
|expandNodes|Configure expand elements|`ReactNode[]`|`-`|-|
|onEllipsis|Callback when the ellipsis state changes, usually triggered by window resize。|`(isEllipsis: boolean) => void`|`-`|-|
|onExpand|Callback when the expand state changes, usually triggered by clicking the button|`(isExpand: boolean, e) => void`|`-`|e in `2.27.0`|
|showTooltip|Show Tooltip when configure ellipsis|`boolean \| { type?: 'tooltip' \| 'popover'; props?: Record<string, any> }`|`-`|-|
|expanded|whether to expand|`boolean`|`-`|`2.33.0`|
|defaultExpanded|Default expanded state|`boolean`|`false`|`2.33.0`|


## About exceeding omission

Exceeding and omitting are currently implemented in two ways: **js dichotomy calculation truncation value** and **CSS exceeding and omitting**. The two advantages and disadvantages are as follows:

|Metrics|js Dichotomy|CSS Omit|
|---|---|---|
|Performance|Poor (multiple operations of dom calculation by dichotomy)|Good|
|Function|Good|Poor (string only)|

- By default, **js dichotomy** is used to continuously truncate the calculation to obtain the omitted critical value. At the same time, recalculation will be triggered multiple times when `resize`. Therefore, heavy use has a greater impact on performance, but this method will not insert additional style dom under the typesetting component.

- Enabling `ellipsis.cssEllipsis` will omit the display by **CSS style**, which will significantly improve the performance in a large number of usage scenarios. But because the `text-overflow` style needs to be added, two `<span/>` dom will be added under the `.arco-typography` node

**Note that the `2.36.0` version refactors and optimizes the excess omission, resulting in the main breaking changes as follows:**
- When `ellipsis.cssEllipsis` is enabled, an extra style dom is inserted under the typesetting component in order to add `text-overflow`, causing the dom structure to change.
- `ellipsis.cssEllipsis` supports multi-line elision scenarios, and the default value is changed from `true` to `false` (to avoid DOM structure changes after upgrade).
