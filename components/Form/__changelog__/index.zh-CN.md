## 2.44.0

2023-01-13

### 🆕 功能升级

- `Form` 支持通过 `useFormState` 获取指定字段的校验信息，校验状态([#1723](https://github.com/arco-design/arco-design/pull/1723))

## 2.43.0

2022-12-23

### 🆕 功能升级

- `Form.Item` 支持通过 `tooltip` 属性设置提示信息。([#1665](https://github.com/arco-design/arco-design/pull/1665))

## 2.42.2

2022-12-09

### 💎 功能优化

- 优化 `Form.List` 组件在通过 Form API 更新表单项数据时全部重渲染导致页面卡顿的情况。([#1638](https://github.com/arco-design/arco-design/pull/1638))

## 2.41.0

2022-10-28

### 🆕 功能升级

- `Form` 组件的 `colon` 属性支持传入 `ReactNode`。([#1455](https://github.com/arco-design/arco-design/pull/1455))

### 🐛 问题修复

- 修复 `Form.Item` 组件的 `shouldUpdate` 属性在重置表单项时未生效的 bug。([#1462](https://github.com/arco-design/arco-design/pull/1462))

## 2.40.0

2022-09-16

### 💎 功能优化

- 优化 `Form` 组件内置校验信息模板([#1398](https://github.com/arco-design/arco-design/pull/1398))

### 🆕 功能升级

- `Form.Item` 支持 `dependencies` 属性([#1397](https://github.com/arco-design/arco-design/pull/1397))

### 🐛 问题修复

- 修复 `Form.useWatch` 在 `field` 改变时，返回值未及时更新的 bug。([#1400](https://github.com/arco-design/arco-design/pull/1400))

## 2.38.1

2022-08-05

### 🐛 问题修复

- 修复 `Form` 组件 `setFieldsValue` 传入的值为空数组或空对象时，设置未生效的问题。([#1186](https://github.com/arco-design/arco-design/pull/1186))

## 2.37.0

2022-07-08

### 🆕 功能升级

- `Form.useWatch` 支持监听多个字段值。([#1034](https://github.com/arco-design/arco-design/pull/1034))

### 🐛 问题修复

- 修复 `Form.useWatch` 在监听有初始值但未挂载的表单控件时，返回值存在 `初始值 => undefined` 的变化，导致组件更新。([#1034](https://github.com/arco-design/arco-design/pull/1034))
- 修复 `Form.Item` 组件注入到自定义表单控件的 `onChange` 方法每次渲染都会重新声明的 bug。([#1102](https://github.com/arco-design/arco-design/pull/1102))

## 2.36.1

2022-07-01

### 🐛 问题修复

- 修复 `Form.List` 下调整表单项顺序，校验状态可能出现展示错乱的问题([#1077](https://github.com/arco-design/arco-design/pull/1077))

## 2.36.0

2022-06-24

### 🐛 问题修复

- 修复 `Form.List` 组件在移除表单项时，其他表单项校验状态丢失的 bug。([#1046](https://github.com/arco-design/arco-design/pull/1046))
- 修复 `form.clearFields()` 方法未清空校验状态的 bug。([#1046](https://github.com/arco-design/arco-design/pull/1046))

## 2.35.0

2022-06-10

### 🐛 问题修复

- 修复在 `Form.List` 新增/删除行时，`Form.useWatch` 返回值非最新值的 bug。([#955](https://github.com/arco-design/arco-design/pull/955))

## 2.34.0

2022-05-27

### 🐛 问题修复

- 修复 `Form` 组件通过 `setFields` 设置 `warning` 为 `null` 时，表单控件的 `warning` 状态未被清空的 bug 。([#930](https://github.com/arco-design/arco-design/pull/930))

## 2.33.1

2022-05-20

### 🐛 问题修复

- 对 `getFieldValue` 返回值的修改不应该影响 `Form` 内部的原始数据([#869](https://github.com/arco-design/arco-design/pull/869))

### 🆎 类型修正

- 补全`FormItemProps`中的`children`类型，以兼容React 18([#874](https://github.com/arco-design/arco-design/pull/874))

## 2.33.0

2022-05-13

### 🆕 功能升级

- `Form` 组件支持 `Form.useWatch`。([#864](https://github.com/arco-design/arco-design/pull/864))
- `Form` 组件支持 `Form.useFormContext`。([#864](https://github.com/arco-design/arco-design/pull/864))

## 2.32.2

2022-04-29

### 🐛 问题修复

- 修复 `Form` 组件在 React 18 严格模式下，表单项受控失效的 bug。([#823](https://github.com/arco-design/arco-design/pull/823))

## 2.32.0

2022-04-15

### 🆕 功能升级

- `Form`  组件支持通过 `validateMessages` 属性设置校验提示信息模板([#773](https://github.com/arco-design/arco-design/pull/773))

### 🐛 问题修复

- 修复 `Form.Item` 包裹的表单控件是由函数类型的 `children` 返回时，`onChange` 未被调用的 bug。([#760](https://github.com/arco-design/arco-design/pull/760))

## 2.30.2

2022-03-18

### 🐛 问题修复

- 修复 `Form.Provider` 导致控制台 warning 的 bug。([#646](https://github.com/arco-design/arco-design/pull/646))

## 2.30.0

2022-03-04

### 🆕 功能升级

- `Form` 组件支持通过 `Form.Provider` 组件进行多表单数据管理。([#607](https://github.com/arco-design/arco-design/pull/607))

## 2.29.2

2022-02-25

### 🐛 问题修复

- 修复 `Form.useForm` 方法传入 `form` 参数不生效的 bug。([#577](https://github.com/arco-design/arco-design/pull/577))

## 2.29.0

2022-02-11

### 🆕 功能升级

- `Form.Item` 支持通过 `hidden` 属性隐藏表单项([#509](https://github.com/arco-design/arco-design/pull/509))
- 支持通过 `clearFields` 方法清除表单项的值([#509](https://github.com/arco-design/arco-design/pull/509))

## 2.28.1

2022-01-14

### 🐛 问题修复

- 修复 `Form` 组件的 `scrollToFirstError` 属性在设置了 `noStyle` 的表单项上失效的 bug。([#444](https://github.com/arco-design/arco-design/pull/444))
- 修复 `Form` 组件 `mini` 尺寸时，校验失败时，表单项出现抖动的样式问题。([#438](https://github.com/arco-design/arco-design/pull/438))

## 2.28.0

2022-01-07

### 🆕 功能升级

- `Form` 组件支持通过 `validateTrigger` 属性全局设置校验规则触发的时机([#400](https://github.com/arco-design/arco-design/pull/400))

## 2.27.0

2021-12-17

### 💅 样式更新

- 修复在带有 `validateStatus` 的 `Form.Item` 中，`InputTag` 没有校验样式的问题。([#330](https://github.com/arco-design/arco-design/pull/330))

## 2.26.1

2021-12-07

### 🐛 问题修复

- 修复 `Form` 组件教验通过时表现出 `warning` 样式的 bug。([#282](https://github.com/arco-design/arco-design/pull/282))

## 2.25.0

2021-11-19

### 🆕 功能升级

- `Form` 支持在 `rules` 中设置 `validateTrigger` 属性指定规则在特定事件触发时候执行。([#190](https://github.com/arco-design/arco-design/pull/190))
- `Form` 支持在 `rules` 中设置 `validateLevel` 属性指定规则校验失败时仅显示 `warning` 状态，不阻塞表单提交。([#190](https://github.com/arco-design/arco-design/pull/190))
- `Form` 组件 `rule.message` 支持使用 `ReactNode`。([#185](https://github.com/arco-design/arco-design/pull/185))

## 2.24.0

2021-11-05

### 🐛 问题修复

- 调整 `Form` 组件的 TS 定义为 `FormHTMLAttributes`([#118](https://github.com/arco-design/arco-design/pull/118))
- 修复 `Form.List` 组件通过 `add()` 方法创建表单项，传入的默认值在该表单项带有 `initialValue` 时候未生效的 `bug` 。([#118](https://github.com/arco-design/arco-design/pull/118))

## 2.23.0

2021-09-27

### 🆕 功能升级

- `Form` 组件支持通过 `getValueFromEvent` 指定在子节点触发`onChange`事件时如何处理值。
- `Form` 组件支持通过 `formatter` 属性转换传递给控件的字段值。

### 🐛 问题修复

- 修复 `Form.List` 在设置初始值时，`add` 方法传入初始值不生效的bug

## 2.22.0

2021-09-10

### 💎 优化

-  `Form.List` 的 `add` 方法接收到事件对象做为参数时，在控制台给出提示。

### 🆕 功能升级

-  `Form.List` 支持通过 `initialValue` 属性设置初始值。

### 🐛 问题修复

-  修复 `Form.Item` 传入children为空字符串时，渲染报错的bug。

## 2.21.1

2021-08-27

### 🐛 Bugfix

- 修复 `Form.List` 内部的 `add`，`remove` 方法执行时，未触发 `Form` 的 `onChange` 事件的 bug。

## 2.21.0

2021-08-20

### 🆕 功能升级

- `Form` 组件支持 `onSubmitFailed` 属性，在提交表单时校验失败时调用。

### 🆎 类型修正

-  优化 `Form` 组件的 `setFieldsValue` 方法参数的 TS 定义

## 2.20.1

2021-08-06

### 🐛 Bugfix

- 修复 `Form` 组件未接收原生 `dom` 属性的 bug。
- 修复 `Form.Item` 组件未接收原生 `dom` 属性的 bug。

## 2.20.0

2021-07-30

### 🆎 TypeScript

- 优化 `Form` 组件 `scrollToFirstError` 属性的 `scrollIntoViewOptions` 的 TS 定义。

## 2.19.0

2021-07-16

### 💎 Optimization

- 优化 `Form` 表单键盘可访问性，点击 label 标签可以 focus 到表单项。

### 🆕 Feature

- `Form` 组件 `scrollIntoFirstError` 支持传入 `scrollIntoViewOptions`。

### 🐛 Bugfix

- 修复 `Form.List` 组件的 `move` 方法移动表单项位置错误的问题。
- 修复 `Form` 组件表单联动配合嵌套字段并设置表单项初始值的场景下，`setFieldsValue` 未生效的问题。

## 2.18.2

2021-07-09

### 🆎 TypeScript

- 修复 `Form.List` 组件的`add`方法参数定义缺失的bug。




## 2.18.0

2021-07-02

### 🐛 Bugfix

- 修复 `Form.List` 嵌套 `Form.List` 时，通过 `move` 方法调整 `FormItem` 顺序，其 UI 展示未根据 `value` 更新的 bug。



## 2.16.1

2021-06-04

### 🆎 TypeScript

- 修复 `Form` 组件类型被推导为 `any` 的问题。




## 2.16.0

2021-05-28

### 🐛 Bugfix

- 修复 `Form.List` 组件在执行 `add` 方法时，重置了已校验控件的校验状态的问题。

### 🆎 TypeScript

- 导出`Form` 组件的 `FormInstance` 类型定义.



## 2.15.3

2021-05-21

### 💎 Optimization

- `Form` 阻止 `onSubmit` 事件冒泡。



## 2.14.0

2021-04-09

### 🆕 Feature

- 优化 `Form.List` 渲染逻辑，子组件改变时不渲染整个 Form.List。



### 🐛 Bugfix

- 修复 `Form.Item` 的 `initialValue` 优先级低于了 `Form` 上的 `initialValues` 优先级的 bug。

## 2.13.2

2021-04-01

### 🐛 Bugfix

- 修复 `Form` 组件在未设置初始值时，调用 `resetFieldsValue` 方法未触发 `onValuesChange` 的 bug。



## 2.12.0

2021-03-19

### 🐛 Bugfix

- 修复 `Form` 组件在控件创建时，`initialValue` 优先级高于创建前通过 `Form.setFieldsValue` 设置的值，导致控件一直展示为初始值的问题。

## 2.11.0

2021-03-12

### 🐛 Bugfix

- 修复 `Form.Item` 在卸载时被更新造成控制台报错的 bug。

## 2.10.0 🏮

2020-02-26

### 🆕 Feature

- `Form` 的 `resetFields` 方法支持传入字符串，重置单个字段。

## 2.9.1

2021-02-20

### 🐛 Bugfix

- 修复 `Form` 组件设置了 `className` 的 `labelCol` 属性时，label 标签的默认类名丢失的 bug。

## 2.9.0 🔥

2021-02-05

### 🐛 Bugfix

- 修复 `Form.Item` 组件销毁时，在上层 `Form.Item` 展示的错误信息未被销毁的 bug。

## 2.7.0

2021-01-15

### 💅 Style

- 修复 `Form` 组件 `extra` 提示文字在校验信息隐藏时闪动的问题。
- `Form` 在 `vertical` 布局时 label 添加 4px 的下间距。



## 2.5.1

2020-12-31

### 🐛 Bugfix

- 修复 `Form` 组件把`File`类型的值过滤为空对象的问题。

## 2.5.0 🎅🏽

2020-12-25 🎄

### 🆕 Feature

- `Form.Item` 支持传入 `noStyle` 为 `{ showErrorTip: true }` 来展示校验信息。

### 🐛 Bugfix

- 修复 `Form.List` 在内部嵌套存在联动，提交表单时，被销毁的控件字段被提交的 bug。
- 修复 `Form` 通过 `setFields` 设置 `formList` 中表单项的错误状态，当前索引之后的表单项也表现了错误态的 bug。

## 2.2.0

2020-11-20

### 🐛 Bugfix

- 修复 `Form.Control` 在 `Input/Select` 存在父节点时导致栈溢出的 bug。

## 2.1.2

2020-11-13

### 🐛 Bugfix

- 修复 `Form.Item` 在被设置了 `noStyle` 属性的 `FormItem` 包裹时，`wrapperCol` 和 `labelCol` 未生效的 bug。
- 修复 `Form.Item` 上 `labelAlign` 属性不生效的 bug。

## 2.1.1

2020-11-08

### 🐛 Bugfix

- 修复 `Form` 组件 `Form.Item` 中 children 为函数类型时，控件联动无效的 bug。

### 💅 Style

- 调整 `Form` 传入的 `wrapperCol` 的仅在未嵌套的 FormItem 生效，修复嵌套使用样式不合预期的问题。



## 2.1.0

2020-11-06

### 🐛 Bugfix

- 修复 `Form.Item` 未放在 `Form` 标签下，单独使用报错的 bug。

