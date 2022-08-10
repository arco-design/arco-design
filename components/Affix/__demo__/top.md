---
order: 1
title:
  zh-CN: 顶部固定
  en-US: Fixed Top
---

## zh-CN

元素向上滚动到距顶部一定距离时固定。

## en-US

The element will be fixed when it scrolls down to a certain distance from the top of the viewport.

```js
import { Affix, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <Affix offsetTop={80}>
      <Button type="primary">80px to affix top</Button>
    </Affix>
  );
};

export default App;
```
