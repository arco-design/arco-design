## 2.56.2

2023-12-01

### 🐛 BugFix

- Fixed an issue where the `Tree` component onCheck callback parameter extra.checkedNodes failed to return information about all selected nodes in virtual scrolling scenarios.

## 2.56.0

2023-11-17

### 🐛 BugFix

- Fixed an issue where the connection line style was incorrect when the `size` of the `Tree` component was not `default`.([#2365](https://github.com/arco-design/arco-design/pull/2365))

## 2.55.2

2023-11-10

### 🐛 BugFix

- Fixed the bug where `Tree` would flicker when expanded or collapsed under react 18.([#2338](https://github.com/arco-design/arco-design/pull/2338))
- Fixed the bug that the expansion and collapse animation of `Tree` did not take effect when controlled.([#2338](https://github.com/arco-design/arco-design/pull/2338))

## 2.52.0

2023-08-18

### 💎 Enhancement

- Optimize the problem that the Tree component is stuck interactively under large data. (There will be a more significant improvement after manually enabling `__ArcoAdapterMode__ `, but after enabling it, the parameter whose callback parameter type is NodeInstance will become `FakeNodeInstance` type([#2158](https://github.com/arco-design/arco-design/pull/2158))

## 2.50.0

2023-06-30

### 🐛 BugFix

- Fix the bug of `scrollIntoView` method execution error caused by the boundary condition of `Tree` component.([#2057](https://github.com/arco-design/arco-design/pull/2057))

## 2.47.1

2023-04-21

### 🐛 BugFix

- Fix the bug that the parent node of the disabled node cannot be selected after the child node of the disabled node is selected when the echo mode of the `Tree` component is set to `child`.([#1938](https://github.com/arco-design/arco-design/pull/1938))
- Fix the bug that `Tree` component was updated wrongly when the child node of the disabled node was checked, and then unchecked, the checked state of the parent node of the disabled node was incorrectly updated.([#1938](https://github.com/arco-design/arco-design/pull/1938))

## 2.44.1

2023-02-03

### 💎 Enhancement

- Optimize the problem of unnecessary vertical scrollbars in certain cases when virtual scrolling is enabled for the `Tree` component([#1739](https://github.com/arco-design/arco-design/pull/1739))

## 2.30.0

2022-03-04

### 🆕 Feature

- `Tree` component's `allowDrop` callback parameter supports `dragNode`([#614](https://github.com/arco-design/arco-design/pull/614))

## 2.29.0

2022-02-11

### 🆕 Feature

- The `Tree` component supports expanding child nodes when a node is clicked via the `expandOnClick` property([#511](https://github.com/arco-design/arco-design/pull/511))

## 2.27.0

2021-12-17

### 🆕 Feature

- `Tree` supports `halfChecked` property([#331](https://github.com/arco-design/arco-design/pull/331))

## 2.25.1

2021-11-26

### 🐛 BugFix

- Fix the bug that the `Tree` component can no longer be collapsed when there is no child node after expansion.([#230](https://github.com/arco-design/arco-design/pull/230))

## 2.23.1

2021-10-15

### 🐛 BugFix

- Fix the bug that the last level node is covered when the `Tree` component is enabled for virtual scrolling and dragging is allowed.
- Fix the bug that other nodes cannot be dropped on the current node after `Tree.Node` is set to `draggable=false`.

## 2.23.0-beta.1

2021-09-26

### 🆕 Feature

- `Tree` supports to get default props from `ConfigProvider`

## 2.21.0

2021-08-20

### 🐛 Bugfix

- Fix the bug that the callback parameter of the `Icons` property of the `Tree` component is not the latest node state.

## 2.20.1

2021-08-06

### 🐛 Bugfix

- Fix the bug that `checkedStrategy="parent"` does not take effect when `fieldNames` is set in the `Tree` component.
- Fixed the bug that when the `Tree` component is out of control with `checkedKeys` and `checkedStrategy` is set to `parent` or `child`, the callback parameter of `onCheck` is still all `key` selected.

## 2.18.2

2021-07-09

### 🐛 Bugfix

- Fixed the bug that the `Tree` component did not scroll to the correct position when calling the `scrollIntoView` method when some nodes were collapsed.

## 2.18.0

2021-07-02

### 🐛 Bugfix

- Fix the bug that the component may report errors when the `Tree` component modifies both `treeData` and `expandedKeys` at the same time.
- Fixed the bug that the `Tree` component did not scroll to the correct position when calling the `scrollIntoView` method when some nodes were collapsed.

## 2.16.2

2021-06-06

### 🐛 Bugfix

- Fix the bug that the `Tree` component reports an error when there is no corresponding node in the passed `checkedKeys`.



## 2.16.1

2021-06-04

### 🐛 Bugfix

- Fix the bug that all child nodes cannot be recursively selected when the `Tree` component is selected by default.
- Fix the bug that when the `Tree` component sets the `fieldNames` property, expand and collapse the error.
- Fix the bug that the priority of the `icons` property of the `Tree.Node` component is lower than the `icons` property of the `Tree`.

## 2.16.0

2021-05-28

### 💎 Optimization

- The `Tree` component is refactored to optimize the stuttering phenomenon of node selection and expansion and collapse under big data.

### 🐛 Bugfix

- Fix the problem that the custom `switcherIcon` icon of the `Tree` component does not take effect on the leaf nodes.

## 2.13.0

2021-03-26

### 💅 Style

- Fix the problem that the hover style is displayed when the `Tree` component is dragged.

## 2.11.0

2021-03-12

### 🆕 Feature

- The `Tree` and `TreeSelect` components support the `fieldnames` attribute to specify the field names corresponding to the `treeData`.
- The `Tree` component supports `scrollIntoView` to pass the `key` of the node to scroll to the specified field.

### 💅 Style

- Fix the problem of the style of connecting lines displayed in the `Tree` component.

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- The `Tree` component supports the `icons` property transfer function.

### 🐛 Bugfix

- Fix the bug that the node does not execute the expansion logic when the `Tree` dynamically loads the data promise.reject.
- Fixed a bug that caused the second parameter of `selectNodes` in `onSelect` to appear `undefined` when the `Tree` component collapsed nodes.
- Fixed the bug that the height of the `Tree` component dynamically changes when virtual scrolling is turned on, and the content of the corresponding extra height will not be automatically updated.

## 2.7.0

2021-01-15

### 🆕 Feature

- Added `allowDrop` property to `Tree` component.



