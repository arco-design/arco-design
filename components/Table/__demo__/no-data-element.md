---
order: 24
title:
  zh-CN: 自定义空状态
  en-US: No Data Element
---

## zh-CN

当表格无数据时，默认会展示一个居中的提示信息。你可以通过 `noDataElement` 属性来自定义无数据时的展示内容。

## en-US

When the table has no data, a centered prompt message will be displayed by default. You can customize the display content when there is no data by using the `noDataElement` property.

```tsx
import React from 'react';
import { Table, TableColumnProps } from "@arco-design/web-react";

const columns: TableColumnProps[] = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Salary",
    dataIndex: "salary",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
const data = [];

const App = () => {
  return <Table columns={columns} data={data} noDataElement={<div>No data available</div>} />;
};

export default App;
```
