`````
Arco Pro

# 打包构建

打包代码
`````

## 打包构建

当代码书写完成后，执行以下命令即可打包代码

```bash
npm run build
```

该命令调用的是 `arco run build:site` 是 Arco Cli 提供的打包命令，打包完成后，会在根目录生成 `dist` 文件夹，这里面就是可以用于部署的代码。

arco cli 是基于 webpack 的，同时开放了 webpack 配置，如果你需要自定义配置，可以在根目录下 新建 `.config/webpack.config.js` 来修改配置，如下：

```js
exports.site = (config, env) => {
  config.output.path = path.resolve(__dirname, '../prod');
};
```

需要修改的是 config 变量，这个变量就是默认的 webpack 配置项，你按照 webpack 配置来修改它就可以了。
