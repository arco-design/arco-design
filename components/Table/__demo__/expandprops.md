---
order: 4
title:
  zh-CN: 定制展开参数
  en-US: Expand props
---

## zh-CN

可以通过 `expandProps` 定制展开列的图标，宽度，标题，是否展开等。

**Tip:** 正常情况下，是否展开是由 `expandedRowRender` 返回值决定的，如果过多的 `expandedRowRender` 计算导致卡顿，建议使用 `expandProps.rowExpandable`。

## en-US

The icon, width, title, expandable etc. of the expanded column can be customized through `expandProps`.

**Tip:** whether to expandable or not is determined by the return value of `expandedRowRender`.
If too many `expandedRowRender` calculations block page render, it is recommended to use `expandProps.rowExpandable`.

```js
import { Table } from '@arco-design/web-react';
import { IconRight, IconDown } from '@arco-design/web-react/icon';
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

function App() {
  return (
    <Table
      columns={columns}
      data={data}
      expandedRowRender={(record) => record.email}
      expandProps={{
        icon: ({ expanded, record, ...restProps }) =>
          expanded ? (
            <button {...restProps}>
              <IconDown />
            </button>
          ) : (
            <button {...restProps}>
              <IconRight />
            </button>
          ),
        width: 60,
        columnTitle: 'Expand',
        rowExpandable: (record) => record.key !== '4',
      }}
    />
  );
}

export default App;
```
