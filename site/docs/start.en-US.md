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

## React Version

**react**: >= 16.8
**react-dom**: >= 16.8

## Install

```bash
npm i @arco-design/web-react
```

## Basic Usage

`@arco-design/web-react` takes the lightweight route. Combining with on-demand loading, the size of the package is greatly reduced.

Take Button component as an example:

> Please remember to import css.

If you need style overlay, you can import `@arco-design/web-react/dist/css/index.less`.

```js
import React from 'react';
import { render } from 'react-dom';
import { Button } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';

render(<Button>ArcoDesign</Button>, CONTAINER);
```

## Load on Demand

### tree shaking

`@arco-design/web-react` supports `tree shaking` by default. You can load on demand through importing `import { Button } from '@arco-design/web-react';`.

### ArcoWebpackPlugin

If the project uses Webpack as the build tool，you can load components and styles on demand with `@arco-design/webpack-plugin`。

1.  Install plugin

```
npm i @arco-design/webpack-plugin -D
```

2.  Add in webpack configuration

```js
var ArcoWebpackPlugin = require('@arco-design/webpack-plugin');
```

```js
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
      style: true, // 样式按需加载
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

## Server-side Rendering

Support SSR.
