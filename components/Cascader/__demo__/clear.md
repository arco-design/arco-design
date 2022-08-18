---
order: 1
title:
  zh-CN: 允许清除
  en-US: Allow clear
---

## zh-CN

支持清除。

## en-US

Allow clear.

```js
import { Cascader } from '@arco-design/web-react';
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

const App = () => {
  return (
    <Cascader
      placeholder="Please select ..."
      style={{ width: 300 }}
      options={options}
      onChange={(value, option) => {
        console.log(value, option);
      }}
      defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
      allowClear
    />
  );
};

export default App;
```
