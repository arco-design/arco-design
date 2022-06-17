---
order: 4
title:
  zh-CN: 更灵活的内容展示
  en-US: Meta
---

## zh-CN

使用 `Card.Meta` 支持更加灵活的内容（封面、头像、 标题、描述信息）

## en-US

Use `Card.Meta` to support more flexible content (cover, avatar, title, description)

```js
import { Card } from '@arco-design/web-react';
const { Meta } = Card;

const App = () => {
  return (
    <Card
      hoverable
      style={{ width: 360 }}
      cover={
        <div style={{ height: 204, overflow: 'hidden' }}>
          <img
            style={{ width: '100%', transform: 'translateY(-20px)' }}
            alt="dessert"
            src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
          />
        </div>
      }
    >
      <Meta
        title="Card Title"
        description={
          <>
            Card content <br /> Card content
          </>
        }
      />
    </Card>
  );
};

export default App;
```
