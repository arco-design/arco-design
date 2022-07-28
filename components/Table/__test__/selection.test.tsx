import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import Table from '..';
import { columns } from './common/columns';
import { data, treeData } from './common/data';

describe('Table selection', () => {
  it('checkbox', () => {
    const onChange = jest.fn();
    const component = render(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        rowSelection={{
          type: 'checkbox',
          onChange,
          checkboxProps: (record) => ({
            disabled: record.name === 'Name2',
          }),
        }}
      />
    );
    const trLength = component.find('tr').length;

    expect(component.find('colgroup col')).toHaveLength(6);
    expect(component.find('.arco-checkbox').length).toEqual(trLength);
    expect(component.find('.arco-checkbox-disabled')).toHaveLength(1);

    const checkboxBtns = component.find('.arco-checkbox > input');
    const checkAllBtn = checkboxBtns.item(0);

    // fireEvent.change can't change checkbox, use click to simulate
    fireEvent.click(checkAllBtn);

    expect(onChange.mock.calls.length).toBe(1);
    expect(component.find('.arco-checkbox-checked')).toHaveLength(5);

    fireEvent.click(checkAllBtn);

    expect(onChange.mock.calls.length).toBe(2);
    expect(component.find('.arco-checkbox-checked')).toHaveLength(0);

    fireEvent.click(checkboxBtns.item(1));

    expect(onChange.mock.calls.length).toBe(3);
    expect(component.find('.arco-checkbox-checked')).toHaveLength(1);
    expect(
      component.find('tbody tr').item(0).querySelectorAll('.arco-checkbox-checked')
    ).toHaveLength(1);
  });

  it('radio', () => {
    const onChange = jest.fn();
    const component = render(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        rowSelection={{
          type: 'radio',
          onChange,
          columnTitle: 'columnTitle',
          checkboxProps: (record) => ({
            disabled: record.name === 'Name2',
          }),
        }}
      />
    );
    const trLength = component.find('tr').length;

    expect(component.find('colgroup col')).toHaveLength(6);
    expect(component.find('.arco-radio').length).toBe(trLength - 1);
    expect(component.find('.arco-radio-disabled')).toHaveLength(1);
    expect(component.find('table thead th.arco-table-radio')[0].textContent).toBe('columnTitle');

    fireEvent.click(component.find('.arco-radio input').item(0));

    expect(onChange.mock.calls.length).toBe(1);
    expect(component.find('.arco-radio.arco-radio-checked')).toHaveLength(1);
    expect(
      component.find('tbody tr').item(0).querySelectorAll('.arco-radio.arco-radio-checked')
    ).toHaveLength(1);

    fireEvent.click(component.find('.arco-radio input').item(2));

    expect(onChange.mock.calls.length).toBe(2);
    expect(component.find('.arco-radio.arco-radio-checked')).toHaveLength(1);
    expect(
      component.find('tbody tr').item(2).querySelectorAll('.arco-radio.arco-radio-checked')
    ).toHaveLength(1);
  });

  it('rowSelection.checkCrossPage', () => {
    const onChange = jest.fn();
    const component = render(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        rowSelection={{
          onChange,
        }}
        pagination={{
          pageSize: 2,
        }}
      />
    );

    fireEvent.click(component.find('.arco-checkbox > input').item(0));

    expect(onChange.mock.calls[0][0]).toEqual(['Name1', 'Name2']);

    fireEvent.click(component.find('.arco-pagination-item').item(2));

    expect(onChange.mock.calls[1][0]).toEqual([]);

    fireEvent.click(component.find('.arco-checkbox > input').item(0));

    expect(onChange.mock.calls[2][0]).toEqual(['Name3', 'Name4']);

    component.rerender(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        rowSelection={{ checkCrossPage: true, onChange }}
        pagination={{
          pageSize: 2,
        }}
      />
    );

    fireEvent.click(component.find('.arco-pagination-item').item(1));

    fireEvent.click(component.find('.arco-checkbox > input').item(0));

    expect(onChange.mock.calls[3][0]).toEqual(['Name3', 'Name4', 'Name1', 'Name2']);
  });

  it('should filter unExist keys', () => {
    const onChange = jest.fn();

    const component = render(
      <Table
        columns={columns}
        data={data}
        rowSelection={{
          selectedRowKeys: ['1', 'unExistKey'],
          onChange,
          checkboxProps: (record) => ({
            disabled: record.name === 'Name2',
          }),
        }}
      />
    );

    const checkboxBtns = component.find('.arco-checkbox > input');
    const checkAllBtn = checkboxBtns.item(0);

    fireEvent.click(checkAllBtn);

    expect(onChange.mock.calls[0][0]).toEqual(['1', '3', '4', '5']);

    fireEvent.click(checkboxBtns.item(3));

    expect(onChange.mock.calls[1][0]).toEqual(['1', '3']);

    fireEvent.click(checkboxBtns.item(1));

    expect(onChange.mock.calls[2][0]).toEqual([]);
  });

  it('rowSelection.preserveSelectedRowKeys', () => {
    const onChange = jest.fn();
    const component = render(
      <Table
        columns={columns}
        data={data}
        rowSelection={{
          selectedRowKeys: ['1', 'unExistKey'],
          onChange,
          preserveSelectedRowKeys: true,
        }}
      />
    );
    const checkboxBtns = component.find('.arco-checkbox > input');
    fireEvent.click(checkboxBtns.item(2));

    expect(onChange.mock.calls[0][0]).toEqual(['1', 'unExistKey', '2']);
  });

  it('rowSelection.renderCell type = checkbox', () => {
    const component = render(
      <Table
        columns={columns}
        data={data}
        rowSelection={{
          renderCell: (_originNode, _checked, record) => record.name,
        }}
      />
    );

    expect(component.find('tbody .arco-table-checkbox').item(0).textContent).toBe('Name1');
  });

  it('rowSelection.renderCell type = radio', () => {
    const component = render(
      <Table
        columns={columns}
        data={data}
        rowSelection={{
          type: 'radio',
          renderCell: (_originNode, _checked, record) => record.name,
        }}
      />
    );

    expect(component.find('tbody .arco-table-radio').item(0).textContent).toBe('Name1');
  });

  it('rowSelection.onSelect, rowSelection.onSelectAll', () => {
    const onSelect = jest.fn();
    const onSelectAll = jest.fn();
    const component = render(
      <Table
        columns={columns}
        data={data}
        rowSelection={{
          type: 'checkbox',
          onSelect,
          onSelectAll,
        }}
      />
    );

    const checkboxBtns = component.find('.arco-checkbox > input');
    const checkAllBtn = checkboxBtns.item(0);

    fireEvent.click(checkAllBtn);

    expect(onSelectAll.mock.calls.length).toBe(1);
    expect(onSelectAll.mock.calls[0][0]).toBe(true);

    fireEvent.click(checkAllBtn);

    expect(onSelectAll.mock.calls.length).toBe(2);
    expect(onSelectAll.mock.calls[1][0]).toBe(false);

    fireEvent.click(checkboxBtns.item(1));

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe(true);
    expect(onSelect.mock.calls[0][1]).toEqual({
      address: 'Address1',
      age: 20,
      email: 'email1@123.com',
      key: '1',
      name: 'Name1',
      sex: 'male',
    });
    expect(onSelect.mock.calls[0][2].map((a) => a.name)).toEqual(['Name1']);

    fireEvent.click(checkboxBtns.item(2));

    expect(onSelect.mock.calls.length).toBe(2);
    expect(onSelect.mock.calls[1][0]).toBe(true);
    expect(onSelect.mock.calls[1][1]).toEqual({
      address: 'Address2',
      age: 26,
      email: 'email2@123.com',
      key: '2',
      name: 'Name2',
      sex: 'male',
    });
    expect(onSelect.mock.calls[1][2].map((a) => a.name)).toEqual(['Name1', 'Name2']);

    fireEvent.click(checkboxBtns.item(1));

    expect(onSelect.mock.calls.length).toBe(3);
    expect(onSelect.mock.calls[2][0]).toBe(false);
    expect(onSelect.mock.calls[2][1]).toEqual({
      address: 'Address1',
      age: 20,
      email: 'email1@123.com',
      key: '1',
      name: 'Name1',
      sex: 'male',
    });
    expect(onSelect.mock.calls[2][2].map((a) => a.name)).toEqual(['Name2']);
  });

  it('rowSelection.checkStrictly', () => {
    const onChange = jest.fn();
    const component = render(
      <Table
        columns={columns}
        data={treeData}
        rowSelection={{
          type: 'checkbox',
          checkStrictly: false,
          onChange,
        }}
        defaultExpandAllRows
      />
    );

    // 1-1
    fireEvent.click(component.find('.arco-checkbox > input').item(2));

    function checkChecked(statusList) {
      statusList.forEach((status, i) => {
        expect(
          component.find('.arco-checkbox').item(i).classList.contains('arco-checkbox-checked')
        ).toBe(status);
      });
    }

    function checkIndeterminate(statusList) {
      statusList.forEach((status, i) => {
        expect(
          component.find('.arco-checkbox').item(i).classList.contains('arco-checkbox-indeterminate')
        ).toBe(status);
      });
    }

    expect(onChange.mock.calls[0][0]).toEqual(['1-1', '1-1-1', '1-1-2']);
    checkChecked([false, false, true, true, true, false, false]);
    checkIndeterminate([true, true, false, false, false, false, false]);

    // 1-2
    fireEvent.click(component.find('.arco-checkbox > input').item(5));

    expect(onChange.mock.calls[1][0]).toEqual(['1-1', '1-1-1', '1-1-2', '1-2', '1']);
    checkChecked([false, true, true, true, true, true, false]);
    checkIndeterminate([true, false, false, false, false, false, false]);

    // 1-1-1
    fireEvent.click(component.find('.arco-checkbox > input').item(3));

    expect(onChange.mock.calls[2][0]).toEqual(['1-1-2', '1-2']);
    checkChecked([false, false, false, false, true, true, false]);
    checkIndeterminate([true, true, true, false, false, false, false]);
  });

  it('rowSelection.checkConnected set selectedRowKeys', () => {
    const onChange = jest.fn();
    const component = render(
      <Table
        columns={columns}
        data={treeData}
        rowSelection={{
          type: 'checkbox',
          checkStrictly: false,
          onChange,
          selectedRowKeys: ['1-1-1', '1-1-2'],
        }}
        defaultExpandAllRows
      />
    );

    function checkChecked(statusList) {
      statusList.forEach((status, i) => {
        expect(
          component.find('.arco-checkbox').item(i).classList.contains('arco-checkbox-checked')
        ).toBe(status);
      });
    }

    function checkIndeterminate(statusList) {
      statusList.forEach((status, i) => {
        expect(
          component.find('.arco-checkbox').item(i).classList.contains('arco-checkbox-indeterminate')
        ).toBe(status);
      });
    }

    checkChecked([false, false, true, true, true, false, false]);
    checkIndeterminate([true, true, false, false, false, false, false]);

    // 1
    fireEvent.click(component.find('.arco-checkbox > input').item(1));

    expect(onChange.mock.calls[0][0]).toEqual(['1-1-1', '1-1-2', '1-1', '1', '1-2']);
    checkChecked([false, false, true, true, true, false, false]);
    checkIndeterminate([true, true, false, false, false, false, false]);
  });
});
