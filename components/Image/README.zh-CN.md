`````
组件 / 数据展示

# 图片 Image

展示和预览图片。
`````

%%Content%%

## API

<div class="image-demo-props">

### Image

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|src|图片获取地址|`string`|`-`|
|width|图片显示宽度|`string \| number`|`-`|
|height|图片显示高度|`string \| number`|`-`|
|title|标题|`string`|`-`|
|description|描述|`string`|`-`|
|actions|额外操作|`ReactNode[]`|`-`|
|footerPosition|底部显示的位置|`'inner' \| 'outer'`|`inner`|
|simple|是否开启简洁模式|`boolean`|`-`|
|loader|加载过渡效果，为 true 显示默认加载效果|`boolean \| ReactNode`|`-`|
|loaderClassName|loader 的样式，将覆盖默认过渡效果|`string \| string[]`|`-`|
|error|error 状态下显示的内容|`ReactNode`|`-`|
|preview|是否开启预览|`boolean`|`true`|
|previewProps|预览的配置项 （所有选项都是可选的）[ImagePreviewProps](#imagepreview)|`PartialImagePreviewProps`|`-`|

### Image.Preview

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|src|图片获取地址, 在 Image 中默认是 Image 的 src|`string` **(必填)**|`-`|-|
|visible|是否可见，受控属性|`boolean`|`-`|-|
|defaultVisible|默认是否可见，非受控|`boolean`|`-`|-|
|breakPoint|触发 toolbar 切换为 simple 模式的宽度|`number`|`316`|-|
|maskClosable|点击 mask 是否触发关闭|`boolean`|`true`|-|
|closable|是否显示关闭按钮|`boolean`|`true`|2.16.0|
|actions|额外操作，[ImagePreviewActionProps](#imagepreviewactionprops)|`ImagePreviewActionProps[]`|`-`|-|
|actionsLayout|控制条的布局|`string[]`|`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|onVisibleChange|切换可见状态触发的事件|`(visible: boolean, preVisible: boolean) => void`|`-`|-|
|getPopupContainer|弹出层挂载的节点|`() => HTMLElement`|`() => document.body`|2.16.0|
|escToExit|按 `ESC` 键关闭预览|`boolean`|`true`|2.24.0|

### Image.PreviewGroup

从 `v2.14.0` 开始支持

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|srcList|图片列表 （设置了本属性之后，将不再收集 Image 子组件的图片信息）|`string[]`|`-`|-|
|current|当前展示的图片的下标 (受控属性)|`number`|`-`|-|
|defaultCurrent|第一张展示的图片的下标|`number`|`-`|-|
|infinite|是否无限循环|`boolean`|`-`|-|
|onChange|切换图片触发的事件|`(index: number) => void`|`-`|-|
|getPopupContainer|弹出层挂载的节点|`() => HTMLElement`|`() => document.body`|2.16.0|
|className|节点类名|`string \| string[]`|`-`|-|
|style|节点样式|`CSSProperties`|`-`|-|
|onVisibleChange|切换可见状态触发的事件|`(visible: boolean, preVisible: boolean) => void`|`-`|-|
|visible|是否可见，受控属性|`boolean`|`-`|-|
|defaultVisible|默认是否可见，非受控|`boolean`|`-`|-|
|breakPoint|触发 toolbar 切换为 simple 模式的宽度|`number`|`316`|-|
|maskClosable|点击 mask 是否触发关闭|`boolean`|`true`|-|
|closable|是否显示关闭按钮|`boolean`|`true`|2.16.0|
|actions|额外操作，[ImagePreviewActionProps](#imagepreviewactionprops)|`ImagePreviewActionProps[]`|`-`|-|
|actionsLayout|控制条的布局|`string[]`|`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|escToExit|按 `ESC` 键关闭预览|`boolean`|`true`|2.24.0|

### ImagePreviewActionProps

`<Image.Preview>` 中类型 `ImagePreviewActionProps` 详细参数。

|参数名|描述|类型|默认值|
|---|---|---|---|
|key|唯一标识|`string` **(必填)**|`-`|
|content|内容|`ReactNode` **(必填)**|`-`|
|getContainer|因为 content 只能定义内容，所以提供这个函数用于支持自定义外围元素，需要注意的是设置了 `getContainer`, 显示 `name` 的 `Tooltip` 将失效。|`(actionElement: ReactNode) => ReactNode`|`-`|
|name|名称|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|className|节点类名|`string \| string[]`|`-`|
|style|节点样式|`CSSProperties`|`-`|

</div>
