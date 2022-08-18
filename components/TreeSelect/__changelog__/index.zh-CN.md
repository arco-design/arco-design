## 2.39.0

2022-08-12

### 🆕 功能升级

- `TreeSelect` 新增 `inputValue` 和 `onInputValueChange` 属性。([#1151](https://github.com/arco-design/arco-design/pull/1151))

## 2.38.0

2022-07-29

### 🐛 问题修复

- 修复 `TreeSelect` 组件在受控模式下开启复选框多选且远程搜索时，已选中项存在 label 未正常展示的 bug。([#1207](https://github.com/arco-design/arco-design/pull/1207))

## 2.37.0

2022-07-08

### 🆕 功能升级

- `TreeSelect` 组件支持通过对象类型的 `maxTagCount` 属性定制 `maxTag` 内容展示([#1112](https://github.com/arco-design/arco-design/pull/1112))

## 2.36.0

2022-06-24

### 🐛 问题修复

- 修复 `dragToSort` 在 TreeSelect 中不生效的问题([#1029](https://github.com/arco-design/arco-design/pull/1029))

## 2.31.0

2022-03-25

### 🆕 功能升级

- `TreeSelect` 组件 `triggerElement` 属性允许传入函数以自定义组件触发节点。([#686](https://github.com/arco-design/arco-design/pull/686))

## 2.30.0

2022-03-04

### 🐛 问题修复

- 修复 `TreeSelect` 组件在扩展下拉菜单中的输入框无法被聚焦的问题。([#608](https://github.com/arco-design/arco-design/pull/608))

## 2.29.0

2022-02-11

### 🆕 功能升级

- `TreeSelect` 的 `onChange` 函数新增节点信息参数([#526](https://github.com/arco-design/arco-design/pull/526))

## 2.23.5

2021-10-29

### 🐛 问题修复

- 修复 `TreeSelect` 组件搜索节点展示不正确的问题。([#74](https://github.com/arco-design/arco-design/pull/74))

## 2.22.0

2021-09-10

### 🛠 架构改动

- `TreeSelect` 组件文件夹下 `treeSelect.tsx` 更名为 `tree-select.tsx`，有通过文件路径引用的需要注意一下。另外，我们不推荐直接通过文件路径去使用，因为我们无法保证组件内文件名永远不变，如果通过路径也尽量只使用 `index.tsx` 入口文件。

### 💎 优化

- `TreeSelect` 组件下拉列表出现后自动滚动到第一个已选中的节点

## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `TreeSelect` 组件设置 `showSearch={retainInputValueWhileSelect: false}` 不生效的 bug。

## 2.20.0

2021-07-30

### 🐛 Bugfix

- 修复 `TreeSelect` 组件的 `popupVisible` 为 `true` 时，页面其他输入框无法被聚焦的 bug。

## 2.18.2

2021-07-09

### 🐛 Bugfix

- 修复 `TreeSelect` 组件本地搜索结果不正确的bug。

## 2.14.1

2021-04-16

### 🐛 Bugfix

- 修复 `TreeSelect` 的 `onChange` 访问不到外部最新的变量 bug。

## 2.6.0

2021-01-08

### 🐛 Bugfix

- 修复 `TreeSelect` 组件在`treeData`改变，当前选中`value`未更新对应的`title`的问题。

## 2.4.1

2020-12-18

### 🐛 Bugfix

- 修复 `TreeSelect` 组件节点`title`为`ReactNode`时出现崩溃的问题。

## 2.4.0

2020-12-11

### 🐛 Bugfix

- 修复 `TreeSelect` 在打开节点时，子节点被选中的收起状态的节点也会被展开的 bug。
- 修复 `TreeSelect` 在子节点被选中，收起其父节点，再次打开 scrollIntoView 定位有误的 bug。

## 2.3.0

2020-11-27

### 🆕 Feature

- `TreeSelect` 支持 `dropdownRender` 和 `dropdownMenuStyle` 属性，可以自定义扩展下拉菜单。

