---
order: 3
title:
  zh-CN: 自定义选择框
  en-US: Customize select box
---

## zh-CN

`children` 会覆盖默认的选择框。

## en-US

`children` will override the default select box node.

```js
import { Cascader, Link, Typography } from '@arco-design/web-react';

const options = [
  {
    value: 'Beijing',
    label: 'Beijing',
    children: [
      {
        value: 'Beijing',
        label: 'Beijing',
        children: [
          {
            value: 'Chaoyang',
            label: 'Chaoyang',
            children: [
              {
                value: 'Datunli',
                label: 'Datunli',
              },
            ],
          },
          {
            value: 'Dongcheng',
            label: 'Dongcheng',
          },
          {
            value: 'Xicheng',
            label: 'Xicheng',
          },
          {
            value: 'Haidian',
            label: 'Haidian',
          },
        ],
      },
    ],
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'Shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'Huangpu',
            label: 'Huangpu',
          },
        ],
      },
    ],
  },
];

class Demo extends React.Component {
  state = {
    text: ['Shanghai', 'Shanghai', 'Huangpu'].join(', '),
  };

  onChange = (value, selectedOptions) => {
    this.setState({
      text: selectedOptions.map((a) => a.label).join(', '),
    });
  };

  render() {
    return (
      <div>
        <Typography.Text>City</Typography.Text>
        <Cascader
          defaultValue={['Shanghai', 'Shanghai', 'Huangpu']}
          placeholder="Please select ..."
          style={{ width: 300 }}
          options={options}
          onChange={this.onChange}
        >
          <Link >{this.state.text}</Link>
        </Cascader>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, CONTAINER);
```
