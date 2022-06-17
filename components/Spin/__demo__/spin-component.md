---
order: 2
title:
  zh-CN: 容器中
  en-US: As Container
---

## zh-CN

可以给任意元素添加加载状态。容器默认是 `inline-block` 布局，当你需要撑满父级容器时，可以设置 `style={{ display: 'block' }}`。

## en-US

You can add loading status to any element. The container defaults to the `inline-block` layout. When you need to fill the parent container, you can set `style={{ display:'block' }}`.

```js
import { useState } from 'react';
import { Spin, Card, Button, Link, Space } from '@arco-design/web-react';

function App() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Button
        style={{ display: 'block', marginBottom: 24, }}
        onClick={() => setLoading(!loading)}
      >
        {`Loading: ${loading}`}
      </Button>
      <Space>
        <Spin loading={loading}>
          <Card
            style={{ width: '100%', }}
            title="Arco Card"
            extra={<Link> More </Link>}
          >
            ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and
            around the world. Toutiao started out as a news recommendation engine and gradually
            evolved into a platform delivering content in various formats.
          </Card>
        </Spin>
        <Spin loading={loading}>
          <Card
            style={{ width: '100%', }}
            title="Arco Card"
            extra={<Link> More </Link>}
          >
            ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and
            around the world. Toutiao started out as a news recommendation engine and gradually
            evolved into a platform delivering content in various formats.
          </Card>
        </Spin>
      </Space>
      <Spin
        loading={loading}
        style={{ display: 'block', marginTop: 8, }}
      >
        <Card title="Arco Card" extra={<Link> More </Link>}>
          ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
          the world. Toutiao started out as a news recommendation engine and gradually evolved into
          a platform delivering content in various formats.
        </Card>
      </Spin>
    </>
  );
}

export default App;
```
