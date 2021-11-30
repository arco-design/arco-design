import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import DatePicker from '..';
import '../../../tests/mockDate';

const { MonthPicker, YearPicker, QuarterPicker, WeekPicker, RangePicker } = DatePicker;

describe('Picker Format', () => {
  it('DatePicker', () => {
    const component = mount(<DatePicker format="YYYY/MM/DD" defaultValue="2020/02/01" />);

    expect(component.find('input').prop('value')).toBe('2020/02/01');

    component.simulate('click');

    component
      .find('.arco-picker-date')
      .at(8) // 2020-02-03
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2020/02/03');
  });

  it('MonthPicker', () => {
    const component = mount(<MonthPicker format="YYYY/MM" defaultValue="2020/02" />);

    expect(component.find('input').prop('value')).toBe('2020/02');

    component.simulate('click');

    component
      .find('.arco-picker-date')
      .at(0) // 2020-01
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2020/01');
  });

  it('YearPicker', () => {
    const component = mount(<YearPicker format="YYYY [year]" defaultValue="2020" />);

    expect(component.find('input').prop('value')).toBe('2020 year');

    component.simulate('click');

    component
      .find('.arco-picker-date')
      .at(3) // 2022
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2022 year');
  });

  it('QuarterPicker', () => {
    const component = mount(<QuarterPicker format="YYYY/[Q]Q" defaultValue="2020-01" />);

    expect(component.find('input').prop('value')).toBe('2020/Q1');

    component.simulate('click');

    component
      .find('.arco-picker-date')
      .at(1) // Q2
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2020/Q2');
  });

  it('WeekPicker', () => {
    const component = mount(<WeekPicker format="gggg/wo" defaultValue={dayjs('2020-01-01')} />);

    expect(component.find('input').prop('value')).toBe('2020/1周');

    component.simulate('click');

    component
      .find('.arco-picker-date')
      .at(9) // 2020-01-05 2周
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2020/2周');
  });

  it('RangePicker (date)', () => {
    const component = mount(
      <RangePicker format="YYYY/MM/DD" defaultValue={['2020/02/01', '2020/03/01']} />
    );

    expect(component.find('input').at(0).prop('value')).toBe('2020/02/01');
    expect(component.find('input').at(1).prop('value')).toBe('2020/03/01');
  });

  it('RangePicker (month)', () => {
    const component = mount(
      <RangePicker mode="month" format="YYYY/MM" defaultValue={['2020/02', '2020/03']} />
    );

    expect(component.find('input').at(0).prop('value')).toBe('2020/02');
    expect(component.find('input').at(1).prop('value')).toBe('2020/03');
  });

  it('RangePicker (year)', () => {
    const component = mount(
      <RangePicker mode="year" format="YYYY [year]" defaultValue={['2020', '2031']} />
    );

    expect(component.find('input').at(0).prop('value')).toBe('2020 year');
    expect(component.find('input').at(1).prop('value')).toBe('2031 year');
  });

  it('RangePicker (week)', () => {
    const component = mount(
      <RangePicker
        mode="week"
        format="gggg/wo"
        defaultValue={[dayjs('2020-02-01'), dayjs('2020-03-01')]}
      />
    );

    expect(component.find('input').at(0).prop('value')).toBe('2020/5周');
    expect(component.find('input').at(1).prop('value')).toBe('2020/10周');
  });

  it('fallback format', () => {
    const component = mount(<DatePicker format="YYYY-MM-DD HH:mm:ss" defaultValue="2020-02-01" />);
    expect(component.find('input').at(0).prop('value')).toBe('2020-02-01 00:00:00');
  });
});
