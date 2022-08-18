---
order: 0
title: 
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

鼠标移入，气泡出现，鼠标移出，气泡消失。

## en-US

When the mouse is moved in, the bubble appears, and when the mouse is moved out, the bubble disappears.

```js
import { Tooltip, Typography } from '@arco-design/web-react';
const { Text } = Typography;

const App = () => {
  return (
    <div>
      <Tooltip content="This is tooltip content">
        <Text style={{ marginRight: 20, }} >
          Mouse over to display tooltip
        </Text>
      </Tooltip>
      <Tooltip content="This is a two-line tooltip content.This is a two-line tooltip content.">
        <Text>Mouse over to display multiple lines tooltip</Text>
      </Tooltip>
    </div>
  );
};

export default App;
```
