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
|preview|Whether to enable preview|boolean |`true`|-|
|simple|Whether to enable simple mode|boolean |`-`|-|
|index|Use `Image.PreviewGroup` to wrap the preview index. Generally, you don't need to specify it. When there is a problem with the preview order of multiple images, you can manually specify the preview order of the current `image`|number |`-`|2.23.0|
|description|Image description|string |`-`|-|
|src|Image path|string |`-`|-|
|title|Image title|string |`-`|-|
|footerPosition|The position of footer|'inner' \| 'outer' |`inner`|-|
|error|Content displayed in error state|ReactNode |`-`|-|
|loader|Load transition effect, set `true` to show the default loading effect|boolean \| ReactNode |`-`|-|
|actions|Extra operations|ReactNode[] |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|height|Image height|string \| number |`-`|-|
|lazyload|lazyload loading [Intersection_Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)|boolean \| IntersectionObserverInit |`-`|2.47.0|
|loaderClassName|The style of the loader, will override the default transition effect|string \| string[] |`-`|-|
|previewProps|Preview options (all options are optional) [ImagePreviewProps](#imagepreview)|PartialImagePreviewProps |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|width|Image width|string \| number |`-`|-|

### Image.Preview

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|closable|Whether display close button|boolean |`true`|2.16.0|
|defaultVisible|Whether visible by default|boolean |`-`|-|
|escToExit|Whether to enable pressing `ESC` to close the preview.|boolean |`true`|2.24.0|
|maskClosable|Whether click mask to close|boolean |`true`|-|
|visible|Whether is visible|boolean |`-`|-|
|breakPoint|The width that triggers the toolbar to switch to simple mode|number |`316`|-|
|src|Image path, The default in Image is the src of Image|string  **(Required)**|`-`|-|
|imgAttributes|Image props, passthrough to the `img` tag in the preview modal|Omit&lt;ImgHTMLAttributes&lt;HTMLImageElement&gt;, 'src'&gt; |`-`|2.39.0|
|extra|Additional nodes add to the image preview area|ReactNode |`-`|2.53.0|
|actions|Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops)|[ImagePreviewActionProps](image#imagepreviewactionprops)[] |`-`|-|
|actionsLayout|The layout of the control bar|string[] |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|className|Additional css class|string \| string[] |`-`|-|
|scales|The zoom percentage in the current array is used when previewing zooms. If `100%` is not included, the `100%` scale will be automatically added in the most adjacent position.|number[] |`[25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];`|2.30.0|
|style|Additional style|CSSProperties |`-`|-|
|getPopupContainer|Get popup's parent node|() => HTMLElement |`() => document.body`|2.16.0|
|imageRender|Rendering of custom IMG elements|(originalNode: ReactElement) => ReactNode |`-`|2.58.0|
|onVisibleChange|Callback when visibility changes|(visible: boolean, preVisible: boolean) => void |`-`|-|

### Image.PreviewGroup

Start from `v2.14.0`

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|closable|Whether display close button|boolean |`true`|2.16.0|
|defaultVisible|Whether visible by default|boolean |`-`|-|
|escToExit|Whether to enable pressing `ESC` to close the preview.|boolean |`true`|2.24.0|
|infinite|Whether to loop infinitely|boolean |`-`|-|
|maskClosable|Whether click mask to close|boolean |`true`|-|
|renderImages|Whether to render the image list for loading images in advance|boolean |`-`|2.58.0|
|visible|Whether is visible|boolean |`-`|-|
|breakPoint|The width that triggers the toolbar to switch to simple mode|number |`316`|-|
|current|The index of current image (controlled prop)|number |`-`|-|
|defaultCurrent|The default index of first image|number |`-`|-|
|imgAttributes|Image props, passthrough to the `img` tag in the preview modal|Omit&lt;ImgHTMLAttributes&lt;HTMLImageElement&gt;, 'src'&gt; |`-`|2.39.0|
|extra|Additional nodes add to the image preview area|ReactNode |`-`|2.53.0|
|actions|Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops)|[ImagePreviewActionProps](image#imagepreviewactionprops)[] |`-`|-|
|actionsLayout|The layout of the control bar|string[] |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|className|Additional css class|string \| string[] |`-`|-|
|scales|The zoom percentage in the current array is used when previewing zooms. If `100%` is not included, the `100%` scale will be automatically added in the most adjacent position.|number[] |`[25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];`|2.30.0|
|srcList|Image path list（After setting this property, the information of the `Image` sub-component will no longer be collected)|string[] |`-`|-|
|style|Additional style|CSSProperties |`-`|-|
|getPopupContainer|Get popup's parent node|() => HTMLElement |`() => document.body`|2.16.0|
|imageRender|Rendering of custom IMG elements|(originalNode: ReactElement) => ReactNode |`-`|2.58.0|
|onChange|Callback when image switches|(index: number) => void |`-`|-|
|onVisibleChange|Callback when visibility changes|(visible: boolean, preVisible: boolean) => void |`-`|-|

### ImagePreviewActionProps

Detailed parameters of type `ImagePreviewActionProps` in `<Image.Preview>`.

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|disabled|Whether disabled|boolean |`-`|
|key|Unique identifier|string  **(Required)**|`-`|
|name|name|string |`-`|
|content|content|ReactNode  **(Required)**|`-`|
|className|Additional css class|string \| string[] |`-`|
|style|Additional style|CSSProperties |`-`|
|getContainer|Because content can only specify content, this function is provided to support custom peripheral elements.Note that if `getContainer` is set, the `Tooltip` displaying `name` will be invalid|(actionElement: ReactNode) => ReactNode |`-`|

</div>
