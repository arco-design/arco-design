import React, { useState } from 'react';
import { Table, Input } from '@self';

const dataSource = [
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
  {
    key: '6',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
  {
    key: '7',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
  {
    key: '8',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
  {
    key: '9',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
  {
    key: '10',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
  {
    key: '11',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
];

const App = () => {
  const [data, setData] = useState(dataSource);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
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
      onFilter: (value, row) => row.salary > value,
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(value) => {
            console.log(value);
            setData((d) => {
              return d.map((item) => {
                return {
                  ...item,
                  email: item.key === record.key ? value : item.email,
                };
              });
            });
          }}
        />
      ),
    },
  ];

  const defaultPagination = {
    showTotal: (total) => total,
    defaultCurrent: 1,
    defaultPageSize: 5,
    showJumper: true,
    sizeCanChange: true,
    pageSizeChangeResetCurrent: true,
  };
  const [pagination, setPagination] = useState(defaultPagination);
  const onChange = (pagination, sorter, filters, extra) => {
    console.log(pagination, sorter, filters, extra);
    setPagination(() => {
      if (typeof pagination === 'boolean') return pagination;
      const resetCurrent = extra.action !== 'paginate';
      return {
        ...pagination,
        total: extra.action === 'filter' ? 100 : pagination.total,
        showTotal: (total) => total,
        // current: resetCurrent ? 1 : pagination?.current
      };
    });
  };

  return <Table columns={columns} data={data} pagination={pagination} onChange={onChange} />;
};

export default App;
