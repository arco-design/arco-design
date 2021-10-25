`````
Component / Other

# ResizeBox

ResizeBox components.
`````

%%Content%%

## API

### ResizeBox

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|width|The width of ResizeBox|`number`|`-`|2.7.0|
|height|The height of ResizeBox|`number`|`-`|2.7.0|
|component|The html tag of ResizeBox|`string`|`div`|-|
|directions|The edges can be Resize, It can be `up`, `down`, `left`, `right`|`Array<'left' \| 'right' \| 'top' \| 'bottom'>`|`['right']`|-|
|resizeIcons|Custom the icon of Split,All four directions are supported|`{top?: ReactNode;bottom?: ReactNode;left?: ReactNode;right?: ReactNode;}`|`{}`|-|
|resizeTriggers|Custom the content of Split,All four directions are supported|`{top?: ReactNode;bottom?: ReactNode;left?: ReactNode;right?: ReactNode;}`|`{}`|-|
|onMovingStart|Callback when the start of resize.|`() => void`|`-`|-|
|onMoving|Callback when resizing|`(e: MouseEvent, size: { width: number; height: number }) => void`|`-`|`size` in `2.7.0`|
|onMovingEnd|Callback when the end of resize|`() => void`|`-`|-|

### ResizeBox.Split

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|component|The html tag of Split|`string`|`div`|-|
|direction|The direction of Split. It can be `horizontal` and `vertical`|`'horizontal' \| 'vertical'`|`horizontal`|-|
|icon|Custom the icon of Split|`ReactNode`|`-`|-|
|trigger|Custom the content of Split|`ReactNode`|`-`|-|
|size|Split size. It can be 0~1 representing a percentage, or a specific number of pixels, ex 300px|`number \| string`|`0.5`|-|
|min|Minimum threshold|`number \| string`|`-`|-|
|max|Maximum threshold|`number \| string`|`-`|-|
|panes|panes,[firstPane, secondPane]|`ReactNode[]` **(Required)**|`-`|-|
|disabled|Whether the split is disabled|`boolean`|`-`|-|
|onMovingStart|Callback when the start of resize|`() => void`|`-`|-|
|onMoving|Callback when moving|`(e: MouseEvent, size: number \| string) => void`|`-`|`size` in `2.14.0`|
|onMovingEnd|Callback when the end of resize|`() => void`|`-`|-|
