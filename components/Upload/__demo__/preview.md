---
order: 2
title:
  zh-CN: 照片墙
  en-US: pictures wall
---

## zh-CN

点击图片预览按钮时，可以`onPreview`中进行预览逻辑。

可以通过 `imagePreview` 属性启用内置的图片预览。（`imagePreview` 属性在 `2.41.0` 支持）

## en-US

`onPreview` will be executed when user click preview icon.

The built-in image preview can be enabled via the `imagePreview` property. (The `imagePreview` property is supported in `2.41.0`)

```js
import { Upload, Message } from '@arco-design/web-react';

const App = () => {
  return (
    <div>
      <Upload
        multiple
        imagePreview
        defaultFileList={[
          {
            uid: '-2',
            name: '20200717-103937.png',
            url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
          },
          {
            uid: '-1',
            name: 'hahhahahahaha.png',
            url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
          },
        ]}
        action="/"
        listType="picture-card"
        onPreview={(file) => {
          Message.info('click preview icon')
        }}
      />
    </div>
  );
};

export default App;
```
