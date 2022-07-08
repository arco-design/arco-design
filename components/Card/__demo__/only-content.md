---
order: 3
title:
  zh-CN: 简洁卡片
  en-US: Only content
---

## zh-CN

卡片可以只有内容区域。

## en-US

The card can only have a content area.

```js
import { Card, Avatar, Link, Typography, Space } from '@arco-design/web-react';
import { IconArrowRight } from '@arco-design/web-react/icon';

const Content = ({ children }) => {
  return (
    <Space
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Space>
        <Avatar
          style={{
            backgroundColor: '#165DFF',
          }}
          size={28}
        >
          A
        </Avatar>
        <Typography.Text>Username</Typography.Text>
      </Space>
      {children}
    </Space>
  );
};

const App = () => {
  return (
    <>
      <Card
        hoverable
        style={{ width: 360, marginBottom: 20 }}
      >
        <Content>
          <Link>More</Link>
        </Content>
      </Card>
      <Card
        className="card-with-icon-hover"
        hoverable
        style={{ width: 360 }}
      >
        <Content>
          <span className="icon-hover">
            <IconArrowRight
              style={{
                cursor: 'pointer',
              }}
            />
          </span>
        </Content>
      </Card>
    </>
  );
};

export default App;
```

```css
.card-with-icon-hover .icon-hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  transition: all 0.1s;
}

.card-with-icon-hover .icon-hover:hover {
  background-color: rgb(var(--gray-2));
}
```
