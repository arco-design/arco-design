import React from 'react';
import dayjs from 'dayjs';
import { fireEvent, render } from '../../../tests/util';
import DatePicker from '..';
import '../../../tests/mockDate';

const { MonthPicker, YearPicker, QuarterPicker, WeekPicker, RangePicker } = DatePicker;

describe('Picker Format', () => {
  it('DatePicker', () => {
    const component = render(<DatePicker format="YYYY/MM/DD" defaultValue="2020/02/01" />);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/02/01');

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(component.find('.arco-picker-date').item(8)); // 2020-02-04
    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/02/04');
  });

  it('MonthPicker', () => {
    const component = render(<MonthPicker format="YYYY/MM" defaultValue="2020/02" />);
    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/02');

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(component.find('.arco-picker-date').item(0)); // 2020-01
    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/01');
  });

  it('YearPicker', () => {
    const component = render(<YearPicker format="YYYY [year]" defaultValue="2020" />);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020 year');

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(component.find('.arco-picker-date').item(3)); // 2022

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2022 year');
  });

  it('QuarterPicker', () => {
    const component = render(<QuarterPicker format="YYYY/[Q]Q" defaultValue="2020-01" />);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/Q1');

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(component.find('.arco-picker-date').item(1)); // Q2

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/Q2');
  });

  it('WeekPicker', () => {
    const component = render(<WeekPicker format="gggg/wo" defaultValue={dayjs('2020-01-01')} />);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/1周');

    fireEvent.click(component.container.firstChild!);

    fireEvent.click(component.find('.arco-picker-date').item(9)); // 2020-01-05 2周

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/2周');
  });

  it('RangePicker (date)', () => {
    const component = render(
      <RangePicker format="YYYY/MM/DD" defaultValue={['2020/02/01', '2020/03/01']} />
    );

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/02/01');
    expect(component.find('.arco-picker-input input')[1].getAttribute('value')).toBe('2020/03/01');
  });

  it('RangePicker (month)', () => {
    const component = render(
      <RangePicker mode="month" format="YYYY/MM" defaultValue={['2020/02', '2020/03']} />
    );

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/02');
    expect(component.find('.arco-picker-input input')[1].getAttribute('value')).toBe('2020/03');
  });

  it('RangePicker (year)', () => {
    const component = render(
      <RangePicker mode="year" format="YYYY [year]" defaultValue={['2020', '2031']} />
    );

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020 year');
    expect(component.find('.arco-picker-input input')[1].getAttribute('value')).toBe('2031 year');
  });

  it('RangePicker (week)', () => {
    const component = render(
      <RangePicker
        mode="week"
        format="gggg/wo"
        defaultValue={[dayjs('2020-02-01'), dayjs('2020-03-01')]}
      />
    );

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020/5周');
    expect(component.find('.arco-picker-input input')[1].getAttribute('value')).toBe('2020/9周');
  });

  it('fallback format', () => {
    const component = render(<DatePicker format="YYYY-MM-DD HH:mm:ss" defaultValue="2020-02-01" />);
    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe(
      '2020-02-01 00:00:00'
    );
  });

  it('RangePicker format array', () => {
    const component = render(
      <RangePicker
        mode="date"
        format={['[White Friday] MM-DD', '[Black Friday] MM-DD']}
        defaultValue={['2020-02-01', '2020-03-01']}
      />
    );

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe(
      'White Friday 02-01'
    );
    expect(component.find('.arco-picker-input input')[1].getAttribute('value')).toBe(
      'Black Friday 03-01'
    );
  });
});
