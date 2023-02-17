---
order: 0
title:
  zh-CN: 基础
  en-US: Basic
---

## zh-CN

最基础的用法。
默认通过点击展开下一级，可以设置`expandTrigger='hover'`来控制`hover`展开下一级

## en-US

The basic usage.

If `expandTrigger` is `'hover'`, next level menu will be expanded when current option is hovered.


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
    <div>
      <Space size="large">
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
        <Cascader
          placeholder="Hover to expand"
          expandTrigger="hover"
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
      </Space>
      <br/>
      <Space size="large">
        <Cascader
          status="error"
          allowClear
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
        <Cascader
          status="warning"
          allowClear
          placeholder="Hover to expand"
          expandTrigger="hover"
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
      </Space>
    </div>
  );
};

export default App;
```
