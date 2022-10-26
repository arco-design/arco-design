---
order: 2
title:
  zh-CN: 前置标签
  en-US: Front label
---

## zh-CN

通过 `addBefore` 设置前置标签 (`2.41.0`)

## en-US

Specify `addBefore` to add elements before the select box. (`2.41.0`)


```js
import { TreeSelect, Space } from '@arco-design/web-react';

const treeData = [
  {
    key: 'node1',
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
  return <Space>
  <TreeSelect addBefore={"TreeNode"} treeData={treeData} style={{ width: 350 }} />
  <TreeSelect addBefore={"TreeNode"} treeData={treeData} treeCheckable style={{ width: 350 }} />
  </Space>
};

export default App;
```
