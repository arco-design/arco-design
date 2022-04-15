## 2.32.0

2022-04-15

### 🐛 BugFix

- Fix the `onSelect` event not triggered when the `TimePicker` input is correct.([#769](https://github.com/arco-design/arco-design/pull/769))

## 2.30.0

2022-03-04

### 🆕 Feature

- The `TimePicker` component supports `utcOffset` and `timezone` to set the UTC time and timezone.([#604](https://github.com/arco-design/arco-design/pull/604))

## 2.27.1

2021-12-24

### 🐛 BugFix

- Fix the bug that the next time the onChange callback is incorrect when the `TimePicker` component is set to `undefined` under the control mode.([#361](https://github.com/arco-design/arco-design/pull/361))

## 2.23.0-beta.0

2021-09-17

### 🆕 Feature

- The `TimePicker` component adds the `scrollSticky` parameter to set whether to stick when scrolling.

## 2.21.0

2021-08-20

### 🆕 Feature

- The `TimePicker.RangePicker` component adds the `order` parameter to set whether to automatically sort.
- `TimePicker` add `showNowBtn`.

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that the `onChange` callback parameters of the `TimePicker.RangePicker` component are not automatically sorted.



## 2.20.0

2021-07-30

### 🆕 Feature

- The `TimePicker` component supports scrolling and automatic adsorption.

## 2.19.3

2021-07-23

### 🐛 Bugfix

- Fixed the bug that the `onChange` would not be triggered after the `TimePicker` component turned on `disableConfirm`.

## 2.18.2

2021-07-09

### 🐛 Bugfix

- Fix the bug that clicking the clear button of `TimePicker` will change the display state of the pop-up layer.

## 2.12.0

2021-03-19

### 🆕 Feature

- Added the `disableConfirm` property to the `TimePicker` component to support directly confirming the time when clicking.

### 🐛 Bugfix

- Fixed the problem that setting the `value` directly without opening the panel when the `TimePicker` component is in the controlled mode does not take effect.

## 2.7.2

2021-01-19

### 🐛 Bugfix

- Fix the bug that the `TimePicker` component loads missing styles on demand.



