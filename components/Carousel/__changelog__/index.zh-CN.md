## 2.38.0

2022-07-29

### 🐛 问题修复

- 修复 `Carousel` 点击指示器中间的区域时会滑动到第一页的 bug。([#1210](https://github.com/arco-design/arco-design/pull/1210))
- 修复 `Carousel` 内的子元素无法撑起组件高度的 bug。([#1210](https://github.com/arco-design/arco-design/pull/1210))

## 2.28.0

2022-01-07

### 🐛 问题修复

- 修复 `Carousel` 当 `currentIndex` 设置为非 0 时，首次翻页动画异常的问题。([#409](https://github.com/arco-design/arco-design/pull/409))

## 2.25.0

2021-11-19

### 🆕 功能升级

- `Carousel` 新增 `icons` 属性以支持自定义箭头图标。([#181](https://github.com/arco-design/arco-design/pull/181))

## 2.21.0

2021-08-20

### 🆕 功能升级

-  `Carousel` 组件新增 `miniRender` 属性，支持渲染满足动画要求的最小数量的子节点。

## 2.17.0

2021-06-18

### 💎 Optimization

- `Carousel` 组件主动调用翻页 API 时，允许重置自动播放的计时。

## 2.16.1

2021-06-04

### 🐛 Bugfix

- 修复 `Carousel` 组件外部直接修改 `currentIndex` 属性时，没有展示切换动画的 bug。

### 💅 Style

- `Carousel` 组件 `animation` 为 `slide` 时，隐藏的图片由 `display: none` 变为 `visibility: hidden`。



## 2.15.2

2021-05-14

### 🐛 Bugfix

- 修复 `Carousel` 组件在其滚动项为半透明时，内容显示重叠的 bug。

## 2.14.2

2021-04-23

### 🐛 Bugfix

- 修复 `Carousel` 组件只有两张图片时，点击左向箭头，图片滚动的方向不对的 bug。

## 2.14.0

2021-04-09

### 🆕 Feature

- `Carousel` 组件 `autoPlay` 支持传入对象以控制播放间隔和鼠标悬浮时是否暂定自动播放。

### 🐛 Bugfix

- 修复 `Carousel` 的子节点传入的 `onClick` 回调失效的 bug。

## 2.4.0

2020-12-11

### 🆕 Feature

- `Carousel` 组件 `onChange` 回调新增 `isManual` 参数，用于区分是否是由用户主动触发的翻页。

## 2.3.1

2020-12-04

### 🆎 TypeScript

- `Carousel` 组件 `indicatorPosition` 和 `onChange` 参数的 ts 定义修正。



