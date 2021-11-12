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
import { useState } from 'react';
import { Typography, Switch, Tag } from '@arco-design/web-react';

const mockText = 'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.'

const mockTitle = ' A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process.'

const Demo = () => {
  const [ellipsis, setEllipsis] = useState(true);
  return (
    <>
      <Switch
        checked={ellipsis}
        onChange={() => {
          setEllipsis(!ellipsis);
        }}
      />
      <div>
        <Typography.Title heading={4} ellipsis={ellipsis}>
          {mockTitle}
        </Typography.Title>
        <Typography.Paragraph ellipsis={ellipsis ? { rows: 2, showTooltip: true, expandable: true } : undefined}>
          {mockText}
        </Typography.Paragraph>
      </div>

      <div>
        <Typography.Title style={{ width: '240px' }} heading={4}>
          Ellipsis in flex scene
        </Typography.Title>
        <div style={{ display: 'flex' }}>
          <Typography.Paragraph ellipsis={ellipsis ? { suffix: "----width: 100%" } : undefined} style={{ width: '100%' }}>
          {mockTitle}
          </Typography.Paragraph>
        </div>
        <div style={{ display: 'flex' }}>
          <Typography.Paragraph ellipsis={ ellipsis ? { suffix: "----width: normal" } : undefined}>
             {mockTitle}
          </Typography.Paragraph>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(<Demo />, CONTAINER);
```
