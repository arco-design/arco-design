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
