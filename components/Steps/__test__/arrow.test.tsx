import React from 'react';
import { render } from '../../../tests/util';
import Steps from '..';

const Step = Steps.Step;

describe('Steps type arrow test', () => {
  it('direction horizontal', () => {
    const component = render(
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
      const item = component.find('.arco-steps-item').item(i);

      if (i === 1) {
        expect(item.className).toContain('arco-steps-item-active');
      }

      expect(item.querySelectorAll('.arco-steps-item-icon .arco-steps-icon')).toHaveLength(0);
      expect(item.querySelector('.arco-steps-item-title')?.innerHTML).toBe(`Step${i + 1}`);
      expect(item.querySelector('.arco-steps-item-description')?.innerHTML).toBe(
        `Description${i + 1}`
      );
    }
  });

  it('no vertical', () => {
    const component = render(
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
