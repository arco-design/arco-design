`````
物料平台

# 打包构建

了解物料项目的开发与构建。
`````

*本文基于 Arco 官方物料模板所创建的项目进行说明*

## 组件构建

arco-scripts 的构建命令内置了组件 JS、图标、样式的构建功能。通常情况下，你只需要通过以下命令来构建所有：

```
arco-scripts build:component
```

通过 `build:component` 将会构建出 ES/CommonJS/UMD 版本的 JS 文件，打包样式文件，如果项目中存在图标文件夹，还会进行图标构建。`build:component` 是下面所有命令的总和，大多数时候你不需要使用到下面的子命令，但理解这些命令将有助于你理解整个项目结构:

```bash
# 构建对应的 ES 模块 - tsc
arco-scripts build:component:es

# 构建 CommonJS 模块 - tsc
arco-scripts build:component:cjs

# 构建 UMD 输出 - Webpack
arco-scripts build:component:dist

# 样式构建 - gulp-less
arco-scripts build:component:css

# 图标构建（如有）- Webpack
arco-scripts build:icon
```

## **书写 Demo**

为了方便测试组件功能和他人快速入门，需要为你的组件提供至少一个 Demo，你应当在 `/src/demo/` 目录下书写这些 Demo。一个标准的 Demo 文件内容如下：

```jsx
// /src/demo/basic.jsx
import React from 'react';
import TooltipButton from '@arco-design/rc-hello-arco';

export default () => {
  return <TooltipButton title="tooltip title">Demo Basic</TooltipButton>;
};
```

在 Demo 入口文件中，添加物料描述和 Demo 描述，这些信息将在物料平台被提取和展示。

```javascript
// /src/demo/index.js
/**
 * @file
 * @title 组将名，例如：EmployeeSelect
 * @memberOf 组件类型，例如：数据输入
 * @description 描述你的组件
 */

/**
 * @title 基本用法
 * @description 描述你的例子
 */
export { default as Basic } from './basic';
```

你可以添加多个 Demo 文件，在添加 Demo 之后需要在 `/src/demo/index.js` 入口中添加它，这样其才能在 Storybook 中预览。 所有你书写的 Demo 在 `npm publish` 之前的文档生成环节会被提取到文档中，将被用于物料的实时预览。

## **Demo 依赖**

由于物料平台采取了运行时渲染 Demo 的形式，所以默认情况下你只可以在 Demo 代码中引入以下依赖，它们已经被默认注入到了运行环境中：

- react
- react-dom
- react-router-dom
- lodash
- date-fns
- @bytedesign/web-react
- @arco-design/web-react
- 物料本身对应的 NPM 包

如果必须引入上述之外的依赖才能保证 Demo 的正常运行，我们提供了一种特殊的方式来满足这一需求。按照以下步骤操作：

1.  新建 `/src/demo/arcoDemoVendor.js` 文件，将所需要用到的依赖从本文件中导出。

```javascript
// arcoDemoVendor.js
export { myDependency } from '@arco-design/somelib';
```

2.  在 Demo 文件中，从 `arcoDemoVendor.js` 中引入此依赖。

```javascript
// basic.jsx

import Component from '@arco-design/my-material';
import { myDependency } from './arcoDemoVendor';

export default () => {
  return <Component option={myDependency} />;
};
```

3.  确保 arco-scripts 版本 >= 1.17.1，并且 Webpack 构建的配置中包含了 arcoDemoVendor 入口。

```javascript
// Lerna Monorepo 模板中的物料构建配置

const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const { webpack } = require('../../../arco.scripts.config');

module.exports = (config) => {
  if (webpack) {
    const commonConfig =
      typeof webpack === 'function'
        ? webpack
        : typeof webpack.component === 'function'
        ? webpack.component
        : () => {};
    config = commonConfig(config) || config;
  }

  const entry = {
    arco: path.resolve(__dirname, '../src/index.tsx'),
  };
  const demoVendorPath = path.resolve(__dirname, '../src/demo/arcoDemoVendor.js');

  if (fs.existsSync(demoVendorPath)) {
    entry.arcoDemoVendor = demoVendorPath;
  }

  return merge(config, { entry });
};
```

## **开发中预览**

为了方便开发时快速查看代码修改效果，arco-scripts 提供了以下命令监听代码变动以自动构建：

```bash
# 监测组件代码的变动 - tsc & gulp-less
arco-scripts dev:component
```

在官方模板项目中，你还需要结合 Storybook 来实时预览调试组件。
