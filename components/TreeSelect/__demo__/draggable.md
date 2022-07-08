---
order: 15
title:
  zh-CN: 拖拽排序
  en-US: Draggable
---

## zh-CN

多选时，指定 `dragToSort` 属性以允许对已输入的值进行拖拽排序。

## en-US

In multiple mode, specify the `dragToSort` property to allow sort the entered values by dragging.

```js
import { TreeSelect } from '@arco-design/web-react';

const treeData = [
  {
    key: 'node1',
    title: 'Trunk1',
    disabled: true,
    children: [
      {
        key: 'node2',
        title: 'Leaf1',
      },
    ],
  },
  {
    key: 'node3',
    title: 'Trunk2',
    children: [
      {
        key: 'node4',
        title: 'Leaf2',
      },
      {
        key: 'node5',
        title: 'Leaf3',
      },
    ],
  },
];

const App = () => {
  return (
    <TreeSelect treeData={treeData} multiple dragToSort placeholder='请选择...' style={{ width: 300 }} />
  );
};

export default App;
```
