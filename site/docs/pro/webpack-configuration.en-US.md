`````
Arco Pro

# Webpack configuration

Webpack configuration in Pro
`````

*Auto translate by google.*

Arco CLI is based on webpack, and the webpack configuration is open, so that we can configure it flexibly according to the needs of the project.

> Arco CLI default webpack configuration, you can check node_modules/@arco-design/arco-scripts/config/webpack/site.js in the project

Pro’s webpack configuration, in the root directory `.config/webpack.config.js`, first look at the general structure

```js
exports.site = (config, env) => {
  // modify config
};
```

The config here is the default webpack configuration, and we modify the webpack configuration by modifying it.

> There are some preview configurations in Pro's webpack configuration, which are used to deploy the preview site and can be deleted by yourself.

## Specify input and output

```js
config.context = path.resolve(__dirname,'..'); // context

config.entry = path.resolve(__dirname,'../src/index'); // input

config.output.path = path.resolve(__dirname,'../dist'); // output
```

## Specify html template

```js
config.plugins[0] = new HtmlWebpackPlugin({
  template: path.resolve(__dirname,'../public/index.html'),
});
```

The html template is specified by HtmlWebpackPlugin. By checking the default configuration, it is found that it is the first plugin of the plugin, so the first plugin of config is directly replaced here.

## Support css module

```js
// css configuration adds modules
const cssOptions = {
  modules: true,
  localIdentName:'arco-pro-[local]-[hash:base64:5]'
};

config.resolve.modules = ['node_modules'];

// Replace css-loader configuration
config.module.rules[5].use[1].options = cssOptions;

// Exclude node_modules
config.module.rules[5].exclude = [/node_modules/];

// Add a less rule to process node_modules
config.module.rules.push({
  test: /.less$/,
  include: [/node_modules/],
  use: [
    {
      loader: env ==='dev'?'style-loader': MiniCssExtractPlugin.loader,
    },
    {
      loader:'css-loader',
    },
    {
      loader:'less-loader',
      options: {
        javascriptEnabled: true,
      },
    },
  ],
});
```

Add css module The first is to exclude node_module from the original less configuration and add css module configuration. Then add a less configuration that only contains node_modules. In this way, the code in the project has a css module, and the style in node_module does not open css_module.

## Support styles to be introduced on demand

Pro uses `@arco-design/webpack-plugin` to implement the on-demand introduction of styles

```js
const ArcoDesignWebpackPlugin = require('@arco-design/webpack-plugin');

config.plugins.push(new ArcoDesignWebpackPlugin());
```

## Support theme introduction

Pro uses `@arco-design/webpack-plugin` to import the theme of the style configuration platform, only two steps are required

1. Install the theme package
1. Configure the theme package name to ArcoDesignWebpackPlugin

```js
config.plugins.push(new ArcoDesignWebpackPlugin({
  theme:'@arco-design/theme-first',
}));
```

The above are the main points in Pro's webpack configuration. These modifications need to be understood in conjunction with the default webpack configuration, but there is already a lot of flexibility, and you can modify it according to your needs.
