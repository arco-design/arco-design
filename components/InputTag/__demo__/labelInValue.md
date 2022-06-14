---
order: 2
title:
  zh-CN: 获取选项的文本
  en-US: LabelInValue
---

## zh-CN

可以通过设置 `labelInValue=true` 获取选项的 label 值

## en-US

Use `labelInValue=true` to get label of the selected option

```js
import { InputTag } from '@arco-design/web-react';

const App = () => {
  return (
    <InputTag
      allowClear
      labelInValue
      defaultValue={[
        {
          label: 'a',
          value: '1',
        },
      ]}
      placeholder="Please input"
      style={{ maxWidth: 350 }}
      onChange={(v) => {
        console.log(v);
      }}
    />
  );
};

export default App;
```
