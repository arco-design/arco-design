---
order: 8
title:
  zh-CN: 带边框的标签
  en-US: Bordered
---

## zh-CN

通过参数 `bordered`，可以显示带边框的标签。

## en-US

Through the prop `bordered` to display a bordered tag.

```js
import { Tag, Space } from '@arco-design/web-react';
const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];

const App = () => {
  return (
    <Space wrap>
      <Tag bordered>Default</Tag>
      {COLORS.map((color, i) => (
        <Tag key={i} color={color} bordered>
          {color}
        </Tag>
      ))}
    </Space>
  );
};

export default App;
```
