import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Alert from '..';

mountTest(Alert);
componentConfigTest(Alert, 'Alert');

describe('Alert', () => {
  it('showIcon correctly', () => {
    const alert = mount(<Alert type="error" title="Error" content="Content~" />);

    expect(alert.find('.arco-icon-close-circle-fill').length).toBe(1);
  });

  it('onClose and afterClose', () => {
    const closeFn = jest.fn();
    const afterCloseFn = jest.fn();
    const alert = mount(
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
    alert
      .find('.arco-alert-close-btn')
      .at(0)
      .simulate('click');

    expect(closeFn.mock.calls.length).toBe(1);
    jest.runAllTimers();
    expect(afterCloseFn.mock.calls.length).toBe(1);
  });
});
