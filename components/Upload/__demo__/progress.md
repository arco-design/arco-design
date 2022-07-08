---
order: 13
title:
  zh-CN: 自定义进度条
  en-US: customize progress bar
---

## zh-CN
`progressProps` 字段可以自定义进度条属性。

## en-US

Use `progressProps` for customize progress bar.

```js
import React from 'react';
import { Upload, Radio, Button } from '@arco-design/web-react';

function App() {
  const [fileList, setFileList] = React.useState([
    {
      status: 'init',
      uid: '-2',
      percent: 0,
      name: 'light.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      status: 'error',
      uid: '-1',
      percent: 0,
      name: 'cat.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    },
  ]);
  return (
    <div className="custom-upload-progress">
      <Upload
        showUploadList={{
          startIcon: (
            <Button size="mini" type="text">
              开始上传
            </Button>
          ),
          cancelIcon: (
            <Button size="mini" type="text">
              取消上传
            </Button>
          ),
          reuploadIcon: (
            <Button size="mini" type="text">
              点击重试
            </Button>
          ),
        }}
        progressProps={{
          size: 'small',
          type: 'line',
          showText: true,
          width: '100%',
        }}
        multiple
        fileList={fileList}
        action="/"
        onChange={setFileList}
        onProgress={(file) => {
          setFileList((v) => {
            return v.map((x) => {
              return x.uid === file.uid ? file : x;
            });
          });
        }}
      />
    </div>
  );
}

export default App;
```

```css
.custom-upload-progress .arco-upload-list-item-text-content {
  flex-wrap: wrap;
}

.custom-upload-progress .arco-upload-list-start-icon,
.custom-upload-progress .arco-upload-list-cancel-icon {
  right: 0;
  left: unset;
  top: -22px;
  transform: none;
}

.custom-upload-progress .arco-upload-list-rtl .arco-upload-list-start-icon,
.custom-upload-progress .arco-upload-list-rtl .arco-upload-list-cancel-icon {
  right: unset;
  left: 0;
}

.custom-upload-progress .arco-upload-list-status {
  display: block;
}

.custom-upload-progress .arco-upload-list-progress {
  display: block;
  height: 0;
  margin-top: 0;
  transition: all 0.2s ease;
  opacity: 0;
  overflow: hidden;
}

.custom-upload-progress .arco-upload-list-item-uploading .arco-upload-list-progress {
  margin-top: 8px;
  opacity: 1;
  height: 16px;
}
```
