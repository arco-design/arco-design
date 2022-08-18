---
order: 3
title:
  zh-CN: 精度和步长
  en-US: Precision
---

## zh-CN

通过 `precision` 来设置数字精度。当 `precision` 小于 `step` 的小数位时，精度取 `step` 的小数个数。

## en-US

Use `precision` to set the number precision. When `precision` is less than the decimal place of `step`, the precision is taken as the number of decimal places of `step`.

```js
import { InputNumber } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <InputNumber
        min={0}
        max={40}
        defaultValue={3.5}
        step={0.1}
        precision={1}
        style={{ width: 160, margin: '10px 24px 10px 0' }}
      />
      <InputNumber
        min={0}
        max={40}
        defaultValue={1.11}
        step={0.01}
        precision={1}
        style={{ width: 160, margin: '10px 24px 10px 0' }}
      />
    </div>
  );
};

export default App;
```
