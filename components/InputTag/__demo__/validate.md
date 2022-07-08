---
order: 3
title:
  zh-CN: 校验与格式化输入
  en-US: Validate/format input
---

## zh-CN

通过 `validate` 校验输入。此外，可以返回**非布尔类型**来将用户输入的字符串为特定的 `value` 格式。

## en-US

Use `validate` to enable custom validator for input value. Additionally, **non-boolean** can be returned to format user-entered strings in a specific `value` format.

```js
import { InputTag, Message, Space } from '@arco-design/web-react';

const App = () => {
  return (
    <Space>
      <InputTag
        allowClear
        style={{ width: 350 }}
        placeholder="Please input"
        validate={(v) => {
          if (!v || v.length < 3) {
            Message.error('长度必须大于3');
            return false;
          }

          return true;
        }}
      />
      <InputTag
        allowClear
        style={{ width: 350 }}
        placeholder="Format user input"
        validate={(v) => {
          return { word: v }
        }}
        onChange={(value) => {
          Message.info(`Paramster of onChange: ${JSON.stringify(value)}`)
        }}
      />
    </Space>
  );
};

export default App;
```
