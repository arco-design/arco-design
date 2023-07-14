---
order: 6
title:
  zh-CN: 高精度
  en-US: Strict Mode
---

## zh-CN

通过 `strictMode` 开启严格模式以支持更高精度，`onChange` 此时将会返回字符串。

## en-US

Enable strict mode with `strictMode` to support higher precision, `onChange` will return a string at this time.

```js
import { useState } from 'react';
import { InputNumber } from '@arco-design/web-react';

const App = () => {
  const [value, setValue] = useState(1e20);
  return (
    <InputNumber
      style={{ width: 480 }}
      strictMode
      mode="button"
      value={value}
      step={1e-20}
      onChange={(value) => {
        console.log('InputNumber value is ', value);
        setValue(value);
      }}
    />
  );
};

export default App;
```
