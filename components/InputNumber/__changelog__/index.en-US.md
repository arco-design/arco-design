## 2.37.1

2022-07-14

### 🐛 BugFix

- Fixed the bug that when the `InputNumber` component is `readOnly=true`, clicking the up and down keys can still change the value.([#1141](https://github.com/arco-design/arco-design/pull/1141))

## 2.36.0

2022-06-24

### 🐛 BugFix

- Fixed a bug where `InputNumber` was affected by the global configuration of `Input`.([#1042](https://github.com/arco-design/arco-design/pull/1042))

## 2.33.0

2022-05-13

### 💎 Enhancement

- The `InputNumber` component always displays numbers in non-scientific notation.([#865](https://github.com/arco-design/arco-design/pull/865))

## 2.32.1

2022-04-22

### 💎 Enhancement

- `InputNumber` uses `Math.round` instead of `Number.prototype.toFixed` to calculate the number after the decimal point, to avoid the critical situation that may occur when the final number is 5.([#796](https://github.com/arco-design/arco-design/pull/796))

## 2.29.2

2022-02-25

### 🐛 BugFix

- Fix the bug in `InputNumber` where decimal point is handled incorrectly([#568](https://github.com/arco-design/arco-design/pull/568))

## 2.29.1

2022-02-18

### 🐛 BugFix

- `InputNumber`  Omit the unnecessary `allowClear`([#549](https://github.com/arco-design/arco-design/pull/549))

## 2.28.1

2022-01-14

### 💅 Style

- Fix the problem that the button color is wrong when `InputNumber` is clicked([#443](https://github.com/arco-design/arco-design/pull/443))

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
