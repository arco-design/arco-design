import React from 'react';
import { fireEvent, render, cleanup } from '../../../tests/util';
import Table, { ColumnProps } from '..';
import { data, TestData } from './common/data';

describe('Table ignore undefined sortOrder', () => {
  afterEach(() => {
    cleanup();
  });

  it('should not apply default sorting when sortOrder is undefined', () => {
    const columns: ColumnProps<TestData>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: undefined, // explicitly undefined
      },
    ];

    const component = render(<Table columns={columns} data={data} />);

    // Get the first row's age value
    const getFirstAge = () => {
      return component.find('tbody tr').item(0).querySelectorAll('td .arco-table-cell').item(1)
        .textContent;
    };

    // Should show original data order (first row age is 20 from data[0])
    expect(getFirstAge()).toBe('20');
  });

  it('should allow toggling to unsorted state without requiring two clicks', () => {
    const TestComponent = () => {
      const [sortOrder, setSortOrder] = React.useState<'ascend' | 'descend' | undefined>('ascend');

      const columns: ColumnProps<TestData>[] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          sorter: (a, b) => a.age - b.age,
          sortOrder,
        },
      ];

      return (
        <>
          <button onClick={() => setSortOrder(undefined)}>Clear Sort</button>
          <Table columns={columns} data={data} />
        </>
      );
    };

    const component = render(<TestComponent />);

    const getFirstAge = () => {
      return component.find('tbody tr').item(0).querySelectorAll('td .arco-table-cell').item(1)
        .textContent;
    };

    // Initially sorted ascending (age 19)
    expect(getFirstAge()).toBe('19');

    // Click to clear sort
    const clearButton = component.find('button')[0];
    fireEvent.click(clearButton);

    // Should immediately show unsorted state (original data order, age 20)
    expect(getFirstAge()).toBe('20');
  });

  it('should skip sorters with undefined direction in compareFn', () => {
    // This test verifies that when multiple sorters are present,
    // only those with defined directions affect the sorting
    const columns: ColumnProps<TestData>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortOrder: 'ascend', // This one should work
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: undefined, // This should be ignored
      },
    ];

    const component = render(<Table columns={columns} data={data} />);

    const getFirstName = () => {
      return component.find('tbody tr').item(0).querySelectorAll('td .arco-table-cell').item(0)
        .textContent;
    };

    // Should be sorted by name ascending (Name1)
    expect(getFirstName()).toBe('Name1');
  });

  it('should treat sortOrder as not present when explicitly set to null', () => {
    const columns: ColumnProps<TestData>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: null as any, // explicitly null
      },
    ];

    const component = render(<Table columns={columns} data={data} />);

    const getFirstAge = () => {
      return component.find('tbody tr').item(0).querySelectorAll('td .arco-table-cell').item(1)
        .textContent;
    };

    // Should show original data order (first row age is 20 from data[0])
    expect(getFirstAge()).toBe('20');
  });

  it('should handle defaultSortOrder undefined correctly', () => {
    const columns: ColumnProps<TestData>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        defaultSortOrder: undefined, // explicitly undefined
      },
    ];

    const component = render(<Table columns={columns} data={data} />);

    const getFirstAge = () => {
      return component.find('tbody tr').item(0).querySelectorAll('td .arco-table-cell').item(1)
        .textContent;
    };

    // Should show original data order (first row age is 20 from data[0])
    expect(getFirstAge()).toBe('20');
  });

  it('should maintain controlled state when sortOrder changes from defined to undefined', () => {
    const TestComponent = () => {
      const [sortOrder, setSortOrder] = React.useState<'ascend' | 'descend' | undefined>('descend');

      const columns: ColumnProps<TestData>[] = [
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          sorter: (a, b) => a.age - b.age,
          sortOrder,
        },
      ];

      return (
        <>
          <button onClick={() => setSortOrder('ascend')}>Ascend</button>
          <button onClick={() => setSortOrder('descend')}>Descend</button>
          <button onClick={() => setSortOrder(undefined)}>Clear</button>
          <Table columns={columns} data={data} />
        </>
      );
    };

    const component = render(<TestComponent />);

    const getFirstAge = () => {
      return component.find('tbody tr').item(0).querySelectorAll('td .arco-table-cell').item(0)
        .textContent;
    };

    // Initially descending (age 30)
    expect(getFirstAge()).toBe('30');

    // Switch to ascending
    const ascendButton = component.find('button')[0];
    fireEvent.click(ascendButton);
    expect(getFirstAge()).toBe('19');

    // Clear sorting
    const clearButton = component.find('button')[2];
    fireEvent.click(clearButton);
    expect(getFirstAge()).toBe('20'); // Original data order

    // Switch to descending again
    const descendButton = component.find('button')[1];
    fireEvent.click(descendButton);
    expect(getFirstAge()).toBe('30');
  });
});
