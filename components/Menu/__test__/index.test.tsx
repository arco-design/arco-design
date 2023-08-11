import React, { useRef, useState } from 'react';
import { fireEvent } from '@testing-library/dom';
import Menu from '..';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import { MenuProps } from '../interface';
import { render, sleep } from '../../../tests/util';
import Popover from '../../Popover';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuItemGroup = Menu.ItemGroup;

mountTest(Menu);
componentConfigTest(Menu, 'Menu');

const generateMenu = (props?: MenuProps) => {
  return (
    <Menu {...props}>
      {null}
      {1}
      <div>This is a Div</div>
      <MenuItem key="1">设计指南</MenuItem>
      <MenuItem disabled key="2">
        区块
      </MenuItem>
      <MenuItem key="3">模块</MenuItem>
      <SubMenu key="layout" title={<span>布局组件</span>}>
        <MenuItem key="4">栅格</MenuItem>
        <MenuItem key="5">分隔符</MenuItem>
        <MenuItem key="6">布局</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const testProps: MenuProps = {
  defaultSelectedKeys: ['1'],
  defaultOpenKeys: ['layout'],
  className: 'arco-menu-test',
  onClickMenuItem: jest.fn(),
  onClickSubMenu: jest.fn(),
  style: { border: '1px solid #e6e8eb' },
};

describe('Menu', () => {
  it('should render correct Menu and children based on vertical props', () => {
    const wrapper = render(generateMenu(testProps));
    expect(wrapper.querySelectorAll('.arco-menu-inner > *').length).toBe(5);
    expect(wrapper.querySelector('.arco-menu')).toHaveClass('arco-menu-test');
  });

  it('should render correct theme', () => {
    const wrapper = render(generateMenu({ theme: 'dark' }));
    expect(wrapper.querySelector('.arco-menu')).toHaveClass('arco-menu-dark');
  });

  it('should render menuItem disabled', () => {
    const wrapper = render(generateMenu());
    expect(wrapper.querySelectorAll('.arco-menu-disabled').length).toBe(1);
  });

  it('click items should change active and call the right callback', () => {
    const wrapper = render(generateMenu(testProps));
    expect(wrapper.querySelector('.arco-menu-selected')).toHaveTextContent('设计指南');
    fireEvent.click(wrapper.querySelectorAll('.arco-menu-item')[2]);
    expect(testProps.onClickMenuItem).toBeCalled();
    expect(wrapper.querySelector('.arco-menu-selected')).toHaveTextContent('模块');
  });

  it('vertical openKeys', () => {
    const wrapper = render(generateMenu(testProps));
    expect(getComputedStyle(wrapper.querySelector('.arco-menu-inline-content')).height).toBe(
      'auto'
    );
    fireEvent.click(wrapper.querySelector('.arco-menu-inline-header'));
    expect(testProps.onClickSubMenu).toBeCalled();
    expect(getComputedStyle(wrapper.querySelector('.arco-menu-inline-content')).height).toBe('0px');
  });

  it('triggerProps works', async () => {
    const Demo = () => {
      const refDiv = useRef(null);
      return (
        <div ref={refDiv}>
          <Menu
            style={{ width: 200 }}
            mode="pop"
            triggerProps={{ popupVisible: true, getPopupContainer: () => refDiv.current }}
          >
            <SubMenu title="Sub one" key="sub_1">
              <MenuItem key="1">Item 1</MenuItem>
              <MenuItem key="2">Item 2</MenuItem>
            </SubMenu>
            <SubMenu title="Sub two" key="sub_2" triggerProps={{ popupVisible: false }}>
              <MenuItem key="1">Item 3</MenuItem>
              <MenuItem key="2">Item 4</MenuItem>
            </SubMenu>
          </Menu>
        </div>
      );
    };
    const wrapper = render(<Demo />);
    await sleep(100);

    const popupMenuItems = wrapper.querySelectorAll('.arco-dropdown-menu-item');
    expect(popupMenuItems).toHaveLength(2);
    expect(popupMenuItems[0]).toHaveTextContent('Item 1');
    expect(popupMenuItems[1]).toHaveTextContent('Item 2');
  });

  it('accordion', () => {
    const wrapper = render(
      <Menu
        accordion
        onClickSubMenu={testProps.onClickSubMenu}
        defaultOpenKeys={['wrapper']}
        defaultSelectedKeys={['3']}
      >
        <MenuItem key="1">设计指南</MenuItem>
        <SubMenu key="wrapper" title={<span>组件</span>}>
          <MenuItem key="4">通用组件</MenuItem>
        </SubMenu>
        <SubMenu key="layout" title={<span>布局组件</span>}>
          <MenuItem key="11">栅格</MenuItem>
        </SubMenu>
      </Menu>
    );

    const eleInlineContents = wrapper.querySelectorAll('.arco-menu-inline-content');
    expect(getComputedStyle(eleInlineContents[0]).height).toBe('auto');

    fireEvent.click(wrapper.querySelectorAll('.arco-menu-inline-header')[1]);
    expect(testProps.onClickSubMenu).toBeCalled();
    expect(getComputedStyle(eleInlineContents[0]).height).toBe('0px');
  });

  it('ItemGroup', () => {
    const wrapper = render(
      <Menu defaultSelectedKeys={['3']} theme="dark">
        <MenuItemGroup key="help" title="开发指南">
          <MenuItem key="1">安装</MenuItem>
          <MenuItem key="2">快速上手</MenuItem>
        </MenuItemGroup>
      </Menu>
    );
    expect(wrapper.querySelectorAll('.arco-menu-group').length).toBe(1);
  });

  it('horizontal', async () => {
    const wrapper = render(
      <Menu
        triggerProps={{ trigger: 'click' }}
        defaultSelectedKeys={['4']}
        onClickSubMenu={testProps.onClickSubMenu}
        mode="horizontal"
      >
        <SubMenu key="wrapper" title={<span>组件</span>}>
          <MenuItem key="4">通用组件</MenuItem>
          <MenuItem key="5">布局组件</MenuItem>
        </SubMenu>
      </Menu>
    );

    fireEvent.click(wrapper.querySelector('.arco-menu-pop-header'));
    await sleep(0);
    expect(wrapper.querySelectorAll('.arco-menu-pop-trigger').length).toBe(1);

    expect(testProps.onClickSubMenu).toBeCalled();

    fireEvent.click(wrapper.querySelector('.arco-menu-pop-header'));
    await sleep(100);
    expect(wrapper.querySelectorAll('.arco-menu-pop-trigger').length).toBe(0);
  });

  it('pop', async () => {
    const wrapper = render(
      <Menu
        triggerProps={{ trigger: 'click' }}
        defaultSelectedKeys={['4']}
        onClickSubMenu={testProps.onClickSubMenu}
        mode="pop"
      >
        <SubMenu key="wrapper" title={<span>组件</span>}>
          <MenuItem key="4">通用组件</MenuItem>
          <MenuItem key="5">布局组件</MenuItem>
        </SubMenu>
      </Menu>
    );

    fireEvent.click(wrapper.querySelector('.arco-menu-pop-header'));
    await sleep(0);
    expect(wrapper.querySelectorAll('.arco-menu-pop-trigger').length).toBe(1);

    expect(testProps.onClickSubMenu).toBeCalled();

    fireEvent.click(wrapper.querySelector('.arco-menu-pop-header'));
    await sleep(100);
    expect(wrapper.querySelectorAll('.arco-menu-pop-trigger').length).toBe(0);
  });

  it('collapse', async () => {
    const Demo = () => {
      const [collapse, setCollapse] = useState(true);
      return (
        <div>
          <button id="collapse" onClick={() => setCollapse(!collapse)}>
            Collapse
          </button>
          <Menu
            triggerProps={{ popupVisible: true }}
            mode="vertical"
            collapse={collapse}
            defaultOpenKeys={['layout']}
          >
            <MenuItem key="1">设计指南</MenuItem>
            <SubMenu key="layout" title={<span>布局组件</span>}>
              <MenuItem key="11">栅格</MenuItem>
              <MenuItem key="12">分隔符</MenuItem>
              <MenuItem key="13">布局</MenuItem>
            </SubMenu>
          </Menu>
        </div>
      );
    };

    const wrapper = render(<Demo />);
    await sleep(100);

    expect(wrapper.querySelectorAll('.arco-dropdown-menu').length).toBe(1);
    fireEvent.click(wrapper.querySelector('#collapse'));
    expect(getComputedStyle(wrapper.querySelector('.arco-menu-inline-content')).height).toBe(
      'auto'
    );
  });

  it('SubMenu properties are passed in correctly', () => {
    const wrapper = render(
      <Menu
        mode="vertical"
        theme="dark"
        style={{ width: 200 }}
        defaultOpenKeys={['submenu', 'sub_submenu_1', 'sub_submenu_2']}
      >
        <SubMenu title="submenu" key="submenu" popup={false}>
          <Menu.Item key="1">1</Menu.Item>
          <SubMenu title="sub_submenu_1" key="sub_submenu_1">
            <Menu.Item key="2">2</Menu.Item>
          </SubMenu>
          <SubMenu title="sub_submenu_2" key="sub_submenu_2" popup>
            <Menu.Item key="3">3</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    );

    expect(wrapper.querySelectorAll('.arco-menu-item-inner')).toHaveLength(2);
    expect(wrapper.querySelector('.arco-menu-pop-header')).toHaveTextContent('sub_submenu_2');
  });

  it('SubMenu selectable', () => {
    const wrapper = render(
      <Menu mode="vertical" defaultSelectedKeys={['submenu']}>
        <Popover content="test">
          <span>test</span>
        </Popover>
        <SubMenu selectable title="submenu" key="submenu">
          <Menu.Item key="1">1</Menu.Item>
        </SubMenu>
      </Menu>
    );

    expect(wrapper.querySelectorAll('.arco-menu-selected')).toHaveLength(1);
  });
});
