---
order: 3
title:
  zh-CN: 响应式侧边栏
  en-US: Responsive sider
---

## zh-CN

左侧 Sider 可以结合 Menu 设置为展开/收起状态, 设置 `breakpoint` 可触发响应式收缩。

## en-US

The Sider on the left can be used with together Menu and set to expand/collapse. Setting `breakpoint` can enable responsive contraction.

```js
import React from 'react';
import { Layout, Menu, Breadcrumb, Message } from '@arco-design/web-react';
import { IconHome, IconCalendar } from '@arco-design/web-react/icon';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

function BaseMenu(props) {
  return (
    <Menu defaultOpenKeys={['1']} defaultSelectedKeys={['0_2']} {...props}>
      <MenuItem key="0_1" disabled>
        <IconHome />
        Menu 1
      </MenuItem>
      <MenuItem key="0_2">
        <IconCalendar />
        Menu 2
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
  );
}

class App extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed, type) => {
    const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
    Message.info({
      content,
      duration: 2000,
    });
    this.setState({
      collapsed,
    });
  };

  render() {
    return (
      <Layout className="layout-collapse-demo">
        <Sider
          theme="dark"
          breakpoint="lg"
          onCollapse={this.onCollapse}
          collapsed={this.state.collapsed}
          width={220}
          collapsible
        >
          <div className="logo" />
          <BaseMenu
            onClickMenuItem={(key) =>
              Message.info({
                content: `You select ${key}`,
                showIcon: true,
              })
            }
            theme="dark"
            style={{ width: '100%' }}
          />
        </Sider>
        <Layout>
          <Header>
            <BaseMenu mode="horizontal" />
          </Header>
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

```css:silent
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
