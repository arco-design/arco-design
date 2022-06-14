---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

鼠标移入或点击，弹出气泡，可对浮层上元素进行操作，承载复杂内容和操作。

## en-US

Basic usage.

```js
import { Popover, Button } from '@arco-design/web-react';
const style = {
  margin: 0,
};

const App = () => {
  return (
    <Popover
      title="Title"
      content={
        <span>
          <p style={style}>Here is the text content</p>
          <p style={style}>Here is the text content</p>
        </span>
      }
    >
      <Button type="primary">Hover</Button>
    </Popover>
  );
};

export default App;
```
