---
order: 2
title: 
  zh-CN: 可选中
  en-US: Check
---

## zh-CN

通过参数 `checkable`，可以实现点击选中的效果。

## en-US

Through the prop `checkable`, the effect of clicking and selecting can be achieved.

```js
import { Tag, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space size="large">
      <Tag checkable>Awesome</Tag>
      <Tag checkable color="red" defaultChecked>
        Toutiao
      </Tag>
      <Tag checkable color="arcoblue" defaultChecked>
        Lark
      </Tag>
    </Space>
  );
};

export default App;
```
