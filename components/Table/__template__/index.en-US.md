---
file: interface
---

`````
Component / Data Display

# Table

Used for data collection, display, analysis, and processing.
`````

%%Content%%

## API

%%Props%%

### Hide Pagination

If you want to hide pagination when the number of pages is less than or equal to one page, you can configure `pagination.hideOnSinglePage = true`. If you want to configure it globally,
You can configure the `tablePagination.hideOnSinglePage = true` of the `ConfigProvider` component.

### onRow

`onRow`, `onHeaderRow`, `onCell`, `onHeaderCell` have the same usage.

```js
<Table
  onRow={(record, index) => {
    return {
      onClick: (event) => {}, // Click on the body row
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
  onHeaderRow={(column, index) => {
    return {
      onClick: (event) => {}, // Click on the head row
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
/>
```
