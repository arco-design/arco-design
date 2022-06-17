---
order: 4
title:
  zh-CN: 图片列表样式
  en-US: pictures with list
---

## zh-CN

图片列表样式

## en-US

Pictures with list style.

```js
import { Upload, Radio } from '@arco-design/web-react';
const defaultFileList = [
  {
    uid: '-3',
    name: 'light.png',
    url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  },
];

const App = () => {
  return (
    <div>
      <Upload
        listType="picture-list"
        action="/"
        multiple
        defaultFileList={defaultFileList}
      ></Upload>
    </div>
  );
};

export default App;
```
