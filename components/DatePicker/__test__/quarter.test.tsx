import React from 'react';
import { render, fireEvent } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import '../../../tests/mockDate';

const QuarterPicker = DatePicker.QuarterPicker;

mountTest(QuarterPicker);

describe('QuarterPicker', () => {
  it('defaultValue & today', async () => {
    const component = render(<QuarterPicker />);

    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-picker-cell-today')[0].textContent).toBe('Q2');

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('');

    fireEvent.click(component.find('.arco-picker-date').item(0)); // Q1

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-Q1');
  });

  it('allowClear', () => {
    const onClear = jest.fn();
    const component = render(<QuarterPicker defaultValue="2020-Q1" allowClear onClear={onClear} />);

    fireEvent.click(component.container.firstChild!);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('2020-Q1');

    fireEvent.click(component.find('.arco-icon-close')[0]);

    expect(component.find('.arco-picker-input input')[0].getAttribute('value')).toBe('');
    expect(onClear.mock.calls.length).toBe(1);
  });
});
