---
order: 1
title: 
  zh-CN: 自定义按钮
  en-US: Custom button
browser: true
---

## zh-CN

可以自定义返回顶部的按钮。

## en-US

You can customize the button to return to the top.

```js
import { BackTop, Button, Typography } from '@arco-design/web-react';
const { Paragraph } = Typography;

const App = () => {
  return (
    <div style={{ position: 'relative', padding: '8px 12px' }}>
      <BackTop
        style={{ position: 'absolute' }}
        visibleHeight={30}
        target={() => document.getElementById('custom_backtop')}
      >
        <Button
          type="primary"
          iconOnly
          style={{ width: 40, height: 40 }}
        >
          UP
        </Button>
      </BackTop>
      <div
        id="custom_backtop"
        style={{ height: 300, overflow: 'auto' }}
      >
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
        <Paragraph>This is the content</Paragraph>
      </div>
    </div>
  );
};

export default App;
```
