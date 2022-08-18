---
order: 6
title:
  zh-CN: 响应式栅格
  en-US: Responsive List Grid
---

## zh-CN

通过 `grid.sm` 等响应式参数动态设置每个单项横跨的列数，注意此时不要设置 `grid.span`。

## en-US


Dynamically set the number of columns occupied by each item through parameters such as `grid.sm`. Be careful not to set `grid.span` at this time.

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
  {
    title: 'Design',
    data: ['Figma', 'Sketch', 'Adobe XD'],
  },
  {
    title: 'Plugin',
    data: ['Edu Tools', 'BashSupport', 'GitToolBox'],
  },
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
];

const App = () => {
  return (
    <List
      grid={{
        sm: 24,
        md: 12,
        lg: 8,
        xl: 6,
      }}
      dataSource={data}
      bordered={false}
      render={(item, index) => (
        <List.Item key={index}>
          <List
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
