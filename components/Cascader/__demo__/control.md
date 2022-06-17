---
order: 10
title:
  zh-CN: 受控模式
  en-US: Controlled
---

## zh-CN

可以完全控制级联选择。

## en-US

Control the selected value.

```js
import React from 'react';
import { Cascader, Space } from '@arco-design/web-react';

const options = [
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'Beijing',
        label: 'Beijing',
        children: [
          {
            value: 'chaoyang',
            label: 'Chaoyang',
            children: [
              {
                value: 'datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'xicheng',
            label: 'Xicheng',
          },
          {
            value: 'haidian',
            label: 'Haidian',
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'shanghaishi',
        label: 'Shanghai',
        children: [
          {
            value: 'huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ],
  },
];

class App extends React.Component {
  state = {
    value: undefined,
    value1: undefined,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: [['beijing', 'Beijing', 'chaoyang', 'datunli']],
      });
    }, 200);
  }

  render() {
    return (
      <Space size="large">
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          showSearch
          value={this.state.value1}
          onChange={(value, option) => {
            console.log(option);
            this.setState({
              value1: value,
            });
          }}
        ></Cascader>
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          showSearch
          mode="multiple"
          value={this.state.value}
          onChange={(value, options) => {
            console.log(value, options);
            this.setState({
              value,
            });
          }}
        />
      </Space>
    );
  }
}

export default App;
```
