## 2.66.13

2026-04-03

### 🐛 BugFix

- Fixed the issue where the "Today" shortcut button at the bottom remained clickable after disabling dates after today using the disabledDate prop in the `DatePicker` component.([#3159](https://github.com/arco-design/arco-design/pull/3159))

## 2.66.11

2026-03-06

### 🐛 BugFix

- The disableConfirm configuration in timepickerProps of the `DatePicker` component does not take effect.([#3134](https://github.com/arco-design/arco-design/pull/3134))

## 2.66.7

2025-10-31

### 🆕 Feature

- Add the fixedTime property to `RangePicker`([#3070](https://github.com/arco-design/arco-design/pull/3070))

## 2.66.0

2025-04-03

### 🐛 BugFix

- Fixed the issue that after the `DatePicker` component sets the timezone, if there is PST and PDT, there will be one hour more or less at the boundary point.([#2938](https://github.com/arco-design/arco-design/pull/2938))

## 2.65.0

2024-11-29

### 🐛 BugFix

- Fixed the bug that some nodes of the `DatePicker` component lacked `key`, causing the console `warning`([#2878](https://github.com/arco-design/arco-design/pull/2878))

## 2.64.0

2024-08-30

### 🆕 Feature

- `DatePicker` supports customizing the time format of the panel header by configuring `yearFormat` and `monthFormat` in the `locale` file.([#2795](https://github.com/arco-design/arco-design/pull/2795))

### 🐛 BugFix

- Fixed the problem that the popup layer position of the `DatePicker` component is not aligned with the selection box style([#2794](https://github.com/arco-design/arco-design/pull/2794))

## 2.63.2

2024-08-08

### 🐛 BugFix

- `DatePicker` displays the focus style when it gets focus through tab([#2738](https://github.com/arco-design/arco-design/pull/2738))
- Fixed a bug where `DatePicker` and `DatePicker.RangePicker` components missing refs, add `forwardRef` to expose refs.([#2734](https://github.com/arco-design/arco-design/pull/2734))

## 2.63.1

2024-07-02

### 🐛 BugFix

- DatePicker default placeholder remove "Please"([#2709](https://github.com/arco-design/arco-design/pull/2709))

## 2.60.0

2024-02-23

### 🆕 Feature

- The `DatePicker` component adds the `inputProps` parameter.([#2551](https://github.com/arco-design/arco-design/pull/2551))
- `DatePicker` supports `inputProps` property([#2519](https://github.com/arco-design/arco-design/pull/2519))
- `DatePicker.RangePicker` adds `inputProps`.([#2516](https://github.com/arco-design/arco-design/pull/2516))

## 2.55.0

2023-10-27

### 🆕 Feature

- The format parameter of the `DatePicker.RangePicker` component supports array.([#2327](https://github.com/arco-design/arco-design/pull/2327))

### 🐛 BugFix

- Fixed the bug that the Tab key switching focus of the `DatePicker.RangePicker` component was misaligned.([#2323](https://github.com/arco-design/arco-design/pull/2323))

## 2.54.2

2023-10-20

### 🐛 BugFix

- Fixed `DatePicker.RangePicker` setting `shortcuts={[]}` unexpectedly displayed 0.([#2302](https://github.com/arco-design/arco-design/pull/2302))

## 2.50.2

2023-07-21

### 💎 Enhancement

- Optimize the experience of `DatePicker` when jumping quickly in the panel.([#2094](https://github.com/arco-design/arco-design/pull/2094))

## 2.49.2

2023-06-16

### 🐛 BugFix

- Fix `showTime.defaultValue` of `DatePicker` component shows inaccurate bug after setting timezone.([#2036](https://github.com/arco-design/arco-design/pull/2036))

## 2.48.2

2023-05-26

### 🐛 BugFix

- Fix `DatePicker` component, after setting the timezone, the input time is not converted correctly.([#1992](https://github.com/arco-design/arco-design/pull/1992))

## 2.48.0

2023-05-12

### 🐛 BugFix

- Fix `DatePicker` component `disabledDate` in the shortcut selection panel, disabling the date should not be disabled.([#1961](https://github.com/arco-design/arco-design/pull/1961))

## 2.47.0

2023-04-14

### 🐛 BugFix

- Fix `DatePicker.RangePicker` when reopening, panel date changes but does not trigger `onPickerValueChange` bug.([#1920](https://github.com/arco-design/arco-design/pull/1920))
- Fix the bug that when the `DatePicker.RangePicker` component is opened and the `mode` is switched, the date will keep increasing.([#1919](https://github.com/arco-design/arco-design/pull/1919))

## 2.45.1

2023-03-01

### 💎 Enhancement

- `DatePicker` component no longer sorts the panel when selecting a date.([#1814](https://github.com/arco-design/arco-design/pull/1814))

## 2.43.0

2022-12-23

### 🆕 Feature

- `DatePicker` supports setting prefix by `prefix`.([#1668](https://github.com/arco-design/arco-design/pull/1668))

## 2.42.2

2022-12-09

### 🐛 BugFix

- Fix `DatePicker` week selector compatibility with moment.js.([#1631](https://github.com/arco-design/arco-design/pull/1631))

## 2.41.3

2022-11-18

### 🐛 BugFix

- Fix `DatePicker.Range` component when the panel is open, the panel date is incorrect bug when switching `mode`.([#1580](https://github.com/arco-design/arco-design/pull/1580))

## 2.39.3

2022-09-02

### 🐛 BugFix

- Fixed `DatePicker` component error in `de-DE` language.([#1358](https://github.com/arco-design/arco-design/pull/1358))

## 2.39.2

2022-08-26

### 🐛 BugFix

- Fix the bug that the `DatePicker.RangePicker` component dynamically modifies `disabled`, and the disabled date is not updated in time.([#1336](https://github.com/arco-design/arco-design/pull/1336))

## 2.39.1

2022-08-19

### 🐛 BugFix

- Fixed the bug that the `panelRender` of the `DatePicker.RangePicker` component did not work.([#1293](https://github.com/arco-design/arco-design/pull/1293))

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



