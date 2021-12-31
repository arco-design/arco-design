import React from 'react';
import { mount } from 'enzyme';
import Table from '..';
import { columnsFilter, columnsFilterCustom } from './common/columns';
import { data, TestData } from './common/data';
import { ColumnProps } from '../interface';

function simulateFilterCheckbox(filterItem, index: number, checked: boolean) {
  return filterItem.at(index).find('.arco-checkbox > input').simulate('change', {
    target: {
      checked,
    },
  });
}

describe('Table Filter', () => {
  it('filter', async () => {
    function checkFilter(columns: ColumnProps<TestData>[]) {
      const component = mount(<Table columns={columns} data={data} />);
      const filter = component.find('div.arco-table-filters');

      expect(filter).toHaveLength(1);
      expect(filter.hasClass('arco-table-filters-active')).toBe(true);
      expect(component.find('tbody tr')).toHaveLength(3);

      filter.simulate('click');

      component.update();

      const filterItem = component.find('.arco-table-filters-item');
      expect(filterItem).toHaveLength(2);

      simulateFilterCheckbox(filterItem, 1, true);

      const okButton = component.find('.arco-table-filters-btn .arco-btn');
      okButton.at(1).simulate('click');
      expect(component.find('tbody tr')).toHaveLength(5);

      simulateFilterCheckbox(filterItem, 0, false);

      okButton.at(1).simulate('click');
      expect(component.find('tbody tr')).toHaveLength(2);

      component.setProps({ pagination: false });

      expect(component.find('tbody tr')).toHaveLength(2);
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
    const component = mount(<Table columns={columnsFilterCustom} data={data} />);
    const filter = component.find('.arco-table-filters');

    expect(filter).toHaveLength(1);
    expect(filter.find('svg').hasClass('arco-icon-search')).toBe(true);
    expect(component.find('tbody tr')).toHaveLength(5);

    filter.simulate('click');

    component.update();

    const customFilterPopup = component.find('.arco-table-custom-filter');
    customFilterPopup.find('.arco-btn').at(0).simulate('click');
    customFilterPopup.find('.arco-btn').at(1).simulate('click');

    expect(component.find('tbody tr')).toHaveLength(3);
  });

  it('auto reset pagination current when filter', () => {
    const onChange = jest.fn();

    const component = mount(
      <Table columns={columnsFilter} data={data} pagination={{ pageSize: 1 }} onChange={onChange} />
    );

    // pageSize & pagination correctly
    expect(component.find('tbody tr')).toHaveLength(1);
    expect(component.find('.arco-pagination-item')).toHaveLength(5);
    expect(component.find('.arco-pagination-item-active').text()).toBe('1');

    component.find('.arco-pagination-item').at(3).simulate('click');

    expect(component.find('.arco-pagination-item-active').text()).toBe('3');
    expect(onChange.mock.calls[0][0].current).toBe(3);
    expect(onChange.mock.calls[0][0].total).toBe(3);
    // onChange extra
    expect(onChange.mock.calls[0][3].action).toBe('paginate');
    expect(onChange.mock.calls[0][3].currentData.map((a) => a.name)).toEqual(['Name4']);

    // filter correctly
    const filter = component.find('.arco-table-filters');

    filter.simulate('click');

    component.update();

    const filterItem = component.find('.arco-table-filters-item');

    simulateFilterCheckbox(filterItem, 0, false);

    simulateFilterCheckbox(filterItem, 1, true);

    const okButton = component.find('.arco-table-filters-btn .arco-btn');

    okButton.at(1).simulate('click');

    // auto reset current correctly
    expect(onChange.mock.calls[1][0].current).toBe(1);
    expect(onChange.mock.calls[1][0].total).toBe(2);
    // onChange extra
    expect(onChange.mock.calls[1][3].action).toBe('filter');
    expect(component.find('.arco-pagination-item')).toHaveLength(4);
    expect(component.find('.arco-pagination-item-active').text()).toBe('1');
  });

  it('filter in control mode', async () => {
    const component = mount(
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

    component.setProps({
      columns: columnsFilter.map((col) => {
        const newCol = { ...col };
        if (newCol.dataIndex === 'sex') {
          delete newCol.defaultFilters;
          newCol.filteredValue = undefined;
        }
        return newCol;
      }),
    });

    expect(component.find('tbody tr')).toHaveLength(5);
  });
});
