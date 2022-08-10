---
order: 4
title:
  zh-CN: 隐藏连接线
  en-US: Hidden Connection Lines
---

## zh-CN

使用 `lineless` 可以使用无连接线模式。

## en-US

Set `lineless` to hide the connection line.

```js
import { Steps } from '@arco-design/web-react';
const Step = Steps.Step;

const App = () => {
  return (
    <Steps lineless current={2} style={{ maxWidth: 780, marginBottom: 40 }}>
      <Step title="Succeeded" description="This is a description" />
      <Step title="Processing" description="This is a description" />
      <Step title="Pending" description="This is a description" />
    </Steps>
  );
};

export default App;
```
