import React from 'react';
import mountTest from '../../../tests/mountTest';
import { render, fireEvent } from '../../../tests/util';
import componentConfigTest from '../../../tests/componentConfigTest';
import Dropdown from '..';
import Button from '../../Button';
import Menu from '../../Menu';

mountTest(Dropdown);
componentConfigTest(Dropdown.Button, 'Dropdown.Button');

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
    const wrapper = render(<Dropdown droplist={Droplist}>Hello</Dropdown>);
    expect(wrapper.querySelector('span')?.innerHTML).toBe('Hello');
  });

  it('dropdown open correctly', () => {
    const wrapper = render(
      <Dropdown droplist={Droplist} trigger="click">
        <Button>Click Me</Button>
      </Dropdown>
    );

    fireEvent.click(wrapper.querySelector('.arco-btn') as any);
    jest.runAllTimers();
    expect(document.querySelectorAll('.arco-dropdown-menu')).toHaveLength(1);
    expect(document.querySelectorAll('.arco-dropdown-menu-item')).toHaveLength(3);
  });

  it('click menu item', () => {
    const onClickMenuItem = jest.fn();
    const wrapper = render(
      <Dropdown
        trigger="click"
        droplist={
          <Menu
            onClickMenuItem={(key, _, keyPath) => {
              onClickMenuItem(keyPath);

              if (key === '2') {
                return false;
              }

              if (key === '3') {
                return new Promise((resolve) => {
                  setTimeout(() => resolve(null), 100);
                });
              }
            }}
          >
            <Menu.Item key="1">Menu Item 1</Menu.Item>
            <Menu.Item key="2">Menu Item 2</Menu.Item>
            <Menu.Item key="3">Menu Item 3</Menu.Item>
          </Menu>
        }
      >
        <Button>Click Me</Button>
      </Dropdown>
    );

    const simulateMenuItemClick = (index: number) => {
      fireEvent.click(document.querySelectorAll('.arco-dropdown-menu-item')[index]);
    };

    const judgeTriggerVisible = (visible) => {
      const trigger = wrapper.querySelector('.arco-trigger');
      const classNameOfExit = 'slideDynamicOrigin-exit';
      if (visible) {
        expect(trigger?.className.indexOf(classNameOfExit) > -1).toBe(false);
      } else if (trigger) {
        expect(trigger.className.indexOf(classNameOfExit) > -1).toBe(true);
      }
    };

    judgeTriggerVisible(false);
    fireEvent.click(wrapper.querySelector('.arco-btn') as HTMLElement);
    judgeTriggerVisible(true);

    simulateMenuItemClick(0);
    judgeTriggerVisible(false);
    expect(onClickMenuItem).toBeCalledWith(['1']);

    fireEvent.click(wrapper.querySelector('.arco-btn') as HTMLElement);
    simulateMenuItemClick(1);
    judgeTriggerVisible(true);

    simulateMenuItemClick(2);
    judgeTriggerVisible(true);
  });

  it('Dropdown.Button mount correctly', () => {
    const dropList = (
      <Menu>
        <Menu.Item key="1">Save now</Menu.Item>
        <Menu.Item key="2">Save and Publish</Menu.Item>
      </Menu>
    );

    const wrapper = render(
      <Dropdown.Button disabled droplist={dropList}>
        <Button>Click Me</Button>
      </Dropdown.Button>
    );
    expect(wrapper.querySelector('.arco-btn-group')).toBeTruthy();
    expect(document.querySelectorAll('.arco-btn-disabled')).toHaveLength(2);
  });
});
