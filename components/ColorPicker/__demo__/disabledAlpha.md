---
order: 3
title:
  zh-CN: 禁用透明通道
  en-US: DisabledAlpha
---

## zh-CN

设置 `disabledAlpha` 以隐藏 Alpha 值滑条和数值显示。

如果 `defaultValue` 传入的初始色值包含 Alpha，那么初次显示时，色块会保留传入的 Alpha。当用户在取色版上取色时，Alpha 将被重置并锁定为100。

## en-US

Set `disabledAlpha` to hide the slider and value for Alpha. 

If the `defaultValue` has alpha (like `#165DFF80`), then the alpha value is retained for the intial render. The alpha value is reset and locked to 100 once the user clicks on the palette. 

```js
import { ColorPicker } from '@arco-design/web-react';


const App = () => {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} disabledAlpha />
      <br />
      <ColorPicker defaultValue={'#165DFF80'} disabledAlpha />
    </div>
  ) ;
};

export default App;
```
