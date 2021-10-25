---
order: 3
title: 
  zh-CN: 校验输入
  en-US: Validate input
---

## zh-CN

通过 `validate` 校验输入

## en-US

Use `validate` to enable custom validator for input value

```js
import { InputTag, Message } from '@arco-design/web-react';

ReactDOM.render(
  <div>
    <InputTag
      allowClear
      style={{ maxWidth: 350 }}
      validate={(v) => {
        if (!v || v.length < 3) {
          Message.error('长度必须大于3');
          return false;
        }
        return true;
      }}
      placeholder="Please input"
    />
  </div>,
  CONTAINER
);
```
