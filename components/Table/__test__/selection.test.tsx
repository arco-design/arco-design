import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { columns } from './common/columns';
import { data, TestData } from './common/data';
import { TableProps } from '../interface';

function mountTable<T = any>(component: React.ReactElement) {
  return mount<React.PropsWithChildren<TableProps<T>>>(component);
}

describe('Table selection', () => {
  it('checkbox', () => {
    const onChange = jest.fn();
    const component = mountTable<TestData>(
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
    expect(component.find('.arco-checkbox').find('.arco-checkbox-disabled')).toHaveLength(1);

    const checkboxBtns = component.find('.arco-checkbox > input');
    const checkAllBtn = checkboxBtns.first();

    checkAllBtn.simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(onChange.mock.calls.length).toBe(1);
    expect(component.find('.arco-checkbox-checked')).toHaveLength(5);

    checkAllBtn.simulate('change', {
      target: {
        checked: false,
      },
    });

    expect(onChange.mock.calls.length).toBe(2);
    expect(component.find('.arco-checkbox-checked')).toHaveLength(0);

    checkboxBtns.at(1).simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(onChange.mock.calls.length).toBe(3);
    expect(component.find('.arco-checkbox-checked')).toHaveLength(1);
    expect(component.find('tbody tr').first().find('.arco-checkbox-checked')).toHaveLength(1);
  });

  it('radio', () => {
    const onChange = jest.fn();
    const component = mountTable<TestData>(
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
    expect(component.find('.arco-radio').find('.arco-radio-disabled')).toHaveLength(1);
    expect(component.find('table thead th.arco-table-radio').text()).toBe('columnTitle');

    component.find('.arco-radio input').first().simulate('change');

    expect(onChange.mock.calls.length).toBe(1);
    expect(component.find('.arco-radio.arco-radio-checked')).toHaveLength(1);
    expect(component.find('tbody tr').first().find('.arco-radio.arco-radio-checked')).toHaveLength(
      1
    );

    component.find('.arco-radio input').at(2).simulate('change');

    expect(onChange.mock.calls.length).toBe(2);
    expect(component.find('.arco-radio.arco-radio-checked')).toHaveLength(1);
    expect(component.find('tbody tr').at(2).find('.arco-radio.arco-radio-checked')).toHaveLength(1);
  });

  it('rowSelection.checkCrossPage', () => {
    const onChange = jest.fn();
    const component = mountTable<TestData>(
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

    component
      .find('.arco-checkbox > input')
      .first()
      .simulate('change', {
        target: {
          checked: true,
        },
      });

    expect(onChange.mock.calls[0][0]).toEqual(['Name1', 'Name2']);

    component.find('.arco-pagination-item').at(2).simulate('click');

    expect(onChange.mock.calls[1][0]).toEqual([]);

    component
      .find('.arco-checkbox > input')
      .first()
      .simulate('change', {
        target: {
          checked: true,
        },
      });

    expect(onChange.mock.calls[2][0]).toEqual(['Name3', 'Name4']);

    component.setProps({ rowSelection: { checkCrossPage: true, onChange } });

    component.find('.arco-pagination-item').at(1).simulate('click');

    component
      .find('.arco-checkbox > input')
      .first()
      .simulate('change', {
        target: {
          checked: true,
        },
      });

    expect(onChange.mock.calls[3][0]).toEqual(['Name3', 'Name4', 'Name1', 'Name2']);
  });

  it('should filter unExist keys', () => {
    const onChange = jest.fn();

    const component = mountTable<TestData>(
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
    const checkAllBtn = checkboxBtns.first();

    checkAllBtn.simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(onChange.mock.calls[0][0]).toEqual(['1', '3', '4', '5']);

    checkboxBtns.at(3).simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(onChange.mock.calls[1][0]).toEqual(['1', '3']);

    checkboxBtns.at(1).simulate('change', {
      target: {
        checked: false,
      },
    });

    expect(onChange.mock.calls[2][0]).toEqual([]);
  });

  it('rowSelection.preserveSelectedRowKeys', () => {
    const onChange = jest.fn();
    const component = mountTable<TestData>(
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
    checkboxBtns.at(2).simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(onChange.mock.calls[0][0]).toEqual(['1', 'unExistKey', '2']);
  });

  it('rowSelection.renderCell type = checkbox', () => {
    const component = mountTable<TestData>(
      <Table
        columns={columns}
        data={data}
        rowSelection={{
          renderCell: (_originNode, _checked, record) => record.name,
        }}
      />
    );

    expect(component.find('tbody .arco-table-checkbox').at(0).text()).toBe('Name1');
  });

  it('rowSelection.renderCell type = radio', () => {
    const component = mountTable<TestData>(
      <Table
        columns={columns}
        data={data}
        rowSelection={{
          type: 'radio',
          renderCell: (_originNode, _checked, record) => record.name,
        }}
      />
    );

    expect(component.find('tbody .arco-table-radio').at(0).text()).toBe('Name1');
  });

  it('rowSelection.onSelect, rowSelection.onSelectAll', () => {
    const onSelect = jest.fn();
    const onSelectAll = jest.fn();
    const component = mountTable<TestData>(
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
    const checkAllBtn = checkboxBtns.first();

    checkAllBtn.simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(onSelectAll.mock.calls.length).toBe(1);
    expect(onSelectAll.mock.calls[0][0]).toBe(true);

    checkAllBtn.simulate('change', {
      target: {
        checked: false,
      },
    });

    expect(onSelectAll.mock.calls.length).toBe(2);
    expect(onSelectAll.mock.calls[1][0]).toBe(false);

    checkboxBtns.at(1).simulate('change', {
      target: {
        checked: true,
      },
    });

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

    checkboxBtns.at(2).simulate('change', {
      target: {
        checked: true,
      },
    });

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

    checkboxBtns.at(1).simulate('change', {
      target: {
        checked: false,
      },
    });

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
});
