---
order: 4
title:
  zh-CN: 支持清除
  en-US: Allow Clear
---

## zh-CN

指定 `allowClear` 来允许清除评分。

## en-US

Specify `allowClear` to allow clearing of ratings.

指定 `allowClear` 来允许清除评分。

```js
import { Rate, Typography } from '@arco-design/web-react';

const App = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <Rate defaultValue={5} allowClear />
        <Typography.Text style={{ margin: '0 16px' }}>allowClear: true</Typography.Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Rate defaultValue={5} />
        <Typography.Text style={{ margin: '0 16px' }}>allowClear: false</Typography.Text>
      </div>
    </>
  );
};

export default App;
```
