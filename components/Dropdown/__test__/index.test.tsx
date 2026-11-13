import React from 'react';
import mountTest from '../../../tests/mountTest';
import { render, fireEvent } from '../../../tests/util';
import componentConfigTest from '../../../tests/componentConfigTest';
import Dropdown from '..';
import Button from '../../Button';
import Menu from '../../Menu';
import Popconfirm from '../../Popconfirm';

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

  it.each(['click', 'hover'] as const)(
    'allows a stopped item click to open Popconfirm in a %s dropdown',
    (trigger) => {
      const onOk = jest.fn();
      const onCancel = jest.fn();
      const onClickMenuItem = jest.fn();
      const wrapper = render(
        <Dropdown
          trigger={trigger}
          droplist={
            <Menu onClickMenuItem={onClickMenuItem}>
              <Menu.Item key="normal">Normal action</Menu.Item>
              <>
                <Popconfirm title="Delete this item?" onOk={onOk} onCancel={onCancel}>
                  <Menu.Item key="remove" onClick={(event) => event.stopPropagation()}>
                    Delete
                  </Menu.Item>
                </Popconfirm>
              </>
            </Menu>
          }
        >
          <Button>Open</Button>
        </Dropdown>
      );
      fireEvent[trigger === 'hover' ? 'mouseEnter' : 'click'](
        wrapper.querySelector('.arco-btn') as HTMLElement
      );
      jest.runAllTimers();
      let confirmationClicks = 0;
      const openConfirmation = () => {
        fireEvent.click(document.querySelectorAll('.arco-dropdown-menu-item')[1]);
        jest.runAllTimers();
        expect(document.querySelectorAll('.arco-popconfirm')).toHaveLength(1);
        expect(document.querySelectorAll('.arco-dropdown-menu')).toHaveLength(1);
        confirmationClicks++;
        expect(onClickMenuItem).toHaveBeenCalledTimes(confirmationClicks);
      };

      // The original issue stops propagation on the Menu.Item inside a fragment.
      openConfirmation();
      fireEvent.mouseDown(document.querySelectorAll('.arco-popconfirm .arco-btn')[0]);
      fireEvent.click(document.querySelectorAll('.arco-popconfirm .arco-btn')[0]);
      jest.runAllTimers();
      expect(onCancel).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll('.arco-popconfirm')).toHaveLength(0);
      expect(document.querySelectorAll('.arco-dropdown-menu')).toHaveLength(1);

      openConfirmation();
      fireEvent.mouseDown(document.querySelectorAll('.arco-popconfirm .arco-btn')[1]);
      fireEvent.click(document.querySelectorAll('.arco-popconfirm .arco-btn')[1]);
      jest.runAllTimers();
      expect(onOk).toHaveBeenCalledTimes(1);
      expect(document.querySelectorAll('.arco-popconfirm')).toHaveLength(0);
      expect(document.querySelectorAll('.arco-dropdown-menu')).toHaveLength(1);

      // Other menu items retain the usual callback and close behavior.
      fireEvent.click(document.querySelectorAll('.arco-dropdown-menu-item')[0]);
      jest.runAllTimers();
      expect(onClickMenuItem).toHaveBeenCalledTimes(3);
      expect(onClickMenuItem.mock.calls[2][0]).toBe('normal');
      expect(document.querySelectorAll('.arco-dropdown-menu')).toHaveLength(0);
    }
  );

  it('still closes the dropdown and nested confirmation on an outside click', () => {
    const wrapper = render(
      <Dropdown
        trigger="click"
        droplist={
          <Menu>
            <Popconfirm title="Delete this item?">
              <Menu.Item key="remove" onClick={(event) => event.stopPropagation()}>
                Delete
              </Menu.Item>
            </Popconfirm>
          </Menu>
        }
      >
        <Button>Open</Button>
      </Dropdown>
    );
    fireEvent.click(wrapper.querySelector('.arco-btn') as HTMLElement);
    jest.runAllTimers();
    fireEvent.click(document.querySelector('.arco-dropdown-menu-item') as HTMLElement);
    jest.runAllTimers();
    expect(document.querySelectorAll('.arco-popconfirm')).toHaveLength(1);
    fireEvent.mouseDown(document.body);
    jest.runAllTimers();
    expect(document.querySelectorAll('.arco-popconfirm')).toHaveLength(0);
    expect(document.querySelectorAll('.arco-dropdown-menu')).toHaveLength(0);
  });

  it.each([false, true])('supports custom menus with a native event: %s', (withNativeEvent) => {
    const CustomMenu = ({
      isMenu,
      onClickMenuItem,
    }: {
      isMenu?: boolean;
      onClickMenuItem?: (key: string, event?: Event) => void;
    }) => (
      <button
        data-testid="custom-menu-item"
        role={isMenu ? 'menuitem' : undefined}
        onClick={(event) => {
          onClickMenuItem('custom', withNativeEvent ? event.nativeEvent : undefined);
        }}
      >
        Custom action
      </button>
    );
    const wrapper = render(
      <Dropdown trigger="click" droplist={<CustomMenu isMenu />}>
        <Button>Open</Button>
      </Dropdown>
    );
    fireEvent.click(wrapper.querySelector('.arco-btn') as HTMLElement);
    jest.runAllTimers();
    fireEvent.click(wrapper.getByTestId('custom-menu-item'));
    jest.runAllTimers();
    expect(wrapper.queryByTestId('custom-menu-item')).toBeNull();
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
