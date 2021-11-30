import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { columns } from './common/columns';
import { data } from './common/data';
import Tooltip from '../../Tooltip/index';

describe('Table components', () => {
  it('table custom header and body by param components', () => {
    const component = mount(
      <Table
        components={{
          table: 'custom-table',
          header: {
            wrapper: 'custom-header-wrapper',
            thead: 'custom-thead',
            row: 'custom-header-tr',
            th: 'custom-th',
            cell: 'custom-th-cell',
          },
          body: {
            wrapper: 'custom-body-wrapper',
            tbody: 'custom-tbody',
            row: 'custom-body-tr',
            td: 'custom-td',
            cell: 'custom-td-cell',
          },
        }}
        scroll={{ y: true }}
        columns={columns}
        data={data}
      />
    );

    expect(
      component.find(
        'custom-header-wrapper.arco-table-header custom-table custom-thead custom-header-tr'
      )
    ).toHaveLength(1);
    expect(
      component.find(
        'custom-header-wrapper.arco-table-header custom-table custom-thead custom-header-tr custom-th custom-th-cell'
      )
    ).toHaveLength(5);

    expect(
      component.find('custom-body-wrapper.arco-table-body custom-table custom-tbody custom-body-tr')
    ).toHaveLength(5);
    expect(
      component.find(
        'custom-body-wrapper.arco-table-body custom-table custom-tbody custom-body-tr custom-td custom-td-cell'
      )
    ).toHaveLength(5 * 5);
  });

  it('table custom operations', () => {
    const component = mount(
      <Table
        components={{
          header: {
            operations: ({ selectionNode, expandNode }) => [
              {
                node: <th>Index</th>,
                width: 40,
              },
              {
                name: 'selectionNode',
                node: selectionNode,
              },
              {
                name: 'expandNode',
                node: expandNode,
              },
            ],
          },
          body: {
            operations: ({ selectionNode, expandNode }) => [
              {
                node: (record) => {
                  return <td>{record.key}</td>;
                },
                width: 40,
              },
              {
                name: 'selectionNode',
                node: selectionNode,
              },
              {
                name: 'expandNode',
                node: expandNode,
              },
            ],
          },
        }}
        columns={columns}
        data={data}
      />
    );

    expect(component.find('thead th').at(0).text()).toBe('Index');

    for (let i = 0; i < 5; i++) {
      expect(component.find('tbody tr').at(i).find('td').at(0).text()).toBe(`${i + 1}`);
    }
  });

  // operations wrap selectionNode with tooltip should act correctly
  it('Table custom operations selectionNode with tooltip', () => {
    jest.useFakeTimers();

    const component = mount(
      <Table
        components={{
          header: {
            operations: ({ selectionNode }) => [
              {
                name: 'selectionNode',
                node: <Tooltip content="123">{selectionNode}</Tooltip>,
              },
            ],
          },
          body: {
            operations: ({ selectionNode }) => [
              {
                name: 'selectionNode',
                node: <Tooltip content="456">{selectionNode}</Tooltip>,
              },
            ],
          },
        }}
        columns={columns}
        data={data}
        rowSelection={{}}
      />
    );

    component.find('thead .arco-table-checkbox').simulate('mouseenter');

    jest.runAllTimers();

    component.update();

    expect(component.find('thead .arco-table-checkbox').prop('className')).toBe(
      'arco-table-th arco-table-operation arco-table-checkbox arco-tooltip-open'
    );

    component.find('tbody .arco-table-checkbox').first().simulate('mouseenter');

    jest.runAllTimers();

    component.update();

    expect(component.find('tbody .arco-table-checkbox').first().prop('className')).toBe(
      'arco-table-td arco-table-operation arco-table-checkbox arco-tooltip-open'
    );
  });
});
