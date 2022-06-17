---
order: 0
title: 
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

常规的内容容器，可承载文字、列表、图片、段落，常用于模块划分和内容概览。

## en-US

Basic usage. Can hold anything from text, lists, pictures, to paragraphs. Normally used for module separation and content overview.

```js
import { Card, Link } from '@arco-design/web-react';

const App = () => {
  return (
    <div style={{ display: 'flex' }} >
      <Card style={{ width: 360 }}
        title="Arco Card"
        extra={<Link>More</Link>}
      >
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around
        the world. Toutiao started out as a news recommendation engine and gradually evolved into a
        platform delivering content in various formats.
      </Card>
    </div>
  );
};

export default App;
```
