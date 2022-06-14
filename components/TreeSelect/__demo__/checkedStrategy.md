---
order: 11
title: 
  zh-CN: 定制回填方式
  en-US: Check Strategy
---

## zh-CN

可以通过`treeCheckStrategy`属性定制回填方式。

## en-US

Customize the return value through the `treeCheckStrategy` property.

```js
import { TreeSelect, Radio } from '@arco-design/web-react';
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
  const [treeCheckedStrategy, setTreeCheckedStrategy] = useState(TreeSelect.SHOW_CHILD);
  const [value, setValue] = useState(['0-0']);
  return (
    <div>
      <div
        style={{ marginBottom: 20, }}
      >
        <Radio.Group
          type="button"
          value={treeCheckedStrategy}
          onChange={setTreeCheckedStrategy}
          options={[
            {
              value: TreeSelect.SHOW_ALL,
              label: 'show all',
            },
            {
              value: TreeSelect.SHOW_PARENT,
              label: 'show parent',
            },
            {
              value: TreeSelect.SHOW_CHILD,
              label: 'show child',
            },
          ]}
        />
      </div>
      <TreeSelect
        showSearch
        allowClear
        treeCheckable
        treeData={treeData}
        value={value}
        treeCheckedStrategy={treeCheckedStrategy}
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
