import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Progress from '..';

mountTest(Progress);
componentConfigTest(Progress, 'Progress');

describe('Progress', () => {
  it('render correctly ', () => {
    const wrapper = mount(<Progress percent={10} />);
    expect(wrapper.props().percent).toBe(10);
    wrapper.setProps({ percent: 20 });
    expect(wrapper.props().percent).toBe(20);
    expect(
      wrapper
        .find('.arco-progress-line-inner')
        .at(0)
        .props().style.width
    ).toBe('20%');
  });

  it('render correctly when width props is string', () => {
    const wrapper = mount(<Progress percent={10} width="100%" />);
    expect(
      wrapper
        .find('.arco-progress')
        .at(0)
        .props().style.width
    ).toBe('100%');
  });

  it('render correctly when width props is number', () => {
    const wrapper = mount(<Progress percent={10} width={200} />);
    expect(
      wrapper
        .find('.arco-progress')
        .at(0)
        .props().style.width
    ).toBe(200);
  });
});
