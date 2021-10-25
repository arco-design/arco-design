import React from 'react';
import { mount } from 'enzyme';
import Steps from '..';

const Step = Steps.Step;

describe('Steps type arrow test', () => {
  it('direction horizontal', () => {
    const component = mount(
      <Steps type="arrow" current={2}>
        <Step title="Step1" description="Description1" />
        <Step title="Step2" description="Description2" />
        <Step title="Step3" description="Description3" />
      </Steps>
    );

    expect(component.find('.arco-steps-horizontal')).toHaveLength(1);
    expect(component.find('.arco-steps-label-horizontal')).toHaveLength(1);

    expect(component.find('.arco-steps-item-tail')).toHaveLength(0);

    for (let i = 0; i < 3; i++) {
      const item = component.find('.arco-steps-item').at(i);

      if (i === 1) {
        expect(item.hasClass('arco-steps-item-active')).toBe(true);
      }

      expect(item.find('.arco-steps-item-icon .arco-steps-icon')).toHaveLength(0);
      expect(item.find('.arco-steps-item-title').text()).toBe(`Step${i + 1}`);
      expect(item.find('.arco-steps-item-description').text()).toBe(`Description${i + 1}`);
    }
  });

  it('no vertical', () => {
    const component = mount(
      <Steps type="arrow" direction="vertical" current={1}>
        <Step title="Step1" description="Description1" />
        <Step title="Step2" description="Description2" />
        <Step title="Step3" description="Description3" />
      </Steps>
    );

    expect(component.find('.arco-steps-vertical')).toHaveLength(0);
    expect(component.find('.arco-steps-horizontal')).toHaveLength(1);
  });
});
