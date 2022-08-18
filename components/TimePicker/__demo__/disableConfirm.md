---
order: 11
title:
  zh-CN: 禁用确认
  en-US: disableConfirm
---

## zh-CN

跳过确认步骤，直接点击选择时间。

## en-US

Skip the confirm step and click directly to select time.

```js
import { TimePicker } from '@arco-design/web-react';
const style = {
  width: 194,
  margin: '0 24px 24px 0',
};

function onSelect(valueString, value) {
  console.log('onSelect', valueString, value);
}

function onChange(valueString, value) {
  console.log('onChange', valueString, value);
}

const App = () => {
  return (
    <div>
      <TimePicker disableConfirm style={style} onSelect={onSelect} onChange={onChange} />
      <TimePicker.RangePicker
        disableConfirm
        style={{ ...style, width: 252 }}
        onSelect={onSelect}
        onChange={onChange}
      />
    </div>
  );
};

export default App;
```
