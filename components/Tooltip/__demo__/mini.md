---
order: 1
title: 
  zh-CN: 迷你尺寸
  en-US: Mini Size
---

## zh-CN

适用于小场景或数字气泡样式。

## en-US

Suitable for small scenes or digital bubble styles.

```js
import { Tooltip, Typography } from '@arco-design/web-react';
const { Text } = Typography;

const App = () => {
  return (
    <Tooltip mini content="123456789">
      <Text>Mouse over to display tooltip</Text>
    </Tooltip>
  );
};

export default App;
```
