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

### 通过 npm 安装

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

不过，我们不建议通过 CDN 使用，因为 CDN 会引入全量的组件代码，这样会影响页面加载速度。

## 基础使用

`@arco-design/web-react` 走轻量路线，配合按需加载，能极大缩小包的体积。

以 Button 组件为例：

> 记得引入 css。

如果需要进行样式覆盖，可以引入 `@arco-design/web-react/dist/css/index.less` 文件。

```js
import React from 'react';
import { render } from 'react-dom';
import { Button } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';

render(<Button>ArcoDesign</Button>, CONTAINER);
```

## 按需加载

### tree shaking

`@arco-design/web-react` 默认支持 `tree shaking`。直接引入 `import { Button } from '@arco-design/web-react';` 即可按需加载。

### ArcoWebpackPlugin

如果项目是以 Webpack 为构建工具的，使用 `@arco-design/webpack-plugin` 插件可以实现组件和样式的按需加载。

1. 安装插件
```
npm i @arco-design/webpack-plugin -D
```
2. 在 webpack 配置中加入：
```js
const ArcoWebpackPlugin = require('@arco-design/webpack-plugin');
```
```js
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

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions
