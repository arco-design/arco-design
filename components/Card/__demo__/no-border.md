---
order: 2
title: 
  zh-CN: 无边框卡片
  en-US: No border
---

## zh-CN

设置 `bordered` 为 `false` 来使用无边框卡片。

## en-US

Set `bordered` to `false` to use borderless cards.

```js
import { Card, Link, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space
      style={{
        padding: 40,
        backgroundColor: 'var(--color-fill-2)',
      }}
      size="large"
    >
      <Card
        style={{ width: 360 }}
        title="Arco Card"
        extra={<Link>More</Link>}
        bordered={false}
      >
        Card content
        <br />
        Card content
      </Card>
      <Card
        style={{ width: 360 }}
        title="Hover me"
        hoverable
        extra={<Link>More</Link>}
        bordered={false}
      >
        Card content
        <br />
        Card content
      </Card>
    </Space>
  );
};

export default App;
```
