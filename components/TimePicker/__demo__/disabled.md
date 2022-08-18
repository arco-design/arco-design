---
order: 3
title:
  zh-CN: 禁用
  en-US: Disabled
---

## zh-CN

禁用状态。

## en-US

Disabled.

```js
import { TimePicker } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <TimePicker
        disabled
        style={{ margin: '0 24px 24px 0', }} />
      <TimePicker.RangePicker
        disabled
        style={{ width: 252, margin: '0 24px 24px 0', }}
      />
    </div>
  );
};

export default App;
```

