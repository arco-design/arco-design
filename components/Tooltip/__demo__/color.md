---
order: 4
title:
  zh-CN: 不同颜色
  en-US: Color
---

## zh-CN

通过 `color` 属性设置不同背景色的 `tooltip`

## en-US

Set tooltip with different background colors through the `color` property

```js
import { Tooltip, Button } from '@arco-design/web-react';
const colors = ['#3491FA', '#165DFF', '#722ED1'];

const App = () => {
  return (
    <div>
      {colors.map((color) => {
        return (
          <Tooltip key={color} color={color} content="tooltip text">
            <Button
              style={{
                marginRight: 20,
                background: color,
                color: '#fff',
              }}
            >
              {color}
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default App;
```
