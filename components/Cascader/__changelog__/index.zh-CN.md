## 2.57.0

2023-12-08

### 🆕 功能升级

- `Cascader` 组件 `showSearch.renderOption`  函数中增加额外参数  `options`([#2384](https://github.com/arco-design/arco-design/pull/2384))

## 2.54.0

2023-10-09

### 🆕 功能升级

- `Cascader` 组件支持通过 `autoWidth` 属性设置宽度自适应。([#2274](https://github.com/arco-design/arco-design/pull/2274))

## 2.52.2

2023-09-01

### 🐛 问题修复

- 修复 `Cascader` 组件 `rtl` 模式下面板选项箭头位置异常的问题。([#2201](https://github.com/arco-design/arco-design/pull/2201))

## 2.52.0

2023-08-18

### 🆕 功能升级

- `Cascader` 组件支持 `icons` 参数设置图标。([#2062](https://github.com/arco-design/arco-design/pull/2062))

## 2.51.2

2023-08-11

### 🐛 问题修复

- 修复 `Cascader` 组件受控时 `dragToSort` 属性不生效的 bug([#2140](https://github.com/arco-design/arco-design/pull/2140))

## 2.50.1

2023-07-14

### 🐛 问题修复

- 修复 `Cascader` 组件多选时选中节点会触发 onBlur 的 bug。([#2083](https://github.com/arco-design/arco-design/pull/2083))

## 2.49.1

2023-06-09

### 🐛 问题修复

- 修复 `Cascader` 组件无法通过键盘事件删除已选项的 bug。([#2024](https://github.com/arco-design/arco-design/pull/2024))

## 2.44.1

2023-02-03

### 🐛 问题修复

- 修复 `Cascader` 组件的键盘事件监听在其他元素被 Focus 时仍会被触发的 bug。([#1751](https://github.com/arco-design/arco-design/pull/1751))

## 2.42.2

2022-12-09

### 🐛 问题修复

- 修复 `Cascader` 组件远程搜索时，搜索结果面板可能出现空数据的 bug。([#1639](https://github.com/arco-design/arco-design/pull/1639))

## 2.41.0

2022-10-28

### 🆕 功能升级

- `Cascader` 组件支持通过 `addBefore` 属性设置前置标签([#1464](https://github.com/arco-design/arco-design/pull/1464))

### 🐛 问题修复

- 优化 `Cascader` 组件选项的 `title` 属性显示 `[object object]` 的问题。([#1468](https://github.com/arco-design/arco-design/pull/1468))
- 修复 `Cascader` 组件在设置 `changeOnSelect` & `mode=multiple` 时，子节点选中后父节点无法被选中的 bug([#1468](https://github.com/arco-design/arco-design/pull/1468))

## 2.40.0

2022-09-16

### 🆕 功能升级

- `Cascader` 组件支持监听 `onKeyDown` 回调。([#1360](https://github.com/arco-design/arco-design/pull/1360))

## 2.39.3

2022-09-02

### 🐛 问题修复

- 修复 `Cascader` 组件设置 `expandTrigger` 为 `hover` 时下拉列表的抖动问题。([#1365](https://github.com/arco-design/arco-design/pull/1365))
- 修复 `Cascader` 组件存在禁用子节点时，选中半选状态的父节点时无法切换选中状态的 bug。([#1354](https://github.com/arco-design/arco-design/pull/1354))

## 2.39.2

2022-08-26

### 🐛 问题修复

- 修复 `Cascader` 组件开启虚拟列表时，选中节点未正确滚动到视口的 bug。([#1329](https://github.com/arco-design/arco-design/pull/1329))

## 2.39.1

2022-08-19

### 💎 功能优化

- 优化 `Cascader` 组件多选时对传入的非法格式 `value` 的边界处理([#1304](https://github.com/arco-design/arco-design/pull/1304))

## 2.39.0

2022-08-12

### 🆕 功能升级

- `Cascader` 组件支持通过 `showSearch.panelMode` 属性控制下拉面板展示([#1267](https://github.com/arco-design/arco-design/pull/1267))
- `Cascader` 组件支持通过 `showSearch.renderOption` 属性自定义搜索项的渲染([#1267](https://github.com/arco-design/arco-design/pull/1267))

### 🐛 问题修复

- 修复 `Cascader` 组件的搜索面板存在 `value` 相同的选项时，开启虚拟滚动会出现选项渲染错乱的问题。([#1266](https://github.com/arco-design/arco-design/pull/1266))

## 2.37.0

2022-07-08

### 🆕 功能升级

- `Cascader` 组件支持通过对象类型的 `maxTagCount` 属性定制 `maxTag` 内容展示([#1112](https://github.com/arco-design/arco-design/pull/1112))
- `Cascader` 支持通过  `defaultActiveFirstOption` 属性设置搜索后默认高亮第一个选项。([#1096](https://github.com/arco-design/arco-design/pull/1096))

## 2.36.0

2022-06-24

### 🐛 问题修复

- 修复 `dragToSort` 在 `Cascader` 中不生效的问题([#1029](https://github.com/arco-design/arco-design/pull/1029))

## 2.35.0

2022-06-10

### 🆕 功能升级

- `Cascader` 支持通过 `virtualListProps` 开启虚拟列表([#972](https://github.com/arco-design/arco-design/pull/972))
- `Cascader` 支持通过 `dropdownMenuClassname` 设置下拉菜单自定义类名([#972](https://github.com/arco-design/arco-design/pull/972))
- `Cascader` 支持通过 `dropdownMenuColumnStyle` 设置下拉菜单每一列的样式([#972](https://github.com/arco-design/arco-design/pull/972))

### 🐛 问题修复

- 修复 `Cascader` 组件在设置回显方式为 `parent` 时，`value` 受控失效的 bug。([#983](https://github.com/arco-design/arco-design/pull/983))

## 2.34.0

2022-05-27

### 🆕 功能升级

- `Cascader` 组件支持通过 `InputValue` 属性控制输入框值 。([#931](https://github.com/arco-design/arco-design/pull/931))

## 2.32.0

2022-04-15

### 🐛 问题修复

- 修复 `Cascader` 组件 `checkedstrategy=parenet` 时，在搜索面板选中选项回显值错误的 bug 。([#763](https://github.com/arco-design/arco-design/pull/763))

## 2.31.2

2022-04-01

### 🐛 问题修复

- 修复 `Cascader` 组件在`expandTrigger=hover`，鼠标从路径节点移到叶子节点时，选项面板未更新的 bug。([#727](https://github.com/arco-design/arco-design/pull/727))

## 2.31.0

2022-03-25

### 🆕 功能升级

- `Cascader` 组件支持通过  `checkedStrategy` 属性设置多选时数据的回显方式([#692](https://github.com/arco-design/arco-design/pull/692))

## 2.30.1

2022-03-11

### 🐛 问题修复

- 修复 `Cascader` 组件在直接输入文本远程搜索时，组件默认值对应的 label 文本显示丢失的问题。([#632](https://github.com/arco-design/arco-design/pull/632))

## 2.30.0

2022-03-04

### 🐛 问题修复

- 修复 `Cascader` 组件单选时，第一次触发 `onChange` 时的第二个参数未传递当前选中节点信息的 bug。([#599](https://github.com/arco-design/arco-design/pull/599))

## 2.29.2

2022-02-25

### 🐛 问题修复

- 修复 `Cascader` 组件在受控时偶发复选框选中状态和传入 `value` 不一致的bug。([#587](https://github.com/arco-design/arco-design/pull/587))

## 2.29.1

2022-02-18

### 🐛 问题修复

- 修复 `Cascader` 组件多选情况下出现选中状态渲染出错的问题。([#544](https://github.com/arco-design/arco-design/pull/544))

## 2.29.0

2022-02-11

### 💎 优化

- 优化 `Cascader` 组件大数据下多选时候选中操作卡顿的问题。([#523](https://github.com/arco-design/arco-design/pull/523))

### 🐛 问题修复

- 修复 `Cascader` 组件 `showSearch.retainInputValueWhileSelect` 不生效的 bug([#524](https://github.com/arco-design/arco-design/pull/524))

## 2.26.2

2021-12-10

### 🐛 问题修复

- 修复 `Cascader` 在多选且父子节点不关联时，选中父节点触发了 `loadMore` 的 bug。([#309](https://github.com/arco-design/arco-design/pull/309))

## 2.25.1

2021-11-26

### 🐛 问题修复

- 修复受控模式下 `cascader` 组件的 `value` 未改变，选项的选中状态仍然改变了的问题 。([#234](https://github.com/arco-design/arco-design/pull/234))

## 2.23.4

2021-10-26

### 🐛 问题修复

- 修复 `Cascader` 组件在禁用时，弹出层会响应键盘事件并弹出的问题。([#21](https://github.com/arco-design/arco-design/pull/21))

## 2.22.0

2021-09-10

### 💎 优化

- 优化 `Cascader` 组件最近选择的选项展示在输入框最后。

### 🐛 问题修复

- 修复 `Cascader` 组件在设置选项 `disableCheckbox=true` 时，无法点击展开下一级选项的 bug。

## 2.21.0

2021-08-20

### 🆕 功能升级

- `Cascader` 组件支持多选时通过 `disableCheckbox` 属性单独禁用选项的复选框.

### 🐛 Bugfix

- 修复 `Cascader` 初始值对应的节点被动态加载完成时，未展示为选中状态的 bug。

- 修复 `Cascader` 组件在设置`disableCheckbox`时，点击文字仍然会被选中的 bug

## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `Cascader` 组件在单选时选中叶子节点，面板未自动收起的 bug。
- 修复 `Cascader` 在设置 `options={[]}`，并且自定义面板宽度时，空元素未居中的 bug。

## 2.20.0

2021-07-30

### 🆕 Feature

- `Cascader` 组件新增 `onSearch` 属性以进行远程搜索。

## 2.17.0

2021-06-18

### 🆕 Feature

- `Cascader` 组件的 `dropdownColumnRender` 新增 `level` 参数。



## 2.15.3

2021-05-21

### 🐛 Bugfix

- 修复 `Cascader` 组件在 `footer` 中渲染的 `Input` 标签无法被聚焦的 bug。



## 2.15.0

2021-04-30

### 🆕 Feature

- `Cascader` 组件新增 `dropdownRender`、`dropdownColumnRender` 属性以支持自定义下拉框渲染。

### 🐛 Bugfix

- 修复 `Cascader` 组件误将外部传入的不存在对应 Option 的 value 清除的 bug。

## 2.13.3

2021-04-06

### 🐛 Bugfix

- 修复 `Cascader` 在点清除按钮后，输入文本进行搜索时，组件出现控制台报错的问题。



## 2.8.2

2021-01-29

### 🐛 Bugfix

- 修复 `Cascader` 组件在下拉框收起时`onVisibleChange`未触发的问题。

## 2.7.0

2021-01-15

### 🆎 TypeScript

- 修复 `Cascader` 组件 `renderOption` 方法的 TS 定义，并且导出组件相关的接口。



## 2.5.1

2020-12-31

### 🐛 Bugfix

- 修复 `Cascader` 样式按需加载缺少`tag`样式的问题。

## 2.4.0

2020-12-11

### 🐛 Bugfix

- `Cascader` 动态加载数据时，处理 `loadMore` 抛出的异常，避免节点一直处于 loading 状态。

## 2.3.1

2020-12-04

### 💅 Style

- 修复 `Cascader` 层级较深，列表较多，出现折行的样式问题。



## 2.1.0

2020-11-06

### 🐛 Bugfix

- 修复 `Cascader` 组件在受控模式时 `value` 改变，`options` 节点选中状态未更新的 bug。

