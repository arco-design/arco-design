---
order: 1
title:
  zh-CN: 触发方式
  en-US: Trigger
---

## zh-CN

通过设置 `trigger`，可以指定不同的触发方式。

## en-US

By setting `trigger`, you can specify different trigger methods.

```js
import { Popover, Button } from '@arco-design/web-react';

const style = { margin: 0 };

ReactDOM.render(
  <div>
    <Popover
      trigger="hover"
      title="Title"
      content={
        <span>
          <p style={style}>Here is the text content</p>
          <p style={style}>Here is the text content</p>
        </span>
      }
    >
      <Button style={{ marginRight: 40 }}>Hover</Button>
    </Popover>
    <Popover
      trigger="click"
      title="Title"
      content={
        <span>
          <p style={style}>Here is the text content</p>
          <p style={style}>Here is the text content</p>
        </span>
      }
    >
      <Button style={{ marginRight: 40 }}>Click</Button>
    </Popover>
    <Popover
      trigger="focus"
      title="Title"
      content={
        <span>
          <p style={style}>Here is the text content</p>
          <p style={style}>Here is the text content</p>
        </span>
      }
    >
      <Button>Focus</Button>
    </Popover>
  </div>,
  CONTAINER
);
```
