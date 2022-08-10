import React from 'react';
import dayjs from 'dayjs';
import { cleanup, fireEvent, render } from '../../../tests/util';
import DatePicker from '..';
import '../../../tests/mockDate';

const WeekPicker = DatePicker.WeekPicker;
const MonthPicker = DatePicker.MonthPicker;
const YearPicker = DatePicker.YearPicker;
const QuarterPicker = DatePicker.QuarterPicker;

describe('Panel show date', () => {
  it('DatePicker & WeekPicker', () => {
    function testPicker(week?: boolean) {
      const Picker = week ? WeekPicker : DatePicker;
      const component = render(<Picker />);

      fireEvent.click(component.container.firstChild!);

      const labelYear = component.find('.arco-picker-header-label').item(0);
      const labelMonth = component.find('.arco-picker-header-label').item(1);

      function checkPanelDate(date: string) {
        const y = date.split('-')[0];
        const m = date.split('-')[1];
        expect(labelYear.textContent).toBe(y);
        expect(labelMonth.textContent).toBe(m);
      }

      checkPanelDate('2020-04');

      // go prev month
      fireEvent.click(component.find('.arco-icon-left')[0]);
      checkPanelDate('2020-03');

      // go prev year
      fireEvent.click(component.find('.arco-icon-double-left')[0]);
      checkPanelDate('2019-03');

      // go next month
      fireEvent.click(component.find('.arco-icon-right')[0]);
      checkPanelDate('2019-04');

      // go next year
      fireEvent.click(component.find('.arco-icon-double-right')[0]);
      checkPanelDate('2020-04');

      // quick selection year
      fireEvent.click(labelYear);

      expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020 - 2030');

      fireEvent.click(component.find('.arco-icon-double-left')[0]);
      expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2010 - 2020');
      fireEvent.click(component.find('.arco-icon-double-right')[0]);
      expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020 - 2030');

      fireEvent.click(component.find('.arco-picker-date').item(6)); // 2025

      expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2025');

      // quick selection month
      fireEvent.click(component.find('.arco-icon-double-left')[0]);
      expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2024');
      fireEvent.click(component.find('.arco-icon-double-right')[0]);
      expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2025');

      fireEvent.click(component.find('.arco-picker-date').item(0)); // 2025-01

      expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2025-01');

      fireEvent.click(component.find('.arco-picker-date').item(6)); // 2025-01-05

      expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe(
        week ? '2025-1周' : '2025-01-05'
      );
    }

    testPicker();
    cleanup();
    testPicker(true);
  });

  it('MonthPicker', () => {
    const component = render(<MonthPicker defaultValue="2020-02" />);

    fireEvent.click(component.container.firstChild!);

    const labelYear = component.find('.arco-picker-header-label')[0];

    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020');

    // go prev year
    fireEvent.click(component.find('.arco-icon-double-left')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2019');

    // go next year
    fireEvent.click(component.find('.arco-icon-double-right')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020');

    // quick selection year
    fireEvent.click(labelYear);

    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020 - 2030');

    fireEvent.click(component.find('.arco-icon-double-left')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2010 - 2020');
    fireEvent.click(component.find('.arco-icon-double-right')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020 - 2030');

    fireEvent.click(component.find('.arco-picker-date').item(6)); // 2025

    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2025');

    fireEvent.click(component.find('.arco-picker-date').item(0)); // 2025-01

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2025-01');
  });

  it('YearPicker', () => {
    const component = render(<YearPicker defaultValue="2020" />);

    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020 - 2030');

    // go prev 10 year
    fireEvent.click(component.find('.arco-icon-double-left')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2010 - 2020');

    // go next 10 year
    fireEvent.click(component.find('.arco-icon-double-right')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020 - 2030');

    fireEvent.click(component.find('.arco-picker-date').item(6)); // 2025

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2025');
  });

  it('QuarterPicker', () => {
    const component = render(<QuarterPicker defaultValue="2020-Q3" />);

    fireEvent.click(component.container.firstChild!);

    const labelYear = component.find('.arco-picker-header-label')[0];

    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020');

    // go prev year
    fireEvent.click(component.find('.arco-icon-double-left')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2019');

    // go next year
    fireEvent.click(component.find('.arco-icon-double-right')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020');

    // quick selection year
    fireEvent.click(labelYear);

    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020 - 2030');

    fireEvent.click(component.find('.arco-icon-double-left')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2010 - 2020');
    fireEvent.click(component.find('.arco-icon-double-right')[0]);
    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2020 - 2030');

    fireEvent.click(component.find('.arco-picker-date').item(6)); // 2025

    expect(component.find('.arco-picker-header-value')[0].textContent).toBe('2025');

    fireEvent.click(component.find('.arco-picker-date').item(0)); // 2025-Q1

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2025-Q1');
  });

  it('disabledDate', () => {
    const component = render(
      <DatePicker disabledDate={(current) => current.isAfter(dayjs().endOf('day'))} />
    );

    fireEvent.click(component.container.firstChild!);

    expect(
      [].slice
        .apply(component.find('.arco-picker-cell'))
        .filter((n) => n.textContent === '10')[0]
        .classList.contains('arco-picker-cell-disabled')
    ).toBeFalsy();

    expect(
      [].slice
        .apply(component.find('.arco-picker-cell'))
        .filter((n) => n.textContent === '11')[0]
        .classList.contains('arco-picker-cell-disabled')
    ).toBeTruthy();

    const labelYear = component.find('.arco-picker-header-label').item(0);

    // quick selection year
    fireEvent.click(labelYear);

    expect(
      [].slice
        .apply(component.find('.arco-picker-cell'))
        .filter((n) => n.textContent === '2020')[0]
        .classList.contains('arco-picker-cell-disabled')
    ).toBeFalsy();

    expect(
      [].slice
        .apply(component.find('.arco-picker-cell'))
        .filter((n) => n.textContent === '2021')[0]
        .classList.contains('arco-picker-cell-disabled')
    ).toBeTruthy();

    // quick selection month
    fireEvent.click(component.find('.arco-picker-date').item(1)); // 2020

    expect(
      component.find('.arco-picker-cell').item(3).classList.contains('arco-picker-cell-disabled')
    ).toBeFalsy();

    expect(
      component.find('.arco-picker-cell').item(5).classList.contains('arco-picker-cell-disabled')
    ).toBeTruthy();
  });
});
