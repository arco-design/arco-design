---
order: 10
title:
  zh-CN: 复选框多选
  en-US: Checkable
---

## zh-CN

可以通过设置 `treeCheckable` 属性开启复选框勾选。

## en-US

The `treeCheckable` property can display checkbox.

```js
import { TreeSelect, Checkbox } from '@arco-design/web-react';
import { useState } from 'react';
const treeData = [
  {
    title: 'Trunk 0-0',
    value: 'Trunk 0-0',
    key: '0-0',
    children: [
      {
        title: 'Leaf 0-0-1',
        value: 'Leaf 0-0-1',
        key: '0-0-1',
      },
      {
        title: 'Branch 0-0-2',
        value: 'Branch 0-0-2',
        key: '0-0-2',
        children: [
          {
            title: 'Leaf 0-0-2-1',
            value: 'Leaf 0-0-2-1',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'Trunk 0-1',
    value: 'Trunk 0-1',
    key: '0-1',
    children: [
      {
        title: 'Branch 0-1-1',
        value: 'Branch 0-1-1',
        key: '0-1-1',
        checkable: false,
        children: [
          {
            title: 'Leaf 0-1-1-1',
            value: 'Leaf 0-1-1-1',
            key: '0-1-1-1',
          },
          {
            title: 'Leaf 0-1-1-2',
            value: 'Leaf 0-1-1-2',
            key: '0-1-1-2',
            disabled: true,
          },
        ],
      },
      {
        title: 'Leaf 0-1-2',
        value: 'Leaf 0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

function App() {
  const [treeCheckStrictly, setTreeCheckStrictly] = useState(false);
  const [value, setValue] = useState(['0-1']);
  return (
    <div>
      <div style={{ marginBottom: 20 }} >
        <Checkbox checked={treeCheckStrictly} onChange={setTreeCheckStrictly}>
          treeCheckStrictly
        </Checkbox>
      </div>
      <TreeSelect
        showSearch
        allowClear
        treeCheckable
        treeData={treeData}
        value={value}
        treeCheckStrictly={treeCheckStrictly}
        onChange={(value) => {
          console.log(value);
          setValue(value);
        }}
        style={{ width: 300, }}
      />
    </div>
  );
}

export default App;
```
