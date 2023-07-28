---
order: 1
title:
  zh-CN: 横向 Anchor
  en-US: Horizontal Anchor
---

## zh-CN

横向 Anchor，不支持嵌套

## en-US

Horizontal Anchor, does not support nesting

```js
import { Anchor,Typography } from '@arco-design/web-react';
const AnchorLink = Anchor.Link;

const App = () => {
  return (
    <div>
      <Typography.Paragraph>Default</Typography.Paragraph>
      <Anchor
        affix={false}
        direction="horizontal"
      >
        <AnchorLink href="#Basic" title="Basic" />
        <AnchorLink href="#Static" title="Static" />
        <AnchorLink href="#Lineless-mode" title="Lineless mode" />
        <AnchorLink href="#Affix" title="Affix" />
        <AnchorLink href="#Scroll-boundary" title="Scroll boundary" />
        <AnchorLink href="#Hash-mode" title="Hash mode" />
      </Anchor>

      <Typography.Paragraph style={{marginTop: 32}}>Lineless mode</Typography.Paragraph>
      <Anchor
        affix={false}
        direction="horizontal"
        lineless
      >
        <AnchorLink href="#Basic" title="Basic" />
        <AnchorLink href="#Static" title="Static" />
        <AnchorLink href="#Lineless-mode" title="Lineless mode" />
        <AnchorLink href="#Affix" title="Affix" />
        <AnchorLink href="#Scroll-boundary" title="Scroll boundary" />
        <AnchorLink href="#Hash-mode" title="Hash mode" />
      </Anchor>
    </div>
  );
};

export default App;
```
