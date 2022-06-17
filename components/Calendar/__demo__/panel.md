---
order: 3
title:
  zh-CN: 卡片日历
  en-US: Card Calendar
---

## zh-CN

设置 `panel=true`，可以使用卡片日历。

## en-US

Use `panel=true` to display date in card format.

```js
import { Calendar } from '@arco-design/web-react';
import dayjs from 'dayjs';

const App = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'start' }}>
      <Calendar
        panel
        defaultValue={dayjs('2020-04-01')}
        panelTodayBtn
        style={{ marginRight: 50 }}
        onChange={(a) => console.log(a)}
      />
      <Calendar panel defaultValue="2020-03" mode="year" />
    </div>
  );
};

export default App;
```
