---
order: 7
title:
  zh-CN: 迷你箭头步骤条
  en-US: Mini Arrow Step Bar
---

## zh-CN

指定 `type: 'arrow', size: 'small'`， 可以使用迷你箭头类型的步骤条。仅支持水平步骤条。`description` 会被忽略。

## en-US

By specifying `type:'arrow', size:'small'`, you can use mini-arrow type step bar. However, only horizontal step bar are supported. And `description` will be ignored.

```js
import { Steps } from '@arco-design/web-react';
const Step = Steps.Step;

const App = () => {
  return (
    <div>
      <Steps type="arrow" size="small" current={2} style={{ maxWidth: 780, marginBottom: 20 }}>
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
      </Steps>
      <Steps type="arrow" size="small" status="error" current={2} style={{ maxWidth: 780 }}>
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
      </Steps>
    </div>
  );
};

export default App;
```
