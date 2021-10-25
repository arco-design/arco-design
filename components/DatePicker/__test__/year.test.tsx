import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import '../../../tests/mockDate';

const YearPicker = DatePicker.YearPicker;

mountTest(YearPicker);

describe('YearPicker', () => {
  it('defaultValue & today', async () => {
    const component = mount(<YearPicker />);

    component.simulate('click');

    expect(component.find('.arco-picker-cell-today').text()).toBe('2020');

    expect(component.find('input').prop('value')).toBe('');

    component
      .find('.arco-picker-date')
      .at(6) // 2025
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2025');
  });

  it('allowClear', () => {
    const onClear = jest.fn();
    const component = mount(<YearPicker defaultValue="2020" allowClear onClear={onClear} />);

    component.simulate('click');

    expect(component.find('input').prop('value')).toBe('2020');

    component.find('IconClose').simulate('click');

    expect(component.find('input').prop('value')).toBe('');
    expect(onClear.mock.calls.length).toBe(1);
  });
});
