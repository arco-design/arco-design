---
order: 3
title:
  zh-CN: 异步关闭
  en-US: Delay close
---

## zh-CN

用于异步执行某些操作，等操作完成再关闭弹出框。

**用法**：返回一个 `Promise` 用于异步关闭。

## en-US

Used to perform certain operations asynchronously, and close the popup after the operation is completed.

**Usage**: Return a `Promise` for asynchronous closing.

```js
import { Popconfirm, Message, Button } from '@arco-design/web-react';

function delayClose() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      Message.info({
        content: 'ok',
      });
    }, 2000);
  });
}

const App = () => {
  return (
    <Popconfirm
      title="Are you sure you want to delete?"
      onOk={delayClose}
      onCancel={() => {
        Message.error({
          content: 'cancel',
        });
      }}
      focusLock
    >
      <Button style={{ marginRight: 20 }}>Async close</Button>
    </Popconfirm>
  );
};

export default App;
```
