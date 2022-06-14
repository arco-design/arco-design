---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。

## en-US

List can carry text, pictures, and paragraphs, and is often used to display data.

```js
import { List } from '@arco-design/web-react';

const App = () => {
  return (
    <List
      style={{ width: 622 }}
      size="small"
      header="List title"
      dataSource={[
        'Beijing Bytedance Technology Co., Ltd.',
        'Bytedance Technology Co., Ltd.',
        'Beijing Toutiao Technology Co., Ltd.',
        'Beijing Volcengine Technology Co., Ltd.',
        'China Beijing Bytedance Technology Co., Ltd.',
      ]}
      render={(item, index) => <List.Item key={index}>{item}</List.Item>}
    />
  );
};

export default App;
```
