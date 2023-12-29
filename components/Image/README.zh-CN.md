`````
组件 / 数据展示

# 图片 Image

展示和预览图片。
`````

%%Content%%

## API

<div class="image-demo-props">

### Image

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|preview|是否开启预览|boolean |`true`|-|
|simple|是否开启简洁模式|boolean |`-`|-|
|index|使用 `Image.PreviewGroup`包裹时的预览索引，一般不用指定，当多图预览顺序出现问题时，可手动指定当前 `image` 的预览顺序|number |`-`|2.23.0|
|description|描述|string |`-`|-|
|src|图片获取地址|string |`-`|-|
|title|标题|string |`-`|-|
|footerPosition|底部显示的位置|'inner' \| 'outer' |`inner`|-|
|error|error 状态下显示的内容|ReactNode |`-`|-|
|loader|加载过渡效果，为 true 显示默认加载效果|boolean \| ReactNode |`-`|-|
|actions|额外操作|ReactNode[] |`-`|-|
|className|节点类名|string \| string[] |`-`|-|
|height|图片显示高度|string \| number |`-`|-|
|lazyload|开启懒加载 [Intersection_Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)|boolean \| IntersectionObserverInit |`-`|2.47.0|
|loaderClassName|loader 的样式，将覆盖默认过渡效果|string \| string[] |`-`|-|
|previewProps|预览的配置项 （所有选项都是可选的）[ImagePreviewProps](#imagepreview)|PartialImagePreviewProps |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|width|图片显示宽度|string \| number |`-`|-|

### Image.Preview

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|closable|是否显示关闭按钮|boolean |`true`|2.16.0|
|defaultVisible|默认是否可见，非受控|boolean |`-`|-|
|escToExit|按 `ESC` 键关闭预览|boolean |`true`|2.24.0|
|maskClosable|点击 mask 是否触发关闭|boolean |`true`|-|
|visible|是否可见，受控属性|boolean |`-`|-|
|breakPoint|触发 toolbar 切换为 simple 模式的宽度|number |`316`|-|
|src|图片获取地址, 在 Image 中默认是 Image 的 src|string  **(必填)**|`-`|-|
|imgAttributes|图片属性，透传至预览弹窗中的 `img` 标签上|Omit&lt;ImgHTMLAttributes&lt;HTMLImageElement&gt;, 'src'&gt; |`-`|2.39.0|
|extra|自定义图片预览区域的额外节点|ReactNode |`-`|2.53.0|
|actions|额外操作，[ImagePreviewActionProps](#imagepreviewactionprops)|[ImagePreviewActionProps](image#imagepreviewactionprops)[] |`-`|-|
|actionsLayout|控制条的布局|string[] |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|className|节点类名|string \| string[] |`-`|-|
|scales|在预览缩放时会使用当前数组中的缩放百分比。若不包含 `100%`，则会自动添加在最相邻的位置。|number[] |`[25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];`|2.30.0|
|style|节点样式|CSSProperties |`-`|-|
|getPopupContainer|弹出层挂载的节点|() => HTMLElement |`() => document.body`|2.16.0|
|imageRender|自定义 IMG 元素的渲染|(originalNode: ReactElement) => ReactNode |`-`|2.58.0|
|onVisibleChange|切换可见状态触发的事件|(visible: boolean, preVisible: boolean) => void |`-`|-|

### Image.PreviewGroup

从 `v2.14.0` 开始支持

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|closable|是否显示关闭按钮|boolean |`true`|2.16.0|
|defaultVisible|默认是否可见，非受控|boolean |`-`|-|
|escToExit|按 `ESC` 键关闭预览|boolean |`true`|2.24.0|
|infinite|是否无限循环|boolean |`-`|-|
|maskClosable|点击 mask 是否触发关闭|boolean |`true`|-|
|renderImages|是否渲染图片列表，用于提前加载图片|boolean |`-`|2.58.0|
|visible|是否可见，受控属性|boolean |`-`|-|
|breakPoint|触发 toolbar 切换为 simple 模式的宽度|number |`316`|-|
|current|当前展示的图片的下标 (受控属性)|number |`-`|-|
|defaultCurrent|第一张展示的图片的下标|number |`-`|-|
|imgAttributes|图片属性，透传至预览弹窗中的 `img` 标签上|Omit&lt;ImgHTMLAttributes&lt;HTMLImageElement&gt;, 'src'&gt; |`-`|2.39.0|
|extra|自定义图片预览区域的额外节点|ReactNode |`-`|2.53.0|
|actions|额外操作，[ImagePreviewActionProps](#imagepreviewactionprops)|[ImagePreviewActionProps](image#imagepreviewactionprops)[] |`-`|-|
|actionsLayout|控制条的布局|string[] |`['fullScreen', 'rotateRight', 'rotateLeft', 'zoomIn', 'zoomOut', 'originalSize', 'extra']`|-|
|className|节点类名|string \| string[] |`-`|-|
|scales|在预览缩放时会使用当前数组中的缩放百分比。若不包含 `100%`，则会自动添加在最相邻的位置。|number[] |`[25, 33, 50, 67, 75, 80, 90, 100, 110, 125, 150, 175, 200, 250, 300, 400, 500];`|2.30.0|
|srcList|图片列表 （设置了本属性之后，将不再收集 Image 子组件的图片信息）|string[] |`-`|-|
|style|节点样式|CSSProperties |`-`|-|
|getPopupContainer|弹出层挂载的节点|() => HTMLElement |`() => document.body`|2.16.0|
|imageRender|自定义 IMG 元素的渲染|(originalNode: ReactElement) => ReactNode |`-`|2.58.0|
|onChange|切换图片触发的事件|(index: number) => void |`-`|-|
|onVisibleChange|切换可见状态触发的事件|(visible: boolean, preVisible: boolean) => void |`-`|-|

### ImagePreviewActionProps

`<Image.Preview>` 中类型 `ImagePreviewActionProps` 详细参数。

|参数名|描述|类型|默认值|
|---|---|---|---|
|disabled|是否禁用|boolean |`-`|
|key|唯一标识|string  **(必填)**|`-`|
|name|名称|string |`-`|
|content|内容|ReactNode  **(必填)**|`-`|
|className|节点类名|string \| string[] |`-`|
|style|节点样式|CSSProperties |`-`|
|getContainer|因为 content 只能定义内容，所以提供这个函数用于支持自定义外围元素，需要注意的是设置了 `getContainer`, 显示 `name` 的 `Tooltip` 将失效。|(actionElement: ReactNode) => ReactNode |`-`|

</div>
