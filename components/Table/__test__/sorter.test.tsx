import React from 'react';
import { mount } from 'enzyme';
import Table, { ColumnProps } from '..';
import { columnsSorter } from './common/columns';
import { data, TestData } from './common/data';
import { TableProps } from '../interface';
import { sleep } from '../../../tests/util';

function mountTable<T = any>(component: React.ReactElement) {
  return mount<React.PropsWithChildren<TableProps<T>>>(component);
}

describe('Table sorter', () => {
  it('sorter', () => {
    function checkSorter(columns: ColumnProps<TestData>[]) {
      const onChange = jest.fn();
      const component = mountTable(<Table columns={columns} data={data} onChange={onChange} />);
      const sorter = component.find('.arco-table-cell-with-sorter');
      const getFirstTdText = () => {
        return component.find('tbody tr').at(0).find('td .arco-table-cell').at(3).text();
      };

      expect(sorter).toHaveLength(1);

      // default ascend
      expect(getFirstTdText()).toBe('19');

      function checkSortDirections() {
        // descend
        sorter.simulate('click');

        expect(getFirstTdText()).toBe('30');

        // cancel
        sorter.simulate('click');

        expect(getFirstTdText()).toBe('20');
      }

      checkSortDirections();

      // onChange extra
      expect(onChange.mock.calls[0][3].action).toBe('sort');
      expect(onChange.mock.calls[0][3].currentData.map((a) => a.name)).toEqual([
        'Name4',
        'Name2',
        'Name5',
        'Name1',
        'Name3',
      ]);

      component.setProps({ pagination: false });

      // ascend
      sorter.simulate('click');

      expect(getFirstTdText()).toBe('19');

      checkSortDirections();
    }

    checkSorter(columnsSorter);
    // no dataIndex
    checkSorter(
      columnsSorter.map((col) => {
        const newCol = { ...col };
        if (newCol.sorter) {
          newCol.render = (_, record) => record.age;
          delete newCol.dataIndex;
        }
        return newCol;
      })
    );
  });

  it('sortDirections', () => {
    const component = mountTable(
      <Table
        columns={columnsSorter.map((d) => {
          const _d = { ...d };
          if (_d.title === 'Age') {
            delete _d.defaultSortOrder;
            return {
              ..._d,
              sortDirections: ['descend'],
              sorter: (a, b) => a.age - b.age,
            };
          }
          return _d;
        })}
        data={data}
      />
    );
    const sorter = component.find('.arco-table-cell-with-sorter');
    const getFirstTdText = () => {
      return component.find('tbody tr').at(0).find('td .arco-table-cell').at(3).text();
    };

    // default
    expect(getFirstTdText()).toBe('20');

    // descend
    sorter.simulate('click');

    expect(getFirstTdText()).toBe('30');

    // cancel
    sorter.simulate('click');

    expect(getFirstTdText()).toBe('20');
  });

  it('showSorterTooltip', async (done) => {
    const component = mountTable(<Table columns={columnsSorter} data={data} />);

    component.find('.arco-table-cell-with-sorter').simulate('mouseenter');

    function checkTooltipText(text: string) {
      setTimeout(() => {
        expect(document.querySelector('.arco-tooltip-content').innerHTML).toEqual(
          `<div class="arco-tooltip-content-inner">${text}</div>`
        );
        done();
      }, 200);
    }

    checkTooltipText('点击降序');

    await sleep(200);
    component.find('.arco-table-cell-with-sorter').simulate('click');

    checkTooltipText('取消排序');

    await sleep(200);
    component.find('.arco-table-cell-with-sorter').simulate('click');

    checkTooltipText('点击升序');

    await sleep(200);
    component.setProps({ showSorterTooltip: false });

    setTimeout(() => {
      expect(document.querySelector('.arco-tooltip-content')).toHaveLength(0);
      done();
    }, 200);
  });
});
