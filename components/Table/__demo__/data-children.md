---
order: 6
title:
  zh-CN: 树形数据展示
  en-US: Tree Data
---

## zh-CN

树形数据展示的例子，`data` 里有 `children` 字段, 或者通过 `childrenColumnName` 设置成自定义字段。

## en-US

There is a `children` field in `data`, or set as a custom field by `childrenColumnName` to display tree data.

```js
import { useState } from 'react';
import { Table, Switch, Space } from '@arco-design/web-react';
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
    children: [
      {
        key: '1-1',
        name: 'Christina',
        address: '332 Park Road, London',
        email: 'christina@example.com',
      },
    ],
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
    children: [
      {
        key: '2-1',
        name: 'Ed Hellen',
        salary: 17000,
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com',
        children: [
          {
            key: '2-1-1',
            name: 'Eric Miller',
            salary: 23000,
            address: '67 Park Road, London',
            email: 'eric.miller@example.com',
          },
          {
            key: '2-1-2',
            name: 'Tom Jerry',
            salary: 666,
            address: '67 Park Road, London',
            email: 'tom.jerry@example.com',
          },
        ],
      },
      {
        key: '2-2',
        name: 'William Smith',
        salary: 27000,
        address: '62 Park Road, London',
        email: 'william.smith@example.com',
      },
      {
        key: '2-3',
        name: 'George Bush',
        salary: 24000,
        address: '62 Park Road, London',
        email: 'george.bush@example.com',
      },
    ],
  },
  {
    key: '7',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
];

function App() {
  const [checkStrictly, setCheckStrictly] = useState(true);
  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        checkStrictly:
        <Switch onChange={(checked) => setCheckStrictly(checked)} checked={checkStrictly} />
      </Space>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows);
          },
          checkStrictly,
        }}
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default App;
```
