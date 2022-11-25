import React from 'react';
import { render, fireEvent } from '../../../tests/util';
import Table from '..';

describe('Table special case test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('data item is array', () => {
    // case: https://github.com/arco-design/arco-design/issues/1258
    const columns = [
      {
        dataIndex: '[0]',
        title: 'title',
      },
    ];
    const arrayData = [['1'], ['2']];
    const component = render(
      <Table<string[]> rowKey={(record) => record[0]} columns={columns} data={arrayData} />
    );

    expect(component.find('tr')).toHaveLength(3);
    expect(component.find('td')[0].textContent).toBe('1');
  });

  it('data item is number or string', () => {
    // case https://github.com/arco-design/arco-design/issues/1608
    const columns = [
      {
        title: 'title',
        render: (_, record) => record,
      },
    ];
    const arrayData = [1, '2'];
    const component = render(
      <Table<number | string> rowKey={(record) => record} columns={columns} data={arrayData} />
    );

    expect(component.find('tr')).toHaveLength(3);
    expect(component.find('td')[0].textContent).toBe('1');
    expect(component.find('td')[1].textContent).toBe('2');
  });

  it('change data and selectedRows should up-to-date', () => {
    // case: https://github.com/arco-design/arco-design/issues/1294
    const columns = [
      {
        dataIndex: 'title',
        title: 'title',
      },
    ];
    const oldData = [
      { key: '1', title: '1' },
      { key: '2', title: '2' },
    ];
    const newData = [
      { key: '1', title: '1' },
      { key: '2', title: '3' },
    ];
    const onChange = jest.fn();

    const component = render(
      <Table columns={columns} data={oldData} rowSelection={{ onChange, selectedRowKeys: [] }} />
    );

    fireEvent.click(component.find('.arco-checkbox > input').item(2));

    expect(onChange.mock.calls[0][1]).toEqual([{ key: '2', title: '2' }]);

    component.rerender(
      <Table columns={columns} data={newData} rowSelection={{ onChange, selectedRowKeys: [] }} />
    );

    fireEvent.click(component.find('.arco-checkbox > input').item(2));

    expect(onChange.mock.calls[1][1]).toEqual([{ key: '2', title: '3' }]);
  });
});
