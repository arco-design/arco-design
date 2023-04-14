---
order: 20
title:
  zh-CN: 定制前置操作列
  en-US: Custom operation column
---

## zh-CN

可以通过 `components` 来定制前置操作列，包括新增列、调整列的顺序等。

## en-US

You can customize the operation column through `components`, including adding new columns, adjusting the order of columns, etc.

```js
import { useState } from 'react';
import { Table } from '@arco-design/web-react';
import { IconDragDotVertical } from '@arco-design/web-react/icon';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    width: 120,
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
const components = {
  header: {
    operations: ({ selectionNode, expandNode }) => [
      {
        node: (
          <th>
            <div className="arco-table-th-item">Index</div>
          </th>
        ),
        width: 40,
      },
      {
        name: 'selectionNode',
        node: selectionNode,
      },
      {
        name: 'expandNode',
        node: expandNode,
      },
    ],
  },
  body: {
    operations: ({ selectionNode, expandNode }) => [
      {
        node: (record) => <td>{record.key}</td>,
        width: 40,
      },
      {
        name: 'selectionNode',
        node: selectionNode,
      },
      {
        name: 'expandNode',
        node: expandNode,
      },
    ],
  },
};

function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState(['4']);
  return (
    <Table
      components={components}
      columns={columns}
      data={data}
      expandedRowRender={(record) => {
        if (record.key !== '4') {
          return record.email;
        }

        return null;
      }}
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(selectedRowKeys, selectedRows);
          setSelectedRowKeys(selectedRowKeys);
        },
        checkboxProps: (record) => {
          return {
            disabled: record.id === 4,
          };
        },
      }}
      scroll={{
        x: 1200,
      }}
    />
  );
}

export default App;
```
