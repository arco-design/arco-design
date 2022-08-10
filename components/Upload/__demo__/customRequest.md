---
order: 12
title:
  zh-CN: 自定义上传实现
  en-US: Custom request
---


## zh-CN

默认通过 Ajax 请求上传，可以设置 customRequest 覆盖默认的上传请求，实现自定义上传。

返回值是一个对象，包含 `abort` 用来终止上传。

## en-US

Override for the default xhr behavior allowing for additional customization and ability to implement your own XMLHttpRequest

```js
import { useState } from 'react';
import { Upload } from '@arco-design/web-react';

function App() {
  const [fileList, setFileList] = useState([]);
  return (
    <Upload
      fileList={fileList}
      onChange={setFileList}
      customRequest={(option) => {
        const { onProgress, onError, onSuccess, file } = option;
        const xhr = new XMLHttpRequest();

        if (xhr.upload) {
          xhr.upload.onprogress = function (event) {
            let percent;

            if (event.total > 0) {
              percent = (event.loaded / event.total) * 100;
            }

            onProgress(parseInt(percent, 10), event);
          };
        }

        xhr.onerror = function error(e) {
          onError(e);
        };

        xhr.onload = function onload() {
          if (xhr.status < 200 || xhr.status >= 300) {
            return onError(xhr.responseText);
          }

          onSuccess(xhr.responseText, xhr);
        };

        const formData = new FormData();
        formData.append(name || 'file', file);
        xhr.open('post', '//upload-z2.qbox.me/', true);
        xhr.send(formData);
        return {
          abort() {
            xhr.abort();
          },
        };
      }}
    />
  );
}

export default App;
```
