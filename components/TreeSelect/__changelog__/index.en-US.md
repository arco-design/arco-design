## 2.54.0

2023-10-09

### 🆕 Feature

- The `TreeSelect` component supports setting width adaptation through the `autoWidth` property.([#2274](https://github.com/arco-design/arco-design/pull/2274))

## 2.53.1

2023-09-15

### 💎 Enhancement

- Optimize the performance of `TreeSelect` under big data([#2236](https://github.com/arco-design/arco-design/pull/2236) )

## 2.53.0

2023-09-08

### 🐛 BugFix

- Fixed the bug that the `renderFormat` re-rendering was not triggered when the `TreeData` of the `TreeSelect` component was changed.([#2219](https://github.com/arco-design/arco-design/pull/2219) )

## 2.46.0

2023-03-17

### 🆕 Feature

- The `TreeSelect` component supports customizing the backfill display of selected nodes through `renderFormat`([#1847](https://github.com/arco-design/arco-design/pull/1847))

### 🐛 BugFix

- Fix the bug that clicking the close icon does not take effect when the `TreeSelect` component is set to `treeCheckedStrategy=all`.([#1849](https://github.com/arco-design/arco-design/pull/1849))

## 2.44.2

2023-02-10

### 🐛 BugFix

- Fix the bug that `onVisibleChange` is not triggered after the selected node triggers the drop-down panel to collapse in `TreeSelect` single-selection mode.([#1763](https://github.com/arco-design/arco-design/pull/1763))

## 2.41.0

2022-10-28

### 💎 Enhancement

- Reduce the number of times the `TreeSelect` component re-renders when `retainInputValueWhileSelect` is enabled([#1517](https://github.com/arco-design/arco-design/pull/1517))

### 🆕 Feature

- The `TreeSelect` component supports setting the front tag through the `addBefore` property([#1464](https://github.com/arco-design/arco-design/pull/1464))

### 🐛 BugFix

- Fixed the bug that the same value could not be entered again after `TreeSelect` was controlled to empty `inputValue`([#1463](https://github.com/arco-design/arco-design/pull/1463))

## 2.40.0

2022-09-16

### 🆕 Feature

- The `TreeSelect` component supports listening to the `onKeyDown` callback.([#1360](https://github.com/arco-design/arco-design/pull/1360))

## 2.39.0

2022-08-12

### 🆕 Feature

- `TreeSelect` add properties `inputValue` and `onInputValueChange`.([#1151](https://github.com/arco-design/arco-design/pull/1151))

## 2.38.0

2022-07-29

### 🐛 BugFix

- Fixed a bug where the label of the selected item was not displayed properly when the `TreeSelect` component enabled multiple checkbox selection and remote search in controlled mode.([#1207](https://github.com/arco-design/arco-design/pull/1207))

## 2.37.0

2022-07-08

### 🆕 Feature

- The `TreeSelect` component supports customizing the `maxTag` content display through the `maxTagCount` property of the object type([#1112](https://github.com/arco-design/arco-design/pull/1112))

## 2.36.0

2022-06-24

### 🐛 BugFix

- fix `dragToSort` not works on `TreeSelect`([#1029](https://github.com/arco-design/arco-design/pull/1029))

## 2.31.0

2022-03-25

### 🆕 Feature

- `TreeSelect` component's `triggerElement` property allows passing in a function to customize the component trigger node.([#686](https://github.com/arco-design/arco-design/pull/686))

## 2.30.0

2022-03-04

### 🐛 BugFix

- Fixed the problem that the input box of the `TreeSelect` component in the extension drop-down menu could not be focused.([#608](https://github.com/arco-design/arco-design/pull/608))

## 2.29.0

2022-02-11

### 🆕 Feature

- Added node information parameter to `onChange` function of `TreeSelect`([#526](https://github.com/arco-design/arco-design/pull/526))

## 2.23.5

2021-10-29

### 🐛 BugFix

- Fix the bug that the search node of the `TreeSelect` component is not displayed correctly.([#74](https://github.com/arco-design/arco-design/pull/74))

## 2.22.0

2021-09-10

### 🛠 Chore

- The `treeSelect.tsx` under the `TreeSelect` component folder has been renamed to `tree-select.tsx`. Please note that it is referenced by the file path. In addition, we do not recommend to use it directly through the file path.If you pass the path, Because we cannot guarantee that the file name in the component will never change, try to only use the `index.tsx` entry file.

### 💎 Optimization

- After the drop-down list appears, `TreeSelect` will automatically scroll to the first selected node

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that the `TreeSelect` component setting `showSearch={retainInputValueWhileSelect: false}` does not take effect.

## 2.20.0

2021-07-30

### 🐛 Bugfix

- Fix the bug that other input boxes on the page cannot be focused when the `popupVisible` of the `TreeSelect` component is `true`.

## 2.18.2

2021-07-09

### 🐛 Bugfix

- Fix the bug that the local search result of the `TreeSelect` component is incorrect.

## 2.14.1

2021-04-16

### 🐛 Bugfix

- Fix the bug that the `onChange` of `TreeSelect` cannot access the latest external variables.

