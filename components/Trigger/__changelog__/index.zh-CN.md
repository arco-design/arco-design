## 2.66.11

2026-03-06

### 🐛 问题修复

- `Tooltip` 组件包裹单个元素的数组时渲染白屏问题修复([#3141](https://github.com/arco-design/arco-design/pull/3141))
- 修复`Trigger`组件运行时报错 “Cannot read properties of undefined (reading 'className')”导致页面崩溃问题([#3132](https://github.com/arco-design/arco-design/pull/3132))

## 2.66.0

2025-04-03

### 🐛 问题修复

- 修复 `Trigger` 组件 `clickOutsideToClose` capture event 未销毁报错问题([#2882](https://github.com/arco-design/arco-design/pull/2882))

## 2.61.2

2024-03-29

### 🐛 问题修复

- 修复 `Trigger` 在设置组件 `rtl` 时内容视图仍然是 `ltr` 的问题([#2604](https://github.com/arco-design/arco-design/pull/2604))

## 2.59.0

2024-01-19

### 🆕 功能升级

- `Trigger` 支持根据视口自动调整位置时，设置视口偏移量([#2502](https://github.com/arco-design/arco-design/pull/2502))

## 2.57.0

2023-12-08

### 💎 功能优化

- 优化 `Trigger` 部分逻辑耗时问题([#2427](https://github.com/arco-design/arco-design/pull/2427))

## 2.56.1

2023-11-24

### 🐛 问题修复

- 修复不同弹出方向的 `Trigger` 组件在嵌套使用时，箭头样式被相互覆盖的 bug。([#2378](https://github.com/arco-design/arco-design/pull/2378))

## 2.55.0

2023-10-27

### 🆕 功能升级

- `Trigger` 支持配置在捕获阶段触发 `clickOutside` 逻辑。([#2324](https://github.com/arco-design/arco-design/pull/2324))

## 2.51.2

2023-08-11

### 💎 功能优化

- 优化 `Trigger` 组件在内容高度存在小数时会出现定位误差导致出现不必要滚动条的问题。([#2141](https://github.com/arco-design/arco-design/pull/2141))

## 2.45.1

2023-03-01

### 🐛 问题修复

- 修复 `Trigger` 组件在 `trigger=hover`时注入的 `onClick` 导致组件默认 `onClick` 不生效的 bug。([#1808](https://github.com/arco-design/arco-design/pull/1808))

## 2.44.1

2023-02-03

### 🐛 问题修复

- 修复 `Trigger` 组件的 `props.style` 不生效的 bug。([#1750](https://github.com/arco-design/arco-design/pull/1750))
- 修复 `Trigger` 组件的 `clickToClose` 在 trigger="hover"  时不生效的 bug。([#1750](https://github.com/arco-design/arco-design/pull/1750))

## 2.43.0

2022-12-23

### 💎 功能优化

- 优化 `Trigger` 组件的触发节点样式变为 `display: none` 时弹出层位置出现闪动的问题。([#1652](https://github.com/arco-design/arco-design/pull/1652))
- 优化 `Trigger` 组件的弹出层尺寸改变定位未及时更新导致的闪动问题。([#1652](https://github.com/arco-design/arco-design/pull/1652))

## 2.42.0

2022-11-25

### 🐛 问题修复

- 修复 `Trigger` 组件的 `containerScrollToClose` 属性在页面滚动容器为 document.documentElement 时不生效的 bug。([#1606](https://github.com/arco-design/arco-design/pull/1606))

## 2.38.0

2022-07-29

### 🐛 问题修复

- 修复 `Trigger` 组件在 React 18 严格模式下弹出层无法显示的 bug。([#1215](https://github.com/arco-design/arco-design/pull/1215))

## 2.34.0

2022-05-27

### 🆕 功能升级

- `Trigger` 组件支持通过 `containerScrollToClose` 属性设置弹出层挂载容器滚动时，关闭弹出层。([#913](https://github.com/arco-design/arco-design/pull/913))

## 2.32.0

2022-04-15

### 🆕 功能升级

- `Trigger` 组件支持通过 `updateOnScroll` 属性，设置在容器滚动时更新弹出框的位置。([#770](https://github.com/arco-design/arco-design/pull/770))

## 2.26.1

2021-12-07

### 🐛 问题修复

- 修复 `Trigger` 组件触发方式为 `contextMenu` 时，点击触发节点，弹出层未隐藏的 bug。([#284](https://github.com/arco-design/arco-design/pull/284))

## 2.26.0

2021-12-03

### 💎 优化

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

