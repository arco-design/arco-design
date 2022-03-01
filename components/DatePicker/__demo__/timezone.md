---
order: 19
title:
  zh-CN: 设置时区
  en-US: Timezone
---

## zh-CN

通过 `timezone` 设置时区。

## en-US

Set timezone.

```js
import { useState } from 'react';
import { Select, DatePicker, Space, Alert, Typography } from '@arco-design/web-react';

const zoneList = [{
  label: 'America/Los_Angeles (GMT -08:00)',
  value: -8,
}, {
  label: 'Europe/London (GMT +00:00)',
  value: 0,
}, {
  label: 'Africa/Cairo (GMT +02:00)',
  value: 2,
}, {
  label: 'Asia/Shanghai (GMT +08:00)',
  value: 8,
}];

const defaultValue = new Date('2022-02-22');

function Demo() {
  const [utcOffset, setUtcOffset] = useState(8);
  const [value, setValue] = useState(defaultValue);

  return <Space direction="vertical">
    <Space>
      <Select
        defaultValue={utcOffset}
        options={zoneList}
        onChange={(offset) => setUtcOffset(offset)}
        triggerProps={{
          autoAlignPopupWidth: false,
          position: 'bl',
        }}
      />
      <DatePicker
        showTime
        utcOffset={utcOffset}
        defaultValue={new Date('2022-02-22')}
        onChange={(v, vd) => setValue(vd && vd.toDate())}
      />
    </Space>
    <Alert
      showIcon={false}
      content={
        <Space direction="vertical">
          <div><Typography.Text bold>Locale String:</Typography.Text> {value.toLocaleString()}</div>
          <div><Typography.Text bold>ISO String:</Typography.Text> {value.toISOString()}</div>
          <div><Typography.Text bold>Timestamp:</Typography.Text> {value.valueOf()}</div>
        </Space>
      }
    />
  </Space>;
}

ReactDOM.render(<Demo />, CONTAINER);
```
