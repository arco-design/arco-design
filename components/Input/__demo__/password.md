---
order: 10
title:
  zh-CN: 密码输入
  en-US: Password
---

## zh-CN

用于密码的输入。

## en-US

Used for password input.

```js
import { Input, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space wrap>
      <Input.Password defaultValue="password" style={{ width: 350 }} />
      <Input.Password
        defaultValue="password"
        defaultVisibility={true}
        placeholder="Please enter ..."
        style={{ width: 350 }}
      />
    </Space>
  );
};

export default App;
```
