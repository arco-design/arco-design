import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TimePicker from '..';

it('closes the TimePicker panel when disabled while open', async () => {
  const onChange = jest.fn();
  const props = { defaultValue: '14:15:00', onChange, unmountOnExit: true };
  const { container, rerender } = render(<TimePicker {...props} />);

  fireEvent.click(container.querySelector('input')!);
  expect(screen.getAllByText('16').length).toBeGreaterThan(0);

  rerender(<TimePicker {...props} disabled />);
  expect(screen.queryAllByText('16')).toHaveLength(0);
  expect(onChange).not.toHaveBeenCalled();

  await waitFor(() => expect(document.querySelector('[class*=arco-trigger-position-]')).toBeNull());
  rerender(<TimePicker {...props} />);
  expect(screen.queryAllByText('16')).toHaveLength(0);
  fireEvent.click(container.querySelector('input')!);
  expect(screen.getAllByText('16').length).toBeGreaterThan(0);
});
