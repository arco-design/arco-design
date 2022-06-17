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
import { Card, Link } from '@arco-design/web-react';

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        padding: 40,
        backgroundColor: 'var(--color-fill-2)',
      }}
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
        style={{ width: 360, marginLeft: 24 }}
        title="Hover me"
        hoverable
        extra={<Link>More</Link>}
        bordered={false}
      >
        Card content
        <br />
        Card content
      </Card>
    </div>
  );
};

export default App;
```
