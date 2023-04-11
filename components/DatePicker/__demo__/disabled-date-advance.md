---
order: 11
title:
  zh-CN: 动态控制选取范围
  en-US: Dynamic control range
---

## zh-CN

根据选择的值来控制选取的范围，使用 `onSelect` 配合 `disabledDate` 来实现。如果设置了 `showTime` 需要将比较维度转化为 `day`。

## en-US

According to the selected value to control the selected range, use `onSelect` and `disabledDate`. If `showTime` is set, the comparison dimension needs to be converted to `day`.

```js
import { useState } from 'react';
import { DatePicker, Space } from '@arco-design/web-react';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

function App() {
  const [dates, setDates] = useState([]);
  const [timeDates, setTimeDates] = useState([]);

  return (
    <Space size={24} direction="vertical">
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

      <RangePicker
        showTime
        style={{ width: 400 }}
        onSelect={(valueString, value) => {
          setTimeDates(value);
        }}
        onVisibleChange={(visible) => {
          if (!visible) {
            setTimeDates([]);
          }
        }}
        disabledDate={(current) => {
          if (timeDates && timeDates.length) {
            const tooLate =
              timeDates[0] && Math.abs(current.diff(timeDates[0].startOf('day'), 'day')) > 7;
            const tooEarly =
              timeDates[1] && Math.abs(timeDates[1].endOf('day').diff(current, 'day')) > 7;
            return tooEarly || tooLate;
          }
          return false;
        }}
        clearRangeOnReselect
      />
    </Space>
  );
}

export default App;
```
