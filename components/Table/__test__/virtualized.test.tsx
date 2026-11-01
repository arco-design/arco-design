import React from 'react';
import { fireEvent, render } from '../../../tests/util';
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

  it('keeps horizontal scrolling when the virtualized table is empty', () => {
    const component = render(
      <Table columns={columns} data={[]} virtualized scroll={{ x: 1000, y: 300 }} />
    );
    const tableBody = component.find<HTMLElement>('.arco-table-body')[0];
    const tableHeader = component.find<HTMLElement>('.arco-table-header')[0];
    const emptyTable = tableBody.querySelector('table');

    expect(emptyTable.style.width).toBe('1000px');

    tableBody.scrollLeft = 120;
    fireEvent.scroll(tableBody);

    expect(tableHeader.scrollLeft).toBe(120);
  });

  it('wrapperChild props in virtualized table correctly ', () => {
    const WrapperChild = (props) => {
      const { children } = props;
      return (
        <>
          {children}
          <div id="wrapperchild-test">test</div>;
        </>
      );
    };
    const component = render(
      <Table
        columns={columns}
        data={data}
        virtualized
        virtualListProps={{
          wrapperChild: WrapperChild,
        }}
      />
    );

    expect(component.find('#wrapperchild-test')).toHaveLength(1);

    component.rerender(
      <Table
        columns={columns}
        data={[]}
        virtualized
        virtualListProps={{
          wrapperChild: WrapperChild,
        }}
      />
    );

    expect(component.find('#wrapperchild-test')).toHaveLength(0);
  });
});
