---
order: 4
title:
  zh-CN: 选择即改变
  en-US: Change on select
---

## zh-CN

设置属性 `changeOnSelect`，点击任何一级都可以选择。多选时将会解除父子节点的关联。

## en-US

Each selection will change value if set to true. when `mode=multiple`, child node and parent node will not affect each other.


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
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        showSearch
        changeOnSelect
        allowClear
      />
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        mode="multiple"
        changeOnSelect
        allowClear
        showSearch
      />
    </Space>
  );
};

export default App;
```
