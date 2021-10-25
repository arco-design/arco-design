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


