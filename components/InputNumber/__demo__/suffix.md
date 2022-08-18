---
order: 5
title:
  zh-CN: 前缀及后缀
  en-US: Prefix and Suffix
---

## zh-CN

可以添加前缀和后缀。

## en-US

You can add a prefix or a suffix.

```js
import { InputNumber } from '@arco-design/web-react';

function App() {
  return (
    <div>
      <InputNumber
        min={0}
        defaultValue={50}
        suffix="%"
        step={1}
        style={{ width: 160, margin: '10px 24px 10px 0' }}
      />
      <InputNumber
        min={0}
        defaultValue={500}
        prefix="¥"
        step={100}
        style={{ width: 160, margin: '10px 24px 10px 0' }}
      />
      <InputNumber
        mode="button"
        min={0}
        defaultValue={500}
        prefix="¥"
        step={100}
        style={{ width: 160, margin: '10px 24px 10px 0' }}
      />
    </div>
  );
}

export default App;
```
