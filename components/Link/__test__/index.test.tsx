import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Link from '..';

mountTest(Link);
componentConfigTest(Link, 'Link');

describe('Link', () => {
  it('render item correctly', () => {
    const wrapper = mount(<Link href="#" />);
    expect(wrapper.find('.arco-link')).toHaveLength(1);
  });

  it('render span  tag correctly', () => {
    const wrapper = mount(<Link />);
    expect(wrapper.find('.arco-link')).toHaveLength(1);
    expect(wrapper.find('span').at(0).hasClass('arco-link')).toBe(true);
  });

  it('render icon correctly', () => {
    const wrapper = mount(<Link icon />);
    expect(wrapper.find('.arco-icon-link')).toHaveLength(1);
  });

  it('render icon correctly', () => {
    const wrapper = mount(<Link icon={<span>hahaha</span>} />);
    expect(wrapper.find('.arco-link-icon').children().html()).toEqual('<span>hahaha</span>');
  });

  it('render hoverable correctly', () => {
    const wrapper = mount(<Link hoverable={false} />);
    expect(wrapper.find('.arco-link').hasClass('arco-link-hoverless')).toBe(true);
  });

  it('link should not trigger onClick', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Link onClick={onClick}>Link</Link>);
    wrapper.simulate('click');
    expect(onClick).toBeCalled();
  });

  it('link disabled should not trigger onClick', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Link disabled onClick={onClick}>
        Link
      </Link>
    );
    wrapper.simulate('click');
    expect(onClick).toBeCalledTimes(0);
  });
});
