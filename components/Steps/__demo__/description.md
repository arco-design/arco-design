---
order: 2
title:
  zh-CN: 展示描述信息
  en-US: Show Description
---

## zh-CN

使用 `description` 可以添加描述信息。

## en-US

Use `description` to add description information.

```js
import { Steps } from '@arco-design/web-react';
const Step = Steps.Step;

const App = () => {
  return (
    <Steps current={2} style={{ maxWidth: 780, marginBottom: 40 }}>
      <Step title="Succeeded" description="This is a description" />
      <Step title="Processing" description="This is a description" />
      <Step title="Pending" description="This is a description" />
    </Steps>
  );
};

export default App;
```
