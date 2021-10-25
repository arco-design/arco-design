import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import '../../../tests/mockDate';

const WeekPicker = DatePicker.WeekPicker;

mountTest(WeekPicker);

describe('WeekPicker', () => {
  it('dayStartOfWeek', () => {
    const component = mount(<WeekPicker />);
    component.simulate('click');

    expect(
      component
        .find('.arco-picker-week-list-item')
        .at(1)
        .text()
    ).toBe('日');

    component.setProps({
      dayStartOfWeek: 1,
    });

    expect(
      component
        .find('.arco-picker-week-list-item')
        .at(1)
        .text()
    ).toBe('一');
  });

  it('defaultValue', () => {
    const component = mount(<WeekPicker defaultValue={dayjs('2020-04-01')} />);

    expect(component.find('input').prop('value')).toBe('2020-14周');

    component.simulate('click');

    component
      .find('.arco-picker-cell')
      .at(9) // 2020-15周
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2020-15周');
  });

  it('today & selected', () => {
    const component = mount(<WeekPicker />);

    component.simulate('click');

    expect(component.find('.arco-picker-cell-today').text()).toBe('10');

    expect(component.find('input').prop('value')).toBe('');

    component
      .find('.arco-picker-cell')
      .at(9) // 2020-15周
      .simulate('click');

    expect(component.find('.arco-picker-cell-selected').length).toBe(7);
    expect(
      component
        .find('.arco-picker-cell-selected')
        .first()
        .parents()
        .at(0)
        .find('.arco-picker-cell-week')
        .text()
    ).toBe('15');
  });

  it('allowClear', () => {
    const onClear = jest.fn();
    const component = mount(
      <WeekPicker allowClear onClear={onClear} defaultValue={dayjs('2020-04-01')} />
    );

    component.simulate('click');

    component.find('IconClose').simulate('click');

    expect(component.find('input').prop('value')).toBe('');
    expect(onClear.mock.calls.length).toBe(1);
  });
});
