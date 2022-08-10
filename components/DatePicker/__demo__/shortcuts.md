---
order: 9
title:
  zh-CN: 预设时间快捷选择
  en-US: Shortcuts
---

## zh-CN

使用 `shortcuts` 可以预设时间快捷选择。

## en-US

Use `shortcuts` to preset time for quick selection.

```js
import { DatePicker } from '@arco-design/web-react';
import dayjs from 'dayjs';
const { MonthPicker, RangePicker } = DatePicker;

const App = () => {
  return (
    <div>
      <DatePicker
        style={{ width: 200, marginBottom: 24, marginRight: 24 }}
        shortcuts={[
          {
            text: 'a month later',
            value: () => dayjs().add(1, 'month'),
          },
        ]}
        showTime
      />
      <MonthPicker
        style={{ width: 200, marginBottom: 24, marginRight: 24 }}
        shortcuts={[
          {
            text: 'last month',
            value: () => dayjs().subtract(1, 'month'),
          },
          {
            text: 'six months later',
            value: () => dayjs().add(6, 'month'),
          },
          {
            text: 'two years later',
            value: () => dayjs().add(2, 'year'),
          },
        ]}
      />
      <RangePicker
        style={{ width: 280, marginBottom: 24, marginRight: 24 }}
        shortcuts={[
          {
            text: 'next 7 days',
            value: () => [dayjs(), dayjs().add(1, 'week')],
          },
          {
            text: 'next 30 days',
            value: () => [dayjs(), dayjs().add(1, 'month')],
          },
          {
            text: 'next 365 days',
            value: () => [dayjs(), dayjs().add(1, 'year')],
          },
        ]}
      />
      <RangePicker
        style={{ width: 240, marginBottom: 24 }}
        mode="month"
        shortcuts={[
          {
            text: 'next 6 months',
            value: () => [dayjs(), dayjs().add(6, 'month')],
          },
          {
            text: 'next 12 months',
            value: () => [dayjs(), dayjs().add(1, 'year')],
          },
          {
            text: 'next 10 years',
            value: () => [dayjs(), dayjs().add(10, 'year')],
          },
        ]}
      />
    </div>
  );
};

export default App;
```
