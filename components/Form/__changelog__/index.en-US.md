## 2.26.1

2021-12-07

### 🐛 BugFix

- Fix the bug that the `warning` style of the `Form` component is shown when the teaching experience is passed.([#282](https://github.com/arco-design/arco-design/pull/282))

## 2.25.0

2021-11-19

### 🆕 Feature

- `Form` support to set the `validateTrigger` property in `rules` to specify that the rule will be executed when a specific event is triggered.([#190](https://github.com/arco-design/arco-design/pull/190))
- `Form` support setting the `validateLevel` property in `rules` to specify that only the `warning` status is displayed when the rule validation fails, and the form submission is not blocked.([#190](https://github.com/arco-design/arco-design/pull/190))
- The `Form` component `rule.message` supports the use of `ReactNode`.([#185](https://github.com/arco-design/arco-design/pull/185))

## 2.24.0

2021-11-05

### 🐛 BugFix

- Adjust the TS definition of the `Form` component as `FormHTMLAttributes`([#118](https://github.com/arco-design/arco-design/pull/118))
- Fix the `bug` that the `Form.List` component creates form items through the `add()` method, and the default value passed in does not take effect when the form item has an `initialValue`.([#118](https://github.com/arco-design/arco-design/pull/118))

## 2.23.0

2021-09-27

### 🆕 Feature

- Specify how to handle the value when the child node triggers the `onChange` event.
- The `Form` component supports conversion of the field values ​​passed to the control through the `formatter` property.

### 🐛 BugFix

- Fixed bug where 'add' method does not take effect when setting initial values for `Form. List`

## 2.22.0

2021-09-10

### 💎 Optimization

-  When the `add` method of `Form.List` receives the event object as a parameter, it will prompt in the console.

### 🆕 Feature

- `Form.List` supports setting the initial value through the `initialValue` property.

### 🐛 BugFix

- Fix the bug of rendering errors when `Form.Item` passes in children as an empty string.

## 2.21.1

2021-08-27

### 🐛 BugFix

-  Fix the bug that `onChange` can't be fired when to add or remove an item in `Form.List`.

## 2.21.0

2021-08-20

### 🆕 Feature

- The `Form` component supports the `onSubmitFailed` property, which is called when the validation fails when submitting the form.

### 🆎 TypeScript

-  Optimize `Form.setFieldsValue` ts definition

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that the `Form` component does not receive the native `dom` property.
- Fix the bug that the `Form.Item` component does not receive the native `dom` property.

## 2.20.0

2021-07-30

### 🆎 TypeScript

- Optimize the TS definition of `scrollIntoViewOptions` of `scrollToFirstError` property of `Form` component.

## 2.19.0

2021-07-16

### 💎 Optimization

- Optimize the keyboard accessibility of the `Form` form, click the label label to focus on the form item.

### 🆕 Feature

- The `Form` component `scrollIntoFirstError` supports passing in `scrollIntoViewOptions`.

### 🐛 Bugfix

- Fix the problem that the `move` method of the `Form.List` component moves the form items in the wrong position.
- Fix the problem that `setFieldsValue` does not take effect when the `Form` component form linkage cooperates with nested fields and sets the initial value of the form item.

## 2.18.2

2021-07-09

### 🆎 TypeScript

- Fix the bug that the parameter definition of the `add` method of the `Form.List` component.



## 2.18.0

2021-07-02

### 🐛 Bugfix

- When `Form.List` is nested with `Form.List`, the order of `FormItem` is adjusted by `move` method, and the UI display is not updated according to `value`.



## 2.16.1

2021-06-04

### 🆎 TypeScript

- Fix the problem that the `Form` component type is deduced to `any`.


## 2.16.0

2021-05-28

### 🐛 Bugfix

- Fix the problem that the verification state of the verified control is reset when the `Form.List` component executes the `add` method.

### 🆎 TypeScript

- Export the `FormInstance` definition of the `Form` component.

## 2.15.3

2021-05-21

### 💎 Optimization

- `Form` prevents the `onSubmit` event from bubbling.



### 🐛 Bugfix

- Fixed a bug that reported errors in `Form` when `Select` set `labelInValue`.

## 2.14.0

2021-04-09

### 🆕 Feature

- Optimize the rendering logic of `Form.List` so that the entire Form.List will not be rendered when the child components change.



### 🐛 Bugfix

- Fix the bug that the priority of `initialValue` of `Form.Item` is lower than the priority of `initialValues` on `Form`.

## 2.13.2

2021-04-01

### 🐛 Bugfix

- Fixed the bug that the `onValuesChange` was not triggered when the `resetFieldsValue` method was called when the initial value of the `Form` component was not set.



## 2.12.0

2021-03-19

### 🐛 Bugfix

- Fix the problem that the priority of `initialValue` of the `Form` component is higher than the value set by `Form.setFieldsValue` before the creation of the control when the control is created, causing the control to always display the initial value.

## 2.11.0

2021-03-12

### 🐛 Bugfix

- Fixed a bug that caused console error when `Form.Item` was updated during uninstallation.

## 2.10.0 🏮

2020-02-26

### 🆕 Feature

- The `resetFields` method of `Form` supports passing in a string to reset a single field.

## 2.9.1

2021-02-20

### 🐛 Bugfix

- Fix the bug that the default class name of label is missing when the `labelCol` property of `className` is set in the `Form` component.

## 2.9.0 🔥

2021-02-05

### 🐛 Bugfix

- Fix the bug that the error message displayed in the upper layer of the `Form.Item` is not destroyed when the `Form.Item` component is destroyed.

## 2.7.0

2021-01-15

### 💅 Style

- Fix the problem that the `extra` prompt text of the `Form` component flashes when the verification information is hidden.
- When `Form` is placed in `vertical`, the label adds 4px bottom space.



