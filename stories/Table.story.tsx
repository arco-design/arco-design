/* eslint-disable no-console,react/no-this-in-sfc */
import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Button,
  Space,
  Switch,
  TableColumnProps,
  Input,
  TableInstance,
  Typography,
} from '@self';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    sorter: (a: any, b: any) => a.salary - b.salary,
    defaultSortOrder: 'ascend',
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

const allData = Array(200)
  .fill('')
  .map((_, index) => ({
    key: `${index}`,
    name: `Kevin Sandra ${index}`,
    salary: `${1 + index}`,
    address: `${index} Park Road, London`,
    email: `kevin.sandra_${index}@example.com`,
  }));

function DemoTable() {
  const [data, setData] = useState(allData);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pagination, setPagination] = useState({
    sizeCanChange: true,
    showTotal: true,
    total: 96,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [loading, setLoading] = useState(false);

  function onChangeTable(pagination: any, sorder: any) {
    const { current, pageSize } = pagination;
    console.log(sorder);
    setLoading(true);
    setTimeout(() => {
      setData(allData.slice((current - 1) * pageSize, current * pageSize));
      setPagination((pagination) => ({ ...pagination, current, pageSize }));
      setLoading(false);
    }, 1000);
  }

  return (
    <Table
      loading={loading}
      columns={columns as any}
      data={data}
      pagination={pagination}
      scroll={{
        x: 'max-content',
        y: 300,
      }}
      border={{
        wrapper: true,
        cell: true,
      }}
      onChange={onChangeTable}
      rowSelection={{
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          console.log('selectedRowKeys', selectedRowKeys);
          console.log('selectedRows', selectedRows);
          setSelectedRowKeys(selectedRowKeys as any);
        },
      }}
      renderPagination={(paginationNode) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <Space>
            <span>Selected {selectedRowKeys.length}</span>
            <Button size="mini">Save</Button>
            <Button size="mini">Delete</Button>
          </Space>
          {paginationNode}
        </div>
      )}
    />
  );
}

export const DataChange = () => <DemoTable />;

function DemoVirtualList() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 140,
      fixed: 'left' as const,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      width: 100,
      fixed: 'left' as const,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
      fixed: 'right' as const,
    },
  ];

  const originData = Array(100000)
    .fill('')
    .map((_, index) => ({
      key: `${index}`,
      name: `Kevin ${index}`,
      salary: 22000,
      address: `${index} Park Road, London`,
      email: `kevin.sandra_${index}@example.com`,
    }));

  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setTimeout(() => {
      setData(originData);
    }, 2000);
  }, []);

  return (
    <Table
      virtualized
      scroll={{ x: 1600, y: 500 }}
      border
      columns={columns}
      data={data}
      pagination={false}
      rowSelection={{}}
    />
  );
}

export const VirtualList = () => <DemoVirtualList />;

function DemoTreeData() {
  const [checkStrictly, setCheckStrictly] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (col: any, item: any) => {
        console.log('column.render', col, item);
        if (col === 'Tom Jerry') {
          return <Input defaultValue={col} />;
        }
        return col;
      },
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      sorter: (a: any, b: any) => a.salary - b.salary,
      filters: [
        {
          text: '> 20000',
          value: '20000',
        },
        {
          text: '> 30000',
          value: '30000',
        },
      ],
      defaultFilters: ['20000'],
      onFilter: (value: any, row: any) => row.salary > value,
      sortDirections: ['ascend'],
      defaultSortOrder: 'ascend',
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
      children: [
        {
          key: '1-1',
          name: 'Christina',
          address: '332 Park Road, London',
          email: 'christina@example.com',
        },
      ],
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
      children: [
        {
          key: '2-1',
          name: 'Ed Hellen',
          salary: 17000,
          address: '42 Park Road, London',
          email: 'ed.hellen@example.com',
          children: [
            {
              key: '2-1-1',
              name: 'Eric Miller',
              salary: 23000,
              address: '67 Park Road, London',
              email: 'eric.miller@example.com',
            },
            {
              key: '2-1-2',
              name: 'Tom Jerry',
              salary: 666,
              address: '67 Park Road, London',
              email: 'tom.jerry@example.com',
            },
          ],
        },
        {
          key: '2-2',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com',
        },
        {
          key: '2-3',
          name: 'George Bush',
          salary: 24000,
          address: '62 Park Road, London',
          email: 'george.bush@example.com',
        },
      ],
    },
    {
      key: '7',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        checkStrictly:
        <Switch onChange={(checked) => setCheckStrictly(checked)} checked={checkStrictly} />
      </Space>
      <Table
        onExpand={(r) => {
          console.log('rrrr', r);
        }}
        // scroll={{
        //   x: 'max-content',
        //   y: 300,
        // }}
        rowSelection={{
          type: 'checkbox',
          onChange: (_, selectedRows) => {
            console.log('selectedRows', selectedRows);
          },
          checkStrictly,
          checkboxProps: (r) => {
            return { disabled: false };
          },
        }}
        onChange={(p, s, f, extra) => {
          console.log(extra.currentData);
        }}
        columns={columns as any}
        data={data}
      />
    </div>
  );
}

