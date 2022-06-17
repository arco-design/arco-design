---
order: 1
title:
  zh-CN: 自定义按钮 Icon
  en-US: Customize button's icon
---

## zh-CN

通过设置 `Menu.Sider` 的 `trigger` 属性，实现自定义收起按钮的图标。

## en-US

By setting the `trigger` property of `Menu.Sider`, the icon of the collapse button can be customized.

```js
import React from 'react';
import { Layout, Menu, Breadcrumb, Button, Message } from '@arco-design/web-react';
import { IconHome, IconCalendar, IconCaretRight, IconCaretLeft } from '@arco-design/web-react/icon';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

class App extends React.Component {
  state = {
    collapsed: false,
  };
  handleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="layout-collapse-demo">
        <Sider
          collapsed={this.state.collapsed}
          onCollapse={this.handleCollapsed}
          collapsible
          trigger={this.state.collapsed ? <IconCaretRight /> : <IconCaretLeft />}
          breakpoint="xl"
        >
          <div className="logo" />
          <Menu
            defaultOpenKeys={['1']}
            defaultSelectedKeys={['0_3']}
            onClickMenuItem={(key) =>
              Message.info({
                content: `You select ${key}`,
                showIcon: true,
              })
            }
            style={{ width: '100%' }}
          >
            <MenuItem key="0_1" disabled>
              <IconHome />
              Menu 1
            </MenuItem>
            <MenuItem key="0_2">
              <IconCalendar />
              Menu 2
            </MenuItem>
            <MenuItem key="0_3">
              <IconCalendar />
              Menu 3
            </MenuItem>
            <SubMenu
              key="1"
              title={
                <span>
                  <IconCalendar />
                  Navigation 1
                </span>
              }
            >
              <MenuItem key="1_1">Menu 1</MenuItem>
              <MenuItem key="1_2">Menu 2</MenuItem>
              <SubMenu key="2" title="Navigation 2">
                <MenuItem key="2_1">Menu 1</MenuItem>
                <MenuItem key="2_2">Menu 2</MenuItem>
              </SubMenu>
              <SubMenu key="3" title="Navigation 3">
                <MenuItem key="3_1">Menu 1</MenuItem>
                <MenuItem key="3_2">Menu 2</MenuItem>
                <MenuItem key="3_3">Menu 3</MenuItem>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span>
                  <IconCalendar />
                  Navigation 4
                </span>
              }
            >
              <MenuItem key="4_1">Menu 1</MenuItem>
              <MenuItem key="4_2">Menu 2</MenuItem>
              <MenuItem key="4_3">Menu 3</MenuItem>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ paddingLeft: 20 }}>Header</Header>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;
```

```css
.layout-collapse-demo {
  height: 500px;
  border: 1px solid var(--color-border);
  background: var(--color-fill-2);
}

.layout-collapse-demo .arco-layout-sider .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-collapse-demo .arco-layout-sider-light .logo {
  background: var(--color-fill-2);
}

.layout-collapse-demo .arco-layout-footer,
.layout-collapse-demo .arco-layout-content {
  color: var(--color-white);
  text-align: center;
  font-stretch: condensed;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.layout-collapse-demo .arco-layout-footer {
  color: var(--color-text-2);
  height: 48px;
  line-height: 48px;
  font-weight: 400;
  font-size: 14px;
}

.layout-collapse-demo .arco-layout-content {
  background: var(--color-bg-3);
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
}

.layout-collapse-demo .arco-layout-header {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-collapse-demo .arco-layout-header .trigger {
  margin-left: 20px;
}
```
