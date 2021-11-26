## 2.25.1

2021-11-26

### 💎 优化

- `DatePicker.RangePicker` 组件 `showTime.defaultValue` 支持传入 `number[], string[], Date[]`，避免出现 dayjs 实例不一致引发的报错。([#226](https://github.com/arco-design/arco-design/pull/226))

## 2.24.0

2021-11-05

### 💎 优化

- `DatePicker` 组件如果值是 `string` 类型，且跟 format 不一致导致解析为 Invalid Date 时，会兜底尝试 format="YYYY-MM-DD"([#113](https://github.com/arco-design/arco-design/pull/113))

## 2.23.1

2021-10-15

### 🐛 问题修复

- 修复 `DatePicker` 组件 `disabledDate` 在快捷面板中不生效的 bug。

## 2.23.0

2021-09-27

### 🆕 功能升级

- `DatePicker.RangePicker` 组件支持设置 `clearRangeOnReselect`。
- `DatePicker.RangePicker` 组件 `onSelect` 增加第三个参数 `extra`。

### 🐛 问题修复

- 修复 `DatePicker.RangePicker` 组件切换 mode 时，没有第一时间更新面板的 bug。
- 修复 `DatePicker.WeekPicker` 没有初始化本地时区和星期起始的 bug。

## 2.22.0

2021-09-10

### 🐛 问题修复

- 修复 `DatePicker` 组件在使用 shortcuts 时传入的 dayjs 对象跟内部版本不一致时，hover 就会报错的 bug。
- 修复 `DatePicker` 组件在使用 `dateRender` 时，外层 dom 上的事件不能触发的 bug。
- 修复 `DatePicker.RangePicker` 组件在只使用面板且有默认值时，首次点击选择需要多点一次的 bug。

### 🆎 类型修正

- `DatePicker.RangePicker` 组件 `onOk` 类型修正。

## 2.21.1

2021-08-27

### 🐛 Bugfix

- 修复 `DatePicker` 组件在有值的情况下再异步设置 `value` 不生效的 bug。

## 2.21.0

2021-08-20

### 🆕 功能升级

- `DatePicker` 组件新交互，增加下次范围的高亮显示，切换时间面板的操作放到按钮上。

### 🐛 Bugfix

- 修复 `WeekPicker` 组件周数显示不正确的 bug。

### 🆎 TypeScript

- `DatePicker.RangePicker` 的 `pickerValue` 类型修正。

## 2.20.1

2021-08-06

### 💅 Style

- 修复 `DatePicker` 组件今天的样式在灰色日期上也会出现的问题。



## 2.20.0

2021-07-30

### 🆕 Feature

- `DatePicker` 组件新增 `icons` 参数以支持自定义图标。
- `DatePicker` 组件新增 `hideNotInViewDates` 属性来隐藏灰色日期。
- `DatePicker` 组件 `dayStartOfWeek` 属性支持设置从周一到周日。

## 2.19.3

2021-07-23

### 🐛 Bugfix

- 修复 `DatePicker.RangePicker` 组件设置 `showTime` 后，输入有问题的 bug。

## 2.17.1

2021-06-20

### 🐛 Bugfix

- 修复 `DatePicker` 组件判断日期变化时可能导致报错的 bug。

## 2.17.0

2021-06-18

### 💎 Optimization

- `DatePicker` 组价交互优化，并且修复 `showTime` 时重新选择时间会用默认值覆盖掉已选中值的问题。



## 2.16.1

2021-06-04

### 💎 Optimization

- 优化 `DatePicker.RangePicker` 组件重复选择日期跳动问题。



### 🐛 Bugfix

- 修复 `DatePicker` 组件 `showTime` 时，选中一个值后 hover 快捷选择再离开，值会恢复到初始值的 bug。

## 2.16.0

2021-05-28

### 💎 Optimization

- 支持快速时间跳转，点击面板 header 可以任意选择年、月。
- 带时间的日期选择器交互回到 1.0，同时优化了禁用的逻辑和表现。
- 范围选择器禁用单个时间后，会自动在面板上禁用相应面板的日期选择和时间选择。
- 范围选择器左右面板联动，避免出现不合预期的面板显示。




## 2.15.3

2021-05-21

### 🐛 Bugfix

- 修复 `DatePicker` 开启 `showTime` 之后，点击此刻按钮，时间不对的 bug。

## 2.15.0

2021-04-30

### 🐛 Bugfix

- 修复 `DatePicker` 组件 `onSelect` 回调在未选择完全就进行排序的 bug。
- 修复 `DatePicker.RangePicker` 在禁用一半的时候，点击确认按钮还是需要选择另一个时间的 bug。

### 💅 Style

- 修复 `DatePicker` 和 `TimePicker` 组件禁用且有默认值时，默认值在 Safari 浏览器未显示的问题。



## 2.14.1

2021-04-16

### 🐛 Bugfix

- 修复 `DatePicker.RangePicker` 组件开启 `showTime` 之后，组件输入值后切换面板，显示不正确的 bug。

## 2.10.0 🏮

2020-02-26

### 🆎 TypeScript

- `DatePicker.WeekPicker` 添加 `dayStartOfWeek` 类型。

## 2.9.1

2021-02-20

### 💅 Style

- 修复 `DatePicker` 和 `Select` 组件在暗色模式下 error 状态背景色错误的问题。

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- `DatePicker` 组件支持设置 `triggerElement` 自定义触发元素。
- `DatePicker` 组件在设置 `triggerElement=null` 时，会直接显示面板。

### 🐛 Bugfix

- 修复 `DatePicker.RangePicker` 组件直接点击同一天不能直接确认的 bug。

## 2.8.0

2021-01-22

### 🆕 Feature

- `DatePicker` 组件 `format` 参数支持传入函数，定制显示内容。

### 🐛 Bugfix

- 修复 `DatePicker` 组件在受控模式下点击今天按钮，`onChange` 偶发的不触发的 bug。



## 2.6.0

2021-01-08

### 🐛 Bugfix

- 修复`DatePicker.RangePicker`在`showTime`模式输入无法选值的问题。
- 修复`DatePicker`在受控模式下，点击`onClear`偶发不生效的问题。
- 修复在始终显示滚动条时，`DatePicker`的时间选择列表会撑开的样式问题。

## 2.5.1

2020-12-31

### 🐛 Bugfix

- 修复 `DatePicker.RangePicker` 的 onSelect 回调未排序的 bug。
- 修复 `DatePicker.RangePicker` 的 `timepickerProps` 不生效的 bug。



## 2.5.0 🎅🏽

2020-12-25 🎄

### 💎 Optimization

- `DatePicker.RangePicker` 暂时关掉动态的禁用时间效果，目前看来这个交互只带来了操作负担。

### 🐛 Bugfix

- 修复 `RangePicker` 点击快捷选择之后，`form.reset` 不生效的 bug。
- 修复 `RangePicker` 只点击一个日期也能保存关闭的 bug。



### 🆕 Feature

- `DatePicker` 组件新增 `disabledTime` 设置禁用时间。

## 2.3.0

2020-11-27

### 💎 Optimization

- `DatePicker` 和 `TimePicker` 会自动排序选择的时间。
- `DatePicker.RangePicker` showTime 模式下第一次打开不显示内置禁用, 点击输入框切换之后才会显示内部禁用。
- `DatePicker.RangePicker` 组件在组件有值时，第一次点击确认之后不会直接关闭，会切换到第二个面板。

## 2.1.2

2020-11-13

### 🆎 TypeScript

- `DatePicker` 组件 `showTime.defaultValue` 为非必填。

## 2.1.1

2020-11-08

### 🆎 TypeScript

- 修复 `DatePicker.RangePicker` 组件 `showTime.defaultValue` 定义。



## 2.1.0

2020-11-06

### 🐛 Bugfix

- 修复 `DatePicker.RangePicker` 组件在存在 `value` 并且受控改变时，输入框值没有改变的 bug。

