import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Cascader from '..';

it('closes the Cascader popup when disabled while open', async () => {
  const onChange = jest.fn();
  const props = { options: [{ label: 'Bravo', value: 'bravo' }], onChange };
  const { container, rerender } = render(<Cascader {...props} />);
  const trigger = () => container.querySelector('.arco-cascader-view-selector')!;

  fireEvent.click(trigger());
  expect(screen.getByText('Bravo')).toBeTruthy();

  rerender(<Cascader {...props} disabled />);
  expect(screen.queryByText('Bravo')).toBeNull();
  expect(onChange).not.toHaveBeenCalled();

  await waitFor(() => expect(document.querySelector('[class*=arco-trigger-position-]')).toBeNull());
  rerender(<Cascader {...props} />);
  expect(screen.queryByText('Bravo')).toBeNull();
  fireEvent.click(trigger());
  fireEvent.click(screen.getByText('Bravo'));
  expect(onChange).toHaveBeenCalledTimes(1);
});
