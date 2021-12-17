---
order: 6
title:
  zh-CN: 拖拽排除
  en-US: Draggable
---

## zh-CN

指定 `dragToSort` 属性以允许对已输入的值进行拖拽排序。

## en-US

Specify the `dragToSort` property to allow sort the entered values by dragging.

```js
import { InputTag } from '@arco-design/web-react';

ReactDOM.render(
  <InputTag style={{ maxWidth: 350 }} allowClear dragToSort defaultValue={['a', 'b', 'c', 'd']} />,
  CONTAINER
);
```
