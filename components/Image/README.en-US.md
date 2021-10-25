`````
Component / Data Display

# Image

Show and preview pictures.
`````

%%Content%%

## API

<div class="image-demo-props">

### Image

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|
|className|Additional css class|`string \| string[]`|`-`|
|src|Image path|`string`|`-`|
|width|Image width|`string \| number`|`-`|
|height|Image height|`string \| number`|`-`|
|title|Image title|`string`|`-`|
|description|Image description|`string`|`-`|
|actions|Extra operations|`ReactNode[]`|`-`|
|footerPosition|The position of footer|`'inner' \| 'outer'`|`inner`|
|simple|Whether to enable simple mode|`boolean`|`-`|
|loader|Load transition effect, set `true` to show the default loading effect|`boolean \| ReactNode`|`-`|
|loaderClassName|The style of the loader, will override the default transition effect|`string \| string[]`|`-`|
|error|Content displayed in error state|`ReactNode`|`-`|
|preview|Whether to enable preview|`boolean`|`true`|
|previewProps|Preview options (all options are optional) [ImagePreviewProps](#imagepreview)|`PartialImagePreviewProps`|`-`|

### Image.Preview

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|style|Additional style|`CSSProperties`|`-`|-|
|className|Additional css class|`string \| string[]`|`-`|-|
|src|Image path, The default in Image is the src of Image|`string` **(Required)**|`-`|-|
|visible|Whether is visible|`boolean`|`-`|-|
|defaultVisible|Whether visible by default|`boolean`|`-`|-|
|breakPoint|The width that triggers the toolbar to switch to simple mode|`number`|`316`|-|
|maskClosable|Whether click mask to close|`boolean`|`true`|-|
|closable|Whether display close button|`boolean`|`true`|2.16.0|
|actions|Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops)|`ImagePreviewActionProps[]`|`-`|-|
|actionsLayout|The layout of the control bar|`string[]`|`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|onVisibleChange|Callback when visibility changes|`(visible: boolean, preVisible: boolean) => void`|`-`|-|
|getPopupContainer|Get popup's parent node|`() => HTMLElement`|`() => document.body`|2.16.0|

### Image.PreviewGroup

Start from `v2.14.0`

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|srcList|Image path list（After setting this property, the information of the `Image` sub-component will no longer be collected)|`string[]`|`-`|-|
|current|The index of current image (controlled prop)|`number`|`-`|-|
|defaultCurrent|The default index of first image|`number`|`-`|-|
|infinite|Whether to loop infinitely|`boolean`|`-`|-|
|onChange|Callback when image switches|`(index: number) => void`|`-`|-|
|getPopupContainer|Get popup's parent node|`() => HTMLElement`|`() => document.body`|2.16.0|
|className|Additional css class|`string \| string[]`|`-`|-|
|style|Additional style|`CSSProperties`|`-`|-|
|onVisibleChange|Callback when visibility changes|`(visible: boolean, preVisible: boolean) => void`|`-`|-|
|visible|Whether is visible|`boolean`|`-`|-|
|defaultVisible|Whether visible by default|`boolean`|`-`|-|
|breakPoint|The width that triggers the toolbar to switch to simple mode|`number`|`316`|-|
|maskClosable|Whether click mask to close|`boolean`|`true`|-|
|closable|Whether display close button|`boolean`|`true`|2.16.0|
|actions|Extra operations, [ImagePreviewActionProps](#imagepreviewactionprops)|`ImagePreviewActionProps[]`|`-`|-|
|actionsLayout|The layout of the control bar|`string[]`|`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|

### ImagePreviewActionProps

Detailed parameters of type `ImagePreviewActionProps` in `<Image.Preview>`.

|Property|Description|Type|DefaultValue|
|---|---|---|---|
|key|Unique identifier|`string` **(Required)**|`-`|
|content|content|`ReactNode` **(Required)**|`-`|
|getContainer|Because content can only specify content, this function is provided to support custom peripheral elements.Note that if `getContainer` is set, the `Tooltip` displaying `name` will be invalid|`(actionElement: ReactNode) => ReactNode`|`-`|
|name|name|`string`|`-`|
|disabled|Whether disabled|`boolean`|`false`|
|className|Additional css class|`string \| string[]`|`-`|
|style|Additional style|`CSSProperties`|`-`|

</div>
