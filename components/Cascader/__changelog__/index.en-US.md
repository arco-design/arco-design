## 2.32.0

2022-04-15

### 🐛 BugFix

- Fixed a bug where the selected option echoed the wrong value in the search panel when `checkedstrategy=parenet` in the `Cascader` component.([#763](https://github.com/arco-design/arco-design/pull/763))

## 2.31.2

2022-04-01

### 🐛 BugFix

- Fixed a bug where the options panel was not updated when the mouse moved from a path node to a leaf node in `expandTrigger=hover` of the `Cascader` component.([#727](https://github.com/arco-design/arco-design/pull/727))

## 2.31.0

2022-03-25

### 🆕 Feature

- The `Cascader` component supports setting the echo mode of data when multiple selections are set through the `checkedStrategy` property([#692](https://github.com/arco-design/arco-design/pull/692))

## 2.30.1

2022-03-11

### 🐛 BugFix

- Fix the problem that the label text corresponding to the default value of the component is lost when the Cascader component is directly input text for remote search.([#632](https://github.com/arco-design/arco-design/pull/632))

## 2.30.0

2022-03-04

### 🐛 BugFix

- Fixed the bug that the second parameter of `onChange` was not passed the information of the currently selected node when the `Cascader` component was single-selected for the first time.([#599](https://github.com/arco-design/arco-design/pull/599))

## 2.29.2

2022-02-25

### 🐛 BugFix

- Fixed a bug where the checked state of the `Cascader` component was occasionally inconsistent with the incoming `value` when it was controlled.([#587](https://github.com/arco-design/arco-design/pull/587))

## 2.29.1

2022-02-18

### 🐛 BugFix

- Fixed the issue that the selected state rendering error occurs when the `Cascader` component is multi-selected.([#544](https://github.com/arco-design/arco-design/pull/544))

## 2.29.0

2022-02-11

### 💎 Optimization

- Optimized the problem of stuck operation when selecting multiple selections under the big data of the `Cascader` component.([#523](https://github.com/arco-design/arco-design/pull/523))

### 🐛 BugFix

- Fix the bug of `Cascader` component `showSearch.retainInputValueWhileSelect` not taking effect([#524](https://github.com/arco-design/arco-design/pull/524))

## 2.26.2

2021-12-10

### 🐛 BugFix

- Fix the bug that `loadMore` is triggered by selecting the parent node when `Cascader` is multiple-selected and the `changeOnSelect` is true.([#309](https://github.com/arco-design/arco-design/pull/309))

## 2.25.1

2021-11-26

### 🐛 BugFix

- Fix the problem that the value of the `cascader` component in the controlled mode is not changed, and the selected state of the option is still changed.([#234](https://github.com/arco-design/arco-design/pull/234))

## 2.23.4

2021-10-26

### 🐛 BugFix

- Fix the problem that the popup layer will respond to keyboard events and pop up when the `Cascader` component is disabled.([#21](https://github.com/arco-design/arco-design/pull/21))

## 2.22.0

2021-09-10

### 💎 Optimization

- Optimizing the recently selected option of the `Cascader` component is displayed at the end of the input box.

### 🐛 BugFix

-  Fix the bug that the `Cascader` component cannot click to expand the next level option when the option `disableCheckbox=true` is set.

## 2.21.0

2021-08-20

### 🆕 Feature

- When the `Cascader` component supports multiple selections, the checkboxes of the options are individually disabled through the `disableCheckbox` property.

### 🐛 Bugfix

- Fix the bug that the node corresponding to the initial value of `Cascader` is not displayed as selected when it is dynamically loaded.

- Fix the bug that the Cascader component still select the option that disableCheckbox prop is true

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that the panel is not automatically collapsed when the leaf node is selected in the single selection of the `Cascader` component.
- Fix the bug that empty elements are not centered when `Cascader` sets `options={[]}` and customizes the panel width.

## 2.20.0

2021-07-30

### 🆕 Feature

- Added `onSearch` property to `Cascader` component for remote search.

## 2.17.0

2021-06-18

### 🆕 Feature

- Added the `level` parameter to the `dropdownColumnRender` of the `Cascader` component.



## 2.15.0

2021-04-30

### 🆕 Feature

- Added `dropdownRender` and `dropdownColumnRender` properties to the `Cascader` component to support custom drop-down box rendering.

### 🐛 Bugfix

- Fixed the bug that the `Cascader` component mistakenly cleared the value of the corresponding option that was passed in from outside.

## 2.13.3

2021-04-06

### 🐛 Bugfix

- Fix the bug of `Cascader` that when the user click the clear icon, and then enter something to search options, the component crash.



## 2.8.2

2021-01-29

### 🐛 Bugfix

- Fix `onVisibleChange` can not be triggered when the dropdown of `Cascader` is hidden.

## 2.7.0

2021-01-15

### 🆎 TypeScript

- Fix the TS definition of the `renderOption` method of the `Cascader` component, and export the component-related interfaces.


