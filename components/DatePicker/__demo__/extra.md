---
order: 13
title:
  zh-CN: 额外的页脚
  en-US: Extra footer
---

## zh-CN

在浮层中加入额外的页脚，以满足某些定制信息的需求。

## en-US

Add an extra footer to meet the needs of some customized information.

```js
import { DatePicker } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <DatePicker
        extra="Extra footer"
        style={{ width: 200, marginBottom: 20 }}
      />
      <br />
      <DatePicker.RangePicker
        showTime
        extra="Extra footer"
        style={{ width: 380 }}
      />
    </div>
  );
};

export default App;
```
