---
order: 3
title:
  zh-CN: 更新全局提醒内容
  en-US: Update
---

## zh-CN

通过指定 `id`，可以更新已经存在的全局提示。

## en-US

By specifying the `id`, the existing Message can be updated.

```js
import { Message, Button } from '@arco-design/web-react';

function updateMessage() {
  Message.loading({
    id: 'need_update',
    content: 'Will update after 2 seconds...',
  });
  setTimeout(() => {
    Message.success({
      id: 'need_update',
      content: 'Update success!',
    });
  }, 2000);
}

const App = () => {
  return (
    <Button onClick={updateMessage} type="primary">
      Update message
    </Button>
  );
};

export default App;
```
