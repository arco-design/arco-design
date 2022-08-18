---
order: 2
title:
  zh-CN: 表格分页配置
  en-US: Pagination
---

## zh-CN

配置全局的表格分页参数，比如可以全局设置 `tablePagination.hideOnSinglePage`, 当表格数据小于等于一页的时候隐藏分页。

## en-US

Configure global table pagination parameters. For example, you can set `tablePagination.hideOnSinglePage` to hide the pagination when the table data is less than or equal to one page.

```js
import { useState } from 'react';
import { ConfigProvider, Table, Switch, Space, Typography } from '@arco-design/web-react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];
const data = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
];

function App() {
  const [hideOnSinglePage, setHideOnSinglePage] = useState(true);
  return (
    <ConfigProvider
      tablePagination={{
        hideOnSinglePage,
      }}
    >
      <Space style={{ marginBottom: 10 }}>
        <Typography.Text>tablePagination.hideOnSinglePage</Typography.Text>
        <Switch checked={hideOnSinglePage} onChange={(checked) => setHideOnSinglePage(checked)} />
      </Space>
      <Table columns={columns} data={data} />
    </ConfigProvider>
  );
}

export default App;
```
