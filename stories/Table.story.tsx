/* eslint-disable no-console,react/no-this-in-sfc */
import React, { useState, useEffect } from 'react';
import { Table, Button, PaginationProps, Space, Switch, TableColumnProps } from '@self';

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

const allData = Array(200)
  .fill('')
  .map((_, index) => ({
    key: `${index}`,
    name: `Kevin Sandra ${index}`,
    salary: 22000,
    address: `${index} Park Road, London`,
    email: `kevin.sandra_${index}@example.com`,
  }));

function DemoTable() {
  const [data, setData] = useState(allData);
  const [pagination, setPagination] = useState<PaginationProps>({
    total: allData.length,
    current: 1,
  });

  const changeData = () => {
    setData((data) => {
      return data.map((item) => ({
        ...item,
        name: `!!!${item.name}`,
      }));
    });
  };

  const deleteData = () => {
    const newData = data.length > 10 ? data.slice(10) : allData;
    const total = newData.length;
    setPagination({
      ...pagination,
      total,
    });
    setData(newData);
  };

  return (
    <>
      <Button onClick={changeData}>改变数据</Button>
      <Button onClick={deleteData}>减少数据</Button>
      <Table
        columns={columns}
        data={data}
        pagination={pagination}
        onChange={(pagination) => {
          setPagination(pagination);
        }}
      />
    </>
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

  const data = Array(100000)
    .fill('')
    .map((_, index) => ({
      key: `${index}`,
      name: `Kevin ${index}`,
      salary: 22000,
      address: `${index} Park Road, London`,
      email: `kevin.sandra_${index}@example.com`,
    }));

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
        return col;
      },
      sorter: (a: any, b: any) => a - b,
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

  useEffect(() => {
    console.log(data);
  }, []);

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
        columns={columns}
        data={data}
      />
    </div>
  );
}

export const TreeData = () => <DemoTreeData />;

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

export default {
  title: 'Table',
};
