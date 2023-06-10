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
import { Upload, Message } from '@arco-design/web-react';

const isAcceptFile = (file, accept) => {
  if (accept && file) {
    const accepts = Array.isArray(accept)
      ? accept
      : accept
          .split(',')
          .map((x) => x.trim())
          .filter((x) => x);
    const fileExtension = file.name.indexOf('.') > -1 ? file.name.split('.').pop() : '';
    return accepts.some((type) => {
      const text = type && type.toLowerCase();
      const fileType = (file.type || '').toLowerCase();
      if (text === fileType) {
        // 类似excel文件这种
        // 比如application/vnd.ms-excel和application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        // 本身就带有.字符的，不能走下面的.jpg等文件扩展名判断处理
        // 所以优先对比input的accept类型和文件对象的type值
        return true;
      }
      if (new RegExp('\\/\\*').test(text)) {
        // image/* 这种通配的形式处理
        const regExp = new RegExp('\\/.*$')
        return fileType.replace(regExp, '') === text.replace(regExp, '');
      }
      if (new RegExp('\\..*').test(text)) {
        // .jpg 等后缀名
        return text === `.${fileExtension && fileExtension.toLowerCase()}`;
      }
      return false;
    });
  }
  return !!file;
}

const App = () => {
  return (
    <Upload
      drag
      multiple
      accept="image/*"
      action="/"
      onDrop={(e) => {
        let uploadFile = e.dataTransfer.files[0]
        if (isAcceptFile(uploadFile, "image/*")) {
          return
        } else {
           Message.info('不接受的文件类型，请重新上传指定文件类型~');
        }
      }}
      tip="Only pictures can be uploaded"
    />
  );
};

export default App;
```
