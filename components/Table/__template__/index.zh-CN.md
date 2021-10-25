---
file: interface
---

`````
组件 / 数据展示

# 表格 Table

用于数据收集展示、分析整理、操作处理。
`````

%%Content%%

## API

%%Props%%

### 隐藏分页

如果想在页数小于或等于一页时隐藏分页，可以配置 `pagination.hideOnSinglePage = true`，如果想全局配置，
可以配置 `ConfigProvider` 组件的 `tablePagination.hideOnSinglePage = true`。

### onRow 用法

`onRow`, `onHeaderRow`, `onCell`, `onHeaderCell` 用法一致。

```js
<Table
  onRow={(record, index) => {
    return {
      onClick: (event) => {}, // 点击表身行
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
  onHeaderRow={(column, index) => {
    return {
      onClick: (event) => {}, // 点击表头行
      onDoubleClick: (event) => {},
      onContextMenu: (event) => {},
      onMouseEnter: (event) => {},
      onMouseLeave: (event) => {},
    };
  }}
/>
```
