import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { render } from '../../../tests/util';
import Table from '..';
import { columns, columnsFixedColumns } from './common/columns';
import { data, treeData } from './common/data';

describe('Table columns usage test', () => {
  it('column.width', () => {
    const component = render(
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

    expect(component.find('colgroup col').item(0).getAttribute('style')).toEqual('width: 200px;');

    component.rerender(
      <Table
        columns={columns.map((col) => {
          if (col.dataIndex === 'name') {
            return { ...col, width: '200px' };
          }
          return col;
        })}
        data={data}
      />
    );

    expect(component.find('colgroup col').item(0).getAttribute('style')).toEqual('width: 200px;');
  });

  it('rowSelection change to undefined', () => {
    const component = render(<Table columns={columns} data={data} />);

    expect(component.find('.arco-checkbox')).toHaveLength(0);

    component.rerender(<Table columns={columns} data={data} rowSelection={{}} />);

    expect(component.find('.arco-checkbox')).toHaveLength(6);
  });

  it('set columns async, fixed columns correctly', () => {
    const component = render(<Table columns={[]} data={data} />);

    component.rerender(<Table columns={columnsFixedColumns} data={data} />);

    expect(
      component.find('.arco-table').item(0).className.indexOf('arco-table-has-fixed-col-left') > -1
    ).toBeTruthy();
    expect(
      component.find('.arco-table').item(0).className.indexOf('arco-table-has-fixed-col-right') > -1
    ).toBeTruthy();
  });

  it('delete column, tree data first column correctly', () => {
    const component = render(<Table data={treeData} columns={columns} />);

    function checkExpandIcon() {
      expect(component.find('.arco-icon-plus')).toHaveLength(1);
      expect(component.find('td').item(0).querySelectorAll('.arco-icon-plus')).toHaveLength(1);
    }

    checkExpandIcon();

    component.rerender(
      <Table data={treeData} columns={columns.filter(({ dataIndex }) => dataIndex !== 'name')} />
    );
    checkExpandIcon();
    component.rerender(<Table data={treeData} columns={columns} />);
    checkExpandIcon();
  });

  it('Table internal compile do not change origin columns', () => {
    const originColumns = cloneDeep(columns);
    render(<Table columns={columns} data={[]} />);
    expect(originColumns).toEqual(columns);
  });

  it('Table columns placeholder', () => {
    const component = render(
      <Table
        data={data.map((col) => {
          if (col.key === '1') {
            return { ...col, name: undefined as unknown as string };
          }
          if (col.key === '2') {
            return { ...col, name: null as unknown as string };
          }
          if (col.key === '3') {
            return { ...col, name: '' };
          }
          if (col.key === '4') {
            return { ...col, name: ' ' };
          }
          return col;
        })}
        columns={columns}
      />
    );

    expect(component.find('tbody td').item(0).textContent).toBe('');

    component.rerender(
      <Table
        data={data.map((col) => {
          if (col.key === '1') {
            return { ...col, name: undefined as unknown as string };
          }
          if (col.key === '2') {
            return { ...col, name: null as unknown as string };
          }
          if (col.key === '3') {
            return { ...col, name: '' };
          }
          if (col.key === '4') {
            return { ...col, name: ' ' };
          }
          return col;
        })}
        columns={columns.map((col) => {
          if (col.dataIndex === 'name') {
            return { ...col, placeholder: '-' };
          }
          return col;
        })}
        placeholder="x"
      />
    );

    [0, 1, 2, 3].forEach((item) => {
      expect(component.find('tbody tr').item(item).querySelectorAll('td').item(0).textContent).toBe(
        '-'
      );
    });

    [0, 1, 2, 3].forEach((item) => {
      component.rerender(
        <Table
          data={data.map((col) => {
            if (col.key === '1') {
              return { ...col, name: undefined as unknown as string };
            }
            if (col.key === '2') {
              return { ...col, name: null as unknown as string };
            }
            if (col.key === '3') {
              return { ...col, name: '' };
            }
            if (col.key === '4') {
              return { ...col, name: ' ' };
            }
            return col;
          })}
          columns={columns}
          placeholder="x"
        />
      );

      expect(component.find('tbody tr').item(item).querySelectorAll('td').item(0).textContent).toBe(
        'x'
      );
    });
  });
});
