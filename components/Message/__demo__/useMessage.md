---
order: 8
title:
  zh-CN: Hooks-用法
  en-US: Hooks - Usage
---

## zh-CN

可以通过 `useMessage`**(2.40.0)** 去创建可以读取 context 的对话框。

但是通过 `useMessage` 渲染的 `message` 挂载在 `contextHolder` 所在位置。无法通过 `getContainer()` 修改容器。

## en-US

You can use `useMessage` to create a dialog that can read the context.

But the `message` rendered by `useMessage` is mounted where the `contextHolder` is. The container cannot be modified via `getContainer()`.



```js
import React, { createContext } from 'react';
import { Message, Button, Space } from '@arco-design/web-react';

const App = () => {
  const [message, contextHolder] = Message.useMessage();
  const ConfigContext = createContext({});

  const config = {
    content: <ConfigContext.Consumer>{(name) => `Current user: ${name}`}</ConfigContext.Consumer>,
  };

  return (
    <ConfigContext.Provider value="PJY">
      <div className="demo-holder-wrapper">
        {/* message 挂载在此容器内 */}
        {contextHolder}
      </div>
      <Space size="large">
        <Button onClick={() => message.info?.(config)} type="primary">
          Info
        </Button>
        <Button onClick={() => message.success?.(config)} type="primary" status="success">
          Success
        </Button>
        <Button onClick={() => message.warning?.(config)} type="primary" status="warning">
          Warning
        </Button>
        <Button onClick={() => message.error?.(config)} type="primary" status="danger">
          Error
        </Button>
        <Button onClick={() => message.normal?.(config)} type="secondary">
          Normal
        </Button>
      </Space>
    </ConfigContext.Provider>
  );
};

export default App;
```

```css
.demo-holder-wrapper .arco-message-wrapper {
  left: 0px;
}
```
