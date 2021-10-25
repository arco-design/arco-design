import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import '../../../tests/mockDate';

const MonthPicker = DatePicker.MonthPicker;

mountTest(MonthPicker);

describe('MonthPicker', () => {
  it('defaultValue & today', async () => {
    const component = mount(<MonthPicker />);

    component.simulate('click');

    expect(component.find('.arco-picker-cell-today').text()).toBe('四月');

    expect(component.find('input').prop('value')).toBe('');

    component
      .find('.arco-picker-date')
      .at(5) // 6月
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2020-06');
  });

  it('allowClear', () => {
    const onClear = jest.fn();
    const component = mount(<MonthPicker defaultValue="2020-01" allowClear onClear={onClear} />);

    component.simulate('click');

    expect(component.find('input').prop('value')).toBe('2020-01');

    component.find('IconClose').simulate('click');

    expect(component.find('input').prop('value')).toBe('');
    expect(onClear.mock.calls.length).toBe(1);
  });
});
