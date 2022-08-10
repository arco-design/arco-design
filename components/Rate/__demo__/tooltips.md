---
order: 8
title:
  zh-CN: 显示提示信息
  en-US: Tooltips
---

## zh-CN

通过 `tooltips` 来为每一个评级提供鼠标悬浮时的提示信息。

## en-US

Use `tooltips` to provide hint information for each rating when the mouse is hovering.

```js
import { Rate } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Rate tooltips={['😠', '🙂', '😊', '😘', '😍']} />
    </div>
  );
};

export default App;
```
