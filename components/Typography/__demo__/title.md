---
order: 1
title:
  zh-CN: 标题
  en-US: Title
---

## zh-CN

展示不同级别的标题。

## en-US

Show titles of different levels.

```js
import { Typography } from '@arco-design/web-react';

const App = () => {
  return (
    <Typography>
      <Typography.Title>H1. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={2}>H2. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={3}>H3. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={4}>H4. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={5}>H5. The Pragmatic Romanticism</Typography.Title>
      <Typography.Title heading={6}>H6. The Pragmatic Romanticism</Typography.Title>
    </Typography>
  );
};

export default App;
```
