---
order: 6
title:
  zh-CN: 展示箭头元素
  en-US: show arrow
---

## zh-CN

通过 `showArrow` 属性，可以展示默认的箭头元素。也可以通过 arrowProps 进行定制。

## en-US

Show arrow node.

## zh-US

**The popup layer has no style by default.**

```js
import { Trigger, Button, Input, Skeleton,Space } from '@arco-design/web-react';

function App() {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <Space size={40}>
        <Trigger
          showArrow
          trigger="click"
          position="bl"
          popup={() => (
            <div className="demo-trigger-popup" style={{ width: 300 }}>
              <Skeleton />
            </div>
          )}
        >
          <Button type="primary">
            Click Me
          </Button>
        </Trigger>
        <Trigger
          showArrow
          arrowProps={{
            style: {
              background: 'red',
            },
          }}
          trigger="click"
          position="bl"
          popup={() => (
            <div className="demo-trigger-popup">
              <Skeleton />
            </div>
          )}
        >
          <Button type="primary">Click Me（arrowProps）</Button>
        </Trigger>
      </Space>
    </div>
  );
}

export default App;
```

```css:silent
.demo-trigger-popup {
  padding: 10px;
  width: 300px;
  text-align: center;
  background-color: var(--color-bg-popup);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
```
