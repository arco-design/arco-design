---
order: 2
title:
  zh-CN: 自定义 Icon
  en-US: Customize Icon
---

## zh-CN

这个示例展示了如何自定义Icon。配合 `@svgr/webpack` 来引入svg文件来使用。

## en-US

This example shows how to customize Icon. Use with `@svgr/webpack` to import svg files.

```js
import IconIronMan from './Iron Man.svg';

const App = () => {
  return <div>
    <IconIronMan className="arco-icon" style={{ fontSize: '50px' }} />
  </div>;
}

export default App;
```
