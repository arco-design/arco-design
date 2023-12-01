## 2.56.2

2023-12-01

### 🐛 问题修复

- 修复 `Tree` 组件在虚拟滚动场景下，onCheck 回调参数extra.checkedNodes 未能返回所有选中节点信息的问题。

## 2.56.0

2023-11-17

### 🐛 问题修复

- 修复 `Tree` 组件 `size` 不为 `default` 时，连接线样式不正确的问题。([#2365](https://github.com/arco-design/arco-design/pull/2365))

## 2.55.2

2023-11-10

### 🐛 问题修复

- 修复 `Tree` 在 react 18 下展开收起出现闪烁的 bug。([#2338](https://github.com/arco-design/arco-design/pull/2338))
- 修复 `Tree` 在受控时展开收起动画未生效的 bug。([#2338](https://github.com/arco-design/arco-design/pull/2338))

## 2.52.0

2023-08-18

### 💎 功能优化

- 优化 Tree 组件在大数据下交互卡顿的问题。（手动开启 `__ArcoAdapterMode__ `  后会有更显著的提升，但是开启后回调参数类型为 NodeInstance 的参数会变为 `FakeNodeInstance` 类型）([#2158](https://github.com/arco-design/arco-design/pull/2158))

## 2.50.0

2023-06-30

### 🐛 问题修复

- 修复 `Tree` 组件边界条件下导致的 `scrollIntoView` 方法执行报错的 bug。([#2057](https://github.com/arco-design/arco-design/pull/2057))

## 2.47.1

2023-04-21

### 🐛 问题修复

- 修复 `Tree` 组件在回显方式设置为 `child`时，选中禁用节点的子节点后，禁用节点的父节点无法被选中的 bug。([#1938](https://github.com/arco-design/arco-design/pull/1938))
- 修复 `Tree` 组件在选中了复选框禁用节点的子节点，然后取消选中，禁用节点的父节点的选中状态错误更新了的 bug。([#1938](https://github.com/arco-design/arco-design/pull/1938))

## 2.44.1

2023-02-03

### 💎 功能优化

- 优化 `Tree` 组件开启虚拟滚动时，特定情况下会出现不必要的纵向滚动条的问题([#1739](https://github.com/arco-design/arco-design/pull/1739))

## 2.30.0

2022-03-04

### 🆕 功能升级

- `Tree` 组件的 `allowDrop` 回调参数支持 `dragNode`([#614](https://github.com/arco-design/arco-design/pull/614))

## 2.29.0

2022-02-11

### 🆕 功能升级

- `Tree` 组件支持通过 `expandOnClick` 属性设置点击节点时展开子节点([#511](https://github.com/arco-design/arco-design/pull/511))

## 2.27.0

2021-12-17

### 🆕 功能升级

- `Tree` 组件支持 `halfChecked` 属性([#331](https://github.com/arco-design/arco-design/pull/331))

## 2.25.1

2021-11-26

### 🐛 问题修复

- 修复 `Tree` 组件在展开后没有子节点场景下，无法再收起的 bug。([#230](https://github.com/arco-design/arco-design/pull/230))

## 2.23.1

2021-10-15

### 🐛 问题修复

- 修复 `Tree` 组件开启虚拟滚动且允许拖拽时，最后一级节点被遮盖的bug。
- 修复 `Tree.Node` 被设置 `draggable=false` 后，其他节点无法在当前节点 `Drop` 的 bug。

## 2.23.0-beta.1

2021-09-26

### 🆕 功能升级

- `Tree` 组件支持从全局读取属性配置

## 2.21.0

2021-08-20

### 🐛 Bugfix

- 修复 `Tree` 组件的`Icons`属性的回调参数不是最新的节点状态的 bug。


## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `Tree` 组件在设置了 `fieldNames` 时，`checkedStrategy="parent"` 不生效的 bug。
- 修复 `Tree` 组件在 `checkedKeys` 不受控且设置了 `checkedStrategy` 为 `parent` 或者 `child` 时，`onCheck` 的回调参数仍然是全部选中 `key` 的 bug。

## 2.18.2

2021-07-09

### 🐛 Bugfix

- 修复 `Tree` 组件在部分节点收起时，调用 `scrollIntoView` 方法未滚动到正确位置的 bug。

## 2.18.0

2021-07-02

### 🐛 Bugfix

- 修复 `Tree` 组件同时修改 `treeData` 和 `expandedKeys` 时候可能出现组件报错的 bug。
- 修复 `Tree` 组件在部分节点收起时，调用 `scrollIntoView` 方法未滚动到正确位置的 bug。

## 2.16.2

2021-06-06

### 🐛 Bugfix

- 修复 `Tree` 组件在传入的`checkedKeys`中没有对应节点时组件报错的问题。



## 2.16.1

2021-06-04

### 🐛 Bugfix

- 修复 `Tree` 组件默认选中时，无法递归选中所有子节点的 bug。
- 修复 `Tree` 组件设置 `fieldNames` 属性时，展开收起报错的 bug。
- 修复 `Tree.Node` 组件 `icons` 属性优先级低于了 `Tree` 的 `icons` 属性的 bug。

## 2.16.0

2021-05-28

### 💎 Optimization

- `Tree` 组件重构，优化大数据下的节点选中以及展开收起的卡顿现象。

### 🐛 Bugfix

- 修复 `Tree` 组件自定义的`switcherIcon`图标在叶子节点上未生效的问题。

## 2.13.0

2021-03-26

### 💅 Style

- 修复 `Tree` 组件在拖拽时显示的是 hover 样式的问题。

## 2.11.0

2021-03-12

### 🆕 Feature

- `Tree` 和 `TreeSelect` 组件支持 `fieldnames` 属性，指定 `treeData` 对应的字段名。
- `Tree` 组件支持 `scrollIntoView` 传入 node 的 `key` 滚动到指定字段。

### 💅 Style

- 修复 `Tree` 组件显示连接线的样式问题。

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- `Tree` 组件支持 `icons` 属性传入函数。

### 🐛 Bugfix

- 修复 `Tree` 动态加载数据 promise.reject 的时候，节点不执行展开逻辑的 bug。
- 修复 `Tree` 组件收起节点时，导致 `onSelect` 第二个参数 `selectNodes` 出现 `undefined` 的 bug。
- 修复 `Tree` 组件在开启虚拟滚动的情况下，动态改变高度，对应的多出来高度的内容不会自动更新显示的 bug。

## 2.7.0

2021-01-15

### 🆕 Feature

- `Tree` 组件新增 `allowDrop` 属性。



## 2.5.1

2020-12-31

### 🐛 Bugfix

- 修复 `Tree` 组件在动态加载数据后，外部更新 treeData，子节点列表未展开的问题。
- 修复 `Tree` 组件当拖拽节点和释放位置节点一致时不应该触发`oDrop`事件的问题

## 2.5.0 🎅🏽

2020-12-25 🎄

### 💎 Optimization

- `Tree` 组件拖拽做节流提升性能。

### 🐛 Bugfix

- 修复 `Tree` 组件虚拟列表无法拖拽的 bug。
- 修复 `Tree` 组件在动态加载数据后，外部更新 treeData，子节点列表未展开的 bug。



## 2.4.1

2020-12-18

### 🐛 Bugfix

- 修复 `Tree` 组件拖拽失效的问题。

## 2.3.1

2020-12-04

### 🐛 Bugfix

- 修复 `Tree` 在动态加载数据后未自动展开的问题。
- 修复 `Tree` 组件在展开收起时候子节点闪现的问题。

## 2.2.0

2020-11-20

### 🆎 TypeScript

- `Tree` 组件 `loadMore` 的参数类型由 `NodeProps` 变更为 `NodeInstance`。

## 2.1.2

2020-11-13

### 🐛 Bugfix

- 使用 `ref` 替代 `Tree` 中的 `findDOMNode`，避免在严格模式下报错。
