---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

最基础的用法。

## en-US

The simplest usage.

```js
import { Popconfirm, Message, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Popconfirm
        focusLock
        title="Confirm"
        content="Are you sure you want to delete?"
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
    </div>
  );
};

export default App;
```
