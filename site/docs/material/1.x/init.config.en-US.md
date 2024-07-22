`````
Material Market

# Configuration

Learn how to customize the configuration of material items.
`````

*Auto translate by google.*

## Global configuration

When executing `arco init`, `arco.config.js` will be created in the Git root directory to configure the behavior of the `arco` command.

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

## Build Configuration

For detailed configuration parameter types and default configuration, please refer to [arco-scripts source code](https://github.com/arco-design/arco-cli/tree/main/packages/arco-scripts/src/config).

The project created by the official Arco template uses `arco-scripts` to test and package the project, and you can modify its default configuration through the configuration file. In the `.config` folder of the project root directory, we provide an entry for the extended configuration:

```
.config
├── babel.config.js // Component UMD is related to unit testing
├── docgen.config.js // Document generation related
├── jest.config.js // unit test related
├── style.config.js // Component css is related to static resources (pictures, fonts)
├── tsc.config.js // Allow all options of the tsc command to be passed in
└── webpack.config.js // Component UMD version related
```

Before learning how to extend the configuration, we explain the specific division of labor of the construction tools with products:

- ESModule version of `/es` component, constructed by TypeScript tsc command;
- CommonJS version of `/lib` component, built by TypeScript tsc command;
- The UMD version of the `/dist` component, built by Webpack;
- Props documentation and Demo usage documentation of the `/docs` component, built with the `arco-scripts docgen` command;
- All css files and static resource files are constructed by gulp and less, and Webpack is not responsible for this part;

**All the following configuration functions follow the same form: you can directly modify the `config` object, or return a new object as `config`.**



### Config Intellisense

**Version requirement `arco-scripts >= 1.25.7`**

Since `arco-scripts` ships with TypeScript typings, you can leverage your IDE's intellisense with jsdoc type hints:

```js
// docgen.config.js

/**
  * @param config {import('arco-scripts').DocgenConfig}
  */
module.exports = (config) => {};
```

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0cecc7d5998e81f8841460f205dffd5c.png~tplv-uwbnlip3yd-webp.webp)

### **Configure Babel**

Webpack and Jest share the same Babel configuration, so when you encounter Webpack packaging or Jest-related Babel issues, you can consider modifying this configuration.

```javascript
// babel.config.js
module.exports = (config) => {
  // You can directly modify the config object here
  config.plugins.push('@babel/plugin-proposal-class-properties');
};
```

### **Configuration Less**

To configure how the `less` files and static resources in the project are organized and packaged, usually you only need the following configuration:

```javascript
// style.config.js
module.exports = (config) => {
  // You can directly modify the config object here
  // less compile entry
  config.less.entry = ['src/**/index.less'];
  // Resources that need to be monitored in dev mode
  config.less.watch = ['src/**/*.{less,woff,png,jpg}'];
  // static resource path
  config.asset.entry = ['src/**/*.{woff,png,jpg}'];
};
```

### Configure TSC

**Requires arco-scripts >= 1.19.0**

The ESM and CommonJS products of the material product are directly compiled by the `tsc` command by default, and the [all parameters] of this command can be configured by configuring `tsc.config.js` (https://www.typescriptlang.org/docs/handbook/compiler -options.html).

```javascript
// tsc.config.js
module.exports = (config) => {
  config.project ='path/to/your/tsconfig.json';
};
```

### Configure Webpack

This part is a standard webpack configuration item, refer to [Webpack Configuration](https://webpack.js.org/configuration/).

```javascript
// webpack.config.js
const path = require('path');

module.exports = (config) => {
  // You can directly modify the config object here
  config.entry = path.resolve(__dirname,'../src/index.tsx');
};
```

Because the configuration items of Webpack are more complicated, it is inconvenient to modify the object directly, we recommend using `webpack-merge` to realize the configuration merge.

```javascript
// webpack.config.js
const path = require('path');
// webpack-merge is already dependent on arco-scripts, you don’t need to install it manually
const merge = require('webpack-merge');

module.exports = (config) => {
  // Note that webpack-merge will not directly modify the config object, you need to return the result as a new config
  return merge(config, {
    entry: path.resolve(__dirname,'../src/index.tsx'),
  });
};
```

### **Configure Jest**

Jest configuration items are divided into two parts of configuration, `client` and `node`. This part is a standard Jest configuration item, please refer to [Configuring Jest](https://jestjs.io/docs/en/configuration).

```javascript
// jest.config.js
exports.node = (config) => {
  // Use moduleNameMapper to tell Jest how to parse the package you are developing, which can save the annoying npm link process
  config.moduleNameMapper = {
    '^@arco-design/hello-arco/(.+)$':'<rootDir>/$1',
    '^@arco-design/hello-arco$':'<rootDir>',
  };
};

exports.client = (config) => {
  config.moduleNameMapper = {
    '^@arco-design/hello-arco/(.+)$':'<rootDir>/$1',
    '^@arco-design/hello-arco$':'<rootDir>',
  };
};
```

### **Configuration document generation**

The documentation of the configuration project is generated. **Do not modify** the `output` ** field, it will cause the material website to be unable to find your material document and cause the material preview to fail.

```javascript
// docgen.config.js
module.exports = (config) => {
  config.entry ='src';
  // DON'T change output!!!
  config.output ='docs/README.md';
};
```

### **View current configuration**

We provide the `arco-scripts show:config <configType>` command to quickly view the current effective configuration.

```bash

$ arco-scripts show:config --help

Usage: arco-scripts show:config <configType>

Show your current config for arco-scripts. Valid type: babel|style|webpack.component|webpack.site|webpack.icon|jest|docgen

Options:
  -h, --help output usage information
```

In the project, you can use `npm run show:config - <configType>` to view the currently used configuration.

```bash
$ npm run show:config - style

{
  less: {
    entry: ['src/**/index.less','components/**/index.less' ],
    watch: [
      'src/**/*.{png,jpg,jpeg,gif,svg,ttf,eot,woff,woff2,less}',
      'components/**/*.{png,jpg,jpeg,gif,svg,ttf,eot,woff,woff2,less}'
    ],
    watchBase: {},
    output: {es:'es', cjs:'lib', dist: [Object] },
    compilerOptions: {},
    getFileChangedGlob: [Function: getFileChangedGlob],
    cssJsEntry:''
  },
  asset: {
    entry: [
      'src/**/*.{png,jpg,jpeg,gif,svg,ttf,eot,woff,woff2}',
      'components/**/*.{png,jpg,jpeg,gif,svg,ttf,eot,woff,woff2}'
    ],
    output:'dist/asset'
  }
}

For more details,
