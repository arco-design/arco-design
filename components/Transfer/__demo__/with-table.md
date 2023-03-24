---
order: 6
title:
  zh-CN: 表格穿梭框
  en-US: With Table
---

## zh-CN

使用 `Table` 组件作为自定义渲染列表。

## en-US

Use `Table` component as a custom rendering list.

```js
import { useState } from 'react';
import { Transfer, Table } from '@arco-design/web-react';

const TableTransfer = ({ sourceColumns, targetColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      listType,
      filteredItems,
      onItemSelect,
      onItemSelectAll,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = listType === 'source' ? sourceColumns : targetColumns;
      return (
        <Table
          style={{
            pointerEvents: listDisabled ? 'none' : null,
            borderRadius: 0,
          }}
          pagination={false}
          data={filteredItems}
          columns={columns}
          rowSelection={{
            checkCrossPage: true,
            selectedRowKeys: listSelectedKeys,
            checkboxProps: (item) => {
              return {
                disabled: listDisabled || item.disabled,
                // Avoid triggering onRow.onClick
                onClick: (e) => e.stopPropagation(),
              };
            },

            onChange(selectedRowKeys) {
              onItemSelectAll(selectedRowKeys, true);
            },
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: (e) => {
              !itemDisabled && !listDisabled && onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const dataSource = [
  {
    key: '0',
    company: 'Bytedance Technology Co., Ltd.',
    headcount: 3000000,
    industry: 'Technology',
  },
  {
    key: '1',
    company: 'Toutiao Co., Ltd.',
    headcount: 40000,
    industry: 'AI',
  },
  {
    key: '2',
    company: 'Beijing Toutiao Technology Co., Ltd.',
    headcount: 500000,
    industry: 'Technology',
  },
  {
    key: '3',
    company: 'Beijing Volcengine Technology...',
    headcount: 6000000,
    industry: 'Technology',
  },
];
const tableColumns = [
  {
    dataIndex: 'company',
    title: 'Company',
  },
  {
    dataIndex: 'headcount',
    title: 'Headcount',
    sorter: (a, b) => a.headcount - b.headcount,
    render: (_, item) => `${item.headcount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
  {
    dataIndex: 'industry',
    title: 'Industry',
    sorter: (a, b) => (a.industry.toUpperCase() > b.industry.toUpperCase() ? 1 : -1),
  },
];

function App() {
  const [targetKeys, setTargetKeys] = useState([]);
  return (
    <TableTransfer
      className="transfer-demo-with-table"
      listStyle={{
        width: 540,
        height: 240,
      }}
      dataSource={dataSource}
      targetKeys={targetKeys}
      sourceColumns={tableColumns}
      targetColumns={tableColumns}
      onChange={(keys) => setTargetKeys(keys)}
    />
  );
}

export default App;
```

```css
.transfer-demo-with-table .arco-table-container {
  border: none !important;
  border-radius: 0 !important;
}

.transfer-demo-with-table .arco-table-th {
  background-color: var(--color-bg-2);
}
```
