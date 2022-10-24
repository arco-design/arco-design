---
order: 2
title:
  zh-CN: 前置标签
  en-US: Front label
---

## zh-CN

通过 `addBefore` 设置前置标签 (`2.41.0`)

## en-US

Specify `addBefore` to add elements before the select box.  (`2.41.0`)



```js
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
    <Space size="large">
      <Cascader
        addBefore="Select city"
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
      />
      <Cascader
        placeholder="Hover to expand"
        expandTrigger="hover"
        addBefore="Select city"
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        mode="multiple"
      />
    </Space>
  );
};

export default App;
```
