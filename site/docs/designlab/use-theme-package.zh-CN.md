`````
风格配置平台

# 使用主题包

在风格配置平台配置主题并发布之后，可在 npm 看到自己发布出去的 npm 包。以下以 `@arco-design/theme-line` 为例描述使用方式。
`````

## 安装

```bash
npm i @arco-design/theme-line
```

## 在项目中引用

### step1 移除对 Arco 组件库默认样式的引用

确定移除项目中对`@arco-design/web-react` 组件库样式文件的引用，例如 `@arco-design/web-react/dist/css/arco.css`或`@arco-design/web-react/dist/index.less`

### step2 添加配置项

确认下项目是否需要对样式使用**按需加载**

#### 需要按需加载样式

通过 [Arco 构建插件](https://github.com/arco-design/arco-plugins/blob/main/README.zh-CN.md) 实现。

以 webpack 配置为例，引入 `@arco-plugins/webpack-react` 插件。通过 `theme` 字段指定主题包名。

```js
const ArcoWebpackPlugin = require('@arco-plugins/webpack-react');

// webpack config
{
  plugins: [
    new ArcoWebpackPlugin({
        theme: '@arco-design/theme-line'
    })
  ]
}
```

#### 不需要按需加载？（以下二选一即可）

1.  在项目中直接引入less文件

`import '@arco-design/theme-line/index.less';`

2.  在项目中直接引入css文件

`import '@arco-design/theme-line/css/arco.css';`

直接引入css文件时，需要核对和业务项目中使用的组件库版本是否一致。 主要是因为css是在主题发布时候根据指定版本的组件库打包的。

## 常见问题

1. #### 使用开发者模式配置的样式未生效？

如果使用了样式的按需加载，请升级 ArcoWebpack 插件到最新版本

如果未使用样式按需加载，请查看是否在项目中引入了主题包的 `index.less`.
