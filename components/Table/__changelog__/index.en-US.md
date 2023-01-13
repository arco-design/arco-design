## 2.44.0

2023-01-13

### 💅 Style

- Fix `Table` component summary row style error when `fixed=top`.([#1719](https://github.com/arco-design/arco-design/pull/1719))

## 2.42.0

2022-11-25

### 🐛 BugFix

- Fix the bug of reporting an error when the data of the `Table` component is `number[]` or `string[]`.([#1611](https://github.com/arco-design/arco-design/pull/1611))
- Fixed a bug that when the `Table` component enabled virtual scrolling, dynamically changing the `scroll` would cause the fixed column highlight to lose its style.([#1600](https://github.com/arco-design/arco-design/pull/1600))

## 2.41.2

2022-11-11

### 💎 Enhancement

- Reduced unexpected rendering times of `Table` component `column.render`.([#1562](https://github.com/arco-design/arco-design/pull/1562))

## 2.41.0

2022-10-28

### 💅 Style

- Fixed `Table` component's style issue of collapsed column height when `scroll.x` is too small.([#1492](https://github.com/arco-design/arco-design/pull/1492))

## 2.40.2

2022-09-30

### 💅 Style

- Fixed the issue that when the `Table` component expands a row and nested a sub table, the cell transparent problem occurs when the subtable opens fixed column.([#1433](https://github.com/arco-design/arco-design/pull/1433))

## 2.40.1

2022-09-23

### 🐛 BugFix

- Fix the bug that when Table is turned off `checkStrictly`, passing in non-existing `selectedKeys` will  report an error([#1420](https://github.com/arco-design/arco-design/pull/1420))

## 2.39.2

2022-08-26

### 🐛 BugFix

- Fix the problem that after the `Table` component updates `data`, the `selectedRows` is not updated in time when the selectedRows is selected next time.([#1341](https://github.com/arco-design/arco-design/pull/1341))

## 2.39.0

2022-08-12

### 🐛 BugFix

- Fixed `Table` component not rendering correctly when data format is `[['1']], ['2']]`.([#1270](https://github.com/arco-design/arco-design/pull/1270))

## 2.38.0

2022-07-29

### 🐛 BugFix

- Fix the bug that the `onChange` callback of the paginator does not trigger after `Table` is passed to `pagination` alone([#1217](https://github.com/arco-design/arco-design/pull/1217))

## 2.37.2

2022-07-22

### 🐛 BugFix

- Fix the bug that the `onChange` callback parameter of the `Table` component is not updated in time([#1155](https://github.com/arco-design/arco-design/pull/1155))

## 2.37.0

2022-07-08

### 🐛 BugFix

- Fix the bug that ellipsis does not take effect when `Table` component set `column.sorter` and `column.ellipsis` at the same time.([#1108](https://github.com/arco-design/arco-design/pull/1108))
- Fix the style issue that the left border of `Table` component disappears when there is no data.([#1106](https://github.com/arco-design/arco-design/pull/1106))
- Fix the bug of error when `Table` component data is null.([#1104](https://github.com/arco-design/arco-design/pull/1104))

## 2.36.0

2022-06-24

### 🐛 BugFix

- Fixed the bug that the data and record outputted by the `Table` component contained internal data.([#1047](https://github.com/arco-design/arco-design/pull/1047))

## 2.35.1

2022-06-17

### 🐛 BugFix

- Fix the bug that `Table` component will change the original data when tree data.([#990](https://github.com/arco-design/arco-design/pull/990))

## 2.35.0

2022-06-10

### 🆕 Feature

- The `Table` component supports fixed columns when `virtualized` is enabled.([#971](https://github.com/arco-design/arco-design/pull/971))

## 2.33.1

2022-05-20

### 🐛 BugFix

- Fixed the bug that the table header cells also have border-radius when the `Table` component header is grouped.([#872](https://github.com/arco-design/arco-design/pull/872))

## 2.33.0

2022-05-13

### 🆕 Feature

- `Table` Add `rowSelection.checkStrictly` to support parent-child selection associations.([#849](https://github.com/arco-design/arco-design/pull/849))

## 2.32.2

2022-04-29

### 🐛 BugFix

- Fix the bug that the outer `ConfigProvider` of the `Table` component cannot take effect after setting `pagination`([#827](https://github.com/arco-design/arco-design/pull/827))

## 2.32.1

2022-04-22

### 🆎 TypeScript

- Modify the `TS` of the `Table` component `rowKey` to be `React.Key \| ((record: T) => React.Key)`. ([#799](https://github.com/arco-design/arco-design/pull/799))

## 2.31.1

2022-03-28

### 💅 Style

- Fix the problem that the checkbox column width is abnormal when the `Table` component enable `virtualized`.([#696](https://github.com/arco-design/arco-design/pull/696))

## 2.31.0

2022-03-25

### 🆕 Feature

- The `Table` component supports sorting tree data.([#678](https://github.com/arco-design/arco-design/pull/678))

## 2.30.2

2022-03-18

### 🐛 BugFix

- Fix the bug that `column.align` does not take effect when `virtualized` is enabled in `Table` component.([#650](https://github.com/arco-design/arco-design/pull/650))

### 💅 Style

- Fix `Table` component set `expandProps.width` is not work when less than 40.([#656](https://github.com/arco-design/arco-design/pull/656))

## 2.30.0

2022-03-04

### 🐛 BugFix

- `placeholder`   attributes take effect when `Table` data is an empty string or null([#609](https://github.com/arco-design/arco-design/pull/609))

## 2.29.0

2022-02-11

### 🐛 BugFix

- Fix the bug that `Table` component `onDropdownVisibleChange` does not trigger when the OK button is clicked.([#521](https://github.com/arco-design/arco-design/pull/521))

## 2.28.2

2022-01-21

### 💎 Optimization

- Optimize the `Table` component `expandedRowRender` to cause the problem of freezing.([#473](https://github.com/arco-design/arco-design/pull/473))
- Optimized `Table` performance problem when selecting all data is larger than 10000 after enabling `virtualized`.([#472](https://github.com/arco-design/arco-design/pull/472))

### 🐛 BugFix

- Fixed the bug that `Table` component `size` did not work on `Pagination`.([#475](https://github.com/arco-design/arco-design/pull/475))

## 2.28.1

2022-01-14

### 🐛 BugFix

- Pagination should not be displayed if the table has no data.([#435](https://github.com/arco-design/arco-design/pull/435))

### 💅 Style

- Fixed the style issue of the `Table` component when the size is `mini` when there is only one data.([#449](https://github.com/arco-design/arco-design/pull/449))

## 2.28.0

2022-01-07

### 🐛 BugFix

- Fix the bug that the className is incorrect when the `Table` component updates the `column.className` asynchronously.([#398](https://github.com/arco-design/arco-design/pull/398))

## 2.27.2

2021-12-31

### 🐛 BugFix

- Fix the bug that the filter of the `Table` component cannot be reset when the `filteredValue` is set to `undefined` in the controlled mode.([#382](https://github.com/arco-design/arco-design/pull/382))

## 2.27.0

2021-12-17

### 🆕 Feature

- `Table` add prop `expandProps.strictTreeData`.([#334](https://github.com/arco-design/arco-design/pull/334))

### 🐛 BugFix

- Fix the bug that `column.cellStyle` of the `Table` component works abnormally.([#332](https://github.com/arco-design/arco-design/pull/332))
- Fix the bug that the current page calculation error occurs when the amount of data in `Table` changes.([#329](https://github.com/arco-design/arco-design/pull/329))

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

