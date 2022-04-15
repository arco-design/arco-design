---
order: 8
title:
  zh-CN: 无限长列表
  en-US: Infinite List
---

## zh-CN

通过指定 `virtualListProps` 来开启虚拟列表，在大量数据时获得高性能表现。
在使用虚拟列表时，如果列表元素之间高度变化较大可能导致滚动时视口出现空白区域，可以通过设定 `virtualListProps.itemHeight` 解决。`itemHeight` 用于计算实际需要渲染的 DOM 节点数目（视口高度 / 元素高度），其值越小实际渲染的 DOM 节点越多，性能开销也会随之增大。

**由于虚拟列表内部使用到了 ListItem 的 `ref`，因此如果你通过 `render` 返回了一个自定义函数组件，请使用 `React.forwardRef` 包裹它。**

## en-US

By specifying `virtualListProps` to turn on the virtual list, high performance can be obtained when a large amount of data is used.
When using a virtual list, if the height of the list items varies greatly, it may cause blank space in the viewport when scrolling, which can be solved by setting `virtualListProps.itemHeight`. `itemHeight` is used to calculate the actual number of DOM nodes that need to be rendered (viewportHeight / itemHeight). The smaller the value, the more DOM nodes actually rendered, and the performance overhead will increase.

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
