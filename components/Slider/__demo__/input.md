---
order: 5
title:
  zh-CN: 显示输入框
  en-US: Show Input
---

## zh-CN
当 `showInput` 为 true 时，将显示输入框。当设置 `onlyMarkValue` 为 `true` 时，输入框始终不会显示。

当 `showInput` 传入 `InputNumberProps` 时，`min`、`max`、`step` 属性会以 `SliderProps` 为先。

**分段输入条设置的分段步长对InputNumber无效**

## en-US

When `showInput` is set to true, the input box will be displayed. But when setting `onlyMarkValue` to `true`, the input box will never be displayed.

When `showInput` is passed `InputNumberProps`, the `min`, `max`, `step` properties will be preceded by `SliderProps`.

**The segment step size set by the segment input bar is invalid for InputNumber**

```js
import { Slider } from '@arco-design/web-react';

function Demo() {
  return <>
    <Slider defaultValue={80} showInput style={{ width: 280, marginRight: 44 }}/>
    <Slider defaultValue={[10, 80]} range showInput style={{ width: 360 }}/>
    <div style={{ marginTop:"20px" }}>
      <Slider
        defaultValue={80}
        showInput={{ hideControl: false, style:{ width:80 }}}
        style={{ width: 280, marginRight: 44 }}
      />
      <Slider
        defaultValue={[10, 80]}
        showInput={{ hideControl: false, style:{ width:80 }}}
        range
        style={{ width: 360 }}
      />
    </div>
  </>
}

ReactDOM.render(<Demo />, CONTAINER);
```
