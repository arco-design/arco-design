---
order: 8
title: 
  zh-CN: 长按钮
  en-US: Long
---

## zh-CN

按钮宽度随着容器宽度进行适配。

## en-US

The button width adapts to the container width.

```js
import { Button, Space } from '@arco-design/web-react';
import { IconUpload } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space
      style={{
        width: 360,
        border: '1px solid var(--color-border)',
        borderRadius: 4,
        padding: 20,
      }}
      direction="vertical"
      size="large"
    >
      <Button type="primary" long>
        Primary
      </Button>
      <Button type="secondary" long>
        Secondary
      </Button>
      <Button type="dashed" long>
        Dashed
      </Button>
      <Button type="default" long>
        Default
      </Button>
      <Button type="text" long>
        Text
      </Button>
    </Space>
  );
};

export default App;
```
