---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

与按钮相比，链接不太突出，因此通常将其用作可选操作。

## en-US

A link text.

```js
import { Link, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size={40}>
      <Link href="#"> Link </Link>
      <Link href="#" disabled>
        Link
      </Link>
    </Space>
  );
};

export default App;
```
