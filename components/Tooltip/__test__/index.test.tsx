import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Button from '../../Button';
import Tooltip, { TooltipProps } from '..';
import { TriggerState } from '../../Trigger';

mountTest(Tooltip);

function mountTooltip(component: React.ReactElement) {
  return mount<typeof Tooltip, React.PropsWithChildren<TooltipProps>>(component);
}

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('mouseenter and mouseleave', () => {
    const wrapper = mountTooltip(
      <Tooltip position="top" trigger="hover" content="Content">
        <Button>Top</Button>
      </Tooltip>
    );
    expect((wrapper.find('Trigger').state() as TriggerState).popupVisible).toBe(false);
    wrapper.find('Button').simulate('mouseenter');
    jest.runAllTimers();
    expect((wrapper.find('Trigger').state() as TriggerState).popupVisible).toBe(true);
    wrapper.find('Button').simulate('mouseleave');
    jest.runAllTimers();
    expect((wrapper.find('Trigger').state() as TriggerState).popupVisible).toBe(false);
  });
  it('color property', () => {
    const wrapper = mountTooltip(
      <Tooltip position="top" color="#333333" popupVisible trigger="hover" content="Content">
        <Button>Top</Button>
      </Tooltip>
    );
    expect(wrapper.find('.arco-tooltip-content').getDOMNode().getAttribute('style')).toBe(
      'background-color: rgb(51, 51, 51);'
    );
    expect(wrapper.find('.arco-trigger-arrow').getDOMNode().getAttribute('style')).toBe(
      'background-color: rgb(51, 51, 51);'
    );
  });
  it('does not show tooltip when content is null or undefined or false or "  "', () => {
    [false, undefined, null, '  '].forEach((item) => {
      const wrapper = mount(
        <Tooltip position="top" color="#333333" trigger="hover" content={item}>
          <Button>Top</Button>
        </Tooltip>
      );
      wrapper.find(Button).simulate('mouseenter');
      wrapper.update();
      jest.runAllTimers();
      expect(wrapper.find('.arco-tooltip-content-inner').exists()).toBeFalsy();
    });
  });
  it('should show tooltip when content is 0', () => {
    const wrapper = mount(
      <Tooltip position="top" color="#333333" trigger="hover" content={0}>
        <Button>Top</Button>
      </Tooltip>
    );
    wrapper.find('Button').simulate('mouseenter');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.arco-tooltip-content-inner').exists()).toBeTruthy();
  });

  it('showArrow property', () => {
    const wrapper = mountTooltip(
      <Tooltip
        position="top"
        color="#333333"
        triggerProps={{
          showArrow: false,
        }}
        popupVisible
        trigger="hover"
        content="Content"
      >
        <Button>Top</Button>
      </Tooltip>
    );
    expect(wrapper.find('.arco-trigger-arrow')).toHaveLength(0);
  });
  it('arrowProps property', () => {
    const wrapper = mountTooltip(
      <Tooltip
        position="top"
        color="#333333"
        triggerProps={{
          arrowProps: {
            style: {
              backgroundColor: '#fff',
            },
          },
        }}
        popupVisible
        trigger="hover"
        content="Content"
      >
        <Button>Top</Button>
      </Tooltip>
    );
    expect(wrapper.find('.arco-trigger-arrow').getDOMNode().getAttribute('style')).toBe(
      'background-color: rgb(255, 255, 255);'
    );
  });

  it('position', () => {
    const positions = [
      'top',
      'tl',
      'tr',
      'bottom',
      'bl',
      'br',
      'left',
      'lt',
      'lb',
      'right',
      'rt',
      'rb',
    ] as const;
    positions.forEach((position) => {
      const wrapper = mountTooltip(
        <Tooltip position={position} trigger="hover" content="Content">
          <Button>Position</Button>
        </Tooltip>
      );
      wrapper.find('Button').simulate('mouseenter');
      jest.runAllTimers();
      expect((wrapper.find('Trigger').state() as TriggerState).popupVisible).toBe(true);
    });
  });
});
