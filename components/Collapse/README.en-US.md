`````
Component / Data Display

# Collapse

The content area that can be collapsed/expanded.
`````

%%Content%%

## API

### Collapse

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|activeKey|Key of the active panel|`string \| string[]`|`-`|
|defaultActiveKey|Key of the default active panel|`string \| string[]`|`-`|
|accordion|Whether to render as Accordion|`boolean`|`-`|
|expandIcon|Custom collapse icon|`ReactNode`|`-`|
|expandIconPosition|Position of collapse icon|`'left' \| 'right'`|`left`|
|bordered|Whether to render border|`boolean`|`true`|
|lazyload|If true, invisible panels will not be rendered on mount|`boolean`|`true`|
|destroyOnHide|If true, panels will be unmounted on collapsing|`boolean`|`-`|
|onChange|Callback when the active panel changes|`(key: string, keys: string[], e) => void`|`-`|

### Collapse.Item

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|contentStyle|Additional styles of the content area.|`CSSProperties`|`-`|2.15.0|
|header|Header content|`React.ReactNode`|`-`|-|
|name|Unique identifier key of the current panel item|`string` **(Required)**|`-`|-|
|disabled|If true, the panel is not collapsible|`boolean`|`-`|-|
|expandIcon|Custom expand icon|`ReactNode`|`-`|-|
|showExpandIcon|Whether to show expand icon|`boolean`|`true`|-|
|extra|The extra element in the corner|`ReactNode`|`-`|-|
|destroyOnHide|If true, item will be unmounted on collapsing. (Higher priority than `Collapse.destroyOnHide`)|`boolean`|`-`|-|
