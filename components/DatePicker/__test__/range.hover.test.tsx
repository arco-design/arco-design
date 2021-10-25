import React from 'react';
import { mount } from 'enzyme';
import DatePicker from '..';
import { getDateCell, getInput } from './utils';
import '../../../tests/mockDate';

const { RangePicker } = DatePicker;

describe('RangePicker hover', () => {
  it('mode = date', () => {
    const component = mount(<RangePicker />);

    getInput(component, 0).simulate('click');

    expect(component.find('.arco-picker').hasClass('arco-picker-focused')).toBeTruthy();

    // 2020-04-05
    getDateCell(component, 0, 7)
      .find('.arco-picker-date')
      .simulate('click');

    expect(getDateCell(component, 0, 7).prop('className')).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-range-start'
    );

    // 2020-04-07
    getDateCell(component, 0, 9).simulate('mouseenter');

    expect(getDateCell(component, 0, 7).prop('className')).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-range-start arco-picker-cell-in-range'
    );
    expect(getDateCell(component, 0, 9).prop('className')).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-range-end arco-picker-cell-in-range'
    );
    expect(component.find('.arco-picker-cell-in-range')).toHaveLength(3);

    expect(getInput(component, 0).prop('value')).toBe('2020-04-05');
    expect(getInput(component, 1).prop('value')).toBe('2020-04-07');
    expect(
      getInput(component, 1)
        .parent()
        .hasClass('arco-picker-input-placeholder')
    ).toBeTruthy();

    getDateCell(component, 0, 9)
      .find('.arco-picker-date')
      .simulate('click');

    expect(getInput(component, 0).prop('value')).toBe('2020-04-05');
    expect(getInput(component, 1).prop('value')).toBe('2020-04-07');

    expect(component.find('.arco-picker').hasClass('arco-picker-focused')).toBeFalsy();

    // reopen
    getInput(component, 1).simulate('click');

    // 2020-04-09
    getDateCell(component, 0, 11).simulate('mouseenter');

    expect(getDateCell(component, 0, 7).prop('className')).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-range-start arco-picker-cell-in-range arco-picker-cell-hover-range-start arco-picker-cell-hover-in-range'
    );
    expect(getDateCell(component, 0, 9).prop('className')).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-range-end arco-picker-cell-in-range arco-picker-cell-hover-in-range arco-picker-cell-range-edge-in-hover-range'
    );
    expect(getDateCell(component, 0, 11).prop('className')).toBe(
      'arco-picker-cell arco-picker-cell-in-view arco-picker-cell-hover-range-end arco-picker-cell-hover-in-range'
    );
    expect(component.find('.arco-picker-cell-hover-in-range')).toHaveLength(5);
  });
});
