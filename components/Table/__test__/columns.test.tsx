import React from 'react';
import { mount } from 'enzyme';
import cloneDeep from 'lodash/cloneDeep';
import Table from '..';
import { columns, columnsFixedColumns } from './common/columns';
import { data, treeData } from './common/data';

describe('Table columns usage test', () => {
  it('column.width', () => {
    const component = mount(
      <Table
        columns={columns.map((col) => {
          if (col.dataIndex === 'name') {
            return { ...col, width: 200 };
          }
          return col;
        })}
        data={data}
      />
    );

    expect(component.find('colgroup col').at(0).prop('style')).toEqual({ width: 200 });

    component.setProps({
      columns: columns.map((col) => {
        if (col.dataIndex === 'name') {
          return { ...col, width: '200px' };
        }
        return col;
      }),
    });

    expect(component.find('colgroup col').at(0).prop('style')).toEqual({ width: '200px' });
  });

  it('rowSelection change to undefined', () => {
    const component = mount(<Table columns={columns} data={data} />);

    expect(component.find('Checkbox')).toHaveLength(0);

    component.setProps({ rowSelection: {} });

    expect(component.find('Checkbox')).toHaveLength(6);
  });

  it('set columns async, fixed columns correctly', () => {
    const component = mount(<Table columns={[]} data={data} />);

    component.setProps({
      columns: columnsFixedColumns,
    });

    component.update();

    expect(
      component
        .find('.arco-table')
        .getDOMNode()
        .className.indexOf('arco-table-has-fixed-col-left') > -1
    ).toBeTruthy();
    expect(
      component
        .find('.arco-table')
        .getDOMNode()
        .className.indexOf('arco-table-has-fixed-col-right') > -1
    ).toBeTruthy();
  });

  it('delete column, tree data first column correctly', () => {
    const component = mount(<Table data={treeData} columns={columns} />);

    function checkExpandIcon() {
      expect(component.find('IconPlus')).toHaveLength(1);
      expect(component.find('td').at(0).find('IconPlus')).toHaveLength(1);
    }

    checkExpandIcon();

    component.setProps({ columns: columns.filter(({ dataIndex }) => dataIndex !== 'name') });
    component.update();

    checkExpandIcon();

    component.setProps({ columns });
    component.update();

    checkExpandIcon();
  });

  it('Table internal compile do not change origin columns', () => {
    const originColumns = cloneDeep(columns);
    mount(<Table columns={columns} data={[]} />);
    expect(originColumns).toEqual(columns);
  });

  it('Table columns placeholder', () => {
    const component = mount(
      <Table
        data={data.map((col) => {
          if (col.key === '1') {
            return { ...col, name: undefined };
          }
          return col;
        })}
        columns={columns}
      />
    );

    expect(component.find('tbody td').at(0).text()).toBe('');

    component.setProps({
      columns: columns.map((col) => {
        if (col.dataIndex === 'name') {
          return { ...col, placeholder: '-' };
        }
        return col;
      }),
      placeholder: 'x',
    });

    expect(component.find('tbody td').at(0).text()).toBe('-');

    component.setProps({ columns, placeholder: 'x' });

    expect(component.find('tbody td').at(0).text()).toBe('x');
  });
});
