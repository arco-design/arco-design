import React from 'react';
import { render } from '../../../tests/util';
import Table from '..';
import { columns } from './common/columns';
import { data } from './common/data';

describe('Table summary', () => {
  it('basic usage', () => {
    const component = render(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        summary={(currentData) => (
          <Table.Summary.Row>
            <Table.Summary.Cell>Total Age</Table.Summary.Cell>
            <Table.Summary.Cell colSpan={4}>
              {currentData!.reduce((p, n) => p + n.age, 0)}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    );

    const tfoot = component.find('table tfoot')[0];
    const tr = tfoot.querySelectorAll('tr').item(0);

    expect(tfoot.querySelectorAll('td')).toHaveLength(2);
    expect(tr.querySelectorAll('td').item(0).textContent).toBe('Total Age');
    expect(tr.querySelectorAll('td').item(1).textContent).toBe('119');
  });

  it('fixed header & fixed summary', () => {
    const component = render(
      <Table
        rowKey="name"
        columns={columns.map((col, index) => {
          if (index === 0) {
            col.fixed = 'left';
            col.width = 100;
          }
          if (index === 4) {
            col.fixed = 'right';
            col.width = 80;
          }
          return col;
        })}
        scroll={{ x: 1200, y: 200 }}
        data={data}
        summary={(currentData) => (
          <Table.Summary fixed="bottom">
            <Table.Summary.Row>
              <Table.Summary.Cell>Fixed Left</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={3}>
                {currentData!.reduce((p, n) => p + n.age, 0)}
              </Table.Summary.Cell>
              <Table.Summary.Cell>Fixed Right</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    );

    const tfoot = component.find('.arco-table-tfoot')[0];
    const tr = tfoot.querySelectorAll('tr').item(0);

    expect(tr.querySelectorAll('td')).toHaveLength(3);

    function getCell(i) {
      return tr.querySelectorAll('td').item(i);
    }

    expect(getCell(0).textContent).toBe('Fixed Left');
    expect(getCell(0).className).toBe(
      'arco-table-td arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getCell(0).getAttribute('style')).toEqual('left: 0px;');

    expect(getCell(1).getAttribute('colSpan')).toBe('3');
    expect(getCell(1).textContent).toBe('119');
    expect(getCell(1).className).toBe('arco-table-td');

    expect(getCell(2).textContent).toBe('Fixed Right');
    expect(getCell(2).className).toBe(
      'arco-table-td arco-table-col-fixed-right arco-table-col-fixed-right-first'
    );
    expect(getCell(2).getAttribute('style')).toEqual('right: 0px;');
  });
});
