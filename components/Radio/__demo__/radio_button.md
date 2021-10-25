---
order: 3
title:
  zh-CN: 按钮类型
  en-US: Button style
---

## zh-CN

指定 `type=button`，单选框会展示为按钮样式。

## en-US

The combination of radio button style.

```js
import { Radio } from '@arco-design/web-react';

const RadioGroup = Radio.Group;

ReactDOM.render(
  <div>
    <RadioGroup
      type="button"
      name="lang"
      defaultValue="Guangzhou"
      style={{ marginRight: 20, marginBottom: 20 }}
    >
      <Radio value="Beijing">Beijing</Radio>
      <Radio value="Shanghai">Shanghai</Radio>
      <Radio disabled value="Guangzhou">
        Guangzhou
      </Radio>
      <Radio value="Shenzhen">Shenzhen</Radio>
    </RadioGroup>
  </div>,
  CONTAINER
);
```
