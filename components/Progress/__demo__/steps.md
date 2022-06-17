---
order: 6
title:
  zh-CN: 步骤进度条
  en-US: steps
---

## zh-CN

可以通过设置 `steps` 展示步骤进度条

## en-US

Steps progress will be displayed if you set steps property.

```js
import { Progress } from '@arco-design/web-react';

function Demo() {
  return (
    <div
      style={{
        display: 'inline-block',
        width: '40%',
        marginRight: '10%',
      }}
    >
      <Progress steps={3} percent={30} style={{ marginBottom: 20 }} />
      <Progress steps={5} percent={100} status="warning" style={{ marginBottom: 20 }} />
      <Progress steps={5} size="small" percent={50} status="success" />
    </div>
  );
}

const App = () => {
  return <Demo />;
};

export default App;
```
