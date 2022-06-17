---
order: 2
title:
  zh-CN: 通过数据生成树结构
  en-US: Form TreeData
---

## zh-CN

通过传入 `treeData` 数据生成树结构。

## en-US

Generate a tree structure by `treeData`.

```js
import { TreeSelect } from '@arco-design/web-react';
import { IconCalendar } from '@arco-design/web-react/icon';
const treeData = [
  {
    key: 'node1',
    icon: <IconCalendar />,
    title: 'Trunk',
    disabled: true,
    children: [
      {
        key: 'node2',
        title: 'Leaf',
      },
    ],
  },
  {
    key: 'node3',
    title: 'Trunk2',
    icon: <IconCalendar />,
    children: [
      {
        key: 'node4',
        title: 'Leaf',
      },
      {
        key: 'node5',
        title: 'Leaf',
      },
    ],
  },
];

const App = () => {
  return <TreeSelect treeData={treeData} placeholder="请选择..." style={{ width: 300 }} />;
};

export default App;
```
