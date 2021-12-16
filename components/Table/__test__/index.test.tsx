import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Table from '..';
import { columns, columnsCustomRender, columnsCustomStyle } from './common/columns';
import { data, TestData } from './common/data';
import { TableProps } from '../interface';

mountTest(Table);
componentConfigTest(Table, 'Table', { columns: [{ dataIndex: 'a' }] });

function mountTable<T = any>(component: React.ReactElement) {
  return mount<React.PropsWithChildren<TableProps<T>>>(component);
}

describe('Table', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('render table correctly', () => {
    const component = mountTable<TestData>(<Table columns={columns} data={data} />);
    expect(component.find('tr')).toHaveLength(6);
    const th = component.find('tr').first().find('th');
    const td = component.find('tr').at(1).find('td');
    expect(th).toHaveLength(5);
    expect(th.at(0).find('.arco-table-th-item-title').text()).toBe('Name');
    expect(td.at(0).find('.arco-table-cell').text()).toBe('Name1');
  });

  it('table no data', () => {
    const component = mountTable<TestData>(<Table columns={columns} data={[]} />);

    expect(component.find('table tbody td')).toHaveLength(1);
    expect(component.find('table tbody td .arco-empty')).toHaveLength(1);

    component.setProps({ noDataElement: 'No Data' });

    expect(component.find('table tbody td .arco-table-no-data').text()).toBe('No Data');
  });

  it('table loading', () => {
    const component = mountTable<TestData>(<Table columns={columns} data={[]} />);

    expect(component.find('.arco-spin .arco-spin')).toHaveLength(0);

    component.setProps({ loading: true });

    expect(component.find('.arco-spin .arco-spin')).toHaveLength(1);
  });

  it('table size', () => {
    const component = mountTable<TestData>(<Table size="small" columns={columns} data={[]} />);

    expect(component.find('.arco-table').hasClass('arco-table-size-small')).toBe(true);

    component.setProps({ size: 'middle' });

    expect(component.find('.arco-table').hasClass('arco-table-size-middle')).toBe(true);
  });

  it('table cell custom render', () => {
    const component = mountTable<TestData>(<Table columns={columnsCustomRender} data={data} />);

    expect(component.find('tbody td .arco-tag')).toHaveLength(5);
  });

  it('table column className and style', () => {
    const component = mountTable<TestData>(
      <Table
        columns={columnsCustomStyle}
        data={data}
        rowClassName={(record) => (record.name === 'Name2' ? 'green' : '')}
      />
    );

    expect(component.find('tr th.red')).toHaveLength(1);
    expect(component.find('tr td.red')).toHaveLength(5);
    expect(component.find('tbody tr.green')).toHaveLength(1);
    expect(component.find('tbody tr').at(1).hasClass('green')).toBe(true);

    const domTh = component.find('thead th').at(0).getDOMNode();
    expect(getComputedStyle(domTh).getPropertyValue('background-color')).toBe('rgb(0, 0, 0)');
    expect(getComputedStyle(domTh).getPropertyValue('color')).toBe('rgb(255, 255, 255)');

    const domTd = component.find('tbody td').at(0).getDOMNode();
    expect(getComputedStyle(domTd).getPropertyValue('color')).toBe('rgb(255, 255, 255)');

    const domTh2 = component.find('thead th').at(1).getDOMNode();
    expect(getComputedStyle(domTh2).getPropertyValue('color')).toBe('rgb(1, 1, 1)');

    const domTd2 = component.find('tbody td').at(1).getDOMNode();
    expect(getComputedStyle(domTd2).getPropertyValue('color')).toBe('rgb(1, 1, 1)');
  });
});
