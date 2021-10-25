import React from 'react';
import { mount } from 'enzyme';
import cloneDeep from 'lodash/cloneDeep';
import Table from '..';
import { columnsGroupColumns } from './common/columns';
import { data, TestData } from './common/data';
import { TableProps } from '../interface';

function mountTable<T = any>(component: React.ReactElement) {
  return mount<React.PropsWithChildren<TableProps<T>>>(component);
}

describe('Table group columns', () => {
  it('basic usage & childrenColumnName', () => {
    const component = mountTable<TestData>(<Table columns={columnsGroupColumns} data={data} />);

    function getRowCell(rowIndex, colIndex) {
      return component
        .find('tr')
        .at(rowIndex)
        .find('th')
        .at(colIndex);
    }

    expect(getRowCell(0, 0).prop('rowSpan')).toBe(2);
    expect(getRowCell(0, 1).prop('colSpan')).toBe(3);
    expect(getRowCell(0, 2).prop('rowSpan')).toBe(2);

    component.setProps({ childrenColumnName: 'list' });

    expect(getRowCell(0, 0).prop('rowSpan')).toBe(undefined);
    expect(getRowCell(0, 1).prop('colSpan')).toBe(undefined);
    expect(getRowCell(0, 2).prop('rowSpan')).toBe(undefined);

    const newColumns = cloneDeep(columnsGroupColumns).map((col, index) => {
      if (index === 1) {
        (col as any).list = col.children;
        delete col.children;
      }
      return col;
    });

    component.setProps({
      columns: newColumns,
    });

    expect(getRowCell(0, 0).prop('rowSpan')).toBe(2);
    expect(getRowCell(0, 1).prop('colSpan')).toBe(3);
    expect(getRowCell(0, 2).prop('rowSpan')).toBe(2);
  });

  it('group columns + selection + expand', () => {
    const component = mountTable<TestData>(
      <Table
        columns={columnsGroupColumns}
        data={data}
        rowSelection={{}}
        expandedRowRender={() => 'expand content'}
      />
    );

    function getRowCell(rowIndex, colIndex) {
      return component
        .find('tr')
        .at(rowIndex)
        .find('th')
        .at(colIndex);
    }

    expect(getRowCell(0, 0).prop('className')).toBe(
      'arco-table-th arco-table-operation arco-table-expand'
    );
    expect(getRowCell(0, 0).prop('rowSpan')).toBe(2);

    expect(getRowCell(0, 1).prop('className')).toBe(
      'arco-table-th arco-table-operation arco-table-checkbox'
    );
    expect(getRowCell(0, 1).prop('rowSpan')).toBe(2);

    expect(getRowCell(0, 2).text()).toBe('Name');
    expect(getRowCell(0, 2).prop('rowSpan')).toBe(2);

    expect(getRowCell(1, 0).text()).toBe('Address');
  });
});
