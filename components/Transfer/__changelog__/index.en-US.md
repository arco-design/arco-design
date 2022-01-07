## 2.28.0

2022-01-07

### 🆕 Feature

- `Transfer` supports passing `InputProps` to `showSearch`.([#401](https://github.com/arco-design/arco-design/pull/401))

## 2.21.0

2021-08-20

### 🆕 Feature

- The `simple` property supports passing in the object `{ retainSelectedItems: true }` to retain the selected items in the left panel.

## 2.19.0

2021-07-16

### 🆕 Feature

- Added the `onItemRemove` callback to the `Transfer` component `CustomListProps`.
- The custom head rendering function `titleTexts` of the `Transfer` component adds the `checkbox` parameter.

## 2.18.0

2021-07-02

### 🆕 Feature

- The `Transfer` component `titleTexts` allows to pass in functions to customize the rendering of the title bar.

## 2.13.2

2021-04-01

### 🐛 Bugfix

- Fix the bug that when the `Transfer` component is combined with a paging table, the table will return to the first page every time an item is selected.

## 2.11.0

2021-03-12

### 🆕 Feature

- `Transfer` component `showFooter` supports passing in `ReactNode` custom node.

### 🐛 Bugfix

- Fix the bug that the key of `Transfer.Item` may be duplicated.

