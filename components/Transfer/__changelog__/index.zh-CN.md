## 2.40.0

2022-09-16

### 🆕 功能升级

- `Transfer`的 `showSearch / showFooter / searchPlaceholder / pagination / listStyle` 属性支持通过数组来为源/目标列表传入不同的属性值。([#1389](https://github.com/arco-design/arco-design/pull/1389))

## 2.37.0

2022-07-08

### 💅 样式更新

- 修复 `Transfer` 可拖拽时，列表中的第一个条目的拖拽标识可能被容器遮挡的问题。([#1103](https://github.com/arco-design/arco-design/pull/1103))

## 2.36.0

2022-06-24

### 💎 功能优化

- 优化 `Transfer` 组件在 `simple` 模式下对于当前列表选项数目的展示形式。([#1045](https://github.com/arco-design/arco-design/pull/1045))

## 2.34.0

2022-05-27

### 🐛 问题修复

- 修复 `Transfer` 自定义列表时，`onItemSelectAll` 方法失效的 bug。([#903](https://github.com/arco-design/arco-design/pull/903))

## 2.30.1

2022-03-11

### 💎 优化

- `Transfer` 组件在清空时，仅对过滤后的项目进行操作。([#621](https://github.com/arco-design/arco-design/pull/621))

## 2.30.0

2022-03-04

### 💎 优化

- `Transfer` 组件在全选/反选时，仅对过滤后的项目进行操作。([#613](https://github.com/arco-design/arco-design/pull/613))

## 2.28.0

2022-01-07

### 🆕 功能升级

- `Transfer` 支持为 `showSearch` 属性传入 `InputProps`，支持将搜索框渲染至标题区域。([#401](https://github.com/arco-design/arco-design/pull/401))

## 2.21.0

2021-08-20

### 🆕 功能升级

- `simple` 属性支持传入对象 `{ retainSelectedItems: true }` 以在左侧面板保留被选中的项目。

## 2.19.0

2021-07-16

### 🆕 Feature

- `Transfer` 组件 `CustomListProps` 新增 `onItemRemove` 回调。
- `Transfer` 组件自定义头部渲染函数 `titleTexts` 新增 `checkbox` 参数。

## 2.18.0

2021-07-02

### 🆕 Feature

- `Transfer` 组件 `titleTexts` 允许传入函数以自定义标题栏渲染。

## 2.13.2

2021-04-01

### 🐛 Bugfix

- 修复 `Transfer` 组件结合分页表格混用时，每次选中项目都会使表格回到第一页的 bug。

## 2.11.0

2021-03-12

### 🆕 Feature

- `Transfer` 组件 `showFooter` 支持传入 `ReactNode` 自定义节点。

### 🐛 Bugfix

- 修复 `Transfer.Item` 的 key 可能重复的 bug。

