---
order: 4
title:
  zh-CN: 自定义icon
  en-US: Customize icon
---

## zh-CN

自定义图标。

## en-US

Customize icon.

```js
import { Popconfirm, Message, Button, Space } from '@arco-design/web-react';
import { IconFaceSmileFill } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size={24}>
      <Popconfirm
        focusLock
        title="Are you sure you want to delete?"
        icon={<IconFaceSmileFill style={{ color: '#0057fe' }} />}
        onOk={() => {
          Message.info({
            content: 'ok',
          });
        }}
        onCancel={() => {
          Message.error({
            content: 'cancel',
          });
        }}
      >
        <Button>Delete</Button>
      </Popconfirm>
      <Popconfirm
        icon={null}
        title="Are you sure you want to delete?"
        onOk={() => {
          Message.info({
            content: 'ok',
          });
        }}
        onCancel={() => {
          Message.error({
            content: 'cancel',
          });
        }}
      >
        <Button>Delete</Button>
      </Popconfirm>
    </Space>
  );
};

export default App;
```