export const TreeData = () => <DemoTreeData />;

export const DefaultExpand = () => {
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
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];

  const data2 = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      children: [
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
      ],
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
      children: [
        {
          key: '4',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
      ],
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
      children: [
        {
          key: '6',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
      ],
    },
  ];

  return (
    <>
      <Table
        pagination={{
          sizeCanChange: true,
          showTotal: true,
        }}
        border={false}
        columns={columns}
        data={data}
        expandedRowRender={(record) => {
          return `This is No.${record.key} description.`;
        }}
        onExpand={(detail, expanded) => {
          console.log(detail, expanded);
        }}
        onExpandedRowsChange={(expandedRows) => {
          console.log(expandedRows);
        }}
        rowKey="key"
        defaultExpandAllRows
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: [],
        }}
        scroll={{
          x: 'max-content',
          y: 300,
        }}
        expandProps={{
          expandRowByClick: true,
          rowExpandable: (record) => record.key !== '4',
        }}
      />
      <Table
        pagination={false}
        border={false}
        columns={columns}
        data={data2}
        rowKey="key"
        expandProps={{
          expandRowByClick: true,
        }}
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: [],
        }}
      />
    </>
  );
};

const DemoDataClass = () => {
  class Klass {
    key: string;

    name: string;

    salary: number;

    address: string;

    email: string;

    children: any;

    constructor({ key, name, salary, address, email, children }: any) {
      this.key = key;
      this.name = name;
      this.salary = salary;
      this.address = address;
      this.email = email;
      this.children = children;
    }

    fn() {}
  }

  const columns: TableColumnProps[] = [
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
      render(col: any, item: any, index: number) {
        // 2.31.2 -> 2.36.0
        // item被复制了一份，没有保留原来的数据结构
        // 以前是Klass实例
        // 现在是一个普通对象
        console.log({ col, item, index });
        return <span>{col}</span>;
      },
    },
  ];
  const data = [
    new Klass({
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      children: [
        new Klass({
          key: '3',
          name: 'Jane Doe',
          salary: 23000,
          address: '32 Park Road, London',
          email: 'jane.doe@example.com',
        }),
      ],
    }),
    new Klass({
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    }),
  ];
  return <Table columns={columns} data={data} />;
};

export const DataClass = () => <DemoDataClass />;

export const SortTable = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'n',
      sorter: (a: any, b: any) => (a.name > b.name ? 1 : -1),
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'a',
      filters: [
        {
          text: '> 20',
          value: 20,
        },
        {
          text: '> 30',
          value: 30,
        },
      ],
      defaultFilters: [20],
      onFilter: (value: any, row: any) => row.age > value,
      // defaultSortOrder: 'ascend' as const,
      sorter: (a: any, b: any) => a.age - b.age,
      render: (_: any, record: any) => record.age,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const [innerColumns, setInnerColumns] = useState(columns);

  useEffect(() => {
    setTimeout(() => {
      setInnerColumns((columns: any) => {
        return [
          ...columns.map((item: any) =>
            item.dataIndex === 'age' ? { ...item, sortOrder: 'ascend' } : item
          ),
        ];
      });
    }, 1000);
  }, []);

  // const columnsSorter = (function () {
  //   return columns.map((d) => {
  //     if (d.title === 'Age') {
  //       return {
  //         ...d,
  //         defaultSortOrder: 'ascend' as const,
  //         sorter: (a: any, b: any) => a.age - b.age,
  //       };
  //     }
  //     return d;
  //   });
  // })();

  const data = [
    {
      key: '1',
      name: 'Name1',
      address: 'Address1',
      sex: 'male',
      age: 20,
      email: 'email1@123.com',
    },
    {
      key: '2',
      name: 'Name2',
      address: 'Address2',
      sex: 'male',
      age: 26,
      email: 'email2@123.com',
    },
    {
      key: '3',
      name: 'Name3',
      address: 'Address3',
      sex: 'female',
      age: 18,
      email: 'email3@123.com',
    },
    {
      key: '4',
      name: 'Name4',
      address: 'Address4',
      sex: 'male',
      age: 32,
      email: 'email4@123.com',
    },
    {
      key: '5',
      name: 'Name5',
      address: 'Address5',
      sex: 'female',
      age: 24,
      email: 'email5@123.com',
    },
  ];

  return (
    <Table
      columns={innerColumns as any}
      data={data}
      onChange={(_, sorder) => {
        console.log(sorder);
        if (sorder && !Array.isArray(sorder)) {
          setInnerColumns((columns) => {
            return columns.map((item) =>
              item.key === sorder.field ? { ...item, sortOrder: sorder.direction } : item
            );
          });
        }
      }}
    />
  );
};

