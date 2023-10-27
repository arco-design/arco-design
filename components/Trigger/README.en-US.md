`````
Component / Other

# Trigger

Used to pop up a drop-down box by hovering, focusing, or clicking on a element.
`````

%%Content%%

## API

### Trigger

|Property|Description|Type|DefaultValue|Version|
|---|---|---|---|---|
|alignPoint|The popup will align mouse position|boolean |`-`|-|
|autoAlignPopupMinWidth|Set the minimum width of the popup by the width of the child element|boolean |`-`|-|
|autoAlignPopupWidth|Set the width of the popup by the width of the child element|boolean |`-`|-|
|autoFitPosition|Whether to automatically adjust the position of the popup according to the viewport|boolean |`true`|-|
|autoFixPosition|Whether to automatically reposition when the popup's size changes.|boolean |`true`|-|
|blurToHide|Whether close the popup when the child node losing focus. Only work when the `trigger` containers `focus`|boolean |`true`|-|
|clickToClose|Whether to allow close the popup by clicking the child node.When trigger contains click, contextMenu, the default is true. otherwise false|boolean |`-`|-|
|containerScrollToClose|Whether to close the popup when the container is scrolled|boolean |`-`|2.34.0|
|defaultPopupVisible|Whether the popup is visible by default|boolean |`-`|-|
|disabled|Whether to disable|boolean |`-`|-|
|escToClose|Whether to allow close the popup by pressing `ESC`.|boolean |`-`|-|
|mouseLeaveToClose|Whether to allow close the popup by clicking the child node.|boolean |`true`|2.22.0|
|popupHoverStay|Whether the popup is visible when the mouse hovers over the popup.|boolean |`true`|-|
|popupVisible|Whether the popup is visible|boolean |`-`|-|
|showArrow|Whether to display arrow node|boolean |`-`|-|
|unmountOnExit|Whether to destroy the popup when hidden|boolean |`true`|-|
|updateOnScroll|Whether to update the popover's position when the container is scrolled|boolean |`-`|2.32.0|
|focusDelay|Delay time to show when focus. unit: ms.|number |`-`|-|
|mouseEnterDelay|Delay time to show when mouse enter. unit: ms.|number |`100`|-|
|mouseLeaveDelay|Delay time to show when mouse leave. unit: ms.|number |`100`|-|
|childrenPrefix|Set an additional class name(`${childrenPrefix}-open`) for the container of the popup.|string |`-`|-|
|classNames|Animation class name|string |`fadeIn`|-|
|position|The position of the popup relative to the child node.|\| 'top'\| 'tl'\| 'tr'\| 'bottom'\| 'bl'\| 'br'\| 'left'\| 'lt'\| 'lb'\| 'right'\| 'rt'\| 'rb' |`bottom`|-|
|trigger|Types of events that cause the popup to show|\| 'hover'\| 'click'\| 'focus'\| 'contextMenu'\| Array<'hover' \| 'click' \| 'focus' \| 'contextMenu'> |`hover`|-|
|arrowProps|The html attributes of the arrow node|HTMLAttributes&lt;HTMLDivElement&gt; |`-`|-|
|className|Additional css class|string \| string[] |`-`|-|
|clickOutsideToClose|Whether to allow close the popup by clicking the area outside the child node and the popup box.By default, this logic is triggered in the bubbling phase. You can set `{ capture: true }` to specify the triggering phase in the capture phase.|boolean \| { capture: boolean } |`true`|`{ capture: boolean }` in `2.55.0`|
|duration|Animation transition time|number \| { exit?: number; enter?: number; appear?: number } |`200`|-|
|onClickOutside|Callback when click the area outside the child and the popup|Function |`-`|-|
|popupAlign|Adjust the position of the popup. Indicates moving a few pixels in one direction. [example](/react/en-US/components/trigger#popupAlign)|{left?: number \| [number, number];right?: number \| [number, number];top?: number \| [number, number];bottom?: number \| [number, number];} |`{}`|-|
|popupStyle|The css style of the content of the popup|CSSProperties |`-`|-|
|style|The additional css class|CSSProperties |`-`|-|
|getDocument|Return a element which will be attached click event to close trigger|() => Element |`() => window.document`|-|
|getPopupContainer|Set the parent node which the popup will be rendered to.|(node: HTMLElement) => Element |`-`|-|
|onClick|Callback when click the child node. (Only work when `trigger` contains `click`)|(e) => void |`-`|-|
|onVisibleChange|Callback when the visibility of the popup is changed|(visible: boolean) => void |`-`|-|
|popup|The content of the popup|() => ReactNode |`-`|-|

### When to fired `onVisibleChange`

- When `trigger` contains `click`
  1. Click on the area outside the child node and the popup will hide the popup. This behavior can be prevented if you set `clickOutsideToClose=false`.
  2. Click on the child node will show or hide the popup. If you set `clickToClose=true`, when the popup is displayed, clicking the child node will not hide the popup.


-  When `trigger` contains `contextMenu`
  1. Click on the area outside the child node and the popup will hide the popup. This behavior can be prevented if you set `clickOutsideToClose=false`.
  2. Right-click on the child node will show the popup.


- When `trigger` contains `hover`
  1. The popup will be hidden when the mouse moved out of the popup, and did not move into the child node within `${mouseLeaveDelay}ms`.
  2. The popup will be hidden when the mouse moved out of the child node, and did not move into the popup within `${mouseLeaveDelay}ms`.

  **If `popupHoverStay=false` is set, the mouse cannot be moved into the popup.**

- When `trigger` contains `focus`
  1. The popup will be hidden when the child node losing focus. This behavior can be prevented if you set `blurToHide=false`.
  2. Click on the area outside the child node and the popup will hide the popup if you set `blurToHide=false`.



## Q&A

1. When `getPopupContainer` is set, the popup layer is in the wrong position?

    The default `autoFitPosition` property of the component is `true`, which means that the component will automatically adjust the position of the popup layer according to the size of the popup layer, its position in the viewport and the mounted parent element.
    For example, set `position=top` , but the space above is insufficient, the pop-up layer will be covered, and the component will determine whether to display the pop-up layer below the trigger element according to the situation.
    If `getPopupContainer` is set, the style attribute `left` of the popup layer is at least 0, that is, the minimum distance from the left border of the parent element is 0, so as to avoid exceeding the parent element and causing it to be blocked.
    AutoFitPosition can be avoided by setting `autoFitPosition=false`.
