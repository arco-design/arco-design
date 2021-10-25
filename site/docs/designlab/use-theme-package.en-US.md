`````
DesignLab

# Use theme package

After the theme is configured and published by the style configuration platform, you can see the npm package published by yourself on npm. The following uses `@arco-design/theme-line` as an example to describe how to use it.
`````

*Auto translate by google.*

## Install

```
npm i @arco-design/theme-line
```

## Use in the project

### step1 Remove the reference to the default style of the Arco component library

Make sure to remove references to the `@arco-design/web-react` component library style files in the project, such as `@arco-design/web-react/dist/css/arco.css` or `@arco-design/web -react/dist/index.less`

### step2 Add configuration items

Confirm whether the project needs to use **load on demand** for the style

#### Need to load styles on demand

Introduce the theme package through the ArcoWebpack plugin (recommended `1.5.0` version and above)

Introduce the `@arco-design/webpack-plugin` plugin in the webpack configuration. Specify the theme package name through the `theme` field.

```js
const ArcoWebpackPlugin = require('@arco-design/webpack-plugin');

// webpack config
{
  plugins: [
    new ArcoWebpackPlugin({
        theme:'@arco-design/theme-first'
    })
  ]
}
```

#### Don’t need to load on demand? (Choose one of the following two)

1. Introduce the less file directly into the project

`import'@arco-design/theme-first/index.less';`

2. Import css files directly into the project

`import'@arco-design/theme-first/css/arco.css';`

When directly importing the css file, you need to check whether it is consistent with the component library version used in the business project. Mainly because the css is packaged according to the specified version of the component library when the theme is released.

## QA

1. #### The style configured using the developer mode does not take effect?

If you use the on-demand loading of styles, please upgrade the ArcoWebpack plugin to at least version `1.5.0`.

If you don’t use styles to load on demand, please check if you have introduced the theme package `index.less` in your project.
