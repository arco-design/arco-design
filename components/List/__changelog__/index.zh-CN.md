## 2.55.0

2023-10-27

### 🐛 问题修复

- 修复 `List` 组件滚动时偶现的 `cannot read properties of null (reading 'scrollTop')` 错误。([#2316](https://github.com/arco-design/arco-design/pull/2316))

## 2.52.1

2023-08-25

### 🐛 问题修复

- 修复 `List` 组件设置可翻页时，切换 `pageSize` 的下拉框有时无法展开的问题。([#2186](https://github.com/arco-design/arco-design/pull/2186))

## 2.33.0

2022-05-13

### 🐛 问题修复

- 修复 `List` 组件 `onReachBottom` 偶现无法触发的 bug。([#854](https://github.com/arco-design/arco-design/pull/854))

## 2.32.0

2022-04-15

### 🆕 功能升级

- `List` 组件 `scrollIntoView` 方法允许指定列表滚动的具体行为。([#768](https://github.com/arco-design/arco-design/pull/768))
- `List` 组件 `virtualListProps` 允许指定虚拟列表元素高度以改善滚动效果。([#768](https://github.com/arco-design/arco-design/pull/768))

## 2.31.0

2022-03-25

### 🐛 问题修复

- 修复 `List` 组件栅格布局下 `render` 方法的 `index` 参数错误的 bug。([#688](https://github.com/arco-design/arco-design/pull/688))

## 2.30.1

2022-03-11

### 🐛 问题修复

- 修复 `List` 组件为虚拟列表时 `scrollIntoView` 方法对首屏渲染的元素不生效的 bug。([#628](https://github.com/arco-design/arco-design/pull/628))

## 2.26.0

2021-12-03

### 🐛 问题修复

- `List` 组件修复使用虚拟列表时 `scrollLoading` 失效的问题。([#270](https://github.com/arco-design/arco-design/pull/270))
- `List` 组件修复在虚拟滚动时 `onListScroll` 和 `onReachBottom` 无法触发的 bug。([#259](https://github.com/arco-design/arco-design/pull/259))

## 2.23.1

2021-10-15

### 🐛 问题修复

- 修复 `List` 组件 `pagination` 属性中的 `defaultCurrent`、`defaultPageSize`、`sizeCanChange` 不可用的 bug。

## 2.20.0

2021-07-30

### 🆕 Feature

- `List` 组件新增 `listRef` 属性以获取带有 API 方法的组件引用，并在该引用上新增 `scrollIntoView` 方法。
- `List` 组件 `grid` 属性新增 `column` 参数以允许快速定义栅格下每行展示的列表数目。

### 💅 Style

- `List` 组件修复元素内容可能溢出的样式问题。



## 2.14.2

2021-04-23

### 🐛 Bugfix

- 修复 `List` 组件 `pagination.onChange` 属性在单次翻页中触发了两次的 bug。

## 2.13.0

2021-03-26

### 🆎 TypeScript

- `List.Item` 支持传入原生 HTML 标签属性。



## 2.11.1

2021-03-15

### 🆎 TypeScript

- 完善 `List` 组件 `render` 函数的参数类型根据`dataSource`自动推断。



## 2.10.0 🏮

2020-02-26

### 🆎 TypeScript

- 优化 `List` 组件 `render` 函数的 ts 定义。



## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- `List.Item` 支持传入 HTML 原生属性，支持内置 hover 样式。

## 2.8.2

2021-01-29

### 🐛 Bugfix

- 修复 `List` 组件在`Grid`模式下无法使用分页的问题。



### 💅 Style

- 修复 `List` 组件在数据为空时，`noDataElement` 未垂直居中的问题。



## 2.7.0

2021-01-15

### 🐛 Bugfix

- 修复 `List` 组件 `onReachBottom` 内部无法获得父组件最新 state 的问题。

## 2.4.1

2020-12-18

### 🐛 Bugfix

- 修复 `List`组件传入单个`children`时，显示无数据的问题。

## 2.3.0

2020-11-27

### 🐛 Bugfix

- 修复 `List.Item` 组件传入 `className` 时，组件内置的类名直接被覆盖的 bug。



