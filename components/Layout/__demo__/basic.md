---
order: 0
title:
  zh-CN: 基础用法
  en-US: Basic
---

## zh-CN

典型的页面布局。

## en-US

A typical page layout.

```js
import { Layout } from '@arco-design/web-react';
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const App = () => {
  return (
    <div className="layout-basic-demo">
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
      <br />
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <br />
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Layout>
          <Content>Content</Content>
          <Sider>Sider</Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <br />
      <Layout style={{ height: '400px' }}>
        <Header>Header</Header>
        <Layout>
          <Sider style={{ width: '64px' }}>Sider</Sider>
          <Sider style={{ width: '206px', marginLeft: '1px' }}>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};

export default App;
```

```css
.layout-basic-demo .arco-layout-header,
.layout-basic-demo .arco-layout-footer,
.layout-basic-demo .arco-layout-sider,
.layout-basic-demo .arco-layout-sider-children,
.layout-basic-demo .arco-layout-content {
  color: var(--color-white);
  text-align: center;
  font-stretch: condensed;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.layout-basic-demo .arco-layout-header,
.layout-basic-demo .arco-layout-footer {
  height: 64px;
  background-color: var(--color-primary-light-4);
}

.layout-basic-demo .arco-layout-sider {
  width: 206px;
  background-color: var(--color-primary-light-3);
}

.layout-basic-demo .arco-layout-content {
  background-color: rgb(var(--arcoblue-6));
}
```
