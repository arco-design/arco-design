---
order: 5
title:
  zh-CN: 支持多选
  en-US: Multiple
---

## zh-CN

指定`mode=multiple`，即可使用多选。设置 `checkedStrategy` 属性设置数据回显方式（`2.31.0`）。

## en-US

Allow multiple selection. Set the 'checkedStrategy' property to set the data echo mode(`2.31.0`).

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
            disableCheckbox: true,
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

const App = () => {
  return (
    <Space>
      <Cascader
        placeholder="Please select ..."
        style={{
          width: 300,
        }}
        options={options}
        mode="multiple"
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
      />
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300 }}
        options={options}
        mode="multiple"
        checkedStrategy="parent"
      />
    </Space>
  );
};

export default App;
```
