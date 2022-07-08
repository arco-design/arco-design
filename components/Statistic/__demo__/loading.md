---
order: 5
title:
  zh-CN: 加载中
  en-US: Loading
---

## zh-CN

通过 `loading` 可以控制是否显示加载中状态。

## en-US

You can control whether to display the loading status through `loading`.

```js
import { useState } from 'react';
import { Statistic, Switch, Typography } from '@arco-design/web-react';

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Switch checked={loading} onChange={setLoading} />
        <Typography.Text style={{ margin: '0 10px' }}>Loading</Typography.Text>
      </div>
      <Statistic title="Downloads" value={125670} groupSeparator loading={loading} />
    </div>
  );
}

export default App;
```
