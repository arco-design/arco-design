---
order: 1
title:
  zh-CN: 按钮模式
  en-US: Button Mode
---

## zh-CN

指定 `mode` 为 `button` 来使用带按钮的数字输入框。

## en-US

Set `mode` as `button` to use a numeric input box with buttons.

```js
import { InputNumber } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <InputNumber
        mode="button"
        defaultValue={500}
        style={{ width: 160, margin: '10px 24px 10px 0' }}
      />
      <InputNumber
        mode="button"
        disabled
        defaultValue={500}
        style={{ width: 160, margin: '10px 24px 10px 0' }}
      />
    </div>
  );
};

export default App;
```
