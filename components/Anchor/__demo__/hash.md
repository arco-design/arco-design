---
order: 5
title:
  zh-CN: 点击锚点不记录历史
  en-US: Hash mode
---

## zh-CN

可以设置点击锚点而不改变浏览器历史。

## en-US

Click anchor without changing the browser history.

```js
import { Anchor } from '@arco-design/web-react';
const AnchorLink = Anchor.Link;

const App = () => {
  return (
    <Anchor affix={false} hash={false}>
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
