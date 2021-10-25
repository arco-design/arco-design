## 2.23.1

2021-10-15

### 🐛 BugFix

- Fix the bug that the `defaultCurrent`, `defaultPageSize`, and `sizeCanChange` in the `pagination` property of the `List` component not works.

## 2.20.0

2021-07-30

### 🆕 Feature

- Added the `listRef` property to the `List` component to get the component reference with API method, and added the `scrollIntoView` method to the reference.
- Added the `column` parameter to the `grid` property of the `List` component to allow quick definition of the number of lists displayed in each row under the grid.

### 💅 Style

- The `List` component fixes the style problem that the element content may overflow.



## 2.14.2

2021-04-23

### 🐛 Bugfix

- Fix the bug that the `pagination.onChange` property of the `List` component triggered twice in a single page turning.

## 2.13.0

2021-03-26

### 🆎 TypeScript

- `List.Item` supports passing in native HTML tag attributes.



## 2.11.1

2021-03-15

### 🆎 TypeScript

- Improve the parameter type of the `render` function of the `List` component to be automatically inferred based on the `dataSource`.



## 2.10.0 🏮

2020-02-26

### 🆎 TypeScript

- Optimize the ts definition of the `render` function of the `List` component.



## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- `List.Item` supports incoming HTML native attributes and supports built-in hover style.

## 2.8.2

2021-01-29

### 🐛 Bugfix

- Fix pagination not working in `List`.



### 💅 Style

- Fix the `noDataElement` of `List` is not vertically centered.



## 2.7.0

2021-01-15

### 🐛 Bugfix

- Fix the problem that the latest state of the parent component cannot be obtained inside the `onReachBottom` of the `List` component.

