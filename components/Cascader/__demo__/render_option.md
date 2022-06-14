---
order: 12
title:
  zh-CN: 自定义Option
  en-US: Customize option
---

## zh-CN

使用 `renderOption`，可以自定义渲染选项。

## en-US

Customize option node.

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
          {
            value: 'fengtai',
            label: 'fengtai',
          },
          {
            value: 'shijingshan',
            label: 'Shijingshan',
          },
          {
            value: 'mentougou',
            label: 'Mentougou',
          },
          {
            value: 'fangshan',
            label: 'Fangshan',
          },
          {
            value: 'tongzhou',
            label: 'Tongzhou',
          },
          {
            value: 'shunyi',
            label: 'Shunyi',
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
        defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
        showSearch
        renderOption={(node, level) => {
          console.log(node, level);
          return (
            <span>
              {node.label}({node.value})
            </span>
          );
        }}
      />
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
        showSearch
        mode="multiple"
        renderOption={(node, level) => {
          return (
            <span>
              {node.label}({node.value})
            </span>
          );
        }}
      />
    </Space>
  );
};

export default App;
```
