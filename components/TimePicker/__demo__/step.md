---
order: 5
title:
  zh-CN: 定制步长
  en-US: Step
---

## zh-CN

通过设置 `step`，可以定制需要显示的时、分、秒的步长。

## en-US

By setting `step`, you can customize the step length of the hour, minute, and second.

```js
import { TimePicker } from '@arco-design/web-react';

const App = () => {
  return (
    <TimePicker
      defaultValue="10:25:30"
      step={{
        hour: 2,
        minute: 5,
        second: 10,
      }}
      style={{ width: 194, }}
    />
  );
};

export default App;
```
