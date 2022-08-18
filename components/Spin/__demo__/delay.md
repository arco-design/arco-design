---
order: 4
title:
  zh-CN: 延迟
  en-US: Delay
---

## zh-CN

通过 `delay` 延迟显示 loading，对状态切换进行防抖处理，有效避免状态快速切换时的屏幕闪烁。

## en-US

Use `delay` to delay the switch of loading status, which effectively avoids screen flicker during rapid state switching.

```js
import { useState } from 'react';
import { Spin, Card, Button } from '@arco-design/web-react';

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Button style={{ display: 'block', marginBottom: 24 }} onClick={() => setLoading(!loading)}>
        {`Loading: ${loading}`}
      </Button>
      <Spin delay={500} loading={loading}>
        <Card
          style={{ width: 360 }}
          title="Delay 500ms"
          extra={
            <a href="#" style={{ color: '#165DFF', textDecoration: 'none' }}>
              More
            </a>
          }
        >
          ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
          the world. Toutiao started out as a news recommendation engine and gradually evolved into
          a platform delivering content in various formats.
        </Card>
      </Spin>
    </>
  );
}

export default App;
```
