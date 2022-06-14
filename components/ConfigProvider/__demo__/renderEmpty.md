---
order: 3
title:
  zh-CN: 空元素
  en-US: renderEmpty
---

## zh-CN

通过 `renderEmpty` 可以定义组件内显示的空元素。

## en-US

Use `renderEmpty` to define the empty elements displayed in the component.

```js
import { useState } from 'react';
import {
  ConfigProvider,
  Cascader,
  Select,
  TreeSelect,
  List,
  Table,
  Space,
  Empty,
  Typography,
} from '@arco-design/web-react';

function renderEmpty(componentName) {
  switch (componentName) {
    case 'Cascader':
      return <Typography.Text>Cascader no data!</Typography.Text>;

    case 'Select':
      return <Typography.Text>Select no data!</Typography.Text>;

    case 'TreeSelect':
      return <Typography.Text>TreeSelect no data!</Typography.Text>;

    case 'List':
      return <Empty description="List no data!" />;

    case 'Table':
      return <Empty description="Table no data!" />;

    default:
      return <Empty />;
  }
}

const App = () => {
  return (
    <ConfigProvider renderEmpty={renderEmpty}>
      <Space>
        <Cascader style={{ width: 200 }} placeholder="Cascader" />
        <Select style={{ width: 200 }} placeholder="Select" />
        <TreeSelect style={{ width: 200 }} placeholder="TreeSelect" />
      </Space>
      <List header="Empty List" style={{ marginTop: 20 }}/>
      <Table
        data={[]}
        columns={[
          {
            title: 'Name',
            key: 'name',
          },
          {
            title: 'Age',
            key: 'age',
          },
        ]}
        style={{ marginTop: 20 }} />
    </ConfigProvider>
  );
};

export default App;
```
