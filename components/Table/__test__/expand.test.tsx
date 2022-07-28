import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import Table from '..';
import { columns } from './common/columns';
import { data, treeData } from './common/data';

describe('Table expand', () => {
  it('basic expand', () => {
    const onExpand = jest.fn();
    const onExpandedRowsChange = jest.fn();
    const onRowClick = jest.fn();
    const component = render(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        expandedRowRender={(record) => {
          if (record.name !== 'Name4') {
            return record.email;
          }
          return null;
        }}
        // TODO: 使用onExpand属性后Table组件的泛型计算类型会变成any，需解决
        onExpand={onExpand}
        onExpandedRowsChange={onExpandedRowsChange}
        onRow={() => ({
          onClick: onRowClick,
        })}
      />
    );

    expect(component.find('colgroup col')).toHaveLength(6);
    expect(component.find('tr')).toHaveLength(6);
    expect(component.find('table td.arco-table-expand-icon-cell > button')).toHaveLength(4);

    fireEvent.click(component.find('table td.arco-table-expand-icon-cell > button').item(1));

    expect(onExpand.mock.calls.length).toBe(1);
    expect(onExpandedRowsChange.mock.calls.length).toBe(1);
    expect(onExpandedRowsChange.mock.calls[0][0]).toEqual(['Name2']);
    expect(component.find('tr.arco-table-expand-content')).toHaveLength(1);
    expect(component.find('table tbody tr')).toHaveLength(6);

    expect(onRowClick).not.toBeCalled();

    const expandedRowTd = component.find('table tbody tr').item(2).querySelectorAll('td');
    expect(expandedRowTd).toHaveLength(1);
    expect(expandedRowTd.item(0).textContent).toBe('email2@123.com');
  });

  it('expandProps', () => {
    const component = render(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        expandedRowRender={(record) => record.email}
        expandedRowKeys={[]}
        expandProps={{
          icon: ({ expanded }) => (expanded ? <button>-</button> : <button>+</button>),
          width: 120,
          columnTitle: 'Expand Col',
        }}
      />
    );

    const firstCol = component.find('colgroup col').item(0);
    expect(firstCol.className).toContain('arco-table-expand-icon-col');
    expect(getComputedStyle(firstCol).getPropertyValue('width')).toBe('120px');

    expect(
      component.find('thead th').item(0).querySelector('.arco-table-th-item')?.textContent
    ).toBe('Expand Col');

    const getFirstExpandBtn = () =>
      component.find('table td.arco-table-expand-icon-cell > button').item(0);
    expect(getFirstExpandBtn().textContent).toBe('+');

    component.rerender(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        expandedRowRender={(record) => record.email}
        expandedRowKeys={['Name1']}
        expandProps={{
          icon: ({ expanded }) => (expanded ? <button>-</button> : <button>+</button>),
          width: 120,
          columnTitle: 'Expand Col',
        }}
      />
    );

    expect(getFirstExpandBtn().textContent).toBe('-');
  });

  it('tree data', () => {
    const component = render(
      <Table rowKey="name" columns={columns} data={treeData} rowSelection={{}} />
    );

    expect(component.find('table tbody tr')).toHaveLength(2);

    expect(component.find('.arco-icon-plus')).toHaveLength(1);

    expect(component.find('.arco-checkbox')).toHaveLength(3);
  });

  it('tree data defaultExpandAllRows', () => {
    const component = render(
      <Table rowKey="name" defaultExpandAllRows columns={columns} data={treeData} />
    );
    expect(component.find('table tbody tr')).toHaveLength(6);
  });

  it('expandProps.rowExpandable', () => {
    const expandedRowRender = jest.fn();
    const component = render(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        expandedRowRender={expandedRowRender}
        expandProps={{
          rowExpandable: (record) => record.name !== 'Name3',
        }}
      />
    );
    expect(component.find('.arco-icon-plus')).toHaveLength(4);
    expect(component.find('tr').item(2).querySelectorAll('.arco-icon-right')).toHaveLength(0);
    expect(expandedRowRender.mock.calls.length).toBe(0);
  });

  it('expandProps.expandRowByClick', () => {
    const onExpand = jest.fn();
    const onRowClick = jest.fn();
    const component = render(
      <Table
        columns={columns}
        data={data}
        expandedRowRender={(record) => record.email}
        onExpand={onExpand}
        onRow={() => ({ onClick: onRowClick })}
      />
    );
    fireEvent.click(component.find('tbody tr').item(0));
    expect(component.find('tbody tr')).toHaveLength(5);

    component.rerender(
      <Table
        columns={columns}
        data={data}
        expandedRowRender={(record) => record.email}
        onExpand={onExpand}
        onRow={() => ({ onClick: onRowClick })}
        expandProps={{
          expandRowByClick: true,
        }}
      />
    );

    fireEvent.click(component.find('tbody tr').item(0));
    expect(component.find('tbody tr')).toHaveLength(6);
    expect(onExpand.mock.calls).toHaveLength(1);
    // should call onRow.onClick
    expect(onRowClick.mock.calls).toHaveLength(2);
  });

  it('expandProps.expandRowByClick with tree data', () => {
    const onExpand = jest.fn();
    const onRowClick = jest.fn();
    const component = render(
      <Table
        columns={columns}
        data={treeData}
        onExpand={onExpand}
        onRow={() => ({ onClick: onRowClick })}
      />
    );
    fireEvent.click(component.find('tbody tr').item(0));
    expect(component.find('tbody tr')).toHaveLength(2);

    component.rerender(
      <Table
        columns={columns}
        data={treeData}
        onExpand={onExpand}
        onRow={() => ({ onClick: onRowClick })}
        expandProps={{
          expandRowByClick: true,
        }}
      />
    );

    fireEvent.click(component.find('tbody tr').item(0));
    expect(component.find('tbody tr')).toHaveLength(4);
    expect(onExpand.mock.calls).toHaveLength(1);
    // should call onRow.onClick
    expect(onRowClick.mock.calls).toHaveLength(2);
  });

  it('expandProps.strictTreeData', () => {
    const component = render(<Table columns={columns} data={treeData} />);

    expect(component.find('.arco-icon-plus')).toHaveLength(1);

    component.rerender(
      <Table
        columns={columns}
        data={treeData}
        expandProps={{
          strictTreeData: false,
        }}
      />
    );

    expect(component.find('.arco-icon-plus')).toHaveLength(2);
  });
});
