import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { columns } from './common/columns';
import { data, treeData, TestData, TestTreeData } from './common/data';
import { TableProps } from '../interface';

function mountTable<T = any>(component: React.ReactElement) {
  return mount<React.PropsWithChildren<TableProps<T>>>(component);
}

describe('Table expand', () => {
  it('basic expand', () => {
    const onExpand = jest.fn();
    const onExpandedRowsChange = jest.fn();
    const onRowClick = jest.fn();
    const component = mountTable<TestData>(
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

    component.find('table td.arco-table-expand-icon-cell > button').at(1).simulate('click');

    expect(onExpand.mock.calls.length).toBe(1);
    expect(onExpandedRowsChange.mock.calls.length).toBe(1);
    expect(onExpandedRowsChange.mock.calls[0][0]).toEqual(['Name2']);
    expect(component.find('tr.arco-table-expand-content')).toHaveLength(1);
    expect(component.find('table tbody tr')).toHaveLength(6);

    expect(onRowClick).not.toBeCalled();

    const expandedRowTd = component.find('table tbody tr').at(2).find('td');
    expect(expandedRowTd).toHaveLength(1);
    expect(expandedRowTd.first().text()).toBe('email2@123.com');
  });

  it('expandProps', () => {
    const component = mountTable<TestData>(
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

    const firstCol = component.find('colgroup col').first();

    expect(firstCol.hasClass('arco-table-expand-icon-col')).toBe(true);
    expect(getComputedStyle(firstCol.getDOMNode()).getPropertyValue('width')).toBe('120px');

    expect(component.find('thead th').first().find('.arco-table-th-item').text()).toBe(
      'Expand Col'
    );

    const getFirstExpandBtn = () =>
      component.find('table td.arco-table-expand-icon-cell > button').first();
    expect(getFirstExpandBtn().text()).toBe('+');

    component.setProps({ expandedRowKeys: ['Name1'] });

    expect(getFirstExpandBtn().text()).toBe('-');
  });

  it('tree data', () => {
    const component = mountTable<TestTreeData>(
      <Table rowKey="name" columns={columns} data={treeData} rowSelection={{}} />
    );

    expect(component.find('table tbody tr')).toHaveLength(2);

    expect(component.find('IconPlus')).toHaveLength(1);

    expect(component.find('Checkbox')).toHaveLength(3);
  });

  it('tree data defaultExpandAllRows', () => {
    const component = mountTable<TestData>(
      <Table rowKey="name" defaultExpandAllRows columns={columns} data={treeData} />
    );
    expect(component.find('table tbody tr')).toHaveLength(5);
  });

  it('expandProps.rowExpandable', () => {
    const expandedRowRender = jest.fn();
    const component = mountTable<TestData>(
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
    expect(component.find('IconPlus')).toHaveLength(4);
    expect(component.find('tr').at(2).find('IconRight')).toHaveLength(0);
    expect(expandedRowRender.mock.calls.length).toBe(0);
  });

  it('expandProps.expandRowByClick', () => {
    const onExpand = jest.fn();
    const onRowClick = jest.fn();
    const component = mountTable<TestData>(
      <Table
        columns={columns}
        data={data}
        expandedRowRender={(record) => record.email}
        onExpand={onExpand}
        onRow={() => ({ onClick: onRowClick })}
      />
    );
    component.find('tbody tr').at(0).simulate('click');
    expect(component.find('tbody tr')).toHaveLength(5);

    component.setProps({ expandProps: { expandRowByClick: true } });
    component.update();

    component.find('tbody tr').at(0).simulate('click');
    expect(component.find('tbody tr')).toHaveLength(6);
    expect(onExpand.mock.calls).toHaveLength(1);
    // should call onRow.onClick
    expect(onRowClick.mock.calls).toHaveLength(2);
  });

  it('expandProps.expandRowByClick with tree data', () => {
    const onExpand = jest.fn();
    const onRowClick = jest.fn();
    const component = mountTable<TestTreeData>(
      <Table
        columns={columns}
        data={treeData}
        onExpand={onExpand}
        onRow={() => ({ onClick: onRowClick })}
      />
    );
    component.find('tbody tr').at(0).simulate('click');
    expect(component.find('tbody tr')).toHaveLength(2);

    component.setProps({ expandProps: { expandRowByClick: true } });
    component.update();

    component.find('tbody tr').at(0).simulate('click');
    expect(component.find('tbody tr')).toHaveLength(4);
    expect(onExpand.mock.calls).toHaveLength(1);
    // should call onRow.onClick
    expect(onRowClick.mock.calls).toHaveLength(2);
  });

  it('expandProps.strictTreeData', () => {
    const component = mountTable<TestTreeData>(<Table columns={columns} data={treeData} />);

    expect(component.find('IconPlus')).toHaveLength(1);

    component.setProps({ expandProps: { strictTreeData: false } });

    expect(component.find('IconPlus')).toHaveLength(2);
  });
});
