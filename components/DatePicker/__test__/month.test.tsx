import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import '../../../tests/mockDate';

const MonthPicker = DatePicker.MonthPicker;

mountTest(MonthPicker);

describe('MonthPicker', () => {
  it('defaultValue & today', async () => {
    const component = render(<MonthPicker />);

    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-picker-cell-today')[0].textContent).toBe('四月');

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('');

    fireEvent.click(component.find('.arco-picker-date').item(5)); // 6月

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-06');
  });

  it('allowClear', () => {
    const onClear = jest.fn();
    const component = render(<MonthPicker defaultValue="2020-01" allowClear onClear={onClear} />);

    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-01');

    fireEvent.click(component.find('.arco-icon-close')[0]);
    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('');
    expect(onClear.mock.calls.length).toBe(1);
  });
});
