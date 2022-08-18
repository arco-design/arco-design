---
order: 2
title:
  zh-CN: 小红点
  en-US: Red Badge
---

## zh-CN

设置 `dot`，即可只显示小红点而不显示数字。`count > 0` 时才显示。

## en-US

A red dot will be displayed instead of the count when `dot=true`. If count equals 0, the dot will be hidden.

```js
import { Badge, Space } from '@arco-design/web-react';
import { IconNotification } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size={40}>
      <Badge count={9} dot offset={[6, -2]}>
        <a href="#">Link</a>
      </Badge>
      <Badge count={9} dot offset={[2, -2]}>
        <IconNotification
          style={{
            color: '#888',
            fontSize: 18,
            verticalAlign: -3,
          }}
        />
      </Badge>
    </Space>
  );
};

export default App;
```
