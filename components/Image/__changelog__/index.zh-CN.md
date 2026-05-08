## 2.66.15

2026-05-08

### 🐛 问题修复

- 修复 `Image.Preview` 弹出层关闭按钮点击事件冒泡，导致误触发父元素的click事件的问题([#3178](https://github.com/arco-design/arco-design/pull/3178))

## 2.61.0

2024-03-15

### 🆕 功能升级

- `Image` 新增 `resetTranslate` 属性([#2593](https://github.com/arco-design/arco-design/pull/2593))

### 🐛 问题修复

- 修复 `Image` 组件图片链接触发内存缓存时图片一直处于loading状态的问题([#2587](https://github.com/arco-design/arco-design/pull/2587))

## 2.60.2

2024-03-01

### 🐛 问题修复

- 修复 `Image` 组件 `loading` 状态展示的问题([#2550](https://github.com/arco-design/arco-design/pull/2550))

## 2.58.3

2024-01-11

### 💎 功能优化

- 优化 `Image` 组件在 `lazyload` 时视口外的元素不显示占位 loading，避免页面重排([#2492](https://github.com/arco-design/arco-design/pull/2492))

### 🐛 问题修复

- 修复 `Image` 组件边界场景下循环渲染导致白屏的 bug。([#2489](https://github.com/arco-design/arco-design/pull/2489))

## 2.58.0

2023-12-29

### 🆕 功能升级

- `Image.Preview` 组件增加 `imageRender` 属性允许自定义图片渲染，`imgAttributes` 属性自定义 src 内容([#2458](https://github.com/arco-design/arco-design/pull/2458))
- `Image.PreviewGroup` 组件增加 `forceRender` 属性，用于提前加载图片([#2458](https://github.com/arco-design/arco-design/pull/2458))

## 2.55.0

2023-10-27

### 💎 功能优化

- `Image.PreviewGroup` 组件增加方向键的快捷键支持([#2320](https://github.com/arco-design/arco-design/pull/2320))

## 2.53.1

2023-09-15

### 💎 功能优化

- 避免鼠标右键按下时错误触发的图片拖拽。([#2234](https://github.com/arco-design/arco-design/pull/2234))
- 优化 Image 在 SSR 且开启 `lazyload` 时首次渲染出现裂图的问题。([#2234](https://github.com/arco-design/arco-design/pull/2234))

## 2.53.0

2023-09-08

### 🆕 功能升级

- `Image.Preview` 组件新增 `extra` 属性，用于指定在预览区域的额外节点。([#2224](https://github.com/arco-design/arco-design/pull/2224))

### 🐛 问题修复

- 修复 `Image` 首次渲染会展示图片加载错误图标的 bug。([#2223](https://github.com/arco-design/arco-design/pull/2223))

## 2.52.1

2023-08-25

### 💎 功能优化

- 避免 `Image` 未传入 `src` 时浏览器控制台的 404 报错。([#2187](https://github.com/arco-design/arco-design/pull/2187))

### 🐛 问题修复

- 修复 `Image` 组件 `loader = true` 时加载状态未展示的问题。([#2173](https://github.com/arco-design/arco-design/pull/2173) [@bestlyg](https://github.com/bestlyg))

## 2.52.0

2023-08-18

### 🐛 问题修复

- 修复 `Image` 配合 `previewProps.actions` 使用报错的问题。([#2137](https://github.com/arco-design/arco-design/pull/2137))

## 2.48.1

2023-05-19

### 🐛 问题修复

- 修复 `Image.previewProps` 字段更新后组件 UI 实际未更新的 bug。([#1976](https://github.com/arco-design/arco-design/pull/1976))

## 2.47.0

2023-04-14

### 🆕 功能升级

- `Image` 组件添加 `lazyload` 属性，支持懒加载([#1850](https://github.com/arco-design/arco-design/pull/1850))

## 2.45.2

2023-03-10

### 💎 功能优化

- 优化 `Image` 预览图片时，可通过鼠标滚轮进行缩放。([#1829](https://github.com/arco-design/arco-design/pull/1829))

## 2.43.2

2023-01-06

### 🐛 问题修复

- 修复在 `ImagePreviewGroup` 内嵌套  `Popover` 组件导致报错的 bug。([#1706](https://github.com/arco-design/arco-design/pull/1706))

## 2.41.0

2022-10-28

### 💎 功能优化

- `Image` 组件悬浮时显示`zoom-in`鼠标类型([#1477](https://github.com/arco-design/arco-design/pull/1477))

## 2.40.1

2022-09-23

### 💅 样式更新

- Image 组件的开启 `preview` 后，鼠标悬停样式变为 `zoom-out`([#1419](https://github.com/arco-design/arco-design/pull/1419))

## 2.39.0

2022-08-12

### 🆕 功能升级

- `Image.Preview` 新增 `imgAttributes` 参数，将属性透传至弹窗中的 `img` 标签上([#1274](https://github.com/arco-design/arco-design/pull/1274))

## 2.38.1

2022-08-05

### 🐛 问题修复

- 修复 `Image` 组件传入原生属性 `onLoad`, `onError` 不触发的 bug([#1236](https://github.com/arco-design/arco-design/pull/1236))

## 2.38.0

2022-07-29

### 🐛 问题修复

- 修复 `Image.Preview` 的 `onVisibleChange` 回调在打开预览不触发的问题。([#1219](https://github.com/arco-design/arco-design/pull/1219))

## 2.33.1

2022-05-20

### 🐛 问题修复

- 修复 `Image.PreviewGroup`  组件在 `current` 受控时 `onChange` 事件不触发的问题([#880](https://github.com/arco-design/arco-design/pull/880))

## 2.30.0

2022-03-04

### 🆕 功能升级

- `Image` 组件 新增 `index` 参数，表示预览时的索引，在复杂的多图预览场景下可指定，保证预览顺序一致([#588](https://github.com/arco-design/arco-design/pull/588))
- `Image.Preview` 组件 新增 `scales` 参数，支持自定义图片预览缩放百分比([#588](https://github.com/arco-design/arco-design/pull/588))

## 2.29.1

2022-02-18

### 🐛 问题修复

- 修复 `Image.Preview` 组件在从缓存中加载图片的时候 `onload` 没有触发的问题([#539](https://github.com/arco-design/arco-design/pull/539))

## 2.28.1

2022-01-14

### 🐛 问题修复

- 修复 `Image.PreviewGroup` 在子节点的 `src` 更新后预览顺序出错的bug。([#445](https://github.com/arco-design/arco-design/pull/445))

## 2.28.0

2022-01-07

### 🐛 问题修复

- 修复 `Image` 组件预览模式下部分全局配置丢失的bug([#410](https://github.com/arco-design/arco-design/pull/410))

## 2.25.0

2021-11-19

### 💅 样式更新

- `Image` 组件将错误状态的最大尺寸设置为父元素的大小。([#161](https://github.com/arco-design/arco-design/pull/161))

## 2.24.0

2021-11-05

### 🆕 功能升级

- `Image.Preview` 组件支持按 `ESC` 关闭([#121](https://github.com/arco-design/arco-design/pull/121))

## 2.23.0

2021-09-27

### 🐛 问题修复

- 修复 `Image` 组件设置 `height` 无效的问题

## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `Image.PreviewGroup`组件在 `srcList` 变化后没有更新的 bug。

## 2.18.0

2021-07-02

### 🐛 Bugfix

- 修复 `Image.PreviewGroup` 组件点击图片打开的时候没有触发 `onChange` 的 bug。

## 2.16.1

2021-06-04

### 🐛 Bugfix

- 修复 `Image.Preview` 组件默认打开的情况下，`getPopupContainer` 获取的元素错误的 bug。

## 2.16.0

2021-05-28

### 🆕 Feature

- `Image.Preview` 支持自定义挂载点。

## 2.15.0

2021-04-30

### 🐛 Bugfix

- 修复 `Image` 组件在 Server Side Render 情况下不可用的 bug。



## 2.14.2

2021-04-23

### 💎 Optimization

- `Image` 组件添加多语言支持。

## 2.14.1

2021-04-16

### 🆎 TypeScript

- 修复 `Image.PreviewGroup` 的 TS 定义中缺少 `children` 的问题。



## 2.14.0

2021-04-09

### 🆕 Feature

- `Image` 组件支持多图预览。

## 2.5.0 🎅🏽

2020-12-25 🎄

### 🆕 Feature

- `Image` 组件错误状态支持自定义。



## 2.3.1

2020-12-04

### 💎 Optimization

- `Image` 组件错误状态下要显示 `alt`。



