---
order: 8
title:
  zh-CN: 完整功能
  en-US: All features
---

## zh-CN

体现全部功能。

## en-US

All features.

```js
import { Result, Button, Typography } from '@arco-design/web-react';
import { IconFaceFrownFill } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <div>
      <Result
        status="error"
        icon={<IconFaceFrownFill />}
        title="No internet"
        subTitle="DNS_PROBE_FINISHED_NO_INTERNET"
        extra={<Button type="primary">Refresh</Button>}
      >
        <Typography
          className="result-content"
          style={{ background: 'var(--color-fill-2)', padding: 24 }}
        >
          <Typography.Paragraph>Try:</Typography.Paragraph>
          <ul>
            <li> Checking the network cables, modem, and router </li>
            <li> Reconnecting to Wi-Fi </li>
          </ul>
        </Typography>
      </Result>
    </div>
  );
};

export default App;
```
