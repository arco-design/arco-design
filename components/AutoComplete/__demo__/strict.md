---
order: 3
title:
  zh-CN: 区分大小写
  en-US: Strict mode
---

## zh-CN

使用 `strict=true` 来指明在匹配时严格区分大小写。

## en-US

Use `strict=true` to enable case-sensitive matching for options.

```js
import { AutoComplete } from '@arco-design/web-react';
const data = ['beijing', 'beihai', 'baoding'];

const App = () => {
  return (
    <div>
      <AutoComplete
        placeholder="Input `B`"
        strict
        data={data}
        style={{ width: 154 }}
      />
    </div>
  );
};

export default App;
```
