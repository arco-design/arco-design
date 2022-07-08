import React from 'react';
import { fireEvent, render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Steps from '..';

const Step = Steps.Step;

mountTest(Steps);
componentConfigTest(Steps, 'Steps');

describe('Steps', () => {
  it('Steps onChange', () => {
    const onChange = jest.fn();

    const component = render(
      <Steps current={1} onChange={onChange}>
        <Step title="Step1" />
        <Step title="Step2" disabled />
        <Step title="Step3" />
      </Steps>
    );

    const step2 = component.find('.arco-steps-item').item(1);

    expect(step2.className).toContain('arco-steps-item-disabled');
    fireEvent.click(step2);

    expect(onChange.mock.calls.length).toBe(0);

    const step3 = component.find('.arco-steps-item').item(2);
    fireEvent.click(step3);

    expect(onChange.mock.calls[0][0]).toBe(3);

    component.rerender(
      <Steps current={3} onChange={onChange}>
        <Step title="Step1" />
        <Step title="Step2" disabled />
        <Step title="Step3" />
      </Steps>
    );

    expect(component.find('.arco-steps-item').item(2).className).toContain(
      'arco-steps-item-process'
    );
  });
});
