<div align="center">
  <a href="https://arco.design" target="_blank">
    <img alt="Arco Design Logo" width="100" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>

<div align="center">
  <h1>Arco Design</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/) 的 React UI 组件库。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arco-design/arco-design/blob/master/LICENSE)

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

# 特性

## 全面

60多个开箱即用的高质量组件, 可以覆盖绝大部份的业务场景。

## 主题配置

海量的样式 tokens, 支持全局以及组件级别的主题配置。有以下2种方式可以定制主题：

* [Less-loader](https://arco.design/react/docs/theme)
* [风格配置平台](https://arco.design/themes) - 推荐!

## TypeScript 友好

所有组件都是用 TypeScript 编写的，所以天然的类型友好。

## 广泛的浏览器支持

支持所有现代浏览器，包括 IE11 (需要[polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11))。

# 安装

[npm package](https://www.npmjs.com/package/@arco-design/web-react)

```bash
// npm
npm install @arco-design/web-react

// yarn
yarn add @arco-design/web-react
```

# 例子

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

# 相关链接

* [官网](https://arco.design/)
* [组件文档](https://arco.design/react/components/overview)
* [暗黑模式](https://arco.design/react/docs/dark)
* [主题配置](https://arco.design/react/docs/theme)
* [Figma 设计资源](https://www.figma.com/file/M66cTiLXHa4SVyZIlfY5Pb/arco-Design-System?node-id=8253%3A44145)

# 生态

| 项目               | 介绍                                             |
| --------------------- | ------------------------------------------------------- |
| [Vue 组件库] | 基于 [Arco Design](https://arco.design/) 的 Vue UI 组件库。 |
| [风格配置平台] | 精确到组件级的主题视觉配置平台 |
| [物料市场] | 丰富可共享的业务定制物料，让效率突破猛进 |
| [图标平台] | 一站式图标管理平台 |
| [Arco Pro] | 快速构建中后台的前端解决方案 |

[Vue 组件库]: https://arco.design/vue/docs/start
[风格配置平台]: https://arco.design/themes
[物料市场]: https://arco.design/material
[图标平台]: https://arco.design/iconbox
[Arco Pro]: https://arco.design/pro/

# 参与贡献

贡献之前请先阅读 [行为准则](./CODE_OF_CONDUCT.md) 和 [贡献指南](./CONTRIBUTING.zh-CN.md)。

# License

[MIT 协议](./LICENSE)
