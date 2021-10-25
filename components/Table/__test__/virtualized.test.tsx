import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { columns } from './common/columns';
import { data } from './common/data';

describe('Virtualized Table', () => {
  it('render virtualized table correctly', () => {
    const component = mount(<Table columns={columns} data={data} virtualized />);

    expect(component.find('.arco-table-body div.arco-table-tr')).toHaveLength(5);

    component.setProps({ data: [] });

    expect(component.find('.arco-table-body table .arco-table-empty-row td').prop('colSpan')).toBe(
      5
    );
  });
});
