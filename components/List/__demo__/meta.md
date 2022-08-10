---
order: 2
title:
  zh-CN: 基础列表
  en-US: With Meta
---

## zh-CN

使用 `List.Item.Meta` 可快速指定头像、标题、文字。

## en-US

Use `List.Item.Meta` to quickly specify avatar, title, and text.

```js
import { List, Avatar } from '@arco-design/web-react';

const App = () => {
  return (
    <List
      style={{ width: 600 }}
      dataSource={new Array(4).fill({
        title: 'Beijing Bytedance Technology Co., Ltd.',
        description: 'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
      })}
      render={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={<Avatar shape="square">A</Avatar>}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
};

export default App;
```
