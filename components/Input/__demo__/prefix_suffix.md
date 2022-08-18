---
order: 4
title:
  zh-CN: 前后缀
  en-US: Prefix/Suffix
---

## zh-CN

通过指定`prefix`和`suffix`来在输入框内添加前缀和后缀。

## en-US

Add a prefix(suffix) in the input box by specifying `prefix`(`suffix`).

```js
import { Input, Space } from '@arco-design/web-react';
import { IconUser, IconSearch, IconInfoCircle } from '@arco-design/web-react/icon';

const App = () => {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: 350 }} prefix={<IconUser />} placeholder="Please enter" />
        <Input
          allowClear
          style={{ width: 350 }}
          suffix={<IconInfoCircle />}
          placeholder="Please enter"
        />
      </Space>
      <Space wrap>
        <Input
          style={{ width: 350 }}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          placeholder="Please enter"
        />
        <Input
          style={{ width: 350 }}
          addBefore="+86"
          addAfter={<IconSearch />}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          allowClear
          placeholder="Please enter"
        />
      </Space>
    </Space>
  );
};

export default App;
```
