---
order: 2
title:
  zh-CN: 图标
  en-US: Icon
---

## zh-CN
通过 `Icon` 属性设置带图标的链接，设置为 `true`时候显示默认图标。

## en-US

Customize icon node. If true, the default icon will be displayed.

```js
import { Link, Space } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size={0} direction="vertical">
      <Space size="large">
        <Link href="#" icon>
          Hyperlinks
        </Link>
        <Link href="#" icon disabled>
          Hyperlinks
        </Link>
      </Space>
      <Space size="large">
        <Link href="#" icon={<IconEdit />}>
          Hyperlinks
        </Link>
        <Link href="#" icon={<IconEdit />} disabled>
          Hyperlinks
        </Link>
      </Space>
    </Space>
  );
};

export default App;
```
