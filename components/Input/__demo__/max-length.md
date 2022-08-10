---
order: 7
title:
  zh-CN: 字数统计
  en-US: Length Limit
---

## zh-CN

设置 `maxLength` 可以限制最大字数，配合 `showWordLimit` 可以显示字数统计。

设置 `maxLength.errorOnly` 后不会限制用户输入字数，但是超过最大字数会展示错误状态。

值得注意的是，如果配置了 `showWordLimit`，那么你将不能使用 `suffix`。

## en-US

Set `maxLength` to limit the maximum number of words, and use `showWordLimit` to display word count statistics.

Setting `maxLength.errorOnly` will not limit the number of words entered by the user, but if the maximum number of words is exceeded, an error status will be displayed.

It is worth noting that if `showWordLimit` is configured, then you cannot use `suffix`.

```js
import { Input, Space } from '@arco-design/web-react';

function App() {
  return (
    <Space direction="vertical">
      <Space align="start" size={24}>
        <Input
          maxLength={10}
          showWordLimit
          placeholder="Please enter no more than 10 letters"
          style={{ width: 300 }}
        />
        <Input.TextArea
          maxLength={50}
          showWordLimit
          placeholder="Please enter no more than 50 letters"
          wrapperStyle={{ width: 300 }}
        />
      </Space>

      <Space align="start" size={24}>
        <Input
          maxLength={{ length: 10, errorOnly: true }}
          showWordLimit
          defaultValue="More than 10 letters will be error"
          style={{ width: 300 }}
        />
        <Input.TextArea
          maxLength={{ length: 50, errorOnly: true }}
          showWordLimit
          placeholder="More than 50 letters will be error"
          wrapperStyle={{ width: 300 }}
        />
      </Space>
    </Space>
  );
}

export default App;
```
