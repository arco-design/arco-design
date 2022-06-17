---
order: 3
title:
  zh-CN: 固钉样式
  en-US: Affix
---

## zh-CN

示例中的锚点将会出现在页面右侧。

当设置 `affix` 为 `true` 时，锚点组件将会嵌套在[固钉](/react/components/affix)组件内。通过 `affixStyle` 属性可以设置 `Affix` 组件的样式。

## en-US

The anchor in the example will appear on the right side of the page.

Use `affix=true` to wrap the anchor within [Affix](/react/components/affix) component. `affixStyle` can be used to set the style of `Affix` component.

```js
import { Anchor } from '@arco-design/web-react';
const AnchorLink = Anchor.Link;

const App = () => {
  return (
    <Anchor
      offsetBottom={40}
      affixStyle={{
        position: 'absolute',
        right: -170,
        top: '50%',
        zIndex: 1,
      }}
    >
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
