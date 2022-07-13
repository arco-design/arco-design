import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import '../../../tests/mockDate';

const { RangePicker } = DatePicker;

mountTest(RangePicker);

describe('RangePicker (date)', () => {
  it('date + week', () => {
    function testPicker(week?: boolean) {
      const component = render(<RangePicker mode={week ? 'week' : 'date'} />);

      const startInput = component.find('input').item(0);

      fireEvent.click(startInput);

      expect(component.find('.arco-picker-cell-today')[0].textContent).toBe('10');

      function checkHeaderLabel(labels: string[]) {
        expect(component.find('.arco-picker-header-value').item(0).textContent).toBe(labels[0]);
        expect(component.find('.arco-picker-header-value').item(1).textContent).toBe(labels[1]);
      }

      checkHeaderLabel(['2020-04', '2020-05']);

      // go prev month
      fireEvent.click(component.find('.arco-icon-left')[0]);

      checkHeaderLabel(['2020-03', '2020-04']);

      // go prev year
      fireEvent.click(component.find('.arco-icon-double-left')[0]);

      checkHeaderLabel(['2019-03', '2019-04']);

      // go next month
      fireEvent.click(component.find('.arco-icon-right')[0]);

      checkHeaderLabel(['2019-04', '2019-05']);

      // go next year
      fireEvent.click(component.find('.arco-icon-double-right')[0]);

      checkHeaderLabel(['2020-04', '2020-05']);
    }

    testPicker();
    testPicker(true);
  });

  it('month', () => {
    const component = render(<RangePicker mode="month" />);

    const startInput = component.find('input').item(0);

    fireEvent.click(startInput);

    expect(component.find('.arco-picker-cell-today')[0].textContent).toBe('四月');

    function checkHeaderLabel(labels: string[]) {
      expect(component.find('.arco-picker-header-value').item(0).textContent).toBe(labels[0]);
      expect(component.find('.arco-picker-header-value').item(1).textContent).toBe(labels[1]);
    }

    checkHeaderLabel(['2020', '2021']);

    expect(component.find('.arco-icon-left')).toHaveLength(0);
    expect(component.find('.arco-icon-right')).toHaveLength(0);
    expect(component.find('.arco-icon-double-left')).toHaveLength(1);
    expect(component.find('.arco-icon-double-right')).toHaveLength(1);

    // go prev year
    fireEvent.click(component.find('.arco-icon-double-left')[0]);

    checkHeaderLabel(['2019', '2020']);

    // go next year
    fireEvent.click(component.find('.arco-icon-double-right')[0]);

    checkHeaderLabel(['2020', '2021']);
  });

  it('year', () => {
    const component = render(<RangePicker mode="year" />);

    const startInput = component.find('input').item(0);

    fireEvent.click(startInput);

    expect(component.find('.arco-picker-cell-today')[0].textContent).toBe('2020');

    function checkHeaderLabel(labels: string[]) {
      expect(component.find('.arco-picker-header-value').item(0).textContent).toBe(labels[0]);
      expect(component.find('.arco-picker-header-value').item(1).textContent).toBe(labels[1]);
    }

    checkHeaderLabel(['2020 - 2030', '2030 - 2040']);

    expect(component.find('.arco-icon-left')).toHaveLength(0);
    expect(component.find('.arco-icon-right')).toHaveLength(0);
    expect(component.find('.arco-icon-double-left')).toHaveLength(1);
    expect(component.find('.arco-icon-double-right')).toHaveLength(1);

    // go prev year
    fireEvent.click(component.find('.arco-icon-double-left')[0]);

    checkHeaderLabel(['2010 - 2020', '2020 - 2030']);

    // go next year
    fireEvent.click(component.find('.arco-icon-double-right')[0]);

    checkHeaderLabel(['2020 - 2030', '2030 - 2040']);
  });

  it('quarter', () => {
    const component = render(<RangePicker mode="quarter" />);

    const startInput = component.find('input').item(0);

    fireEvent.click(startInput);

    expect(component.find('.arco-picker-cell-today')[0].textContent).toBe('Q2');

    function checkHeaderLabel(labels: string[]) {
      expect(component.find('.arco-picker-header-value').item(0).textContent).toBe(labels[0]);
      expect(component.find('.arco-picker-header-value').item(1).textContent).toBe(labels[1]);
    }

    checkHeaderLabel(['2020', '2021']);

    expect(component.find('.arco-icon-left')).toHaveLength(0);
    expect(component.find('.arco-icon-right')).toHaveLength(0);
    expect(component.find('.arco-icon-double-left')).toHaveLength(1);
    expect(component.find('.arco-icon-double-right')).toHaveLength(1);

    // go prev year
    fireEvent.click(component.find('.arco-icon-double-left')[0]);

    checkHeaderLabel(['2019', '2020']);

    // go next year
    fireEvent.click(component.find('.arco-icon-double-right')[0]);

    checkHeaderLabel(['2020', '2021']);
  });
});
