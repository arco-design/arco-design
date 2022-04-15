---
order: 22
title:
  zh-CN: 大数据
  en-US: Big Data
---

## zh-CN

内置虚拟滚动逻辑，设置 `virtualized=true` 开启。

目前虚拟滚动表格受限比较多，开启虚拟滚动后会自动禁用掉展开行、树形数据、固定列、展开行等逻辑，我们会逐步进行改善。

**注意：** 开启虚拟滚动之后，不要给每一列都设置宽度，要保证有一列自适应，不然可能出现表头表身对不齐的情况。

## en-US

Built-in virtual scrolling logic, set `virtualized=true` to enable.

At present, the virtual scrolling table is more limited. After the virtual scrolling is turned on, the logic of expanding rows, tree data, fixed columns, expanding rows, etc. will be automatically disabled. We will gradually improve.

**Note:** After enabling virtual scrolling, do not set the width for each column. Make sure that one column is adaptive, otherwise there may be misalignment between the header and the body.

```js
import { Table } from '@arco-design/web-react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 140,
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    width: 100,
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

const data = Array(100000)
  .fill('')
  .map((_, index) => ({
    key: `${index}`,
    name: `Kevin ${index}`,
    salary: 22000,
    address: `${index} Park Road, London`,
    email: `kevin.sandra_${index}@example.com`,
  }));

ReactDOM.render(
  <Table
    virtualized
    scroll={{ y: 500 }}
    border
    columns={columns}
    data={data}
    pagination={false}
    rowSelection={{}}
  />,
  CONTAINER
);
```
