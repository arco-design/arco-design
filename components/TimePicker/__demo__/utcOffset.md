---
order: 12
title:
  zh-CN: UTC 时间
  en-US: UTC
---

## zh-CN

通过 `utcOffset` 字段设置 UTC 时间。

## en-US

Use `utcOffset` to set the UTC time.

```js
import { useState } from 'react';
import { TimePicker, Space, Select, Typography, Alert } from '@arco-design/web-react';


const utcList = [];
const utcLength = 25;
let uo = -12;
for (let i = 0; i < 25; i++) {
  utcList[i] = {
    label: `UTC ${uo ? (uo > 0 ? `+${uo}` : uo): ''}`,
    value: uo++
  };
}

const defaultValue = new Date('2022-02-22');

function Demo() {
  const [utcOffset, setUtcOffset] = useState(0);
  const [value, setValue] = useState(defaultValue);

  return <Space direction="vertical">
    <Space>
      <Select
        defaultValue={utcOffset}
        options={utcList}
        onChange={(offset) => setUtcOffset(offset)}
        triggerProps={{
          autoAlignPopupWidth: false,
          position: 'bl',
        }}
      />
      <TimePicker
        showTime
        utcOffset={utcOffset}
        defaultValue={defaultValue}
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
