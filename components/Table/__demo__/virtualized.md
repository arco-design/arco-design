---
order: 23
title:
  zh-CN: 大数据
  en-US: Big Data
---

## zh-CN

内置虚拟滚动逻辑，设置 `virtualized=true` 开启。

**注意：** 开启虚拟滚动之后，不要给每一列都设置宽度，要保证有一列自适应，不然可能出现表头表身对不齐的情况。

## en-US

Built-in virtual scrolling logic, set `virtualized=true` to enable.

**Note:** After enabling virtual scrolling, do not set the width for each column. Make sure that one column is adaptive, otherwise there may be misalignment between the header and the body.

```tsx
import React, { useRef } from 'react';
import { Table, Button, TableInstance } from '@arco-design/web-react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left' as const,
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
const data = Array(100000)
  .fill('')
  .map((_, index) => ({
    key: `${index}`,
    name: `Kevin ${index}`,
    salary: 22000,
    address: `${index} Park Road, London`,
    email: `kevin.sandra_${index}@example.com`,
  }));

const App = () => {
  const table = useRef<TableInstance>(null);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => table.current.scrollIntoView('500')}
        style={{ marginBottom: 10 }}
      >
        滚动到第 500 条
      </Button>
      <Table
        ref={table}
        virtualized
        scroll={{
          y: 500,
          x: 'max-content',
        }}
        border
        columns={columns}
        data={data}
        pagination={false}
        rowSelection={{}}
      />
    </div>
  );
};

export default App;
```
