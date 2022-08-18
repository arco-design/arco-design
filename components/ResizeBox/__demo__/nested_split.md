---
order: 5
title:
  zh-CN: 面板分割嵌套
  en-US: Panel Split Nesting
---

## zh-CN

面板分割可以嵌套使用。

## en-US

Panel split can be nested.

```js
import { ResizeBox, Typography } from '@arco-design/web-react';
const rightPane = (
  <div>
    <ResizeBox.Split
      direction="vertical"
      style={{ height: 200 }}
      panes={[
        <Typography.Paragraph>Top</Typography.Paragraph>,
        <Typography.Paragraph>Bottom</Typography.Paragraph>,
      ]}
    ></ResizeBox.Split>
  </div>
);

const App = () => {
  return (
    <div>
      <ResizeBox.Split
        style={{
          height: 200,
          width: 500,
          border: '1px solid var(--color-border)',
        }}
        panes={[<Typography.Paragraph>Right</Typography.Paragraph>, rightPane]}
      ></ResizeBox.Split>
    </div>
  );
};

export default App;
```
