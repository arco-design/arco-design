---
order: 12
title:
  zh-CN: 自定义单元格内容
  en-US: Custom cell content
---

## zh-CN

通过 `columns` 中的 `render` 字段，可以自定义单元格的内容

## en-US

The content of the cell can be customized through the `render` field in `columns`.

```js
import { Table, Tag } from '@arco-design/web-react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    render: (col, record, index) => (
      <span>
        <span
          style={{
            color: '#FF7D00',
            fontWeight: 600,
          }}
        >
          $
        </span>
        {record.salary}
      </span>
    ),
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
  return <Table columns={columns} data={data} />;
};

export default App;
```
