---
order: 5
title: 
  zh-CN: 消息提示
  en-US: Message Modal Dialog
---

## zh-CN

有 `info`, `success`, `warning`, `error` 四种类型的消息提示，仅提供一个确认按钮用于关闭消息提示对话框。

## en-US

There are four types of message modal dialog: `info`, `success`, `warning`, and `error`. Only a button is provided to close message modal dialog.

```js
import { Modal, Button, Space } from '@arco-design/web-react';

function info() {
  Modal.info({
    title: 'Info Notification',
    content:
      'This is an info description which directly indicates a neutral informative change or action. (e.g., "We are providing new services for all developers.") ',
  });
}

function success() {
  Modal.success({
    title: 'This is a success notification',
  });
}

function warning() {
  Modal.warning({
    title: 'Warning Notification',
    content:
      'This is a warning description which directly indicates a warning that might need attention. (e.g., "Invalid request, please contact admininstration.")',
  });
}

function error() {
  Modal.error({
    title: 'Error Notification',
    content:
      'This is an error description which directly indicates a dangerous or potentially negative action. (e.g., "It’s a invalid request.")',
  });
}

const App = () => {
  return (
    <Space size="large">
      <Button type="primary" onClick={info}>
        Info
      </Button>
      <Button type="primary" status="success" onClick={success}>
        Success
      </Button>
      <Button type="primary" status="warning" onClick={warning}>
        Warning
      </Button>
      <Button type="primary" status="danger" onClick={error}>
        Error
      </Button>
    </Space>
  );
};

export default App;
```
