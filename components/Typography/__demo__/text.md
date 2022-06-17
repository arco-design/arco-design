---
order: 2
title:
  zh-CN: 文本
  en-US: Text
---

## zh-CN

不同样式的文本以及超链接组件。

## en-US

Different styles of text.

```js
import React from 'react';
import { Typography, Divider } from '@arco-design/web-react';

function Layout(props) {
  return React.Children.map(props.children, (child) => {
    return (
      <div style={{ marginBottom: 10, }} >
        {child}
      </div>
    );
  });
}

const App = () => {
  return (
    <Layout>
      <Typography.Text>Arco Design</Typography.Text>
      <Typography.Text type="secondary">Secondary</Typography.Text>
      <Typography.Text type="primary">Primary</Typography.Text>
      <Typography.Text type="success">Success</Typography.Text>
      <Typography.Text type="warning">Warning</Typography.Text>
      <Typography.Text type="error">Error</Typography.Text>
      <Typography.Text bold>Bold</Typography.Text>
      <Typography.Text disabled>Disabled</Typography.Text>
      <Typography.Text mark>Mark</Typography.Text>
      <Typography.Text underline>Underline</Typography.Text>
      <Typography.Text delete>Line through</Typography.Text>
      <Typography.Text code>Code snippet</Typography.Text>
    </Layout>
  );
};

export default App;
```
