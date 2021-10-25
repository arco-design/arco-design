---
order: 3
title:
  zh-CN: 添加 iconfont.cn 项目
  en-US: iconfont.cn project
---

## zh-CN

也可以把 `iconfont.cn` 中的项目添加到 `Icon` 组件的 `type` 中。 调用组件库暴露的工具方法 `Icon.addFromIconfontCn`，把网站中导出 `symbol` 的代码传入 `src` 属性中加载项目图标库。

## en-US

You can also add items in `iconfont.cn` to the `type` of the `Icon` component. Call the method `Icon.addFromIconfontCn` exposed by the component library, and pass the code of exporting `symbol` from the website into the `src` property to load the project icon library.

```js
import { Icon } from '@arco-design/web-react';

const IconFont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/font_180975_ue66sq60vyd.js' });

ReactDOM.render(
  <div>
    <IconFont type="icon-person" style={{ fontSize: 40, marginRight: 40 }} />
    <IconFont type="icon-earth" style={{ fontSize: 40, marginRight: 40 }} />
    <IconFont type="icon-flag" style={{ fontSize: 40 }} />
  </div>,
  CONTAINER
);
```

