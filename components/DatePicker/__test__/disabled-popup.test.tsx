import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DatePicker from '..';

const cases: Array<[string, (disabled: boolean, onChange: jest.Mock) => React.ReactElement]> = [
  [
    'DatePicker',
    (disabled, onChange) => (
      <DatePicker disabled={disabled} defaultPickerValue="2026-11-12" onChange={onChange} />
    ),
  ],
  [
    'RangePicker',
    (disabled, onChange) => (
      <DatePicker.RangePicker
        disabled={disabled}
        defaultPickerValue={['2026-11-12', '2026-12-01']}
        onChange={onChange}
      />
    ),
  ],
];

describe('DatePicker disabled while open', () => {
  it.each(cases)('closes the %s panel when disabled', async (_name, picker) => {
    const onChange = jest.fn();
    const { container, rerender } = render(picker(false, onChange));
    const trigger = () => container.querySelector('input')!;

    fireEvent.click(trigger());
    expect(screen.getAllByText('16').length).toBeGreaterThan(0);

    rerender(picker(true, onChange));
    expect(screen.queryAllByText('16')).toHaveLength(0);
    expect(onChange).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(document.querySelector('[class*=arco-trigger-position-]')).toBeNull()
    );
    rerender(picker(false, onChange));
    expect(screen.queryAllByText('16')).toHaveLength(0);

    fireEvent.click(trigger());
    expect(screen.getAllByText('16').length).toBeGreaterThan(0);
  });
});
