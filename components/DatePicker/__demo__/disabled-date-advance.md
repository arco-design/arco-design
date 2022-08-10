---
order: 11
title:
  zh-CN: 动态控制选取范围
  en-US: Dynamic control range
---

## zh-CN

根据选择的值来控制选取的范围，使用 `onSelect` 配合 `disabledDate` 来实现。

## en-US

According to the selected value to control the selected range, use `onSelect` and `disabledDate`.

```js
import { useState } from 'react';
import { DatePicker } from '@arco-design/web-react';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

function App() {
  const [dates, setDates] = useState([]);
  return (
    <RangePicker
      style={{ width: 300 }}
      onSelect={(valueString, value) => {
        setDates(value);
      }}
      onVisibleChange={(visible) => {
        if (!visible) {
          setDates([]);
        }
      }}
      disabledDate={(current) => {
        if (dates && dates.length) {
          const tooLate = dates[0] && Math.abs(current.diff(dates[0], 'day')) > 7;
          const tooEarly = dates[1] && Math.abs(dates[1].diff(current, 'day')) > 7;
          return tooEarly || tooLate;
        }

        return false;
      }}
      clearRangeOnReselect
    />
  );
}

export default App;
```
