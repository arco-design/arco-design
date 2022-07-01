import React from 'react';
import { render } from '../../../tests/util';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Progress from '..';

mountTest(Progress);
componentConfigTest(Progress, 'Progress');

describe('Progress', () => {
  it('render correctly ', () => {
    const wrapper = render(<Progress percent={10} />);
    expect(wrapper.querySelector('.arco-progress-line-text')!.innerHTML).toBe('10%');
    wrapper.rerender(<Progress percent={20} />);
    expect(wrapper.querySelector('.arco-progress-line-text')!.innerHTML).toBe('20%');

    expect(wrapper.querySelector('.arco-progress-line-inner')!.style.width).toBe('20%');
  });

  it('render correctly when width props is string', () => {
    const wrapper = render(<Progress percent={10} width="100%" />);
    expect(wrapper.find('.arco-progress').item(0).style.width).toBe('100%');
  });

  it('render correctly when width props is number', () => {
    const wrapper = render(<Progress percent={10} width={200} />);
    expect(wrapper.find('.arco-progress').item(0).style.width).toBe('200px');
  });

  it('render correctly when trailColor props is exist', () => {
    const wrapper = render(<Progress trailColor="rgb(0,0,0)" percent={10} width={200} />);
    expect(wrapper.getByRole('progressbar').style.backgroundColor).toBe('rgb(0, 0, 0)');
  });

  it('render correctly when trailColor props is exist & type is circle', () => {
    const wrapper = render(
      <Progress trailColor="rgb(0,0,0)" type="circle" percent={10} width={200} />
    );
    expect(wrapper.find('.arco-progress-circle-mask')[0].style.stroke).toBe('rgb(0,0,0)');
  });
});
