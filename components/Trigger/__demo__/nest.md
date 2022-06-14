---
order: 2
title:
  zh-CN: 多层嵌套
  en-US: nest
---

## zh-CN

弹出层可以嵌套在另一个弹出层内。

## en-US

The popup can be nested.

```js
import { Trigger, Button, Input, Skeleton, Typography } from '@arco-design/web-react';

function App() {
  return (
    <Trigger
      popup={() => {
        return (
          <div className="demo-trigger-popup">
            <Trigger
              trigger="click"
              position="right"
              popup={() => (
                <div className="demo-trigger-popup" style={{ width: 300 }}>
                  <Skeleton />
                  <Typography.Text>Two</Typography.Text>

                  <Trigger
                    trigger="focus"
                    blurToHide={false}
                    position="right"
                    popup={() => (
                      <div className="demo-trigger-popup">
                        <Typography.Text>Three</Typography.Text>
                        <Skeleton />
                      </div>
                    )}
                  >
                    <Input placeholder="Focus Me" />
                  </Trigger>
                </div>
              )}
            >
              <Button>Click Me</Button>
            </Trigger>
          </div>
        );
      }}
    >
      <Button>Hover Me</Button>
    </Trigger>
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
