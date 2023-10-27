---
order: 1
title:
  zh-CN: 不同状态
  en-US: Status
---

## zh-CN

禁用状态、错误状态

## en-US

Disabled Status、 Error status

```js
import { VerificationCode, Space, Typography } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Space>
        <div style={{width: 80}}>
          <Typography.Text >Disabled</Typography.Text>
        </div>
        <VerificationCode defaultValue={'123456'} disabled style={{width: 300}}/>
      </Space>
      <br/>
      <br/>
      <Space>
        <div style={{width: 80}}>
          <Typography.Text>ReadOnly</Typography.Text>
        </div>
        <VerificationCode defaultValue={'123456'} readOnly style={{width: 300}}/>
      </Space>
      <br/>
      <br/>
      <Space>
        <div style={{width: 80}}>
          <Typography.Text>Error</Typography.Text>
        </div>
        <VerificationCode status="error" style={{width: 300}}/>
      </Space>
    </div>
  );
};

export default App;
```
