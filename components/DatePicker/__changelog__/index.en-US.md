## 2.39.0

2022-08-12

### 🐛 BugFix

- Fix the problem that the `DatePicker.RangePicker` component is wrong to judge whether it is out of range in a critical situation.([#1273](https://github.com/arco-design/arco-design/pull/1273))

## 2.38.1

2022-08-05

### 🐛 BugFix

- Fix the bug of inconsistent week display between `DatePicker.WeekPicker` input box and panel.([#1238](https://github.com/arco-design/arco-design/pull/1238))

## 2.38.0

2022-07-29

### 🐛 BugFix

- Fix `DatePicker.RangePicker` can't change mode from month to year.([#1188](https://github.com/arco-design/arco-design/pull/1188))

## 2.36.0

2022-06-24

### 🐛 BugFix

- Fixed a bug where the selection range of the `DatePicker` component was invalid in rare cases.([#1041](https://github.com/arco-design/arco-design/pull/1041))

## 2.35.0

2022-06-10

### 💎 Enhancement

- The default value of the `dayStartOfWeek` of the `DatePicker` component is determined by the locale set, no longer default to `0`.([#982](https://github.com/arco-design/arco-design/pull/982))

## 2.34.0

2022-05-27

### 🆕 Feature

- Added `panelRender` parameter to the `DatePicker` component.([#914](https://github.com/arco-design/arco-design/pull/914))

## 2.32.2

2022-04-29

### 🐛 BugFix

- Fixed a bug where the `DatePicker` component passed a `showTime` object that did not contain a `defaultValue`, causing the time panel to report an error.([#811](https://github.com/arco-design/arco-design/pull/811))

## 2.32.0

2022-04-15

### 🐛 BugFix

- Fixed the bug where `utcOffset` and `timezone` of `DatePicker.RangePicker` component did not work.([#765](https://github.com/arco-design/arco-design/pull/765))

## 2.31.3

2022-04-11

### 🐛 BugFix

- Fixed ts type of `disabledDate` for `DatePicker` component.([#750](https://github.com/arco-design/arco-design/pull/750))
- Fixed the bug that the `DatePicker.RangePicker` component would report an error when selecting the time directly.([#749](https://github.com/arco-design/arco-design/pull/749))

## 2.31.0

2022-03-25

### 🐛 BugFix

- Fixed the `disabledDate` of the `DatePicker` component being incorrect at the border of the quick selection panel.([#687](https://github.com/arco-design/arco-design/pull/687))

## 2.30.2

2022-03-18

### 🐛 BugFix

- Fixed the issue that the `separator` parameter of the `DatePicker` component did not take effect.([#647](https://github.com/arco-design/arco-design/pull/647))

## 2.30.1

2022-03-11

### 💎 Performance

- The `DatePicker` component no longer jumps the panel when picking a date.([#627](https://github.com/arco-design/arco-design/pull/627))

## 2.30.0

2022-03-04

### 🆕 Feature

- The `DatePicker` component supports `utcOffset` and `timezone` to set the UTC time and timezone.([#604](https://github.com/arco-design/arco-design/pull/604))

## 2.28.1

2022-01-14

### 🐛 BugFix

- Fixed a bug where the `disabledDate` of the `DatePicker` component was inaccurate in the parent panel.([#447](https://github.com/arco-design/arco-design/pull/447))

## 2.26.2

2021-12-10

### 💎 Optimization

- `DatePicker.RangePicker` component selected interactive optimization.([#312](https://github.com/arco-design/arco-design/pull/312))

### 🐛 BugFix

- Fix the bug that the `DatePicker` component does not trigger `onVisibleChange` in the controlled mode.([#314](https://github.com/arco-design/arco-design/pull/314))

## 2.25.1

2021-11-26

### 💎 Optimization

- The `DatePicker.RangePicker` component `showTime.defaultValue` supports passing in `number[], string[], Date[]` to avoid errors caused by inconsistent dayjs instances.([#226](https://github.com/arco-design/arco-design/pull/226))

## 2.24.0

2021-11-05

### 💎 Optimization

- If the value of the `DatePicker` component is `string` and it's dayjs value parsed as Invalid Date, will fallback format to "YYYY-MM-DD"([#113](https://github.com/arco-design/arco-design/pull/113))

## 2.23.1

2021-10-15

### 🐛 BugFix

- Fix the bug that the `DatePicker` component `disabledDate` does not take effect in the shortcut panel.

## 2.23.0

2021-09-27

### 🆕 Feature

- `DatePicker.RangePicker` add property `clearRangeOnReselect`.
- The `DatePicker.RangePicker` component `onSelect` adds a third parameter `extra`.

### 🐛 BugFix

- Fix the bug that the panel is not updated in the first time when the `DatePicker.RangePicker` component updates mode.
- Fix the bug that `DatePicker.WeekPicker` does not initialize the local timezone and the start of the week.

## 2.22.0

2021-09-10

### 🐛 BugFix

- Fix the bug that hover will report an error when the dayjs object passed in when using shortcuts in the `DatePicker` component is inconsistent with the internal version.
- Fix the bug that events on the outer dom cannot be triggered when the `DatePicker` component uses `dateRender`.
- Fix the bug that when the `DatePicker.RangePicker` component only uses the panel and has a default value, the first click to select requires one more point.

### 🆎 TypeScript

- `DatePicker.RangePicker` component `onOk` type correction.

## 2.21.1

2021-08-27

### 🐛 BugFix

- Fix bug that asynchronous setting of `value` does not take effect when the `DatePicker` component has a value.

## 2.21.0

2021-08-20

### 🆕 Feature

- `DatePicker` new interaction, add the highlight display of the next range, and put the operation of switching to time panel on the button

### 🐛 Bugfix

- Fix the bug that the week number of the `WeekPicker` component is not displayed correctly.

### 🆎 TypeScript

- Correction of `pickerValue` type of `DatePicker.RangePicker`.

## 2.20.1

2021-08-06

### 💅 Style

- Fix the issue that the style of the `DatePicker` component today will also appear on the gray date.



## 2.20.0

2021-07-30

### 🆕 Feature

- The `icons` parameter is added to the `DatePicker` component to support custom icons.
- The `DatePicker` component adds the `hideNotInViewDates` property to hide the gray date.
- The `dayStartOfWeek` property of the `DatePicker` component supports setting from Monday to Sunday.

## 2.19.3

2021-07-23

### 🐛 Bugfix

- Fix the bug that the input of the `DatePicker.RangePicker` component has a problem after setting `showTime`.

## 2.17.1

2021-06-20

### 🐛 Bugfix

- Fix the bug that the `DatePicker` component may report an error when judging the date change.

## 2.17.0

2021-06-18

### 💎 Optimization

- `DatePicker` group price interaction optimization, and fix the problem that when reselecting time in `showTime`, the selected value will be overwritten with the default value.



## 2.16.1

2021-06-04

### 💎 Optimization

- Optimize the problem of repeated selection of the date in the `DatePicker.RangePicker` component.



### 🐛 Bugfix

- Fix the bug that when the `DatePicker` component `showTime`, select a value and hover the shortcut selection and then leave, the value will be restored to the initial value.

## 2.16.0

2021-05-28

### 💎 Optimization

- Support fast time jump, click on the panel header to select the year and month arbitrarily.
- The date picker with time interactively returns to 1.0, and at the same time optimizes the disabled logic and performance.
- After the range selector disables a single time, the date selection and time selection of the corresponding panel will be automatically disabled on the panel.
- The left and right panels of the range selector are linked to avoid unexpected panel display.



## 2.15.3

2021-05-21

### 🐛 Bugfix

- Fix the bug that the time is incorrect after clicking the button at the moment after opening `showTime` in `DatePicker`.

## 2.15.0

2021-04-30

### 🐛 Bugfix

- Fix the bug that the `onSelect` callback of the `DatePicker` component is sorted before the selection is complete.
- Fixed the bug that when `DatePicker.RangePicker` was disabled halfway, clicking the confirm button still needed to choose another time.

### 💅 Style

- Fixed the problem that when `DatePicker` and `TimePicker` components are disabled and have default values, the default values ​​are not displayed in Safari browser.



## 2.14.1

2021-04-16

### 🐛 Bugfix

- Fix the bug that the display is incorrect when the component switches the panel after entering the value after opening the `showTime` of the `DatePicker.RangePicker` component.

## 2.10.0 🏮

2020-02-26

### 🆎 TypeScript

- `DatePicker.WeekPicker` adds `dayStartOfWeek` type.

## 2.9.1

2021-02-20

### 💅 Style

- Fix the problem that the background color of the error state of the `DatePicker` and `Select` components is incorrect in dark mode.

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- `DatePicker` component supports setting `triggerElement` custom trigger element.
- When the `DatePicker` component sets `triggerElement=null`, it will directly display the panel.

### 🐛 Bugfix

- Fix the bug that the `DatePicker.RangePicker` component cannot be confirmed directly on the same day.

## 2.8.0

2021-01-22

### 🆕 Feature

- The `format` parameter of the `DatePicker` component supports incoming functions to customize the display content.

### 🐛 Bugfix

- Fix the bug that `onChange` does not trigger occasionally when clicking the today button in the controlled mode of the `DatePicker` component.



