---
order: 4
title:
  zh-CN: 定制时分
  en-US: Custom format
---

## zh-CN

通过设置 `format`，可以定制需要显示的时、分、秒。

## en-US

By setting `format`, you can customize the hour, minute, and second.

```js
import { TimePicker } from '@arco-design/web-react';
import dayjs from 'dayjs';

const App = () => {
  return (
    <TimePicker
      format="HH:mm"
      defaultValue={dayjs('09:24', 'HH:mm')}
      style={{ width: 130, }}
    />
  );
};

export default App;
```
