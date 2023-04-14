import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import { multipleSorterColumns } from './common/columns';
import { multipleSorterData } from './common/data';
import Table from '..';

describe('Table multiple sorter', () => {
  it('multiple sorter', () => {
    const onChange = jest.fn();
    const component = render(
      <Table columns={multipleSorterColumns} data={multipleSorterData} onChange={onChange} />
    );
    function getRowData(index: number) {
      const trs = component.querySelectorAll('tbody tr');
      const length = trs.length;
      const data: (number | string)[] = [];
      for (let i = 0; i < length; i++) {
        const value =
          trs.item(i).querySelectorAll('td .arco-table-cell').item(index).textContent || '';
        if (!isNaN(parseInt(value))) {
          data.push(parseInt(value));
        } else {
          data.push(value);
        }
      }
      return data;
    }

    expect(getRowData(0)).toEqual(['A', 'C', 'B', 'D', 'E']);

    const ths = component.querySelectorAll('thead th');
    expect(ths.length).toBe(5);
    expect(ths.item(2).classList).toContain('arco-table-col-sorted');
    expect(ths.item(3).classList).toContain('arco-table-col-sorted');
    expect(ths.item(4).classList).toContain('arco-table-col-sorted');

    const nameSorter = component.find('.arco-table-cell-with-sorter').item(0);
    const ageSorter = component.find('.arco-table-cell-with-sorter').item(1);
    const scoreASorter = component.find('.arco-table-cell-with-sorter').item(2);
    const scoreBSorter = component.find('.arco-table-cell-with-sorter').item(3);
    const scoreCSorter = component.find('.arco-table-cell-with-sorter').item(4);

    expect(getRowData(2)).toEqual([100, 100, 100, 80, 80]);
    expect(getRowData(3)).toEqual([60, 70, 90, 70, 70]);
    expect(getRowData(4)).toEqual([70, 60, 80, 100, 90]);

    fireEvent.click(scoreASorter);

    expect(getRowData(2)).toEqual([100, 80, 80, 100, 100]);
    expect(getRowData(3)).toEqual([60, 70, 70, 70, 90]);
    expect(getRowData(4)).toEqual([70, 100, 90, 60, 80]);
    fireEvent.click(scoreCSorter);
    fireEvent.click(scoreCSorter);
    expect(getRowData(3)).toEqual([60, 70, 70, 70, 90]);
    expect(getRowData(4)).toEqual([70, 60, 90, 100, 80]);
    fireEvent.click(scoreBSorter);
    expect(getRowData(3)).toEqual([90, 70, 70, 70, 60]);
    expect(getRowData(4)).toEqual([80, 60, 90, 100, 70]);

    fireEvent.click(nameSorter);
    expect(component.querySelectorAll('thead .arco-table-col-sorted')).toHaveLength(1);
    expect(getRowData(0)).toEqual(['A', 'B', 'C', 'D', 'E']);
    fireEvent.click(ageSorter);
    expect(getRowData(1)).toEqual([15, 17, 18, 19, 20]);
  });
});
