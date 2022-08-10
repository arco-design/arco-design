import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import DatePicker from '..';
import '../../../tests/mockDate';

const YearPicker = DatePicker.YearPicker;

mountTest(YearPicker);

describe('YearPicker', () => {
  it('defaultValue & today', async () => {
    const component = render(<YearPicker />);

    fireEvent.click(component.container.firstElementChild!);

    expect(component.find('.arco-picker-cell-today')[0].textContent).toBe('2020');

    expect(component.find('.arco-picker-start-time')[0].getAttribute('value')).toBe('');

    fireEvent.click(component.find('.arco-picker-date').item(6));

    expect(component.find('.arco-picker-start-time')[0].getAttribute('value')).toBe('2025');
  });

  it('allowClear', () => {
    const onClear = jest.fn();
    const component = render(<YearPicker defaultValue="2020" allowClear onClear={onClear} />);

    fireEvent.click(component.container.firstElementChild!);

    expect(component.find('.arco-picker-start-time')[0].getAttribute('value')).toBe('2020');

    fireEvent.click(component.find('.arco-icon-close')[0]);

    expect(component.find('input')[0].getAttribute('value')).toBe('');
    expect(onClear.mock.calls.length).toBe(1);
  });
});
