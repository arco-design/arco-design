import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { columns, columnsFixedColumns } from './common/columns';
import { data, TestData } from './common/data';
import { TableProps } from '../interface';

function mountTable<T = any>(component: React.ReactElement) {
  return mount<React.PropsWithChildren<TableProps<T>>>(component);
}

describe('Table fixed columns', () => {
  it('basic fixed columns', () => {
    const component = mountTable<TestData>(
      <Table rowKey="name" scroll={{ x: 600 }} columns={columnsFixedColumns} data={data} />
    );

    // check column width
    const leftCol = component.find('colgroup col').first();
    expect(getComputedStyle(leftCol.getDOMNode()).getPropertyValue('width')).toBe('100px');

    const rightCol = component.find('colgroup col').last();
    expect(getComputedStyle(rightCol.getDOMNode()).getPropertyValue('width')).toBe('120px');

    const headTr = component.find('thead tr').at(0);
    const bodyTr = component.find('tbody tr').at(0);

    expect(
      component.find('th.arco-table-col-fixed-left.arco-table-col-fixed-left-last')
    ).toHaveLength(1);
    expect(
      component.find('th.arco-table-col-fixed-right.arco-table-col-fixed-right-first')
    ).toHaveLength(1);

    expect(
      component.find('td.arco-table-col-fixed-left.arco-table-col-fixed-left-last')
    ).toHaveLength(5);
    expect(
      component.find('td.arco-table-col-fixed-right.arco-table-col-fixed-right-first')
    ).toHaveLength(5);

    function getHeadCell(i) {
      return headTr.find('th').at(i);
    }

    function getBodyCell(i) {
      return bodyTr.find('td').at(i);
    }

    expect(getHeadCell(0).prop('className')).toBe(
      'arco-table-th arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getHeadCell(0).prop('style')).toEqual({ left: 0 });

    expect(getBodyCell(0).prop('className')).toBe(
      'arco-table-td arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getBodyCell(0).prop('style')).toEqual({ left: 0 });
  });

  it('only fixed selection', () => {
    const component = mountTable<TestData>(
      <Table
        rowKey="name"
        scroll={{ x: 600 }}
        columns={columnsFixedColumns.map((col) => {
          if (col.fixed) {
            delete col.fixed;
          }
          return col;
        })}
        data={data}
        rowSelection={{ fixed: true }}
        expandedRowRender={() => 'expanded content'}
      />
    );

    expect(component.find('th.arco-table-col-fixed-left')).toHaveLength(2);

    expect(component.find('td.arco-table-col-fixed-left')).toHaveLength(10);

    const headTr = component.find('thead tr').at(0);
    const bodyTr = component.find('tbody tr').at(0);

    function getHeadCell(i) {
      return headTr.find('th').at(i);
    }

    function getBodyCell(i) {
      return bodyTr.find('td').at(i);
    }

    expect(getHeadCell(0).prop('className')).toBe(
      'arco-table-th arco-table-operation arco-table-expand arco-table-col-fixed-left'
    );
    expect(getHeadCell(0).prop('style')).toEqual({ left: 0 });

    expect(getHeadCell(1).prop('className')).toBe(
      'arco-table-th arco-table-operation arco-table-checkbox arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getHeadCell(1).prop('style')).toEqual({ left: 40 });

    expect(getBodyCell(0).prop('className')).toBe(
      'arco-table-td arco-table-operation arco-table-expand-icon-cell arco-table-col-fixed-left'
    );
    expect(getBodyCell(0).prop('style')).toEqual({ left: 0 });

    expect(getBodyCell(1).prop('className')).toBe(
      'arco-table-td arco-table-operation arco-table-checkbox arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getBodyCell(1).prop('style')).toEqual({ left: 40 });
  });

  it('fixed columns and fixed header', () => {
    const component = mountTable<TestData>(
      <Table rowKey="name" scroll={{ x: 600, y: 200 }} columns={columnsFixedColumns} data={data} />
    );

    expect(component.find('.arco-table-header table')).toHaveLength(1);
    expect(component.find('.arco-table-body table')).toHaveLength(1);
  });

  it('update columns', () => {
    const fixedColumns = columns.map((col) => {
      if (col.dataIndex === 'name' || col.dataIndex === 'address') {
        return { ...col, width: 100 };
      }
      return col;
    });
    const component = mountTable<TestData>(
      <Table scroll={{ x: 600, y: 200 }} columns={fixedColumns} data={data} />
    );

    function getHeadCell(component, i) {
      return component
        .find('thead tr')
        .at(0)
        .find('th')
        .at(i);
    }

    function getBodyCell(component, i) {
      return component
        .find('tbody tr')
        .at(0)
        .find('td')
        .at(i);
    }

    expect(getHeadCell(component, 0).prop('className')).toBe('arco-table-th');
    expect(getHeadCell(component, 0).prop('style')).toEqual({});
    expect(getHeadCell(component, 1).prop('className')).toBe('arco-table-th');
    expect(getHeadCell(component, 1).prop('style')).toEqual({});

    expect(getBodyCell(component, 0).prop('className')).toBe('arco-table-td');
    expect(getBodyCell(component, 0).prop('style')).toEqual({});
    expect(getBodyCell(component, 1).prop('className')).toBe('arco-table-td');
    expect(getBodyCell(component, 1).prop('style')).toEqual({});

    component.setProps({
      columns: fixedColumns.map((col) => {
        if (col.dataIndex === 'name' || col.dataIndex === 'address') {
          return { ...col, fixed: 'left' };
        }
        return col;
      }),
    });
    component.update();

    expect(getHeadCell(component, 0).prop('className')).toBe(
      'arco-table-th arco-table-col-fixed-left'
    );
    expect(getHeadCell(component, 0).prop('style')).toEqual({ left: 0 });
    expect(getHeadCell(component, 1).prop('className')).toBe(
      'arco-table-th arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getHeadCell(component, 1).prop('style')).toEqual({ left: 100 });

    expect(getBodyCell(component, 0).prop('className')).toBe(
      'arco-table-td arco-table-col-fixed-left'
    );
    expect(getBodyCell(component, 0).prop('style')).toEqual({ left: 0 });
    expect(getBodyCell(component, 1).prop('className')).toBe(
      'arco-table-td arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getBodyCell(component, 1).prop('style')).toEqual({ left: 100 });
  });
});
