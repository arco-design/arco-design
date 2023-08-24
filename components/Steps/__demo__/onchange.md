---
order: 11
title:
  zh-CN: 可点击切换步骤
  en-US: Click to Switch Steps
---

## zh-CN

设置 `onChange` 之后，步骤条支持点击切换步骤。

## en-US

After setting `onChange`, the step bar supports clicking to switch steps.

```js
import { useState } from 'react';
import { Steps } from '@arco-design/web-react';
const Step = Steps.Step;

function App() {
  const [current, setCurrent] = useState(1);
  return (
    <div>
      <Steps type="arrow" current={current} onChange={setCurrent} style={{ marginBottom: 20 }}>
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
      <Steps current={current} onChange={setCurrent} direction="vertical">
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  );
}

export default App;
```
