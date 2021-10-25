import React from 'react';
import { mount } from 'enzyme';
import { act } from '@testing-library/react-hooks';
import mountTest from '../../../tests/mountTest';
import Tooltip, { TooltipProps } from '..';
import { Button } from '../..';

mountTest(Tooltip);

function mountTooltip(component: React.ReactElement) {
  return mount<typeof Tooltip, React.PropsWithChildren<TooltipProps>>(component);
}

const Demo: React.FC<{ initialMsg: string }> = ({ initialMsg }) => {
  const [msg, setMsg] = React.useState(initialMsg);

  return (
    <Tooltip className="test-tooltip-container" position="bottom" content={msg}>
      <Button onClick={() => setMsg('')}>Be Controlled</Button>
    </Tooltip>
  );
};

describe('hide tooltip if empty content', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it('hides when content becomes empty', () => {
    const wrapper = mountTooltip(<Demo initialMsg="message" />);

    act(() => {
      wrapper.find('Button').simulate('mouseenter');
      wrapper.find('Button').simulate('click');
    });
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.arco-tooltip-content-inner').exists()).toBeFalsy();
  });
  it('does not show up if content is already empty', () => {
    const wrapper = mountTooltip(<Demo initialMsg="" />);

    act(() => {
      wrapper.find('Button').simulate('mouseenter');
    });
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.arco-tooltip-content-inner').exists()).toBeFalsy();
  });
});
