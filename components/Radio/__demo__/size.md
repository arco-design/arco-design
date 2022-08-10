---
order: 4
title:
  zh-CN: 不同尺寸
  en-US: Size
---

## zh-CN

按钮类型的单选框分为 4 个尺寸，分别为 `mini`, `small`, `default`, `large`。

## en-US

The radio group of button type has four sizes available: `mini`, `small`, `default`, `large`.

```js
import { Radio } from '@arco-design/web-react';
const RadioGroup = Radio.Group;
const options = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
    disabled: true,
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
];

const App = () => {
  return (
    <div>
      <RadioGroup
        options={options}
        size="mini"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
      <br />
      <RadioGroup
        options={options}
        size="small"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
      <br />
      <RadioGroup
        options={options}
        size="default"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
      <br />
      <RadioGroup
        options={options}
        size="large"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
    </div>
  );
};

export default App;
```
