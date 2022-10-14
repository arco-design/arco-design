---
order: 3
title:
  zh-CN: 带有前置标签
  en-US: Front Label
---

## zh-CN

通过 `addBefore` 设置前置标签  (`2.41.0`)

## en-US

Specify `addBefore` to add elements before the select box. (`2.41.0`)


```js
import { Select, Message, Space } from '@arco-design/web-react';
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Tianjin'];

const App = () => {
  return (
    <Space size="large">
      <Select
        addBefore="Select city"
        placeholder="Please select"
        style={{ width: 300 }}
        onChange={(value) =>
          Message.info({
            content: `You select ${value}.`,
            showIcon: true,
          })
        }
      >
        {options.map((option, index) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
      <Select addBefore="Select city" style={{ width: 300 }} mode="multiple">
        {options.map((option, index) => (
          <Option key={option} disabled={index === 4} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </Space>
  );
};

export default App;
```
