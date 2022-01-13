---
file: interface
---

`````
Component / Other

# Trigger

Used to pop up a drop-down box by hovering, focusing, or clicking on a element.
`````

%%Content%%

## API

%%Props%%

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
