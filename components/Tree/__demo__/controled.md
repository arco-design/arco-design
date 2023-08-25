---
order: 5
title:
  zh-CN: 受控模式
  en-US: Controlled
---

## zh-CN

可以指定树的 `selectedKeys` 或 `checkedKeys` 或 `expandedKeys` 属性使树变为受控模式，在对应的 `onSelect` / `onCheck` / `onExpand` 回调中对返回值进行操作。

## en-US

You can specify the `selectedKeys` or `checkedKeys` or `expandedKeys` property of the tree to turn the tree into a controlled mode, and operate on the return value in the `onSelect` / `onCheck` / `onExpand` callback.

```js
import { useState } from 'react';
import { Tree, Button } from '@arco-design/web-react';
const TreeNode = Tree.Node;
const TreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf 0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf 0-0-2-1',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Leaf 0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Leaf 0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

function App() {
  const allCheckedKeys = ['0-0', '0-0-1', '0-0-2', '0-0-2-1', '0-1', '0-1-1', '0-1-2'];
  const allExpandedKeys = ['0-0', '0-1', '0-0-2'];
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState(allExpandedKeys);
  return (
    <div>
      <Button.Group style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          onClick={() => setCheckedKeys(checkedKeys.length ? [] : allCheckedKeys)}
        >
          {checkedKeys.length ? 'deselect all' : 'select all'}
        </Button>
        <Button
          type="primary"
          onClick={() => setExpandedKeys(expandedKeys.length ? [] : allExpandedKeys)}
        >
          {expandedKeys.length ? 'fold' : 'unfold'}
        </Button>
      </Button.Group>
      <Tree
        checkable
        checkedKeys={checkedKeys}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onSelect={(keys, extra) => {
          console.log(keys, extra);
          setSelectedKeys(keys);
        }}
        onCheck={(keys, extra) => {
          console.log(keys, extra);
          setCheckedKeys(keys);
        }}
        onExpand={(keys, extra) => {
          console.log(keys, extra);
          setExpandedKeys(keys);
        }}
        treeData={TreeData}
      ></Tree>
    </div>
  );
}

export default App;
```
