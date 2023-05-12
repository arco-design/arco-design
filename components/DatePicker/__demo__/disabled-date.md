---
order: 8
title:
  zh-CN: 不可选取的时间
  en-US: disabled date
---

## zh-CN

使用 `disabledDate` 可以禁用某些日期，`2.5.0` 开始支持 `disabledTime` 禁用时间，需要配合 `showTime` 使用。

## en-US

Use `disabledDate` to disable specified dates. `2.5.0` starts to support `disabledTime` to disable time, which needs to be used with `showTime`.

```js
import { DatePicker } from '@arco-design/web-react';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

function range(start, end) {
  const result = [];

  for (let i = start; i < end; i++) {
    result.push(i);
  }

  return result;
}

function getDisabledTime(date) {
  return {
    disabledHours: () => range(6, 24),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => range(30, 60),
  };
}

function getDisabledRangeTime(date, type) {
  return {
    disabledHours: () => (type === 'start' ? range(0, 6) : range(6, 24)),
    disabledMinutes: () => (type === 'end' ? range(0, 30) : [31, 60]),
    disabledSeconds: () => range(30, 60),
  };
}

const App = () => {
  return (
    <div>
      <DatePicker
        style={{ width: 200, marginRight: 24, marginBottom: 24 }}
        disabledDate={(current) => current.isBefore(dayjs()) || current.isAfter(dayjs().add(7, 'day'))}
      />
      <RangePicker
        style={{ width: 300, marginRight: 24, marginBottom: 24 }}
        disabledDate={(current) => current.isBefore(dayjs())}
      />
      <DatePicker
        style={{ width: 200, marginRight: 24, marginBottom: 24 }}
        showTime
        disabledDate={(current) => current.isBefore(dayjs())}
        disabledTime={getDisabledTime}
      />
      <RangePicker
        style={{ width: 380, marginBottom: 24 }}
        showTime={{
          hideDisabledOptions: true,
        }}
        disabledDate={(current) => current.isBefore(dayjs())}
        disabledTime={getDisabledRangeTime}
      />
    </div>
  );
};

export default App;
```
