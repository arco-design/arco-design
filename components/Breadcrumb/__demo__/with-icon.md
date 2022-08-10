---
order: 3
title: 
  zh-CN: 自定义图标
  en-US: With icon
---

## zh-CN

可以在内容中使用自定义图标

## en-US

Customize icons in content.

```js
import { Breadcrumb, Space } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
const BreadcrumbItem = Breadcrumb.Item;

const App = () => {
  return (
    <Space size={40}>
      <Breadcrumb>
        <BreadcrumbItem>
          <IconHome />
        </BreadcrumbItem>
        <BreadcrumbItem>Channel</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb style={{ fontSize: 12 }}>
        <BreadcrumbItem>
          <IconHome />
        </BreadcrumbItem>
        <BreadcrumbItem>Channel</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumb>
    </Space>
  );
};

export default App;
```
