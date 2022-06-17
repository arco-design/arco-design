---
order: 7
title:
  zh-CN: 禁用部分时间选项
  en-US: Disable partial time option
---

## zh-CN

通过设置 `disabledHours` `disabledMinutes` `disabledSeconds`，可以禁用 时 / 分 / 秒的部分选项。

## en-US

By setting `disabledHours` `disabledMinutes` `disabledSeconds`, you can disable some options of hour/minute/second.

```js
import { TimePicker } from '@arco-design/web-react';
const style = {
  width: 194,
  margin: '0 24px 24px 0',
};

const App = () => {
  return (
    <div>
      <TimePicker
        style={style}
        disabledHours={() => [1, 2, 4, 14]}
        disabledMinutes={() => [1, 2, 3, 4, 14, 15, 16, 20, 50]}
        disabledSeconds={() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]}
      />
      <TimePicker.RangePicker
        style={{ ...style, width: 252 }}
        disabledHours={() => [1, 2, 4, 14]}
        disabledMinutes={() => [1, 2, 3, 4, 14, 15, 16, 20, 50]}
        disabledSeconds={() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]}
      />
    </div>
  );
};

export default App;
```
