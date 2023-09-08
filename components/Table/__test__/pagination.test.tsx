import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import Table from '..';
import { ConfigProvider } from '../..';
import { columns, columnsFilterCustom } from './common/columns';
import { data } from './common/data';

describe('Table test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('table pagination', () => {
    const onChange = jest.fn();
    const component = render(
      <Table
        columns={columnsFilterCustom}
        data={data}
        onChange={onChange}
        pagination={{ pageSize: 2 }}
      />
    );
    const getFirstName = () => {
      return component.find('tbody td').item(0).querySelector('.arco-table-cell')?.textContent;
    };

    expect(component.find('.arco-pagination-list')[0].children).toHaveLength(5);
    expect(getFirstName()).toBe('Name1');
    fireEvent.click(component.find('.arco-pagination-list .arco-pagination-item').item(2));

    expect(getFirstName()).toBe('Name3');
    expect(onChange.mock.calls[0][3].action).toBe('paginate');
    expect(onChange.mock.calls[0][3].currentData.map((a) => a.name)).toEqual(['Name3', 'Name4']);
    expect(onChange.mock.calls[0][3].currentAllData.map((a) => a.name)).toEqual([
      'Name1',
      'Name2',
      'Name3',
      'Name4',
      'Name5',
    ]);

    component.rerender(
      <Table columns={columnsFilterCustom} data={data} onChange={onChange} pagination={false} />
    );

    expect(component.find('.arco-pagination')).toHaveLength(0);
  });

  it('table has no data, the pagination should disappear', () => {
    const component = render(<Table data={[]} columns={columnsFilterCustom} />);
    expect(component.find('.arco-pagination')).toHaveLength(0);
  });

  it('table pagination has correctly priority when set configProvider', () => {
    const data = new Array(20)
      .fill('0')
      .map((_, index) => ({ key: `key${index}`, value: `value${index}` }));
    const columns = ['name', 'value'].map((key) => ({ title: key, dataIndex: key }));
    const component = render(
      <ConfigProvider
        tablePagination={{ pageSize: 5 }}
        componentConfig={{ Table: { pagination: { pageSize: 10 } } }}
      >
        {/* props.pagination =>  4 */}
        <Table data={data} columns={columns} pagination={{ pageSize: 4 }} className="table-1" />

        <ConfigProvider componentConfig={{ Table: { pagination: { pageSize: 6 } } }}>
          {/* componentConfig.Table.Pagination => 6 */}
          <Table data={data} columns={columns} className="table-2" />
          {/* no Pagination => total => 20 */}
          <Table data={data} columns={columns} pagination={false} className="table-3" />
        </ConfigProvider>

        {/* tablePagination => 5 */}
        <Table data={data} columns={columns} className="table-4" />
      </ConfigProvider>
    );

    expect(
      component.find('.table-1')[0].querySelectorAll('tbody')[0].querySelectorAll('tr')
    ).toHaveLength(4);
    expect(
      component.find('.table-2')[0].querySelectorAll('tbody')[0].querySelectorAll('tr')
    ).toHaveLength(6);
    expect(
      component.find('.table-3')[0].querySelectorAll('tbody')[0].querySelectorAll('tr')
    ).toHaveLength(20);
    expect(
      component.find('.table-4')[0].querySelectorAll('tbody')[0].querySelectorAll('tr')
    ).toHaveLength(5);
  });

  it('when no data, but pagination.total > 0, should show pagination list', () => {
    const component = render(<Table columns={columns} data={[]} pagination={{ total: 20 }} />);

    expect(component.find('.arco-table-no-data')).toHaveLength(1);
    expect(component.find('.arco-table-pagination')).toHaveLength(1);
  });
});
