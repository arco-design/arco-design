import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Dropdown from '..';
import Button from '../../Button';
import Menu from '../../Menu';

mountTest(Dropdown);
componentConfigTest(Dropdown.Button, 'Dropdown.Button');

function mountDropdown(component: React.ReactElement) {
  return mount(component);
}

const mockFn = jest.fn();
const Droplist = (
  <Menu onClickMenuItem={mockFn}>
    <Menu.Item key="1">Menu Item 1</Menu.Item>
    <Menu.Item key="2">Menu Item 2</Menu.Item>
    <Menu.Item key="3">Menu Item 3</Menu.Item>
  </Menu>
);

describe('Dropdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("dropdown's children can be string", () => {
    const wrapper = mountDropdown(<Dropdown droplist={Droplist}>Hello</Dropdown>);
    expect(wrapper.find('span').text()).toBe('Hello');
  });

  it('dropdown open correctly', () => {
    const wrapper = mountDropdown(
      <Dropdown droplist={Droplist} trigger="click">
        <Button>Click Me</Button>
      </Dropdown>
    );
    wrapper.find(Button).simulate('click');
    jest.runAllTimers();
    const menu = wrapper.find('Menu');
    expect(menu.length).toBe(1);
    expect(menu.find('MenuItem').length).toBe(3);
  });

  it('click menu item', () => {
    const wrapper = mountDropdown(
      <Dropdown droplist={Droplist} trigger="click">
        <Button>Click Me</Button>
      </Dropdown>
    );
    expect(wrapper.find('Trigger').state().popupVisible).toBe(false);
    wrapper.find(Button).simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('Trigger').state().popupVisible).toBe(true);
    jest.useFakeTimers();
    wrapper
      .find('Menu')
      .find('MenuItem')
      .at(0)
      .simulate('click');
    jest.runAllTimers();
    expect(wrapper.find('Trigger').state().popupVisible).toBe(false);
    expect(mockFn.mock.calls.length).toBe(1);
  });

  it('Dropdown.Button mount correctly', () => {
    const dropList = (
      <Menu>
        <Menu.Item key="1">Save now</Menu.Item>
        <Menu.Item key="2">Save and Publish</Menu.Item>
      </Menu>
    );
    const wrapper = mountDropdown(
      <Dropdown.Button droplist={dropList}>
        <Button>Click Me</Button>
      </Dropdown.Button>
    );

    expect(wrapper.find('.arco-btn-group')).toHaveLength(1);
  });
});
