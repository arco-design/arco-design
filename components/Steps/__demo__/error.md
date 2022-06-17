---
order: 4
title:
  zh-CN: 步骤错误
  en-US: Steps Status
---

## zh-CN

通过指定参数 `status` 来指定错误状态。

## en-US

The error status is specified by the parameter `status`.

```js
import { Steps } from '@arco-design/web-react';
const Step = Steps.Step;

const App = () => {
  return (
    <Steps current={2} status="error" style={{ maxWidth: 780, marginBottom: 40 }}>
      <Step title="Succeeded" description="This is a description" />
      <Step title="Processing" description="This is a description" />
      <Step title="Pending" description="This is a description" />
    </Steps>
  );
};

export default App;
```
