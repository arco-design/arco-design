---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

通过鼠标或者键盘输入范围内的标准数值。

## en-US

Use the mouse or keyboard to enter standard values within the range.

```js
import { InputNumber } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <InputNumber
        placeholder="Please enter"
        min={0}
        max={15}
        style={{ width: 160, margin: '10px 24px 10px 0' }}
      />
      <InputNumber disabled defaultValue={500} style={{ width: 160, margin: '10px 24px 10px 0' }} />
    </div>
  );
};

export default App;
```
