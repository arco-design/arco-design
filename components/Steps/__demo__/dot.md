---
order: 9
title:
  zh-CN: 点状步骤条
  en-US: Dotted Step Bar
---

## zh-CN

指定 `type: 'dot'`， 可以使用点状的步骤条。
**注意**：水平步骤条的标签只可位于其下方，竖直步骤条的标签只可位于其右侧；

## en-US

By specifying `type: 'dot'`, you can use dotted step bar.
**Note**: The label of the horizontal step bar can only be located below it, and the label of the vertical step bar can only be located to the right of it

```js
import { Steps } from '@arco-design/web-react';
const Step = Steps.Step;

const App = () => {
  return (
    <div>
      <Steps type="dot" current={2} style={{ maxWidth: 780, marginBottom: 40 }}>
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
      <Steps type="dot" direction="vertical" current={2} style={{ maxWidth: 780 }}>
        <Step title="Succeeded" description="This is a description" />
        <Step title="Processing" description="This is a description" />
        <Step title="Pending" description="This is a description" />
      </Steps>
    </div>
  );
};

export default App;
```
