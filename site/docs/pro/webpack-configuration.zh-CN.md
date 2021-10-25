`````
Arco Pro

# Webpack 配置

Pro 中的 webpack 配置
`````

Arco CLI 是基于 webpack 的，并且开放了 webpack 配置，这样我们能够根据项目需要进行灵活的配置。

> Arco CLI 默认的 webpack 配置，可查看项目中 node_modules/@arco-design/arco-scripts/config/webpack/site.js

Pro 的 webpack 配置，在根目录下的 `.config/webpack.config.js` 中，先看一下大概结构

```js
exports.site = (config, env) => {
  // modify config
};
```

这边的 config 就是默认的 webpack 配置，我们就是通过修改它来修改 webpack 配置的。

> Pro 的 webpack 配置中存在一些关于 preview 的配置，是用于部署 preview 站点的，可自行删除。

## 指定输入输出

```js
config.context = path.resolve(__dirname, '..'); // 上下文

config.entry = path.resolve(__dirname, '../src/index'); // 输入

config.output.path = path.resolve(__dirname, '../dist'); // 输出
```

## 指定 html 模版

```js
config.plugins[0] = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
});
```

html 模版是通过 HtmlWebpackPlugin 指定的，通过查看默认配置发现它在 plugin 的第一个，所以这边直接替换掉了 config 的第一个 plugin。

## 支持 css module

```js
// css 配置增加 modules
const cssOptions = {
  modules: true,
  localIdentName: 'arco-pro-[local]-[hash:base64:5]'
};

config.resolve.modules = ['node_modules'];

// 替换 css-loader 配置
config.module.rules[5].use[1].options = cssOptions;

// 排除 node_modules
config.module.rules[5].exclude = [/node_modules/];

// 新增一条 less rule 处理 node_modules
config.module.rules.push({
  test: /.less$/,
  include: [/node_modules/],
  use: [
    {
      loader: env === 'dev' ? 'style-loader' :  MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      },
    },
  ],
});
```

添加 css module 首先是从原本的 less 配置中将 node_module 排除，加上 css module 配置。然后再增加一条 less 配置，只包含 node_modules。这样就能实现项目中的代码有 css module，而 node_module 里面的样式不开启 css_module。

## 支持样式按需引入

Pro 采用了 `@arco-design/webpack-plugin` 来实现样式的按需引入

```js
const ArcoDesignWebpackPlugin = require('@arco-design/webpack-plugin');

config.plugins.push(new ArcoDesignWebpackPlugin());
```

## 支持主题引入

Pro 采用 `@arco-design/webpack-plugin` 来导入风格配置平台的主题，只需要两步

1.  安装好主题包
1.  将主题包名配置到 ArcoDesignWebpackPlugin 上

```js
config.plugins.push(new ArcoDesignWebpackPlugin({
  theme: '@arco-design/theme-first',
}));
```

以上是 Pro 的 webpack 配置中的几个主要的点，这些修改都需要结合默认 webpack 配置来理解，但是已经有很大的灵活度，大家可以根据自己的需要来修改。
