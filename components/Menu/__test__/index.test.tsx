import React, { useRef } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import mountTest from '../../../tests/mountTest';
import componentConfigTest from '../../../tests/componentConfigTest';
import Menu from '..';
import Tooltip from '../../Tooltip';
import { MenuProps } from '../interface';
import { $ } from '../../../tests/util';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Enter, Esc } from '../../_util/keycode';

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
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render correct Menu and children based on vertical props', () => {
    const component = mount(generateMenu(testProps));
    expect(component.find('.arco-menu').exists()).toBe(true);
    expect(component.find('.arco-menu-inner').children().length).toBe(6);
    // className
    expect(component.find('.arco-menu').hasClass('arco-menu-test')).toBe(true);
  });

  it('should render correct theme', () => {
    const component = mount(generateMenu());
    expect(component.find('.arco-menu').hasClass('arco-menu-dark')).toBe(false);
    component.setProps({ theme: 'dark' });
    expect(component.find('.arco-menu').hasClass('arco-menu-dark')).toBe(true);
  });

  it('should render menuItem disabled', () => {
    const component = mount(generateMenu());
    expect(component.find('.arco-menu-disabled').length).toBe(1);
  });

  it('click items should change active and call the right callback', () => {
    const component = mount(generateMenu(testProps));
    expect(component.find('.arco-menu-selected').text()).toBe('设计指南');
    component.find('.arco-menu-item').at(2).simulate('click');
    expect(testProps.onClickMenuItem).toBeCalled();
    expect(component.find('.arco-menu-selected').text()).toBe('模块');
  });

  it('vertical openKeys', () => {
    const component = mount(generateMenu(testProps));
    expect(component.find('.arco-menu-inline-content').props().style.height).toBe('auto');
    component.find('.arco-menu-inline-header').simulate('click');
    expect(testProps.onClickSubMenu).toBeCalled();
    expect(component.find('.arco-menu-inline-content').props().style.height).toBe(0);
  });

  it('triggerProps works', () => {
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
    const wrapper = mount(<Demo />);
    const popupMenuItems = wrapper.find('.arco-dropdown-menu-item');
    expect(popupMenuItems).toHaveLength(2);
    expect(popupMenuItems.at(0).text()).toBe('Item 1');
    expect(popupMenuItems.at(1).text()).toBe('Item 2');
  });

  it('accordion', () => {
    const component = mount(
      <Menu
        accordion
        onClickSubMenu={testProps.onClickSubMenu}
        defaultOpenKeys={['component']}
        defaultSelectedKeys={['3']}
      >
        <MenuItem key="1">设计指南</MenuItem>
        <SubMenu key="component" title={<span>组件</span>}>
          <MenuItem key="4">通用组件</MenuItem>
        </SubMenu>
        <SubMenu key="layout" title={<span>布局组件</span>}>
          <MenuItem key="11">栅格</MenuItem>
        </SubMenu>
      </Menu>
    );
    expect(component.find('.arco-menu-inline-content').at(0).props().style.height).toBe('auto');
    expect(component.find('.arco-menu-inline-content').at(1).props().style.height).toBe(0);

    component.find('.arco-menu-inline-header').at(1).simulate('click');
    jest.runAllTimers();

    expect(testProps.onClickSubMenu).toBeCalled();
    expect(component.find('.arco-menu-inline-content').at(0).props().style.height).toBe(0);
  });

  it('ItemGroup', () => {
    const component = mount(
      <Menu defaultSelectedKeys={['3']} theme="dark">
        <MenuItemGroup key="help" title="开发指南">
          <MenuItem key="1">安装</MenuItem>
          <MenuItem key="2">快速上手</MenuItem>
        </MenuItemGroup>
      </Menu>
    );
    expect(component.find('.arco-menu-group').exists()).toBe(true);
  });

  it('horizontal', () => {
    const component = mount(
      <Menu defaultSelectedKeys={['4']} onClickSubMenu={testProps.onClickSubMenu} mode="horizontal">
        <SubMenu key="component" title={<span>组件</span>}>
          <MenuItem key="4">通用组件</MenuItem>
          <MenuItem key="5">布局组件</MenuItem>
        </SubMenu>
      </Menu>
    );
    expect($('.arco-menu-pop-trigger').length).toBe(0);
    component.find('.arco-menu-pop').at(0).simulate('mouseenter');
    jest.runAllTimers();
    component.find('.arco-menu-pop-header').at(0).simulate('click');
    expect(testProps.onClickSubMenu).toBeCalled();
    expect($('.arco-menu-pop-trigger').length).toBe(1);
    component.find('.arco-menu-pop').at(0).simulate('mouseleave');
    jest.runAllTimers();
    expect($('.arco-menu-pop-trigger').length).toBe(0);
  });

  it('pop', () => {
    const component = mount(
      <Menu defaultSelectedKeys={['4']} onClickSubMenu={testProps.onClickSubMenu} mode="pop">
        <SubMenu key="component" title={<span>组件</span>}>
          <MenuItem key="4">通用组件</MenuItem>
          <MenuItem key="5">布局组件</MenuItem>
        </SubMenu>
      </Menu>
    );
    expect($('.arco-menu-pop-trigger').length).toBe(0);
    component.find('.arco-menu-pop').at(1).simulate('mouseenter');
    jest.runAllTimers();
    expect($('.arco-menu-pop-trigger').length).toBe(1);
    component.find('.arco-menu-pop-header').simulate('click');
    expect(testProps.onClickSubMenu).toBeCalled();
    component.find('.arco-menu-pop').at(1).simulate('mouseleave');
    jest.runAllTimers();
    expect($('.arco-menu-pop-trigger').length).toBe(0);
  });

  it('collapse', () => {
    const component = mount(
      <Menu mode="vertical" collapse defaultSelectedKeys={['3']}>
        <MenuItem key="1">设计指南</MenuItem>
        <SubMenu key="layout" title={<span>布局组件</span>}>
          <MenuItem key="11">栅格</MenuItem>
          <MenuItem key="12">分隔符</MenuItem>
          <MenuItem key="13">布局</MenuItem>
        </SubMenu>
      </Menu>
    );
    expect(component.find(Menu.Item).at(0).find(Tooltip).exists()).toBe(true);
  });

  it('overflowItems should be pack up', () => {
    const props: MenuProps = {
      defaultSelectedKeys: ['7'],
      mode: 'horizontal',
      style: { width: '600px' },
    };
    const component = mount(
      <Menu {...props}>
        <MenuItem key="1">设计指南</MenuItem>
        <MenuItem key="2">区块</MenuItem>
        <MenuItem key="3">模块</MenuItem>
        <SubMenu key="component" title={<span>组件</span>}>
          <MenuItem key="4">通用组件</MenuItem>
          <MenuItem key="5">布局组件</MenuItem>
          <SubMenu key="nav" title={<span>导航组件</span>}>
            <MenuItem key="6" disabled>
              面包屑
            </MenuItem>
            <MenuItem key="7">垂直菜单</MenuItem>
          </SubMenu>
          <SubMenu key="dataInput" title={<span>数据输入</span>}>
            <MenuItem key="8">单选框</MenuItem>
            <MenuItem key="9">复选框</MenuItem>
            <MenuItem key="10">输入框</MenuItem>
          </SubMenu>
        </SubMenu>
        <SubMenu key="layout" title={<span>布局组件</span>}>
          <MenuItem key="11">栅格</MenuItem>
          <MenuItem key="12">分隔符</MenuItem>
          <MenuItem key="13">布局</MenuItem>
        </SubMenu>
        <MenuItem key="15">工具</MenuItem>
        <MenuItem key="14">主题实验室</MenuItem>
      </Menu>
    );
    expect(component.render()).toMatchSnapshot();
  });

  it('hotkey operation with default selected key', () => {
    const component = mount(generateMenu({ defaultSelectedKeys: ['2'] }));

    act(() => {
      component.simulate('keydown', { keyCode: ArrowUp.code });
    });

    component.update();
    expect(component.find('.arco-menu-item.arco-menu-active').text()).toBe('设计指南');
  });

  it('hotkey operations', () => {
    const component = mount(generateMenu());

    act(() => {
      component.simulate('keydown', { keyCode: ArrowDown.code });
    });

    act(() => {
      component.simulate('keydown', { keyCode: ArrowLeft.code });
    });

    act(() => {
      component.simulate('keydown', { keyCode: ArrowRight.code });
    });

    act(() => {
      component.simulate('keydown', { keyCode: ArrowDown.code });
    });

    component.update();
    expect(component.find('.arco-menu-item.arco-menu-active').text()).toBe('模块');

    act(() => {
      component.simulate('keydown', { keyCode: Enter.code });
    });

    component.update();
    expect(component.find('.arco-menu-item.arco-menu-selected').text()).toBe('模块');

    act(() => {
      component.simulate('keydown', { keyCode: Esc.code });
    });

    component.update();
    expect(component.find('.arco-menu-item.arco-menu-active')).toHaveLength(0);
  });

  it('SubMenu properties are passed in correctly', () => {
    const component = mount(
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

    expect(component.find('.arco-menu-item-inner')).toHaveLength(2);
    expect(component.find('.arco-menu-pop-header').text()).toBe('sub_submenu_2');
  });

  it('SubMenu selectable', () => {
    const component = mount(
      <Menu mode="vertical" defaultSelectedKeys={['submenu']}>
        <SubMenu selectable title="submenu" key="submenu">
          <Menu.Item key="1">1</Menu.Item>
        </SubMenu>
      </Menu>
    );

    expect(component.find('.arco-menu-selected')).toHaveLength(1);
  });
});
