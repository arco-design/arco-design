---
order: 8
title: 
  zh-CN: 设置回填方式
  en-US: Checked Strategy
---

## zh-CN

为 `Tree` 添加 `checkedStrategy` 可以设置选中时的回填方式

## en-US

Add `checkedStrategy` to set the return value when selected.

```js
import { useState } from 'react';
import { Tree, Radio, Typography } from '@arco-design/web-react';
const TreeNode = Tree.Node;
const TreeData = [
  {
    title: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf',
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
        title: 'Branch 0-1-1',
        key: '0-1-1',
        children: [
          {
            title: 'Leaf',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf',
            key: '0-1-1-2',
          },
        ],
      },
      {
        title: 'Leaf',
        key: '0-1-2',
      },
    ],
  },
];

function App() {
  const [checkedKeys, setCheckedKeys] = useState(['0-0', '0-1']);
  const [checkedStrategy, setCheckedStrategy] = useState(Tree.SHOW_ALL);
  return (
    <div>
      <Radio.Group
        type="button"
        value={checkedStrategy}
        onChange={(value) => {
          setCheckedStrategy(value);
          setCheckedKeys([]);
        }}
        options={[
          {
            value: Tree.SHOW_ALL,
            label: 'show all',
          },
          {
            value: Tree.SHOW_PARENT,
            label: 'show parent',
          },
          {
            value: Tree.SHOW_CHILD,
            label: 'show child',
          },
        ]}
      />
      <div style={{ margin: '20px 0' }}>
        <Typography.Text>Current: {checkedKeys.join(' , ')}</Typography.Text>
      </div>
      <Tree
        checkedStrategy={checkedStrategy}
        checkable
        checkedKeys={checkedKeys}
        onCheck={(value, extra) => {
          setCheckedKeys(value);
        }}
        treeData={TreeData}
      ></Tree>
    </div>
  );
}

export default App;
```
