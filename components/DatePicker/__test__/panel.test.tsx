import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
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
      const component = mount(<Picker />);

      component.simulate('click');

      const labelYear = component.find('.arco-picker-header-label').at(0);
      const labelMonth = component.find('.arco-picker-header-label').at(1);

      function checkPanelDate(date: string) {
        const y = date.split('-')[0];
        const m = date.split('-')[1];
        expect(labelYear.text()).toBe(y);
        expect(labelMonth.text()).toBe(m);
      }

      checkPanelDate('2020-04');

      // go prev month
      component.find('IconLeft').simulate('click');
      checkPanelDate('2020-03');

      // go prev year
      component.find('IconDoubleLeft').simulate('click');
      checkPanelDate('2019-03');

      // go next month
      component.find('IconRight').simulate('click');
      checkPanelDate('2019-04');

      // go next year
      component.find('IconDoubleRight').simulate('click');
      checkPanelDate('2020-04');

      // quick selection year
      labelYear.simulate('click');

      expect(component.find('.arco-picker-header-value').text()).toBe('2020 - 2030');

      component.find('IconDoubleLeft').simulate('click');
      expect(component.find('.arco-picker-header-value').text()).toBe('2010 - 2020');
      component.find('IconDoubleRight').simulate('click');
      expect(component.find('.arco-picker-header-value').text()).toBe('2020 - 2030');

      component
        .find('.arco-picker-date')
        .at(6) // 2025
        .simulate('click');

      expect(component.find('.arco-picker-header-value').text()).toBe('2025');

      // quick selection month
      component.find('IconDoubleLeft').simulate('click');
      expect(component.find('.arco-picker-header-value').text()).toBe('2024');
      component.find('IconDoubleRight').simulate('click');
      expect(component.find('.arco-picker-header-value').text()).toBe('2025');

      component
        .find('.arco-picker-date')
        .at(0) // 2025-01
        .simulate('click');

      expect(component.find('.arco-picker-header-value').text()).toBe('2025-01');

      component
        .find('.arco-picker-date')
        .at(6) // 2025-01-04
        .simulate('click');

      expect(component.find('input').prop('value')).toBe(week ? '2025-1周' : '2025-01-04');
    }

    testPicker();
    testPicker(true);
  });

  it('MonthPicker', () => {
    const component = mount(<MonthPicker defaultValue="2020-02" />);

    component.simulate('click');

    const labelYear = component.find('.arco-picker-header-label');

    expect(component.find('.arco-picker-header-value').text()).toBe('2020');

    // go prev year
    component.find('IconDoubleLeft').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2019');

    // go next year
    component.find('IconDoubleRight').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2020');

    // quick selection year
    labelYear.simulate('click');

    expect(component.find('.arco-picker-header-value').text()).toBe('2020 - 2030');

    component.find('IconDoubleLeft').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2010 - 2020');
    component.find('IconDoubleRight').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2020 - 2030');

    component
      .find('.arco-picker-date')
      .at(6) // 2025
      .simulate('click');

    expect(component.find('.arco-picker-header-value').text()).toBe('2025');

    component
      .find('.arco-picker-date')
      .at(0) // 2025-01
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2025-01');
  });

  it('YearPicker', () => {
    const component = mount(<YearPicker defaultValue="2020" />);

    component.simulate('click');

    expect(component.find('.arco-picker-header-value').text()).toBe('2020 - 2030');

    // go prev 10 year
    component.find('IconDoubleLeft').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2010 - 2020');

    // go next 10 year
    component.find('IconDoubleRight').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2020 - 2030');

    component
      .find('.arco-picker-date')
      .at(6) // 2025
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2025');
  });

  it('QuarterPicker', () => {
    const component = mount(<QuarterPicker defaultValue="2020-Q3" />);

    component.simulate('click');

    const labelYear = component.find('.arco-picker-header-label');

    expect(component.find('.arco-picker-header-value').text()).toBe('2020');

    // go prev year
    component.find('IconDoubleLeft').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2019');

    // go next year
    component.find('IconDoubleRight').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2020');

    // quick selection year
    labelYear.simulate('click');

    expect(component.find('.arco-picker-header-value').text()).toBe('2020 - 2030');

    component.find('IconDoubleLeft').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2010 - 2020');
    component.find('IconDoubleRight').simulate('click');
    expect(component.find('.arco-picker-header-value').text()).toBe('2020 - 2030');

    component
      .find('.arco-picker-date')
      .at(6) // 2025
      .simulate('click');

    expect(component.find('.arco-picker-header-value').text()).toBe('2025');

    component
      .find('.arco-picker-date')
      .at(0) // 2025-Q1
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2025-Q1');
  });

  it('disabledDate', () => {
    const component = mount(
      <DatePicker disabledDate={(current) => current.isAfter(dayjs().endOf('day'))} />
    );

    component.simulate('click');

    const labelYear = component.find('.arco-picker-header-label').at(0);

    expect(
      component
        .find('.arco-picker-cell')
        .findWhere((n) => n.text() === '10')
        .at(0)
        .hasClass('arco-picker-cell-disabled')
    ).toBeFalsy();

    expect(
      component
        .find('.arco-picker-cell')
        .findWhere((n) => n.text() === '11')
        .at(0)
        .hasClass('arco-picker-cell-disabled')
    ).toBeTruthy();

    // quick selection year
    labelYear.simulate('click');

    expect(
      component
        .find('.arco-picker-cell')
        .findWhere((n) => n.text() === '2020')
        .at(0)
        .hasClass('arco-picker-cell-disabled')
    ).toBeFalsy();

    expect(
      component
        .find('.arco-picker-cell')
        .findWhere((n) => n.text() === '2021')
        .at(0)
        .hasClass('arco-picker-cell-disabled')
    ).toBeTruthy();

    // quick selection month
    component
      .find('.arco-picker-date')
      .at(1) // 2020
      .simulate('click');

    expect(
      component.find('.arco-picker-cell').at(3).hasClass('arco-picker-cell-disabled')
    ).toBeFalsy();

    expect(
      component.find('.arco-picker-cell').at(5).hasClass('arco-picker-cell-disabled')
    ).toBeTruthy();
  });
});
