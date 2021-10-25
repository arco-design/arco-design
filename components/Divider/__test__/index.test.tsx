import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Divider from '..';

mountTest(Divider);
componentConfigTest(Divider, 'Divider');

describe('Divider', () => {
  it('render correctly', () => {
    const divider = mount(<Divider />);

    expect(divider.find('.arco-divider').length).toBe(1);
  });

  it('with text', () => {
    const divider = mount(<Divider>Hello</Divider>);

    expect(divider.find('.arco-divider-text').length).toBe(1);
    expect(divider.find('.arco-divider-text').text()).toBe('Hello');
  });

  it('vertical', () => {
    const divider = mount(<Divider type="vertical">Hello</Divider>);

    expect(divider.find('.arco-divider-vertical').length).toBe(1);
    expect(divider.find('.arco-divider-text').length).toBe(0);
  });
});
