---
order: 11
title:
  zh-CN: 不同尺寸
  en-US: Size
---

## zh-CN

设置 `size` 可以使用四种尺寸（`mini`, `small`, `default`, `large`）的选择器。高度分别对应`24px`、`28px`、`32px`、`36px`


## en-US

There are four sizes available: `mini`, `small`, `default` and `large`. Their heights are `24px`, `28px`, `32px`, `36px`.

```js
import React from 'react';
import { Cascader, Radio } from '@arco-design/web-react';

const RadioGroup = Radio.Group;
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
    value: 'default',
  };

  render() {
    return (
      <div>
        <RadioGroup
          type="button"
          name="size"
          value={this.state.value}
          onChange={(value) => {
            this.setState({
              value,
            });
          }}
          style={{ marginBottom: 20 }}
        >
          <Radio value="mini">mini</Radio>
          <Radio value="small">small</Radio>
          <Radio value="default">default</Radio>
          <Radio value="large">large</Radio>
        </RadioGroup>
        <div>
          <Cascader
            placeholder="Please select ..."
            style={{ width: 300, marginBottom: 20 }}
            options={options}
            size={this.state.value}
            allowClear
          />
          <br />
          <Cascader
            placeholder="Please select ..."
            style={{ width: 300 }}
            options={options}
            mode="multiple"
            size={this.state.value}
            allowClear
          />
        </div>
      </div>
    );
  }
}

export default App;
```
