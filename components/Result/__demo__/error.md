---
order: 3
title:
  zh-CN: Error
  en-US: Error
---

## zh-CN

错误状态。

## en-US

Show failed results.

```js
import { Result, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Result
        status="error"
        title="Error message"
        subTitle="Something went wrong. Please try again. "
        extra={[
          <Button key="again" style={{ margin: '0 16px' }}>
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
