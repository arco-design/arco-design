---
order: 5
title: 
  zh-CN: 显示输入框
  en-US: Show Input
---

## zh-CN

当设置 `showInput` 为 true 时，将显示输入框。当设置 `onlyMarkValue` 为 `true` 时，输入框始终不会显示

## en-US

When `showInput` is set to true, the input box will be displayed. But when setting `onlyMarkValue` to `true`, the input box will never be displayed.

```js
import { Slider } from '@arco-design/web-react';

function Demo() {
  return <>
    <Slider defaultValue={80} showInput style={{ width: 280, marginRight: 44 }}/>
    <Slider defaultValue={[10, 80]} range showInput style={{ width: 360 }}/>
  </>
} 

ReactDOM.render(<Demo />, CONTAINER);
```
