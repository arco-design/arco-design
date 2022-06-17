---
order: 7
title:
  zh-CN: 移除前校验
  en-US: onRemove
---

## zh-CN

`onRemove` 会在每个文件从上传列表中删除之前执行。如果返回 false 或者 Promise.reject，那么将会终止移除操作。

## en-US

The function will be executed when user click remove icon. Remove actions will be aborted when the return value is false or a Promise which resolve(false) or reject

```js
import React from 'react';
import { Upload, Modal } from '@arco-design/web-react';

class App extends React.Component {
  render() {
    return (
      <div>
        <Upload
          multiple
          action="/"
          onRemove={(file) => {
            return new Promise((resolve, reject) => {
              Modal.confirm({
                title: 'onRemove',
                content: `确认删除 ${file.name}`,
                onConfirm: () => resolve(true),
                onCancel: () => reject('cancel'),
              });
            });
          }}
          defaultFileList={[
            {
              uid: '-2',
              name: 'light.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
            },
            {
              uid: '-1',
              name: 'ice.png',
              url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
            },
          ]}
        />
      </div>
    );
  }
}

export default App;
```
