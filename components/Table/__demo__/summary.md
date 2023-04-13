---
order: 24
title:
  zh-CN: 总结栏
  en-US: Summary
---

## zh-CN

总结栏 summary 的用法。

## en-US

The usage of summary.

```js
import { Table, Typography, Button } from '@arco-design/web-react';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: 'left',
    width: 200,
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Stars',
    dataIndex: 'stars',
  },
];
const data = [
  {
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    count: 66,
    stars: 5,
  },
  {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    count: 55,
    stars: 8,
  },
  {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    count: 100,
    stars: 2,
  },
  {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    count: 88,
    stars: 10,
  },
  {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    count: 120,
    stars: 4,
  },
];

function summary(currentData) {
  return (
    <Table.Summary.Row>
      <Table.Summary.Cell>Total</Table.Summary.Cell>
      <Table.Summary.Cell
        style={{
          backgroundColor: 'rgb(var(--success-1))',
        }}
      >
        <Typography.Text type="success" bold>
          {currentData.reduce((prev, next) => prev + next.salary, 0)}
        </Typography.Text>
      </Table.Summary.Cell>
      <Table.Summary.Cell>
        {currentData.reduce((prev, next) => prev + next.count, 0)}
      </Table.Summary.Cell>
      <Table.Summary.Cell>
        {currentData.reduce((prev, next) => prev + next.stars, 0)}
      </Table.Summary.Cell>
    </Table.Summary.Row>
  );
}

const App = () => {
  return (
    <div>
      <Table
        columns={columns}
        data={data}
        border={{
          wrapper: true,
          cell: true,
        }}
        summary={summary}
      />
      <Table
        style={{
          marginTop: 20,
        }}
        columns={columns.concat({
          title: 'Operation',
          dataIndex: 'operation',
          render: () => (
            <Button type="primary" size="mini">
              Confirm
            </Button>
          ),
          fixed: 'right',
          width: 100,
        })}
        data={data}
        scroll={{
          x: 1200,
        }}
        border={{
          wrapper: true,
          cell: true,
        }}
        summary={(currentData) => (
          <Table.Summary>
            <Table.Summary.Row>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>
                <Typography.Text type="error">
                  {currentData.reduce((prev, next) => prev + next.salary, 0)}
                </Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {currentData.reduce((prev, next) => prev + next.count, 0)}
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                {currentData.reduce((prev, next) => prev + next.stars, 0)}
              </Table.Summary.Cell>
              <Table.Summary.Cell />
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell>Avarage</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={3}>
                <Typography.Text type="success">
                  {currentData.reduce((prev, next) => prev + next.salary, 0) / 5}
                </Typography.Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell />
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
      <Table
        style={{ marginTop: 20 }}
        columns={columns}
        data={data}
        scroll={{
          x: 1200,
          y: 150,
        }}
        border={{
          wrapper: true,
          cell: true,
        }}
        summary={(currentData) => (
          <Table.Summary fixed="bottom">{summary(currentData)}</Table.Summary>
        )}
      />
    </div>
  );
};

export default App;
```
