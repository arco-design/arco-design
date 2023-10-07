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
  link="https://pro.arco.design"
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
   * Style: https://unpkg.com/@arco-design/web-react@latest/dist/css/arco.min.css

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

The components of `@arco-design/web-react` support `tree shaking` by default, and can be loaded on demand by importing them using `import { Button } from '@arco-design/web-react';`.

If `tree-shaking` fails, or if `load style on demand` and `load icon on demand` are required, the following two methods can be used:

### Using the official Arco plugin

The plugin functions provided by `Arco`'s [official plugin library](https://github.com/arco-design/arco-plugins) are as follows:

- Component library styles are loaded on demand
- Component library icons are loaded on demand
- Imported theme exported by [Design Lab](https://arco.design/themes)
- Icon library replacement for component library

#### Plugin list

> For specific usage, please click the plugin link to view the details page

  - [@arco-plugins/unplugin-react 🚧](https://github.com/arco-design/arco-plugins/blob/main/packages/unplugin-react/README.zh-CN.md) Unplugin for Arco react components
  - [@arco-plugins/webpack-react](https://github.com/arco-design/arco-plugins/blob/main/packages/plugin-webpack-react/README.md) webpack plugin for Arco react components
  - [@arco-plugins/vite-react](https://github.com/arco-design/arco-plugins/blob/main/packages/plugin-vite-react/README.md) vite plugin for Arco react component library
  - [@arco-plugins/vite-vue](https://github.com/arco-design/arco-plugins/blob/main/packages/plugin-vite-vue/README.md) vite plugin for Arco vue component library

### Using [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)

1. Installation

```bash
npm i babel-plugin-import -D
```

2. Add configuration

#### Load Component or Style on demand

Add to the babel configuration:

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

#### Load Icon on demand

Add to the babel configuration:

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

