`````
Developer Guide

# Customized Theme

A set of blue theme (ArcoBlue) is provided by default, and users can customize new themes according to their own needs, in order to meet the diverse needs of business and brand.
`````

```js:react
import ACCard from '../src/widget/Card';

<ACCard
  title="Design Lab"
  description="Use the Design Lab platform to easily customize theme and calmly respond to a variety of business needs."
  link="/themes"
  icon="DesignLab"
  buttonText="Goto"
/>
```

Arco Design defines a set of default particle variables, and you can customize theme by modifying and overlaying the particle variables. You can also customize your theme on  the platform of [Design System](/themes).

## Less Variable Replacement

ArcoDesign uses [Less](http://lesscss.org/) as the pre-compiled language. Through the **modifyVars** function of Less, you can easily customize the style particle variables.

Global variables are all in `components/style/theme/global.less`. Inside the component library, we have done a very detailed extraction of component style variables, such as the `components/Button/style/token.less` corresponding to the `Button` component, which can meet the fine-grained customization of components. **(If it prompts 404, click** [**here**]() **for permission application)**

When Webpack is packing, all variables can be replaced by modifyVars of [less-loader](https://github.com/webpack-contrib/less-loader):

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

In essence, we‘ve adopted [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), so it is not compatible with **IE** browser.

**If you need to be compatible with IE browser, you can use** [**the postcss-custom-properties**]() **plug-in, to eliminate all** ``
