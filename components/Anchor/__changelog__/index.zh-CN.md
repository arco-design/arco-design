## 2.52.0

2023-08-18

### 🐛 问题修复

- 修复 `Anchor` 组件子锚点被移除后，激活态锚点的蓝色标识位置未更新的问题。([#2161](https://github.com/arco-design/arco-design/pull/2161))

## 2.51.0

2023-07-28

### 🆕 功能升级

- 支持横向 `Anchor`([#2108](https://github.com/arco-design/arco-design/pull/2108) '')

## 2.43.1

2022-12-30

### 🐛 问题修复

- 优化 `Anchor` 组件在锚点元素高度较大时，滚动目标容器可能出现激活 `Anchor.Link` 计算不准确的 bug。([#1676](https://github.com/arco-design/arco-design/pull/1676))

## 2.33.1

2022-05-20

### 🐛 问题修复

- 当`Anchor.Link` 组件的 `title`为空的时候，不显示其下的可点击区域`<a/>`([#878](https://github.com/arco-design/arco-design/pull/878))

## 2.33.0

2022-05-13

### 🐛 问题修复

- 修复 `Anchor` 组件在内容高度不够的情况下，点击锚点元素定位出错的 bug([#859](https://github.com/arco-design/arco-design/pull/859))

## 2.28.1

2022-01-14

### 🐛 问题修复

- 修复 `Anchor` 组件在设置了 `scrollContainer` 时，点击锚点元素滚动位置不对的 bug。([#446](https://github.com/arco-design/arco-design/pull/446))

## 2.25.1

2021-11-26

### 🐛 问题修复

- 修复 `Anchor` 组件设置 `affix`时，滚动容器未传递到 `Affix` 组件上的 bug。([#235](https://github.com/arco-design/arco-design/pull/235))

## 2.22.0

2021-09-10

### 🆕 功能升级

- `Anchor` 组件新增一个属性 `targetOffset` 用于支持设置容器中滚动基准线的偏移量。

## 2.17.0

2021-06-18

### 🐛 Bugfix

- 修复 `Anchor` 组件 `animation` 和 `hash` 都为 `false` 时，点击链接不更新滚动位置的 bug。

## 2.14.2

2021-04-23

### 🐛 Bugfix

- 修复 `Anchor` 在切换页面路由时由于 dom 节点不存在可能导致报错的 bug。

## 2.1.0

2020-11-06

### 🐛 Bugfix

- 修复 `Anchor` 组件更新 `scrollContainer` 未生效的 bug。
- 修复 `Anchor` 组件加上固定高的情况下，左侧线不完整的 bug。



