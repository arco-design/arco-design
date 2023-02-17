---
order: 0
title:
  zh-CN: 不同状态
  en-US: Status
---

## zh-CN

不同状态的日期输入器

## en-US

date inputter in different states

```js
import { DatePicker, Space } from '@arco-design/web-react';

const App = () => {
  return (
   <div>
    <Space wrap>
      <DatePicker status="error" placeholder="error status" style={{ width: 200 }}/>
      <DatePicker.RangePicker status="error"  placeholder="warning status"  style={{ width: 250 }}/>
    </Space>
    <br/>
    <Space wrap>
      <DatePicker status="warning"  placeholder="warning status"  style={{ width: 200 }}/>
      <DatePicker.RangePicker status="warning"  placeholder="warning status"  style={{ width: 250 }}/>
    </Space>
    </div>
  );
};

export default App;
```
