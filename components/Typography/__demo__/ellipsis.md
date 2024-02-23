---
order: 8
title:
  zh-CN: 省略（不推荐）
  en-US: Ellipsis(Not recommended)
---

## zh-CN

**不推荐使用 ellipsis 属性开启折叠，建议使用 Typography.Ellipsis 组件替代。**

在空间不足时省略多行文本内容。

**注意**：父元素 `flex` 模式下， 省略的 `Typography` 的 `ellipsis` 场景会收到影响，可以添加 `width: 100%` 使 `Typography` 充满整个父元素。

<br/>
**注意注意注意：  使用谷歌翻译页面导致页面白屏报错？**

组件用了 `React.Fragement` 导致的问题。React 原生的问题 （[Issue 链接](https://github.com/facebook/react/issues/17256)）。可以设置 `ellipsis.wrapper` 解决。比如 `ellipsis={{ wrapper: 'span' }}`。

## en-US
**It is not recommended to use the ellipsis attribute to enable folding. It is recommended to use the Typography.Ellipsis component instead.**

Omit multiple lines of text when there is insufficient space.

**Note**: In the parent element `flex` mode, the omitted `Typography`'s `ellipsis` scene will be affected. You can add `width: 100%` to make the `Typography` fill the entire parent element.

**Attention: Attention: Using Google Translate results in a white screen error on the page? **

The component uses `React.Fragement` to cause problems. React native issues ([Issue link](https://github.com/facebook/react/issues/17256)). It can be solved by setting `ellipsis.wrapper`. For example `ellipsis={{ wrapper: 'span' }}`.

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
