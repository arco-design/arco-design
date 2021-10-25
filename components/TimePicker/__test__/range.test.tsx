import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import mountTest from '../../../tests/mountTest';
import TimePicker from '..';

const RangePicker = TimePicker.RangePicker;

mountTest(RangePicker);

function getCells(component, listIndex) {
  return component
    .find('.arco-timepicker-list')
    .at(listIndex)
    .find('li.arco-timepicker-cell');
}

function getInputValue(component, index) {
  return component
    .find('.arco-picker-input input')
    .at(index)
    .getDOMNode()
    .getAttribute('value');
}

describe('TimePicker.RangePicker', () => {
  it('basic', () => {
    const component = mount(<RangePicker />);

    expect(component.find('svg.arco-icon-clock-circle')).toHaveLength(1);

    component.find('.arco-picker-range').simulate('click');

    expect(component.find('.arco-timepicker')).toHaveLength(1);

    expect(component.find('.arco-timepicker-footer-btn-wrapper button')).toHaveLength(1);

    expect(getCells(component, 0)).toHaveLength(24);

    expect(getCells(component, 1)).toHaveLength(60);

    expect(getCells(component, 2)).toHaveLength(60);
  });

  it('defaultValue', () => {
    const component = mount(<RangePicker defaultValue={['09:24:53', '18:44:33']} />);
    expect(getInputValue(component, 0)).toBe('09:24:53');
    expect(getInputValue(component, 1)).toBe('18:44:33');
  });

  it('use12hours', () => {
    const component = mount(
      <RangePicker
        use12Hours
        format="hh:mm:ss A"
        defaultValue={[dayjs('12:20:20 AM', 'hh:mm:ss A'), dayjs('08:30:30 PM', 'hh:mm:ss A')]}
      />
    );

    component.find('.arco-picker-range').simulate('click');

    expect(getCells(component, 3)).toHaveLength(2);
  });
});
