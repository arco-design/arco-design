## 2.26.1

2021-12-07

### 🐛 问题修复

- 修复 `Trigger` 组件触发方式为 `contextMenu` 时，点击触发节点，弹出层未隐藏的 bug。([#284](https://github.com/arco-design/arco-design/pull/284))

## 2.26.0

2021-12-03

### 💎 性能优化

- 优化 `Trigger` 组件计算子节点尺寸和位置的逻辑，避免重复计算。([#258](https://github.com/arco-design/arco-design/pull/258))

## 2.25.0

2021-11-19

### 🆕 功能升级

- `Trigger` 组件添加 `escToClose` 设置是否允许按 `ESC` 关闭，默认为 `false`。([#167](https://github.com/arco-design/arco-design/pull/167))

## 2.24.1

2021-11-12

### 🐛 问题修复

- 修复 `Trigger` 组件在弹出层出现动画结束前错误触发弹出层鼠标事件的 bug。([#149](https://github.com/arco-design/arco-design/pull/149))

## 2.23.5

2021-10-29

### 🐛 问题修复

- 修复 `Trigger` 组件弹出层第一次渲染时未获取到子元素宽度导致虚拟列表失效的问题([#69](https://github.com/arco-design/arco-design/pull/69))

## 2.23.1

2021-10-15

### 💎 优化

- 优化 `Trigger` 组件的弹出层仅在显示状态时根据触发节点的 resize 进行位置更新。

### 🐛 问题修复

- 修复 `Trigger` 组件弹出层内嵌套的弹出层被点击时，外层弹出层被隐藏 `bug`。

## 2.23.0-beta.1

2021-09-26

### 🆕 功能升级

- `Trigger` 组件支持从全局读取属性配置

## 2.22.0

2021-09-10

### 🆕 功能升级

- `Trigger` 组件支持通过 `mouseLeaveToClose` 属性设置是否在鼠标移出触发节点和弹出层的时候隐藏弹窗。

## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `Trigger` 组件直接包裹一个禁用的 `Trigger ` 组件时，自身弹出层也不展示的 bug。

## 2.19.3

2021-07-23

### 🐛 Bugfix

- 修复 `Trigger` 组件未在挂载容器尺寸改变时更新位置的 bug。

## 2.19.0

2021-07-16

### 🐛 Bugfix

- 修复无法获取 `Trigger` 组件弹出层内容最外层标签的 ref 的问题。

## 2.18.2

2021-07-09

### 🐛 Bugfix

- 修复 `Trigger` 组件在设置 `alignPoint`且挂载容器滚动滚动条时弹出层定位不正确的bug。

## 2.18.1

2021-07-04

### 🐛 Bugfix

- 修复 `Trigger` 组件 `unmountOnExit` 不生效的 bug。

## 2.17.0

2021-06-18

### 🐛 Bugfix

- 修复 `Trigger` 组件在设置 `position=bottom` 并自动调整位置时，箭头元素未指向触发节点的 bug。
- 修复 `Trigger` 组件在设置 `popupContainer` 时，通过 `popupAlign` 设置的偏移量未生效的 bug。

## 2.15.2

2021-05-14

### 🐛 Bugfix

- 修复 `Trigger` 组件在设置了 `autoAlignPopupWidth` 属性之后，`props.style.width` 属性不生效的 bug。



## 2.14.1

2021-04-16

### 🐛 Bugfix

- 修复 `Trigger` 组件嵌套立即弹出的弹出框，动画导致弹出框位置定位不对的 bug。

## 2.10.1

2021-03-05

### 🐛 Bugfix

- 修复 `Trigger` 组件在自动调整位置后，箭头元素的位置有误的问题。

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- `Trigger` 组件支持直接嵌套使用。

## 2.7.0

2021-01-15

### 🆕 Feature

- `Trigger` 组件 `popupAlign` 属性同时支持多个方向。

## 2.1.0

2020-11-06

### 🐛 Bugfix

- 修复 `Trigger` 组件 children 数量大于 1 个报错的 bug。

