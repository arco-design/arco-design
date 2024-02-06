import React from 'react';
import { render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Table from '..';
import { columns, columnsCustomRender, columnsCustomStyle } from './common/columns';
import { data } from './common/data';

mountTest(Table);
componentConfigTest(Table, 'Table', { columns: [{ dataIndex: 'a' }] });

describe('Table', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('render table correctly', () => {
    const component = render(<Table columns={columns} data={data} />);
    expect(component.find('tr')).toHaveLength(6);
    const th = component.find('tr').item(0).querySelectorAll('th');
    const td = component.find('tr').item(1).querySelectorAll('td');
    expect(th).toHaveLength(5);
    expect(th.item(0).querySelectorAll('.arco-table-th-item-title')[0].textContent).toBe('Name');
    expect(td.item(0).querySelectorAll('.arco-table-cell')[0].textContent).toBe('Name1');
  });

  it('table no data', () => {
    const component = render(<Table columns={columns} data={[]} />);

    expect(component.find('table tbody td')).toHaveLength(1);
    expect(component.find('table tbody td .arco-empty')).toHaveLength(1);

    component.rerender(<Table columns={columns} data={[]} noDataElement="No Data" />);

    expect(component.find('table tbody td .arco-table-no-data')[0].textContent).toBe('No Data');
  });

  it('table loading', () => {
    const component = render(<Table columns={columns} data={[]} />);

    expect(component.find('.arco-spin .arco-spin-icon')).toHaveLength(0);

    component.rerender(<Table columns={columns} data={[]} loading />);

    expect(component.find('.arco-spin .arco-spin-icon')).toHaveLength(1);
  });

  it('table size', () => {
    const component = render(<Table size="small" columns={columns} data={[]} />);

    expect(component.find('.arco-table')[0].classList.contains('arco-table-size-small')).toBe(true);

    component.rerender(<Table size="middle" columns={columns} data={[]} />);

    expect(component.find('.arco-table')[0].classList.contains('arco-table-size-middle')).toBe(
      true
    );
  });

  it('table cell custom render', () => {
    const component = render(<Table columns={columnsCustomRender} data={data} />);

    expect(component.find('tbody td .arco-tag')).toHaveLength(5);
  });

  it('table column className and style', () => {
    const component = render(
      <Table
        columns={columnsCustomStyle}
        data={data}
        rowClassName={(record) => (record.name === 'Name2' ? 'green' : '')}
      />
    );

    expect(component.find('tr th.red')).toHaveLength(1);
    expect(component.find('tr td.red')).toHaveLength(5);
    expect(component.find('tbody tr.green')).toHaveLength(1);
    expect(component.find('tbody tr').item(1).classList.contains('green')).toBe(true);

    const domTh = component.find('thead th').item(0);
    expect(getComputedStyle(domTh).getPropertyValue('background-color')).toBe('rgb(0, 0, 0)');
    expect(getComputedStyle(domTh).getPropertyValue('color')).toBe('rgb(255, 255, 255)');

    const domTd = component.find('tbody td').item(0);
    expect(getComputedStyle(domTd).getPropertyValue('color')).toBe('rgb(255, 255, 255)');

    const domTh2 = component.find('thead th').item(1);
    expect(getComputedStyle(domTh2).getPropertyValue('color')).toBe('rgb(1, 1, 1)');

    const domTd2 = component.find('tbody td').item(1);
    expect(getComputedStyle(domTd2).getPropertyValue('color')).toBe('rgb(1, 1, 1)');
  });
});
