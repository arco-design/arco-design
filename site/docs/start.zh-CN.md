`````
开发指南

# 快速上手

跟随以下的步骤，快速上手组件库的使用。
`````

```js:react
import ACCard from '../src/widget/Card';

<ACCard
  title="ArcoPro 最佳实践"
  description="使用 ArcoPro，快速构建现代网页。"
  link="/pro"
  icon="ArcoPro"
  buttonText="立即使用"
/>
```

## 安装

**需要同时安装 react >= 16.8 和 react-dom >= 16.8。**

```bash
// npm
npm i @arco-design/web-react

// yarn
yarn add @arco-design/web-react
```

### 通过 CDN 使用

除了可以通过 npm 安装之外，你也可以直接使用 CDN 资源，我们提供了 umd 格式的代码产物。

* 开发环境: https://unpkg.com/@arco-design/web-react@latest/dist/arco.development.js
* 生产环境: https://unpkg.com/@arco-design/web-react@latest/dist/arco.min.js
  * 图标: https://unpkg.com/@arco-design/web-react@latest/dist/arco-icon.min.js

不过，我们不建议通过 CDN 使用，因为 CDN 会引入全量的组件代码，这样会影响页面加载速度。

## 基础使用

以 Button 组件为例。

```js
import React from "react";
import ReactDOM from "react-dom";
import { Button } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";

ReactDOM.render(
  <Button type="primary">Hello Arco</Button>,
  document.querySelector("#root")
);
```

```js:react
<div style={{ padding: 20, borderRadius: 4, backgroundColor: 'var(--color-neutral-2)' }}>
  <iframe src="https://codesandbox.io/embed/reverent-voice-v2yzx?fontsize=14&hidenavigation=1&theme=dark"
    style={{ width: '100%', height: 500, border: 0, borderRadius: 4, overflow: 'hidden' }}
    title="reverent-voice-v2yzx"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  ></iframe>
</div>
```

## 按需加载

### tree shaking

`@arco-design/web-react` 默认支持 `tree shaking`。直接引入 `import { Button } from '@arco-design/web-react';` 即可按需加载。

### ArcoWebpackPlugin

如果项目是以 Webpack 为构建工具的，使用 `@arco-design/webpack-plugin` 插件可以实现组件和样式的按需加载。

**安装插件**

```bash
npm i @arco-design/webpack-plugin -D
```

**配置 webpack**

```js
const ArcoWebpackPlugin = require('@arco-design/webpack-plugin');

module.exports = {
  plugins: [
    new ArcoWebpackPlugin(),
  ],
};
``` 

### babel-plugin-import

如果 `tree-shaking` 失效且不使用 webpack 插件的情况下，可以通过 [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import) 进行按需加载。

```bash
npm i babel-plugin-import -D
```

### 组件按需加载

在 babel 配置中加入：

```js
plugins: [
  [
    'babel-plugin-import',
    {
      libraryName: '@arco-design/web-react',
      libraryDirectory: 'es',
      camel2DashComponentName: false,
      style: true, // 样式按需加载
    },
  ],
];
```

### Icon 按需加载

在 babel 配置中加入：

```js
plugins: [
  [
    'babel-plugin-import',
    {
      libraryName: '@arco-design/web-react/icon',
      libraryDirectory: 'react-icon',
      camel2DashComponentName: false,
    },
  ],
];
```

## 浏览器兼容性

| [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/08095282566ac4e0fd98f89aed934b65.png~tplv-uwbnlip3yd-png.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40ad73571879dd8d9fd3fd524e0e45a4.png~tplv-uwbnlip3yd-png.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4f59d35f6d6837b042c8badd95871b1d.png~tplv-uwbnlip3yd-png.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eee2667f837a9c2ed531805850bf43ec.png~tplv-uwbnlip3yd-png.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3240334d3967dd263c8f4cdd2d93c525.png~tplv-uwbnlip3yd-png.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f2454685df95a1a557a61861c5bec256.png~tplv-uwbnlip3yd-png.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge 16| 31| 49 | 31 | 36 | last 2 versions |

