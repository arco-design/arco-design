---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

基本用法，不设置固定位置时，当页面滚动元素不可见时，元素固定在页面最顶部。

## en-US

Basic usage. If the fixed position is not set, the element will be fixed at the top of the page when it scrolls outside the page.

```js
import { Affix, Button } from '@arco-design/web-react';

const App = () => {
  return (
    <Affix>
      <Button type="primary">Affix Top</Button>
    </Affix>
  );
};

export default App;
```
