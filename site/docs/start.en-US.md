`````
Developer Guide

# Quick Start

Follow the steps below to quickly get started using the component library.
`````

```js:react
import ACCard from '../src/widget/Card';

<ACCard
  title="ArcoPro"
  description="Use ArcoPro to quickly build modern web pages."
  link="/pro"
  icon="ArcoPro"
  buttonText="Goto"
/>
```

## Install

**You need to install react >= 16.8 and react-dom >= 16.8 at the same time.**

```bash
// npm
npm i @arco-design/web-react

// yarn
yarn add @arco-design/web-react
```

### CDN

In addition to installing through npm, you can also directly use CDN resources. We provide umd format code.

* Development: https://unpkg.com/@arco-design/web-react@latest/dist/arco.development.js
* Production: https://unpkg.com/@arco-design/web-react@latest/dist/arco.min.js
   * Icon: https://unpkg.com/@arco-design/web-react@latest/dist/arco-icon.min.js

However, we do not recommend using CDN, because CDN will download the entire library, which will affect the page loading speed.

## Basic Usage

Take Button component as an example:

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

## Load on Demand

### tree shaking

`@arco-design/web-react` supports `tree shaking` by default. You can load on demand through importing `import { Button } from '@arco-design/web-react';`.

### ArcoWebpackPlugin

If the project uses Webpack as the build tool，you can load components and styles on demand with `@arco-design/webpack-plugin`。

**Install plugin**

```
npm i @arco-design/webpack-plugin -D
```

**Webpack configuration**

```js
var ArcoWebpackPlugin = require('@arco-design/webpack-plugin');

module.exports = {
  plugins: [
    new ArcoWebpackPlugin();
  ],
};
```

### babel-plugin-import

If `tree-shaking` fails and the webpack plugin is not used, you can load on demand through [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import).

```bash
npm i babel-plugin-import -D
```

#### Load component on demand

Add in babel configuration:

```js
plugins: [
  [
    'babel-plugin-import',
    {
      libraryName: '@arco-design/web-react',
      libraryDirectory: 'es',
      camel2DashComponentName: false,
      style: true, // style
    },
  ],
];
```

### Load Icon on demand

Add in babel configuration:

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

## Supported platforms

| [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/08095282566ac4e0fd98f89aed934b65.png~tplv-uwbnlip3yd-png.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40ad73571879dd8d9fd3fd524e0e45a4.png~tplv-uwbnlip3yd-png.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4f59d35f6d6837b042c8badd95871b1d.png~tplv-uwbnlip3yd-png.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eee2667f837a9c2ed531805850bf43ec.png~tplv-uwbnlip3yd-png.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3240334d3967dd263c8f4cdd2d93c525.png~tplv-uwbnlip3yd-png.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f2454685df95a1a557a61861c5bec256.png~tplv-uwbnlip3yd-png.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge 16| 31| 49 | 31 | 36 | last 2 versions |

