---
changelog: true
---

## 2.32.0

2022-04-15

### 🆕 功能升级

- `Form`  组件支持通过 `validateMessages` 属性设置校验提示信息模板([#773](https://github.com/arco-design/arco-design/pull/773))
- `Trigger` 组件支持通过 `updateOnScroll` 属性，设置在容器滚动时更新弹出框的位置。([#770](https://github.com/arco-design/arco-design/pull/770))
- `List` 组件 `scrollIntoView` 方法允许指定列表滚动的具体行为。([#768](https://github.com/arco-design/arco-design/pull/768))
- `List` 组件 `virtualListProps` 允许指定虚拟列表元素高度以改善滚动效果。([#768](https://github.com/arco-design/arco-design/pull/768))
- `Pagination` 组件新增 `bufferSize` 属性，支持设置页码被折叠时的展示区间([#767](https://github.com/arco-design/arco-design/pull/767))
- `Slider` 组件的 `showInput` 支持传入`InputNumberProps`([#762](https://github.com/arco-design/arco-design/pull/762))

### 🐛 问题修复

- `Typography` 组件多行省略支持不同样式的文本。([#776](https://github.com/arco-design/arco-design/pull/776))
- 修复 `Typography` 设置 `white-space` 后无法折叠的bug([#772](https://github.com/arco-design/arco-design/pull/772))
- 修复 `TimePicker` 输入正确时不触发 `onSelect` 事件的 bug。([#769](https://github.com/arco-design/arco-design/pull/769))
- 修复 `DatePicker.RangePicker` 组件 `utcOffset` 和 `timezone` 不生效的 bug。([#765](https://github.com/arco-design/arco-design/pull/765))
- 修复 `Cascader` 组件 `checkedstrategy=parenet` 时，在搜索面板选中选项回显值错误的 bug 。([#763](https://github.com/arco-design/arco-design/pull/763))
- 修复 `Form.Item` 包裹的表单控件是由函数类型的 `children` 返回时，`onChange` 未被调用的 bug。([#760](https://github.com/arco-design/arco-design/pull/760))
- 修复 `Select.Option` 传入 `onMouseEnter` 和 `onMouseLeave` 未生效的 bug。([#729](https://github.com/arco-design/arco-design/pull/729))
- 优化`Modal`在弹窗内弹窗, 使用 ESC 时会关闭所有弹窗的行为([#629](https://github.com/arco-design/arco-design/pull/629))

### 🆎 类型修正

- 调整 `Checkbox` 的 `children` 属性类型定义。([#753](https://github.com/arco-design/arco-design/pull/753))

## 2.31.3

2022-04-11

### 🐛 问题修复

- 修正 `DatePicker` 组件的 `disabledDate` 的 ts 定义。([#750](https://github.com/arco-design/arco-design/pull/750))
- 修复 `DatePicker.RangePicker` 组件直接选择时间会报错的 bug。([#749](https://github.com/arco-design/arco-design/pull/749))

## 2.31.2

2022-04-01

### 🐛 问题修复

- 修复 `Cascader` 组件在`expandTrigger=hover`，鼠标从路径节点移到叶子节点时，选项面板未更新的 bug。([#727](https://github.com/arco-design/arco-design/pull/727))
- 修复 `Affix` 子元素不合法时 `ResizeObserver`会报错的bug([#726](https://github.com/arco-design/arco-design/pull/726))

## 2.31.1

2022-03-28

### 💅 样式更新

- 修复 `Table` 组件开启虚拟列表时复选框列宽度异常的问题。([#696](https://github.com/arco-design/arco-design/pull/696))

## 2.31.0

2022-03-25

### 🆕 功能升级

- `Cascader` 组件支持通过  `checkedStrategy` 属性设置多选时数据的回显方式([#692](https://github.com/arco-design/arco-design/pull/692))
- `Select` 组件 `triggerElement` 属性允许传入函数以自定义组件触发节点。([#686](https://github.com/arco-design/arco-design/pull/686))
- `TreeSelect` 组件 `triggerElement` 属性允许传入函数以自定义组件触发节点。([#686](https://github.com/arco-design/arco-design/pull/686))
- `AutoComplete` 组件 `triggerElement` 属性允许传入函数以自定义组件触发节点。([#686](https://github.com/arco-design/arco-design/pull/686))
- `Typography` 的 `copyable` 和 `editable` 对应点击回调暴露 `event` 参数。([#684](https://github.com/arco-design/arco-design/pull/684))
- `Table` 组件支持排序树形数据。([#678](https://github.com/arco-design/arco-design/pull/678))

### 🐛 问题修复

- 修复 `List` 组件栅格布局下 `render` 方法的 `index` 参数错误的 bug。([#688](https://github.com/arco-design/arco-design/pull/688))
- 修复 `DatePicker` 组件 `disabledDate` 在快捷选择面板边界不正确的问题。([#687](https://github.com/arco-design/arco-design/pull/687))
- 修复 `Slider` 的步长设置为小数时计算出错的 bug([#655](https://github.com/arco-design/arco-design/pull/655))
- 修复 `Slider` 点击非滑动轴区域控制台报错的 bug([#655](https://github.com/arco-design/arco-design/pull/655))

### 💅 样式更新

- 修复在特定场景下 `Input` 的清除按钮无法隐藏的bug([#685](https://github.com/arco-design/arco-design/pull/685))
- `Slider` 在传入 `marks` 添加标签的场景下始终展示首尾端点([#683](https://github.com/arco-design/arco-design/pull/683))

### 🆎 类型修正

- 修改 `Popconfirm` 组件的 `onOk` 参数的 TS 定义支持返回 `Promise<void>`([#689](https://github.com/arco-design/arco-design/pull/689))

## 2.30.2

2022-03-18

### 🐛 问题修复

- 修复 `InputTag` 组件同时设置 `allowClear` 和 `readOnly` 时， 依然展示清除按钮的 bug。([#651](https://github.com/arco-design/arco-design/pull/651))
- 修复 `Table` 组件开启 `virtualized` 之后 `column.align` 不生效的 bug。([#650](https://github.com/arco-design/arco-design/pull/650))
- 修复 `DatePicker` 组件  `separator` 参数不生效的问题。([#647](https://github.com/arco-design/arco-design/pull/647))
- 修复 `Form.Provider` 导致控制台 warning 的 bug。([#646](https://github.com/arco-design/arco-design/pull/646))
- 修复 `Input` 同时设置  `allowClear` 和 `readOnly` 属性时， 依然展示清除按钮的问题。([#640](https://github.com/arco-design/arco-design/pull/640))

### 💅 样式更新

- 修复 `Table` 组件 `expandProps.width` 设置小于 40 不生效的问题。([#656](https://github.com/arco-design/arco-design/pull/656))

## 2.30.1

2022-03-11

### 💎 优化

- `DatePicker` 组件在选择日期的时候不再进行面板的跳动。([#627](https://github.com/arco-design/arco-design/pull/627))
- `Transfer` 组件在清空时，仅对过滤后的项目进行操作。([#621](https://github.com/arco-design/arco-design/pull/621))

### 🐛 问题修复

- 修复 `Select` 多选时 Tag 动画失效的 bug。([#630](https://github.com/arco-design/arco-design/pull/630))
- 修复 `Select` 设置 `maxTagCount` 时按下 `Backspace` 键时未按正确顺序删除选项的 bug。([#630](https://github.com/arco-design/arco-design/pull/630))
- 修复 `List` 组件为虚拟列表时 `scrollIntoView` 方法对首屏渲染的元素不生效的 bug。([#628](https://github.com/arco-design/arco-design/pull/628))
- 修复 `Cascader` 组件在直接输入文本远程搜索时，组件默认值对应的 label 文本显示丢失的问题。([#632](https://github.com/arco-design/arco-design/pull/632))

## 2.30.0

2022-03-04

### 💎 优化

- `Transfer` 组件在全选/反选时，仅对过滤后的项目进行操作。([#613](https://github.com/arco-design/arco-design/pull/613))

### 🆕 功能升级

- `Tree` 组件的 `allowDrop` 回调参数支持 `dragNode`([#614](https://github.com/arco-design/arco-design/pull/614))
- `Form` 组件支持通过 `Form.Provider` 组件进行多表单数据管理。([#607](https://github.com/arco-design/arco-design/pull/607))
- `DatePicker` 组件支持 `utcOffset` 和 `timezone` 来设置 UTC 时间和时区。([#604](https://github.com/arco-design/arco-design/pull/604))
- `TimePicker` 组件支持 `utcOffset` 和 `timezone` 来设置 UTC 时间和时区。([#604](https://github.com/arco-design/arco-design/pull/604))
- `Slider` 支持按区间分段设置宽度和步长([#600](https://github.com/arco-design/arco-design/pull/600))
- `Image` 组件 新增 `index` 参数，表示预览时的索引，在复杂的多图预览场景下可指定，保证预览顺序一致([#588](https://github.com/arco-design/arco-design/pull/588))
- `Image.Preview` 组件 新增 `scales` 参数，支持自定义图片预览缩放百分比([#588](https://github.com/arco-design/arco-design/pull/588))

### 🐛 问题修复

- `placeholder` 属性在`Table` 数据为空字符或者 null 生效([#609](https://github.com/arco-design/arco-design/pull/609))
- 修复 `TreeSelect` 组件在扩展下拉菜单中的输入框无法被聚焦的问题。([#608](https://github.com/arco-design/arco-design/pull/608))
- 修复 `Cascader` 组件单选时，第一次触发 `onChange` 时的第二个参数未传递当前选中节点信息的 bug。([#599](https://github.com/arco-design/arco-design/pull/599))
- 修复 `Calendar` 组件年模式下选中当天使月块宽度变大的样式问题([#560](https://github.com/arco-design/arco-design/pull/560))

## 2.29.2

2022-02-25

### 🐛 问题修复

- 修复 `InputTag` 的 `clear-icon` 样式未生效的bug([#589](https://github.com/arco-design/arco-design/pull/589))
- 修复 `Cascader` 组件在受控时偶发复选框选中状态和传入 `value` 不一致的bug。([#587](https://github.com/arco-design/arco-design/pull/587))
- 修复 `Input` 组件粘贴文本并清空之后，无法再次粘贴同样文本的 bug。([#584](https://github.com/arco-design/arco-design/pull/584))
- `Tooltip` content 值是 false 时不显示弹窗([#579](https://github.com/arco-design/arco-design/pull/579))
- 修复 `Form.useForm` 方法传入 `form` 参数不生效的 bug。([#577](https://github.com/arco-design/arco-design/pull/577))
- 修复 `InputNumber` 组件小数点特定情况下无法删除的 bug。([#568](https://github.com/arco-design/arco-design/pull/568))
- 修复 `Typography` 组件在编辑状态时， `onStart` 入参错误的bug([#555](https://github.com/arco-design/arco-design/pull/555))

## 2.29.1

2022-02-18

### 💎 优化

- 降低 `Typography` 组件折叠计算后，镜像 `dom` 对自动化测试的影响。([#554](https://github.com/arco-design/arco-design/pull/554))

### 🐛 问题修复

- `InputNumber`过滤掉多余的`allowClear` props([#549](https://github.com/arco-design/arco-design/pull/549))
- 修复 `Cascader` 组件多选情况下出现选中状态渲染出错的问题。([#544](https://github.com/arco-design/arco-design/pull/544))
- 修复 `Image.Preview` 组件在从缓存中加载图片的时候 `onload` 没有触发的问题([#539](https://github.com/arco-design/arco-design/pull/539))

## 2.29.0

2022-02-11

### 🚨 重点注意

- **优化照片墙类型的 `Upload` 组件 tip 文本的渲染位置。Dom 层级发生变动，进行样式覆盖的请重点注意一下。**

### 💎 优化

- 优化 `Cascader` 组件大数据下多选时候选中操作卡顿的问题。([#523](https://github.com/arco-design/arco-design/pull/523))

### 🆕 功能升级

- `TreeSelect` 的 `onChange` 函数新增节点信息参数([#526](https://github.com/arco-design/arco-design/pull/526))
- 升级 `b-validate` 版本以支持 `Form` 在 `validator` 中传入 `ReactNode`([#518](https://github.com/arco-design/arco-design/pull/518))
- `Checkbox` 支持通过传入函数类型的 `children` 自定义节点内容。([#513](https://github.com/arco-design/arco-design/pull/513))
- `Radio` 支持通过传入函数类型的 `children` 自定义节点内容。([#513](https://github.com/arco-design/arco-design/pull/513))
- `CheckBox` 完善组件 TS 类型定义继承原生 `label` 标签属性([#513](https://github.com/arco-design/arco-design/pull/513))
- `Tree` 组件支持通过 `actionOnClick` 属性设置点击节点时组件行为([#511](https://github.com/arco-design/arco-design/pull/511))
- `Form.Item` 支持通过 `hidden` 属性隐藏表单项([#509](https://github.com/arco-design/arco-design/pull/509))
- 支持通过 `clearFields` 方法清除表单项的值([#509](https://github.com/arco-design/arco-design/pull/509))
- `Popconfirm` 组件 `onOk`,`onCancel` 回调方法暴露 `event` 参数([#501](https://github.com/arco-design/arco-design/pull/501))
- `Spin` 支持作为块级元素展示([#493](https://github.com/arco-design/arco-design/pull/493))

### 🐛 问题修复

- 修复 `Statistic` 组件 `precision=0` 不生效的 问题([#531](https://github.com/arco-design/arco-design/pull/531))
- 修复 `Cascader` 组件 `showSearch.retainInputValueWhileSelect` 不生效的 bug([#524](https://github.com/arco-design/arco-design/pull/524))
- 修复 `Input` 组件在 Firefox 中输入中文会连续触发两次 `onChange` 的 bug。([#522](https://github.com/arco-design/arco-design/pull/522))
- 修复 `Table` 组件 `onDropdownVisibleChange` 在点击确定按钮时不触发的 bug。([#521](https://github.com/arco-design/arco-design/pull/521))
- 修复 `Upload` 组件触发两次 `onClick` 的问题([#519](https://github.com/arco-design/arco-design/pull/519))

### 🆎 类型修正

- 修复了 Timeline 组件 mode 类型定义缺少 "top" 和 "bottom" 值的问题([#488](https://github.com/arco-design/arco-design/pull/488))

## 2.28.2

2022-01-21

### 💎 优化

- `InputTag` 阻止回车时提交表单。([#482](https://github.com/arco-design/arco-design/pull/482))
- `Grid` 支持设置 `span` 为 0。([#480](https://github.com/arco-design/arco-design/pull/480))
- 优化 `Table` 组件 `expandedRowRender` 会执行多次导致卡顿的问题。([#473](https://github.com/arco-design/arco-design/pull/473))
- 优化 `Table` 在开启 `virtualized` 之后，大于 10000 条数据时全选会卡的性能问题。([#472](https://github.com/arco-design/arco-design/pull/472))

### 🐛 问题修复

- 修复 `Table` 组件 `size` 没有作用到分页的 bug。([#475](https://github.com/arco-design/arco-design/pull/475))
- 修复 `Button` 内容为空时垂直方向无法对齐的问题。([#471](https://github.com/arco-design/arco-design/pull/471))
- 修正 `Upload` 组件的 `webkitdirectory` 属性的类型。([#470](https://github.com/arco-design/arco-design/pull/470))
- `Select` 修复 `allowCreate` 为 `false` 时，自动分词引入了新选项的问题。([#466](https://github.com/arco-design/arco-design/pull/466))
- 修复上传组件文件列表项移除按钮的边缘点击不可用的问题([#457](https://github.com/arco-design/arco-design/pull/457))
- 修复`Badge`组件里`CssTransition`传入`string`类型的`color`属性导致控制台waring的bug([#455](https://github.com/arco-design/arco-design/pull/455))

## 2.28.1

2022-01-14

### 🚨 重点注意

- **修复了 `Select` 组件在设置 `labelInValue` 时，`renderFormat` 方法的第二个参数返回类型非对象的bug。可能会对直接使用该参数作为函数返回值的场景造成影响。**

### 💎 优化

- `Select` 组件优化 `labelInValue` 时通过对象形式指定了初始值时的渲染表现。([#448](https://github.com/arco-design/arco-design/pull/448))
- 禁用浏览器对于 `Select` 输入框的自动填充。([#439](https://github.com/arco-design/arco-design/pull/439))
- `Dropdown` 为下拉框节点补充 `arco-dropdown` 的类名。([#437](https://github.com/arco-design/arco-design/pull/437))
- `Select.Option` 允许不传入子节点。([#419](https://github.com/arco-design/arco-design/pull/419))

### 🐛 问题修复

- 修复 `DatePicker` 组件 `disabledDate` 在父面板不准确的 bug。([#447](https://github.com/arco-design/arco-design/pull/447))
- 修复 `Anchor` 组件在设置了 `scrollContainer` 时，点击锚点元素滚动位置不对的 bug。([#446](https://github.com/arco-design/arco-design/pull/446))
- 修复 `Image.PreviewGroup` 在子节点的 `src` 更新后预览顺序出错的bug。([#445](https://github.com/arco-design/arco-design/pull/445))
- 修复 `Form` 组件的 `scrollToFirstError` 属性在设置了 `noStyle` 的表单项上失效的 bug。([#444](https://github.com/arco-design/arco-design/pull/444))
- 修复 `Typography` 组件在浏览器缩放场景下折叠出错的bug([#441](https://github.com/arco-design/arco-design/pull/441))
- 修复`Tabs` 组件在子元素 `autofocus`情况下滚动出错的问题([#440](https://github.com/arco-design/arco-design/pull/440))
- 修复 `Form` 组件 `mini` 尺寸时，校验失败时，表单项出现抖动的样式问题。([#438](https://github.com/arco-design/arco-design/pull/438))
- 修复 `Input` 组件点击清除图标边缘区域未清除文本的 `bug`。([#438](https://github.com/arco-design/arco-design/pull/438))
- 修复 `Input.Search` 在不同尺寸下，`searchButton` 尺寸未调整的问题。([#438](https://github.com/arco-design/arco-design/pull/438))
- 如果表格没有数据，分页不应该展示 。([#435](https://github.com/arco-design/arco-design/pull/435))

### 💅 样式更新

- 修复 `Table` 组件在尺寸为 `mini` 时，在数据只有一条时的样式问题。([#449](https://github.com/arco-design/arco-design/pull/449))
- 修复 `InputNumber` 点击时按钮颜色错误的问题([#443](https://github.com/arco-design/arco-design/pull/443))

## 2.28.0

2022-01-07

### 🆕 功能升级

- `Upload` 组件的 `limit` 参数支持指定超出限制数量后禁用上传节点([#416](https://github.com/arco-design/arco-design/pull/416))
- 支持设置法语，意大利语，德语，西班牙语([#413](https://github.com/arco-design/arco-design/pull/413))
- 支持通过 `arco-vars-prefix` less 变量修改css变量前缀([#403](https://github.com/arco-design/arco-design/pull/403))
- `Transfer` 支持为 `showSearch` 属性传入 `InputProps`，支持将搜索框渲染至标题区域。([#401](https://github.com/arco-design/arco-design/pull/401))
- `Form` 组件支持通过 `validateTrigger` 属性全局设置校验规则触发的时机([#400](https://github.com/arco-design/arco-design/pull/400))

### 🐛 问题修复

- 修复 `Button` 组件在 `mini` 尺寸时图标没有完全垂直居中的问题。([#411](https://github.com/arco-design/arco-design/pull/411))
- 修复 `Image` 组件预览模式下部分全局配置丢失的bug([#410](https://github.com/arco-design/arco-design/pull/410))
- 修复 `Carousel` 当 `currentIndex` 设置为非 0 时，首次翻页动画异常的问题。([#409](https://github.com/arco-design/arco-design/pull/409))
- 修复 `Input` 组件在输入中文并直接选中自动补全选项时，未触发 `onChange` 的 bug。([#407](https://github.com/arco-design/arco-design/pull/407))
- 修复 `Dropdown` 中的 `Menu` 无法通过 `style` 设置宽度的问题。([#399](https://github.com/arco-design/arco-design/pull/399))
- 修复 `Table` 组件在异步更新 `column.className` 时，类名有问题的 bug。([#398](https://github.com/arco-design/arco-design/pull/398))

### 💅 样式更新

- 修复 `Divider` 组件文字换行样式错误([#402](https://github.com/arco-design/arco-design/pull/402))

## 2.27.2

2021-12-31

### 💎 优化

- 优化带有文字的 `Divider` 组件的样式实现([#379](https://github.com/arco-design/arco-design/pull/379))

### 🐛 问题修复

- 修复 `Table` 组件筛选在受控模式下，`filteredValue` 设置为 `undefined` 不能重置的 bug。([#382](https://github.com/arco-design/arco-design/pull/382))
- 修复 `Slider` 的 Mark 节点在 DOM 中的渲染顺序可能与 UI 不一致的问题。([#380](https://github.com/arco-design/arco-design/pull/380))
- 修复 `pinkpurple` 颜色 的 `Tag` 组件图标色样式不对的问题。([#378](https://github.com/arco-design/arco-design/pull/378))
- `Select` 修复允许创建选项时，被禁用的选项可以被通过用户输入的方式被选中的 bug。([#373](https://github.com/arco-design/arco-design/pull/373))

## 2.27.1

2021-12-24

### 💎 优化

- `Menu.SubMenu` 在非弹出模式下同样支持 `selectable` 属性。([#355](https://github.com/arco-design/arco-design/pull/355))

### 🐛 问题修复

- 修复 `TimePicker` 组件在受控设置为 `undefined` 时，下次 onChange 回调不正确的 bug。([#361](https://github.com/arco-design/arco-design/pull/361))
- 修复 `Select` 组件 `popupVisible` 为 `false` 时，失焦后输入框的文本未被清空的 bug。([#359](https://github.com/arco-design/arco-design/pull/359))
- 修复 `Upload` 组件拖拽上传文件夹的时最多只会上传 100 个文件的 bug 。([#357](https://github.com/arco-design/arco-design/pull/357))
- 修复 `Modal`  组件在默认打开状态时国际化不起作用的问题([#339](https://github.com/arco-design/arco-design/pull/339))

## 2.27.0

2021-12-17

### 🆕 功能升级

- `Table` 组件新增参数 `expandProps.strictTreeData`。([#334](https://github.com/arco-design/arco-design/pull/334))
- `Tree` 组件支持 `halfChecked` 属性([#331](https://github.com/arco-design/arco-design/pull/331))
- `Typography` 组件的 `onExpand` 回调参数新增 `event` 参数。([#328](https://github.com/arco-design/arco-design/pull/328))
- `ResizeBox` 新增 `SplitGroup` 子组件，支持分割多个面板及快速折叠功能([#327](https://github.com/arco-design/arco-design/pull/327))
- `InputTag` 新增 `dragToSort` 属性以支持通过拖拽为已输入的值排序 。([#325](https://github.com/arco-design/arco-design/pull/325))
- `Select` 新增 `dragToSort` 属性以支持通过拖拽为已输入的值排序 。([#325](https://github.com/arco-design/arco-design/pull/325))

### 🐛 问题修复

- 修复 `Table` 组件 `column.cellStyle` 生效位置不正确的 bug。([#332](https://github.com/arco-design/arco-design/pull/332))
- 修复 `Table` 当数据量变化时，当前页计算出错的 bug。([#329](https://github.com/arco-design/arco-design/pull/329))

### 💅 样式更新

- 修复 `Upload` 组件在上传文件列表为空时存在外边距的样式问题([#336](https://github.com/arco-design/arco-design/pull/336))
- 修复在带有 `validateStatus` 的 `Form.Item` 中，`InputTag` 没有校验样式的问题。([#330](https://github.com/arco-design/arco-design/pull/330))

### 🆎 类型修正

- `InputNumber` 允许通过属性传递所有的 `InputHTMLAttributes`。([#326](https://github.com/arco-design/arco-design/pull/326))

## 2.26.2

2021-12-10

### 💎 优化

- `DatePicker.RangePicker` 组件选中交互优化。([#312](https://github.com/arco-design/arco-design/pull/312))

### 🐛 问题修复

- 修复 `DatePicker` 组件在受控模式下不触发 `onVisibleChange` 的 bug。([#314](https://github.com/arco-design/arco-design/pull/314))
- 修复 `Cascader` 在多选且父子节点不关联时，选中父节点触发了 `loadMore` 的 bug。([#309](https://github.com/arco-design/arco-design/pull/309))
- 修复 `Upload` 组件设置 `customRequest` 是一个异步函数时，请求无法被终止的 bug 。([#306](https://github.com/arco-design/arco-design/pull/306))
- 修复 `Slider` 组件的 `onAfterChange` 参数没有被更新的 bug。([#305](https://github.com/arco-design/arco-design/pull/305))
- 修复 `Typography` 在国际化场景下折叠计算结果出错的 bug。([#301](https://github.com/arco-design/arco-design/pull/301))
- 修复 `Typography` 对包裹多个动态字符串并 `copyable` 时，复制结果出错的 bug。([#301](https://github.com/arco-design/arco-design/pull/301))

### 💅 样式更新

- 修复 `Table` 组件树形数据时，`column.render` 返回 `div` 会导致折行的问题。([#302](https://github.com/arco-design/arco-design/pull/302))

## 2.26.1

2021-12-07

### 🐛 问题修复

- 修复 `Trigger` 组件触发方式为 `contextMenu` 时，点击触发节点，弹出层未隐藏的 bug。([#284](https://github.com/arco-design/arco-design/pull/284))
- 修复 `Select` 组件多选时，`prefix` 节点丢失 `font-size` 样式的 bug。([#284](https://github.com/arco-design/arco-design/pull/284))
- 修复 `Form` 组件教验通过时表现出 `warning` 样式的 bug。([#282](https://github.com/arco-design/arco-design/pull/282))
- 修复 `Upload` 组件拖拽上传文件夹不生效的 bug。([#275](https://github.com/arco-design/arco-design/pull/275))

## 2.26.0

2021-12-03

### 💎 优化

- 优化 `Trigger` 组件计算子节点尺寸和位置的逻辑，避免重复计算。([#258](https://github.com/arco-design/arco-design/pull/258))

### 🆕 功能升级

- `Grid.Col` 组件增加 `flex` 属性。([#268](https://github.com/arco-design/arco-design/pull/268))
- `Tag` 组件支持 `bordered` 属性([#264](https://github.com/arco-design/arco-design/pull/264))
- `Drawer` 组件支持 `okButtonProps` 和 `cancelButtonProps` 属性。([#260](https://github.com/arco-design/arco-design/pull/260))
- `Select` 组件新增 `clearIcon` 属性用于自定义清除按钮图标。([#256](https://github.com/arco-design/arco-design/pull/256))

### 🐛 问题修复

- `List` 组件修复使用虚拟列表时 `scrollLoading` 失效的问题。([#270](https://github.com/arco-design/arco-design/pull/270))
- 修复 `Typography`组件设置`showTooltip`后不生效的bug。([#266](https://github.com/arco-design/arco-design/pull/266))
- `List` 组件修复在虚拟滚动时 `onListScroll` 和 `onReachBottom` 无法触发的 bug。([#259](https://github.com/arco-design/arco-design/pull/259))
- `Select` 组件修复 `renderFormat` 回调在设置 `labelInValue` 时，其参数未返回对象的 bug。([#257](https://github.com/arco-design/arco-design/pull/257))
- 修复 `Upload` 组件上传文件夹时，`beforeUpload` 的第二个参数未获取到本次上传的全部文件的 bug。([#252](https://github.com/arco-design/arco-design/pull/252))

### 💅 样式更新

- 修复 `Steps` 组件的标题和图标在垂直模式下没有对齐的问题([#267](https://github.com/arco-design/arco-design/pull/267))
- 修复 `Menu` 组件已选中菜单项中的 Icon 颜色变化没有过渡效果的问题。([#263](https://github.com/arco-design/arco-design/pull/263))
- 修复 `Table` 组件复选框列在固定表头时没有对齐的样式问题。([#261](https://github.com/arco-design/arco-design/pull/261))

## 2.25.1

2021-11-26

### 💎 优化

- `DatePicker.RangePicker` 组件 `showTime.defaultValue` 支持传入 `number[], string[], Date[]`，避免出现 dayjs 实例不一致引发的报错。([#226](https://github.com/arco-design/arco-design/pull/226))
- `Grid.Row` 使用 context 传递 `gutter`，避免自定义 `Grid.Col` 时不能正确接收参数。([#224](https://github.com/arco-design/arco-design/pull/224))
- `AutoComplete` 组件 `onPressEnter` 回调新增 `activeOption` 参数以区分回车键按下时下拉列表是否存在激活的选项。([#223](https://github.com/arco-design/arco-design/pull/223))

### 🐛 问题修复

- 修复 `Anchor` 组件设置 `affix`时，滚动容器未传递到 `Affix` 组件上的 bug。([#235](https://github.com/arco-design/arco-design/pull/235))
- 修复受控模式下 `cascader` 组件的 `value` 未改变，选项的选中状态仍然改变了的问题 。([#234](https://github.com/arco-design/arco-design/pull/234))
- 修复 `Upload` 组件在拖拽移出时，上传节点仍然显示高亮样式的 bug。([#234](https://github.com/arco-design/arco-design/pull/234))
- 修复 `Tree` 组件在展开后没有子节点场景下，无法再收起的 bug。([#230](https://github.com/arco-design/arco-design/pull/230))
- 修复 `Tabs` 组件透传 `scrollPosition` 到 dom 的 warning。([#225](https://github.com/arco-design/arco-design/pull/225))
- 修复 `Avatar.Group` 未设置 `size` 属性时，头像间距未设置的样式问题。([#220](https://github.com/arco-design/arco-design/pull/220))
- 修复 `Tabs` 组件 的 `card` 类型头部高度不对的问题。([#220](https://github.com/arco-design/arco-design/pull/220))

## 2.25.0

2021-11-19

### 🆕 功能升级

- `Typography` 的 `Ellipsis` 支持 `cssEllipsis`属性，在简单场景下，默认使用 css 进行省略。([#191](https://github.com/arco-design/arco-design/pull/191))
- `Form` 支持在 `rules` 中设置 `validateTrigger` 属性指定规则在特定事件触发时候执行。([#190](https://github.com/arco-design/arco-design/pull/190))
- `Form` 支持在 `rules` 中设置 `validateLevel` 属性指定规则校验失败时仅显示 `warning` 状态，不阻塞表单提交。([#190](https://github.com/arco-design/arco-design/pull/190))
- `Form` 组件 `rule.message` 支持使用 `ReactNode`。([#185](https://github.com/arco-design/arco-design/pull/185))
- `InputTag` 新增 `saveOnBlur` 属性以支持在失焦时自动保存用户正在输入的内容。([#183](https://github.com/arco-design/arco-design/pull/183))
- `Carousel` 新增 `icons` 属性以支持自定义箭头图标。([#181](https://github.com/arco-design/arco-design/pull/181))
- `Dropdown` 配合 `Menu` 使用时，允许通过 `onClickMenuItem` 的返回值控制菜单点击后是否自动隐藏。([#180](https://github.com/arco-design/arco-design/pull/180))
- `ResizeBox.Split` 增加 `onPaneResize` 属性([#169](https://github.com/arco-design/arco-design/pull/169))
- `Trigger` 组件添加 `escToClose` 设置是否允许按 `ESC` 关闭，默认为 `false`。([#167](https://github.com/arco-design/arco-design/pull/167))
- `Tooltip` 组件添加 `escToClose`，默认为 `false`。([#167](https://github.com/arco-design/arco-design/pull/167))
- `Popconfirm` 组件添加按 `ESC` 关闭弹出框功能。([#167](https://github.com/arco-design/arco-design/pull/167))

### 🐛 问题修复

- 修复 `ResizeBox.Split` 组件切换 `direction` 时，两侧面板比例发生改变的 bug。([#188](https://github.com/arco-design/arco-design/pull/188))
- `Progress` 修复 `trailColor` 属性在环形进度条和步骤进度条不生效的 bug。([#175](https://github.com/arco-design/arco-design/pull/175))
- 修复 `Progress` 组件步骤显示计算错误的 bug。([#170](https://github.com/arco-design/arco-design/pull/170))

### 💅 样式更新

- `Button` 组件左右边距 + 边框为 16px。([#186](https://github.com/arco-design/arco-design/pull/186))
- 修复 `Table` 组件在开启 `virtualized` 之后，当滚动条始终显示时表头出现错位的样式问题。([#182](https://github.com/arco-design/arco-design/pull/182))
- `Image` 组件将错误状态的最大尺寸设置为父元素的大小。([#161](https://github.com/arco-design/arco-design/pull/161))

## 2.24.1

2021-11-12

### 🐛 问题修复

- 修复 `Trigger` 组件在弹出层出现动画结束前错误触发弹出层鼠标事件的 bug。([#149](https://github.com/arco-design/arco-design/pull/149))
- `Select` 修复用户无法在 CSS 文件中覆盖弹窗高度的问题。([#148](https://github.com/arco-design/arco-design/pull/148))
- `Select` 修复单选时虚拟列表定位异常的 bug。([#148](https://github.com/arco-design/arco-design/pull/148))
- `Menu.SubMenu` 组件修复嵌套使用时，内层 `SubMenu` 属性被父 `SubMenu` 覆盖的 bug。([#145](https://github.com/arco-design/arco-design/pull/145))
- `Typography` 折叠计算优化，修复单行折叠极端情况下的显示错误。([#152](https://github.com/arco-design/arco-design/pull/152))

### 💅 样式更新

- 修复 `Descriptions` 组件在 `tableLayout=fixed` 且为非 inline 布局时错位的问题。([#153](https://github.com/arco-design/arco-design/pull/153))
- `Menu` 组件折叠时隐藏菜单项图标后的文字，避免出现 `...` 。([#151](https://github.com/arco-design/arco-design/pull/151))
- `Tooltip` 组件在暗黑模式下添加边框，避免在弹出框内跟底色重合。([#150](https://github.com/arco-design/arco-design/pull/150))
- 修复 `Table` 组件在列存在筛选时，单元格 align = 'right' 时会重叠的样式问题。([#140](https://github.com/arco-design/arco-design/pull/140))

## 2.24.0

2021-11-05

### 💎 优化

- `DatePicker` 组件如果值是 `string` 类型，且跟 format 不一致导致解析为 Invalid Date 时，会兜底尝试 format="YYYY-MM-DD"([#113](https://github.com/arco-design/arco-design/pull/113))

### 🆕 功能升级

- `Image.Preview` 组件支持按 `ESC` 关闭([#121](https://github.com/arco-design/arco-design/pull/121))
- `Menu` 新增 `ellipsis` 属性以支持禁用水平菜单的菜单项自动折叠功能([#115](https://github.com/arco-design/arco-design/pull/115))
- 添加trailColor改变Progress剩余颜色([#107](https://github.com/arco-design/arco-design/pull/107))

### 🐛 问题修复

- 修复 `Avatar` 组件设置 `maxCount = 0` 时头像全部展示的问题。([#89](https://github.com/arco-design/arco-design/pull/89))
- fix: 修复 `Pagination` 组件在 `pageSize` 和 `current` 都受控时，`pageSize` 的计算结果会覆盖 `props.current`导致 `current` 受控失效([#119](https://github.com/arco-design/arco-design/pull/119))
- 调整 `Form` 组件的 TS 定义为 `FormHTMLAttributes`([#118](https://github.com/arco-design/arco-design/pull/118))
- 修复 `Form.List` 组件通过 `add()` 方法创建表单项，传入的默认值在该表单项带有 `initialValue` 时候未生效的 `bug` 。([#118](https://github.com/arco-design/arco-design/pull/118))
- 修复 `InputNumber` 在传入与 `precision` 精度不一致的 `value` 时展示了错误状态的 bug。([#116](https://github.com/arco-design/arco-design/pull/116))
- 修复 `Menu` 传入的 `tooltipProps` 包含 `triggerProps` 时，会覆盖原有的类名 `menu-item-tooltip`([#99](https://github.com/arco-design/arco-design/pull/99))
- 修复 `Menu` 因为读取 `null` 的属性导致报错的 bug([#115](https://github.com/arco-design/arco-design/pull/115))
- 修复 `Menu` 组件使用深色模式时点击更多菜单按钮弹出的气泡箭头颜色错误问题([#84](https://github.com/arco-design/arco-design/pull/84))

### 💅 样式更新

- 修复 `Table` 组件在表头分组时，`border={{ border: true, headerCell: true }}` 时，表头边框线断裂的问题。([#120](https://github.com/arco-design/arco-design/pull/120))

## 2.23.5

2021-10-29

### 🐛 问题修复

- 修复 `TreeSelect` 组件搜索节点展示不正确的问题。([#74](https://github.com/arco-design/arco-design/pull/74))
- 修复 `Trigger` 组件弹出层第一次渲染时未获取到子元素宽度导致虚拟列表失效的问题([#69](https://github.com/arco-design/arco-design/pull/69))
- 修复 `Popver` 组件弹出层在挂载父节点宽度特别小时，箭头元素定位有误的问题。([#69](https://github.com/arco-design/arco-design/pull/69))
- 修复 `Typography` 组件在折叠状态时，使用未更新的变量进行计算的bug([#57](https://github.com/arco-design/arco-design/pull/57))
- 修复 `Select` 组件设置选项高度可能导致的虚拟列表定位异常。([#55](https://github.com/arco-design/arco-design/pull/55))
- 修复InputTag组件默认的validate函数永远返回false的bug([#43](https://github.com/arco-design/arco-design/pull/43))

## 2.23.4

2021-10-26

### 🐛 问题修复

- `Table` 组件展开按钮的 `type` 设置为 `button`，避免点击触发 Form submit。([#23](https://github.com/arco-design/arco-design/pull/23))
- 修复 `Cascader` 组件在禁用时，弹出层会响应键盘事件并弹出的问题。([#21](https://github.com/arco-design/arco-design/pull/21))

## 2.23.2

2021-10-22

### 🐛 问题修复

- 修复 `Select` 组件 `labelInValue` 且多选时，没有初始值导致的报错。
- 修复 `Table` 组件使用树形数据时有唯一 key 警告的问题。

## 2.23.1

2021-10-15

### 💎 优化

- 优化 `Trigger` 组件的弹出层仅在显示状态时根据触发节点的 resize 进行位置更新。

### 🐛 问题修复

- 修复 `DatePicker` 组件 `disabledDate` 在快捷面板中不生效的 bug。
- 修复 `List` 组件 `pagination` 属性中的 `defaultCurrent`、`defaultPageSize`、`sizeCanChange` 不可用的 bug。
- 修复 `InputTag` 组件输入连续空格时输入框宽度异常的 bug。
- 修复 `Select` 组件在某些浏览器中点击文字区域下拉框未能展开的 bug。
- 修复 `Select` 组件使用虚拟滚动时数据更新可能引起的抖动。
- 修复 `Select` 组件 `mode` 为 `multiple` 且 `labelInValue` 为 `true` 时，`value` 传入对象数组导致报错的 bug。
- 修复 `Typography` 组件对包裹多个动态字符串时会被解析成数组的 bug。
- 修复 `Typography` 组件设置 `ellipsis`后， 在 `editing` 状态时会报错的 bug。
- 修复了 `Button` 组件在 `loading` 态时仍能触发 `onClick` 事件的 bug。
- 修复 `Tree` 组件开启虚拟滚动且允许拖拽时，最后一级节点被遮盖的bug。
- 修复 `Tree.Node` 被设置 `draggable=false` 后，其他节点无法在当前节点 `Drop` 的 bug。
- 修复 `Table` 组件 `rowSelection.renderCell` 在单选时不生效的 bug。
- 修复 `Trigger` 组件弹出层内嵌套的弹出层被点击时，外层弹出层被隐藏 `bug`。

## 2.23.0

2021-09-27

### 💎 优化

- lodash方法引用方式由 lodash.x 改为 lodash/x
- `Modal` 组件 `onOk` 在返回 Promise 时，会自动处理 loading。
- 优化 `Typography` 超出省略情况下计算时机。
- `Table` 组件排序和筛选的列在没有设置 `dataIndex` 时也可以生效。

### 🆕 功能升级

- `ConfigProvider` 组件增加参数 `componentConfig`，可以全局配置所有组件的默认配置。
- `Form` 组件支持通过 `getValueFromEvent` 指定在子节点触发`onChange`事件时如何处理值。
- `Form` 组件支持通过 `formatter` 属性转换传递给控件的字段值。
- `Table` 组件新增参数 `placeholder`, 当单元格内容为空时，显示占位符，优先级低于 `column.placeholder`。
- `Input` 组件 `maxLength` 支持 `errorOnly` 模式。在超过 `maxLength` 时不会限制用户输入，但会展示错误状态
- `DatePicker.RangePicker` 组件支持设置 `clearRangeOnReselect`。
- `DatePicker.RangePicker` 组件 `onSelect` 增加第三个参数 `extra`。

### 🐛 问题修复

- 修复 `Form.List` 在设置初始值时，`add` 方法传入初始值不生效的bug
- 修复 `DatePicker.RangePicker` 组件切换 mode 时，没有第一时间更新面板的 bug。
- 修复 `DatePicker.WeekPicker` 没有初始化本地时区和星期起始的 bug。
- 修复 `Image` 组件设置 `height` 无效的问题
- 修复 `Drawer` 组件设置 `mask={false}` 的时候，无法操作抽屉外部元素的问题
- 修复了 `Dropdown` 的 `disabled` 属性无法作用在子节点上的bug
- 修复 `Tooltip` 组件 `showArrow` 不生效的bug。
- 修复 `Popover` 组件 `showArrow` 不生效的bug。
- 修复 `Typography` 组件对英文字符截断错误导致文字溢出。

### 💅 样式更新

- 修复 `Tabs` 组件在 `vertical capsule` 时样式错误问题

### 🆎 类型修正

- `Statistic` 组件 `value` 支持传入 string, number, date 类型。
- 修复 `Upload` 组件丢失`RequestOptions`、`UploadRequestReturn`类型定义导出的问题

## 2.22.0

2021-09-10

### 🛠 架构改动

- `TreeSelect` 组件文件夹下 `treeSelect.tsx` 更名为 `tree-select.tsx`，有通过文件路径引用的需要注意一下。另外，我们不推荐直接通过文件路径去使用，因为我们无法保证组件内文件名永远不变，如果通过路径也尽量只使用 `index.tsx` 入口文件。

### 💎 优化

- 优化 `Cascader` 组件最近选择的选项展示在输入框最后。
- `TreeSelect` 组件下拉列表出现后自动滚动到第一个已选中的节点
- `Form.List` 的 `add` 方法接收到事件对象做为参数时，在控制台给出提示。

### 🆕 功能升级

-  `Form.List` 支持通过 `initialValue` 属性设置初始值。
- `Select` 组件 `ref` 引用新增 `activeOptionValue` 属性，挂载当前悬浮态选项的值。
- `Tooltip` 支持通过 `color` 属性设置弹出层背景色。
- `Table` 组件添加参数 `rowSelection.onSelect`。
- `Table` 组件支持设置 `column.placeholder`。
- `Table` 组件 `onChange` 回调的第 4 个参数增加 `currentData` 的返回。
- `Anchor` 组件新增一个属性 `targetOffset` 用于支持设置容器中滚动基准线的偏移量。
- `Space` 组件新增 `split` 属性用于设置相邻元素的分隔符
- `Trigger` 组件支持通过 `mouseLeaveToClose` 属性设置是否在鼠标移出触发节点和弹出层的时候隐藏弹窗。
- 虚拟列表新增 `scrollOptions` 属性，用于指定滚动时的默认行为。

### 🐛 问题修复

- 修复 `DatePicker` 组件在使用 shortcuts 时传入的 dayjs 对象跟内部版本不一致时，hover 就会报错的 bug。
-  修复 `Form.Item` 传入children为空字符串时，渲染报错的bug。
- `Select` 组件修复 `ref` 引用未更新的 bug。
- 修复 `DatePicker` 组件在使用 `dateRender` 时，外层 dom 上的事件不能触发的 bug。
- 修复 `DatePicker.RangePicker` 组件在只使用面板且有默认值时，首次点击选择需要多点一次的 bug。
- 修复 `Table` 组件在筛选受控的时候，点击重置按钮，状态没有及时更新的问题。
- 修复 `Typography` 在 `flex` 模式下文字展示宽度计算错误
- 修复 `Typography` 组件 `ellipsis` 受控时，无法重新渲染的 bug
- 修复 `Typography` 组件 `ellipsis` 传入 `onExpand` 时，无法触发调用的 bug
- 修复 `Typography` 窗口 `resize` 时，无法根据适口自动更新 `ellipsis` 状态的 bug
- 修复 `Cascader` 组件在设置选项 `disableCheckbox=true` 时，无法点击展开下一级选项的 bug。

### 🆎 类型修正

- 所有组件 ts 定义放到 interface.ts 中，并且每个组件入口文件暴露所需类型。
- `DatePicker.RangePicker` 组件 `onOk` 类型修正。
- `Dropdown` 组件修复了 `droplist` 为必填的问题。

## 2.21.2

2021-08-30

### 🐛 问题修复

- 修复 `Table` 组件在固定表头时，一些边界条件下动态修改 `columns` 会造成表头表身不同步滚动的问题。

## 2.21.1

2021-08-27

### 💎 优化

- 优化水平菜单自适应宽度隐藏菜单项的临界表现
- 仅在需要渲染的值为字符串时为 DOM 添加其对应的 `title` 属性

### 🐛 问题修复

- 修复 `DatePicker` 组件在有值的情况下再异步设置 `value` 不生效的 bug。
- 修复 `Form.List` 内部的 `add`，`remove` 方法执行时，未触发 `Form` 的 `onChange` 事件的 bug。
- 修复 `Table` 组件更新 `columns.fixed`，固定列表头没有更新事件的 bug。同时修复自定义表头设置为函数组件时，不能正确联动滚动的 bug。

### 💅 样式更新

- 图标 `image-close` 修正。

## 2.21.0

2021-08-20

### 💎 优化

- 优化 `allowCreate` 时将用户输入中的文字作为选项列表的第一个。

### 🆕 功能升级

- `TimePicker.RangePicker` 组件新增 `order` 参数来设置是否自动排序。
- `simple` 属性支持传入对象 `{ retainSelectedItems: true }` 以在左侧面板保留被选中的项目。
- `Modal` 组件新增 `useModal` 用法。
- `Modal` 组件支持通过`closeIcon`属性自定义关闭图标
- `TimePicker` 组件新增 `showNowBtn` 参数。
- `DatePicker` 组件新交互，增加下次范围的高亮显示，切换时间面板的操作放到按钮上。

### 🐛 问题修复

- 修复 `Cascader` 组件在设置`disableCheckbox`时，点击文字仍然会被选中的 bug
- 修复设置 `labelInValue` 和 `allowClear` 时，清空选项导致 `onChange` 回调报错的 bug。

### 💅 样式更新

- 修复 Table 组件设置 `border&#x3D;{{ wrapper: true }}` 时也不显示表头下边框的问题。

### 🆎 类型修正

-  优化 `Form` 组件的 `setFieldsValue` 方法参数的 TS 定义

## 2.21.0-beta.0

2021-08-13

### 🆕 功能升级

- `Menu` 组件支持键盘快捷键操作。
- `Cascader` 组件支持多选时通过 `disableCheckbox` 属性单独禁用选项的复选框.
- `Form` 组件支持 `onSubmitFailed` 属性，在提交表单时校验失败时调用。
-  `Carousel` 组件新增 `miniRender` 属性，支持渲染满足动画要求的最小数量的子节点。

### 🐛 Bugfix

- 修复 `Cascader` 初始值对应的节点被动态加载完成时，未展示为选中状态的 bug。
- 修复 `Tree` 组件的`Icons`属性的回调参数不是最新的节点状态的 bug。
- 修复 `WeekPicker` 组件周数显示不正确的 bug。
- 修复 `Table` 组件排序在受控下，视觉表现不对的 bug。

### 💎 优化

- `InputNumber` 延长鼠标长按按钮触发自动增减的等待时间以避免误操作。

### 💅 Style

- `Menu` 组件暗色主题时优化其弹出菜单为暗色；
- 修复 `InputTag` 组件允许清除时，鼠标悬浮界面可能抖动的问题。

### 🆎 TypeScript

- `DatePicker.RangePicker` 的 `pickerValue` 类型修正。


## 2.20.2

2021-08-09

### 🐛 Bugfix

- 修复 `Affix` 组件的 `onChange` 回调被频繁触发的 bug。

## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `Affix` 组件在 `fixed` 状态下更新内容或者修改参数位置没有更新的 bug。
- 修复 `Form` 组件未接收原生 `dom` 属性的 bug。
- 修复 `Form.Item` 组件未接收原生 `dom` 属性的 bug。
- 修复 `Cascader` 组件在单选时选中叶子节点，面板未自动收起的 bug。
- 修复 `Cascader` 在设置 `options={[]}`，并且自定义面板宽度时，空元素未居中的 bug。
- 修复 `Image.PreviewGroup`组件在 `srcList` 变化后没有更新的 bug。
- 修复 `Tree` 组件在设置了 `fieldNames` 时，`checkedStrategy="parent"` 不生效的 bug。
- 修复 `Tree` 组件在 `checkedKeys` 不受控且设置了 `checkedStrategy` 为 `parent` 或者 `child` 时，`onCheck` 的回调参数仍然是全部选中 `key` 的 bug。
- 修复 `Trigger` 组件直接包裹一个禁用的 `Trigger ` 组件时，自身弹出层也不展示的 bug。
- 修复 `Tabs` 组件 `renderTabTitle` 被错误地传递给了 `div`，导致控制台报错的 bug。
- 修复 `Select` 组件设置了 `trigger` 为 `focus` 时点击右侧的下拉图标 `Select` 未展开的 bug。
- 修复 `TreeSelect` 组件设置 `showSearch={retainInputValueWhileSelect: false}` 不生效的 bug。
- 修复 `Typography` 组件不支持传入原生 `dom` 属性的 bug。
- 修复 `Typography` 组件第一次渲染时有时候会抖动一下的 bug。
- 修复 `TimePicker.RangePicker` 组件的 `onChange` 回调参数没有自动排序的 bug。

### 💅 Style

- 修复 `DatePicker` 组件今天的样式在灰色日期上也会出现的问题。

### 🆎 TypeScript

- 修改 `Typography` 组件的 `ellipsis.showTooltip.props` 为非必填

## 2.20.0

2021-07-30

### 🆕 功能升级

- `List` 组件新增 `listRef` 属性以获取带有 API 方法的组件引用，并在该引用上新增 `scrollIntoView` 方法。
- `List` 组件 `grid` 属性新增 `column` 参数以允许快速定义栅格下每行展示的列表数目。
- `DatePicker` 组件新增 `icons` 参数以支持自定义图标。
- `Grid.Col` 组件新增 `push` 和 `pull` 属性以设置栅格的水平偏移格数。
- `Slider` 组件新增 `reverse` 参数以设置为反向展示。
- `Statistic` 组件新增 `loading` 属性以设置加载中的状态。
- `Cascader` 组件新增 `onSearch` 属性以进行远程搜索。
- `Upload` 组件支持上传失败时从上传文件的 `response` 字段获取错误信息进行展示。
- `DatePicker` 组件新增 `hideNotInViewDates` 属性来隐藏灰色日期。
- `DatePicker` 组件 `dayStartOfWeek` 属性支持设置从周一到周日。
- `TimePicker` 组件支持滚动自动吸附。
- `InputTag` 组件新增 `onClear` 和 `onClick` 回调。

### 🐛 Bugfix

- 修复 `Popconfirm` 组件点击确认按钮 `onOk` 回调未返回 Promise 时也展示了 Loading 状态的 bug。
- 修复 `TreeSelect` 组件的 `popupVisible` 为 `true` 时，页面其他输入框无法被聚焦的 bug。
- 修复 `Table` 组件 `preserveSelectedRowKeys` 在 `pagination` 为 `false` 时不生效的 bug。
- 修复 `Table` 组件在受控 `expandedRowKeys` 时 `onExpandedRowsChange` 返回值使用了内部未受控 `keys` 的 bug。
- 修复 `Table` 组件 `defaultFilters` 没有在 `filterDropdown` 中体现的 bug。
- 修复 `Tooltip` 组件 `content` 属性从真值变为假值时，弹层未消失的 bug。

### 💅 Style

- `List` 组件修复元素内容可能溢出的样式问题。

### 🆎 TypeScript

- 修改 `Alert` 组件 `title` 属性的 TS 定义。
- 优化 `Form` 组件 `scrollToFirstError` 属性的 `scrollIntoViewOptions` 的 TS 定义。
- `Select/Cascader/TreeSelect` 组件增加 `onClick` 的 TS 定义。

## 2.19.3

2021-07-23

### 💎 优化

- 添加新图标 `IconPalette`。
- `Select` 在设置了 `labelInValue` 并且传入了对象形式的初始值时，选择框文本优先展示用户传入的 label。

### 🐛 Bugfix

- 修复 `TimePicker` 组件开启 `disableConfirm` 之后不会触发 `onChange` 的 bug。
- 修复 `DatePicker.RangePicker` 组件设置 `showTime` 后，输入有问题的 bug。
- 修复 `InputNumber` 组件和 `InputTag` 组件作为 `Popover` 的 children 时，弹出层未弹出的 bug。
- 修复 `Dropdown` 组件接受字符串/数字作为 children 时报错的问题。
- 修复 `Select` 组件 `tokenSeparators` 设置为中文字符在 Windows 系统不生效的 bug。
- 修复 `Select` 在存在分组并且搜索时，键盘选择选项可能失效的 bug。
- 修复 `Upload` 组件 `directory` 属性被设置到 div 标签导致控制台警告的 bug。
- 修复 `Upload` 组件在设置 `listType="picture-card"` 时特殊场景下多张图片上传出现个别图片展示宽度为 0 的问题。
- 修复 `Trigger` 组件未在挂载容器尺寸改变时更新位置的 bug。
- 修复 `Dropdown` 组件中的 `Menu` 组件 `theme` 设置为 `dark` 未生效的 bug。

### 💅 Style

- `Table` 组件可编辑单元格样式优化，修复跟树形数据结合时错行的问题。
- 修复 `Modal` 组件在打开时 title 中图标可能抖动的问题。

## 2.19.1

2021-07-18

### 🐛 Bugfix

- 修复 `Menu` 组件 `children` 传入假值时导致页面报错的 bug。
- 修复 `Typography` 组件复制功能在安卓 webview 下不生效的 bug。

## 2.19.0

2021-07-16

### 🆕 功能升级

- `Table` 组件新增 `showSorterTooltip`，同时修复排序箭头被底色覆盖的样式问题。
- `Table` 组件新增 `expandProps.expandRowByClick`，支持点击行展开。
- `Table` 组件 `onChange` 参数新增第四个参数 `extra`，通过 `extra.action` 可以拿到当前触发动作。
- `Table` 组件新增 `rowSelection.renderCell`，支持定制复选框。
- `Table` 组件新增 `rowSelection.preserveSelectedRowKeys`，支持在数据项被删除之后保留 `selectedRowKeys` 中的 `key` 值。
- `Menu` 组件 `onClickMenuItem` 和 `onClickSubMenu` 回调支持 `keyPath` 参数。
- `Menu` 组件 `Menu.SubMenu` 新增 `triggerProps` 属性以自定义弹出行为。
- `Form` 组件 `scrollIntoFirstError` 支持传入 `scrollIntoViewOptions`。
- `Transfer` 组件 `CustomListProps` 新增 `onItemRemove` 回调。
- `Transfer` 组件自定义头部渲染函数 `titleTexts` 新增 `checkbox` 参数。
- `Tabs` 组件支持通过滚轮和触摸板进行滚动。
- `Grid.Row` 组件和 `Grid.Col` 组件支持所有原生 html 属性。

### 💎 优化

- 优化 `Tooltip` 等弹出组件在打开后文字可能会抖动一下的问题。
- 优化 `Menu` 组件水平菜单的弹出层在鼠标移动较慢时点击不到的问题。
- 优化 `Form` 表单键盘可访问性，点击 label 标签可以 focus 到表单项。
- `Select` 组件添加 HTML 原生的 `title` 属性，用于在鼠标悬浮时显示文本。

### 🐛 Bugfix

- 修复无法获取 `Trigger` 组件弹出层内容最外层标签的 ref 的问题。
- 修复 `Form.List` 组件的 `move` 方法移动表单项位置错误的问题。
- 修复 `Modal` 组件 `footer` 参数与 `propTypes` 中不统一的 bug。
- 修复 `Form` 组件表单联动配合嵌套字段并设置表单项初始值的场景下，`setFieldsValue` 未生效的问题。
- 修复 `Typography` 组件复制功能在安卓 webview 下不生效的 bug。
- 修复 `Drawer` 组件在内容包含可聚焦元素的情况下，第一次打开会抖动的问题。

## 2.18.2

2021-07-09

### 🐛 Bugfix

- 修复 `InputNumber` 组件 `value` 传入空字符串时被错误解析为 0 的 bug。
- 修复 `TreeSelect` 组件本地搜索结果不正确的bug。
- 修复 `Trigger` 组件在设置 `alignPoint`且挂载容器滚动滚动条时弹出层定位不正确的bug。
- 修复 `Tooltip` 传入`children`为`0`时候，`children`未渲染的bug。
- 修复 `TimePicker` 点击清除按钮会改变弹出层显示状态的bug。
- 修复 `Tree` 组件在部分节点收起时，调用 `scrollIntoView` 方法未滚动到正确位置的 bug。
- 修复 `Affix` 组件在`fixed`状态时，改变元素高度时未调更新位置的 bug。
- 修复 `Affix` 组件在`fixed`状态时，改变元素高度时未调更新位置的 bug。
- 修复 `Table` 组件动态改变 `columns` 时，在树形数据判断是否时第一列时，存在多个第一列的 bug。

### 💅 Style

- 修复 `Table` 组件在表身存在滚动条时，数据变少滚动条消失，表头滚动条依然存在的样式问题。

### 🆎 TypeScript

- 修复 `Form.List` 组件的`add`方法参数定义缺失的bug。


## 2.18.1

2021-07-04

### 🐛 Bugfix

- 修复 `Trigger` 组件 `unmountOnExit` 不生效的 bug。
- 修复 `Table` 组件动态设置 `columns` 时，固定列逻辑没有处理的 bug。
- 修复 `Table` 组件开启虚拟滚动同时设置了 `scroll.x`，样式表现不对的问题。

## 2.18.0

2021-07-02

### ⚠️ 重点注意

- 所有组件和子组件 `displayName` 补全，同时对个别语义不清晰的进行了修改（**如果你有利用 displayName 做什么操作，请关注**），如下：
  - `Input.Group`: Group -> InputGroup
  - `Form.Item`: Item -> FormItem
  - `Menu.Item`: Item -> MenuItem
  - `Timeline.Item`: Item -> TimelineItem
  - `Tree.Node`: Node -> TreeNode
- 修复 `Input` 组件设置 `allowClear` 时候，传入的 `props.className` 属性未设置到最外层标签的问题。
  - 之前同时设置 `allowClear` 和 `props.className` 时，className 会错误的应用到内层 input 标签上，**抱歉这个改动可能会引起 breaking change，请关注**。

### 🆕 功能升级

- `Transfer` 组件 `titleTexts` 允许传入函数以自定义标题栏渲染。
- `Tabs` 组件新增 `renderTabTitle` 属性用于支持自定义每个 Tab 的头部内容。

### 🐛 Bugfix

- 修复 `InputNumber` 组件输入字母字符时可能导致输入框的内容变为 undefined 的 bug。
- 修复 `Tree` 组件同时修改 `treeData` 和 `expandedKeys` 时候可能出现组件报错的 bug。
- 修复 `Tree` 组件在部分节点收起时，调用 `scrollIntoView` 方法未滚动到正确位置的 bug。
- 修复 `Table` 组件开启虚拟滚动之后，空数据显示有问题的 bug。
- 修复 `Table` 组件 `rowSelection` 切换为 `undefined` 之后导致报错的 bug。
- 修复 `Table` 组件在 `data` 改变之后，没有过滤 `selectedRowKeys` 中不存在的值的 bug。
- 修复 `Image.PreviewGroup` 组件点击图片打开的时候没有触发 `onChange` 的 bug。
- 修复 `Form.List` 嵌套 `Form.List` 时，通过 `move` 方法调整 `FormItem` 顺序，其 UI 展示未根据 `value` 更新的 bug。

### 💅 Style

- 修复 `Message` 组件关闭图标没有垂直居中的问题。

### 💎 优化

- `InputNumber` 组件 `value` 传入字符串时尝试将其转为数字。
- 调整 `InputNumber` 组件校正传入的非法 `value` 的时机，确保在用户操作过之后才将其校正。

## 2.17.3

2021-06-24

### 🐛 Bugfix

- 修复 `Input.Search` 未触发 `onPressEnter` 的问题。
- 修复 `Table` 组件前置操作列用 `Tooltip` 包裹无法显示弹出的 bug。
- 修复 `Table` 组件 `column.width` 为 `string` 不生效的 bug。

### 💅 Style

- 修复 `Upload` 组件照片墙折行时图片上下未设置间距的问题。
- 修复 `Statistic` 组件 `styleValue` 传入的样式未应用到整数部分的问题。
- 修复 `Steps` 组件的竖直连接线状态颜色被覆盖的问题。

### 🆎 TypeScript

- `Table` 组件 `column.children` 类型修正，修复表头分组时无法推导嵌套类型的问题。
- `Table` 组件 `column.filters` 类型修正，修复无法推导类型的问题。

## 2.17.2

2021-06-22

### 🐛 Bugfix

- 修复 `Select` 组件触发自动分词时，最后触发的选项未添加到选项列表的 bug。

## 2.17.1

2021-06-20

### 🐛 Bugfix

- 修复 `DatePicker` 组件判断日期变化时可能导致报错的 bug。
- 修复 `Table` 组件虚拟滚动同时设置 x 轴滚动不生效的问题。

## 2.17.0

2021-06-18

### 🆕 功能升级

- `Select` 组件 `tokenSeparators` 支持传入 `\n` 和 `\t`。
- `InputNumber` 组件新增 `readOnly` 属性。
- `Table` 组件新增功能总结栏。
- `Table` 组件自定义前置操作列 `components.body.operations` 的 node 支持传入函数，该函数会接收 `record` 参数。
- `Cascader` 组件的 `dropdownColumnRender` 新增 `level` 参数。

### 🐛 Bugfix

- 修复 `Trigger` 组件在设置 `position=bottom` 并自动调整位置时，箭头元素未指向触发节点的 bug。
- 修复 `Trigger` 组件在设置 `popupContainer` 时，通过 `popupAlign` 设置的偏移量未生效的 bug。
- 修复 `Anchor` 组件 `animation` 和 `hash` 都为 `false` 时，点击链接不更新滚动位置的 bug。
- 修复 `InputNumber` 受控时设置 `value` 为 `undefined` 未生效的 bug.
- 修复 `Table` 组件点击展开按钮，会冒泡到 `onRow.onClick` 的 bug。
- 修复 `Table` 组件 `pagination=false` 时，排序和筛选不生效的 bug。
- 修复 `Modal` 在 `mask` 连续点击会触发两次 `onCancel` 的bug。
- 修复 `Table` 组件 `rowSelection.selectedRowKeys` 中有 data 中不存在的值时选择报错的 bug。

### 💅 Style

- 修复 `Steps` 组件小尺寸在竖直状态下的连线位置错误。
- 修复 `Steps` 组件在类型为 `dot` 并且是小尺寸的情况下连线偏下的问题。
- 修复 `InputNumber` 禁用时，文字在 `Safari`中不显示的 bug。

### 💎 优化

- `Select` 组件多选时输入框的宽度增加 4 px，方便用鼠标选择文字。
- `Carousel` 组件主动调用翻页 API 时，允许重置自动播放的计时。
- `InputNumber` 组件在设置了 `max` 或 `min` 时传入非法的初始值，首次渲染时保留初始值，待用户操作后再纠正。
- `DatePicker` 组价交互优化，并且修复 `showTime` 时重新选择时间会用默认值覆盖掉已选中值的问题。

## 2.16.2

2021-06-06

### 🐛 Bugfix

- 修复 `Tree` 组件在传入的`checkedKeys`中没有对应节点时组件报错的问题。

## 2.16.1

2021-06-04

### 🐛 Bugfix

- 修复 `DatePicker` 组件 `showTime` 时，选中一个值后 hover 快捷选择再离开，值会恢复到初始值的 bug。
- 修复 `Tree` 组件默认选中时，无法递归选中所有子节点的 bug。
- 修复 `Tree` 组件设置 `fieldNames` 属性时，展开收起报错的 bug。
- 修复 `Tree.Node` 组件 `icons` 属性优先级低于了 `Tree` 的 `icons` 属性的 bug。
- 修复 `Carousel` 组件外部直接修改 `currentIndex` 属性时，没有展示切换动画的 bug。
- 修复 `Image.Preview` 组件默认打开的情况下，`getPopupContainer` 获取的元素错误的 bug。
- 修复 `Menu` 组件开发环境控制台的 HTML attribute 警告。

### 💅 Style

- `Carousel` 组件 `animation` 为 `slide` 时，隐藏的图片由 `display: none` 变为 `visibility: hidden`。

### 💎 优化

- 优化 `DatePicker.RangePicker` 组件重复选择日期跳动问题。

### 🆎 TypeScript

- 修复 `Form` 组件类型被推导为 `any` 的问题。


## 2.16.0

2021-05-28

### 🆕 功能升级

- 国际化新增繁体中文(中国香港)，繁体中文(中国台湾)。
- `Modal` 组件新增 `wrapStyle` 属性。
- `Menu.Item` 组件新增 `wrapper` 属性以支持自定义外层 HTML 标签。
- `Dropdown` 新增 `disabled` 属性以禁用弹出。
- `Tabs` 支持自定义删除/新增按钮。
- `Image.Preview` 支持自定义挂载点。
- `Upload` 组件支持在 `beforeUpload` 方法中返回一个 file 对象，用于处理文件。
- `Progress` 组件支持`warning`状态。
- `Table` 组件添加 `expandProps.rowExpandable` 参数，控制是否允许展开，优先级高于 `expandRowRender` 返回值。

### 🐛 Bugfix

- 修复 `Menu` 组件在服务端渲染时 `useLayoutEffect` 报警告的问题。
- 修复 `Modal` 组件的标题文本加粗样式失效的问题。
- 修复 `Modal` 组件缩放动画表现异常的问题。
- 修复 `Input` 样式在less 4.x中编译失败的问题。
- 修复 `Tree` 组件自定义的`switcherIcon`图标在叶子节点上未生效的问题。
- 修复 `Form.List` 组件在执行 `add` 方法时，重置了已校验控件的校验状态的问题。
- 修复 `Badge` 组件外层 `Tooltip` 不显示的问题

### 🆎 TypeScript

- 导出`Form` 组件的 `FormInstance` 类型定义.

### 💎 优化

- `Tree` 组件重构，优化大数据下的节点选中以及展开收起的卡顿现象。
- `DatePicker` 优化升级：
  - 支持快速时间跳转，点击面板 header 可以任意选择年、月。
  - 带时间的日期选择器交互回到 1.0，同时优化了禁用的逻辑和表现。
  - 范围选择器禁用单个时间后，会自动在面板上禁用相应面板的日期选择和时间选择。
  - 范围选择器左右面板联动，避免出现不合预期的面板显示。


## 2.15.3

2021-05-21

### 🐛 Bugfix

- `Icon` 目录的 package.json 添加 `peerDependencies`，防止 webpack5 构建 warning。
- `Table` 组件的 `propTypes` 中 `scroll` 添加 `string` 类型，避免 warning。
- 修复 `DatePicker` 开启 `showTime` 之后，点击此刻按钮，时间不对的 bug。
- 修复 `Select` 父组件直接设置 `inputValue` 错误触发了 `onSearch` 回调的 bug。
- 修复 `Select` 设置 `labelInValue` 时，在 `Form` 中使用报错的 bug。
- 修复 `Table` 组件在翻页时，清空选中项但是没有触发 `rowSelection.onChange` 回调的 bug。
- `IconSync` 图标调整。
- 修复 `Cascader` 组件在 `footer` 中渲染的 `Input` 标签无法被聚焦的 bug。

### 💎 优化

- 虚拟列表滚动时减少子节点的重绘，防止卡顿。
- 优化 `Modal` 关闭交互，在内容区域按下鼠标移动到 `mask` 区域释放时，不会关闭。
- `Form` 阻止 `onSubmit` 事件冒泡。

### 💅 Style

- `Avatar` 组件通过 css 配置默认尺寸，便于风格配置平台使用。

### 🆎 TypeScript

- 完善 `AutoComplete` 组件 `onChange/onSelect` 中的 `option` 参数类型。

## 2.15.2

2021-05-14

### 🐛 Bugfix

- 修复 `Carousel` 组件在其滚动项为半透明时，内容显示重叠的 bug。
- 修复 `Popconfirm` 组件 `onOk` 返回 `promise` 是 `reject` 之后不会关闭 loading 的 bug。
- 修复 `Select` 多选聚焦后，输入框的箭头图标变为搜索图标的 bug。
- 修复 `Input.Search` 禁用时，右侧的搜索按钮未禁用的 bug。
- 修复 `Trigger` 组件在设置了 `autoAlignPopupWidth` 属性之后，`props.style.width` 属性不生效的 bug。

### 💅 Style

- `Button` 组件中存在图标时，无论是不是 arco 图标，都会添加间距。
- `Modal` 组件内容区域添加默认字体大小。

## 2.15.1

2021-05-06

**注意：本次发版修复了 `2.15.0` 可能存在的隐患，如果你想升级 `2.15.0`，请直接升级到 `2.15.1`。**
**`2.15.0` 可能会在打包时出现 less 字体报错。**

### 💎 优化

- 字体使用 cdn 路径，防止打包出现 loader 或者路径相关的报错。

### 💅 Style

- 修复 `Table` 组件 `size` 属性设置不生效的问题。

## 2.15.0

2021-04-30

### 🆕 功能升级

- `Cascader` 组件新增 `dropdownRender`、`dropdownColumnRender` 属性以支持自定义下拉框渲染。
- `Collapse.Item` 组件新增 `contentStyle` 属性以支持快速配置内容区域样式。
- `Table` 组件新增 `rowSelection.pureKeys` 参数，用于优化大数据选中体验。
- `Menu` 组件 `onClickMenuItem` 回调新增 `event` 参数。
- `Select`、`TreeSelect`、`Cascader` 组件：
  - 新增 `animation` 属性以支持关闭多选时的标签动画；
  - `renderTag` 属性新增 `index` 和 `values` 参数以适应更复杂的自定义标签渲染方式；
  - `maxTagCount` 属性允许传入的最小值由 1 变更为 0。
- `Tabs` 组件新增 `icons` 属性以支持配置删除按钮和新增按钮的图标。
- `Space` 组件 `size` 支持数传入组以配置环绕间距。

### 🐛 Bugfix

- 修复 `Upload` 组件拖拽文件上传时对 Excel 文件类型判断异常的 bug。
- 修复 `Cascader` 组件误将外部传入的不存在对应 Option 的 value 清除的 bug。
- 修复 `DatePicker` 组件 `onSelect` 回调在未选择完全就进行排序的 bug。
- 修复 `Select`、`TreeSelect`、`Cascader` 组件多选时设置 `showSearch=false` 不生效的 bug。
- 修复 `DatePicker.RangePicker` 在禁用一半的时候，点击确认按钮还是需要选择另一个时间的 bug。
- 修复 `Table` 组件 `pagination.defaultPageSize` 不生效的 bug。
- 修复 `Table` 组件 `onCell` 传自定义参数可能导致 Dom Warning 的 bug。
- 修复 `Image` 组件在 Server Side Render 情况下不可用的 bug。

### 💅 Style

- 修复 `Table` 组件开启虚拟滚动和选中框之后，选中框宽度不对的问题。
- 修复 `DatePicker` 和 `TimePicker` 组件禁用且有默认值时，默认值在 Safari 浏览器未显示的问题。

### 💎 优化

- `Tabel` 组件优化选中逻辑，解决可能存在的keys、rows不同步的问题。
- css 字体文件从 base64 换成字体文件，解决按需加载重复引入入口 css 文件过大的问题。

### 🆎 TypeScript

- 补充 `Tabs` 组件 `renderTabHeader` 回调 `DefaultTabHeader` 参数的 TS 定义。
- 修正 `Table` 组件 `expandedRowKeys` 的定义。

## 2.14.2

2021-04-23

### 💎 优化

- `Image` 组件添加多语言支持。
- `Modal` 和 `Drawer` 组件显示的时候计算滚动条宽度避免抖动。

### 🐛 Bugfix

- 修复 `Select` 直接设置 `value` 为 `undefined` 时，受控模式异常的 bug。
- 修复图标中包含 es6 语法可能导致打包报错的问题。
- 修复 `Pagination` 组件在受控模式时，同时改变 `pageSize` 和 `current`，`current` 值不正确的 bug。
- 修复 `Anchor` 在切换页面路由时由于 dom 节点不存在可能导致报错的 bug。
- 修复 `Select` 组件 `dropdownMenuStyle.maxHeight` 不生效的 bug。
- 修复 `Select` 多选模式下，点击选项前的复选框导致输入框失焦的 bug。
- 修复 `Carousel` 组件只有两张图片时，点击左向箭头，图片滚动的方向不对的 bug。
- 修复 `List` 组件 `pagination.onChange` 属性在单次翻页中触发了两次的 bug。
- 修复 `Button` 组件对包裹动态字符串时会被解析成数组的 bug。
- 修复 `AutoComplete inputProps.suffix` 不生效的 bug。

### 💅 Style

- 修复 `Button` 组件长按钮配合 `href` 时，文本不居中的样式问题。
- 修复 `Table` 组件表头自定义 `border-radius` 过大，内部元素会超出的样式问题。

## 2.14.1

2021-04-16

### 🐛 Bugfix

- 修复 `Typography` 组件复制功能在 Android 系统浏览器上不生效的 bug。
- 修复 `InputNumber` 组件设置精度时偶现输入后重新聚焦却无法编辑的 bug。
- 修复 `TreeSelect` 的 `onChange` 访问不到外部最新的变量 bug。
- 修复 `Select` 组件 `tokenSeparators` 设置为换行符时，触发分词后粘贴的内容未被清空的 bug。
- 修复 `less@4` 打包报错的 bug。
- 修复 `DatePicker.RangePicker` 组件开启 `showTime` 之后，组件输入值后切换面板，显示不正确的 bug。
- 修复 `Trigger` 组件嵌套立即弹出的弹出框，动画导致弹出框位置定位不对的 bug。
- 修复多色图标导致的开发环境控制台警告。

### 💅 Style

- `Modal` 组件的 `box-sizing` 调整为 `border-box`。
- 提升 `Pagination` 中输入框的优先级，避免被全局输入框组件影响。
- 修复 `Tag` 组件在包裹 div 时关闭图标不显示的问题。

### 💎 优化

- `Table` 组件翻页时自动滚动至表格顶部。

### 🆎 TypeScript

- 允许 `Timeline.Item` 接受原生 DOM 属性。
- 修复 `Image.PreviewGroup` 的 TS 定义中缺少 `children` 的问题。

## 2.14.0

2021-04-09

### 🆕 功能升级

- 重构图标打包脚本和逻辑，图标的全局配置不再使用全局变量，切换为 context，为后续更丰富的全局配置做铺垫。
- 国际化新增印度尼西亚语的支持。
- 国际化新增泰语的支持。
- `Image` 组件支持多图预览。
- `Select` 组件 ref 暴露 `getOptionInfoList` 接口用以获取所有需要渲染的 Option 的信息。
- `Select` 新增 `defaultPopupVisible` 属性以控制下拉框是否默认弹出。
- `ResizeBox.Split` 组件的 `onMoving` 增加参数 `size`，用于获取分割大小。
- `Slider` 组件支持范围刻度的拖拽。
- `Carousel` 组件 `autoPlay` 支持传入对象以控制播放间隔和鼠标悬浮时是否暂定自动播放。
- 优化 `Form.List` 渲染逻辑，子组件改变时不渲染整个 Form.List。

### 🐛 Bugfix

- 修复 `Upload` 组件在调用 `customRequest` 时，访问到的父组件的状态不是最新的值的 bug。
- 修复 `Select` 组件 `dropdownMenuStyle` 和 `dropdownMenuClassName` 在无选项时不生效的 bug。
- 修复 `Form.Item` 的 `initialValue` 优先级低于了 `Form` 上的 `initialValues` 优先级的 bug。
- 修复 `Tabs` 组件 `headerPadding` 样式未生效的 bug。
- 修复 `Carousel` 的子节点传入的 `onClick` 回调失效的 bug。
- 修复 `Table` 组件设置 `operations` 之后，空数据时总列数计算错误的 bug。
- `Modal` 组件根据自身样式指定 zindex。

### 💅 Style

- 修复 `Menu` 组件位于 `SubMenu` 中的菜单项文字长度过长时未展示为省略号的问题。

### 🆎 TypeScript

- `Select` 组件 children 的 TS 定义回滚为 `ReactNode`。

## 2.13.3

2021-04-06

### 🐛 Bugfix

- 修复 `Cascader` 在点清除按钮后，输入文本进行搜索时，组件出现控制台报错的问题。

## 2.13.2

2021-04-01

### 🐛 Bugfix

- 修复 `Select` 组件的父组件更新可能导致当前处于激活态的选项恢复为默认的 bug。
- 修复 `Select` 组件多选聚焦时点击浏览器窗口外，输入框中选中项背景色改变的 bug。
- 修复 `Upload` 组件拖拽时出现拖拽中和拖拽完成的样式闪烁问题。
- 修复 `Upload` 组件上传时出现控制台 warning 的 bug。
- 修复 `Modal` 组件 unmount 时，全局的 overflow 不会更新的 bug。
- 优化 `Progress` 组件渐变色的显示。
- 修复 `Select` 组件单选偶现的下拉框无法关闭的 bug。
- 修复 `Transfer` 组件结合分页表格混用时，每次选中项目都会使表格回到第一页的 bug。
- 修复 `Form` 组件在未设置初始值时，调用 `resetFieldsValue` 方法未触发 `onValuesChange` 的 bug。

### 💅 Style

- 调整不同尺寸的 `Input` 组件的左右内边距样式。
- 修复 `Input` 组件在父元素设置了高度，且设置 `allowClear` 时，输入框高度变为父元素高度的 100% 的问题。

### 🆎 TypeScript

- 修正 `Progress` 的 `formatText` 的 ts 定义。

## 2.13.1

2021-03-28

### 🐛 Bugfix

- 修复 `Select` 组件 `children` 传入假值时报错的问题。

## 2.13.0

2021-03-26

### 🆕 功能升级

- `Drawer` 组件新增 `focusLock` 和 `autoFocus` 参数。
- `ConfigProvider` 支持设置全局 `focusLock` 和 `autoFocus`，作用于 `Modal` 和 `Drawer` 组件。
- `Select` 组件新增 `allowCreate` 属性，在单选模式下允许通过输入创建新条目。
- `Select` 支持 `Options` 中混入自定义的 DOM 节点。
- `Select` 组件 `onInputValueChange` 和 `onSearch` 提供 `reason` 参数，告知外部 inputValue 尝试改变的具体原因。

### 🐛 Bugfix

- 修复 `ResizeBox` 设置 padding 无效的 bug。
- 修复 `Input` 组件在使用 `addBefore` 时，输入框内的内容无法被鼠标选中的 bug。
- 修复弹出型组件在弹出层所挂载的父节点 resize 的时候，未更新自身位置的 bug。
- `Select` 组件 `notFoundContent` 传入 `null` 时，无数据时不应该展示下拉框。
- `IconLink` 图标修正。

### 💅 Style

- 修复 `Tree` 组件在拖拽时显示的是 hover 样式的问题。
- 修复 `Table` 组件在开启虚拟滚动时，复选框列没有居中的样式问题。
- 修复 `Link` 组件图标位置靠下的样式问题。
- 设置 `Link` 组件下的图标大小默认为 `12px`。

### 🆎 TypeScript

- `List.Item` 支持传入原生 HTML 标签属性。

## 2.12.0

2021-03-19

### 🆕 功能升级

- `TimePicker` 组件新增 `disableConfirm` 属性，以支持点选时直接确认时间。
- `Modal` 组件的 `footer` 属性支持传入自定义渲染函数。

### 🐛 Bugfix

- 修复 `TimePicker` 组件在受控模式时，不打开面板直接设置 `value` 不生效的问题。
- 修复 `Breadcrumb` 包裹布尔值报错的问题。
- 修复 `Avatar` 组件内部文件循环引用的问题。
- 修复 `Input` 组件的前后缀中的 `Tooltip` 内容无法被复制的问题。
- 修复 `Form` 组件在控件创建时，`initialValue` 优先级高于创建前通过 `Form.setFieldsValue` 设置的值，导致控件一直展示为初始值的问题。
- 修复 `Tooltip` 传入 `children` 为数字时，控制台报错的问题
- `Calendar` 组件中中文 format 移动到 locale 文件中。

### 💅 Style

- 调低 `Avatar` 组件中使用到的 `z-index` 属性的数值。
- 修复 `Steps` 组件 `size` 为 `small` 时的连线样式问题。
- 修复 `Input` 组件的前后置标签中，`Select` 选中的内容不居中的问题。

## 2.11.1

2021-03-15

### 🐛 Bugfix

- 修复 `Result` 组件传入的`icon`属性被映射到`div`标签，导致控制台warning的问题。
- 修复 `Modal` 组件设置宽度百分比失效的问题。

### 🆎 TypeScript

- 修复 `Select` 组件`filterOption`回调函数中 `option` 参数的TS类型错误
- 完善 `List` 组件 `render` 函数的参数类型根据`dataSource`自动推断。

### 💅 Style

- 调整`Result`组件设置 `status=null`时，传入的自定义图标的样式层级(`font-size`、`color`)。


## 2.11.0

2021-03-12

### 🆕 功能升级

- `Upload` 组件支持文件夹上传。
- `Alert` 组件支持 `action` 定制操作项。
- `Modal` 组件支持 `Modal.destroyAll` 关闭所有确认型对话框。
- `Tree` 和 `TreeSelect` 组件支持 `fieldnames` 属性，指定 `treeData` 对应的字段名。
- `Tree` 组件支持 `scrollIntoView` 传入 node 的 `key` 滚动到指定字段。
- `Transfer` 组件 `showFooter` 支持传入 `ReactNode` 自定义节点。
- `Table` 组件支持 `renderPagination` 来自定义分页部分。
- `Select.Option` 和 `Select.OptGroup` 支持传入原生的 HTML 属性。
- `Select` `Cascader` `TreeSelect` 组件支持 `prefix` 属性设置前缀。
- `Popover` 和 `Popconfirm` 组件支持 `disabled` 参数。
- `Steps.Step` 新增参数 `style` 和 `className`。
- `VirtualList` 支持传入百分比高度，并且不再需要强制指定视窗高度。

### 🐛 Bugfix

- 修复 `Transfer.Item` 的 key 可能重复的 bug。
- 修复 `Tooltip` 组件 `content` 为 `0` 也会禁用的 bug。
- 修复 `Select` 组件在 React 17 中使用回车选中选项会触发表单的提交事件的 bug。
- 修复 `Message` 和 `Notifaction` 组件在设置 `maxCount` 的时候，新增的消息出现在底部的 bug。
- 修复 `Form.Item` 在卸载时被更新造成控制台报错的 bug。
- 修复 `Statistic` 组件在传入 `value` `为字符串时，suffix` 不生效的 bug。

### 💅 Style

- 图标 `IconLock` 和 `IconUnlock` 重画，解决区分不明显的问题。
- 修复 `Tree` 组件显示连接线的样式问题。
- `Modal` 组件分离滚动条动画，避免滚动条闪动。

## 2.10.2

2021-03-09

### 🐛 Bugfix

- 修复 `Select` 组件 `Option` 的 `label` 为富文本节点时，选中之后未展示选中值的问题。
- 修复 `Tooltip` 组件 `content` 为空时，气泡仍然弹出的问题。
- 修复 `Table` 组件 `bodyCellStyle` 会覆盖掉固定列样式的问题。

### 🆎 TypeScript

- 完善 `Select` 组件回调函数中 `option` 参数的类型。

## 2.10.1

2021-03-05

### 🐛 Bugfix

- 修复 `Mentions` 组件 `@` 某人时，其后未自动添加分隔符的问题。
- 修复微前端下，加载样式顺序导致组件内部图标样式被全局样式覆盖的问题。
- 修复 `Select` 使用`maxTagCount`时，控制台出现元素需要唯一`key`警告的问题。
- 修复 `Trigger` 组件在自动调整位置后，箭头元素的位置有误的问题。
- 修复 `Pagination` 组件在`pageSize`修改后未重置当前页的问题。

### 💅 Style

- 修复 `Select` 组件在 `value` 为空字符串时，外层 `div`高度被撑开出现多余高度的问题。

## 2.10.0 🏮

2020-02-26

### 🆕 功能升级

- `Drawer` 支持点击 esc 隐藏抽屉。
- `AutoComplete` 组件新增 `inputProps` 和 `loading` 属性。
- `Icon` 包增加 `sideEffect: false`，支持 tree shaking。
- `Form` 的 `resetFields` 方法支持传入字符串，重置单个字段。
- `ConfigProvider` 支持 `renderEmpty` 全局设置组件内空元素。
- `Progress` 组件支持渐变色。
- `Progress` 支持步骤进度条。

### 🐛 Bugfix

- 修复 `Select` 组件模式切换和 placeholder 改变时，UI 存在的抖动 bug。
- 修复 `Dropdown` 直接嵌套在 `Tooltip` 里，`Tooltip` 不显示的 bug。
- 修复 `Modal` 点击滚动条导致弹窗关闭的 bug。

### 💅 Style

- `Breadcrumb` 组件体验优化，只有元素是链接时才会在 hover 时显示背景颜色。
- 修复 `Tag` 组件文字无法选中复制的样式问题。
- 修复 `Spin` 组件 `dot` 类型动画样式有误的 bug。
- 修复 `Table` 组件在只有一页隐藏分页器时，依旧能看到分页器边距的样式问题。
- 修复右对齐表头文字有 2px 右边距，导致和表身的数字没有严格对齐的样式问题。
- `Checkbox` , `Radio` 支持键盘切换获取焦点时展示对应的 hover 样式。

### 🆎 TypeScript

- `DatePicker.WeekPicker` 添加 `dayStartOfWeek` 类型。
- 优化 `List` 组件 `render` 函数的 ts 定义。

## 2.9.1

2021-02-20

### 🐛 Bugfix

- 修复 `Select` 组件 `value` 受控时，搜索之后直接修改 `value`，可能导致选择框展示的选中值异常的 bug。
- 修复 `Select` 组件 `tags` 模式 `value` 受控时，用户输入的选项某些情况未被正常移除的 bug。
- 修复 `Select` 组件点击选项隐藏下拉框时，未触发 `onVisibleChange` 回调的 bug。
- 修复 `Select` 组件多选模式下无法使用鼠标选中已输入的文字的 bug。
- 修复 `Select` 组件多选模式下，tag 文本过长时，删除按钮被遮盖的 bug。
- 修复 `AutoComplete` 组件 `triggerProps.popupVisible` 未生效的 bug。
- 修复 `AutoComplete` 组件 `onBlur` 回调在下拉框隐藏之前被触发的 bug。
- 修复 `Tabs` 组件滚动更新异常的 bug。
- 修复 `Drawer` 组件 `visible` 初始值为 `true` 且设置了 `getPopupContainer` 时，`Drawer` 仍为 fixed 定位的 bug。
- 修复 `Form` 组件设置了 `className` 的 `labelCol` 属性时，label 标签的默认类名丢失的 bug。
- 修复 `Input.Search` 组件被禁用时，点击搜索图标仍然触发了 `onSearch` 回调的 bug。

### 💅 Style

- 修复 `Popover` 组件在无 `title` 时内容区域未居中显示的问题。
- 修复 `DatePicker` 和 `Select` 组件在暗色模式下 error 状态背景色错误的问题。
- 修复带有悬浮底色的图标按钮垂直方向未居中的问题。

## 2.9.0 🔥

2021-02-05

### 🆕 功能升级

- `DatePicker` 组件支持设置 `triggerElement` 自定义触发元素。
- `DatePicker` 组件在设置 `triggerElement=null` 时，会直接显示面板。
- `Trigger` 组件支持直接嵌套使用。
- `List.Item` 支持传入 HTML 原生属性，支持内置 hover 样式。
- `Tree` 组件支持 `icons` 属性传入函数。
- `Drawer` 组件新增属性 `bodyStyle` 和 `headerStyle`。
- `Select` 组件新增 `onPaste` 回调。
- `Select` 组件 ref 新增 `getOptionInfoByValue` 方法。
- 对外暴露所有组件的 interface。
- 优化 `Table` 组件固定列类名计算逻辑，避免数据量大时滚动卡顿明显的问题。

### 🐛 Bugfix

- 修复 `Slider` 组件 `tooltipVisible` 受控失效的 bug。
- 修复 `Table` 组件 `expandedRowRender` 返回 `null` 时依旧会渲染空单元格的 bug。
- 修复 `DatePicker.RangePicker` 组件直接点击同一天不能直接确认的 bug。
- 修复 `Tree` 动态加载数据 promise.reject 的时候，节点不执行展开逻辑的 bug。
- 修复 `Tree` 组件收起节点时，导致 `onSelect` 第二个参数 `selectNodes` 出现 `undefined` 的 bug。
- 修复 `Tree` 组件在开启虚拟滚动的情况下，动态改变高度，对应的多出来高度的内容不会自动更新显示的 bug。
- 修复 `Grid.Row` 直接传入字符串作为 `children` 报错的 bug。
- 修复 `Checkbox.Group` 在 `onChange` 的时候未过滤被移除的 `option` 对应的 `value` 的问题。
- 修复 `Form.Item` 组件销毁时，在上层 `Form.Item` 展示的错误信息未被销毁的 bug。
- 修复 `Select` 组件允许搜索且输入文本为空时，自定义 `filterOption` 仍然生效的 bug。
- 修复 `Select` 组件多选框宽度较窄时增删选项导致高度抖动的 bug。

### 💅 Style

- 修复 `Card` 组件竖向时，最后一个选项卡在 hover 状态时，底部边框变透明的样式问题。

## 2.8.2

2021-01-29

### 🐛 Bugfix

- 修复 `Cascader` 组件在下拉框收起时`onVisibleChange`未触发的问题。
- 修复 `List` 组件在`Grid`模式下无法使用分页的问题。

### 💅 Style

- 修复 `Input` 组件禁用样式在 safari 下可能出现文字颜色变白色的问题。
- 修复 `List` 组件在数据为空时，`noDataElement` 未垂直居中的问题。

## 2.8.1

2021-01-28

### 🐛 Bugfix

- 修复 `AutoComplete` 输入改变后再次点击同一个 value 的选项，不能触发 `onChange` 的 bug。
- 设定 `Menu` 组件 `autoScrollIntoView` 的滚动边界，避免 `body` 的异常滚动。
- 修复 `Input` 组件引入了全量图标导致按需加载失效的 bug。

### 💅 Style

- 修复 2.7 版本更新之后，图标样式跟 2.7 版本之前存在冲突的问题。
- 修复 `Table` 组件无数据时依旧有下边框的样式问题。

## 2.8.0

2021-01-22

### 🆕 功能升级

- `DatePicker` 组件 `format` 参数支持传入函数，定制显示内容。
- `Menu.SubMenu` 新增 `popup` 属性强制指定使用弹出模式。
- 新增属性 `affixStyle` 和 `affixClassname` 用于给 fixed 元素设置样式。
- 兼容 `less@4.0`。

### 🐛 Bugfix

- 修复 `Menu` 组件 `hasCollapseButton` 设置 `icons.collapseActive` 时导致报错。
- 修复 `Table` 组件 `expandedRowRender` 回调中 `index` 从 -1 开始而不是 0 的 bug。
- 修复 `DatePicker` 组件在受控模式下点击今天按钮，`onChange` 偶发的不触发的 bug。

### 💅 Style

- 修复 `Input` 组件前后缀分割线样式丢失的问题。
- `Table` 筛选样式更新。
- 更新部分面性图标，路径为透明，避免在部分场景中会无法区分的问题。
- `Icon` 组件类加上 `fill: none`，避免在于低版本组件库混用时出现被覆盖的情况。

## 2.7.2

2021-01-19

### 🐛 Bugfix

- 修复 `Modal` 通过静态方法创建的弹窗，在调用 `update` 方法时若未传入 `title` 属性，弹窗创建时候传入的 `icon` 属性会重复生效，导致出现多个图标的 bug。
- 修复 `TimePicker` 组件按需加载缺少样式的 bug。

### 💅 Style

- 修复 Spin 组件会影响被包裹元素的字体样式的问题。

## 2.7.1

2021-01-18

### 🐛 Bugfix

- 修复 `DropDown` 等依赖 `Trigger` 组件的弹出型组件传入 `popupAlign` 多个方向的值，导致定位偏移的 bug。
- `Table` 组件圆角设置到 `header` 上，修复在某些场景下 chrome 引擎导致的滚动卡顿问题。
- 修复 `Table` 组件 `onChange` 回调在 `onSelectAll` 之前，导致 `onSelectAll` 受控被覆盖的 bug。

### 💅 Style

- 修复 `Table` 组件加载图标跟描述文案重叠的样式问题。
- `Steps` 组件水平方向的描述限制最大宽度为 `140px`。

## 2.7.0

2021-01-15

### 🔥 图标升级

- 所有图标重画，支持通过参数调整线宽、端点、拐角。

### 🆕 功能升级

- `ResizeBox` 组件新增 `width` 和 `height` 属性，支持对宽高进行受控。
- `Trigger` 组件 `popupAlign` 属性同时支持多个方向。
- `Tree` 组件新增 `allowDrop` 属性。

### 🐛 Bugfix

- 修复 `Table` 组件 `onCell` 传入自定义参数，在自定义 `Cell` 组件内无法接受自定义参数的问题。
- 修复 `Menu` 组件 `autoOpen` 对于多层嵌套的 `SubMenu` 不生效的问题。
- 修复 `List` 组件 `onReachBottom` 内部无法获得父组件最新 state 的问题。
- 修复 `Dropdown` 组件与 `Menu` 组件配合使用时， `onVisibleChange` 先于 `onClickMenuItem` 触发的问题。
- 修复 `Tabs` 在 `type` 为 `capsule` 时滚动计算错误的问题。
- 修复 `Tabs` 的 header 滚动定位错误的问题。

### 💅 Style

- 优化 `Select` 多选模式 `disabled` 状态时的样式。
- 修复 `Upload` 组件超出 `limit` 限制而隐藏上传节点后出现空白占位的问题。
- 修复 `Form` 组件 `extra` 提示文字在校验信息隐藏时闪动的问题。
- 修复 `Tab` 组件 `line` 类型的选项卡嵌套在 `card` 类型的选项卡内部时内容区域出现边框的问题。
- 移除 `Table` 组件无数据时的下边框。
- `Form` 在 `vertical` 布局时 label 添加 4px 的下间距。

### 🆎 TypeScript

- 修复 `Cascader` 组件 `renderOption` 方法的 TS 定义，并且导出组件相关的接口。

## 2.6.0

2021-01-08

### 🆕 功能升级

- `Table` 组件新增 `rowSelection.onSelectAll` 属性，支持用户手动选择/取消选择所有行。
- `Modal` 组件新增 `maskStyle` 属性，支持设置遮罩层样式。
- `Descriptions` 组件新增 `tableLayout`属性，设置为 `fixed` 时，宽度会均分。
- `Pagination` 组件新增 `hideOnSinglePage`属性，支持在只有一页的时候隐藏分页。
- `ConfigProvider` 组件支持设置全局表格组件的分页属性。
- `Dropdown.Button` 支持传入 `disabled` 属性。
- `Tabs` 新增 `headerPadding`属性，控制`line`和`text`类型的选项卡是否存在左侧外边距。
- `Select` 新增 `popupVisible` 属性，支持直接控制下拉框的展开收起状态。
- `Input.Search` 支持 `loading`属性。
- `Input.Search` 的`searchButton`属性支持传入 `ReactNode`。

### 🐛 Bugfix

- 修复 `Select`组件`mode=tag`时点击自定义`tag`的关闭按钮，偶发两个`tag`同时消失的问题。
- 修复 `Select`组件`mode=tag`时，修改 `props.value` 下拉列表中未出现 `options` 中不存在的 `value` 对应的选项的问题。
- 修复 `Table`传入`data`为`null`时，组件内部报错的问题。
- 修复`DatePicker.RangePicker`在`showTime`模式输入无法选值的问题。
- 修复`DatePicker`在受控模式下，点击`onClear`偶发不生效的问题。
- 修复在始终显示滚动条时，`DatePicker`的时间选择列表会撑开的样式问题。
- 修复 `TreeSelect` 组件在`treeData`改变，当前选中`value`未更新对应的`title`的问题。
- 修复 `Avatar.Group` 在多层嵌套下表现不正常的问题。
- 修复 `Input.Search` 在设置 `allowClear`后，搜索图标被遮盖，无法被点击的问题。
- 修复 `Modal` 组件卸载后，点击 `esc` 时 `onCancel` 函数仍会执行的 bug。

### 💅 Style

- 移除 `Select.Option` 样式中的 `height` 属性，避免自定义节点高度被限制的问题。
- 修复 `Button` 组件下直接使用 `a` 标签，颜色不对的样式问题。
- 修复 `PageHeader` 组件样式中 `footer`的`padding`属性写法问题。
- 修复 `Input.Search`默认 `searchButton`的宽度为 `32px` ，对齐设计稿。

## 2.5.1

2020-12-31

### 🐛 Bugfix

- 修复 `Form` 组件把`File`类型的值过滤为空对象的问题。
- 修复 `Tree` 组件在动态加载数据后，外部更新 treeData，子节点列表未展开的问题。
- 修复 `Tree` 组件当拖拽节点和释放位置节点一致时不应该触发`oDrop`事件的问题
- 修复 `Cascader` 样式按需加载缺少`tag`样式的问题。
- `Tabs` 的 `header` 限制向左移动的最小值为 0，解决因动画引起的显示错误问题。
- 修复 `Menu` 组件动态修改 `children` 时，`autoOpen` 属性失效的 bug。
- 修复 `TimePicker.RangePicker` 值排序之后 `onChange` 中未排序的 bug。
- 修复 `TimePicker.RangePicker` 受控模式不生效的 bug。
- 修复 `DatePicker.RangePicker` 的 onSelect 回调未排序的 bug。
- 修复 `DatePicker.RangePicker` 的 `timepickerProps` 不生效的 bug。

### 💅 Style

- 解决 `Statistic` 组件 value 为非数字的时候字体样式大小不一致的问题。
- 修改 `Drawer` 和 `Modal` 在暗黑下的背景色为 `color-bg-3（二级容器背景色）`，以便区分容器上的 `tooltip`。

## 2.5.0 🎅🏽

2020-12-25 🎄

### 🆕 功能升级

- `ResizeBox` 的伸缩杆支持内容定制。
- `DatePicker` 组件新增 `disabledTime` 设置禁用时间。
- `Form.Item` 支持传入 `noStyle` 为 `{ showErrorTip: true }` 来展示校验信息。
- `Grid` 组件 `gutter` 支持设置为数组来定制垂直间隔。
- `Image` 组件错误状态支持自定义。

### 💎 优化

- `Tree` 组件拖拽做节流提升性能。
- `DatePicker.RangePicker` 暂时关掉动态的禁用时间效果，目前看来这个交互只带来了操作负担。

### 🐛 Bugfix

- 修复 `Select` 多触发了 `onInputValueChange` 的 bug。
- 修复 `Select` 组件 `options` 改变时，`defaultActiveFirstOption` 失效的 bug。
- 修复 `Table` 定制前置操作列为空列的时候没有过滤掉引发空白的 bug。
- 修复 `Menu` 组件水平模式在服务端渲染时存在抖动的 bug。
- 修复 `Badge` 组件的徽标出现的时候闪动两次的 bug。
- 修复 `Form.List` 在内部嵌套存在联动，提交表单时，被销毁的控件字段被提交的 bug。
- 修复 `Form` 通过 `setFields` 设置 `formList` 中表单项的错误状态，当前索引之后的表单项也表现了错误态的 bug。
- 修复 `Tree` 组件虚拟列表无法拖拽的 bug。
- 修复 `Typography` 组件在展开后 `...` 依旧存在的 bug。
- 修复 `RangePicker` 点击快捷选择之后，`form.reset` 不生效的 bug。
- 修复 `RangePicker` 只点击一个日期也能保存关闭的 bug。
- 修复 `InputNumber` 作为 `Popover` 子元素无效的 bug。
- 修复 `Tree` 组件在动态加载数据后，外部更新 treeData，子节点列表未展开的 bug。

### 💅 Style

- `Steps` 去掉最大宽度解决内容超出无法显示的样式问题。

## 2.4.1

2020-12-18

### 🐛 Bugfix

- 修复 `Tree` 组件拖拽失效的问题。
- 修复 `TreeSelect` 组件节点`title`为`ReactNode`时出现崩溃的问题。
- 修复 `Switch` 组件在小尺寸的`Form`中仍为默认尺寸的问题。
- 修复 `Dropdown` 点击下拉框选项隐藏弹框时未触发 `onVisibleChange` 的问题。
- 修复 `List`组件传入单个`children`时，显示无数据的问题。
- 修复 `TimePicker`的`onChange`只在 `value`发生改变的时候触发。
- 修复 `Menu`组件`horizontal`模式下自适应宽度菜单项收缩表现异常。

### 💅 Style

- 调整 `Avatar.Group` 组件设置 `maxCount`时，显示数字的头像的`cursor`属性为`default`。
- 调整 `Switch` 组件`small`尺寸无法对齐的问题

### 🆎 TypeScript

- 修正 `Table` 组件泛型定义及完善 `Ref` 类型。

## 2.4.0

2020-12-11

### 🆕 功能升级

- 暴露 `ConfigContext` 给 `ConfigProvider`，支持通过 `ConfigProvider.ConfigContext` 调用。
- `Carousel` 组件 `onChange` 回调新增 `isManual` 参数，用于区分是否是由用户主动触发的翻页。
- `Avatar.Group` 增加 `maxCount` 属性限制最多展示的头像数目。

### 🐛 Bugfix

- `Cascader` 动态加载数据时，处理 `loadMore` 抛出的异常，避免节点一直处于 loading 状态。
- 兼容 `react-hot-loader` 导致的 `Select` 内部 `undefined` 报错。
- 修复 `Select` 组件 `showSearch` 和 `disabled` 一起使用时 输入框的鼠标样式未变成禁用的 bug。
- 修复 `Select` 输入搜索内容时窗口失焦，输入框内容会被恢复至初始态的 bug。
- 修复 `Select` 组件 `trigger` 属性传入 `focus` 时，`React.propTypes` 检查报错的 bug。
- 修复 `TreeSelect` 在打开节点时，子节点被选中的收起状态的节点也会被展开的 bug。
- 修复 `TreeSelect` 在子节点被选中，收起其父节点，再次打开 scrollIntoView 定位有误的 bug。
- 修复 `Select` tag 模式下使用自动分词，输入文本后输入分隔符，文本未被添加至选项中的 bug。

### 🆎 TypeScript

- `Icon.addFromIconFontCn` 添加原生 svg 的 ts 定义和 ref 定义。
- `Table` 组件 `column.width` ts 类型添加 string 类型。
- 修复 `Backtop` 定义缺少 `children` 的问题。
- 修改 `Input`，`Upload` 组件的 ref 定义。
- `Layout` 组件 `Sider` `Heade` `Footer` `Content` 组件使用 ref 时, TS 报错。
- 完善组件中带有 `React.useImperactiveHandle` 用法的 ref 类型。

## 2.3.2

2020-12-10

### 🐛 Bugfix

- 修复 `Modal` 组件内部弹出型组件弹出框定位有误的问题。
- 修复 `Resizebox` 组件`top`方向高度计算错误的问题。
- 修复 `Resizebox.Split` 元素超出导致无法拖动的问题。

## 2.3.1

2020-12-04

### 💎 优化

- 搜索图标修正。
- `Image` 组件错误状态下要显示 `alt`。

### 🐛 Bugfix

- 修复 `ResizeBox` 在 moving 时有状态变化会报错的 bug。
- 修复 `Select` 组件 `removeIcon` 属性不生效。
- 修复 `Select` 组件 ref 没有暴露 DOM 节点的 bug。
- 修复 `SubMenu` 热更新时 undefined 导致的报错问题。
- 修复 `Tree` 在动态加载数据后未自动展开的问题。
- 修复 `Tree` 组件在展开收起时候子节点闪现的问题。
- 修复 `closable` 属性在 `Modal` 通过静态方法创建弹窗时不生效的 bug。
- 修复 `Modal` 组件 `modalRender` 仅返回一个 `select`,下拉框被 mask 遮盖的问题。

### 💅 样式

- 修复 `Button` 组件设置 `href` 时如果只设置了 `icon`，没有居中的样式问题。
- 消除 `Menu` 中 `<a>` 的默认样式。
- 修复 `Cascader` 层级较深，列表较多，出现折行的样式问题。

### 🆎 TypeScript

- `Table` 组件的 `data` 和 `columns` 属性类型定义改为可选。
- `Carousel` 组件 `indicatorPosition` 和 `onChange` 参数的 ts 定义修正。

## 2.3.0

2020-11-27

### 🆕 功能升级

- `ConfigProvider` 支持设置全局 `autoInsertSpaceInButton`，在按钮中是两个汉字的时候，自动添加空格。
- `Avatar.Group` 支持设置 `zIndexAscent` 设置头像的 `z-index` 递增。
- `Select` 组件新增 `onInputValueChange` 回调，支持 `inputValue` 的受控模式。
- `TreeSelect` 支持 `dropdownRender` 和 `dropdownMenuStyle` 属性，可以自定义扩展下拉菜单。
- `Result` 组件支持传入 `status = null` ，会不设置默认背景色并且调整自定义图标大小。
- `Table` 组件 `filterDropdown` 的 `confirm` 参数添加参数 `filterKeys`，修复 `confirm` 不能立即拿到最新 `filterKeys` 的 bug。

### 💎 优化

- `DatePicker` 和 `TimePicker` 会自动排序选择的时间。
- `DatePicker.RangePicker` showTime 模式下第一次打开不显示内置禁用, 点击输入框切换之后才会显示内部禁用。
- `DatePicker.RangePicker` 组件在组件有值时，第一次点击确认之后不会直接关闭，会切换到第二个面板。
- 优化 `Menu` 组件水平模式时设置高度的简易程度。

### 🐛 Bugfix

- 修复 `Select` 组件可搜索情况下失焦时没有触发 `onSearch` 的 bug。
- 修复 `Select` 组件设置 `triggerProps.autoAlignPopupWidth = false` 时，下拉框宽度抖动的 bug。
- 修复 `Modal` 组件静态方法创建的弹窗 `isNotice` 属性被映射到 HTML 标签，造成控制台警告的 bug。
- 修复 `AutoComplete` 组件 `onSelect` 回调第二个参数无法获得 `data` 中传入的自定义数据的 bug。
- 修复 `List.Item` 组件传入 `className` 时，组件内置的类名直接被覆盖的 bug。

### 💅 Style

- 修复 `Avatar` 组件和 `Space` 组合使用不能垂直居中的样式问题。
- 修复 `Select` 组件标签模式输入超长标签失焦后输入框多出一行空白的样式问题。
- 移除 `Progress` 组件多余的 `z-index` 属性。
- 修复 `Table` 组件空数据状态在固定列时暂无数据不居中的样式问题。

## 2.2.1

2020-11-24

### 💎 优化

- 字体打包成 base64，避免路径问题出现。

### 🐛 Bugfix

- 修复 `Typography` 组件 `editable.onStart` 没有在点击 edit 图标时触发的 bug。
- 修复 `Drawer` 自定义 footer 含有弹出的 tooltip 被遮盖的问题。

### 💅 Style

- 修复 `Modal` 内容未折行的问题。

## 2.2.0

2020-11-20

### 🆕 功能升级

- `Input.TextArea` 组件新增 `allowClear` 和 `onClear` 属性，支持清除已输入内容。
- `ResizeBox` 组件新增 `onMovingStart` `onMoving` `onMovingEnd` 回调。
- `Modal` 组件新增 `modalRender` 属性以支持自定义弹窗节点。
- `AutoComplete` 组件新增 `virtualListProps` 属性以支持配置虚拟列表。
- `Select` 组件 `virtualListProps` 暴露 `height` `itemHeight` `isStaticItemHeight` 三个参数。
- `Select.Option` 组件新增 `extra` 属性以支持为 `Option` 传入任意自定义信息，方便在 `onChange` 回调中获得自定义信息。
- `Upload` 组件拖拽上传时不区分后缀名大小写。

### 🐛 Bugfix

- 修复 `Statistic` 组件设置 `value` 为 `0` 且 `countUp` 为 `true` 时显示 `NaN` 的 bug。
- 修复 `Checkbox.Group` 组件在非受控模式无法选中的 bug。
- 修复 `Icon` 组件中的全局 `prefixCls` 与 1.x 组件库冲突的 bug。
- 修复 `Descriptions` 组件 `data` 传入空数组报错的 bug。
- 修复 `Form.Control` 在 `Input/Select` 存在父节点时导致栈溢出的 bug。
- 修复 `AutoComplete` 组件无法获得其 `ref` 的 bug。
- 修复 `Select` 组件添加新的选项时列表被滚动至最上边的 bug。
- 修复 `Tabs` 组件 `TabPane` 的 `children` 都为 `null` 时显示内容的 DOM 节点仍然被渲染的 bug。

### 💅 样式

- 解决 CSS 变量被重复引入的问题。
- 修复 `Table` 组件在开启虚拟列表的时候，没有数据时 "暂无数据" 的提示未居中的问题。
- 修复 `Notification` 组件英文长文本没有折行的问题。
- 修复 `Modal` 组件宽度 100% 时折行的问题。

### 🆎 TypeScript

- `Radio` 组件支持其原生 HTML 标签属性。
- `Tree` 组件 `loadMore` 的参数类型由 `NodeProps` 变更为 `NodeInstance`。

## 2.1.3

2020-11-19

### 🐛 Bugfix

- 修复 `Checkbox.Group` 设置 `value` 为 `undefined` 时报错的 bug。

### 💅 样式

- 修复 `Select` 组件 `bordered` 为 `false`，聚焦时仍有背景色的问题。

## 2.1.2

2020-11-13

### 🐛 Bugfix

- 修复 `Select` 配合 `filterOption` 搜索时，下拉框选项的字符串渲染了两次的 bug。
- 修复 `Form.Item` 在被设置了 `noStyle` 属性的 `FormItem` 包裹时，`wrapperCol` 和 `labelCol` 未生效的 bug。
- 修复 `Form.Item` 上 `labelAlign` 属性不生效的 bug。
- 修复 `Select` 存在分组的时候，键盘方向键选择选项时无法触发下拉框滚动的 bug。
- 修复 `Select` 设置 `labelInValue` 时，得到的 `label` 为 `undefined` 的 bug。
- 使用 `ref` 替代 `Tree` 中的 `findDOMNode`，避免在严格模式下报错。
- 修复 `Rate` 组件精度问题，比如 `3.7` 应该为 4 星，在 `allowHalf` 模式下应该是 3.5 星。
- 修复 `Avatar` 组件 `children` 类型限制太死的问题，修改为除了 `image` 和 `picture` 标签，其他 `children` 都直接渲染。
- 修复更新内容后的 `Message` 无法通过返回值在外部 `close` 的 bug。

### 💅 样式

- 修复 `Space` 组件中使用 `Tag`，没有垂直居中对齐的样式问题。
- 修复 `Input.TextArea` 结合 `showWordLimit` 使用时，宽度不为 `100%` 的问题。

### 🆎 TypeScript

- `ResizeBox` 传入子节点 TS 报错。
- `DatePicker` 组件 `showTime.defaultValue` 为非必填。
- 导出 `Button` 组件 `BaseButtonProps` 定义。

## 2.1.1

2020-11-08

### 🐛 Bugfix

- 修复 `Form` 组件 `Form.Item` 中 children 为函数类型时，控件联动无效的 bug。
- 修复 `Select` 多选时，通过为 `Option` 传入自定义类名来自定义选项高度不生效的 bug。

### 💅 样式

- 调整 `Form` 传入的 `wrapperCol` 的仅在未嵌套的 FormItem 生效，修复嵌套使用样式不合预期的问题。

### 🆎 TypeScript

- 修复 `DatePicker.RangePicker` 组件 `showTime.defaultValue` 定义。

## 2.1.0

2020-11-06

### 🆕 功能升级

- `Select` 组件暴露虚拟滚动相关的接口 `virtualListProps`。
- `Affix` 组件 ref 暴露 `updatePosition` 接口。

### 💎 优化

- `Rate` 组件新增点击动效，增强反馈感。
- 优化色板算法，处理极端情况下的色彩运算，比如纯黑和纯白为主色。

### 🐛 Bugfix

- 修复 `Trigger` 组件 children 数量大于 1 个报错的 bug。
- 修复 `InputNumber` 在没有初始值和 `min` 的情况下，点击出现 `-Infinity` 的 bug。
- 修复 `DatePicker.RangePicker` 组件在存在 `value` 并且受控改变时，输入框值没有改变的 bug。
- 修复 `Select` 组件虚拟滚动时，设置的 `autoAlignPopupMinWidth` 无效的 bug。
- 修复 `Drawer` 组件嵌套 `react-monaco-editor`，编辑器宽度渲染有误的 bug。
- 修复 `Cascader` 组件在受控模式时 `value` 改变，`options` 节点选中状态未更新的 bug。
- 修复 `Form.Item` 未放在 `Form` 标签下，单独使用报错的 bug。
- 修复 `Slider` 组件在拖动结束的时候没有触发 `onAfterChange` 的 bug。
- 修复 `Layout.Sider` 单独设置 `collapsible` 时点击按钮无法展开收起的 bug。
- 修复 `Anchor` 组件更新 `scrollContainer` 未生效的 bug。
- 修复 `Anchor` 组件加上固定高的情况下，左侧线不完整的 bug。

### 💅 样式

- 修复当 `Table` 组件高度过小时，选择分页条目的弹出框被遮盖的样式问题。
- 修复 `Table` 组件的 loading 遮罩没有盖住固定列的问题。
- 修复 `Table` 下边框被固定列覆盖的样式问题。
- 修复 `Layout.Sider` 亮色模式的折叠按钮高了 1px 的问题。

### 🆎 TypeScript

- `Link` 组件支持原生 `a` 标签属性。
- `Select.OptGroup` 的 `isSelectOptGroup` 改为非必须。

## 2.0.0

2020-10-30

### 🚀 新组件

- `Space` 间距组件。

### 🆕 功能升级

- `Switch` 组件 `onChange` 增加 `event` 参数。

### 💎 优化

- `Message` `Notification` 动画对齐规范。
- 修改 `Tooltip` 等气泡型动画为缩放隐藏。
- 优化 `Modal` `Cascader` 组件动画。

### 💅 样式

- 修复 `Spin` 组件在高度极小的情况下会撑开不居中的样式。
- 修复 `Spin` 组件 `dot` 类型没有水平居中的样式。
- 修复 `Select` 值内容过长时没有显示省略号的样式。

### 🐛 Bugfix

- 修复 `Table` 组件 `pagination.sizeCanChange` 设置之后，点击切换分页无效的 bug。
- 修复 `Select` 组件 `tag` 模式下光标无法操控的 bug。
- `Input` 组件当值是 `null` 的时候展示空字符串。

## 2.0.0-beta.5

2020-10-28

### 新组件

- `Image` 图片组件。

### 功能升级

- `DatePicker` 新增 `defaultPickerValue`，用于设置默认面板展示日期。
- `Datepicker` 新增 `onOk` 回调，在点击确定按钮时触发。
- `DatePicker` 组件 `showTime.defaultValue` 用于设置默认显示的时间，`RangePicker` 时支持设置数组。
- `Message` 和 `Notification` 组件支持鼠标移入停止自动关闭，移出再关闭。
- `Spin` 组件支持 `dot` 类型。
- `Upload` 组件支持 `renderUploadItem` 属性。

### 优化

- 优化色板算法，使用 less `@plugin` 语法用 js 重构色板算法，解决打包 less 卡顿的问题。
- 优化 `Carousel` 卡片翻页动画效果。
- 拓宽 `Slider` 组件的可操作区域，使点选更为便捷。
- 优化 `DatePicker` 交互。

### Bugfix

- 修复 `Layout.Sider` 响应式收缩失效的 bug。
- `Select` 的 `Option` 允许所有非 `undefined` 的值。
- 修复 `DatePicker.YearPicker` 范围选择时，选择同十年面板没有错开的 bug。
- 修复 `Breadcrumb` 组件 `itemRender` 属性被添加到 dom 标签的 bug。
- 修复 `Button` 组件 `text` 类型和 `href` 并存时样式异常的问题。
- 修复 `Table` 组件只有一列且设置 `fixed` 报错的 bug。

### Style

- 去除所有可能导致外部样式覆盖困难的 important 用法。
- 解决 `Card` 组件未传入 `title` 时，`extra` 部分显示在左边的问题。
- 修复 `DatePicker` 选择时间的列偏移错误的 bug。
- 修复 `Input` 禁用时依旧触发 `active` 状态样式的问题。
- 修复 `Input.Textarea` 自动调整高度时出现滚动条的问题。
- 修复可悬浮 `Card` 在暗黑模式下自带阴影的问题。
- 修复 `FormItem` 传入 `help = undefined` 时，外边距为 0 的样式问题。

### TypeScript

- 加入 `Form` 及其子组件泛型支持, 修正部分组件类型错误。
- 修正 `InputNumber` 组件 `onChange` 的定义。

## 2.0.0-beta.4

2020-10-16

- 多个组件动效优化

### 功能升级

- `Select` 支持在多选时保留输入内容。
- `Pagination` 的 `onPageSizeChange` 添加第二个参数 `current`。
- `Table` 组件 `components.header.cell` 为组件时，入参添加 `column`。

### Bugfix

- 修复 `Table` 组件在固定列模式下，复选框列位置不对的 bug。
- 修复 `Layout` 组件的侧边栏在缩起状态下宽度跟 `Menu` 缩起不一致的 bug。
- 修复 `Anchor` 锚点组件标题的 id 以数字开头会报错的 bug。
- 修复 `DatePicker.RangePicker` 组件 `dayStartOfWeek` 不生效的 bug。
- 修复 `Transfer.Item` 拖拽时类名异常的 bug。
- 修复 `Card` 组件标题内嵌 `Grid.Row` 时，宽度异常的 bug。
- 修复 `Notification` 组件 `duration=0` 不生效的 bug。

### 样式

- 修复 `TimePicker` 组件列在出现滚动条时，挤压内容出现抖动的样式问题。

## 2.0.0-beta.3

2020-10-13

### 功能升级

- 组件新增对日语 (ja-JP) 的支持。
- 组件新增对韩语 (ko-KR) 的支持。
- `Switch` 组件交互动画优化。

### 问题修复

- 修复 `DatePicker.RangePicker` 在使用的 dayjs 跟组件库内 dayjs 版本不一致时 hover 到 shortcuts 上报错的 bug。
- 修复 `DatePicker.WeekPicker` 设置 `dayStartOfWeek` 不生效的 bug。

## 2.0.0-beta.2

2020-09-30

### 问题修复

- 修复 `Table` 在传入复杂 `data` 时，有可能出现栈溢出错误的问题。
- 修复 `Table` 的 `Column.sortOrder` 和 `Column.filteredValue` 受控模式异常的问题。
- 修复 `Select` 的 `disabled` 属性在单选且未设置初始值时未生效的问题。
- 修复使用 Webpack 打包时样式文件丢失的问题。
- 调整 `Input.Password` 的 `suffix` 属性优先级，使其高于默认图标。

### 样式调整

- `Breadcrumb` 组件添加默认字体色。
- 调整暗黑模式的主色调。
- 调整 `Menu` 弹出菜单动画效果。
- 调整全部弹出型菜单（`Select`，`Cascader`等）出现时的动画效果。

### TypeScript

- 修复 `Raido` 的 `value` 属性的 TS 类型。
- 修复 `Select.OptGroup`、`Tabs`、`Typography.Text`、`Typography.Paragraph` 的 `props` 缺少 `children` 的 TS 声明。

## 2.0.0-beta.1

2020-09-25

### 问题修复

- 修复`Dropdown`, `AutoComplete` 组件 `ts` 定义。
- 修复`AutoComplete`，`Select` 组件输入特殊字符导致组件崩溃的问题。

### 样式调整

- 暗黑模式组件细节调整，组件动画调整，体验升级。

## 2.0.0-beta.0

2020-09-18

### 主要更新

- 全新的设计语言，带来耳目一新的视觉体验，经过重新设计优化的组件动效，轻巧且高效。
- 新增 Comment、PageHeader、Mentions、Link、Result、Descriptions、Typography 七个组件。
- 在保持高质量组件内置样式的同时，样式变量被逐个详尽抽离为 Token，以支持高自由度的组件样式定制。你可以通过 Arco 主题商店，根据自身业务场景自由定制组件样式，让实现定制化的主题需求变得简洁高效。
- 通过动态色板算法，Arco 可以通过指定的主色快速生成一套色板，在快速变更页面主题的同时，也使得 Arco 的暗色模式更加智能。
- 使用 React Hook 重写了绝大多数的组件，同时对冗余、低效的代码逻辑进行优化提升组件性能和稳定性。在性能提升方面，Arco 作出了许多积极探索，例如组件初始加载时的效能提升、大量数据情况下的页面性能优化，通过引入虚拟滚动技术极大优化了组件长列表下的页面性能表现，同时也保证了与真实 Dom 节点无比接近的丝滑滚动体验。
- Select、Tree、Table、DataPicker、TimePicker 等多个复杂组件完全重构，完善基础功能，提升稳定性和性能表现。
- 移除了 1.x 版本中不合理的属性设计，精简使用逻辑，新增大量新的组件用法，覆盖绝大多数的业务使用场景。

### 视觉升级

- Button 组件的类型精简为五种，明确了不同按钮的语义和优先级。
- 加入全新风格的插画设计。
- 启用全新配色方案，将主题色调整为 Arco Blue (#165DFF) 。
- 将尺寸规范名称从 small, medium(default), large 和 huge 修改为 mini, small, - medium(default) 和 large，且对应数值分别下调 4px。
- 重新设计了 DatePicker 和 TimePicker 的交互方式，进行范围选择时，会自动切换开始和结束时间。
- 重新设计了 Radio 的按钮形态，使其在换行时有更好的表现。
- 各类表单元素采用了新的面性设计风格，其校验状态更加突出。
- 文字行高从 1.5 调整为 1.5715。
- 修改了部分组件使用时的动态效果。
- 为每个组件添加了完整的用法说明。
- 加入深色模式。

### 不兼容改动

- 组件库 NPM 包名变动，由 `@bytedesign/web-react` 变为 `@arco-design/web-react`。在引用组件库样式时，将会有如下的改变：

  ```less
  // 1.X
  @import '~@bytedesign/web-react/dist/css/byteui.css';
  // 或者
  import '@bytedesign/web-react/dist/css/byteui.css';

  // 2.X
  @import '~@arco-design/web-react/dist/css/arco.css';
  // 或者
  import '@arco-design/web-react/dist/css/arco.css';
  ```

- 删除了 `1.x` 中已经声明将于下个大版本中移除的图标，[移步此处](https://arco.design/react/1.x/components/icon) 查看详情。
- Checkbox.Group 中 `Options` 属性的优先级调整，`Options` 将比 `children` 优先级更高，与 Radio.Group 的行为保持一致。
- Tabs 的 `lazyload` 属性默认值变更为 `true`。
- Collapse 的 `lazyload` 属性默认值变更为 `true`。
- AutoComplete 对 Select 进行了复用，故有以下变动：
  - `filterOptions` 属性与 Select 的 `filterOptions` 属性保持一致。
  - `renderOptions` 属性被移除，使用 `dropdownRender` 替代，用法与 Select 相同。
  - `onSelect`、`onChange` 回调的参数 `option` 类型变更，参考 Select 的 `onChange` 回调参数。
  - `children` 将只用于指定可选项，自定义输入框请使用 `triggerElement` 属性。
- Form
  - Form.Item 和 Form.Control 传递的 `initialValue` 只生效一次，改变时不再触发表单控件的更新。
  - 右侧表单项的 `wrapperCol` 值变更为 `{ span: 19 }`。
- Switch 的文案设定方式改变，参考以下代码：

  ```jsx
  // 1.x
  <Switch>
    <span key="open">On</span>
    <span key="close">Off</span>
  </Switch>

  // 2.x
  <Switch checkedText="On" uncheckedText="Off" />
  ```

### 废弃的特性

- 移除了 `huge` 尺寸，新增 `mini` 尺寸，即组件可选尺寸由 `small`、`default`、`large`、`huge` 变更为 `mini`、`small`、`default`、`lagrge`。
- Button
  - 移除了对 `type=ghost` 的支持，将不再支持幽灵按钮。
  - 移除了对 `type = warning`、`type = error` 的支持，请使用 `status` 指定这两种状态。
- Select
  - 移除了 `hideArrowIcon` 属性，请使用 `arrowIcon = null` 替代。
  - 移除了 `tagClassName` 属性，请使用 `tagRender` 来自定义多选标签样式。
  - 移除了 `optionSelectedIcon` 属性，多选 Select 使用复选框来标识选项是否被选中。
- 移除了 Notification 的 `getContainer` 属性，请使用 `Notification.config.getContainer` 替代。
- 移除了 Message 的 `getContainer` 属性，请使用 `Message.config.getContainer` 替代。
- 移除了 Tag 的 `fill` 属性，2.0 本身即为面性设计。
- Table
  - 移除了 `checkbox` 属性，请使用 `rowSelection.type` 替代。
  - 移除了 `checkAll` 属性，请使用 `rowSelection.checkAll` 替代。
- Menu
  - 移除 `activeItemBorderDirection` 属性，2.0 设计中不再包含选中状态的亮色指示。
  - 移除 Menu.SubMenu 的 `popClassName` 属性，请通过 `triggerProps` 属性传入类名。
- 移除了 Trigger 对 `trigger = "manual"` 的支持，简化和完善其受控逻辑，通过 `popupVisible` 属性即可实现受控模式。
- 移除了 Form 的 `validateFields` 属性，请使用 `validate` 替代。
- 在`2.0`中并未移除`Form.Control`组件的使用，**但非常非常不建议继续使用**。它在`2.0`中作为内部组件，后续对其有功能改进或bugfix时，将会较少考虑到外部直接使用 `Form.Control` 的场景。
- 移除了 Slider 的 `showTooltip` 属性，请使用 `tooltipVisible` 替代。
- 移除了 Grid.Row 的 `flex` 属性，将默认使用 flex 布局实现响应式排列。
- `Upload` 组件 `uid` 属性变为必传，以此解决`1.x`版本中偶发受控失效的问题。

### 功能改进

- Avatar
  - 新增 Avatar.Group 组件，用于支持头像编组。
  - 新增 `triggerIcon`、`triggerIconStyle`、`triggerType` 参数，用于支持交互式头像。
- Alert 新增 `banner` 属性，用于支持横幅式警告提示。
- Anchor 新增 `lineless` 属性，用于支持无轴线模式。
- Button
  - 新增 `type = "secondary"` 的次级按钮类型。
  - 新增 `status` 属性，用于指定按钮特殊状态，可传入 `success`、`warning`、`error`。
  - 新增 `long` 属性，用于支持宽度撑满容器的长按钮类型。
  - 新增 `icon` 属性，用于在按钮中快速嵌入图标。
- Drawer 支持多层嵌套。
- Divider 新增 `orientation` 属性，用于指定插入的文本出现在分割线上的位置。
- Switch
  - 新增 `type` 属性，用于指定开关类型，共 `circle`、`round`、`line` 三种类型。
  - 新增 `loading` 属性，用于展示切换中的状态。
  - 新增 `checkedIcon` 和 `uncheckedIcon` 属性，用于指定开关按钮上的图标。
- Tabs
  - 新增 `position` 属性，用于设定选项卡出现的位置。
  - 新增 `type = "capsule"` 的胶囊类型选项卡。
- Tag 由 10 个内置颜色更改为 12 个内置颜色。
- Cascader 重写优化，提升对于键盘事件的支持。
- TimeLine
  - 新增 `direction` 属性，用于设定时间轴的方向。
  - 新增 `labelPosition` 属性，用于设定 label 文本的位置。
- Input
  - 新增 `Input.Group` 组件，用于实现输入框编组。
  - 优化在 Safari 浏览器中输入框的光标撑满整个组件高度的问题。
- Progress
  - 线性进度条的默认宽度由 400px 变更为 100%。
  - 新增微型进度条，通过 `size = "mini"` 即可使用。
  - 新增 `size = "large"` 尺寸的进度条。
- Upload 样式全面升级，默认宽度设定为 100%。

- Notification.config 支持设置 `getContainer` 和 `duration`，用于指定通知弹出的容器和持续时长。
- Message
  - Message.config 支持设置 `getContainer` 和 `duration`，用于指定通知弹出的容器和持续时长。
  - 新增 `closable` 属性，用于显示关闭按钮。
- Breadcrumb
  - 新增 `maxCount` 属性，用于配置最多渲染的面包屑数目，多余的条目将展示为省略号。
  - 新增 `routes` 属性，用于提供一种快捷设置下拉菜单的方式。
- Radio 新增 `direction` 属性，用于指定复选框方向，可指定 `horizontal`、`vertical`。
- Checkbox 新增 `direction` 属性，用于指定复选框方向，可指定 `horizontal`、`vertical`。
- AutoComplete
  - `children` 支持传入 AutoComplete.Option 作为数据源；
  - `data` 属性中的元素支持节点类型；
- Select
  - 代码逻辑重写，性能优化。
  - 采用虚拟滚动技术以保证长列表下的高性能表现。
  - 新增 `renderTag` 属性，用于支持自定义多选框标签样式。
  - 新增 `labelInValue` 属性，用于在 `onChange` 回调中获得对应选项的 `label` 值。
  - 新增 `bordered` 属性，用于配置是否展示边框背景。
- Tree
  - 新增 `blodeNode` 属性，用于指定节点占据一行的形式。
  - 新增 `icon` 属性，用于快速定制组件的所有图标。
  - 新增虚拟滚动支持，只需通过 `height` 属性指定容器高度即可启用。
- Rate
  - `character` 属性可传入函数以根据 `index` 指定不同的图标。
  - 新增 `allowClear` 属性，用于指定可清空的评分组件。
- Pagination
  - 新增 `itemRender` 属性，用于定制分页按钮的结构。
  - 新增 `pageItemStyle` 和 `activePageItemStyle` 属性，用于指定分页按钮的样式。
  - 废弃 `mini` 属性，新增 `size` 属性以支持多种尺寸。
- Table
  - `components` 属性支持更大粒度的配置。
  - 支持定制前置操作列和拖拽排序。
  - 新增度虚拟滚动的支持，以提升大量数据下的性能表现。
  - `pagePosition` 属性新增 `topCenter`、`bottomCenter` 类型，用于支持配置更多的分页位置。
  - `border` 属性支持设置为对象，可配置 `wrapper`、`cell`、`headerCell`、`bodyCell` 的边框。
- Carousel
  - 新增 `animation` 参数，用于指定翻页的动画。
  - `indicatorType` 属性新增 `slider` 类型的条状指示器；
  - `indicatorPosition` 新增 `out` 类型的外部指示器。
  - `indicatorType` 默认值由 `line` 更换为 `dot`。
- Card 新增 Card.Grid 组件，用于支持网格内嵌卡片。
- Dropdown
  - Dropdown.Button 新增 `size`、`onVisibleChange`、 `buttonsRender` 属性。
  - 新增 `defaultActiveFirstOption` 属性，指定是否默认高亮第一个选项。
- Menu
  - `mode` 属性新增 `pop` （弹出）类型。
  - `icons` 属性新增 `collapseDefault` 和 `collapseActive` 两个字段，用于配置折叠按钮的图标。
  - 新增 `levelIndent` 参数，用于配置层级递进时的缩进量。
  - 新增 `hasCollapseButton` 参数，用于配置是否内置折叠按钮。
  - 新增 `onCollapseChange` 参数，用于指定菜单折叠时的回调。
  - 新增 `tooltipProps` 参数，用于接受 ToolTip 组件的参数。
- Badge
  - 内置多种颜色，并支持直接通过 `color` 属性设置徽标颜色。
  - 新增动态效果，优化视觉体验。
  - 新增 `offset` 属性，用于设置徽标位置的偏移量。
- Trigger
  - `trigger` 属性新增 `contextMenu` 类型，用于支持右键触发弹出。
  - `trigger` 属性支持传入数组，用于设置多个触发方式。
  - 新增 `alignPoint` 属性，用于支持弹出层根据鼠标位置定位。
  - 优化受控逻辑，指定 `popupVisible` 即可启用完全受控模式。
- Tooltip
  - 新增 `defaultPopupVisible` 属性，用于指定默认的弹出状态。
  - 新增 `mini` 属性，用于指定使用迷你尺寸的文字气泡。
- Popover 新增 `defaultPopupVisible` 属性，用于指定默认的弹出状态。
- Popconfirm 新增 `defaultPopupVisible` 属性，用于指定默认的弹出状态。
- List
  - 新增 `wrapperStyle` 属性，用于指定外层包裹容器的样式。
  - 新增虚拟滚动支持，只需通过 `height` 属性指定容器高度即可启用。
- DatePicker
  - 完全重写，交互修改，优化新能和体验。
  - 新增季度选择 QuarterPicker。
  - 范围选择器支持对所有选择器类型（date / week / month / year / quarter）的范围选择。
  - 新增 `separator` 属性，用于设置范围选择器输入框内的分割符号。
  - 新增 `shortcutsPlacementLeft` 属性，用于在大量预设时间的场景下设置预设范围选择是否放在面板左侧。
  - 范围选择器 `disabled` 属性支持传入数组，用于禁用单个时间。
  - 新增 `extra` 属性，用于设置额外页脚。
- TimePicker
  - 完全重写，交互修改，优化新能和体验。
  - 新增 `icons` 属性，用于来配置图标。
  - 新增 `size` 属性，用于设置多个尺寸。
  - 新增 `extra` 属性，用于设置额外页脚。
- Form
  - Form.Item 传入 `field` 属性时，也可以根据 `shouldUpdate` 属性更新表单控件。
  - Form.List 支持 `move` 方法，可以调整表单项的顺序。
  - Form.List 的 `add` 方法支持传第二个参数，指定表单项插入位置.
  - 新增 `onChange` 方法，仅在用户操作表单时候触发。
- Transfer
  - 新增 `children` 属性，用于自定义列表渲染函数。
  - 新增 `defaultTargetKeys` 属性，用于指定默认目标选项，`targetKeys` 属性更改为受控模式。
  - 新增 `defaultSelectedKeys` 参数，用于指定默认选中项，`selectedKeys` 更改为受控模式。
  - 新增 `oneWay` 属性，用于指定使用单向模式。
  - 新增 `simple` 属性，用于指定简洁模式。
  - 新增 `pagination` 属性，用于指定支持翻页。
  - 新增 `draggable` 属性，用于指定列表内是否可以拖拽。
  - 新增 `onDragStart`、`onDragEnd`、`onDragLeave`、`onDragOver`、`onDrop` 回调，作为拖拽时的回调函数。
- Steps
  - 新增 `lineless` 属性，用于设置隐藏连接线。
  - `type` 属性新增 `navigation` 类型，用于使用导航类型的步骤条。
- Resizebox 新增 ResizeBox.Split 组件，用于支持面板分割。
