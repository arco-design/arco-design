---
order: 6
title:
  zh-CN: 局部修改 Message 配置
  en-US: local settings Message config
---

## zh-CN

通过 `ConfigProvider` 设置的 `prefixCls` 和 `rtl` 默认会作用在所有的 `Message` 和 `Notification` 上

如果希望能只在 `ConfigProvider` 内部作用，需要结合 `useMessage` 或者  `useNotification` 使用，并且关闭 `effectGlobalNotice`

**此功能在2.40.0支持**

## en-US

`prefixCls` and `rtl` set by `ConfigProvider` will be applied to all `Message` and `Notification` by default

If you want to work only inside `ConfigProvider`, you need to use it in combination with `useMessage` or `useNotification`, and turn off `effectGlobalNotice`

**This is supported in 2.40.0**

```js
import React, { useState } from 'react';
import { Button, Message, Space, ConfigProvider, Notification, Typography } from '@arco-design/web-react';

function App() {
  const [message, messageHolder] = Message.useMessage();
  const [notification, notificationHolder] = Notification.useNotification();

  return (
    <Space direction="vertical" size={20}>
      <ConfigProvider rtl effectGlobalNotice={false}>
        <Typography.Title heading={6}> 局部 RTL 视图</Typography.Title>
        <div className="demo-holder-wrapper">
          {messageHolder}
          {notificationHolder}
        </div>
        <Space>
          <Button
            onClick={() => {
              message.info && message.info('This is an info message!');
            }}
            type="primary"
          >
            Open Message
          </Button>
          <Button
            onClick={() => {
            notification.info && notification.info({
                closable: true,
                title: 'Notification',
                content: 'This is a notification!',
              });
            }}
            type="primary"
          >
            Open Notification
          </Button>
        </Space>
      </ConfigProvider>
      <div>
        <Typography.Title heading={6}> 正常视图 </Typography.Title>
        <Space>
          <Button
            onClick={() => {
              Message.info('This is an info message!');
            }}
          >
            Open Message
          </Button>

          <Button
            onClick={() => {
              Notification.info({
                closable: true,
                title: 'Notification',
                content: 'This is a notification!',
              });
            }}
          >
            Open Notification
          </Button>
        </Space>
      </div>
    </Space>
  );
}

export default App;
```

```css
.demo-holder-wrapper .arco-message-wrapper {
  left: 0;
}
```
