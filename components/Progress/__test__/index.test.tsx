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

  it('render correctly when trailColor props is exist', () => {
    const wrapper = mount(<Progress trailColor="rgb(0,0,0)" percent={10} width={200} />);
    expect(
      wrapper
        .find('.arco-progress-line-outer')
        .getDOMNode()
        .getAttribute('style')
        .indexOf('background-color: rgb(0, 0, 0);') > -1
    ).toBe(true);
  });

  it('render correctly when trailColor props is exist & type is circle', () => {
    const wrapper = mount(
      <Progress trailColor="rgb(0,0,0)" type="circle" percent={10} width={200} />
    );
    expect(
      wrapper
        .find('.arco-progress-circle-mask')
        .getDOMNode()
        .getAttribute('style')
    ).toBe('stroke: rgb(0,0,0);');
  });
});
