---
order: 1
title:
  zh-CN: 静态位置
  en-US: Static
---

## zh-CN

设置 `affix=false` 不随着页面滚动，锚点处于固定位置。

## en-US

Setting `affix=false`, the anchor is on a fixed position and does't scroll with the page.

```js
import { Anchor } from '@arco-design/web-react';
const AnchorLink = Anchor.Link;

const App = () => {
  return (
    <Anchor affix={false}>
      <AnchorLink href="#Basic" title="Basic" />
      <AnchorLink href="#Static" title="Static" />
      <AnchorLink href="#Lineless-mode" title="Lineless mode" />
      <AnchorLink href="#Affix" title="Affix" />
      <AnchorLink href="#Scroll-boundary" title="Scroll boundary" />
      <AnchorLink href="#Hash-mode" title="Hash mode" />
    </Anchor>
  );
};

export default App;
```
