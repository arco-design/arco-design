import React from 'react';
import dayjs from 'dayjs';
import { render, fireEvent } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Calendar from '..';
import '../../../tests/mockDate';

mountTest(Calendar);
componentConfigTest(Calendar, 'Calendar');

describe('Calendar', () => {
  it('basic render', () => {
    const component = render(<Calendar />);

    expect(component.find('.arco-calendar-mode-month')).toHaveLength(1);

    // Header value
    expect(component.find('.arco-calendar-header .arco-calendar-header-value')[0].innerHTML).toBe(
      dayjs().format('YYYY 年 MM 月')
    );

    // Cell today and selected
    expect(component.find('.arco-calendar-cell-today')).toHaveLength(1);
    expect(component.find('.arco-calendar-cell-selected')).toHaveLength(0);

    // Week title
    expect(component.find('.arco-calendar-week-list div')).toHaveLength(7);
    expect(component.find('.arco-calendar-week-list div').item(0).innerHTML).toBe('周日');

    // All cells
    expect(component.find('.arco-calendar-cell')).toHaveLength(6 * 7);

    fireEvent.click(component.find('.arco-calendar-cell-today > div')[0]);

    expect(
      component.find('.arco-calendar-cell-selected .arco-calendar-date-circle')[0].innerHTML
    ).toBe(String(dayjs().date()));

    // Change mode
    const radioGroup = component.find('.arco-calendar-header-right .arco-radio-group');
    fireEvent.click(radioGroup.item(0).childNodes[1]);

    expect(component.find('.arco-calendar-mode-month')).toHaveLength(0);
    expect(component.find('.arco-calendar-mode-year')).toHaveLength(1);
    expect(component.find('.arco-calendar-month-with-days')).toHaveLength(12);
  });

  it('change date', () => {
    const onChange = jest.fn();
    const onPanelChange = jest.fn();
    const component = render(
      <Calendar
        onChange={onChange}
        onPanelChange={onPanelChange}
        defaultValue={dayjs('2020-04-01')}
        dayStartOfWeek={1}
      />
    );

    expect(component.find('.arco-calendar-header .arco-calendar-header-value')[0].innerHTML).toBe(
      '2020 年 04 月'
    );

    // Week title
    expect(component.find('.arco-calendar-week-list div')).toHaveLength(7);
    expect(component.find('.arco-calendar-week-list div').item(0).innerHTML).toBe('周一');

    expect(
      component.find('.arco-calendar-cell-selected .arco-calendar-date-circle')[0].innerHTML
    ).toBe(String(dayjs('2020-04-01').date()));

    // Click next month icon
    fireEvent.click(component.find('.arco-calendar-header-icon').item(1));

    expect(onPanelChange.mock.calls[0][0].isSame(dayjs('2020-04-01').add(1, 'month'))).toBe(true);
    expect(component.find('.arco-calendar-header .arco-calendar-header-value')[0].innerHTML).toBe(
      '2020 年 05 月'
    );
    expect(component.find('.arco-calendar-cell-selected')).toHaveLength(0);

    // Click today button
    fireEvent.click(component.find('.arco-calendar-header-left .arco-btn')[0]);

    expect(onChange.mock.calls[0][0].isSame(dayjs(), 'date')).toBe(true);
    expect(onPanelChange.mock.calls[1][0].isSame(dayjs(), 'date')).toBe(true);
    expect(component.find('.arco-calendar-header .arco-calendar-header-value')[0].innerHTML).toBe(
      dayjs().format('YYYY 年 MM 月')
    );
    expect(
      component.find('.arco-calendar-cell-selected .arco-calendar-date-circle')[0].innerHTML
    ).toBe(String(dayjs().date()));
  });

  it('mode year', () => {
    const onChange = jest.fn();
    const onPanelChange = jest.fn();
    const component = render(
      <Calendar
        onChange={onChange}
        onPanelChange={onPanelChange}
        mode="year"
        defaultValue={dayjs('2020-04-01')}
      />
    );

    expect(component.find('.arco-calendar-header .arco-calendar-header-value')[0].innerHTML).toBe(
      '2020 年'
    );

    const selectedCell = component
      .find('.arco-calendar-month-with-days')
      .item(3)
      .querySelector('.arco-calendar-cell-selected');

    expect(selectedCell?.querySelector('.arco-calendar-date-circle')?.innerHTML).toBe('1');

    // Click next prev icon
    fireEvent.click(component.find('.arco-calendar-header-icon').item(0));

    expect(onPanelChange.mock.calls[0][0].isSame(dayjs('2020-04-01').subtract(1, 'year'))).toBe(
      true
    );
    expect(component.find('.arco-calendar-header .arco-calendar-header-value')[0].innerHTML).toBe(
      '2019 年'
    );
    expect(component.find('.arco-calendar-cell-selected')).toHaveLength(0);

    // click 2019-06-02
    fireEvent.click(
      component
        .find('.arco-calendar-month-with-days')
        .item(5)
        .querySelectorAll('.arco-calendar-cell > div')
        .item(7)
    );

    expect(onChange.mock.calls[0][0].isSame(dayjs('2019-06-02'))).toBe(true);
    expect(onPanelChange.mock.calls[1][0].isSame(dayjs('2019-06-02'))).toBe(true);
  });

  it('panel', () => {
    const onChange = jest.fn();
    const component = render(
      <Calendar defaultValue={dayjs('2020-04-01')} onChange={onChange} panel />
    );

    // click 2020-04-04
    fireEvent.click(component.find('.arco-calendar-cell > div').item(7));

    // expect(onChange.mock.calls[0][0].isSame(dayjs('2020-04-04'), 'date')).toBe(true);
    expect(component.find('.arco-calendar-cell').item(7).className).toContain(
      'arco-calendar-cell-selected'
    );
  });

  it('panel mode year', () => {
    const onChange = jest.fn();
    const component = render(
      <Calendar defaultValue={dayjs('2020-04-01')} onChange={onChange} panel mode="year" />
    );

    expect(component.find('.arco-calendar-cell')).toHaveLength(12);
    expect(
      component.find('.arco-calendar-cell-selected .arco-calendar-date-value')[0].innerHTML
    ).toBe('四月');

    // click June
    fireEvent.click(component.find('.arco-calendar-cell > div').item(5));

    expect(onChange.mock.calls[0][0].isSame(dayjs('2020-06-01'))).toBe(true);
    expect(
      component.find('.arco-calendar-cell-selected .arco-calendar-date-value')[0].innerHTML
    ).toBe('六月');
  });
});
