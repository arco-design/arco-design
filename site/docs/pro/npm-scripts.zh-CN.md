`````
Arco Pro

# npm 命令

package.json script 预置方便实用的命令
`````

Pro 以 Arco CLI 为开发构建工具，Arco CLI 提供了丰富实用的 API，本文主要介绍 Pro 的几个基于 Arco CLI 的构建命令。

## 本地开发

```bash
npm run dev
```

调用的 api 如下

```json
{
  "scripts": {
    "dev": "arco-scripts dev:site --port 9090"
  }
}
```

这样会在 `0.0.0.0:9090` 启动应用。

该命令调用了 `arco-scripts dev:site`， 这个 api 支持传递两个参数： `ip` 和 `port`，且这两个参数的优先级高于 webpack 配置文件。

我们可以通过这个 api 指定 host 和 端口，如下

### 指定 host 为 localhost

```json
{
  "scripts": {
    "dev": "arco-scripts dev:site --ip localhost"
  }
}
```

### 指定端口为 8080

```json
{
  "scripts": {
    "dev": "arco-scripts dev:site --port 8080"
  }
}
```

注意这两个参数的优先级高于 webpack 配置文件。

其他 dev server 参数的修改请参考 webpack 配置章节，通过了解 webpack 配置流程来修改。

## 构建生产

```bash
npm run build
```

调用的 api 如下

```json
{
  "scripts": {
    "dev": "arco-scripts build:site"
  }
}
```

该命令根据提供的 webpack 配置构建生产环境代码，具体配置请看 webpack 配置章节。

## 代码检查

```bash
npm run eslint & npm run stylelint
```

Pro 的代码风格检查依赖于 eslint 和 stylelint，同时还使用了 prettier，是业界主流的搭配。配置项可见于根目录下的 `.esintrc` ，`.prettierrc` 和`.stylelintignore`。
