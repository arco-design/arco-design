---
order: 3
title:
  zh-CN: 添加 iconbox 项目
  en-US: iconbox project
---

## zh-CN

也可以把 `iconbox` 或者 `iconfont.cn` 中的项目添加到 `Icon` 组件的 `type` 中。 调用组件库暴露的工具方法 `Icon.addFromIconfontCn`，把网站中导出 `symbol` 的代码传入 `src` 属性中加载项目图标库。

## en-US

You can also add items in `iconbox` or `iconfont.cn` to the `type` of the `Icon` component. Call the method `Icon.addFromIconfontCn` exposed by the component library, and pass the code of exporting `symbol` from the website into the `src` property to load the project icon library.

```js
import { Icon } from '@arco-design/web-react';

const IconFont = Icon.addFromIconFontCn({ src: '//sf1-cdn-tos.toutiaostatic.com/obj/iconfont/index_8132353a46ca4ac1314b8903202269af.js' });

const App = () => {
  return <div>
    <IconFont type="icon-person" style={{ fontSize: 40, marginRight: 40 }} />
    <IconFont type="icon-earth" style={{ fontSize: 40, marginRight: 40 }} />
    <IconFont type="icon-flag" style={{ fontSize: 40 }} />
  </div>;
}

export default App;
```

