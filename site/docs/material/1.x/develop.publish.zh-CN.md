`````
物料平台

# 发布物料

了解物料的发布流程。
`````

首先，需要明确的是物料以 NPM 包的形式存在，托管在 NPM 上，而物料平台仅仅是将你的物料信息进行汇总后将其展示，并提供更好的团队协作和物料共享的能力。

**注意**：只有 NPM 包的 owner 才能发布和进行物料信息同步。
**注意**：发布到 NPM 的时候，要确保远程仓库有 push 权限并且为 NPM 包的 maintainer。

## 发布至 NPM

在完成物料的开发、测试之后，你就可以将其发布至 NPM 了，你可以选择手动使用 `npm publish` 来发包，或者使用 arco-scripts 提供的 `arco publish` 命令，此命令将发包流程大大简化。

```

arco publish
```


`arco publish` 会弹出下拉选项选择需要发布的版本（严格按照 Semver 规范生成的版本选择）。

## 初始化物料信息

此命令将会在项目根目录中生成 `arcoMeta.json` 文件，字段如下：

```
{
  "private": false,
  "name": "@arco-design/hello-arco",
  "title": "Arco 示例物料",
  "description": "",
  "type": "react-component",
  "category": ["其他"],
  "group": 0,
  "homepage": "",
  "repository": "",
  "author": "arco",
  "package": {
    "type": "npm",
    "name": "",
    "version": "",
    "registry": "",
    "peerDependencies": []
  }
}
```

在 Lerna 项目中，你可以在任何目录下的任何目录执行 `arco generate` 命令。

## 同步物料信息

在首次发布至 NPM 或者修改了 `arco.meta.json` 字段时，你需要运行以下命令将其同步至物料平台。

```bash
arco sync
```

在 Lerna 项目中，你可以在任何目录下的任何目录执行 `arco sync` 命令。

## 指定物料版本

物料信息同步成功之后，会自动补充 `arcoMeta.json` 中的 NPM 包相关信息。通过 `package.version` 字段可以指定物料平台使用的物料版本，以下为 `version` 字段的两种不同写法：

- `latest`: 传入 dist-tags，使用这种方式可以避免每次发版之后都需要手动同步物料信息，使用 `npm view` 可以查看当前可用的 dist-tags；
- `1.0.0`: 传入具体版本号，每次 NPM 发版之后需要手动执行 `arco sync` 以更新版本号。

## 发布前 Demo 预览

执行 `arco preview` 命令预览物料详情页，你可以在确保一切合乎预期之后再执行 NPM 发包，工具将会从当前文件夹启动文件服务器，物料网站将尝试从本地获取 `dist` 和 `docs/README.md` 文件。
