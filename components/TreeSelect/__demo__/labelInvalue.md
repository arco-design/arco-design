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
import { IconCalendar } from '@arco-design/web-react/icon';

const treeData = [
  {
    key: 'node1',
    icon: <IconCalendar />,
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

class App extends React.Component {
  handleChange = (value) => {
    console.log(value);
  };

  render() {
    return (
      <TreeSelect
        labelInValue={true}
        treeData={treeData}
        defaultValue={{
          value: 'node2',
          label: 'Leaf',
        }}
        onChange={this.handleChange}
        style={{ width: 300 }}
      />
    );
  }
}

export default App;
```
