---
order: 9
title:
  zh-CN: 适应文本高度文本域
  en-US: Autosize Textarea
---

## zh-CN

指定 `autoSize`，文本域会自动根据输入的文本调整文本域的高度。如果指定`autoSize={{ minRows, maxRows }}`，也能指定最小行数和最大行数。

## en-US

Specify `autoSize`, the text field will automatically adjust the height of the text field according to the input text. If you specify `autoSize={{ minRows, maxRows }}`, you can also specify the minimum/maximum number of rows.

```js
import { Input, Space } from '@arco-design/web-react';
const TextArea = Input.TextArea;

const App = () => {
  return (
    <Space wrap align="top">
      <TextArea
        placeholder="Please enter ..."
        defaultValue="This is the contents of the textarea. "
        autoSize
        style={{ width: 350 }}
      />
      <TextArea
        placeholder="Please enter ..."
        autoSize={{ minRows: 2, maxRows: 6 }}
        style={{ width: 350 }}
        defaultValue="This is the contents of the textarea. This is the contents of the textarea. This is the contents of the textarea. "
      />
    </Space>
  );
};

export default App;
```
