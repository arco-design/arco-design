---
order: 16
title:
  zh-CN: 单元格合并
  en-US: Cell merge
---

## zh-CN

用于单元格合并，表头只能进行列合并。

## en-US

Used for cell merging, the header can only be column merged.

```js
import { Table } from '@arco-design/web-react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (col, item, index) => {
      const obj = {
        children: col,
        props: {},
      };

      if (index > 3) {
        obj.props.colSpan = 2;
      }

      return obj;
    },
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    render: (col, item, index) => {
      const obj = {
        children: col,
        props: {},
      };

      if (index > 3) {
        obj.props.colSpan = 0;
      }

      return obj;
    },
  },
  {
    title: 'Detail',
    dataIndex: 'address',
    colSpan: 2,
    render: (col, item, index) => {
      const obj = {
        children: col,
        props: {},
      };

      if (index === 0) {
        obj.props.rowSpan = 3;
      }

      if (index === 1 || index === 2) {
        obj.props.rowSpan = 0;
      }

      return obj;
    },
  },
  {
    title: 'Email',
    dataIndex: 'email',
    colSpan: 0,
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
  return <Table border borderCell hover columns={columns} data={data} />;
};

export default App;
```
