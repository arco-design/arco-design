---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

基本用法，随着页面滚动，锚点浮动在页面固定位置。

## en-US

Basic usage. The anchor will be fixed on the page as the page scrolls.

```js
import { Anchor } from '@arco-design/web-react';
const AnchorLink = Anchor.Link;

const App = () => {
  return (
    <Anchor
      offsetTop={60}
      style={{ backgroundColor: 'var(--color-bg-2)' }}
    >
      <AnchorLink href="#Basic" title="Basic">
        <AnchorLink href="#Static" title="Static">
          <AnchorLink href="#Lineless-mode" title="Lineless mode" />
          <AnchorLink href="#Affix" title="Affix" />
        </AnchorLink>
      </AnchorLink>
      <AnchorLink href="#Scroll-boundary" title="Scroll boundary" />
      <AnchorLink href="#Hash-mode" title="Hash mode" />
    </Anchor>
  );
};

export default App;
```
