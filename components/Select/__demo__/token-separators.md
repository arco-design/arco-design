---
order: 12
title:
  zh-CN: 自动分词
  en-US: Automatic Tokenization
---

## zh-CN

设置 `tokenSeparators` 可以使用自动分词功能。试试复制 `Beijing,Shanghai,Shenzhen|Nanjing/Xi'an|Hangzhou` 到输入框里。只在 `multiple` 模式下可用。

## en-US

Set `tokenSeparators` to use automatic word segmentation. Try copying `Beijing,Shanghai,Shenzhen|Nanjing/Xi'an|Hangzhou` into the input box. Only available in `multiple` mode.

```js
import { Select } from '@arco-design/web-react';
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Wuhan'];

const App = () => {
  return (
    <Select
      mode="multiple"
      placeholder="Please select"
      tokenSeparators={[',', '|', '/']}
      allowCreate
      allowClear
      style={{ width: 345 }}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default App;
```
