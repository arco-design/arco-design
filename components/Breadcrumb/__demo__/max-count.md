---
order: 5
title: 
  zh-CN: 显示省略
  en-US: Max count
---

## zh-CN

通过 `maxCount` 来指定最多渲染的面包屑数量，超出的部分将显示为省略号。

## en-US

Use `maxCount` to set the maximum number of breadcrumbs to render. The rest will be displayed as an ellipsis.

```js
import { Breadcrumb } from '@arco-design/web-react';
const BreadcrumbItem = Breadcrumb.Item;

const App = () => {
  return (
    <div>
      <Breadcrumb maxCount="3">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Sub Home</BreadcrumbItem>
        <BreadcrumbItem>All Channel</BreadcrumbItem>
        <BreadcrumbItem>Channel</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default App;
```
