import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import '../../../tests/mockDate';

const QuarterPicker = DatePicker.QuarterPicker;

mountTest(QuarterPicker);

describe('QuarterPicker', () => {
  it('defaultValue & today', async () => {
    const component = mount(<QuarterPicker />);

    component.simulate('click');

    expect(component.find('.arco-picker-cell-today').text()).toBe('Q2');

    expect(component.find('input').prop('value')).toBe('');

    component
      .find('.arco-picker-date')
      .at(0) // Q1
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2020-Q1');
  });

  it('allowClear', () => {
    const onClear = jest.fn();
    const component = mount(<QuarterPicker defaultValue="2020-Q1" allowClear onClear={onClear} />);

    component.simulate('click');

    expect(component.find('input').prop('value')).toBe('2020-Q1');

    component.find('IconClose').simulate('click');

    expect(component.find('input').prop('value')).toBe('');
    expect(onClear.mock.calls.length).toBe(1);
  });
});
