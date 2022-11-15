---
order: 4
title:
  zh-CN: 格式化展示值
  en-US: Format
---

## zh-CN

通过 `formatter`、 `parser` 配合使用可以定义输入框展示值。

通过 `formatter` 中的 `userTyping` 参数，判断是否正在输入，可以延迟显示 `formatter` 后的值

## en-US

The display value of the input box can be defined through the use of `formatter` and `parser` together.

Use the `userTyping` parameter in the `formatter` to determine whether the input is in progress. You can delay the display of the value after the `formatter`
```js
import { useState } from 'react';
import { InputNumber } from '@arco-design/web-react';

function App() {
  const [value, setValue] = useState(12000);
  const [delayValue, setDelayValue] = useState(12000);
  return (
    <div>
      <InputNumber
        style={{ width: 160, margin: '10px 24px 10px 0' }}
        min={0}
        max={1000000000}
        step={1000}
        value={value}
        onChange={setValue}
        prefix="¥"
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value.replace(/,/g, '')}
      />
      <InputNumber
        style={{ width: 160, margin: '10px 24px 10px 0' }}
        min={0}
        max={1000000000}
        step={1000}
        value={delayValue}
        onChange={setDelayValue}
        prefix="¥"
        formatter={(value, { userTyping, input }) => userTyping ? input : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value.replace(/,/g, '')}
      />
      </div>
  );
}

export default App;
```
