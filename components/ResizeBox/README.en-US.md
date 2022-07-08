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
|height|The height of ResizeBox|number |`-`|2.7.0|
|width|The width of ResizeBox|number |`-`|2.7.0|
|component|The html tag of ResizeBox|string |`div`|-|
|directions|The edges can be Resize, It can be `up`, `down`, `left`, `right`|Array<'left' \| 'right' \| 'top' \| 'bottom'> |`['right']`|-|
|className|Additional css class|string \| string[] |`-`|-|
|resizeIcons|Custom the icon of Split,All four directions are supported|{top?: ReactNode;bottom?: ReactNode;left?: ReactNode;right?: ReactNode;} |`{}`|-|
|resizeTriggers|Custom the content of Split,All four directions are supported|{top?: ReactNode;bottom?: ReactNode;left?: ReactNode;right?: ReactNode;} |`{}`|-|
|style|Additional style|CSSProperties |`-`|-|
|onMoving|Callback when resizing|(e: MouseEvent, size: { width: number; height: number }) => void |`-`|`size` in `2.7.0`|
|onMovingEnd|Callback when the end of resize|() => void |`-`|-|
|onMovingStart|Callback when the start of resize.|() => void |`-`|-|

### ResizeBox.Split

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|disabled|Whether the split is disabled|boolean |`-`|-|
|component|The html tag of Split|string |`div`|-|
|direction|The direction of Split. It can be `horizontal` and `vertical`|'horizontal' \| 'vertical' \| 'horizontal-reverse' \| 'vertical-reverse' |`horizontal`|`reverse` in `2.35.0`|
|icon|Custom the icon of Split|ReactNode |`-`|-|
|trigger|Custom the content of Split|ReactNode |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|max|Maximum threshold|number \| string |`-`|-|
|min|Minimum threshold|number \| string |`-`|-|
|panes|panes,[firstPane, secondPane]|ReactNode[]  **(Required)**|`-`|-|
|size|Split size. It can be 0~1 representing a percentage, or a specific number of pixels, ex 300px|number \| string |`0.5`|-|
|style|Additional style|CSSProperties |`-`|-|
|onMoving|Callback when moving|(e: MouseEvent, size: number \| string) => void |`-`|`size` in `2.14.0`|
|onMovingEnd|Callback when the end of resize|() => void |`-`|-|
|onMovingStart|Callback when the start of resize|() => void |`-`|-|
|onPaneResize|Callback when pane resized|(paneContainers: HTMLElement[]) => void |`-`|2.25.0|

### ResizeBox.SplitGroup in `2.27.0`

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|component|The html tag of SplitGroup|string |`div`|
|direction|The direction of Split. It can be `horizontal` and `vertical`|'horizontal' \| 'vertical' |`horizontal`|
|icon|Custom the icon of Split|ReactNode |`-`|
|className|Additional css class|string \| string[] |`-`|
|panes|panes|[SplitGroupPane](resize-box#resizeboxsplitgrouppane)[]  **(Required)**|`-`|
|style|Additional style|CSSProperties |`-`|
|onMoving|Callback when moving|(e: MouseEvent, size: string[], activeIndex: number) => void |`-`|
|onMovingEnd|Callback when the end of resize|(activeIndex: number) => void |`-`|
|onMovingStart|Callback when the start of resize|(activeIndex: number) => void |`-`|
|onPaneResize|Callback when pane resized|(paneContainers: HTMLElement[]) => void |`-`|

### ResizeBox.SplitGroup.CollapsedConfig

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|onClick|Click the callback for quick folding|(e, collapsed, activeIndex, direction: 'prev' \| 'next') => void |`-`|
|icon|Quick collapse button icon|ReactNode |`-`|

### ResizeBox.SplitGroup.Pane

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|disabled|disabled, the split bar will not be displayed|boolean |`-`|
|resizable|Whether to support drag and drop|boolean |`true`|
|content|The contents of the current panel|ReactNode  **(Required)**|`-`|
|collapsible|Whether to support fast collapsed|\| boolean\| {prev?: boolean \| [CollapsedConfig](resize-box#resizeboxsplitgroupcollapsedconfig);next?: boolean \| [CollapsedConfig](resize-box#resizeboxsplitgroupcollapsedconfig);} |`-`|
|max|Minimum threshold|number \| string |`-`|
|min|Maximum threshold, The priority is higher than `max` and will affect the threshold of adjacent panels.|number \| string |`-`|
|size|The size of the segmentation can be 0~1 representing a percentage, or a pixel with a specific value, such as 300px|number \| string |`-`|
|trigger|Customize the content of the Split|(prevNode: ReactNode, resizeNode: ReactNode, nextNode: ReactNode) => ReactNode |`-`|
