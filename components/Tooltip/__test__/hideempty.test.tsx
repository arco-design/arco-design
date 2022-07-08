import React from 'react';
import { render, fireEvent, screen } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import Tooltip from '..';
import { Button } from '../..';

mountTest(Tooltip);

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
    const wrapper = render(<Demo initialMsg="message" />);
    fireEvent.mouseEnter(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    jest.runAllTimers();
    expect(wrapper.find('.arco-tooltip-content-inner').length).toBe(0);
  });
  it('does not show up if content is already empty', () => {
    const wrapper = render(<Demo initialMsg="" />);

    fireEvent.mouseEnter(screen.getByRole('button'));

    jest.runAllTimers();
    expect(wrapper.find('.arco-tooltip-content-inner').length).toBe(0);
  });
});
