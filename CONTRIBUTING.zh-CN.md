
> [English](./CONTRIBUTING.md) | 简体中文

# 贡献指南

感谢你的宝贵时间。你的贡献将使这个项目变得更好！在提交贡献之前，请务必花点时间阅读下面的入门指南。

## 行为准则

该项目有一份 [行为准则](./CODE_OF_CONDUCT.md)，希望参与项目的贡献者都能严格遵守。

## 透明的开发

所有工作都直接透明地在 GitHub 上进行。核心团队成员和外部贡献者的 pull requests 都需要经过相同的 review 流程。

## 语义化版本

该项目遵循语义化版本。我们对重要的漏洞修复发布修订号，对新特性或不重要的变更发布次版本号，对重大且不兼容的变更发布主版本号。

每个重大更改都将记录在 changelog 中。

## 报告 Issues

我们使用 [Github issues](https://github.com/arco-design/arco-design/issues) 进行 bug 报告和新 feature 建议。在报告 bug 之前，请确保已经搜索过类似的 [问题](https://github.com/arco-design/arco-design/issues)，因为它们可能已经得到解答或正在被修复。新问题应通过 [问题助手](https://arco.design/issue-helper?repo=arco-design) 提交。对于 bug 报告，请包含可用于重现问题的代码。对于新 feature 建议，请指出你想要的更改以及期望的行为。

## 提交 Pull Request

**本项目使用 [Yarn](https://yarnpkg.com/) 进行包管理，请在开发前准备你的 Yarn 环境。**

### 共建流程
- 认领 issue： 在 github 建立 issue 并认领（或直接认领已有 issue），告知大家自己正在修复，避免重复工作。
- 项目开发：在完成开发前准备后，进行 bug 修复或功能开发。
- 添加单测：针对代码变动添加单元测试，执行 yarn test -- ./components/xxx/，确认测试用例通过，尽量保证一定的测试覆盖率。
- 更新快照：如果涉及到组件 dom 层级变动，类名增删或新增/删除了 Demo，快照可能需要重新生成一下。执行 yarn build:cjs && yarn test:client -u ./components/xxx
- 文档生成：组件 API 存在调整时针对当前组件 yarn docgen ./components/xxx重新生成文档。
- 提交 PR


### 开发前准备
1. 克隆代码仓库
```bash
$ git clone git@github.com:arco-design/arco-design.git
```
2. 开发环境初始化
```bash
$  cd arco-design && yarn run init
# init 命令到底干了什么？
# 执行 yarn install 安装依赖
# 执行 yarn icon，将 svg 打包成 React 组件，以供 Icon 组件使用
# 执行 yarn build， 打包组件库源代码
# 进入到 site 目录，执行 yarn install
```

3. 启动项目
```bash
# 编译组件库 es 产物，本地调试时必须启动，因为官网/storybook 都是从 es 目录下引用的组件
$ yarn dev
# 启动官网
$ yarn dev:site
# 启动 storybook 。 这里启动不启动都可以，官网也可以调试
$ yarn demo
```
### 使用docker-compose启动
```bash
$ docker-compose up

```

### 常用的命令

```bash

# 开发模式自动监听 js 文件和 css 文件的变动，自动重新编译代码
$ yarn dev

# 生产模式，压缩打包组件代码
$ yarn build

# 开发模式下，启动官网预览，可访问 http://localhost:9000 进行组件调试
$ yarn dev:site

# 启动 stroybook 预览，速度相对较快，不用在官网调试组件
$ yarn demo

# 把 icon/_svgs 里的 svg 图片生成 React 组件，并且生成 demo.js，用于组件官网中的图标示例。
$ # 这个命令一般只在项目初始化的时候走一遍，只有在图标有改动的时候才需要再次执行
$ yarn icon

# 执行测试用例，包括客户端和服务端渲染测试
$ yarn test

# 更新快照：组件有类名/dom变动时需要执行
$ yarn test:client -- -u

# 组件 API 文档生成：组件新增功能或修改类型定义时，需要执行
$ yarn docgen

```

## Commit 指南

Commit messages 请遵循[conventional-changelog 标准](https://www.conventionalcommits.org/en/v1.0.0/)：

```bash
<类型>[可选 范围]: <描述>

[可选 正文]

[可选 脚注]
```

### Commit 类型

以下是 commit 类型列表:

- feat: 新特性或功能
- fix: 缺陷修复
- docs: 文档更新
- style: 代码风格或者组件样式更新
- refactor: 代码重构，不引入新功能和缺陷修复
- perf: 性能优化
- test: 单元测试
- chore: 其他不修改 src 或测试文件的提交

## 项目结构

### 组件目录

> components/componentName

```
├── README.zh-CN.md (最终用来生成中文文档的入口，注意：不要编辑这个文件，这个文件是自动生成 的。)
├── README.en-US.md (最终用来生成英文文档的入口，手动维护)
├── TEMPLATE.md （用来生成 README.md 的模版，这个文件是用来编辑的。）
├── __test__
│   ├── __snapshots__
│   │   └── demo.test.js.snap （快照测试的信息）
│   ├── demo.test.js （提取demo文件夹中的代码，进行自动快照测试）
│   └── xxx.test.js （单元测试的代码）
├── demo （这个目录存放该组件的demo代码和介绍，也是用来生成组件文档的一部分，注意：每个文件只写一个代码块，也就是一个demo）
│   ├── basic.md
│   └── custom_icon.md
├── index.tsx （组件代码）
└── style
    ├── token.less （组件 less 变量）
    └── index.less （组件样式，类名的命名空间为 arco-{组件名}）
```
### 辅助函数
components/_utils 文件夹中存放着一些辅助函数，按需使用。

### 通用组件
components/_class 文件夹中存放着一些通用的类，像虚拟滚动组件等。

### 模版

`__template__` 目录中的模板用于通过 `yarn docgen` 命令生成组件的 README。它遵循以下结构：

~~~markdown
---
file: interface (指定查找 interface 信息的位置，用于生成 props)
---

`````
组件 / 反馈

# 警告提示 Alert

向用户显示警告的信息时，通过警告提示，展现需要关注的信息。
`````

%%Content%% (演示占位符)

## API

%%Props%% (Props 占位符)
~~~

请注意: 如果进行了会影响 README 的变更（例如 `props` 变更），请确保运行 `yarn docgen` 来更新组件的 README。

### Changelog

`__changelog__` 目录中的更新日志文件是在发版时由脚本自动生成的。 请勿手动编辑这些文件。

## License

[MIT 协议](./LICENSE).
