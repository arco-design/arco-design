---
order: 3
title: 
  zh-CN: 在布局中使用
  en-US: Use in Layout
---

## zh-CN

[Layout](/react/components/ResizeBox) 组件中集成了 `ResizeBox` 组件，可以在 Layout 中使用可伸缩的侧边栏。

## en-US

The `ResizeBox` component is integrated in the [Layout](/react/components/ResizeBox) component, so a scalable sidebar can be used in the layout.

```js
import { Layout } from '@arco-design/web-react';
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const App = () => {
  return (
    <div className="layout-basic-demo">
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider
            resizeDirections={['right']}
            style={{
              minWidth: 150,
              maxWidth: 500,
              height: 200,
            }}
          >
            Sider
          </Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
};

export default App;
```
