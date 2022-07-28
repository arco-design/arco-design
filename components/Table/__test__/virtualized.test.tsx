import React from 'react';
import { render } from '../../../tests/util';
import Table from '..';
import { columns } from './common/columns';
import { data } from './common/data';

describe('Virtualized Table', () => {
  it('render virtualized table correctly', () => {
    const component = render(<Table columns={columns} data={data} virtualized />);

    expect(component.find('.arco-table-body div.arco-table-tr')).toHaveLength(5);

    component.rerender(<Table columns={columns} data={[]} virtualized />);

    expect(
      component.find('.arco-table-body table .arco-table-empty-row td')[0].getAttribute('colSpan')
    ).toBe('5');
  });
});
