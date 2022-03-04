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

