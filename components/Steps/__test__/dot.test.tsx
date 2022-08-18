import React from 'react';
import { render } from '../../../tests/util';
import Steps from '..';

const Step = Steps.Step;

describe('Steps type dot test', () => {
  it('direction horizontal', () => {
    const component = render(
      <Steps type="dot" current={1}>
        <Step title="Step1" description="Description1" />
        <Step title="Step2" description="Description2" />
        <Step title="Step3" description="Description3" />
      </Steps>
    );

    expect(component.find('.arco-steps-horizontal')).toHaveLength(1);
    expect(component.find('.arco-steps-label-vertical')).toHaveLength(1);

    expect(component.find('.arco-steps-item-tail')).toHaveLength(3);

    for (let i = 0; i < 3; i++) {
      const item = component.find('.arco-steps-item').item(i);

      if (i === 0) {
        expect(item.className).toContain('arco-steps-item-active');
      }

      expect(item.querySelectorAll('.arco-steps-item-icon .arco-steps-icon')).toHaveLength(0);
      expect(item.querySelector('.arco-steps-item-title')?.innerHTML).toBe(`Step${i + 1}`);
      expect(item.querySelector('.arco-steps-item-description')?.innerHTML).toBe(
        `Description${i + 1}`
      );
    }
  });

  it('direction vertical', () => {
    const component = render(
      <Steps type="dot" direction="vertical" current={1}>
        <Step title="Step1" description="Description1" />
        <Step title="Step2" description="Description2" />
        <Step title="Step3" description="Description3" />
      </Steps>
    );

    expect(component.find('.arco-steps-vertical')).toHaveLength(1);
    expect(component.find('.arco-steps-label-horizontal')).toHaveLength(1);

    expect(component.find('.arco-steps-item-tail')).toHaveLength(3);

    for (let i = 0; i < 3; i++) {
      const item = component.find('.arco-steps-item').item(i);
      expect(item.querySelectorAll('.arco-steps-item-icon .arco-steps-icon')).toHaveLength(0);
      expect(item.querySelector('.arco-steps-item-title')?.innerHTML).toBe(`Step${i + 1}`);
      expect(item.querySelector('.arco-steps-item-description')?.innerHTML).toBe(
        `Description${i + 1}`
      );
    }
  });

  it('lineless', () => {
    const component = render(
      <Steps lineless labelPlacement="vertical" current={1}>
        <Step title="Step1" description="Description1" />
        <Step title="Step2" description="Description2" />
        <Step title="Step3" description="Description3" />
      </Steps>
    );

    expect(component.find('.arco-steps-item-tail')).toHaveLength(0);
  });
});
