<div align="center">
  <a href="https://arco.design" target="_blank">
    <img alt="Arco Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>
<div align="center">
  <h1>Arco Design</h1>
</div>

<div align="center">

A comprehensive React UI components library based on the [Arco Design](https://arco.design/) system.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arco-design/arco-design/blob/main/LICENSE)

</div>

<div align="center">

English | [简体中文](./README.zh-CN.md)

</div>


# Features

## Comprehensive

With more than 60 crafted components that you can use out of the box.

## Customizable theme

Extensive theme tokens can be customized to build your own theme. Two ways
of customization are supported:

* [With less-loader](https://arco.design/react/docs/theme)
* [Design Lab](https://arco.design/themes) - Recommended!

## TypeScript friendly

All components are written in TypeScript so it's type friendly.

## Wide browser support

All modern browsers including IE11 (using [polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11)), are supported.

# Installation

Available as an [npm package](https://www.npmjs.com/package/@arco-design/web-react)

```bash
// with npm
npm install @arco-design/web-react

// with yarn
yarn add @arco-design/web-react
```

# Examples

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@arco-design/web-react';

function App() {
  return (
    <Button type='secondary'>
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
```

# Useful Links

* [Documentation website](https://arco.design/)
* [Components documentation](https://arco.design/react/components/overview)
* [Dark mode](https://arco.design/react/docs/dark)
* [Theme customization](https://arco.design/react/docs/theme)
* [Figma component library](https://www.figma.com/file/FVu1DydEeXvJqXrkOb90Oi/ArcoDesign%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1_2.0?node-id=5472%3A308)

# Ecosystems

| Project               | Description                                             |
| --------------------- | ------------------------------------------------------- |
| [Vue Component Library] | A comprehensive Vue UI components library based on the Arco Design system |
| [Design Lab] | A platform to create and manage your themes with ease. |
| [Material Market] | A platform that provides massive high-quality customized materials to greatly boost development efficiency. |
| [Icon Box] | One-stop platform to manage your icons. |
| [Arco Pro] | A solution to quickly building applications from scratch. |

[Vue Component Library]: https://arco.design/vue/docs/start
[Design Lab]: https://arco.design/themes
[Material Market]: https://arco.design/material
[Icon Box]: https://arco.design/iconbox
[Arco Pro]: https://arco.design/pro/

# Contributing

Developers interested in contributing should read the [Code of Conduct](./CODE_OF_CONDUCT.md) and the [Contributing Guide](./CONTRIBUTING.md).

# License

Ths project is [MIT licensed](./LICENSE).
