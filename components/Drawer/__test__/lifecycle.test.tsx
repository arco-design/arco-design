import React from 'react';
import Drawer from '..';
import { act, cleanup, fireEvent, render } from '../../../tests/util';

// Complete the component's real transition timers and flush its state updates.
function advanceTransition(milliseconds = 350) {
  act(() => {
    jest.advanceTimersByTime(milliseconds);
  });
}

describe('Drawer repeated visibility transitions', () => {
  let style: HTMLStyleElement;

  beforeEach(() => {
    jest.useFakeTimers();
    style = document.createElement('style');
    style.textContent = '.arco-drawer-wrapper-hide { display: none; }';
    document.head.appendChild(style);
  });

  afterEach(() => {
    cleanup();
    style.remove();
    jest.useRealTimers();
  });

  it.each([false, true])(
    'completes every exit with unmountOnExit and initial visible=%s',
    (initiallyVisible) => {
      const afterOpen = jest.fn();
      const afterClose = jest.fn();
      const drawer = (visible: boolean) => (
        <Drawer
          visible={visible}
          unmountOnExit
          focusLock
          autoFocus
          afterOpen={afterOpen}
          afterClose={afterClose}
        >
          <input aria-label="Draft" defaultValue="" />
        </Drawer>
      );
      const wrapper = render(drawer(initiallyVisible));

      for (let cycle = 1; cycle <= 10; cycle++) {
        if (cycle > 1 || !initiallyVisible) wrapper.rerender(drawer(true));
        const input = wrapper.getByLabelText('Draft');
        const focusLock = input.closest('[data-focus-lock-disabled]');
        expect(input).toHaveValue('');
        expect(focusLock).toHaveAttribute('data-focus-lock-disabled', 'disabled');
        advanceTransition(250);
        expect(focusLock).toHaveAttribute('data-focus-lock-disabled', 'disabled');
        advanceTransition(100);
        expect(focusLock).toHaveAttribute('data-focus-lock-disabled', 'false');
        expect(afterOpen).toHaveBeenCalledTimes(cycle);
        fireEvent.change(input, { target: { value: 'Unsaved draft' } });

        wrapper.rerender(drawer(false));
        // Keep the DOM until the exit finishes, including the second and later closes.
        expect(input).toBeInTheDocument();
        expect(focusLock).toHaveAttribute('data-focus-lock-disabled', 'disabled');
        advanceTransition(100);
        expect(input).toBeInTheDocument();
        expect(afterClose).toHaveBeenCalledTimes(cycle - 1);
        advanceTransition(250);
        expect(input).not.toBeInTheDocument();
        expect(afterClose).toHaveBeenCalledTimes(cycle);
      }
    }
  );

  it('preserves draft content when unmountOnExit is false', () => {
    const drawer = (visible: boolean) => (
      <Drawer visible={visible} unmountOnExit={false} focusLock autoFocus>
        <input aria-label="Retained draft" defaultValue="" />
      </Drawer>
    );
    const wrapper = render(drawer(true));
    advanceTransition();
    const input = wrapper.getByLabelText('Retained draft');
    fireEvent.change(input, { target: { value: 'Keep this draft' } });

    for (let cycle = 0; cycle < 3; cycle++) {
      wrapper.rerender(drawer(false));
      advanceTransition();
      expect(input).toBeInTheDocument();
      expect(input).not.toBeVisible();
      wrapper.rerender(drawer(true));
      expect(input.closest('[data-focus-lock-disabled]')).toHaveAttribute(
        'data-focus-lock-disabled',
        'disabled'
      );
      advanceTransition();
      expect(wrapper.getByLabelText('Retained draft')).toBe(input);
      expect(input).toHaveValue('Keep this draft');
    }
  });

  it('can reopen during a later exit without running the interrupted afterClose', () => {
    const afterClose = jest.fn();
    const drawer = (visible: boolean) => (
      <Drawer visible={visible} unmountOnExit focusLock autoFocus afterClose={afterClose}>
        <input aria-label="Reopened draft" />
      </Drawer>
    );
    const wrapper = render(drawer(true));
    advanceTransition();
    wrapper.rerender(drawer(false));
    advanceTransition();
    expect(afterClose).toHaveBeenCalledTimes(1);

    for (let cycle = 0; cycle < 3; cycle++) {
      wrapper.rerender(drawer(true));
      advanceTransition();
      wrapper.rerender(drawer(false));
      advanceTransition(100);
      wrapper.rerender(drawer(true));
      const input = wrapper.getByLabelText('Reopened draft');
      advanceTransition(250);
      expect(afterClose).toHaveBeenCalledTimes(1);
      expect(input.closest('[data-focus-lock-disabled]')).toHaveAttribute(
        'data-focus-lock-disabled',
        'disabled'
      );
      advanceTransition(100);
      expect(input).toBeVisible();
      expect(input.closest('[data-focus-lock-disabled]')).toHaveAttribute(
        'data-focus-lock-disabled',
        'false'
      );
      expect(wrapper.find('.arco-drawer-wrapper')).toHaveLength(1);
    }
    wrapper.rerender(drawer(false));
    advanceTransition();
    expect(afterClose).toHaveBeenCalledTimes(2);
  });
});
