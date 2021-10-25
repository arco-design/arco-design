---
order: 4
title: 
  zh-CN: 面板分割
  en-US: Panel Split
---

## zh-CN

将一个面板分割成两个可以调整宽度或高度的两部分。用`direction`控制分割方向。

## en-US

Divide a panel into two parts with adjustable width or height. Use `direction` to control the direction of the split.

```js
import { ResizeBox, Typography } from '@arco-design/web-react';

ReactDOM.render(
  <div>
    <ResizeBox.Split
      style={{height: 200, width: 500, border: '1px solid var(--color-border)'}}
      panes={[
        (<Typography.Paragraph>Right</Typography.Paragraph>),
        (<Typography.Paragraph>Left</Typography.Paragraph>)
      ]}
    >
    </ResizeBox.Split>
  </div>,
  CONTAINER
);
```
