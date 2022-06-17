---
order: 1
title:
  zh-CN: 小型步骤条
  en-US: Small Step Bar
---

## zh-CN

通过`size`属性可以设置展示小型步骤条

## en-US

Small step bar can be displayed through `size`

```js
import { Steps, Divider } from '@arco-design/web-react';
const Step = Steps.Step;

const App = () => {
  return (
    <div>
      <Steps current={2} style={{ maxWidth: 780, margin: '0 auto' }} size="small">
        <Step title="Succeeded" />
        <Step title="Processing" />
        <Step title="Pending" />
      </Steps>
      <Divider />
      <div
        style={{
          lineHeight: '140px',
          textAlign: 'center',
          color: '#C9CDD4',
        }}
      >
        Step 2 Content
      </div>
    </div>
  );
};

export default App;
```
