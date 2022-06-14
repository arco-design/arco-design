---
order: 8
title: 
  zh-CN: 内部卡片
  en-US: Inner card
---

## zh-CN

卡片中可以嵌套其他卡片组件。

## en-US

Other card components can be nested in the card.

```js
import { Card, Link } from '@arco-design/web-react';

const App = () => {
  return (
    <Card title="Arco Card">
      <Card
        style={{ marginBottom: 20 }}
        title="Inner Card Title"
        extra={<Link>More</Link>}
      >
        Inner Card Content
      </Card>
      <Card title="Inner Card Title" extra={<Link>More</Link>}>
        Inner Card Content
      </Card>
    </Card>
  );
};

export default App;
```
