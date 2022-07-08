import React from 'react';
import { cleanup, fireEvent, render, screen } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import Button from '../../Button';
import Tooltip from '..';
// import { TriggerState } from '../../Trigger';

mountTest(Tooltip);

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runAllTimers();
  });
  it('mouseenter and mouseleave', () => {
    jest.useFakeTimers();
    const wrapper = render(
      <Tooltip position="top" trigger="hover" content="Content">
        <Button>Top</Button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    jest.runAllTimers();
    expect(wrapper.find('.arco-trigger').length).toBe(1);
    fireEvent.mouseLeave(screen.getByRole('button'));
    jest.runAllTimers();
    expect(wrapper.find('.arco-trigger').length).toBe(0);
  });

  it('does not show tooltip when content is null or undefined or false or "  "', () => {
    [false, undefined, null, '  '].forEach((item) => {
      const wrapper = render(
        <Tooltip position="top" color="#333333" trigger="hover" content={item}>
          <Button>Top</Button>
        </Tooltip>
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      jest.runAllTimers();
      expect(wrapper.find('.arco-tooltip-content-inner').length).toBe(0);
      cleanup();
    });
  });
  it('should show tooltip when content is 0', () => {
    const wrapper = render(
      <Tooltip position="top" color="#333333" trigger="hover" content={0}>
        <Button>Top</Button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    jest.runAllTimers();
    expect(wrapper.find('.arco-tooltip-content-inner').length).not.toBe(0);
  });

  it('showArrow property', () => {
    const wrapper = render(
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
  it('arrowProps property', async () => {
    jest.useFakeTimers();
    const container = render(
      <Tooltip
        position="top"
        trigger="hover"
        content="Content"
        triggerProps={{
          arrowProps: {
            style: {
              backgroundColor: '#fff',
            },
          },
        }}
      >
        <Button>Top</Button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    jest.runAllTimers();
    expect(container.querySelector('.arco-trigger-arrow')?.style.backgroundColor).toBe(
      'rgb(255, 255, 255)'
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
      const wrapper = render(
        <Tooltip position={position} trigger="hover" content="Content">
          <Button>Position</Button>
        </Tooltip>
      );
      fireEvent.mouseEnter(screen.getByRole('button'));
      jest.runAllTimers();
      expect(wrapper.find('.arco-trigger')[0].className).toContain(
        `arco-trigger-position-${position}`
      );
      cleanup();
    });
  });

  it('should onchange be called', () => {
    const visibleChangeHandler = jest.fn();
    render(
      <Tooltip
        position="top"
        trigger="hover"
        content="Content"
        onVisibleChange={visibleChangeHandler}
      >
        <Button>Top</Button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    jest.runAllTimers();
    expect(visibleChangeHandler).toHaveBeenCalledTimes(1);
  });
});
