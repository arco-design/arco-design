---
order: 0
title:
  zh-CN: Success
  en-US: Success
---

## zh-CN

展示成功状态。

## en-US

Show successful results.

```js
import { Result, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Result
        status="success"
        title="Success message"
        subTitle="This is a success description."
        extra={[
          <Button key="again" type="secondary" style={{ margin: '0 16px' }}>
            Again
          </Button>,
          <Button key="back" type="primary">
            Back
          </Button>,
        ]}
      ></Result>
    </div>
  );
};

export default App;
```
