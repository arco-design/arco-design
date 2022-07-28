import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { render } from '../../../tests/util';
import Table from '..';
import { columnsGroupColumns } from './common/columns';
import { data } from './common/data';

describe('Table group columns', () => {
  it('basic usage & childrenColumnName', () => {
    const component = render(<Table columns={columnsGroupColumns} data={data} />);

    function getRowCell(rowIndex, colIndex) {
      return component.find('tr').item(rowIndex).querySelectorAll('th').item(colIndex);
    }

    expect(getRowCell(0, 0).getAttribute('rowSpan')).toBe('2');
    expect(getRowCell(0, 1).getAttribute('colSpan')).toBe('3');
    expect(getRowCell(0, 2).getAttribute('rowSpan')).toBe('2');

    component.rerender(
      <Table columns={columnsGroupColumns} data={data} childrenColumnName="list" />
    );

    expect(getRowCell(0, 0).getAttribute('rowSpan')).toBe(null);
    expect(getRowCell(0, 1).getAttribute('colSpan')).toBe(null);
    expect(getRowCell(0, 2).getAttribute('rowSpan')).toBe(null);

    const newColumns = cloneDeep(columnsGroupColumns).map((col, index) => {
      if (index === 1) {
        (col as any).list = col.children;
        delete col.children;
      }
      return col;
    });

    component.rerender(<Table columns={newColumns} data={data} childrenColumnName="list" />);

    expect(getRowCell(0, 0).getAttribute('rowSpan')).toBe('2');
    expect(getRowCell(0, 1).getAttribute('colSpan')).toBe('3');
    expect(getRowCell(0, 2).getAttribute('rowSpan')).toBe('2');
  });

  it('group columns + selection + expand', () => {
    const component = render(
      <Table
        columns={columnsGroupColumns}
        data={data}
        rowSelection={{}}
        expandedRowRender={() => 'expand content'}
      />
    );

    function getRowCell(rowIndex, colIndex) {
      return component.find('tr').item(rowIndex).querySelectorAll('th').item(colIndex);
    }
    expect(getRowCell(0, 0).className).toBe('arco-table-th arco-table-operation arco-table-expand');
    expect(getRowCell(0, 0).getAttribute('rowSpan')).toBe('2');

    expect(getRowCell(0, 1).className).toBe(
      'arco-table-th arco-table-operation arco-table-checkbox'
    );
    expect(getRowCell(0, 1).getAttribute('rowSpan')).toBe('2');

    expect(getRowCell(0, 2).textContent).toBe('Name');
    expect(getRowCell(0, 2).getAttribute('rowSpan')).toBe('2');

    expect(getRowCell(1, 0).textContent).toBe('Address');
  });
});
