import { useState } from 'react';
import { Table, Button } from '@self';

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

function Demo() {
  const [data, setData] = useState(allData);
  const [pagination, setPagination] = useState({
    total: allData.length,
    current: 1,
  });

  const changeData = () => {
    setData((data) => {
      return data.map((item) => ({
        ...item,
        name: '!!!' + item.name,
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

export default Demo;
