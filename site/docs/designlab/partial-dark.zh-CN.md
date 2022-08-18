`````
风格配置平台

# 局部暗黑样式

本篇文档会告诉你怎么在页面中局部应用组件库的暗黑样式。
`````

## 使用场景

在组件库内部默认暗黑样式是挂载在 body 上的 ，具体如何切换可[点击此处](/react/docs/dark)查看。具体表现也可在官网点击右上角切换主题进行查看。

但在实际业务场景中可能出现需要部分页面或者页面的部分内容呈现暗黑样式（尽管少，但确实存在），此时可以通过修改 `less` 变量 `arco-theme-tag` 的值来改变暗黑样式的应用位置，实现以下效果

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/44b876a885f446958735322a2312e87f~tplv-uwbnlip3yd-image.image)

## 实现步骤

使用该功能只需要以下几步：

### 确认项目中引用的是组件库的 less 样式文件，而非 css。

因为要修改`less`变量，所以项目必须对`less`进行编译。

### 在 `less-loader` 中配置覆盖变量 `arco-theme-tag` 的值。

例如配置 ` arco-theme-tag  `为 `.arco-theme`。

```diff
// webpack.config.js
module.exports = {
  rules: [{
    test: /.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
    }, {
      loader: 'less-loader',
+     options: {
+       modifyVars: {  // 在less-loader@6 modifyVars 配置被移到 lessOptions 中
+         'arco-theme-tag': '.arco-theme',
+       },
+       javascriptEnabled: true
+     },
    }],
    ...
  }],
  ...
}
```

### 在html标签添加类名

在body标签上添加类名 `arco-theme`，并在想要应用暗黑样式的标签上设置类名 `arco-theme` 以及添加属性 `arco-theme=dark`，即可实现如下图所示的页面部分呈现暗黑样式的效果。

p.s: 在body上添加类名是因为所有的css变量都定义在`.arco-theme`上，如果不设置将会出现样式展示问题。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/645188ba397d408e9a2d40a88fdf97b6~tplv-uwbnlip3yd-image.image)
