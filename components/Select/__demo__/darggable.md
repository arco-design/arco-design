---
order: 20
title:
  zh-CN: 拖拽排序
  en-US: Draggable
---

## zh-CN

多选时，指定 `dragToSort` 属性以允许对已输入的值进行拖拽排序。

## en-US

In multiple mode, specify the `dragToSort` property to allow sort the entered values by dragging.

```js
import { Select, Message, Space } from '@arco-design/web-react';

const Option = Select.Option;

const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen'];

ReactDOM.render(
  <Select
    placeholder="Please select"
    style={{ width: 345 }}
    mode="multiple"
    dragToSort
    defaultValue={options.slice(0, 3)}
  >
    {options.map((option, index) => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ))}
  </Select>,
  CONTAINER
);
```
