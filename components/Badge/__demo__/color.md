---
order: 6
title:
  zh-CN: 颜色
  en-US: Color
---

## zh-CN

我们提供多种预设色彩的徽标样式。如果预设值不能满足你的需求，`color` 字段也可以设置自定义色值。

## en-US

We provide a variety of preset colors for the badge. You can also set a custom color with `color` property.

```js
import { Badge, Divider } from '@arco-design/web-react';
const COLORS = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];
const COLORS_CUSTOM = [
  '#F53F3F',
  '#7816FF',
  '#00B42A',
  '#165DFF',
  '#FF7D00',
  '#EB0AA4',
  '#7BC616',
  '#86909C',
  '#B71DE8',
  '#0FC6C2',
  '#FFB400',
  '#168CFF',
  '#FF5722',
];

const App = () => {
  return (
    <div>
      <div>
        {COLORS.map((color) => {
          return <Badge key={color} color={color} text={color} style={{ marginRight: 24 }}> </Badge>;
        })}
      </div>
      <br />
      <div>
        {COLORS_CUSTOM.map((color) => {
          return <Badge key={color} color={color} text={color} style={{ marginRight: 24 }}> </Badge>;
        })}
      </div>
    </div>
  );
};

export default App;
```
