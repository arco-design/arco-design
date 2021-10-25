import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Calendar from '..';
import '../../../tests/mockDate';

mountTest(Calendar);
componentConfigTest(Calendar, 'Calendar');

describe('Calendar', () => {
  it('basic render', () => {
    const component = mount(<Calendar />);

    expect(component.find('.arco-calendar-mode-month')).toHaveLength(1);

    // Header value
    expect(component.find('.arco-calendar-header .arco-calendar-header-value').text()).toBe(
      dayjs().format('YYYY 年 MM 月')
    );

    // Cell today and selected
    expect(component.find('.arco-calendar-cell-today')).toHaveLength(1);
    expect(component.find('.arco-calendar-cell-selected')).toHaveLength(0);

    // Week title
    expect(component.find('.arco-calendar-week-list div')).toHaveLength(7);
    expect(
      component
        .find('.arco-calendar-week-list div')
        .first()
        .text()
    ).toBe('周日');

    // All cells
    expect(component.find('.arco-calendar-cell')).toHaveLength(6 * 7);

    component.find('.arco-calendar-cell-today > div').simulate('click');

    expect(component.find('.arco-calendar-cell-selected .arco-calendar-date-circle').text()).toBe(
      String(dayjs().date())
    );

    // Change mode
    const radio = component.find('.arco-calendar-header-right .arco-radio-group');
    radio
      .find('label')
      .at(1)
      .find('input')
      .simulate('change');

    expect(component.find('.arco-calendar-mode-month')).toHaveLength(0);
    expect(component.find('.arco-calendar-mode-year')).toHaveLength(1);
    expect(component.find('.arco-calendar-month-with-days')).toHaveLength(12);
  });

  it('change date', () => {
    const onChange = jest.fn();
    const onPanelChange = jest.fn();
    const component = mount(
      <Calendar
        onChange={onChange}
        onPanelChange={onPanelChange}
        defaultValue={dayjs('2020-04-01')}
        dayStartOfWeek={1}
      />
    );

    expect(component.find('.arco-calendar-header .arco-calendar-header-value').text()).toBe(
      '2020 年 04 月'
    );

    // Week title
    expect(component.find('.arco-calendar-week-list div')).toHaveLength(7);
    expect(
      component
        .find('.arco-calendar-week-list div')
        .first()
        .text()
    ).toBe('周一');

    expect(component.find('.arco-calendar-cell-selected .arco-calendar-date-circle').text()).toBe(
      String(dayjs('2020-04-01').date())
    );

    // Click next month icon
    component
      .find('.arco-calendar-header-icon')
      .at(1)
      .simulate('click');

    expect(onPanelChange.mock.calls[0][0].isSame(dayjs('2020-04-01').add(1, 'month'))).toBe(true);
    expect(component.find('.arco-calendar-header .arco-calendar-header-value').text()).toBe(
      '2020 年 05 月'
    );
    expect(component.find('.arco-calendar-cell-selected')).toHaveLength(0);

    // Click today button
    component.find('.arco-calendar-header-left .arco-btn').simulate('click');

    expect(onChange.mock.calls[0][0].isSame(dayjs(), 'date')).toBe(true);
    expect(onPanelChange.mock.calls[1][0].isSame(dayjs(), 'date')).toBe(true);
    expect(component.find('.arco-calendar-header .arco-calendar-header-value').text()).toBe(
      dayjs().format('YYYY 年 MM 月')
    );
    expect(component.find('.arco-calendar-cell-selected .arco-calendar-date-circle').text()).toBe(
      String(dayjs().date())
    );
  });

  it('mode year', () => {
    const onChange = jest.fn();
    const onPanelChange = jest.fn();
    const component = mount(
      <Calendar
        onChange={onChange}
        onPanelChange={onPanelChange}
        mode="year"
        defaultValue={dayjs('2020-04-01')}
      />
    );

    expect(component.find('.arco-calendar-header .arco-calendar-header-value').text()).toBe(
      '2020 年'
    );

    expect(
      component
        .find('.arco-calendar-month-with-days')
        .at(3)
        .find('.arco-calendar-cell-selected .arco-calendar-date-circle')
        .text()
    ).toBe('1');

    // Click next prev icon
    component
      .find('.arco-calendar-header-icon')
      .at(0)
      .simulate('click');

    expect(onPanelChange.mock.calls[0][0].isSame(dayjs('2020-04-01').subtract(1, 'year'))).toBe(
      true
    );
    expect(component.find('.arco-calendar-header .arco-calendar-header-value').text()).toBe(
      '2019 年'
    );
    expect(component.find('.arco-calendar-cell-selected')).toHaveLength(0);

    // click 2019-06-02
    component
      .find('.arco-calendar-month-with-days')
      .at(5)
      .find('.arco-calendar-cell > div')
      .at(7)
      .simulate('click');

    expect(onChange.mock.calls[0][0].isSame(dayjs('2019-06-02'))).toBe(true);
    expect(onPanelChange.mock.calls[1][0].isSame(dayjs('2019-06-02'))).toBe(true);
  });

  it('panel', () => {
    const onChange = jest.fn();
    const component = mount(
      <Calendar defaultValue={dayjs('2020-04-01')} onChange={onChange} panel />
    );

    // click 2020-04-04
    component
      .find('.arco-calendar-cell > div')
      .at(7)
      .simulate('click');

    // expect(onChange.mock.calls[0][0].isSame(dayjs('2020-04-04'), 'date')).toBe(true);
    expect(
      component
        .find('.arco-calendar-cell')
        .at(7)
        .hasClass('arco-calendar-cell-selected')
    ).toBe(true);
  });

  it('panel mode year', () => {
    const onChange = jest.fn();
    const component = mount(
      <Calendar defaultValue={dayjs('2020-04-01')} onChange={onChange} panel mode="year" />
    );

    expect(component.find('.arco-calendar-cell')).toHaveLength(12);
    expect(component.find('.arco-calendar-cell-selected .arco-calendar-date-value').text()).toBe(
      '四月'
    );

    // click June
    component
      .find('.arco-calendar-cell > div')
      .at(5)
      .simulate('click');

    expect(onChange.mock.calls[0][0].isSame(dayjs('2020-06-01'))).toBe(true);
    expect(component.find('.arco-calendar-cell-selected .arco-calendar-date-value').text()).toBe(
      '六月'
    );
  });
});
