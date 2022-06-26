`````
Component / Data Display

# Image

Show and preview pictures.
`````

%%Content%%

## API

<div class="image-demo-props">

### Image

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|CSSProperties |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|src|Image path|string |`-`|-|
|width|Image width|string \| number |`-`|-|
|height|Image height|string \| number |`-`|-|
|title|Image title|string |`-`|-|
|description|Image description|string |`-`|-|
|actions|Extra operations|ReactNode[] |`-`|-|
|footerPosition|The position of footer|'inner' \| 'outer' |`inner`|-|
|simple|Whether to enable simple mode|boolean |`-`|-|
|loader|Load transition effect, set `true` to show the default loading effect|boolean \| ReactNode |`-`|-|
|loaderClassName|The style of the loader, will override the default transition effect|string \| string[] |`-`|-|
|error|Content displayed in error state|ReactNode |`-`|-|
|preview|Whether to enable preview|boolean |`true`|-|
|previewProps|Preview options (all options are optional) [ImagePreviewProps](#imagepreview)|PartialImagePreviewProps |`-`|-|
|index|Use `Image.PreviewGroup` to wrap the preview index. Generally, you don't need to specify it. When there is a problem with the preview order of multiple images, you can manually specify the preview order of the current `image`|number |`-`|2.23.0|

### Image.Preview

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|CSSProperties |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|src|Image path, The default in Image is the src of Image|string  **(Required)**|`-`|-|
|visible|Whether is visible|boolean |`-`|-|
|defaultVisible|Whether visible by default|boolean |`-`|-|
|breakPoint|The width that triggers the toolbar to switch to simple mode|number |`316`|-|
|maskClosable|Whether click mask to close|boolean |`true`|-|
|closable|Whether display close button|boolean |`true`|2.16.0|
|actions|Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops)|[ImagePreviewActionProps](image#imagepreviewactionprops)[] |`-`|-|
|actionsLayout|The layout of the control bar|string[] |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|scales|The zoom percentage in the current array is used when previewing zooms. If `100%` is not included, the `100%` scale will be automatically added in the most adjacent position.|number[] |`[25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];`|2.30.0|
|onVisibleChange|Callback when visibility changes|(visible: boolean, preVisible: boolean) => void |`-`|-|
|getPopupContainer|Get popup's parent node|() => HTMLElement |`() => document.body`|2.16.0|
|escToExit|Whether to enable pressing `ESC` to close the preview.|boolean |`true`|2.24.0|

### Image.PreviewGroup

Start from `v2.14.0`

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|srcList|Image path list（After setting this property, the information of the `Image` sub-component will no longer be collected)|string[] |`-`|-|
|current|The index of current image (controlled prop)|number |`-`|-|
|defaultCurrent|The default index of first image|number |`-`|-|
|infinite|Whether to loop infinitely|boolean |`-`|-|
|onChange|Callback when image switches|(index: number) => void |`-`|-|
|getPopupContainer|Get popup's parent node|() => HTMLElement |`() => document.body`|2.16.0|
|className|Additional css class|string \| string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|visible|Whether is visible|boolean |`-`|-|
|defaultVisible|Whether visible by default|boolean |`-`|-|
|breakPoint|The width that triggers the toolbar to switch to simple mode|number |`316`|-|
|maskClosable|Whether click mask to close|boolean |`true`|-|
|closable|Whether display close button|boolean |`true`|2.16.0|
|actions|Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops)|[ImagePreviewActionProps](image#imagepreviewactionprops)[] |`-`|-|
|actionsLayout|The layout of the control bar|string[] |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|scales|The zoom percentage in the current array is used when previewing zooms. If `100%` is not included, the `100%` scale will be automatically added in the most adjacent position.|number[] |`[25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];`|2.30.0|
|onVisibleChange|Callback when visibility changes|(visible: boolean, preVisible: boolean) => void |`-`|-|
|escToExit|Whether to enable pressing `ESC` to close the preview.|boolean |`true`|2.24.0|

### ImagePreviewActionProps

Detailed parameters of type `ImagePreviewActionProps` in `<Image.Preview>`.

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|key|Unique identifier|string  **(Required)**|`-`|
|content|content|ReactNode  **(Required)**|`-`|
|getContainer|Because content can only specify content, this function is provided to support custom peripheral elements.Note that if `getContainer` is set, the `Tooltip` displaying `name` will be invalid|(actionElement: ReactNode) => ReactNode |`-`|
|name|name|string |`-`|
|disabled|Whether disabled|boolean |`false`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|

</div>
