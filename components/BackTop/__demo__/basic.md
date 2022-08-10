---
order: 0
title: 
  zh-CN: 基础用法
  en-US: Basic
browser: true
---

## zh-CN

当滚动到一定高度的时候，在右下角会出现一个返回顶部的按钮。

## en-US

When scrolling to a certain height, a button to return to the top will appear in the lower right corner.

```js
import { BackTop, Typography } from '@arco-design/web-react';

const App = () => {
  return (
    <div style={{ position: 'relative', padding: '8px 12px' }}>
      <BackTop
        visibleHeight={30}
        style={{ position: 'absolute' }}
        target={() => document.getElementById('custom_backtop0')}
      />
      <Typography.Paragraph>
        The button will appear in the bottom corner of the scrolling area
      </Typography.Paragraph>
      <div
        id="custom_backtop0"
        style={{ height: 300, overflow: 'auto' }}
      >
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
      </div>
    </div>
  );
};

export default App;
```
