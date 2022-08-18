---
order: 1
title:
  zh-CN: 带有文字的分割线
  en-US: With Text
---

## zh-CN

通过 `orientation` 指定分割线文字的位置。

## en-US

Specify the position of the texts within divider by `orientation`.

```js
import { Divider, Typography } from '@arco-design/web-react';
const { Paragraph } = Typography;
const orientations = ['left', 'center', 'right'];

const App = () => {
  return (
    <div className="divider-demo">
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider orientation={orientations[0]}>Text</Divider>
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider orientation={orientations[1]}>Text</Divider>
      <Paragraph>A design is a plan or specification for the construction of an object.</Paragraph>
      <Divider orientation={orientations[2]}>Text</Divider>
    </div>
  );
};

export default App;
```

```css:silent
.divider-demo {
  box-sizing: border-box;
  width: 560px;
  padding: 24px;
  border: 30px solid rgb(var(--gray-2));
}
```
