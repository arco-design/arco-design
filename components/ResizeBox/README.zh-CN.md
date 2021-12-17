`````
组件 / 其他

# 伸缩框 ResizeBox

伸缩框组件。
`````

%%Content%%

## API

### ResizeBox

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|width|宽度，受控属性|`number`|`-`|2.7.0|
|height|高度，受控属性|`number`|`-`|2.7.0|
|component|伸缩框的 html 标签|`string`|`div`|-|
|directions|可以进行伸缩的边，有上、下、左、右可以使用，默认是右方向。|`Array<'left' \| 'right' \| 'top' \| 'bottom'>`|`['right']`|-|
|resizeIcons|定制伸缩杆的图标，四个方向都支持定制。|`{top?: ReactNode;bottom?: ReactNode;left?: ReactNode;right?: ReactNode;}`|`{}`|-|
|resizeTriggers|定制伸缩杆的内容，四个方向都支持定制。|`{top?: ReactNode;bottom?: ReactNode;left?: ReactNode;right?: ReactNode;}`|`{}`|-|
|onMovingStart|开始拖拽之前的回调|`() => void`|`-`|-|
|onMoving|拖拽中的回调|`(e: MouseEvent, size: { width: number; height: number }) => void`|`-`|`size` in `2.7.0`|
|onMovingEnd|拖拽结束之后的回调|`() => void`|`-`|-|

### ResizeBox.Split

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|-|
|className|节点类名|`string \| string[]`|`-`|-|
|component|分割框的 html 标签|`string`|`div`|-|
|direction|分割方向分为水平 `horizontal` 和垂直 `vertical`，默认是水平分割|`'horizontal' \| 'vertical'`|`horizontal`|-|
|icon|定制伸缩杆的图标|`ReactNode`|`-`|-|
|trigger|定制伸缩杆的内容|`ReactNode`|`-`|-|
|size|分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number \| string`|`0.5`|-|
|min|最小阈值|`number \| string`|`-`|-|
|max|最大阈值|`number \| string`|`-`|-|
|panes|面板，[firstPane, secondPane]|`ReactNode[]` **(必填)**|`-`|-|
|disabled|禁用|`boolean`|`-`|-|
|onMovingStart|开始拖拽之前的回调|`() => void`|`-`|-|
|onMoving|拖拽中的回调|`(e: MouseEvent, size: number \| string) => void`|`-`|`size` in `2.14.0`|
|onMovingEnd|拖拽结束之后的回调|`() => void`|`-`|-|
|onPaneResize|面板大小变化的回调|`(paneContainers: HTMLElement[]) => void`|`-`|2.25.0|

### ResizeBox.SplitGroup in `2.27.0`

|参数名|描述|类型|默认值|
|---|---|---|---|
|style|节点样式|`CSSProperties`|`-`|
|className|节点类名|`string \| string[]`|`-`|
|component|分割框的 html 标签|`string`|`div`|
|direction|分割方向分为水平 `horizontal` 和垂直 `vertical`，默认是水平分割|`'horizontal' \| 'vertical'`|`horizontal`|
|icon|定制伸缩杆的图标|`ReactNode`|`-`|
|panes|面板|`SplitGroupPane[]` **(必填)**|`-`|
|onMovingStart|开始拖拽之前的回调|`(activeIndex: number) => void`|`-`|
|onMoving|拖拽中的回调, `size` 参数是各个面板占的像素值|`(e: MouseEvent, size: string[], activeIndex: number) => void`|`-`|
|onMovingEnd|拖拽结束之后的回调|`(activeIndex: number) => void`|`-`|
|onPaneResize|面板大小变化的回调|`(paneContainers: HTMLElement[]) => void`|`-`|

### ResizeBox.SplitGroup.CollapsedConfig

|参数名|描述|类型|默认值|
|---|---|---|---|
|icon|快速折叠按钮的icon|`ReactNode`|`-`|
|onClick|点击快速折叠的回调|`(e, collapsed, activeIndex, direction: 'prev' \| 'next') => void`|`-`|

### ResizeBox.SplitGroup.Pane

|参数名|描述|类型|默认值|
|---|---|---|---|
|content|当前面板的内容|`ReactNode` **(必填)**|`-`|
|size|分割的大小，可以是 0~1 代表百分比，或具体数值的像素，如 300px|`number \| string`|`-`|
|min|最小阈值，优先级比 `max`高，并且会影响相邻面板的阈值。|`number \| string`|`-`|
|max|最大阈值|`number \| string`|`-`|
|disabled|禁用，将不会展示伸缩杆。|`boolean`|`-`|
|collapsible|是否支持快速折叠;|`\| boolean\| {prev?: boolean \| CollapsedConfig;next?: boolean \| CollapsedConfig;}`|`-`|
|resizable|是否支持拖拽伸缩|`boolean`|`true`|
|trigger|定制伸缩杆内容, 参数分别表示向前快速收缩、拖拽伸缩触发器、向后快速收缩的触发器|`(prevNode: ReactNode, resizeNode: ReactNode, nextNode: ReactNode) => ReactNode`|`-`|
