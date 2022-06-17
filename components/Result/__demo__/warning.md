---
order: 2
title: warning
---

## zh-CN

警告状态。

## en-US

The result of the warning.

```js
import { Result, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Result
        status="warning"
        title="There is a problem with your operation."
        extra={<Button type="primary">Back</Button>}
      ></Result>
    </div>
  );
};

export default App;
```
