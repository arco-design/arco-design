## 2.26.2

2021-12-10

### 💅 Style

- Fix the problem that table cell will break line when `Table` component is tree data and `column.render` returns `div`.([#302](https://github.com/arco-design/arco-design/pull/302))

## 2.26.0

2021-12-03

### 💅 Style

- Fix the style problem that the checkbox column of the `Table` component is not aligned when the table header is fixed.([#261](https://github.com/arco-design/arco-design/pull/261))

## 2.25.0

2021-11-19

### 💅 Style

- Fix the style problem that the header of the `Table` component is misplaced when the scroll bar is always displayed after the `virtualized` is turned on.([#182](https://github.com/arco-design/arco-design/pull/182))

## 2.24.1

2021-11-12

### 💅 Style

- Fix the style problem that the cell align ='right' will overlap when the `Table` component has filter in the column.([#140](https://github.com/arco-design/arco-design/pull/140))

## 2.24.0

2021-11-05

### 💅 Style

- Fix the problem that the border line of the header is broken when `border={{ border: true, headerCell: true }}` when the `Table` component is grouped columns in the header.([#120](https://github.com/arco-design/arco-design/pull/120))

## 2.23.4

2021-10-26

### 🐛 BugFix

- Set the `type` of the expand button of the `Table` component to `button` to avoid clicking to trigger Form submit.([#23](https://github.com/arco-design/arco-design/pull/23))

## 2.23.2

2021-10-22

### 🐛 BugFix

- Fix the issue of unique key warning when using tree data in `Table` component.

## 2.23.1

2021-10-15

### 🐛 BugFix

- Fix the bug that the `rowSelection.renderCell` of the `Table` component does not take effect in single selection.

## 2.23.0

2021-09-27

### 💎 Optimization

- The sorting and filtering columns of the `Table` component can work without `dataIndex`.

### 🆕 Feature

- `Table` component add parameter `placeholder`. When the cell content is empty, a placeholder will be displayed with a lower priority than `column.placeholder`.

## 2.22.0

2021-09-10

### 🆕 Feature

- `Table` component add prop `rowSelection.onSelect`.
- `Table` component add prop `column.placeholder`.
- The fourth parameter of the `onChange` callback of the `Table` component adds the return of `currentData`.

### 🐛 BugFix

- Fix the problem that the status of the `Table` component is not updated in time when the reset button is clicked when the filter is controlled.

## 2.21.2

2021-08-30

### 🐛 BugFix

- Fix the problem that when the table header is fixed by the `Table` component, the dynamic modification of the `columns` under some boundary conditions will cause the table head and table body to scroll out of sync.

## 2.21.1

2021-08-27

### 🐛 BugFix

- Fix bug when update `Table` component's `columns.fixed`, does not update events. and fix bug that the scrolling events cannot be correctly linked when the custom header is set as a function component.

## 2.21.0

2021-08-20

### 🐛 Bugfix

- Fix the bug that the visual performance of the `Table` component is sorted under control.

### 💅 Style

- Fix the bottom border of the header is not displayed when the `Table` is set to `border={{ wrapper: true }}`.

## 2.20.0

2021-07-30

### 🐛 Bugfix

- Fix the bug that `preserveSelectedRowKeys` of `Table` component does not take effect when `pagination` is `false`.
- Fix the bug that the return value of `onExpandedRowsChange` of `Table` component uses internal uncontrolled `keys` when `expandedRowKeys` is controlled.
- Fix the bug that the `defaultFilters` of the `Table` component is not reflected in the `filterDropdown`.

## 2.19.3

2021-07-23

### 💅 Style

- The editable cell style of the `Table` component is optimized, and the problem of wrong rows when combined with tree data is fixed.

## 2.19.0

2021-07-16

### 🆕 Feature

- Added `showSorterTooltip` to the `Table` component, and fixed the style problem of the sort arrow being covered by the background color.
- The `Table` component adds `expandProps.expandRowByClick`, which supports click row expansion.
- The `onChange` parameter of the `Table` component adds a fourth parameter `extra`, and the current trigger action can be obtained through `extra.action`.
- Added `rowSelection.renderCell` to the `Table` component, which supports custom checkboxes.
- The `Table` component adds `rowSelection.preserveSelectedRowKeys`, which supports retaining the `key` value in `selectedRowKeys` after the data item is deleted.

## 2.18.2

2021-07-09

### 🐛 Bugfix

- When the `Table` component dynamically changes `columns`, there are multiple first column bugs when judging whether the tree data is the first column.



### 💅 Style

- Fix the problem that the scrollbar disappears with less data when there is a scrollbar in the table body of the `Table` component, and the style problem of the head scrollbar still exists.



## 2.18.1

2021-07-04

### 🐛 Bugfix

- Fix the bug that the fixed column logic is not processed when the `Table` component dynamically sets `columns`.
- Fix the problem that the style of the `Table` component is not correct when the virtual scrolling is turned on and `scroll.x` is set.



## 2.18.0

2021-07-02

### 🐛 Bugfix

- Fixed a bug where empty data displayed problematic after enabling virtual scrolling in the `Table` component.
- Fix a bug that caused an error after the `Table` component `rowSelection` was switched to `undefined`.
- Fix the bug that the `Table` component does not filter the values ​​that do not exist in `selectedRowKeys` after `data` is changed.

## 2.17.3

2021-06-24

### 🐛 Bugfix

- Fix the bug that the pop-up cannot be displayed when the pre-operation column of the `Table` component is wrapped with `Tooltip`.
- Fix the bug that the `column.width` of the `Table` component is not valid for `string`.



### 🆎 TypeScript

- `Table` component `column.children` type modification, fix the problem that the nested type cannot be deduced when the table header is grouped.
- `Table` component `column.filters` type correction, fix the problem that the type cannot be deduced.



## 2.17.1

2021-06-20

### 🐛 Bugfix

- Fixed the problem that virtual scrolling of the `Table` component does not work when X-axis scrolling is set at the same time.



## 2.17.0

2021-06-18

### 🆕 Feature

- The new function summary column of the `Table` component.
- `Table` component custom pre-operation column `components.body.operations` node supports the incoming function, which will receive the `record` parameter.

### 🐛 Bugfix

- Fix the bug that when the expand button is clicked in the `Table` component, it will bubble to `onRow.onClick`.
- Fix the bug of the `Table` component that sorting and filtering do not take effect when setting `pagination=false`
- Fix the error when selecting a value that does not exist in the data that exists in the `rowSelection.selectedRowKeys` of the `Table` component.



## 2.16.0

2021-05-28

### 🆕 Feature

- The `Table` supports `expandProps.rowExpandable` property to control whether the row should be expanded.



## 2.15.3

2021-05-21

### 🐛 Bugfix

- Add `string` type to `scroll` in `propTypes` of `Table` component to avoid warning.
- Fix the bug that the `Table` component clears the selected item but does not trigger the `rowSelection.onChange` callback when turning the page.

## 2.15.1

2021-05-06

### 💅 Style

- Fix bug the `size` property setting of the `Table` component does not take effect.


## 2.15.0

2021-04-30

### 💎 Optimization

- The `Table` component optimizes the selection logic and solves the possible problems of unsynchronized keys and rows.


### 🆕 Feature

- The `rowSelection.pureKeys` parameter is added to the `Table` component to optimize the big data selection experience.

### 🐛 Bugfix

- Fix the bug that the `pagination.defaultPageSize` of the `Table` component does not take effect.
- Fix the bug of Dom Warning when passing custom parameters in `onCell` of `Table` component.

### 💅 Style

- Fix the problem that the width of the selected box is incorrect after the `Table` component turns on virtual scrolling and the box is selected.

### 🆎 TypeScript

- Correct the definition of `expandedRowKeys` of `Table` component.



## 2.14.2

2021-04-23

### 💅 Style

- Fix the style problem that the custom `border-radius` of the header of the `Table` component is too large and the internal elements will exceed the style.



## 2.14.1

2021-04-16

### 💎 Optimization

- The `Table` component automatically scrolls to the top of the table when turning pages.



## 2.14.0

2021-04-09

### 🐛 Bugfix

- Fix the bug that the total number of columns is calculated incorrectly when the data is empty after setting the `operations` in the `Table` component.

## 2.13.0

2021-03-26

### 💅 Style

- Fix the style problem that the checkbox column is not centered when the virtual scrolling is enabled for the `Table` component.

## 2.11.0

2021-03-12

### 🆕 Feature

- The `Table` component supports `renderPagination` to customize the pagination section.

## 2.10.2

2021-03-09

### 🐛 Bugfix

- Fix the problem that the `bodyCellStyle` of the `Table` component would overwrite the fixed column style.



## 2.10.0 🏮

2020-02-26

### 💅 Style

- Fix the style problem of the pager margins when the `Table` component has only one page to hide the pager.

## 2.9.0 🔥

2021-02-05

### 🆕 Feature

- Optimize the calculation logic of the fixed column class name of the `Table` component to avoid the obvious problem of scrolling when the data volume is large.



### 🐛 Bugfix

- Fixed the bug that empty cells would still be rendered when the `Table` component `expandedRowRender` returns `null`.

## 2.8.1

2021-01-28

### 💅 Style

- Fix the problem of the bottom border style when the `Table` component has no data.



## 2.8.0

2021-01-22

### 🐛 Bugfix

- Fix the bug that the `index` in the `expandedRowRender` callback of the `Table` component starts from -1 instead of 0.

### 💅 Style

- `Table` filter style update.

## 2.7.1

2021-01-18

### 🐛 Bugfix

- The rounded corners of the `Table` component are set to the `header` to fix the scroll freeze problem caused by the chrome engine in some scenes.
- Fix the bug that the `onChange` callback of the `Table` component's `onChange` callback is before the `onSelectAll`, which causes the `onSelectAll` to be overridden under control.



### 💅 Style

- Fix the style problem that the loading icon of the `Table` component overlaps with the description text.

## 2.7.0

2021-01-15

### 🐛 Bugfix

- Fix the problem that the custom parameters in the `onCell` of the `Table` component cannot be accepted in the custom `Cell` component.

### 💅 Style

- Remove the bottom border when the `Table` component has no data.

