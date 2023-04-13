---
order: 10
title:
  zh-CN: 多列排序
  en-US: Multiple sorter
---

## zh-CN

`column.sorter` 支持传入一个对象，指定该对象的 `multiple` 属性可以实现多列排序的效果。`multiple`为`number`类型，数字越大代表排序优先级越高。
**注意：** 多列排序配合 `sortOrder` 使用时，为保持状态一致性，所有指定了`sorter`的列都需要同时指定`sortOrder`（可为undefined），同时需要注意列之间的互斥关系。

## en-US

`column.sorter` supports passing in an object that has a `multiple` property that can be used to sort multiple columns. `multiple` is of type `number`. The larger the number, the higher the sorting priority.
** Note: ** Multiple column sorting with `sortOrder` when used, in order to maintain state consistency, all specified `sorter` columns need to specify `sortOrder` (can be undefined), while needing to pay attention to the mutual exclusion relationship between columns.

```js
import { useState } from 'react';
import { Table } from '@arco-design/web-react';

const App = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Score A',
      dataIndex: 'scoreA',
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a, b) => a.scoreA - b.scoreA,
        multiple: 3,
      },
    },
    {
      title: 'Score B',
      dataIndex: 'scoreB',
      defaultSortOrder: 'ascend',
      sorter: {
        compare: (a, b) => a.scoreB - b.scoreB,
        multiple: 2,
      },
    },
    {
      title: 'Score C',
      dataIndex: 'scoreC',
      sorter: {
        compare: (a, b) => a.scoreC - b.scoreC,
        multiple: 1,
      },
    },
  ];
  const data = [
    {
      key: '1',
      name: 'A',
      age: 18,
      scoreA: 100,
      scoreB: 60,
      scoreC: 70,
    },
    {
      key: '2',
      name: 'B',
      age: 17,
      scoreA: 100,
      scoreB: 90,
      scoreC: 80,
    },
    {
      key: '3',
      name: 'C',
      age: 19,
      scoreA: 100,
      scoreB: 70,
      scoreC: 60,
    },
    {
      key: '4',
      name: 'D',
      age: 15,
      scoreA: 80,
      scoreB: 70,
      scoreC: 100,
    },
    {
      key: '5',
      name: 'E',
      age: 20,
      scoreA: 80,
      scoreB: 70,
      scoreC: 90,
    },
  ];
  return (
    <Table
      data={data}
      columns={columns}
      onChange={(pagination, changedSorter) => {
        console.log(changedSorter);
      }}
    />
  );
};

export default App;
```
