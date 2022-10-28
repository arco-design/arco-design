`````
Component / Data Display

# Collapse

The content area that can be collapsed/expanded.
`````

%%Content%%

## API

### Collapse

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|accordion|Whether to render as Accordion|boolean |`-`|-|
|bordered|Whether to render border|boolean |`true`|-|
|destroyOnHide|If true, panels will be unmounted on collapsing|boolean |`-`|-|
|lazyload|If true, invisible panels will not be rendered on mount|boolean |`true`|-|
|expandIconPosition|Position of collapse icon|'left' \| 'right' |`left`|-|
|triggerRegion|The area that can trigger the collapse operation|'header' \| 'icon' |`-`|2.41.0|
|expandIcon|Custom collapse icon|ReactNode |`-`|-|
|activeKey|Key of the active panel|string \| string[] |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|defaultActiveKey|Key of the default active panel|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|onChange|Callback when the active panel changes|(key: string, keys: string[], e) => void |`-`|-|

### Collapse.Item

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|destroyOnHide|If true, item will be unmounted on collapsing. (Higher priority than `Collapse.destroyOnHide`)|boolean |`-`|-|
|disabled|If true, the panel is not collapsible|boolean |`-`|-|
|showExpandIcon|Whether to show expand icon|boolean |`true`|-|
|name|Unique identifier key of the current panel item|string  **(Required)**|`-`|-|
|expandIcon|Custom expand icon|ReactNode |`-`|-|
|extra|The extra element in the corner|ReactNode |`-`|-|
|header|Header content|ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|contentStyle|Additional styles of the content area.|CSSProperties |`-`|2.15.0|
|style|Additional style|CSSProperties |`-`|-|
