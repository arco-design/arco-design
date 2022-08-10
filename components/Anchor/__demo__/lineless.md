---
order: 2
title:
  zh-CN: 无轴线模式
  en-US: Lineless mode
---

## zh-CN

设置 `lineless` 时，可以使用无左侧轴线的锚点样式。

## en-US

Use `lineless=true` to hide axis line on the left.

```js
import { Anchor } from '@arco-design/web-react';
const AnchorLink = Anchor.Link;

const App = () => {
  return (
    <Anchor affix={false} lineless>
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