export const FixedTable = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: 140,
      colSpan: 2,
    },
    {
      title: 'Test2',
      dataIndex: 'test2',
      width: 100,
      colSpan: 0,
    },
    {
      title: 'Test3',
      dataIndex: 'test3',
      width: 100,
    },
    {
      title: 'Test4',
      dataIndex: 'test4',
      width: 100,
    },
    {
      title: 'Information',
      children: [
        {
          title: 'Email',
          dataIndex: 'email',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
        },
      ],
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      // fixed: 'right',
      width: 120,
    },
    {
      title: 'User Info',
      fixed: 'right',
      children: [
        {
          title: 'Birthday',
          dataIndex: 'birthday',
          fixed: 'right',
          width: 120,
        },
        {
          title: 'Address',
          fixed: 'right',
          children: [
            {
              title: 'City',
              dataIndex: 'city',
              fixed: 'right',
              width: 120,
            },
            {
              title: 'Road',
              dataIndex: 'road',
              fixed: 'right',
              width: 120,
            },
            {
              title: 'No.',
              dataIndex: 'no',
              fixed: 'right',
              width: 120,
            },
          ],
        },
      ],
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      birthday: '1994-04-21',
      city: 'London',
      road: 'Park',
      no: '34',
      phone: '12345678',
      email: 'jane.doe@example.com',
    },
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 25000,
      birthday: '1994-05-21',
      city: 'London',
      road: 'Park',
      no: '37',
      phone: '12345678',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 22000,
      birthday: '1992-02-11',
      city: 'Paris',
      road: 'Arco',
      no: '67',
      phone: '12345678',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 17000,
      birthday: '1991-06-21',
      city: 'London',
      road: 'Park',
      no: '317',
      phone: '12345678',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 27000,
      birthday: '1996-08-21',
      city: 'Paris',
      road: 'Park',
      no: '114',
      phone: '12345678',
      email: 'william.smith@example.com',
    },
  ];
  return (
    <Table
      scroll={{
        x: 'max-content',
        y: 200,
      }}
      // expandedRowRender={(record) => `${record.name}'s address is ${record.address}`}
      // rowSelection={{}}
      border={{
        wrapper: true,
        cell: true,
      }}
      columns={columns as any}
      data={data}
    />
  );
};

export const SortDemoTable = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: 'Score A',
      dataIndex: 'scoreA',
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a: any, b: any) => a.scoreA - b.scoreA,
        multiple: 3,
      },
    },
    {
      title: 'Score B',
      dataIndex: 'scoreB',
      defaultSortOrder: 'ascend',
      sorter: {
        compare: (a: any, b: any) => a.scoreB - b.scoreB,
        multiple: 2,
      },
    },
    {
      title: 'Score C',
      dataIndex: 'scoreC',
      sorter: {
        compare: (a: any, b: any) => a.scoreC - b.scoreC,
        multiple: 1,
      },
    },
  ];

  const data = [
    {
      key: '1',
      name: 'A',
      age: 18,
      scoreA: 100,
      scoreB: 60,
      scoreC: 70,
    },
    {
      key: '2',
      name: 'B',
      age: 17,
      scoreA: 100,
      scoreB: 90,
      scoreC: 80,
    },
    {
      key: '3',
      name: 'C',
      age: 19,
      scoreA: 100,
      scoreB: 70,
      scoreC: 60,
    },
    {
      key: '4',
      name: 'D',
      age: 15,
      scoreA: 80,
      scoreB: 70,
      scoreC: 100,
    },
    {
      key: '5',
      name: 'E',
      age: 20,
      scoreA: 80,
      scoreB: 70,
      scoreC: 90,
    },
  ];
  return (
    <div>
      <Table data={data} columns={columns as any} loading />
    </div>
  );
};

