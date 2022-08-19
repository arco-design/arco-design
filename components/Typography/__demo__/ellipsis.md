---
order: 5
title:
  zh-CN: 省略
  en-US: Ellipsis
---

## zh-CN

在空间不足时省略多行文本内容。

**注意**：父元素 `flex` 模式下， 省略的 `Typography` 的 `ellipsis` 场景会收到影响，可以添加 `width: 100%` 使 `Typography` 充满整个父元素。

## en-US

Omit multiple lines of text when there is insufficient space.

**Note**: In the parent element `flex` mode, the omitted `Typography`'s `ellipsis` scene will be affected. You can add `width: 100%` to make the `Typography` fill the entire parent element.

```js
import { Typography } from '@arco-design/web-react';

const mockText =
  'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';
const mockTitle =
  ' A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process.';

const App = () => {
  return (
    <div>
      <Typography.Title heading={4} ellipsis={{ wrapper: 'span' }}>
        {mockTitle}
      </Typography.Title>
      <Typography.Paragraph ellipsis={{ rows: 2, showTooltip: true, expandable: true, wrapper: 'span' }}>
        {mockText}
      </Typography.Paragraph>
      <Typography.Paragraph ellipsis={{ suffix: '---width: 100%', wrapper: 'span' }}>
        {mockTitle}
      </Typography.Paragraph>
    </div>
  );
};

export default App;
```
