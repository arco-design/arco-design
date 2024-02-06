---
order: 3
title:
  zh-CN: 禁用透明通道
  en-US: DisabledAlpha
---

## zh-CN

设置 `disabledAlpha` 隐藏 Alpha 滑条并禁止修改 Alpha 值。 

## en-US

Set `disabledAlpha` to disable the Alpha slider and lock Alpha value.

```js
import { ColorPicker } from '@arco-design/web-react';


const App = () => {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} disabledAlpha />
    </div>
  ) ;
};

export default App;
```
