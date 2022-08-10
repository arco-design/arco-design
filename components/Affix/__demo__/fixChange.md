---
order: 3
title:
  zh-CN: 固定状态改变回调
  en-US: Callback
---

## zh-CN

当固定状态发生改变时，会触发事件。

## en-US

Callback when the fixed state changes.

```js
import { Affix, Button, Message } from '@arco-design/web-react';

const App = () => {
  return (
    <Affix
      offsetBottom={80}
      onChange={(fixed) => {
        Message.info({
          content: `${fixed}`,
          showIcon: true,
        });
      }}
    >
      <Button type="primary">80px to affix bottom</Button>
    </Affix>
  );
};

export default App;
```
