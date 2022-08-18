---
order: 2
title:
  zh-CN: 竖直分割线
  en-US: Vertical divider
---

## zh-CN

指定 `type` 为 `vertical` 即可使用竖直分割线。竖直分割线不能带文字。

## en-US

Specify `type` as `vertical` to make it vertical. Vertical dividers can't contain texts.

```js
import { Divider, Typography } from '@arco-design/web-react';
const { Text } = Typography;

const App = () => {
  return (
    <div className="divider-demo">
      <Text>Item 1</Text>
      <Divider type="vertical" />
      <Text>Item 2</Text>
      <Divider type="vertical" />
      <Text>Item 3</Text>
    </div>
  );
};

export default App;
```

```css:silent
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}
```
