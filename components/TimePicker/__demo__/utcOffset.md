---
order: 12
title:
  zh-CN: UTC 时间
  en-US: UTC
---

## zh-CN

通过 `utcOffset` 字段设置 UTC 时间。

**注意：使用 UTC 或者时区时间，传值的时候要用 timestamp 或者 Date 对象，使用字符串不能表示唯一时间，会造成困扰。**

## en-US

Use `utcOffset` to set the UTC time.

**Note: When using UTC or time zonetime, use timestamp or Date object when passing value. Strings cannot represent unique time, which will cause trouble.**

```js
import { useState } from 'react';
import { TimePicker, Space, Select, Typography, Alert } from '@arco-design/web-react';
const utcList = [];
const utcLength = 25;
let uo = -12;

for (let i = 0; i < 25; i++) {
  utcList[i] = {
    label: `UTC ${uo ? (uo > 0 ? `+${uo}` : uo) : ''}`,
    value: uo++,
  };
}

function App() {
  const [utcOffset, setUtcOffset] = useState(0);
  const [value, setValue] = useState(new Date('2022-02-22'));
  return (
    <Space direction="vertical">
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
          utcOffset={utcOffset}
          value={value}
          onChange={(v, vd) => setValue(vd && vd.toDate())}
        />
      </Space>
      <Alert
        showIcon={false}
        content={
          <Space direction="vertical">
            <div>
              <Typography.Text bold>Locale String:</Typography.Text> {value.toLocaleString('en-US')}
            </div>
            <div>
              <Typography.Text bold>ISO String:</Typography.Text> {value.toISOString()}
            </div>
            <div>
              <Typography.Text bold>Timestamp:</Typography.Text> {value.valueOf()}
            </div>
          </Space>
        }
      />
    </Space>
  );
}

export default App;
```
