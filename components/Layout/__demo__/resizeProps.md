---
order: 5
title:
  zh-CN: 伸缩+收起侧边栏
  en-US: Resizable and collapsible sidebar
---

## zh-CN

通过 `resizeBoxProps.onMoving`方法， 配置 `width` 和 `collapsed` 可以实现即可以拖拽伸缩杆也可以点击收缩的侧边栏。

这时侧边栏的宽度完全受控于 `width` 的值

## en-US

Through the `resizeBoxProps.onMoving` method, configuring `width` and `collapsed` can realize that you can drag the telescopic rod or click the collapsed sidebar.

At this point the width of the sidebar is fully controlled by `width`.

```js
import { useState } from 'react';
import { Layout, Menu } from '@arco-design/web-react';
import { IconHome, IconCalendar } from '@arco-design/web-react/icon';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;
const Content = Layout.Content;
const collapsedWidth = 60;
const normalWidth = 220;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const handleMoving = (_, { width }) => {
    if (width > collapsedWidth) {
      setSiderWidth(width);
      setCollapsed(!(width > collapsedWidth + 20));
    } else {
      setSiderWidth(collapsedWidth);
      setCollapsed(true);
    }
  };

  return (
    <Layout className="byte-layout-collapse-demo">
      <Sider
        collapsible
        theme="dark"
        onCollapse={onCollapse}
        collapsed={collapsed}
        width={siderWidth}
        resizeBoxProps={{
          directions: ['right'],
          onMoving: handleMoving,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" autoOpen style={{ width: '100%' }}>
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
            key="layout"
            title={
              <span>
                <IconCalendar /> 布局组件
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

export default App;
```
