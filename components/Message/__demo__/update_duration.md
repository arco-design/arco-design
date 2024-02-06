---
order: 4
title:
  zh-CN: 更新延时
  en-US: Update duration
---

## zh-CN

通过指定 `id`，可以更新已经存在的全局提示的`duration` 属性。

## en-US

By specifying the `id`, the `duration` attribute of the existing Message can be updated.

```js
import { Message, Button } from '@arco-design/web-react';

function updateMessage() {
  Message.loading({
    id: 'need_update',
    content: 'Will update after 2 seconds...',
    duration: 3000,
  });
  setTimeout(() => {
    Message.success({
      id: 'need_update',
      content: 'Will update after 3 seconds!',
      duration: 3000,
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
