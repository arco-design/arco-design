import React, { useState } from 'react';
import { Table, Button } from '@self';

const data = [
  {
    key: '1',
    name: 'Jim Redddddd',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
];

class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  handleChange = (pagination, sorter, filters) => {
    console.log('Various parameters', sorter, filters);
    this.setState({
      sortedInfo: sorter,
      filteredInfo: filters,
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      sortedInfo: null,
      filteredInfo: null,
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        field: 'name',
        direction: 'ascend',
      },
    });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        filteredValue: filteredInfo.name || null,
        sortOrder: sortedInfo.field === 'name' ? sortedInfo.direction : null,
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.field === 'age' ? sortedInfo.direction : null,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [
          { text: 'London', value: 'London' },
          { text: 'New York', value: 'New York' },
        ],
        onFilter: (value, record) => record.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        filterMultiple: false,
        // filteredValue: filteredInfo.address || null,
        // sortOrder: sortedInfo.field === 'address' ? sortedInfo.direction : null,
      },
    ];
    return (
      <>
        <Button onClick={this.setAgeSort}>Sort name</Button>
        <Button onClick={this.clearFilters}>Clear filters</Button>
        <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        <Table columns={columns} data={data} onChange={this.handleChange} />
      </>
    );
  }
}

export default App;
