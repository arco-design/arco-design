---
order: 5
title:
  zh-CN: 支持多选
  en-US: Multiple
---

## zh-CN

指定`mode=multiple`，即可使用多选。

## en-US

Allow multiple selection.

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

ReactDOM.render(
  <Cascader
    placeholder="Please select ..."
    style={{ width: 300 }}
    options={options}
    mode="multiple"
    defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
  />,
  CONTAINER
);
```
