---
order: 2
title:
  zh-CN: 格式化展示选中值
  en-US: Customize selected value
---

## zh-CN

利用`renderFormat`对显示的内容进行自定义处理。

## en-US

The return value will be displayed in the input box

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
      defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
      renderFormat={(valueShow) => `${valueShow.join(' > ')}`}
      allowClear
    />
  );
};

export default App;
```
