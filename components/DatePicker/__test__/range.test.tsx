import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import { getDateCell, getInput, checkRangeTime } from './utils';
import '../../../tests/mockDate';

const { RangePicker } = DatePicker;

mountTest(RangePicker);

describe('RangePicker', () => {
  it('control mode', () => {
    const component = mount(<RangePicker showTime={{ defaultValue: ['00:00:00', '01:02:03'] }} />);

    component.simulate('click');

    component.find('button.arco-picker-btn-select-time').simulate('click');

    checkRangeTime(component, 0, '00', '00', '00');
    checkRangeTime(component, 1, '01', '02', '03');

    component.setProps({ value: ['2021-06-10 02:02:02', '2021-06-11 06:06:06'] });

    expect(component.find('input').at(0).prop('value')).toBe('2021-06-10 02:02:02');

    expect(component.find('input').at(1).prop('value')).toBe('2021-06-11 06:06:06');

    checkRangeTime(component, 0, '02', '02', '02');
    checkRangeTime(component, 1, '06', '06', '06');

    component.setProps({ value: undefined });

    checkRangeTime(component, 0, '00', '00', '00');
    checkRangeTime(component, 1, '01', '02', '03');
  });

  it('hideNotInViewDates', () => {
    const component = mount(<DatePicker.RangePicker hideNotInViewDates triggerElement={null} />);

    expect(component.find('.arco-picker-cell-hidden')).toHaveLength(23);
  });

  it('hover placeholder', () => {
    const component = mount(<DatePicker.RangePicker popupVisible />);

    function checkPlaceholder(index: number, isPlaceholder: boolean) {
      expect(getInput(component, index).parent().hasClass('arco-picker-input-placeholder')).toBe(
        isPlaceholder
      );
    }

    // 2020-04-05: mouseenter
    getDateCell(component, 0, 7).simulate('mouseenter');

    expect(getInput(component, 0).prop('value')).toBe('2020-04-05');
    checkPlaceholder(0, true);
    checkPlaceholder(1, false);

    // 2020-04-06: mouseenter
    getDateCell(component, 0, 8).simulate('mouseenter');

    expect(getInput(component, 0).prop('value')).toBe('2020-04-06');
    checkPlaceholder(0, true);
    checkPlaceholder(1, false);

    // 2020-04-06: mouseleave
    getDateCell(component, 0, 8).simulate('mouseleave');

    expect(getInput(component, 0).prop('value')).toBe('');
    checkPlaceholder(0, false);
    checkPlaceholder(1, false);

    // 2020-04-05: re mouseenter and select
    expect(getInput(component, 0).parent().hasClass('arco-picker-input-active')).toBeTruthy();

    getDateCell(component, 0, 7).find('.arco-picker-date').simulate('click');

    expect(getInput(component, 1).parent().hasClass('arco-picker-input-active')).toBeTruthy();

    expect(getInput(component, 0).prop('value')).toBe('2020-04-05');
    expect(getInput(component, 1).prop('value')).toBe('');
    checkPlaceholder(0, false);
    checkPlaceholder(1, false);

    // 2020-04-06: mouseenter
    getDateCell(component, 0, 8).simulate('mouseenter');

    expect(getInput(component, 1).prop('value')).toBe('2020-04-06');
    checkPlaceholder(0, false);
    checkPlaceholder(1, true);

    // 2020-04-06: click
    getDateCell(component, 0, 8).find('.arco-picker-date').simulate('click');

    expect(getInput(component, 1).prop('value')).toBe('2020-04-06');
    checkPlaceholder(0, false);
    checkPlaceholder(1, false);
  });

  it('shortcuts', () => {
    jest.useFakeTimers();

    const component = mount(
      <DatePicker.RangePicker
        shortcuts={[
          {
            text: 'next 7 days',
            value: () => [dayjs(), dayjs().add(1, 'week')],
          },
        ]}
        popupVisible
      />
    );

    expect(getInput(component, 0).prop('value')).toBe('');
    expect(getInput(component, 1).prop('value')).toBe('');

    // 2020-04-10 - 2020-04-17: shortcuts mouseenter
    component.find('.arco-picker-shortcuts').childAt(0).simulate('mouseenter');

    jest.runAllTimers();
    component.update();

    expect(getInput(component, 0).prop('value')).toBe('');
    expect(getInput(component, 0).prop('value')).toBe('');

    // 2020-04-10 - 2020-04-17
    expect(getDateCell(component, 0, 12).hasClass('arco-picker-cell-range-start')).toBeTruthy();
    expect(getDateCell(component, 0, 19).hasClass('arco-picker-cell-range-end')).toBeTruthy();

    // 2020-04-10 - 2020-04-17: shortcuts mouseleave
    component.find('.arco-picker-shortcuts').childAt(0).simulate('mouseleave');

    jest.runAllTimers();
    component.update();

    expect(getDateCell(component, 0, 12).hasClass('arco-picker-cell-range-start')).toBeFalsy();
    expect(getDateCell(component, 0, 19).hasClass('arco-picker-cell-range-end')).toBeFalsy();

    // 2020-04-10 - 2020-04-17: shortcuts click
    component.find('.arco-picker-shortcuts').childAt(0).simulate('click');

    expect(getInput(component, 0).prop('value')).toBe('2020-04-10');
    expect(getInput(component, 1).prop('value')).toBe('2020-04-17');
    expect(getDateCell(component, 0, 12).hasClass('arco-picker-cell-range-start')).toBeTruthy();
    expect(getDateCell(component, 0, 19).hasClass('arco-picker-cell-range-end')).toBeTruthy();
  });

  it('clearRangeOnReselect', () => {
    const onChange = jest.fn();

    const component = mount(
      <DatePicker.RangePicker
        // 2020-04-10 - 2020-04-17
        defaultValue={[dayjs(), dayjs().add(1, 'week')]}
        onChange={onChange}
        popupVisible
      />
    );

    // 2020-04-11
    getDateCell(component, 0, 13).find('.arco-picker-date').simulate('click');

    expect(onChange.mock.calls.length).toBe(1);

    component.setProps({ clearRangeOnReselect: true });
    component.update();

    // 2020-04-12
    getDateCell(component, 0, 14).find('.arco-picker-date').simulate('click');

    expect(onChange.mock.calls.length).toBe(1);

    // 2020-04-13
    getDateCell(component, 0, 15).find('.arco-picker-date').simulate('click');

    expect(onChange.mock.calls.length).toBe(2);
  });

  it('onSelect & onChange', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();

    const component = mount(<DatePicker.RangePicker onSelect={onSelect} onChange={onChange} />);

    // open, start
    getInput(component, 0).simulate('click');

    getDateCell(component, 0, 13).find('.arco-picker-date').simulate('click');

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toEqual(['2020-04-11']);
    expect(onSelect.mock.calls[0][2]).toEqual({ type: 'start' });

    expect(onChange.mock.calls.length).toBe(0);

    getDateCell(component, 0, 14).find('.arco-picker-date').simulate('click');

    expect(onSelect.mock.calls.length).toBe(2);
    expect(onSelect.mock.calls[1][0]).toEqual(['2020-04-11', '2020-04-12']);
    expect(onSelect.mock.calls[1][2]).toEqual({ type: 'end' });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(['2020-04-11', '2020-04-12']);
  });

  it('onSelect & onChange (showTime)', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();

    const component = mount(
      <DatePicker.RangePicker onSelect={onSelect} onChange={onChange} showTime />
    );

    // open, start
    getInput(component, 0).simulate('click');

    getDateCell(component, 0, 13).find('.arco-picker-date').simulate('click');

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toEqual(['2020-04-11 20:32:59']);
    expect(onSelect.mock.calls[0][2]).toEqual({ type: 'start' });

    expect(onChange.mock.calls.length).toBe(0);

    getDateCell(component, 0, 14).find('.arco-picker-date').simulate('click');

    expect(onSelect.mock.calls.length).toBe(2);
    expect(onSelect.mock.calls[1][0]).toEqual(['2020-04-11 20:32:59', '2020-04-12 20:32:59']);
    expect(onSelect.mock.calls[1][2]).toEqual({ type: 'end' });

    expect(onChange.mock.calls.length).toBe(0);

    component.find('button.arco-picker-btn-confirm').simulate('click');

    expect(onSelect.mock.calls.length).toBe(2);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(['2020-04-11 20:32:59', '2020-04-12 20:32:59']);
  });

  it('change mode', () => {
    const component = mount(<RangePicker popupVisible />);

    function getFirstPickerHeaderValue(component) {
      return component.find('.arco-picker-header-value').at(0).text();
    }

    expect(getFirstPickerHeaderValue(component)).toBe('2020-04');

    component.setProps({ mode: 'month' });
    component.update();
    expect(getFirstPickerHeaderValue(component)).toBe('2020');

    component.setProps({ mode: 'year' });
    component.update();
    expect(getFirstPickerHeaderValue(component)).toBe('2020 - 2030');

    component.setProps({ mode: 'quarter' });
    component.update();
    expect(getFirstPickerHeaderValue(component)).toBe('2020');

    component.setProps({ mode: 'week' });
    component.update();
    expect(getFirstPickerHeaderValue(component)).toBe('2020-04');
    expect(component.find('.arco-picker-cell-week')).toHaveLength(12);
  });

  it('separator', () => {
    const component = mount(<RangePicker separator="to" popupVisible />);

    expect(component.find('.arco-picker-separator').text()).toBe('to');
  });
});
