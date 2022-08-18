---
order: 3
title:
  zh-CN: 展开行
  en-US: Expandable row
---

## zh-CN

当内容过长，可以通过`expandedRowRender`设置展开行。如果返回值是 `null`，不会渲染展开按钮。

## en-US

When the content is too long, you can set the expanded row by `expandedRowRender`. If the return value is `null`, the expand button will not be rendered.

```js
import { Table } from '@arco-design/web-react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
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
      expandedRowRender={(record) => {
        return `This is No.${record.key} description.`;
      }}
      onExpand={(detail, expanded) => {
        console.log(detail, expanded);
      }}
      onExpandedRowsChange={(expandedRows) => {
        console.log(expandedRows);
      }}
      expandProps={{
        expandRowByClick: true,
        rowExpandable: (record) => record.key !== '4',
      }}
    />
  );
};

export default App;
```
