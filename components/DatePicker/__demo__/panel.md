---
order: 19
title:
  zh-CN: 只使用面板
  en-US: Panel Only
---

## zh-CN

只是用选择面板，不显示输入框。

## en-US

Only use panel, hide input selection.

```js
import { useState } from 'react';
import { DatePicker, Button } from '@arco-design/web-react';

function App() {
  const [value, setValue] = useState();
  const [pickerValue, setPickerValue] = useState();
  const [rangeValue, setRangeValue] = useState();
  const [rangePickerValue, setRangePickerValue] = useState();
  return (
    <div>
      <DatePicker
        triggerElement={null}
        style={{ width: 268 }}
        value={value}
        onChange={(v) => setValue(v)}
        pickerValue={pickerValue}
        onPickerValueChange={(v) => setPickerValue(v)}
      />
      <DatePicker.RangePicker
        triggerElement={null}
        style={{ width: 560, marginTop: 20 }}
        value={rangeValue}
        onChange={(v) => setRangeValue(v)}
        pickerValue={rangePickerValue}
        onPickerValueChange={(v) => setRangePickerValue(v)}
      />
    </div>
  );
}

export default App;
```
