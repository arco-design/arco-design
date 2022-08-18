---
order: 6
title:
  zh-CN: 上传前校验
  en-US: beforeUpload
---

## zh-CN
`beforeUpload` 会在每一个文件上传之前执行。如果返回 false 或者 Promise.reject， 那么将会取消当前文件的上传。

## en-US
The function will be executed before each file upload. Uploading will be aborted when the return value is false or a Promise which resolve(false) or reject.


```js
import { Upload, Modal } from '@arco-design/web-react';

function App() {
  return (
    <div>
      <Upload
        multiple
        action="/"
        beforeUpload={(file) => {
          return new Promise((resolve, reject) => {
            Modal.confirm({
              title: 'beforeUpload',
              content: `确认上传 ${file.name}`,
              onConfirm: () => resolve(true),
              onCancel: () => reject('cancel'),
            });
          });
        }}
      />
    </div>
  );
}

export default App;
```
