---
order: 2
title:
  zh-CN: 密码模式
  en-US: Masked
---

## zh-CN

指定 `masked = true`，可开启密码模式

## en-US

Use `masked = true` to turn on password mode

```js
import { VerificationCode, Message } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <VerificationCode
        defaultValue="123"
        masked
        style={{ width: 300 }}
        onChange={(v) => {
          console.log(v);
        }}
        onFinish={(v) => {
          Message.info('onFinish: ' + v);
        }}
      />
    </div>
  );
};


export default App;
```
