---
order: 3
title:
  zh-CN: 悬浮状态样式
  en-US: Hoverable
---

## zh-CN

可以通过 `hoverable` 属性设置是否在悬浮状态时隐藏底色。

## en-US

You can use the `hoverable` property to set whether to hide the background color of the Link component when it is hovering.

```js
import { Link, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size={40}>
      <Link hoverable={false}> Link </Link>
      <Link hoverable={false} status="error">
        Link
      </Link>
    </Space>
  );
};

export default App;
```
