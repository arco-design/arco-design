---
order: 1
title:
  zh-CN: 单选框组
  en-US: Radio Group
---

## zh-CN

单选组的用法。有两种用法，可以通过 `children` 的方式或者 `options` 数组的方式。

## en-US

A group of radio components. It can be generated by children or a options array.

```js
import { Radio } from '@arco-design/web-react';
const RadioGroup = Radio.Group;

const App = () => {
  return (
    <div>
      <RadioGroup defaultValue="a" style={{ marginBottom: 20 }}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio disabled value="d">
          D
        </Radio>
      </RadioGroup>
      <br />
      <RadioGroup options={['A', 'B', 'C', 'D']} style={{ marginBottom: 20 }} />
      <br />
      <RadioGroup
        options={[
          {
            label: 'A',
            value: 'a',
          },
          {
            label: 'B',
            value: 'b',
          },
          {
            label: 'C',
            value: 'c',
          },
          {
            label: 'D',
            value: 'd',
            disabled: true,
          },
        ]}
      />
    </div>
  );
};

export default App;
```
