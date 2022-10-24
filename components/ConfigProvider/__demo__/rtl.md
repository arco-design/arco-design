---
order: 5
title:
  zh-CN: RTL 视图
  en-US: RTL
---

## zh-CN

设置组件为从右向左阅读的视图。

## en-US

Set the component to a view that reads from right to left.

```tsx
import React, { useState } from 'react';
import {
  ConfigProvider,
  Divider,
  Switch,
  Space,
  Badge,
  Avatar,
  Tabs,
  Tag,
  DatePicker,
  Pagination,
} from '@arco-design/web-react';

const TabPane = Tabs.TabPane;

function App() {
  const [rtl, setRtl] = useState(true);

  return (
    <div>
      <Switch checkedText='RTL' uncheckedText='LTR' checked={rtl} onChange={(checked) => setRtl(checked)} />
      <Divider />
      <ConfigProvider rtl={rtl} effectGlobalNotice={false}>
        <Tabs defaultActiveTab='1' style={{ marginBottom: 20 }}>
          <TabPane key='1' title='Tab 1' />
          <TabPane key='2' title='Tab 2' />
          <TabPane key='3' title='Tab 3' />
        </Tabs>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space size="large">
            <Badge count={9}>
              <Avatar shape='square' />
            </Badge>
            <Badge
              count={9}
              dot
              dotStyle={{ width: 10, height: 10 }}
            >
              <Avatar shape='square' />
            </Badge>
            <Tag color="red" closable>red</Tag>
            <Tag color="arcoblue" closable>arcoblue</Tag>
            <Tag color="green" closable>green</Tag>
          </Space>
          <Space>
            <DatePicker />
            <DatePicker.RangePicker style={{ width: 300 }} />
          </Space>
          <Pagination defaultCurrent={5} total={200} sizeCanChange />
        </Space>
      </ConfigProvider>
    </div>
  );
}

export default App;
```