export function SummaryTable() {
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
      name: 'Jane Doe Jane DoeJane DoeJane Doe',
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

  function summary(currentData: any) {
    return (
      <Table.Summary.Row>
        <Table.Summary.Cell>Total</Table.Summary.Cell>
        <Table.Summary.Cell
          style={{
            backgroundColor: 'rgb(var(--success-1))',
          }}
        >
          <Typography.Text type="success" bold>
            {currentData.reduce((prev: any, next: any) => prev + next.salary, 0)}
          </Typography.Text>
        </Table.Summary.Cell>
        <Table.Summary.Cell>
          {currentData.reduce((prev: any, next: any) => prev + next.count, 0)}
        </Table.Summary.Cell>
        <Table.Summary.Cell>
          {currentData.reduce((prev: any, next: any) => prev + next.stars, 0)}
        </Table.Summary.Cell>
      </Table.Summary.Row>
    );
  }

  return (
    <Table
      columns={columns as any}
      data={data}
      scroll={{ x: 'max-content', y: 200 }}
      border={{
        wrapper: true,
        cell: true,
      }}
      summary={summary}
    />
  );
}

export function ArrayDataTable() {
  const data = [
    [
      {
        value: '2020',
      },
      {
        value: '0',
        proportion_ratio: 0,
        formula_desc: '',
        interactive_name: '2020',
      },
      {
        value: '653',
        proportion_ratio: 0.4385,
        formula_desc: '',
        interactive_name: '2020',
      },
    ],
    [
      {
        value: '2021',
      },
      {
        value: '0',
        proportion_ratio: 0,
        formula_desc: '',
        interactive_name: '2021',
      },
      {
        value: '502',
        proportion_ratio: 0.3371,
        formula_desc: '',
        interactive_name: '2021',
      },
    ],
    [
      {
        value: '2022',
      },
      {
        value: '735339258',
        proportion_ratio: 0.5002,
        formula_desc: '',
        interactive_name: '2022',
      },
      {
        value: '237',
        proportion_ratio: 0.1592,
        formula_desc: '',
        interactive_name: '2022',
      },
    ],
    [
      {
        value: '2023',
      },
      {
        value: '734677338',
        proportion_ratio: 0.4998,
        formula_desc: '',
        interactive_name: '2023',
      },
      {
        value: '97',
        proportion_ratio: 0.0651,
        formula_desc: '',
        interactive_name: '2023',
      },
    ],
  ];

  const columns = [
    {
      title: '测试',
      dataIndex: '0',
      children: [
        {
          title: 'Name',
          dataIndex: '0.value',
          render: (col: any, row: any, index: number) => {
            console.log('col===>', col);
            console.log('row===>', row);
            console.log('data[index]===>', data[index]);
            console.log('index===>', index);
            return col;
          },
        },
      ],
    },
  ];

  function expandedRowRender() {
    return <Table columns={columns} data={data} pagination={false} />;
  }

  return (
    <Table indentSize={60} expandedRowRender={expandedRowRender} columns={columns} data={data} />
  );
}

export function NoKeyTableDemo() {
  return (
    <Table
      rowSelection={{}}
      columns={[{ title: <></> }, { title: <></> }, { title: <></> }]}
      data={[{ key: 1 }, { key: 2 }, { key: 3 }]}
    />
  );
}

export function NoDataDemo() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left' as const,
      width: 500,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      width: 500,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 500,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 500,
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Table columns={columns} data={undefined} />
    </div>
  );
}

function DemoScrollIntoView() {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 140,
      // fixed: 'left' as const,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      // width: 100,
      // fixed: 'left' as const,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      // width: 200,
      // fixed: 'right' as const,
    },
  ];

  const originData = Array(100000)
    .fill('')
    .map((_, index) => ({
      key: `${index}`,
      name: `Kevin ${index}`,
      salary: 22000,
      address: `${index} Park Road, London`,
      email: `kevin.sandra_${index}@example.com`,
    }));

  const table = useRef<TableInstance>(null);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setTimeout(() => {
      setData(originData);
    }, 2000);
  }, []);

  return (
    <div>
      <Button onClick={() => table.current?.scrollIntoView('200')}>滚动到200</Button>
      <Table
        ref={table}
        virtualized
        scroll={{ x: 1600, y: 500 }}
        border
        columns={columns}
        data={data}
        pagination={false}
        rowSelection={{}}
      />
    </div>
  );
}

export const ScrollIntoView = () => <DemoScrollIntoView />;

export default {
  title: 'Table',
};
