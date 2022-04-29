import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { ConfigProvider } from '../..';
import { columnsFilterCustom } from './common/columns';
import { data } from './common/data';

describe('Table test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('table pagination', () => {
    const onChange = jest.fn();
    const component = mount(
      <Table
        columns={columnsFilterCustom}
        data={data}
        onChange={onChange}
        pagination={{ pageSize: 2 }}
      />
    );
    const getFirstName = () => {
      return component.find('tbody td').at(0).find('.arco-table-cell').text();
    };

    expect(component.find('.arco-pagination-list').children()).toHaveLength(5);
    expect(getFirstName()).toBe('Name1');

    component.find('.arco-pagination-list .arco-pagination-item').at(2).simulate('click');

    expect(getFirstName()).toBe('Name3');
    expect(onChange.mock.calls[0][3].action).toBe('paginate');
    expect(onChange.mock.calls[0][3].currentData.map((a) => a.name)).toEqual(['Name3', 'Name4']);

    component.setProps({ pagination: false });

    expect(component.find('.arco-pagination')).toHaveLength(0);
  });

  it('table has no data, the pagination should disappear', () => {
    const component = mount(<Table data={[]} columns={columnsFilterCustom} />);
    expect(component.find('.arco-pagination').exists()).toBeFalsy();
  });

  it('table pagination has correctly priority when set configProvider', () => {
    const data = new Array(20)
      .fill('0')
      .map((_, index) => ({ key: `key${index}`, value: `value${index}` }));
    const columns = ['name', 'value'].map((key) => ({ title: key, dataIndex: key }));
    const component = mount(
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

    expect(component.find('.table-1').find('tbody').find('tr')).toHaveLength(4);
    expect(component.find('.table-2').find('tbody').find('tr')).toHaveLength(6);
    expect(component.find('.table-3').find('tbody').find('tr')).toHaveLength(20);
    expect(component.find('.table-4').find('tbody').find('tr')).toHaveLength(5);
  });
});
