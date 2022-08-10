---
order: 5
title:
  zh-CN: 栅格列表
  en-US: Grid List
---

## zh-CN

通过 `grid.span` 设置期望每行展示的列数。

## en-US

Use `grid.span` to set the number of columns expected to occupy.

```js
import { List, Card } from '@arco-design/web-react';
const data = [
  {
    title: 'Platform',
    data: ['iOS', 'Android', 'Web'],
  },
  {
    title: 'Framework',
    data: ['Angular', 'Vue', 'React'],
  },
  {
    title: 'Language',
    data: ['C++', 'JavaScript', 'Python'],
  },
  {
    title: 'Component',
    data: ['Button', 'Breadcrumb', 'Transfer'],
  },
];

const App = () => {
  return (
    <List
      grid={{ gutter: 0, span: 6 }}
      dataSource={data}
      bordered={false}
      render={(item, index) => (
        <List.Item key={index}>
          <List
            size="small"
            header={item.title}
            dataSource={item.data}
            render={(item, index) => <List.Item key={index}>{item}</List.Item>}
          />
        </List.Item>
      )}
    />
  );
};

export default App;
```
