---
order: 20
title:
  zh-CN: 设置时区
  en-US: Timezone
---

## zh-CN

通过 `timezone` 字段设置时区，如果设置了 `utcOffset`，以 `utcOffset` 为准。

**注意：使用 UTC 或者时区时间，传值的时候要用 timestamp 或者 Date 对象，使用字符串不能表示唯一时间，会造成困扰。**

## en-US

Use `timezone` to set timezone, if set the `utcOffset`, `utcOffset` takes effect.

**Note: When using UTC or time zonetime, use timestamp or Date object when passing value. Strings cannot represent unique time, which will cause trouble.**

```js
import { useState } from 'react';
import { DatePicker, Space, Select, Typography, Alert, Tag } from '@arco-design/web-react';

const zoneList = ['America/Los_Angeles', 'Europe/London', 'Africa/Cairo', 'Asia/Shanghai'];

const defaultValue = new Date('2022-02-22');
const defaultRangeValue = [new Date('2022-02-22 08:00:00'), new Date('2022-03-22 10:00:00')];

function Demo() {
  const [timezone, setTimezone] = useState('Asia/Shanghai');
  const [value, setValue] = useState(defaultValue);
  const [rangeValue, setRangeValue] = useState(defaultRangeValue);

  return <Space direction="vertical">
    <Space>
      <Select
        defaultValue={timezone}
        options={zoneList}
        onChange={(tz) => setTimezone(tz)}
        triggerProps={{
          autoAlignPopupWidth: false,
          position: 'bl',
        }}
      />
      <DatePicker
        showTime
        timezone={timezone}
        value={value}
        onChange={(v, vd) => setValue(vd && vd.toDate())}
      />
      <DatePicker.RangePicker
        showTime
        timezone={timezone}
        value={rangeValue}
        onChange={(v, vd) => setRangeValue(vd && vd.map(d => d.toDate()))}
      />
    </Space>
    <Alert
      showIcon={false}
      content={
        <Space direction="vertical">
          <Tag bordered color="gray">DatePicker</Tag>
          <div>
            <Typography.Text bold>Locale String:</Typography.Text>
            {value ? value.toLocaleString('en-US') : '-'}
          </div>
          <div>
            <Typography.Text bold>ISO String:</Typography.Text>
            {value ? value.toISOString() : '-'}
          </div>
          <div>
            <Typography.Text bold>Timestamp:</Typography.Text>
            {value ? value.valueOf() : '-'}
          </div>
        </Space>
      }
    />
    <Alert
      showIcon={false}
      content={
        <Space direction="vertical">
          <Tag bordered color="gray">RangePicker</Tag>
          <div>
            <Typography.Text bold>Locale String:</Typography.Text>
            {rangeValue ? rangeValue.map(v => v.toLocaleString('en-US')).join(' --- ') : '-'}
          </div>
          <div>
            <Typography.Text bold>ISO String:</Typography.Text>
            {rangeValue ? rangeValue.map(v => v.toISOString()).join(' --- ') : '-'}
          </div>
          <div>
            <Typography.Text bold>Timestamp:</Typography.Text>
            {rangeValue ? rangeValue.map(v => v.valueOf()).join(' --- ') : '-'}
          </div>
        </Space>
      }
    />
  </Space>;
}

ReactDOM.render(<Demo />, CONTAINER);
```
