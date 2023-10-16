---
order: 3
title:
  zh-CN: 允许创建
  en-US: Allow-Create
---

## zh-CN

指定 `allowCreate` 为 `true`，即可创建选项中不存在的条目。通过 `allowCreate.formatter` 格式化用户创建的选项。

## en-US

Specify `allowCreate` as `true` to create entries that do not exist in the options. Format user creations via `allowCreate.formatter`.

```js
import { Select, Space } from '@arco-design/web-react';
const Option = Select.Option;
const options = [];

for (let i = 10; i < 24; i++) {
  options.push(i.toString(36) + i);
}

function App() {
  return (
    <Space size="large">
      <Select allowCreate placeholder="Create an item" allowClear style={{ width: 345 }}>
        {options.map((option) => (
          <Option key={option} value={option} disabled={option === 'b11' ? true : false}>
            {option}
          </Option>
        ))}
      </Select>

      <Select
        allowClear
        mode="multiple"
        placeholder="Create an item"
        defaultValue={['a10', 'b11']}
        allowCreate={{
          formatter: (inputValue, creating) => {
            return {
              value: inputValue,
              label: `${creating ? 'Enter to create: ' : 'Created: '}${inputValue}`
            };
          },
        }}
        style={{ width: 345 }}
      >
        {options.map((option) => (
          <Option key={option} value={option} disabled={option === 'b11' ? true : false}>
            {option}
          </Option>
        ))}
      </Select>
    </Space>
  );
}

export default App;
```
