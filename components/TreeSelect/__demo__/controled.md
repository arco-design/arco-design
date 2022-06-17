---
order: 3
title:
  zh-CN: 受控模式
  en-US: Controlled
---

## zh-CN

受控模式。

## en-US

Controlled mode.

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
  state = {
    value: 'node2',
  };
  handleChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };

  render() {
    return (
      <TreeSelect
        treeData={treeData}
        value={this.state.value}
        onChange={this.handleChange}
        style={{ width: 300 }}
      />
    );
  }
}

export default App;
```
