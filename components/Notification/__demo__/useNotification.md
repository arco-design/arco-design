---
order: 8
title:
  zh-CN: Hooks-用法
  en-US: Hooks - Usage
---

## zh-CN

可以通过 `useNotification`**(2.40.0)** 去创建可以读取 context 的对话框。

## en-US

You can use `useNotification` to create a dialog that can read the context.


```js
import React, { createContext } from 'react';
import { Notification, Button, Space, ConfigProvider } from '@arco-design/web-react';

const ConfigContext = createContext({});

const App = () => {
  const [notification, contextHolder] = Notification.useNotification();

  const config = {
    title: 'Profile',
    content: <ConfigContext.Consumer>{(name) => `Current user: ${name}`}</ConfigContext.Consumer>,
  };
  return (
    <ConfigContext.Provider value="PJY">
      {contextHolder}

      <Space size="large">
        <Button onClick={() => notification.info?.(config)} type="primary">
          Info
        </Button>
        <Button onClick={() => notification.success?.(config)} type="primary" status="success">
          Success
        </Button>
        <Button onClick={() => notification.warning?.(config)} type="primary" status="warning">
          Warning
        </Button>
        <Button onClick={() => notification.error?.(config)} type="primary" status="danger">
          Error
        </Button>
        <Button onClick={() => notification.normal?.(config)} type="secondary">
          Normal
        </Button>
      </Space>
    </ConfigContext.Provider>
  )
};

export default App;
```
