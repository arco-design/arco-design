---
order: 8
title:
  zh-CN: 无限长列表
  en-US: Infinite List
---

## zh-CN

通过指定 `virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。

**由于虚拟列表内部使用到了 ListItem 的 `ref`，因此如果你通过 `render` 返回了一个自定义函数组件，请使用 `React.forwardRef` 包裹它。**

## en-US

By specifying `virtualListProps` to turn on the virtual list, high performance can be obtained when a large amount of data is used.

**Because the virtual list uses the `ref` of ListItem internally, if you return a custom function component through `render`, please use `React.forwardRef` to wrap it.**

```js
import { List, Avatar } from '@arco-design/web-react';

ReactDOM.render(
  <>
    <h3 style={{ color: 'var(--color-text-2)' }}>10000 items</h3>
    <List
      style={{ width: 600 }}
      virtualListProps={{
        height: 560,
      }}
      dataSource={new Array(10000).fill(null).map((_, index) => {
        const prefix = `0000${index}`.slice(-5);
        return {
          title: 'Beijing Bytedance Technology Co., Ltd.',
          description: `(${prefix}) Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.`,
        };
      })}
      render={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={
              <Avatar shape="square">
                A
              </Avatar>
            }
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  </>,
  CONTAINER
);
```
