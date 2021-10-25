import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { columnsFilterCustom } from './common/columns';
import { data } from './common/data';

describe('Table test', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('table pagination', () => {
    const onChange = jest.fn();
    const component = mount(
      <Table
        columns={columnsFilterCustom}
        data={data}
        onChange={onChange}
        pagination={{ pageSize: 2 }}
      />
    );
    const getFirstName = () => {
      return component
        .find('tbody td')
        .at(0)
        .find('.arco-table-cell')
        .text();
    };

    expect(component.find('.arco-pagination-list').children()).toHaveLength(5);
    expect(getFirstName()).toBe('Name1');

    component
      .find('.arco-pagination-list .arco-pagination-item')
      .at(2)
      .simulate('click');

    expect(getFirstName()).toBe('Name3');
    expect(onChange.mock.calls[0][3].action).toBe('paginate');
    expect(onChange.mock.calls[0][3].currentData.map((a) => a.name)).toEqual(['Name3', 'Name4']);

    component.setProps({ pagination: false });

    expect(component.find('.arco-pagination')).toHaveLength(0);
  });
});
