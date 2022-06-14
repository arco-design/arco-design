---
order: 3
title:
  zh-CN: 文本内容
  en-US: Text
---

## zh-CN
设置 `text`，可设置自定义提示内容。

## en-US

Customize the content.

```js
import { Badge, Avatar, Space } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size={40}>
      <Badge text="NEW">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
      <Badge text="HOT">
        <Avatar shape="square">
          <span>
            <IconUser />
          </span>
        </Avatar>
      </Badge>
    </Space>
  );
};

export default App;
```
