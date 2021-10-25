import React from 'react';
import { mount } from 'enzyme';
import dayjs from 'dayjs';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import DatePicker from '..';
import { getDateCell, getInput } from './utils';
import '../../../tests/mockDate';

mountTest(DatePicker);
componentConfigTest(DatePicker, 'DatePicker');

function getSelectedTime(component, index) {
  return component
    .find('.arco-timepicker-list')
    .at(index)
    .find('.arco-timepicker-cell-selected')
    .text();
}

function checkTime(component, hour, minute, second) {
  expect(getSelectedTime(component, 0)).toBe(hour);
  expect(getSelectedTime(component, 1)).toBe(minute);
  expect(getSelectedTime(component, 2)).toBe(second);
}

describe('DatePicker', () => {
  it('dayStartOfWeek', () => {
    const component = mount(<DatePicker />);
    component.simulate('click');

    expect(
      component
        .find('.arco-picker-week-list-item')
        .at(0)
        .text()
    ).toBe('日');

    component.setProps({
      dayStartOfWeek: 1,
    });

    expect(
      component
        .find('.arco-picker-week-list-item')
        .at(0)
        .text()
    ).toBe('一');

    component.setProps({
      dayStartOfWeek: 6,
    });

    expect(
      component
        .find('.arco-picker-week-list-item')
        .at(0)
        .text()
    ).toBe('六');
  });

  it('defaultValue', () => {
    const component = mount(<DatePicker defaultValue="2020-02-02" />);

    expect(component.find('input').prop('value')).toBe('2020-02-02');

    component.simulate('click');

    component
      .find('.arco-picker-date')
      .at(8) // 2020-02-03
      .simulate('click');

    expect(component.find('input').prop('value')).toBe('2020-02-03');
  });

  it('today', () => {
    const component = mount(<DatePicker />);

    component.simulate('click');

    expect(component.find('.arco-picker-cell-today').text()).toBe('10');

    expect(component.find('input').prop('value')).toBe('');

    component.find('.arco-picker-footer .arco-link').simulate('click');

    expect(component.find('input').prop('value')).toBe('2020-04-10');
  });

  it('allowClear', () => {
    const onClear = jest.fn();
    const component = mount(<DatePicker allowClear onClear={onClear} />);

    component.simulate('click');

    component.find('.arco-picker-footer .arco-link').simulate('click');

    expect(component.find('input').prop('value')).toBe('2020-04-10');

    component.find('IconClose').simulate('click');

    expect(component.find('input').prop('value')).toBe('');
    expect(onClear.mock.calls.length).toBe(1);
  });

  it('control mode (showTime)', async () => {
    const component = mount(<DatePicker showTime={{ defaultValue: '00:00:00' }} />);

    component.simulate('click');

    component.find('button.arco-picker-btn-select-time').simulate('click');

    checkTime(component, '00', '00', '00');

    component.setProps({ value: '2021-06-10 01:02:03' });

    expect(component.find('input').prop('value')).toBe('2021-06-10 01:02:03');

    checkTime(component, '01', '02', '03');

    component.setProps({ value: undefined });

    checkTime(component, '00', '00', '00');
  });

  it('showTime', () => {
    jest.useFakeTimers();

    const component = mount(<DatePicker showTime />);

    component.simulate('click');

    function getTimePickerCell(index, cellIndex) {
      return component
        .find('.arco-timepicker-list')
        .at(index)
        .find('.arco-timepicker-cell')
        .at(cellIndex);
    }

    function getInputValue() {
      return component.find('.arco-picker-input input').prop('value');
    }

    component.find('button.arco-picker-btn-select-time').simulate('click');

    checkTime(component, '20', '32', '59');

    getTimePickerCell(0, 10).simulate('click');
    getTimePickerCell(1, 11).simulate('click');
    getTimePickerCell(2, 12).simulate('click');

    checkTime(component, '10', '11', '12');

    expect(getInputValue()).toBe('2020-04-10 10:11:12');

    component.find('.arco-picker-footer-btn-wrapper .arco-btn-primary').simulate('click');

    expect(getInputValue()).toBe('2020-04-10 10:11:12');

    jest.runAllTimers();

    // click now btn
    component.simulate('click');

    component.find('button.arco-picker-btn-select-time').simulate('click');

    component.find('.arco-picker-footer-btn-wrapper .arco-btn-secondary').simulate('click');

    expect(getInputValue()).toBe('2020-04-10 20:32:59');

    checkTime(component, '20', '32', '59');

    // confirm
    component.find('.arco-picker-footer-btn-wrapper .arco-btn-primary').simulate('click');

    expect(getInputValue()).toBe('2020-04-10 20:32:59');
  });

  it('hideNotInViewDates', () => {
    const component = mount(<DatePicker hideNotInViewDates triggerElement={null} />);

    expect(component.find('.arco-picker-cell-hidden')).toHaveLength(12);
  });

  it('update value', () => {
    const component = mount(<DatePicker value="2020-04-01" />);

    expect(component.find('input').prop('value')).toBe('2020-04-01');

    component.setProps({ value: '2020-05-06' });

    expect(component.find('input').prop('value')).toBe('2020-05-06');
  });

  it('hover placeholder', () => {
    const component = mount(<DatePicker popupVisible />);

    function checkPlaceholder(isPlaceholder: boolean) {
      expect(
        getInput(component, 0)
          .parent()
          .hasClass('arco-picker-input-placeholder')
      ).toBe(isPlaceholder);
    }

    expect(component.find('input').prop('value')).toBe('');

    // 2020-04-05: mouseenter
    getDateCell(component, 0, 7).simulate('mouseenter');

    expect(getInput(component, 0).prop('value')).toBe('2020-04-05');
    checkPlaceholder(true);

    // 2020-04-05: mouseleave
    getDateCell(component, 0, 7).simulate('mouseleave');

    expect(getInput(component, 0).prop('value')).toBe('');
    checkPlaceholder(false);

    // 2020-04-05: re mouseenter and click
    getDateCell(component, 0, 7).simulate('mouseenter');
    getDateCell(component, 0, 7)
      .find('.arco-picker-date')
      .simulate('click');

    expect(getInput(component, 0).prop('value')).toBe('2020-04-05');
    checkPlaceholder(false);

    // 2020-04-06: has value and mouseenter
    getDateCell(component, 0, 8).simulate('mouseenter');

    expect(getInput(component, 0).prop('value')).toBe('2020-04-06');
    checkPlaceholder(true);

    // 2020-04-06: has value and mouseleave
    getDateCell(component, 0, 8).simulate('mouseleave');

    expect(getInput(component, 0).prop('value')).toBe('2020-04-05');
    checkPlaceholder(false);
  });

  it('shortcuts', () => {
    const component = mount(
      <DatePicker
        shortcuts={[
          {
            text: 'tomorrow',
            value: () => dayjs().add(1, 'day'),
          },
        ]}
        popupVisible
      />
    );

    expect(getInput(component, 0).prop('value')).toBe('');
    expect(component.find('.arco-picker-cell-selected')).toHaveLength(0);

    // 2020-04-11: shortcuts mouseenter
    component
      .find('.arco-picker-shortcuts')
      .childAt(0)
      .simulate('mouseenter');

    expect(getInput(component, 0).prop('value')).toBe('');

    // 2020-04-11
    expect(getDateCell(component, 0, 13).hasClass('arco-picker-cell-selected')).toBeTruthy();
    expect(component.find('.arco-picker-cell-selected')).toHaveLength(1);

    // 2020-04-11: shortcuts mouseleave
    component
      .find('.arco-picker-shortcuts')
      .childAt(0)
      .simulate('mouseleave');

    expect(getDateCell(component, 0, 13).hasClass('arco-picker-cell-selected')).toBeFalsy();
    expect(component.find('.arco-picker-cell-selected')).toHaveLength(0);

    // 2020-04-11: shortcuts click
    component
      .find('.arco-picker-shortcuts')
      .childAt(0)
      .simulate('click');

    expect(getInput(component, 0).prop('value')).toBe('2020-04-11');
    expect(getDateCell(component, 0, 13).hasClass('arco-picker-cell-selected')).toBeTruthy();
    expect(component.find('.arco-picker-cell-selected')).toHaveLength(1);
  });

  it('onSelect & onChange', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const component = mount(<DatePicker onSelect={onSelect} onChange={onChange} popupVisible />);

    // 2020-04-05
    getDateCell(component, 0, 7)
      .find('.arco-picker-date')
      .simulate('click');

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe('2020-04-05');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('2020-04-05');
  });

  it('onSelect & onChange (showTime)', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const component = mount(
      <DatePicker
        onSelect={onSelect}
        onChange={onChange}
        defaultValue={Date.now()}
        showTime
        popupVisible
      />
    );

    // 2020-04-05
    getDateCell(component, 0, 7)
      .find('.arco-picker-date')
      .simulate('click');

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe('2020-04-05 20:32:59');
    expect(onChange.mock.calls.length).toBe(0);

    // confirm
    component.find('button.arco-picker-btn-confirm').simulate('click');

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('2020-04-05 20:32:59');
  });
});
