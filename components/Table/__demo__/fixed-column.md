---
order: 13
title:
  zh-CN: 固定列
  en-US: Fixed columns
---

## zh-CN

在 `column` 中指定 `fixed: "left"` 或 `fixed: "right"`，可将列固定到左侧或右侧，设置 `fixed` 的列，也需要设置 `width`。
**注意：** 要配合 `scroll={{ x: number }}` 使用，`columns` 中需要有一列不设置宽度，自适应，不然会有样式问题。

## en-US

Specify `fixed: "left"` or `fixed: "right"` in `column` to fix the column to the left or right. To set the column of `fixed`, you also need to set `width`.
**Note:** To be used with `scroll={{ x: number }}`, there needs to be a column in `columns` that does not set the width and is adaptive, otherwise there will be style problems.

```js
import { Table } from '@arco-design/web-react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    width: 140,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Other',
    dataIndex: 'other',
    render: () => 'Other',
  },
  {
    title: 'Other 1',
    dataIndex: 'other1',
    render: () => 'Other 1',
  },
  {
    title: 'Other 2',
    dataIndex: 'other2',
    render: () => 'Other 2',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    fixed: 'right',
    width: 120,
  },
];
const data = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];

const App = () => {
  return (
    <Table
      columns={columns}
      data={data}
      expandedRowRender={(record) => `${record.name}'s address is ${record.address}`}
      rowSelection={{}}
      scroll={{
        x: 1600,
        y: 400,
      }}
    />
  );
};

export default App;
```
