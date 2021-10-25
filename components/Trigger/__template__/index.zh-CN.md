---
file: interface
---

`````
组件 / 其他

# 触发器 Trigger

用于对元素添加 hover, click, focus 等事件，并且弹出下拉框。
`````

%%Content%%

## API

%%Props%%

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

