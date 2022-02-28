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
import { DatePicker, Typography, Space } from '@arco-design/web-react';

function Demo() {
  return <Space direction="vertical">
    <Typography.Title heading={5}>Asia/Shanghai</Typography.Title>
    <DatePicker showTime />
    <Typography.Title heading={5}>America/New_York</Typography.Title>
    <DatePicker showTime timezone="America/New_York" />
    <Typography.Title heading={5}>Europe/London</Typography.Title>
    <DatePicker showTime timezone="Europe/London" />
  </Space>
}

ReactDOM.render(<Demo />, CONTAINER);
```
