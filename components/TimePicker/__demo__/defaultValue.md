---
order: 6
title:
  zh-CN: 默认值
  en-US: defaultValue
---

## zh-CN

时间输入器的有默认值的情况。

## en-US

TimePicker has a default value.

```js
import { TimePicker } from '@arco-design/web-react';
const { RangePicker } = TimePicker;

const App = () => {
  return (
    <div>
      <TimePicker
        defaultValue="18:24:23"
        style={{
          width: 194,
          marginRight: 24,
          marginBottom: 24,
        }}
      />
      <RangePicker
        defaultValue={['09:24:53', '18:44:33']}
        style={{ width: 252, marginBottom: 24 }}
      />
    </div>
  );
};

export default App;
```
