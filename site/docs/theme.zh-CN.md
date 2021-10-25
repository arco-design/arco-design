`````
开发指南

# 定制主题

默认提供了一套蓝色主题（ArcoBlue），用户可以根据自己的需求定制新主题，以满足业务和品牌上的多样化需求。
`````

```js:react
import ACCard from '../src/widget/Card';

<ACCard
  title="Design Lab 风格配置平台"
  description="使用风格配置平台，轻松定制主题风格，从容应对各种业务需求。"
  link="/themes"
  icon="DesignLab"
  buttonText="立即使用"
/>
```

Arco Design定义了一套默认粒子变量，可以通过对粒子变量的修改覆盖来定制主题。我们也提供了 [风格配置平台](/themes) 来满足对自定义设计规范的需求。目前[风格配置平台](/themes) 已支持颜色，字体，边框等基础样式和组件库单个组件的样式定制，欢迎使用 ～

## Less 变量替换

ArcoDesign 使用了 [Less](http://lesscss.org/) 作为预编译语言，通过 Less 的 **modifyVars** 功能，可以很方便的对样式粒子变量进行定制。

全局变量都在 `components/style/theme/global.less`。在组件库内部我们对组件样式变量做了非常细致的抽离提取，例如 `Button`组件对应的 `components/Button/style/token.less` 列表。可以满足对组件细粒度的定制。

在 Webpack 打包的时候，通过 [less-loader](https://github.com/webpack-contrib/less-loader) 的 modifyVars，可以对所有的变量进行替换：

```diff
// webpack.config.js
module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
    }, {
      loader: 'less-loader',
+     options: {
+       modifyVars: {  // 在less-loader@6 modifyVars 配置被移到 lessOptions 中
+         'arcoblue-6': '#f85959',
+       },
+       javascriptEnabled: true
+     },
    }],
    ...
  }],
  ...
}
```

本质上我们采用了 [CSS Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)，所以不兼容 **IE** 浏览器。

**如果需要兼容 IE 浏览器，可以使用 postcss 的 [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) 插件，消除所有的 `CSS Custom properties`。**
