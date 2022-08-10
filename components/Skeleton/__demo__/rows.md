---
order: 1
title: 
  zh-CN: 文本行数和宽度
  en-US: Use in Paragraph
---

## zh-CN

设置文本行数及文本宽度。

## en-US

Set the number of text lines and text width.

```js
import { Skeleton } from '@arco-design/web-react';

const App = () => {
  return (
    <Skeleton
      text={{
        rows: 3,
        width: ['100%', 600, 400],
      }}
      image
    ></Skeleton>
  );
};

export default App;
```
