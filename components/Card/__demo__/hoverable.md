---
order: 1
title: 
  zh-CN: 鼠标悬浮样式
  en-US: Hoverable
---

## zh-CN

指定 `hoverable` 来为卡片添加鼠标悬浮样式，同时你可以通过样式覆盖来自定义悬浮样式。

## en-US

Use `hoverable` to add a hover style to the card. The hover style can also be customized through style override.

```js
import { Card, Link, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space>
      <Card
        style={{ width: 360 }}
        title="Arco Card"
        hoverable
        extra={<Link>More</Link>}
      >
        Card content
        <br />
        Card content
      </Card>
      <Card
        style={{ width: 360 }}
        className="card-custom-hover-style"
        title="Custom hover style"
        hoverable
        extra={<Link>More</Link>}
      >
        Card content <br /> Card content
      </Card>
    </Space>
  );
};

export default App;
```

```css
.card-custom-hover-style {
  transition-property: all;
}

.card-custom-hover-style:hover {
  transform: translateY(-4px);
}
```
