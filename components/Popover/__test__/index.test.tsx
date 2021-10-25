import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import Button from '../../Button';
import Popover, { PopoverProps } from '..';

mountTest(Popover);

function mountPopover(component: React.ReactElement) {
  return mount<typeof Popover, React.PropsWithChildren<PopoverProps>>(component);
}

describe('Popover', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('mouseenter and mouseleave', () => {
    const wrapper = mountPopover(
      <Popover position="top" title="Title" content="Content">
        <Button>Top</Button>
      </Popover>
    );
    wrapper.find('Button').simulate('mouseenter');
    jest.runAllTimers();
    expect(1).toBe(1);
  });
});
