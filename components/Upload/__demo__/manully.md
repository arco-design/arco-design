---
order: 5
title:
  zh-CN: 手动上传
  en-US: upload manually
---

## zh-CN

设置 `autoUpload` 为 `false`时候，可以通过调用 `submit`方法进行手动上传。`submit` 只会上传处于 `fileList` 中的文件。

## en-US

If `autoUpload` equals `false`, files will not be uploaded automatically after being selected. You can submit them by `uploadRef.submit` method.`submit` will only upload files that are in `fileList`.

```js
import React from 'react';
import { Upload, Button, Space } from '@arco-design/web-react';

function App() {
  const uploadRef = React.useRef();
  const [disabled, setDisabled] = React.useState(false);
  const [fileList, setFileList] = React.useState([]);

  const onSubmit = (e, isFirst) => {
    e.stopPropagation();
    const file = isFirst ? fileList.filter((x) => x.status === 'init')[0] : null;
    uploadRef.current && uploadRef.current.submit(file);
  };

  const onChange = (files) => {
    setFileList(files);
    setDisabled(!files.some((x) => x.status === 'init'));
  };

  const onProgress = (file) => {
    setFileList((files) => {
      return files.map((x) => (x.uid === file.uid ? file : x));
    });
  };

  return (
    <Upload
      ref={uploadRef}
      multiple
      autoUpload={false}
      action="/"
      onChange={onChange}
      onProgress={onProgress}
      fileList={fileList}
    >
      <Space size="large">
        <Button>Select file</Button>
        <Button type="primary" onClick={onSubmit} disabled={disabled}>
          Start upload
        </Button>
        <Button
          type="primary"
          onClick={(e) => {
            onSubmit(e, true);
          }}
          disabled={disabled}
        >
          Only upload one
        </Button>
      </Space>
    </Upload>
  );
}

export default App;
```
