---
order: 2
title: 
  zh-CN: 自定义尺寸
  en-US: Size
---

## zh-CN

通过指定样式来自定义各种面包屑的尺寸。

## en-US

Customize the size of various breadcrumbs by specifying the style.

```js
import { Breadcrumb, Space } from '@arco-design/web-react';
const BreadcrumbItem = Breadcrumb.Item;

const App = () => {
  return (
    <Space size={40}>
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Channel</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb style={{ fontSize: 12 }}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Channel</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumb>
    </Space>
  );
};

export default App;
```
