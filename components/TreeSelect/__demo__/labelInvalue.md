---
order: 1
title:
  zh-CN: 设置 value 格式
  en-US: Value Format
---

## zh-CN

`labelInValue` 为 `true` 时，`value` 格式为： `{ label: string, value: string }`。

## en-US

When `labelInValue` is `true`, the format of `value` is: `{ label: string, value: string }`.

```js
import React from 'react';
import { TreeSelect } from '@arco-design/web-react';
import { IconStar  } from '@arco-design/web-react/icon';

const treeData = [
  {
    key: 'node1',
    title: 'Trunk',
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
  const [value, setValue] = React.useState({
    value: 'node2',
    label: <span><IconStar/> Leaf</span>,
  });

  return (
    <TreeSelect
      labelInValue={true}
      treeData={treeData}
      value={value}
      onChange={(v) => {
        setValue(v ? {
          value: v.value,
          label: <span><IconStar/> {v.label}</span>
        } : v)
      }}
      style={{ width: 300 }}
    />
  )
}

export default App;
```
