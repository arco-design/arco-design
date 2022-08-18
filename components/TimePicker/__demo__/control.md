---
order: 1
title:
  zh-CN: 受控组件
  en-US: Under Control
---

## zh-CN

`value` 和 `onChange` 需要配合使用。

## en-US

`value` and `onChange` need to be used together.

```js
import { useState } from 'react';
import { TimePicker } from '@arco-design/web-react';

function App() {
  const [value, setValue] = useState();
  return (
    <TimePicker
      style={{ width: 194 }}
      value={value}
      onChange={(valueString) => setValue(valueString)}
    />
  );
}

export default App;
```
