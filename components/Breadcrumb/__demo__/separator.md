---
order: 1
title: 
  zh-CN: 自定义分隔符
  en-US: Separator
---

## zh-CN

自定义分隔符。

## en-US

Custom separator.

```js
import { Breadcrumb, Space } from '@arco-design/web-react';
import { IconRight } from '@arco-design/web-react/icon';
const BreadcrumbItem = Breadcrumb.Item;

const App = () => {
  return (
    <Space size={40}>
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Channel</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb separator={<IconRight />}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Channel</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb separator={<span>・</span>}>
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Channel</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumb>
    </Space>
  );
};

export default App;
```
