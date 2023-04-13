---
order: 14
title:
  zh-CN: 自定义样式
  en-US: Customize style
---

## zh-CN

有多种方式定制行列样式，`rowClassName` 可以对每一行进行样式定制，`Column.className` 可以对列进行样式定制。此外，还有 `headerCellStyle`, `bodyCellStyle`， 对表头和表格主体的列进行样式定制。

## en-US

There are many ways to customize the row and column styles. `rowClassName` can customize the style of each row, and `Column.className` can customize the style of columns. In addition, there are `headerCellStyle` and `bodyCellStyle` to customize the styles of the columns of the table header and table body.

```js
import { Table } from '@arco-design/web-react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    headerCellStyle: {
      backgroundColor: 'var(--color-bg-2)',
    },
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    headerCellStyle: {
      backgroundColor: 'var(--color-bg-2)',
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    headerCellStyle: {
      backgroundColor: 'var(--color-bg-2)',
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    headerCellStyle: {
      backgroundColor: 'var(--color-bg-2)',
    },
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
      border={{
        wrapper: true,
        headerCell: true,
      }}
    />
  );
};

export default App;
```
