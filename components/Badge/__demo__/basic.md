---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

基础的用法。只需指定 `count`，即可显示徽标。
## en-US

Basic usage. Just specify `count` to display the badge.


```js
import { Badge, Avatar, Space } from '@arco-design/web-react';
import { IconClockCircle } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space size={40}>
      <Badge count={9}>
        <Avatar shape="square" />
      </Badge>
      <Badge
        count={9}
        dot
        dotStyle={{ width: 10, height: 10 }}
      >
        <Avatar shape="square" />
      </Badge>
      <Badge
        count={
          <IconClockCircle
            style={{ verticalAlign: 'middle', color: 'var(--color-text-2)' }}
          />
        }
        dotStyle={{
          height: 16,
          width: 16,
          fontSize: 14,
        }}
      >
        <Avatar shape="square" />
      </Badge>
    </Space>
  );
};

export default App;
```
