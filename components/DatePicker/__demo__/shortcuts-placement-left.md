---
order: 10
title:
  zh-CN: 定制预设范围位置
  en-US: Custom shortcuts position
---

## zh-CN

使用 `shortcutsPlacementLeft` 可以将预设时间快捷选择放到左边。

## en-US

Use `shortcutsPlacementLeft` to place the shortcuts to the left.

```js
import { DatePicker } from '@arco-design/web-react';
import dayjs from 'dayjs';

const App = () => {
  return (
    <div>
      <DatePicker
        style={{ width: 254, marginBottom: 20 }}
        shortcutsPlacementLeft
        shortcuts={[
          {
            text: 'yesterday',
            value: () => dayjs().subtract(1, 'day'),
          },
          {
            text: 'today',
            value: () => dayjs(),
          },
          {
            text: 'a week later',
            value: () => dayjs().add(1, 'week'),
          },
          {
            text: 'a month later',
            value: () => dayjs().add(1, 'month'),
          },
          {
            text: '2 months later',
            value: () => dayjs().add(2, 'month'),
          },
        ]}
      />
      <br />
      <DatePicker.RangePicker
        style={{ width: 300 }}
        shortcutsPlacementLeft
        shortcuts={[
          {
            text: 'next 2 days',
            value: () => [dayjs(), dayjs().add(2, 'day')],
          },
          {
            text: 'next 7 days',
            value: () => [dayjs(), dayjs().add(1, 'week')],
          },
          {
            text: 'next 30 days',
            value: () => [dayjs(), dayjs().add(1, 'month')],
          },
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
