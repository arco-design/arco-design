## 2.54.1

2023-10-16

### 💎 功能优化

- Pagination 在 `simple` 模式下，跳转器的值不变的情况下不再触发更新事件([#2287](https://github.com/arco-design/arco-design/pull/2287))

## 2.49.0

2023-06-02

### 💅 样式更新

- `Pagination` 组件调整默认文案：前往 => 前往 x 页([#2004](https://github.com/arco-design/arco-design/pull/2004))
- `Pagination` 组件调整快速跳转字体颜色为 `color-text-2`([#2004](https://github.com/arco-design/arco-design/pull/2004))

## 2.48.2

2023-05-26

### 🐛 问题修复

- 修复 `Pagination` 组件在 `props` 更新为空的时候，报错的 bug([#1989](https://github.com/arco-design/arco-design/pull/1989))

## 2.42.1

2022-12-02

### 🐛 问题修复

- 修复 `Pagination` 组件在 `sizeOptions` 模式下 `defaultPageSize` 不生效的 bug([#1627](https://github.com/arco-design/arco-design/pull/1627))

## 2.39.2

2022-08-26

### 🐛 问题修复

- 修复 `Pagination` 组件的初始 `pageSize` 与选中的 `sizeOptions` 不一致的 bug。([#1333](https://github.com/arco-design/arco-design/pull/1333))

## 2.39.0

2022-08-12

### 💎 功能优化

- `Pagination` 组件支持通过键盘事件切换页码([#1276](https://github.com/arco-design/arco-design/pull/1276))

## 2.36.0

2022-06-24

### 💅 样式更新

- 修复 `Pagination` 中的省略号在某些情况下垂直方向未居中的问题。([#1040](https://github.com/arco-design/arco-design/pull/1040))

## 2.35.0

2022-06-10

### 🐛 问题修复

- 修复 `Pagination` 组件在 `simple` 模式下  `showJumper=false` 不生效的 bug。([#979](https://github.com/arco-design/arco-design/pull/979))

## 2.32.0

2022-04-15

### 🆕 功能升级

- `Pagination` 组件新增 `bufferSize` 属性，支持设置页码被折叠时的展示区间([#767](https://github.com/arco-design/arco-design/pull/767))

## 2.24.0

2021-11-05

### 🐛 问题修复

- fix: 修复 `Pagination` 组件在 `pageSize` 和 `current` 都受控时，`pageSize` 的计算结果会覆盖 `props.current`导致 `current` 受控失效([#119](https://github.com/arco-design/arco-design/pull/119))

## 2.14.2

2021-04-23

### 🐛 Bugfix

- 修复 `Pagination` 组件在受控模式时，同时改变 `pageSize` 和 `current`，`current` 值不正确的 bug。

## 2.14.1

2021-04-16

### 💅 Style

- 提升 `Pagination` 中输入框的优先级，避免被全局输入框组件影响。

## 2.10.1

2021-03-05

### 🐛 Bugfix

- 修复 `Pagination` 组件在`pageSize`修改后未重置当前页的问题。



## 2.6.0

2021-01-08

### 🆕 Feature

- `Pagination` 组件新增 `hideOnSinglePage`属性，支持在只有一页的时候隐藏分页。

