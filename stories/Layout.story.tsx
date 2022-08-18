import React, { useState } from 'react';
import { Layout, Menu, Message } from '@self';
import { IconHome, IconCalendar } from '@self/icon';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Content = Layout.Content;

function Demo1() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  function onCollapse(collapsed: boolean, type: 'responsive' | 'clickTrigger') {
    const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
    Message.info({
      content,
      duration: 2000,
    });
    setCollapsed(collapsed);
  }

  return (
    <Layout className="byte-layout-collapse-demo">
      <Sider
        theme="dark"
        // breakpoint='lg'
        // onBreakpoint={this.onBreakpoint}
        onCollapse={onCollapse}
        collapsed={collapsed}
        width={220}
        collapsible
        breakpoint="md"
      >
        <div className="logo" />
        <Menu theme="dark" autoOpen defaultSelectedKeys={['3']} style={{ width: '100%' }}>
          <MenuItem key="1" disabled>
            <IconHome />
            设计指南
          </MenuItem>
          <MenuItem key="2">
            <IconCalendar />
            区块
          </MenuItem>
          <MenuItem key="3">
            <IconCalendar />
            模块
          </MenuItem>
          <SubMenu
            key="component"
            title={
              <span>
                <IconCalendar />
                组件
              </span>
            }
          >
            <MenuItem key="4">通用组件</MenuItem>
            <MenuItem key="5">布局组件</MenuItem>
          </SubMenu>
          <SubMenu
            key="layout"
            title={
              <span>
                <IconCalendar />
                布局组件
              </span>
            }
          >
            <MenuItem key="11">栅格</MenuItem>
            <MenuItem key="12">分隔符</MenuItem>
            <MenuItem key="13">布局</MenuItem>
          </SubMenu>
        </Menu>
      </Sider>
      <Content style={{ background: 'rgb(240,255,255)', textAlign: 'center', padding: '30px' }}>
        <div style={{ width: '100%', height: '100%' }}>Content</div>
      </Content>
    </Layout>
  );
}

export const Demo = () => <Demo1 />;

export default {
  title: 'Layout',
};
