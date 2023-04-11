## 2.46.3

2023-04-07

### 🆎 TypeScript

- Improve the definition of 'Input.Textarea' TS([#1899](https://github.com/arco-design/arco-design/pull/1899))

## 2.36.1

2022-07-01

### 🐛 BugFix

- Fix console React Warning (not recognize prop on a DOM element) caused by `Input` component.([#1070](https://github.com/arco-design/arco-design/pull/1070))

## 2.35.0

2022-06-10

### 🐛 BugFix

- Fixed the bug that the length of `Input.TextArea` component may exceed `maxLength` when inputting Chinese.([#988](https://github.com/arco-design/arco-design/pull/988))

## 2.32.1

2022-04-22

### 💎 Enhancement

- Optimize the cursor position when `focus` is called outside the `Input.Textarea` component.([#800](https://github.com/arco-design/arco-design/pull/800))

## 2.31.0

2022-03-25

### 💅 Style

- Fixed the bug that the clear button of `Input` could not be hidden in certain scenarios([#685](https://github.com/arco-design/arco-design/pull/685))

## 2.30.2

2022-03-18

### 🐛 BugFix

- Fixed display of clear button when `Input` set `allowClear` and `readOnly` at same time.([#640](https://github.com/arco-design/arco-design/pull/640))

## 2.29.2

2022-02-25

### 🐛 BugFix

- Fixed a bug where the same text could not be pasted again after the `Input` component pasted text and cleared it.([#584](https://github.com/arco-design/arco-design/pull/584))

## 2.29.0

2022-02-11

### 🐛 BugFix

- Fixed the bug that the `Input` component would trigger `onChange` twice in a row when entering Chinese in Firefox.([#522](https://github.com/arco-design/arco-design/pull/522))

## 2.28.1

2022-01-14

### 🐛 BugFix

- Fixed a `bug` in the `Input` component where clicking the clear icon edge area did not clear the text.([#438](https://github.com/arco-design/arco-design/pull/438))
- Fixed the problem that the size of `searchButton` was not adjusted under different sizes of `Input.Search`.([#438](https://github.com/arco-design/arco-design/pull/438))

## 2.28.0

2022-01-07

### 🐛 BugFix

- Fix the bug that the `onChange` is not triggered when the `Input` component enters Chinese and selects the auto-completion option directly.([#407](https://github.com/arco-design/arco-design/pull/407))

## 2.23.0

2021-09-27

### 🆕 Feature

- The `Input` component `maxLength` supports the `errorOnly` mode. When exceeding `maxLength`, user input will not be restricted, but error status will be displayed

## 2.18.0

2021-07-02

### ⚠️ Important attention

- `Input.Group`: Group -> InputGroup
- `Form.Item`: Item -> FormItem
- `Menu.Item`: Item -> MenuItem
- `Timeline.Item`: Item -> TimelineItem
- `Tree.Node`: Node -> TreeNode
- When you set both `allowClear` and `props.className`, the className will be incorrectly applied to the inner input tag. **Sorry this change may cause breaking changes, please pay attention**.



## 2.17.3

2021-06-24

### 🐛 Bugfix

- Fix the issue that `Input.Search` does not trigger `onPressEnter`.

## 2.16.0

2021-05-28

### 🐛 Bugfix

- Fix the problem that the `Input` style fails to compile in less 4.x.

## 2.15.3

2021-05-21

### 🐛 Bugfix

- Fix the bug that the `Input` tag rendered in the `footer` of the `Cascader` component cannot be focused.



## 2.15.2

2021-05-14

### 🐛 Bugfix

- Fix the bug that the search button on the right is not disabled when `Input.Search` is disabled.

## 2.13.2

2021-04-01

### 💅 Style

- Adjust the left and right padding styles of `Input` components of different sizes.
- Fix the problem that the height of the input box becomes 100% of the height of the parent element when the height of the parent element is set for the `Input` component and `allowClear` is set.



## 2.13.0

2021-03-26

### 🐛 Bugfix

- Fix the bug that the content in the input box cannot be selected by the mouse when the `Input` component uses `addBefore`.

## 2.9.1

2021-02-20

### 🐛 Bugfix

- When the `Input.Search` component is disabled, clicking the search icon still triggers the `onSearch` callback bug.



## 2.8.2

2021-01-29

### 💅 Style

- Fix the disabled style of `Input` not working in Safari.

## 2.8.1

2021-01-28

### 🐛 Bugfix

- Fixed the bug that the `Input` component introduced full icons, which caused the on-demand loading to fail.



## 2.8.0

2021-01-22

### 💅 Style

- Fix the issue that the split line style of the prefix and suffix of the `Input` component is lost.

