---
order: 3
title:
  zh-CN: 拖拽上传
  en-US: drag and drop
---

## zh-CN

拖拽上传。当使用拖拽上传，且设置 `accept` 时候，选择后的文件将会被根据后缀名及文件类型被过滤。不符合格式的文件将不会出现在上传列表。

## en-US

Drag files to a specific area, to upload.

```js
import { Upload } from '@arco-design/web-react';

const App = () => {
  return (
    <Upload
      drag
      multiple
      accept="image/*"
      action="/"
      tip="Only pdf, png, jpg can be uploaded, and the size does not exceed 100MB"
    />
  );
};

export default App;
```
