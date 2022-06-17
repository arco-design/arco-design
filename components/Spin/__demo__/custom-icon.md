---
order: 5
title:
  zh-CN: 自定义指示符
  en-US: Custom Icon
---

## zh-CN

通过指定 `icon` 可以指定自定义图标作为加载组件。

## en-US

By specifying `icon`, you can specify a custom icon as a loading component.

```js
import { Spin, Card, Link } from '@arco-design/web-react';
import { IconLoading } from '@arco-design/web-react/icon';

function App() {
  return (
    <Spin loading={true} size={30} icon={<IconLoading />}>
      <Card
        style={{ width: 360, }}
        title="Arco Card"
        extra={<Link> More </Link>}
      >
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
        the world. Toutiao started out as a news recommendation engine and gradually evolved into a
        platform delivering content in various formats.
      </Card>
    </Spin>
  );
}

export default App;
```
