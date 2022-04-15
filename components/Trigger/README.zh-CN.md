`````
组件 / 其他

# 触发器 Trigger

用于对元素添加 hover, click, focus 等事件，并且弹出下拉框。
`````

%%Content%%

## API

### Trigger

|参数名|描述|类型|默认值|版本|
|---|---|---|---|---|
|className|节点类名|`string \| string[]`|`-`|-|
|style|弹出框（外部）的样式|`CSSProperties`|`-`|-|
|popupStyle|弹出框（内部）的样式|`CSSProperties`|`-`|-|
|alignPoint|弹出层跟随鼠标位置|`boolean`|`-`|-|
|autoAlignPopupWidth|自动对齐子元素的宽度设置弹出框的宽度|`boolean`|`-`|-|
|autoAlignPopupMinWidth|自动对齐子元素的宽度设置弹出框的最小宽度|`boolean`|`-`|-|
|classNames|动画类名|`string`|`fadeId`|-|
|duration|动画过渡时间|`number \| { exit?: number; enter?: number; appear?: number }`|`200`|-|
|childrenPrefix|设置这个参数后，打开弹出后，children 上会添加一个名为 `${childrenPrefix}-open` 的类。|`string`|`-`|-|
|disabled|是否禁用|`boolean`|`-`|-|
|mouseEnterDelay|mouseenter 触发延时的毫秒数|`number`|`100`|-|
|mouseLeaveDelay|mouseleave 触发延时的毫秒数|`number`|`100`|-|
|focusDelay|focus 触发延时的毫秒数|`number`|`-`|-|
|getDocument|在该元素上执行 clickOutside，触发弹出框关闭|`() => Element`|`() => window.document`|-|
|getPopupContainer|设置弹出内容所插入的父元素|`(node: HTMLElement) => Element`|`-`|-|
|unmountOnExit|隐藏后是否销毁 DOM 结构|`boolean`|`true`|-|
|trigger|触发方式|`\| 'hover'\| 'click'\| 'focus'\| 'contextMenu'\| Array<'hover' \| 'click' \| 'focus' \| 'contextMenu'>`|`hover`|-|
|position|弹出位置，一共有 12 个方位可供选择|`\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb'`|`bottom`|-|
|popup|弹出框的内容|`() => ReactNode`|`-`|-|
|autoFitPosition|是否根据空间自动调整弹出框的位置|`boolean`|`true`|-|
|popupHoverStay|是否在鼠标移出触发节点，移入弹出框时保留弹出框。|`boolean`|`true`|-|
|blurToHide|是否在触发节点失去焦点的时候关闭弹出框，仅在 `trigger` 中含有 `focus` 时生效|`boolean`|`true`|-|
|mouseLeaveToClose|是否在鼠标移出触发节点和弹出层的时候关闭弹出层|`boolean`|`true`|2.22.0|
|clickToClose|是否能通过点击触发节点来关闭弹出框|`boolean`|`true`|-|
|clickOutsideToClose|是否在点击空白处（触发节点和弹出框以外的区域）时关闭弹出层。 关闭时会触发 `onVisibleChange`。|`boolean`|`true`|-|
|escToClose|是否允许按 `ESC` 键关闭弹出框。|`boolean`|`false`|-|
|onClick|按钮点击事件（`trigger` 包含 `click` 时生效）|`(popupVisible: boolean) => void`|`-`|-|
|onClickOutside|点击触发节点和弹出框以外的区域的回调。|`Function`|`-`|-|
|popupAlign|调整弹出框的位置，有四个属性值，`left`, `right`, `top`, `bottom`，分别表示向该方向移动几个像素。具体可查看 [示例](/react/components/trigger#设置弹窗位置偏移量)|`{left?: number \| [number, number];right?: number \| [number, number];top?: number \| [number, number];bottom?: number \| [number, number];}`|`{}`|-|
|defaultPopupVisible|默认弹出框开启或关闭|`boolean`|`-`|-|
|popupVisible|设置弹出框开启或关闭|`boolean`|`-`|-|
|onVisibleChange|显示或隐藏时触发的回调|`(visible: boolean) => void`|`-`|-|
|autoFixPosition|当内容发生变化导致内容区域尺寸发生变化，自动进行重新定位。|`boolean`|`true`|-|
|showArrow|是否展示箭头元素|`boolean`|`-`|-|
|arrowProps|箭头元素的所有 html 参数|`HTMLAttributes<HTMLDivElement>`|`-`|-|
|updateOnScroll|是否在容器滚动时更新弹出框的位置|`boolean`|`-`|2.32.0|

### `onVisibleChange`的触发时机说明

- `trigger`包含`click`时
  1. 鼠标点击空白处，会触发`onVisibleChange`，隐藏弹出层。设置 `clickOutsideToClose=false` 可以阻止触发。
  2. 鼠标点击触发节点，例如示例中的 `Button`，会触发`onVisibleChange`，隐藏/显示弹出层。在弹出层展示状态下，如果设置 `clickToClose=false`，则再点击触发节点，将不会隐藏弹出层。

  **也可以不设置onVisibleChange，完全由外部控制是否显示。**

- `trigger`包含`contextMenu`时
  1. 鼠标点击空白处，会触发`onVisibleChange`，隐藏弹出层。设置 `clickOutsideToClose=false` 可以阻止触发。
  2. 在children上鼠标点击右键，会触发`onVisibleChange`，显示弹出层。

- `trigger` 包含 `hover` 时
  1. 鼠标从弹出层移出，并未在`mouseLeaveDelay`时间内移入触发节点，会触发`onVisibleChange`，隐藏弹出层。
  2. 鼠标从触发节点移出，并未在`mouseLeaveDelay`时间内移入弹出层，会触发`onVisibleChange`，隐藏弹出层。

  **如果设置了`popupHoverStay=false`，则鼠标无法移入弹出层。在trigger包含hover时，点击空白处不会隐藏弹窗，因为可能引起onVisibleChange被多次触发。可以在 onClickOutside 执行必要的逻辑 **

- `trigger` 包含 `focus` 时
  1. 触发节点失去焦点，就会触发`onVisibleChange`，隐藏弹出层。
  2. 当设置`blurToHide=false`时，点击空白处会触发`onVisibleChange`，隐藏弹出层。设置 `clickOutsideToClose=false` 可以阻止触发。

  **如果不期望失去焦点隐藏弹出层，可设置 `blurToHide=false`**


## 常见问题

1. 设置了 `getPopupContainer` 后，弹出层位置不对？
   组件默认 `autoFitPosition` 属性为 `true`，也就是说组件会根据弹出层的尺寸，在视口中的位置以及所挂载的父元素来自动调整弹出层的位置。
   例如设置 `position=top` ，但是上方空间不足，弹出层会被遮住，组件就会根据情况来判断是否将弹出层展示在触发元素的下方。
   如果设置了 `getPopupContainer`，弹出层的样式属性`left`最小为0，也就是最小距离父元素的左边界为0，避免超出父元素，导致被遮挡。

