---
order: 10
title:
  zh-CN: 指定可选项
  en-US: Specify Options
---

## zh-CN

通过传入`options`指定可选项。

## en-US

Specify optional options by passing in `options`.

```js
import { Select, Message, Space } from '@arco-design/web-react';
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];

const App = () => {
  return (
    <Space size="large">
      <Select
        options={options}
        defaultValue="Beijing"
        placeholder="Select city"
        style={{ width: 154 }}
      />

      <Select
        mode="multiple"
        options={options}
        defaultValue={['Beijing', 'Shanghai']}
        placeholder="Please select"
        style={{
          width: 345,
        }}
      />
    </Space>
  );
};

export default App;
```
