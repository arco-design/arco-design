import React from 'react';
import { mount } from 'enzyme';
import DatePicker from '..';
import { getInput, getDateCell, checkTime } from './utils';
import '../../../tests/mockDate';

describe('utcOffset', () => {
  it('defaultValue & now & onSelect & onChange for DatePicker', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const component = mount(
      <DatePicker
        showTime
        defaultValue={new Date('2020-02-22')}
        utcOffset={0}
        timezone="Asia/Shanghai" // if utcOffset exist, timezone not work
        onSelect={onSelect}
        onChange={onChange}
      />
    );

    // default value displayed in input
    expect(component.find('input').prop('value')).toBe('2020-02-22 00:00:00');

    component.simulate('click');

    // switch to time select panel
    component.find('button.arco-picker-btn-select-time').simulate('click');

    checkTime(component, '00', '00', '00');

    function getInputValue() {
      return component.find('.arco-picker-input input').prop('value');
    }

    // click now btn
    component.find('.arco-picker-footer-btn-wrapper .arco-btn-secondary').simulate('click');

    expect(getInputValue()).toBe('2020-04-10 12:32:59');

    checkTime(component, '12', '32', '59');

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe('2020-04-10 20:32:59');
    expect(onSelect.mock.calls[0][1].toISOString()).toBe('2020-04-10T12:32:59.000Z');

    // confirm
    component.find('.arco-picker-footer-btn-wrapper .arco-btn-primary').simulate('click');

    expect(getInputValue()).toBe('2020-04-10 12:32:59');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('2020-04-10 20:32:59');
    expect(onChange.mock.calls[0][1].toISOString()).toBe('2020-04-10T12:32:59.000Z');
  });

  it('defaultValue & now & onSelect & onChange for RangePicker', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();

    const component = mount(
      <DatePicker.RangePicker
        utcOffset={0}
        timezone="Asia/Shanghai" // if utcOffset exist, timezone not work
        onSelect={onSelect}
        onChange={onChange}
        showTime
        defaultValue={[new Date('2020-04-20 00:00:00'), new Date('2020-04-22 08:00:00')]}
      />
    );

    expect(getInput(component, 0).prop('value')).toBe('2020-04-19 16:00:00');
    expect(getInput(component, 1).prop('value')).toBe('2020-04-22 00:00:00');

    // open, start
    getInput(component, 0).simulate('click');

    // 2020-04-08
    getDateCell(component, 0, 10).find('.arco-picker-date').simulate('click');

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toEqual(['2020-04-09 00:00:00', '2020-04-22 08:00:00']);
    expect(onSelect.mock.calls[0][1].map((a) => a.toISOString())).toEqual([
      '2020-04-08T16:00:00.000Z',
      '2020-04-22T00:00:00.000Z',
    ]);

    expect(onChange.mock.calls.length).toBe(0);

    // 2020-04-13
    getDateCell(component, 0, 15).find('.arco-picker-date').simulate('click');

    expect(onSelect.mock.calls.length).toBe(2);
    expect(onSelect.mock.calls[1][0]).toEqual(['2020-04-09 00:00:00', '2020-04-13 08:00:00']);
    expect(onSelect.mock.calls[1][1].map((a) => a.toISOString())).toEqual([
      '2020-04-08T16:00:00.000Z',
      '2020-04-13T00:00:00.000Z',
    ]);

    expect(onChange.mock.calls.length).toBe(0);

    component.find('button.arco-picker-btn-confirm').simulate('click');

    expect(onSelect.mock.calls.length).toBe(2);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(['2020-04-09 00:00:00', '2020-04-13 08:00:00']);
    expect(onSelect.mock.calls[1][1].map((a) => a.toISOString())).toEqual([
      '2020-04-08T16:00:00.000Z',
      '2020-04-13T00:00:00.000Z',
    ]);
  });
});

describe('timezone & DST', () => {
  it('defaultValue & now & onSelect & onChange for DatePicker', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const component = mount(
      <DatePicker
        showTime
        defaultValue={new Date('2020-02-22')}
        timezone="America/Los_Angeles"
        onSelect={onSelect}
        onChange={onChange}
      />
    );

    // default value displayed in input
    expect(component.find('input').prop('value')).toBe('2020-02-21 16:00:00');

    component.simulate('click');

    // switch to time select panel
    component.find('button.arco-picker-btn-select-time').simulate('click');

    checkTime(component, '16', '00', '00');

    function getInputValue() {
      return component.find('.arco-picker-input input').prop('value');
    }

    // click now btn
    component.find('.arco-picker-footer-btn-wrapper .arco-btn-secondary').simulate('click');

    // DST work
    expect(getInputValue()).toBe('2020-04-10 05:32:59');

    checkTime(component, '05', '32', '59');

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toBe('2020-04-10 20:32:59');
    expect(onSelect.mock.calls[0][1].toISOString()).toBe('2020-04-10T12:32:59.000Z');

    // confirm
    component.find('.arco-picker-footer-btn-wrapper .arco-btn-primary').simulate('click');

    expect(getInputValue()).toBe('2020-04-10 05:32:59');
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toBe('2020-04-10 20:32:59');
    expect(onChange.mock.calls[0][1].toISOString()).toBe('2020-04-10T12:32:59.000Z');
  });

  it('defaultValue & now & onSelect & onChange for RangePicker', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();

    const component = mount(
      <DatePicker.RangePicker
        timezone="America/Los_Angeles"
        onSelect={onSelect}
        onChange={onChange}
        showTime
        defaultValue={[new Date('2020-04-20 00:00:00'), new Date('2020-04-22 08:00:00')]}
      />
    );

    // DST work
    expect(getInput(component, 0).prop('value')).toBe('2020-04-19 09:00:00');
    expect(getInput(component, 1).prop('value')).toBe('2020-04-21 17:00:00');

    // open, start
    getInput(component, 0).simulate('click');

    // 2020-04-08
    getDateCell(component, 0, 10).find('.arco-picker-date').simulate('click');

    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0]).toEqual(['2020-04-09 00:00:00', '2020-04-22 08:00:00']);
    expect(onSelect.mock.calls[0][1].map((a) => a.toISOString())).toEqual([
      '2020-04-08T16:00:00.000Z',
      '2020-04-22T00:00:00.000Z',
    ]);

    expect(onChange.mock.calls.length).toBe(0);

    // 2020-04-13
    getDateCell(component, 0, 15).find('.arco-picker-date').simulate('click');

    expect(onSelect.mock.calls.length).toBe(2);
    expect(onSelect.mock.calls[1][0]).toEqual(['2020-04-09 00:00:00', '2020-04-14 08:00:00']);
    expect(onSelect.mock.calls[1][1].map((a) => a.toISOString())).toEqual([
      '2020-04-08T16:00:00.000Z',
      '2020-04-14T00:00:00.000Z',
    ]);

    expect(onChange.mock.calls.length).toBe(0);

    component.find('button.arco-picker-btn-confirm').simulate('click');

    expect(onSelect.mock.calls.length).toBe(2);

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toEqual(['2020-04-09 00:00:00', '2020-04-14 08:00:00']);
    expect(onSelect.mock.calls[1][1].map((a) => a.toISOString())).toEqual([
      '2020-04-08T16:00:00.000Z',
      '2020-04-14T00:00:00.000Z',
    ]);
  });
});
