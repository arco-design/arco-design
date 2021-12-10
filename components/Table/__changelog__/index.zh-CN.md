## 2.26.2

2021-12-10

### 💅 样式更新

- 修复 `Table` 组件树形数据时，`column.render` 返回 `div` 会导致折行的问题。([#302](https://github.com/arco-design/arco-design/pull/302))

## 2.26.0

2021-12-03

### 💅 样式更新

- 修复 `Table` 组件复选框列在固定表头时没有对齐的样式问题。([#261](https://github.com/arco-design/arco-design/pull/261))

## 2.25.0

2021-11-19

### 💅 样式更新

- 修复 `Table` 组件在开启 `virtualized` 之后，当滚动条始终显示时表头出现错位的样式问题。([#182](https://github.com/arco-design/arco-design/pull/182))

## 2.24.1

2021-11-12

### 💅 样式更新

- 修复 `Table` 组件在列存在筛选时，单元格 align = 'right' 时会重叠的样式问题。([#140](https://github.com/arco-design/arco-design/pull/140))

## 2.24.0

2021-11-05

### 💅 样式更新

- 修复 `Table` 组件在表头分组时，`border={{ border: true, headerCell: true }}` 时，表头边框线断裂的问题。([#120](https://github.com/arco-design/arco-design/pull/120))

## 2.23.4

2021-10-26

### 🐛 问题修复

- `Table` 组件展开按钮的 `type` 设置为 `button`，避免点击触发 Form submit。([#23](https://github.com/arco-design/arco-design/pull/23))

## 2.23.2

2021-10-22

### 🐛 问题修复

- 修复 `Table` 组件使用树形数据时有唯一 key 警告的问题。

## 2.23.1

2021-10-15

### 🐛 问题修复

- 修复 `Table` 组件 `rowSelection.renderCell` 在单选时不生效的 bug。

## 2.23.0

2021-09-27

### 💎 优化

- `Table` 组件排序和筛选的列在没有设置 `dataIndex` 时也可以生效。

### 🆕 功能升级

- `Table` 组件新增参数 `placeholder`, 当单元格内容为空时，显示占位符，优先级低于 `column.placeholder`。

## 2.22.0

2021-09-10

### 🆕 功能升级

- `Table` 组件添加参数 `rowSelection.onSelect`。
- `Table` 组件支持设置 `column.placeholder`。
- `Table` 组件 `onChange` 回调的第 4 个参数增加 `currentData` 的返回。

### 🐛 问题修复

- 修复 `Table` 组件在筛选受控的时候，点击重置按钮，状态没有及时更新的问题。

## 2.21.2

2021-08-30

### 🐛 问题修复

- 修复 `Table` 组件在固定表头时，一些边界条件下动态修改 `columns` 会造成表头表身不同步滚动的问题。

## 2.21.1

2021-08-27

### 🐛 Bugfix

- 修复 `Table` 组件更新 `columns.fixed`，固定列表头没有更新事件的 bug。同时修复自定义表头设置为函数组件时，不能正确联动滚动的 bug。

## 2.21.0

2021-08-20

### 🐛 Bugfix

- 修复 `Table` 组件排序在受控下，视觉表现不对的 bug。

### 💅 样式更新

- 修复 Table 组件设置 `border={{ wrapper: true }}` 时也不显示表头下边框的问题。。

## 2.20.0

2021-07-30

### 🐛 Bugfix

- 修复 `Table` 组件 `preserveSelectedRowKeys` 在 `pagination` 为 `false` 时不生效的 bug。
- 修复 `Table` 组件在受控 `expandedRowKeys` 时 `onExpandedRowsChange` 返回值使用了内部未受控 `keys` 的 bug。
- 修复 `Table` 组件 `defaultFilters` 没有在 `filterDropdown` 中体现的 bug。

## 2.19.3

2021-07-23

### 💅 Style

- `Table` 组件可编辑单元格样式优化，修复跟树形数据结合时错行的问题。

## 2.19.0

2021-07-16

### 🆕 Feature

- `Table` 组件新增 `showSorterTooltip`，同时修复排序箭头被底色覆盖的样式问题。
- `Table` 组件新增 `expandProps.expandRowByClick`，支持点击行展开。
- `Table` 组件 `onChange` 参数新增第四个参数 `extra`，通过 `extra.action` 可以拿到当前触发动作。
- `Table` 组件新增 `rowSelection.renderCell`，支持定制复选框。
- `Table` 组件新增 `rowSelection.preserveSelectedRowKeys`，支持在数据项被删除之后保留 `selectedRowKeys` 中的 `key` 值。

## 2.18.2

2021-07-09

### 🐛 Bugfix

- 修复 `Table` 组件动态改变 `columns` 时，在树形数据判断是否时第一列时，存在多个第一列的 bug。



### 💅 Style

- 修复 `Table` 组件在表身存在滚动条时，数据变少滚动条消失，表头滚动条依然存在的样式问题。



## 2.18.1

2021-07-04

### 🐛 Bugfix

- 修复 `Table` 组件动态设置 `columns` 时，固定列逻辑没有处理的 bug。
- 修复 `Table` 组件开启虚拟滚动同时设置了 `scroll.x`，样式表现不对的问题。



## 2.18.0

2021-07-02

### 🐛 Bugfix

- 修复 `Table` 组件开启虚拟滚动之后，空数据显示有问题的 bug。
- 修复 `Table` 组件 `rowSelection` 切换为 `undefined` 之后导致报错的 bug。
- 修复 `Table` 组件在 `data` 改变之后，没有过滤 `selectedRowKeys` 中不存在的值的 bug。

## 2.17.3

2021-06-24

### 🐛 Bugfix

- 修复 `Table` 组件前置操作列用 `Tooltip` 包裹无法显示弹出的 bug。
- 修复 `Table` 组件 `column.width` 为 `string` 不生效的 bug。



### 🆎 TypeScript

- `Table` 组件 `column.children` 类型修正，修复表头分组时无法推导嵌套类型的问题。
- `Table` 组件 `column.filters` 类型修正，修复无法推导类型的问题。



## 2.17.1

2021-06-20

### 🐛 Bugfix

- 修复 `Table` 组件虚拟滚动同时设置 x 轴滚动不生效的问题。



## 2.17.0

2021-06-18

### 🆕 Feature

- `Table` 组件新增功能总结栏。
- `Table` 组件自定义前置操作列 `components.body.operations` 的 node 支持传入函数，该函数会接收 `record` 参数。

### 🐛 Bugfix

- 修复 `Table` 组件点击展开按钮，会冒泡到 `onRow.onClick` 的 bug。
- 修复 `Table` 组件 `pagination=false` 时，排序和筛选不生效的 bug。
- 修复 `Table` 组件 `rowSelection.selectedRowKeys` 中有 data 中不存在的值时选择报错的 bug。



## 2.16.0

2021-05-28

### 🆕 Feature

- `Table` 组件添加 `expandProps.rowExpandable` 参数，控制是否允许展开，优先级高于 `expandRowRender` 返回值。



## 2.15.3

2021-05-21

### 🐛 Bugfix

- `Table` 组件的 `propTypes` 中 `scroll` 添加 `string` 类型，避免 warning。
- 修复 `Table` 组件在翻页时，清空选中项但是没有触发 `rowSelection.onChange` 回调的 bug。

## 2.15.1

**注意：本次发版修复了 `2.15.0` 可能存在的隐患，如果你想升级 `2.15.0`，请直接升级到 `2.15.1`。**
**`2.15.0` 可能会在打包时出现 less 字体报错。**

### 💅 Style

- 修复 `Table` 组件 `size` 属性设置不生效的问题。



## 2.15.0

2021-04-30

### 💎 Optimization

- `Table` 组件优化选中逻辑，解决可能存在的keys、rows不同步的问题。

### 🆕 Feature

- `Table` 组件新增 `rowSelection.pureKeys` 参数，用于优化大数据选中体验。

### 🐛 Bugfix

- 修复 `Table` 组件 `pagination.defaultPageSize` 不生效的 bug。
- 修复 `Table` 组件 `onCell` 传自定义参数可能导致 Dom Warning 的 bug。

### 💅 Style

- 修复 `Table` 组件开启虚拟滚动和选中框之后，选中框宽度不对的问题。

### 🆎 TypeScript

- 修正 `Table` 组件 `expandedRowKeys` 的定义。



## 2.14.2

2021-04-23

### 💅 Style

- 修复 `Table` 组件表头自定义 `border-radius` 过大，内部元素会超出的样式问题。



## 2.14.1

2021-04-16

### 💎 Optimization

- `Table` 组件翻页时自动滚动至表格顶部。



## 2.14.0

2021-04-09

### 🐛 Bugfix

- 修复 `Table` 组件设置 `operations` 之后，空数据时总列数计算错误的 bug。

## 2.13.0

2021-03-26

### 💅 Style

- 修复 `Table` 组件在开启虚拟滚动时，复选框列没有居中的样式问题。

## 2.11.0

2021-03-12

### 🆕 Feature

- `Table` 组件支持 `renderPagination` 来自定义分页部分。

## 2.10.2

2021-03-09

### 🐛 Bugfix

- 修复 `Table` 组件 `bodyCellStyle` 会覆盖掉固定列样式的问题。



## 2.10.0 🏮

2020-02-26

### 💅 Style

- 修复 `Table` 组件在只有一页隐藏分页器时，依旧能看到分页器边距的样式问题。

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- 优化 `Table` 组件固定列类名计算逻辑，避免数据量大时滚动卡顿明显的问题。



### 🐛 Bugfix

- 修复 `Table` 组件 `expandedRowRender` 返回 `null` 时依旧会渲染空单元格的 bug。

## 2.8.1

2021-01-28

### 💅 Style

- 修复 `Table` 组件无数据时依旧有下边框的样式问题。



## 2.8.0

2021-01-22

### 🐛 Bugfix

- 修复 `Table` 组件 `expandedRowRender` 回调中 `index` 从 -1 开始而不是 0 的 bug。

### 💅 Style

- `Table` 筛选样式更新。

## 2.7.1

2021-01-18

### 🐛 Bugfix

- `Table` 组件圆角设置到 `header` 上，修复在某些场景下 chrome 引擎导致的滚动卡顿问题。
- 修复 `Table` 组件 `onChange` 回调在 `onSelectAll` 之前，导致 `onSelectAll` 受控被覆盖的 bug。



### 💅 Style

- 修复 `Table` 组件加载图标跟描述文案重叠的样式问题。

## 2.7.0

2021-01-15

### 🐛 Bugfix

- 修复 `Table` 组件 `onCell` 传入自定义参数，在自定义 `Cell` 组件内无法接受自定义参数的问题。

### 💅 Style

- 移除 `Table` 组件无数据时的下边框。

## 2.6.0

2021-01-08

### 🆕 Feature

- `Table` 组件新增 `rowSelection.onSelectAll` 属性，支持用户手动选择/取消选择所有行。

### 🐛 Bugfix

- 修复 `Table`传入`data`为`null`时，组件内部报错的问题。

## 2.5.0 🎅🏽

2020-12-25 🎄

### 🐛 Bugfix

- 修复 `Table` 定制前置操作列为空列的时候没有过滤掉引发空白的 bug。

## 2.4.1

2020-12-18

### 🆎 TypeScript

- 修正 `Table` 组件泛型定义及完善 `Ref` 类型。



## 2.4.0

2020-12-11

### 🆎 TypeScript

- `Table` 组件 `column.width` ts 类型添加 string 类型。

## 2.3.1

2020-12-04

### 🆎 TypeScript

- `Table` 组件的 `data` 和 `columns` 属性类型定义改为可选。

## 2.3.0

2020-11-27

### 🆕 Feature

- `Table` 组件 `filterDropdown` 的 `confirm` 参数添加参数 `filterKeys`，修复 `confirm` 不能立即拿到最新 `filterKeys` 的 bug。



### 💅 Style

- 修复 `Table` 组件空数据状态在固定列时暂无数据不居中的样式问题。



## 2.2.0

2020-11-20

### 💅 Style

- 修复 `Table` 组件在开启虚拟列表的时候，没有数据时 "暂无数据" 的提示未居中的问题。

## 2.1.0

2020-11-06

### 💅 Style

- 修复当 `Table` 组件高度过小时，选择分页条目的弹出框被遮盖的样式问题。
- 修复 `Table` 组件的 loading 遮罩没有盖住固定列的问题。
- 修复 `Table` 下边框被固定列覆盖的样式问题。

## 2.0.0

2020-10-30

### 🐛 Bugfix

- 修复 `Table` 组件 `pagination.sizeCanChange` 设置之后，点击切换分页无效的 bug。

