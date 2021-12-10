---
order: 6
title: 
  zh-CN: 异步关闭
  en-US: Close async
---

## zh-CN

如果 `onClose` 返回一个 `Promise`，可以异步关闭标签，并且在未关闭时展示加载效果。

## en-US

If `onClose` returns a `Promise`, the tag can be closed asynchronously and the loading effect will be displayed when it is not closed.

```js
import { Tag, Message } from '@arco-design/web-react';

ReactDOM.render(
  <Tag
    closable
    onClose={() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() >= 0.5) {
            resolve();
          } else {
            Message.error('Close filed');
            reject();
          }
        }, 3000);
      });
    }}
  >
    Tag 1
  </Tag>,
  CONTAINER
);
```
