`````
物料平台

# 项目配置

了解如何自定义物料项目配置。
`````

## 全局配置

在执行 `arco init` 时，Git 根目录中将会创建 `arco.config.js` 用于配置 `arco` 命令的行为。

```javascript
// arco.config.js
module.exports = {
  // globs to your packages
  // e.g. [ 'packages/*' ]
  packages: [],
  // command you want to replace 'arco subCommand'
  // e.g. publish: 'lerna publish'
  alias: {
    publish: '',
  },
  // initial meta for 'arco generate'
  initialMeta: {
    group: 0,
  },
  // path of arco block insertion, relative to /src ('myPath' will be resolved as '/src/myPath')
  // pathBlockInsert: 'pathRelativeToSrc',
};
```

## 构建配置

详细配置参数类型和默认配置可参考 [arco-scripts 源码](https://github.com/arco-design/arco-cli/tree/main/packages/arco-scripts/src/config) 。

Arco 官方模板所创建的项目使用 `arco-scripts` 来进行项目的测试和打包，你可以通过配置文件修改其默认配置。在项目根目录的 `.config` 文件夹内，我们提供了扩展配置的入口：

```
.config
├── babel.config.js // 组件 UMD 和单元测试相关
├── docgen.config.js // 文档生成相关
├── jest.config.js // 单元测试相关
├── style.config.js // 组件 css 和静态资源（图片、字体）相关
├── tsc.config.js // 允许传入 tsc 命令的所有选项
└── webpack.config.js // 组件 UMD 版本相关
```

在学习如何扩展配置之前，我们以产物对构建工具的具体分工进行说明：

- `/es` 组件的 ESModule 版本，由 TypeScript tsc 命令构建；
- `/lib` 组件的 CommonJS 版本，由 TypeScript tsc 命令构建；
- `/dist` 组件的 UMD 版本，由 Webpack 进行构建；
- `/docs` 组件的 Props 文档和 Demo 用法文档，有 `arco-scripts docgen` 命令构建；
- 所有的 css 文件和静态资源文件由 gulp 和 less 进行构建，Webpack 不负责此部分；

**以下所有的配置函数遵循相同的形式：既可以直接修改** `config` **对象，又可以返回一个新对象作为** `config` **。**

### 配置智能提示


**版本要求 `arco-scripts >= 1.25.7`**

`arco-scripts` 的配置项由 TypeScript 书写，你可以通过 IDE 和 JsDoc 的配合来实现智能提示：

```js
// docgen.config.js

/**
 * @param config {import('arco-scripts').DocgenConfig}
 */
module.exports = (config) => {};
```

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0cecc7d5998e81f8841460f205dffd5c.png~tplv-uwbnlip3yd-webp.webp)

### **配置 Babel**

Webpack 和 Jest 共用了相同的 Babel 配置，因此当你遇到了 Webpack 打包或者 Jest 相关的 Babel 问题时，可以考虑修改此配置。

```javascript
// babel.config.js
module.exports = (config) => {
  // 你可以在这里直接修改 config 对象
  config.plugins.push('@babel/plugin-proposal-class-properties');
};
```

### **配置 Less**

配置项目内 `less` 文件以及静态资源被如何组织和打包，通常你只需要用到以下配置：

```javascript
// style.config.js
module.exports = (config) => {
  // 你可以在这里直接修改 config 对象
  // less 编译入口
  config.less.entry = ['src/**/index.less'];
  // dev 模式下需要监听的资源
  config.less.watch = ['src/**/*.{less,woff,png,jpg}'];
  // 静态资源路径
  config.asset.entry = ['src/**/*.{woff,png,jpg}'];
};
```

### 配置 TSC

**需要 arco-scripts >= 1.19.0**

物料产物的 ESM 和 CommonJS 产物默认由 `tsc` 命令直接编译，通过配置 `tsc.config.js` 可以配置此命令的[所有参数](https://www.typescriptlang.org/docs/handbook/compiler-options.html) 。

```javascript
// tsc.config.js
module.exports = (config) => {
  config.project = 'path/to/your/tsconfig.json';
};
```

### 配置 Webpack

此部分是标准的 webpack 配置项，参考 [Webpack Configuration](https://webpack.js.org/configuration/) 。

```javascript
// webpack.config.js
const path = require('path');

module.exports = (config) => {
  // 你可以在这里直接修改 config 对象
  config.entry = path.resolve(__dirname, '../src/index.tsx');
};
```

由于 Webpack 的配置项较为复杂，直接修改对象的方式较为不便，我们推荐使用 `webpack-merge` 来实现配置合并。

```javascript
// webpack.config.js
const path = require('path');
// webpack-merge 已经被 arco-scripts 依赖，你无需手动安装它
const merge = require('webpack-merge');

module.exports = (config) => {
  // 注意 webpack-merge 不会直接修改 config 对象，你需要将其结果作为新的 config 返回
  return merge(config, {
    entry: path.resolve(__dirname, '../src/index.tsx'),
  });
};
```

### **配置 Jest**

Jest 配置项，分为 `client` 和 `node` 两部分的配置。此部分是标准的 Jest 配置项，参考 [Configuring Jest](https://jestjs.io/docs/en/configuration) 。

```javascript
// jest.config.js
exports.node = (config) => {
  // 使用 moduleNameMapper 告诉 Jest 如何解析你正在开发中的包，可以省去令人烦躁的 npm link 过程
  config.moduleNameMapper = {
    '^@arco-design/hello-arco/(.+)$': '<rootDir>/$1',
    '^@arco-design/hello-arco$': '<rootDir>',
  };
};

exports.client = (config) => {
  config.moduleNameMapper = {
    '^@arco-design/hello-arco/(.+)$': '<rootDir>/$1',
    '^@arco-design/hello-arco$': '<rootDir>',
  };
};
```

### **配置文档生成**

配置项目的文档生成。**切勿修改** `output` **字段，它将造成物料网站无法找到你的物料文档，造成物料预览失败。**

```javascript
// docgen.config.js
module.exports = (config) => {
  config.entry = 'src';
  // DON'T change output!!!
  config.output = 'docs/README.md';
};
```

### **查看当前配置**

我们提供了 `arco-scripts show:config <configType>` 命令快速查看当前生效的相关配置。

```bash

$ arco-scripts show:config --help

Usage: arco-scripts show:config <configType>

Show your current config for arco-scripts. Valid type: babel|style|webpack.component|webpack.site|webpack.icon|jest|docgen

Options:
  -h, --help  output usage information
```

在项目中你可以使用 `npm run show:config -- <configType>` 来查看当前正在使用的配置。

```bash
$ npm run show:config -- style

{
  less: {
    entry: [ 'src/**/index.less', 'components/**/index.less' ],
    watch: [
      'src/**/*.{png,jpg,jpeg,gif,svg,ttf,eot,woff,woff2,less}',
      'components/**/*.{png,jpg,jpeg,gif,svg,ttf,eot,woff,woff2,less}'
    ],
    watchBase: {},
    output: { es: 'es', cjs: 'lib', dist: [Object] },
    compilerOptions: {},
    getFileChangedGlob: [Function: getFileChangedGlob],
    cssJsEntry: ''
  },
  asset: {
    entry: [
      'src/**/*.{png,jpg,jpeg,gif,svg,ttf,eot,woff,woff2}',
      'components/**/*.{png,jpg,jpeg,gif,svg,ttf,eot,woff,woff2}'
    ],
    output: 'dist/asset'
  }
}

For more details, view [/Users/arco/workspace/arco-cli/packages/arco-scripts/config/style.config]
```
