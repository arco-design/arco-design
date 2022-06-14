---
order: 4
title: 
  zh-CN: 带复选框的树
  en-US: Checkable
---

## zh-CN

为 `Tree` 添加 `checkable` 属性即可使树具有复选框功能，可以用 `defaultCheckedKeys` 指定复选框默认选中的节点。

## en-US

Add the `checkable` attribute to display the checkbox, and you can use `defaultCheckedKeys` to specify which nodes are checked by default.

```js
import { useState } from 'react';
import { Tree, Checkbox } from '@arco-design/web-react';
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
        disabled: true,
        children: [
          {
            title: 'Leaf',
            key: '0-0-2-1',
          },
          {
            title: 'Leaf',
            key: '0-0-2-2',
            disableCheckbox: true,
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
            title: 'Leaf ',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf ',
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
  const [checkStrictly, setCheckStrictly] = useState(false);
  return (
    <div>
      <Checkbox
        style={{ marginBottom: 24 }}
        onChange={(value) => {
          setCheckStrictly(value);
          setCheckedKeys([]);
        }}
      >
        checkStrictly
      </Checkbox>

      <Tree
        checkStrictly={checkStrictly}
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
