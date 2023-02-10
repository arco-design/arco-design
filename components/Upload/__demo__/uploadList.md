---
order: 1
title:
  zh-CN: 已上传的文件列表
  en-US: upload list
---

## zh-CN

默认的文件上传列表

## en-US

Default upload list.

```js
import { Upload, Radio, Modal } from '@arco-design/web-react';
const defaultFileList = [
  {
    uid: '-1',
    name: 'ice.png',
    url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
  },
  {
    status: 'error',
    uid: '-2',
    percent: 0,
    response: '上传错误提示',
    name: 'cat.png',
    url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
  },
  {
    uid: '-3',
    name: 'light.png',
    url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  },
];

const App = () => {
  return (
    <div>
      <Upload action="/" multiple defaultFileList={defaultFileList}></Upload>
    </div>
  );
};

export default App;
```
