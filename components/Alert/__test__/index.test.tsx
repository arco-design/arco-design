import React from 'react';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Alert from '..';
import { fireEvent, render } from '../../../tests/util';

mountTest(Alert);
componentConfigTest(Alert, 'Alert');

describe('Alert', () => {
  it('showIcon correctly', () => {
    const alert = render(<Alert type="error" title="Error" content="Content~" />);

    expect(alert.find('.arco-icon-close-circle-fill').length).toBe(1);
  });

  it('onClose and afterClose', () => {
    const closeFn = jest.fn();
    const afterCloseFn = jest.fn();
    const alert = render(
      <Alert
        closable
        onClose={closeFn}
        afterClose={afterCloseFn}
        type="info"
        title="Title"
        content="Content"
      />
    );

    jest.useFakeTimers();
    fireEvent.click(alert.find('.arco-alert-close-btn')[0]);

    expect(closeFn.mock.calls.length).toBe(1);
    jest.runAllTimers();
    expect(afterCloseFn.mock.calls.length).toBe(1);
  });
});
