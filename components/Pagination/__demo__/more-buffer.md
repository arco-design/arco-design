---
order: 11
title:
  zh-CN: 省略页码时展示长度
  en-US: Display length when page numbers are omitted
---

## zh-CN

通过 `bufferSize` 可以设置 `current` 页与 `...` 之间的页码个数。


一个 `...` 至少代表省略 `2` 页。

## en-US

With `bufferSize` you can set the number of pages between the `current` page and `...`.

An `...` means at least `2` pages are omitted.

```js
import { Pagination,  Space } from '@arco-design/web-react';

ReactDOM.render(
  <div>
    <Space direction='vertical' size="large">
      <Pagination sizeCanChange total={200} bufferSize={0} defaultCurrent={10} />
      <Pagination sizeCanChange total={200} bufferSize={1} defaultCurrent={10} />
      <Pagination sizeCanChange total={200} bufferSize={2} defaultCurrent={10} />
    </Space>
  </div>,
  CONTAINER
);
```
