---
order: 8
title:
  zh-CN: 排序和筛选
  en-US: Sort and filter
---

## zh-CN

配置 `Column` 的 `sorter`，可以对表格进行排序。
配置 `Column` 的 `filters`，可以对表格进行筛选。
`sorter` 为一个排序函数，当然，你也可以指定 `sorter` 为 `true`，这样你可以通过 `Table` 的 `onChange` 事件进行自定义排序。
`filters` 为一个数组，包含着要筛选的信息，需要配合 `onFilter` 使用。当然也可以配合 `Table` 的 `onChange` 事件进行自定义筛选或者服务端筛选。

**默认排序和筛选**：通过指定 `defaultFilters` 和 `defaultSortOrder` 可以指定默认的排序和筛选。

## en-US

Configure the `sorter` of `Column` to sort the table.
Configure the `filters` of `Column` to filter the table.
`sorter` is a sorting function. You can also specify `sorter` to `true`, so that you can customize the sorting through the `onChange` event of `Table`.
`filters` is an array containing the information to be filtered, which needs to be used with `onFilter`. You can also use the `onChange` event of the `Table` for custom filtering or server-side filtering.

**Default sort and filter**: You can specify the default sort and filter by specifying `defaultFilters` and `defaultSortOrder`.

```js
import { Table } from '@arco-design/web-react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    sorter: (a, b) => a.salary - b.salary,
    filters: [
      {
        text: '> 20000',
        value: '20000',
      },
      {
        text: '> 30000',
        value: '30000',
      },
    ],
    defaultFilters: ['20000'],
    onFilter: (value, row) => row.salary > value,
    sortDirections: ['ascend'],
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'Paris',
        value: 'Paris',
      },
    ],
    onFilter: (value, row) => row.address.indexOf(value) > -1,
    filterMultiple: false,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.email.length - b.email.length,
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
    address: '35 Park Road, Paris',
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
    address: '42 Park Road, Paris',
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
