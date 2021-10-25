`````
Component / Data Display

# Tag

Used for information selection, screening and classification. Users use tags for information feedback and interactive operations.
`````

%%Content%%

## API

### Tag

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|color|The background color of Tag|`string`|`-`|
|size|The size of Tag|`'small' \| 'default' \| 'medium' \| 'large'`|`default`|
|visible|Whether the Tag is visible|`boolean`|`-`|
|closable|Whether the Tag is closable|`boolean`|`-`|
|checkable|Whether the Tag is checkable|`boolean`|`-`|
|defaultChecked|Initial checked state|`boolean`|`-`|
|checked|Used for setting the currently selected value(Controlled Component)|`boolean`|`-`|
|icon|Set icon|`ReactNode`|`-`|
|closeIcon|Custom Close Icon|`ReactNode`|`-`|
|onClose|Callback when the tag closed|`(e) => Promise<any> \| void`|`-`|
|onCheck|Callback when checked the tag|`(checked: boolean) => void`|`-`|
