## 2.46.3

2023-04-07

### 🐛 问题修复

- 修复 `Select` 组件多选模式下点击 `Tag` 的关闭按钮删除选项时，`Select` 会变为 Focus 状态的问题。([#1894](https://github.com/arco-design/arco-design/pull/1894))

## 2.46.1

2023-03-24

### 🐛 问题修复

- 修复 `Select` 多选模式下，选择第一个选项时下拉框抖动问题。([#1863](https://github.com/arco-design/arco-design/pull/1863))

## 2.46.0

2023-03-17

### 🆕 功能升级

- `Select` 组件 `ref` 引用新增 `scrollIntoView` 方法以支持滚动列表至指定选项。([#1843](https://github.com/arco-design/arco-design/pull/1843))

## 2.45.2

2023-03-10

### 🐛 问题修复

- 修复 `Select` 组件 `dragToSort` 和 `maxTagCount` 配合使用时，拖拽排序结果异常的问题。([#1830](https://github.com/arco-design/arco-design/pull/1830))

## 2.45.1

2023-03-01

### 🐛 问题修复

- 修复 `Select` 选项内容为空字符串时，选项在下拉列表中不展示的问题。([#1807](https://github.com/arco-design/arco-design/pull/1807))

## 2.45.0

2023-02-17

### 💎 功能优化

- 优化 `Select` 允许创建选项时，如果搜索结果返回同样 `option.value` 的选项，此选项未更新的问题。([#1788](https://github.com/arco-design/arco-design/pull/1788))

## 2.44.1

2023-02-03

### 💎 功能优化

- 优化 `Select` 组件搜索/创建选项后，失焦导致的下拉框抖动问题。([#1747](https://github.com/arco-design/arco-design/pull/1747))

## 2.43.2

2023-01-06

### 💎 功能优化

- 优化 `Select` 组件选项值的空字符串展示。([#1703](https://github.com/arco-design/arco-design/pull/1703))

## 2.42.2

2022-12-09

### 💎 功能优化

- `Select` 允许在 `allowCreate` 并且无选项数据时展示下拉框。([#1640](https://github.com/arco-design/arco-design/pull/1640))

## 2.42.0

2022-11-25

### 🐛 问题修复

- 修复 Firefox 浏览器下当 `showSearch = true` 时，Select 需要点击两次才能弹出下拉框的问题。([#1569](https://github.com/arco-design/arco-design/pull/1569))

## 2.41.1

2022-11-04

### 🐛 问题修复

- 修复 `Select` 组件在 `value = ''` 时，错误将 `placeholder` 作为 `value` 展示的 bug。([#1536](https://github.com/arco-design/arco-design/pull/1536))

### 💅 样式更新

- 修复 `Select` 组件在 `Input.Group` 内使用时竖直方向无法对齐的问题。([#1534](https://github.com/arco-design/arco-design/pull/1534))

## 2.41.0

2022-10-28

### 🆕 功能升级

- `Select` 组件支持通过 `addBefore` 属性设置前置标签([#1464](https://github.com/arco-design/arco-design/pull/1464))

### 🐛 问题修复

- 修复 `Select` 在 `width: auto` 时宽度未跟随内容自动变化的问题。（单选模式下内层新增 DOM 节点直接包裹 `.arco-select-view-value` 和 `input` 标签）([#1490](https://github.com/arco-design/arco-design/pull/1490))

## 2.40.0

2022-09-16

### 🆕 功能升级

- `Select` 组件支持监听 `onKeyDown` 回调。([#1360](https://github.com/arco-design/arco-design/pull/1360))

## 2.39.2

2022-08-26

### 💎 功能优化

- 确保 `Select` 组件使用 `dropdownRender` 自定义下拉框内容并获取页面焦点时，键盘快捷键仍然可用。([#1328](https://github.com/arco-design/arco-design/pull/1328))

## 2.39.1

2022-08-19

### 💅 样式更新

- 统一 `Select` 多选和单选模式下的右侧箭头样式。([#1302](https://github.com/arco-design/arco-design/pull/1302))

## 2.38.0

2022-07-29

### 🐛 问题修复

- 修复 Select 在 `allowCreate` 时下拉框闪烁空状态的问题。([#1184](https://github.com/arco-design/arco-design/pull/1184))

## 2.37.2

2022-07-22

### 🐛 问题修复

- 修复 `Select` 组件 `inputValue` 受控模式下，`onInputValueChange` 回调可能无法触发的问题。([#1178](https://github.com/arco-design/arco-design/pull/1178))

## 2.37.0

2022-07-08

### 🆕 功能升级

- `Select` 组件支持通过对象类型的 `maxTagCount` 属性定制 `maxTag` 内容展示([#1112](https://github.com/arco-design/arco-design/pull/1112))

## 2.35.1

2022-06-17

### 💎 功能优化

- `Select` 组件通过 Dom Attribute 标记用户正在创建和已经创建的选项。([#1011](https://github.com/arco-design/arco-design/pull/1011))

## 2.35.0

2022-06-10

### 🐛 问题修复

- 修复 `Select` 组件设置 `LabelInValue` 时可能出现的回调参数格式错误的 bug。([#953](https://github.com/arco-design/arco-design/pull/953))

## 2.32.2

2022-04-29

### 🐛 问题修复

- 修复 `Select` 组件搜索时匹配到的选项文本未高亮的问题。([#808](https://github.com/arco-design/arco-design/pull/808))

## 2.32.0

2022-04-15

### 🐛 问题修复

- 修复 `Select.Option` 传入 `onMouseEnter` 和 `onMouseLeave` 未生效的 bug。([#729](https://github.com/arco-design/arco-design/pull/729))

## 2.31.0

2022-03-25

### 🆕 功能升级

- `Select` 组件 `triggerElement` 属性允许传入函数以自定义组件触发节点。([#686](https://github.com/arco-design/arco-design/pull/686))

## 2.30.1

2022-03-11

### 🐛 问题修复

- 修复 `Select` 多选时 Tag 动画失效的 bug。([#630](https://github.com/arco-design/arco-design/pull/630))
- 修复 `Select` 设置 `maxTagCount` 时按下 `Backspace` 键时未按正确顺序删除选项的 bug。([#630](https://github.com/arco-design/arco-design/pull/630))

## 2.28.2

2022-01-21

### 🐛 问题修复

- `Select` 修复 `allowCreate` 为 `false` 时，自动分词引入了新选项的问题。([#466](https://github.com/arco-design/arco-design/pull/466))

## 2.28.1

2022-01-14

### 💎 优化

- `Select` 组件优化 `labelInValue` 时通过对象形式指定了初始值时的渲染表现。([#448](https://github.com/arco-design/arco-design/pull/448))
- 禁用浏览器对于 `Select` 输入框的自动填充。([#439](https://github.com/arco-design/arco-design/pull/439))
- `Select.Option` 允许不传入子节点。([#419](https://github.com/arco-design/arco-design/pull/419))

## 2.27.2

2021-12-31

### 🐛 问题修复

- `Select` 修复允许创建选项时，被禁用的选项可以被通过用户输入的方式被选中的 bug。([#373](https://github.com/arco-design/arco-design/pull/373))

## 2.27.1

2021-12-24

### 🐛 问题修复

- 修复 `Select` 组件 `popupVisible` 为 `false` 时，失焦后输入框的文本未被清空的 bug。([#359](https://github.com/arco-design/arco-design/pull/359))

## 2.27.0

2021-12-17

### 🆕 功能升级

- `Select` 新增 `dragToSort` 属性以支持通过拖拽为已输入的值排序 。([#325](https://github.com/arco-design/arco-design/pull/325))

## 2.26.1

2021-12-07

### 🐛 问题修复

- 修复 `Select` 组件多选时，`prefix` 节点丢失 `font-size` 样式的 bug。([#284](https://github.com/arco-design/arco-design/pull/284))

## 2.26.0

2021-12-03

### 🆕 功能升级

- `Select` 组件新增 `clearIcon` 属性用于自定义清除按钮图标。([#256](https://github.com/arco-design/arco-design/pull/256))

### 🐛 问题修复

- `Select` 组件修复 `renderFormat` 回调在设置 `labelInValue` 时，其参数未返回对象的 bug。([#257](https://github.com/arco-design/arco-design/pull/257))

## 2.24.1

2021-11-12

### 🐛 问题修复

- `Select` 修复用户无法在 CSS 文件中覆盖弹窗高度的问题。([#148](https://github.com/arco-design/arco-design/pull/148))
- `Select` 修复单选时虚拟列表定位异常的 bug。([#148](https://github.com/arco-design/arco-design/pull/148))

## 2.23.5

2021-10-29

### 🐛 问题修复

- 修复 `Select` 组件设置选项高度可能导致的虚拟列表定位异常。([#55](https://github.com/arco-design/arco-design/pull/55))

## 2.23.2

2021-10-22

### 🐛 问题修复

- 修复 `Select` 组件 `labelInValue` 且多选时，没有初始值导致的报错。

## 2.23.1

2021-10-15

### 🐛 问题修复

- 修复 `Select` 组件在某些浏览器中点击文字区域下拉框未能展开的 bug。
- 修复 `Select` 组件使用虚拟滚动时数据更新可能引起的抖动。
- 修复 `Select` 组件 `mode` 为 `multiple` 且 `labelInValue` 为 `true` 时，`value` 传入对象数组导致报错的 bug。

## 2.22.0

2021-09-10

### 🆕 功能升级

- `Select` 组件 `ref` 引用新增 `activeOptionValue` 属性，挂载当前悬浮态选项的值。

### 🐛 问题修复

- `Select` 组件修复 `ref` 引用未更新的 bug。

## 2.21.1

2021-08-27

### 💎 优化

- 仅在需要渲染的值为字符串时为 DOM 添加其对应的 `title` 属性

## 2.21.0

2021-08-20

### 💎 优化

- 优化 `allowCreate` 时将用户输入中的文字作为选项列表的第一个。

### 🐛 Bugfix

- 修复设置 `labelInValue` 和 `allowClear` 时，清空选项导致 `onChange` 回调报错的 bug。

## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `Select` 组件设置了 `trigger` 为 `focus` 时点击右侧的下拉图标 `Select` 未展开的 bug。

## 2.19.3

2021-07-23

### 💎 Optimization

- `Select` 在设置了 `labelInValue` 并且传入了对象形式的初始值时，选择框文本优先展示用户传入的 label。



### 🐛 Bugfix

- 修复 `Select` 组件 `tokenSeparators` 设置为中文字符在 Windows 系统不生效的 bug。
- 修复 `Select` 在存在分组并且搜索时，键盘选择选项可能失效的 bug。

## 2.19.0

2021-07-16

### 💎 Optimization

- `Select` 组件添加 HTML 原生的 `title` 属性，用于在鼠标悬浮时显示文本。



## 2.17.2

2021-06-22

### 🐛 Bugfix

- 修复 `Select` 组件触发自动分词时，最后触发的选项未添加到选项列表的 bug。



## 2.17.0

2021-06-18

### 💎 Optimization

- `Select` 组件多选时输入框的宽度增加 4 px，方便用鼠标选择文字。

### 🆕 Feature

- `Select` 组件 `tokenSeparators` 支持传入 `\n` 和 `\t`。

## 2.15.3

2021-05-21

### 🐛 Bugfix

- 修复 `Select` 父组件直接设置 `inputValue` 错误触发了 `onSearch` 回调的 bug。
- 修复 `Select` 设置 `labelInValue` 时，在 `Form` 中使用报错的 bug。

## 2.15.2

2021-05-14

### 🐛 Bugfix

- 修复 `Select` 多选聚焦后，输入框的箭头图标变为搜索图标的 bug。

## 2.15.0

2021-04-30

### 🆕 Feature

- 新增 `animation` 属性以支持关闭多选时的标签动画；
- `renderTag` 属性新增 `index` 和 `values` 参数以适应更复杂的自定义标签渲染方式；
- `maxTagCount` 属性允许传入的最小值由 1 变更为 0。

### 🐛 Bugfix

- 修复 `Select`、`TreeSelect`、`Cascader` 组件多选时设置 `showSearch=false` 不生效的 bug。

## 2.14.2

2021-04-23

### 🐛 Bugfix

- 修复 `Select` 直接设置 `value` 为 `undefined` 时，受控模式异常的 bug。
- 修复 `Select` 组件 `dropdownMenuStyle.maxHeight` 不生效的 bug。
- 修复 `Select` 多选模式下，点击选项前的复选框导致输入框失焦的 bug。

## 2.14.1

2021-04-16

### 🐛 Bugfix

- 修复 `Select` 组件 `tokenSeparators` 设置为换行符时，触发分词后粘贴的内容未被清空的 bug。

## 2.14.0

2021-04-09

### 🆕 Feature

- `Select` 组件 ref 暴露 `getOptionInfoList` 接口用以获取所有需要渲染的 Option 的信息。
- `Select` 新增 `defaultPopupVisible` 属性以控制下拉框是否默认弹出。

### 🐛 Bugfix

- 修复 `Select` 组件 `dropdownMenuStyle` 和 `dropdownMenuClassName` 在无选项时不生效的 bug。

### 🆎 TypeScript

- `Select` 组件 children 的 TS 定义回滚为 `ReactNode`。



## 2.13.2

2021-04-01

### 🐛 Bugfix

- 修复 `Select` 组件的父组件更新可能导致当前处于激活态的选项恢复为默认的 bug。
- 修复 `Select` 组件多选聚焦时点击浏览器窗口外，输入框中选中项背景色改变的 bug。
- 修复 `Select` 组件单选偶现的下拉框无法关闭的 bug。

## 2.13.1

2021-03-28

### 🐛 Bugfix

- 修复 `Select` 组件 `children` 传入假值时报错的问题。



## 2.13.0

2021-03-26

### 🆕 Feature

- `Select` 组件新增 `allowCreate` 属性，在单选模式下允许通过输入创建新条目。
- `Select` 支持 `Options` 中混入自定义的 DOM 节点。
- `Select` 组件 `onInputValueChange` 和 `onSearch` 提供 `reason` 参数，告知外部 inputValue 尝试改变的具体原因。



### 🐛 Bugfix

- `Select` 组件 `notFoundContent` 传入 `null` 时，无数据时不应该展示下拉框。

## 2.11.1

2021-03-15

### 🆎 TypeScript

- 修复 `Select` 组件`filterOption`回调函数中 `option` 参数的TS类型错误

## 2.11.0

2021-03-12

### 🆕 Feature

- `Select.Option` 和 `Select.OptGroup` 支持传入原生的 HTML 属性。
- `Select` `Cascader` `TreeSelect` 组件支持 `prefix` 属性设置前缀。

### 🐛 Bugfix

- 修复 `Select` 组件在 React 17 中使用回车选中选项会触发表单的提交事件的 bug。

## 2.10.2

2021-03-09

### 🐛 Bugfix

- 修复 `Select` 组件 `Option` 的 `label` 为富文本节点时，选中之后未展示选中值的问题。

### 🆎 TypeScript

- 完善 `Select` 组件回调函数中 `option` 参数的类型。



## 2.10.1

2021-03-05

### 🐛 Bugfix

- 修复 `Select` 使用`maxTagCount`时，控制台出现元素需要唯一`key`警告的问题。

### 💅 Style

- 修复 `Select` 组件在 `value` 为空字符串时，外层 `div`高度被撑开出现多余高度的问题。



## 2.10.0 🏮

2020-02-26

### 🐛 Bugfix

- 修复 `Select` 组件模式切换和 placeholder 改变时，UI 存在的抖动 bug。

## 2.9.1

2021-02-20

### 🐛 Bugfix

- 修复 `Select` 组件 `value` 受控时，搜索之后直接修改 `value`，可能导致选择框展示的选中值异常的 bug。
- 修复 `Select` 组件 `tags` 模式 `value` 受控时，用户输入的选项某些情况未被正常移除的 bug。
- 修复 `Select` 组件点击选项隐藏下拉框时，未触发 `onVisibleChange` 回调的 bug。
- 修复 `Select` 组件多选模式下无法使用鼠标选中已输入的文字的 bug。
- 修复 `Select` 组件多选模式下，tag 文本过长时，删除按钮被遮盖的 bug。

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- `Select` 组件新增 `onPaste` 回调。
- `Select` 组件 ref 新增 `getOptionInfoByValue` 方法。

### 🐛 Bugfix

- 修复 `Select` 组件允许搜索且输入文本为空时，自定义 `filterOption` 仍然生效的 bug。
- 修复 `Select` 组件多选框宽度较窄时增删选项导致高度抖动的 bug。



## 2.7.0

2021-01-15

### 💅 Style

- 优化 `Select` 多选模式 `disabled` 状态时的样式。

## 2.6.0

2021-01-08

### 🆕 Feature

- `Select` 新增 `popupVisible` 属性，支持直接控制下拉框的展开收起状态。

### 🐛 Bugfix

- 修复 `Select`组件`mode=tag`时点击自定义`tag`的关闭按钮，偶发两个`tag`同时消失的问题。
- 修复 `Select`组件`mode=tag`时，修改 `props.value` 下拉列表中未出现 `options` 中不存在的 `value` 对应的选项的问题。

### 💅 Style

- 移除 `Select.Option` 样式中的 `height` 属性，避免自定义节点高度被限制的问题。

## 2.5.0 🎅🏽

2020-12-25 🎄

### 🐛 Bugfix

- 修复 `Select` 多触发了 `onInputValueChange` 的 bug。
- 修复 `Select` 组件 `options` 改变时，`defaultActiveFirstOption` 失效的 bug。

## 2.4.0

2020-12-11

### 🐛 Bugfix

- 兼容 `react-hot-loader` 导致的 `Select` 内部 `undefined` 报错。
- 修复 `Select` 组件 `showSearch` 和 `disabled` 一起使用时 输入框的鼠标样式未变成禁用的 bug。
- 修复 `Select` 输入搜索内容时窗口失焦，输入框内容会被恢复至初始态的 bug。
- 修复 `Select` 组件 `trigger` 属性传入 `focus` 时，`React.propTypes` 检查报错的 bug。
- 修复 `Select` tag 模式下使用自动分词，输入文本后输入分隔符，文本未被添加至选项中的 bug。



## 2.3.1

2020-12-04

### 🐛 Bugfix

- 修复 `Select` 组件 `removeIcon` 属性不生效。
- 修复 `Select` 组件 ref 没有暴露 DOM 节点的 bug。

## 2.3.0

2020-11-27

### 🆕 Feature

- `Select` 组件新增 `onInputValueChange` 回调，支持 `inputValue` 的受控模式。

### 🐛 Bugfix

- 修复 `Select` 组件可搜索情况下失焦时没有触发 `onSearch` 的 bug。
- 修复 `Select` 组件设置 `triggerProps.autoAlignPopupWidth = false` 时，下拉框宽度抖动的 bug。

### 💅 Style

- 修复 `Select` 组件标签模式输入超长标签失焦后输入框多出一行空白的样式问题。

## 2.2.0

2020-11-20

### 🆕 Feature

- `Select` 组件 `virtualListProps` 暴露 `height` `itemHeight` `isStaticItemHeight` 三个参数。
- `Select.Option` 组件新增 `extra` 属性以支持为 `Option` 传入任意自定义信息，方便在 `onChange` 回调中获得自定义信息。

### 🐛 Bugfix

- 修复 `Select` 组件添加新的选项时列表被滚动至最上边的 bug。

## 2.1.3

2020-11-19

### 💅 Style

- 修复 `Select` 组件 `bordered` 为 `false`，聚焦时仍有背景色的问题。



## 2.1.2

2020-11-13

### 🐛 Bugfix

- 修复 `Select` 配合 `filterOption` 搜索时，下拉框选项的字符串渲染了两次的 bug。
- 修复 `Select` 存在分组的时候，键盘方向键选择选项时无法触发下拉框滚动的 bug。
- 修复 `Select` 设置 `labelInValue` 时，得到的 `label` 为 `undefined` 的 bug。

## 2.1.1

2020-11-08

### 🐛 Bugfix

- 修复 `Select` 多选时，通过为 `Option` 传入自定义类名来自定义选项高度不生效的 bug。



## 2.1.0

2020-11-06

### 🆕 Feature

- `Select` 组件暴露虚拟滚动相关的接口 `virtualListProps`。

### 🐛 Bugfix

- 修复 `Select` 组件虚拟滚动时，设置的 `autoAlignPopupMinWidth` 无效的 bug。

### 🆎 TypeScript

- `Select.OptGroup` 的 `isSelectOptGroup` 改为非必须。



## 2.0.0

2020-10-30

### 🐛 Bugfix

- 修复 `Select` 组件 `tag` 模式下光标无法操控的 bug。

### 💅 Style

- 修复 `Select` 值内容过长时没有显示省略号的样式。



