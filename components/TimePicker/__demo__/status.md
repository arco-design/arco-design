---
order: 0
title:
  zh-CN: 不同状态
  en-US: Status
---

## zh-CN

不同状态的时间输入器

## en-US

  different status

```js
import { TimePicker, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
    <Space wrap>
      <TimePicker status="error" placeholder="error status" style={{ width: 200 }}/>
      <TimePicker.RangePicker status="error"  placeholder={["error status", "error status"]}  style={{ width: 250 }}/>
    </Space>
    <br/>
    <Space wrap>
      <TimePicker status="warning"  placeholder="warning status"  style={{ width: 200 }}/>
      <TimePicker.RangePicker status="warning"  placeholder={["warning status", "warning status"]}  style={{ width: 250 }}/>
    </Space>
    </div>
  );
};

export default App;
```
