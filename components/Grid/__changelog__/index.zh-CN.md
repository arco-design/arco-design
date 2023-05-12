## 2.48.0

2023-05-12

### 💎 功能优化

- 导出 `Grid` 组件的 `GridProps`, `GridItemProps` 类型定义。([#1957](https://github.com/arco-design/arco-design/pull/1957))

## 2.47.2

2023-05-06

### 🐛 问题修复

- 修复 `Grid` 组件响应式布局 `xxxl` 属性不生效的 bug。([#1955](https://github.com/arco-design/arco-design/pull/1955))

## 2.47.0

2023-04-14

### 🆕 功能升级

- 调整 `Grid.GridItem` ts 定义([#1897](https://github.com/arco-design/arco-design/pull/1897))
- `Grid.GridItem` 支持函数类型的 `children`([#1897](https://github.com/arco-design/arco-design/pull/1897))

### 🐛 问题修复

- 修复 `Grid.GridItem` 透传 `overflow` 属性到原生 DOM 标签导致控制台警告([#1922](https://github.com/arco-design/arco-design/pull/1922))

## 2.46.0

2023-03-17

### 🆕 功能升级

- `Grid` 支持 `css grid` 进行布局([#1801](https://github.com/arco-design/arco-design/pull/1801))

## 2.40.0

2022-09-16

### 🆕 功能升级

- `Grid` 响应式断点支持 `xxxl` (页面宽度 > 2000px)。([#1396](https://github.com/arco-design/arco-design/pull/1396))

## 2.39.1

2022-08-19

### 🐛 问题修复

- 修复 `Grid.Col` 组件设置 `md = 0` 会导致其在更大的窗口尺寸下也不展示的 bug。([#1307](https://github.com/arco-design/arco-design/pull/1307))

## 2.28.2

2022-01-21

### 💎 优化

- `Grid` 支持设置 `span` 为 0。([#480](https://github.com/arco-design/arco-design/pull/480))

## 2.26.0

2021-12-03

### 🆕 功能升级

- `Grid.Col` 组件增加 `flex` 属性。([#268](https://github.com/arco-design/arco-design/pull/268))

## 2.25.1

2021-11-26

### 💎 优化

- `Grid.Row` 使用 context 传递 `gutter`，避免自定义 `Grid.Col` 时不能正确接收参数。([#224](https://github.com/arco-design/arco-design/pull/224))

## 2.20.0

2021-07-30

### 🆕 Feature

- `Grid.Col` 组件新增 `push` 和 `pull` 属性以设置栅格的水平偏移格数。

## 2.19.0

2021-07-16

### 🆕 Feature

- `Grid.Row` 组件和 `Grid.Col` 组件支持所有原生 html 属性。



## 2.9.0 🔥

2021-02-05

### 🐛 Bugfix

- 修复 `Grid.Row` 直接传入字符串作为 `children` 报错的 bug。

## 2.5.0 🎅🏽

2020-12-25 🎄

### 🆕 Feature

- `Grid` 组件 `gutter` 支持设置为数组来定制垂直间隔。

