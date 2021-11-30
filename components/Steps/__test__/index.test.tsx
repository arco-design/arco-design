import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Steps from '..';

const Step = Steps.Step;

mountTest(Steps);
componentConfigTest(Steps, 'Steps');

describe('Steps', () => {
  it('Steps onChange', () => {
    const onChange = jest.fn();

    const component = mount(
      <Steps current={1} onChange={onChange}>
        <Step title="Step1" />
        <Step title="Step2" disabled />
        <Step title="Step3" />
      </Steps>
    );

    const step2 = component.find('.arco-steps-item').at(1);

    expect(step2.hasClass('arco-steps-item-disabled')).toBe(true);

    step2.simulate('click');

    expect(onChange.mock.calls.length).toBe(0);

    const step3 = component.find('.arco-steps-item').at(2);

    step3.simulate('click');

    expect(onChange.mock.calls[0][0]).toBe(3);

    component.setProps({ current: 3 });

    expect(component.find('.arco-steps-item').at(2).hasClass('arco-steps-item-process')).toBe(true);
  });
});
