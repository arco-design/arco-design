---
order: 4
title:
  zh-CN: 可伸缩侧边栏
  en-US: Retractable sidebar
---

## zh-CN

可以用鼠标进行拖拽放大缩小的侧边栏，需要用到的参数：`resizeDirections`。

## en-US

By `resizeDirections`, you can use the mouse to drag the sidebar to zoom in and out.

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

```css:silent
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
