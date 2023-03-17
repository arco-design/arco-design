---
order: 1
title:
  zh-CN: 自定义渲染
  en-US: custom render
---

## zh-CN

单选下通过 `renderFormat` 可自定义渲染展示

## en-US

Under single selection, the rendering display can be customized through `renderFormat`

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
  const [value, setValue] = React.useState('node2');

  return (
    <TreeSelect
      renderFormat={(nodeProps, value) => {
        return <span><IconStar /> {nodeProps.title || value}</span>
      }}
      treeData={treeData}
      value={value}
      onChange={(v) => {
        setValue(v)
      }}
      style={{ width: 300 }}
    />
  )
}

export default App;
```
