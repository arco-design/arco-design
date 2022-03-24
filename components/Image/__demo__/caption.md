---
order: 1
title:
  zh-CN: 显示 Caption
  en-US: Show caption
---

## zh-CN

通过设置 `title` 和 `description` 可以将图片的标题和描述显示在图片内部或者底部，显示的位置通过 `footerPosition` 控制。

## en-US

By setting `title` and `description`, the title and description of the picture can be displayed inside or at the bottom of the picture. The display position is controlled by `footerPosition`.

```js
import { Image } from '@arco-design/web-react';

function Demo() {
  const src = '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp';
  const title = 'A user’s avatar';
  const description = 'Present by Arco Design';

  return <div>
    <Image
      width={200}
      src={src}
      title={title}
      description={description}
      alt="lamp"
    />
    <Image
      width={200}
      src={src}
      title={title}
      description={description}
      footerPosition="outer"
      style={{ marginLeft: 67, verticalAlign: 'top' }}
      alt="lamp"
    />
  </div>
}

ReactDOM.render(
  <Demo/>,
  CONTAINER
);
```
