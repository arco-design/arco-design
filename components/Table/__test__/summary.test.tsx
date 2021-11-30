import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { columns } from './common/columns';
import { data, TestData } from './common/data';
import { TableProps } from '../interface';

function mountTable<T = any>(component: React.ReactElement) {
  return mount<React.PropsWithChildren<TableProps<T>>>(component);
}

describe('Table summary', () => {
  it('basic usage', () => {
    const component = mountTable<TestData>(
      <Table
        rowKey="name"
        columns={columns}
        data={data}
        summary={(currentData) => (
          <Table.Summary.Row>
            <Table.Summary.Cell>Total Age</Table.Summary.Cell>
            <Table.Summary.Cell colSpan={4}>
              {currentData.reduce((p, n) => p + n.age, 0)}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    );

    const tfoot = component.find('table tfoot');
    const tr = tfoot.find('tr').at(0);

    expect(tfoot.find('td')).toHaveLength(2);
    expect(tr.find('td').at(0).text()).toBe('Total Age');
    expect(tr.find('td').at(1).text()).toBe('119');
  });

  it('fixed header & fixed summary', () => {
    const component = mountTable<TestData>(
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
                {currentData.reduce((p, n) => p + n.age, 0)}
              </Table.Summary.Cell>
              <Table.Summary.Cell>Fixed Right</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    );

    const tfoot = component.find('.arco-table-tfoot');
    const tr = tfoot.find('tr').at(0);

    expect(tr.find('td')).toHaveLength(3);

    function getCell(i) {
      return tr.find('td').at(i);
    }

    expect(getCell(0).text()).toBe('Fixed Left');
    expect(getCell(0).prop('className')).toBe(
      'arco-table-td arco-table-col-fixed-left arco-table-col-fixed-left-last'
    );
    expect(getCell(0).prop('style')).toEqual({ left: 0 });

    expect(getCell(1).prop('colSpan')).toBe(3);
    expect(getCell(1).text()).toBe('119');
    expect(getCell(1).prop('className')).toBe('arco-table-td');

    expect(getCell(2).text()).toBe('Fixed Right');
    expect(getCell(2).prop('className')).toBe(
      'arco-table-td arco-table-col-fixed-right arco-table-col-fixed-right-first'
    );
    expect(getCell(2).prop('style')).toEqual({ right: 0 });
  });
});
