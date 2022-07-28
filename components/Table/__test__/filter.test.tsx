import React from 'react';
import { cleanup, fireEvent, render } from '../../../tests/util';
import Table from '..';
import { columnsFilter, columnsFilterCustom } from './common/columns';
import { data, TestData } from './common/data';
import { ColumnProps } from '../interface';

function simulateFilterCheckbox(filterItem, index: number) {
  // 点击过滤项
  fireEvent.click(filterItem.item(index).querySelector('.arco-checkbox > input'));
}

describe('Table Filter', () => {
  it('filter', async () => {
    function checkFilter(columns: ColumnProps<TestData>[]) {
      const component = render(<Table columns={columns} data={data} />);
      const filter = component.find('div.arco-table-filters')[0];

      expect(filter.className).toContain('arco-table-filters-active');
      expect(component.find('tbody tr')).toHaveLength(3);

      fireEvent.click(filter);
      const filterItem = component.find('.arco-table-filters-item');
      expect(filterItem).toHaveLength(2);

      simulateFilterCheckbox(filterItem, 1); // 选中Female

      const okButton = component.find('.arco-table-filters-btn .arco-btn');
      fireEvent.click(okButton.item(1));
      expect(component.find('tbody tr')).toHaveLength(5);

      simulateFilterCheckbox(filterItem, 0); // 取消选中Male

      fireEvent.click(okButton.item(1));
      expect(component.find('tbody tr')).toHaveLength(2);

      component.rerender(<Table columns={columns} data={data} pagination={false} />);

      expect(component.find('tbody tr')).toHaveLength(2);
      cleanup();
    }

    checkFilter(columnsFilter);
    // no dataIndex
    checkFilter(
      columnsFilter.map((col) => {
        const newCol = { ...col };
        if (newCol.dataIndex === 'sex') {
          delete newCol.dataIndex;
          newCol.render = (_, record) => record.sex;
        }
        return newCol;
      })
    );
  });

  it('custom filter', async () => {
    const component = render(<Table columns={columnsFilterCustom} data={data} />);
    const filter = component.find('.arco-table-filters')[0];

    expect(filter.querySelector('svg')?.classList.contains('arco-icon-search')).toBe(true);
    expect(component.find('tbody tr')).toHaveLength(5);

    fireEvent.click(filter);

    const customFilterPopup = component.find('.arco-table-custom-filter')[0];
    fireEvent.click(customFilterPopup.querySelectorAll('.arco-btn').item(0));
    fireEvent.click(customFilterPopup.querySelectorAll('.arco-btn').item(1));

    expect(component.find('tbody tr')).toHaveLength(3);
  });

  it('auto reset pagination current when filter', () => {
    const onChange = jest.fn();

    const component = render(
      <Table columns={columnsFilter} data={data} pagination={{ pageSize: 1 }} onChange={onChange} />
    );

    // pageSize & pagination correctly
    expect(component.find('tbody tr')).toHaveLength(1);
    expect(component.find('.arco-pagination-item')).toHaveLength(5);
    expect(component.find('.arco-pagination-item-active')[0].textContent).toBe('1');

    fireEvent.click(component.find('.arco-pagination-item').item(3));

    expect(component.find('.arco-pagination-item-active')[0].textContent).toBe('3');
    expect(onChange.mock.calls[0][0].current).toBe(3);
    expect(onChange.mock.calls[0][0].total).toBe(3);
    // onChange extra
    expect(onChange.mock.calls[0][3].action).toBe('paginate');
    expect(onChange.mock.calls[0][3].currentData.map((a) => a.name)).toEqual(['Name4']);

    // filter correctly
    const filter = component.find('.arco-table-filters')[0];

    fireEvent.click(filter);

    const filterItem = component.find('.arco-table-filters-item');

    simulateFilterCheckbox(filterItem, 0); // 取消选中Male

    simulateFilterCheckbox(filterItem, 1); // 选中Female

    const okButton = component.find('.arco-table-filters-btn .arco-btn');

    fireEvent.click(okButton.item(1));

    // auto reset current correctly
    expect(onChange.mock.calls[1][0].current).toBe(1);
    expect(onChange.mock.calls[1][0].total).toBe(2);
    // onChange extra
    expect(onChange.mock.calls[1][3].action).toBe('filter');
    expect(component.find('.arco-pagination-item')).toHaveLength(4);
    expect(component.find('.arco-pagination-item-active')[0].textContent).toBe('1');
  });

  it('filter in control mode', async () => {
    const component = render(
      <Table
        columns={columnsFilter.map((col) => {
          const newCol = { ...col };
          if (newCol.dataIndex === 'sex') {
            delete newCol.defaultFilters;
            newCol.filteredValue = ['male'];
          }
          return newCol;
        })}
        data={data}
      />
    );

    expect(component.find('tbody tr')).toHaveLength(3);

    component.rerender(
      <Table
        columns={columnsFilter.map((col) => {
          const newCol = { ...col };
          if (newCol.dataIndex === 'sex') {
            delete newCol.defaultFilters;
            newCol.filteredValue = undefined;
          }
          return newCol;
        })}
        data={data}
      />
    );

    expect(component.find('tbody tr')).toHaveLength(5);
  });
});
