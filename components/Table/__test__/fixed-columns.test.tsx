import React from 'react';
import { render } from '../../../tests/util';
import Table from '..';
import { columns, columnsFixedColumns } from './common/columns';
import { data } from './common/data';

describe('Table fixed columns', () => {
  it('basic fixed columns', () => {
    const component = render(
      <Table rowKey="name" scroll={{ x: 600 }} columns={columnsFixedColumns} data={data} />
    );

    // check column width
    const cols = component.find('colgroup col');
    const leftCol = cols.item(0);
    expect(getComputedStyle(leftCol).getPropertyValue('width')).toBe('100px');

    const rightCol = cols.item(cols.length - 1);
    expect(getComputedStyle(rightCol).getPropertyValue('width')).toBe('120px');

    const headTr = component.find('thead tr').item(0);
    const bodyTr = component.find('tbody tr').item(0);

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
      return headTr.querySelectorAll('th').item(i);
    }

    function getBodyCell(i) {
      return bodyTr.querySelectorAll('td').item(i);
    }

    expect(getHeadCell(0).className).toBe(
      'arco-table-th arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getHeadCell(0).getAttribute('style')).toEqual('left: 0px;');

    expect(getBodyCell(0).className).toBe(
      'arco-table-td arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getBodyCell(0).getAttribute('style')).toEqual('left: 0px;');
  });

  it('only fixed selection', () => {
    const component = render(
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

    const headTr = component.find('thead tr').item(0);
    const bodyTr = component.find('tbody tr').item(0);

    function getHeadCell(i) {
      return headTr.querySelectorAll('th').item(i);
    }

    function getBodyCell(i) {
      return bodyTr.querySelectorAll('td').item(i);
    }

    expect(getHeadCell(0).className).toBe(
      'arco-table-th arco-table-operation arco-table-expand arco-table-col-fixed-left'
    );
    expect(getHeadCell(0).getAttribute('style')).toEqual('left: 0px;');

    expect(getHeadCell(1).className).toBe(
      'arco-table-th arco-table-operation arco-table-checkbox arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getHeadCell(1).getAttribute('style')).toEqual('left: 40px;');

    expect(getBodyCell(0).className).toBe(
      'arco-table-td arco-table-operation arco-table-expand-icon-cell arco-table-col-fixed-left'
    );
    expect(getBodyCell(0).getAttribute('style')).toEqual('left: 0px;');

    expect(getBodyCell(1).className).toBe(
      'arco-table-td arco-table-operation arco-table-checkbox arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getBodyCell(1).getAttribute('style')).toEqual('left: 40px;');
  });

  it('fixed columns and fixed header', () => {
    const component = render(
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
    const component = render(
      <Table scroll={{ x: 600, y: 200 }} columns={fixedColumns} data={data} />
    );

    function getHeadCell(component, i) {
      return component.find('thead tr')[0].querySelectorAll('th').item(i);
    }

    function getBodyCell(component, i) {
      return component.find('tbody tr')[0].querySelectorAll('td').item(i);
    }

    expect(getHeadCell(component, 0).className).toBe('arco-table-th');
    expect(getHeadCell(component, 0).getAttribute('style')).toEqual(null);
    expect(getHeadCell(component, 1).className).toBe('arco-table-th');
    expect(getHeadCell(component, 1).getAttribute('style')).toEqual(null);

    expect(getBodyCell(component, 0).className).toBe('arco-table-td');
    expect(getBodyCell(component, 0).getAttribute('style')).toEqual(null);
    expect(getBodyCell(component, 1).className).toBe('arco-table-td');
    expect(getBodyCell(component, 1).getAttribute('style')).toEqual(null);

    component.rerender(
      <Table
        scroll={{ x: 600, y: 200 }}
        columns={fixedColumns.map((col) => {
          if (col.dataIndex === 'name' || col.dataIndex === 'address') {
            return { ...col, fixed: 'left' };
          }
          return col;
        })}
        data={data}
      />
    );

    expect(getHeadCell(component, 0).className).toBe('arco-table-th arco-table-col-fixed-left');
    expect(getHeadCell(component, 0).getAttribute('style')).toEqual('left: 0px;');
    expect(getHeadCell(component, 1).className).toBe(
      'arco-table-th arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getHeadCell(component, 1).getAttribute('style')).toEqual('left: 100px;');

    expect(getBodyCell(component, 0).className).toBe('arco-table-td arco-table-col-fixed-left');
    expect(getBodyCell(component, 0).getAttribute('style')).toEqual('left: 0px;');
    expect(getBodyCell(component, 1).className).toBe(
      'arco-table-td arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getBodyCell(component, 1).getAttribute('style')).toEqual('left: 100px;');
  });

  // issue: https://github.com/arco-design/arco-design/issues/1875
  it('fixed columns with string width', () => {
    const columnsWidthStringWidth = (function () {
      return columns.map((d) => {
        if (d.title === 'Age') {
          return {
            ...d,
            fixed: 'right' as const,
            width: '100px',
          };
        }
        if (d.title === 'Email') {
          return {
            ...d,
            fixed: 'right' as const,
            width: '120px',
          };
        }
        return d;
      });
    })();

    const component = render(
      <Table rowKey="name" scroll={{ x: 600 }} columns={columnsWidthStringWidth} data={data} />
    );

    const headTr = component.find('thead tr').item(0);
    const bodyTr = component.find('tbody tr').item(0);

    function getHeadCell(i) {
      return headTr.querySelectorAll('th').item(i);
    }

    function getBodyCell(i) {
      return bodyTr.querySelectorAll('td').item(i);
    }

    expect(getHeadCell(3).className).toBe(
      'arco-table-th arco-table-col-fixed-right arco-table-col-fixed-right-first'
    );
    expect(getHeadCell(3).getAttribute('style')).toEqual('right: 120px;');

    expect(getBodyCell(3).className).toBe(
      'arco-table-td arco-table-col-fixed-right arco-table-col-fixed-right-first'
    );
    expect(getBodyCell(3).getAttribute('style')).toEqual('right: 120px;');

    expect(getHeadCell(4).className).toBe('arco-table-th arco-table-col-fixed-right');
    expect(getHeadCell(4).getAttribute('style')).toEqual('right: 0px;');

    expect(getBodyCell(4).className).toBe('arco-table-td arco-table-col-fixed-right');
    expect(getBodyCell(4).getAttribute('style')).toEqual('right: 0px;');
  });
});
