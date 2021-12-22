## 2.27.0

2021-12-17

### 🆎 TypeScript

- `InputNumber` allows all `InputHTMLAttributes` to be passed through properties.([#326](https://github.com/arco-design/arco-design/pull/326))

## 2.24.0

2021-11-05

### 🐛 BugFix

- Fix the bug that `InputNumber` showed an error status when passing in `value` that is inconsistent with `precision`.([#116](https://github.com/arco-design/arco-design/pull/116))

## 2.21.0

2021-08-20

### 💎 Optimization

- `InputNumber` Extend the waiting time for automatic increase or decrease by long pressing the button of the mouse to avoid misoperation.

## 2.19.3

2021-07-23

### 🐛 Bugfix

- Fixed the bug that the popup layer did not pop up when the `InputNumber` and `InputTag` components were used as children of `Popover`.

## 2.18.2

2021-07-09

### 🐛 Bugfix

- Fixed the bug that the input of empty string in the `InputNumber` component `value` was incorrectly parsed as 0.

## 2.18.0

2021-07-02

### 💎 Optimization

- The `InputNumber` component `value` tries to convert it to a number when it passes in a string.
- Adjust the time when the `InputNumber` component corrects the incoming illegal `value` to ensure that it is corrected after the user has operated it.



### 🐛 Bugfix

- Fix the bug that may cause the content of the input box to become undefined when the `InputNumber` component enters alphabetic characters.

## 2.17.0

2021-06-18

### 💎 Optimization

- The `InputNumber` component passes in an illegal initial value when `max` or `min` is set. The initial value is retained during the first rendering and will be corrected after user operations.

### 🆕 Feature

- Added `readOnly` property to `InputNumber` component.

### 🐛 Bugfix

- Fix the bug that `value` to `undefined` does not take effect when `InputNumber` is under control.

### 💅 Style

- Fix the bug that text is not displayed in `Safari` when `InputNumber` is disabled.

## 2.14.1

2021-04-16

### 🐛 Bugfix

- Fix the bug that when setting the precision of the `InputNumber` component, it occasionally refocuses after inputting but cannot be edited.
