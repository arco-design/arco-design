---
order: 5
title:
  zh-CN: 省略
  en-US: Ellipsis
---

## zh-CN

在空间不足时省略多行文本内容。

## en-US

Omit multiple lines of text when there is insufficient space.

```js
import { useState } from 'react';
import { Typography, Switch } from '@arco-design/web-react';

const Demo = () => {
  const [ellipsis, setEllipsis] = useState(true);
  return (
    <>
      <Switch
        checked={ellipsis}
        onChange={() => {
          setEllipsis(!ellipsis);
        }}
      ></Switch>
      <div>
        <Typography.Title heading={4} ellipsis={ellipsis}>
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process.
        </Typography.Title>
        <Typography.Paragraph ellipsis={ellipsis ? { rows: 2, showTooltip: true } : undefined}>
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design. The verb to design expresses the process of developing a design.A
          design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design. The verb to design expresses the process of developing a design.
        </Typography.Paragraph>
        <Typography.Paragraph
          ellipsis={
            ellipsis
              ? {
                  suffix: '(Arco Design)',
                  rows: 2,
                  expandable: true,
                  expandNodes: ['Less', 'More'],
                  showTooltip: {
                    type: 'popover',
                    props: {
                      style: { maxWidth: 500 },
                    },
                  },
                }
              : undefined
          }
        >
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design. The verb to design expresses the process of developing a design. A
          design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design. The verb to design expresses the process of developing a design. 
        </Typography.Paragraph>
        <Typography.Paragraph
          ellipsis={
            ellipsis
              ? {
                  suffix: '(Arco Design)',
                  rows: 2,
                  expandable: true,
                }
              : undefined
          }
        >
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design. The verb to design expresses the process of developing a design. A
          design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design. The verb to design expresses the process of developing a design. 
        </Typography.Paragraph>
      </div>
    </>
  );
};

ReactDOM.render(<Demo />, CONTAINER);
```
