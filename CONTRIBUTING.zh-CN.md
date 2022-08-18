
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

1. Fork [此仓库](https://github.com/arco-design/arco-design)，从 `main` 创建分支。新功能实现请发 pull request 到 `feature` 分支。其他更改发到 `main` 分支。
1. 在仓库根目录下执行 `yarn run init`。
1. 执行 `yarn start` 启动和预览站点.
1. 对代码库进行更改。如果适用的话，请确保写了相应的测试。
1. 确认执行 `yarn test` 后所有的测试都是通过的。开发过程中可以用 `yarn test:watch TestName` (例如 `yarn test:watch Alert`) 来运行指定的测试以节省时间。

    注意: 在个人电脑运行 `yarn test` 可能导致资源高占用、甚至系统卡死。另一种测试方法是：
    1. 在你的 fork 中启用 Github Action
    2. 在你的 fork 内创建一个**内部 PR** 以触发 CI
    3. 在你的 fork 中查看测试结果


1. 如果进行了任何 `props` 更改（即 `interface.ts` 文件），请不要手动更新组件下的 `README` 文件。运行 `yarn docgen` 会自动生成 `README` 文件。
1. 提交 git commit, 请同时遵守 [Commit 规范](#commit-指南)。
1. 提交 pull request, 如果有对应的 issue，请进行[关联](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)。

### 常用的命令

```bash
# 本地启动和预览站点
$ yarn dev:site

# 检查 javascript 代码规范
$ yarn eslint

# 检查 样式 代码规范
$ yarn stylelint

# 自动化生成文档
$ yarn docgen

# 格式化代码
$ yarn format

# 组件构建
$ yarn build

# 运行完整的单元测试
$ yarn test

# 启动 Storybook 以预览或调试组件 （无热加载，需要先 `yarn build` 才能使用变更后代码）
$ yarn demo
```

### 组件 demo

组件 demo 为一个完整的代码片段，建议使用 `tsx` 标记代码块语言，并安装[TS in Markdown](https://marketplace.visualstudio.com/items?itemName=amour1688.ts-in-markdown)，以便在编辑器中获得语法提示。代码块里的「默认导出」就是 demo 的渲染内容。

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
├── README.zh-CN.md (注意：不要编辑这个文件，它是由脚本自动生成的)
├── README.en-US.md (注意：不要编辑这个文件，它是由脚本自动生成的)
├── __template__ （用于生成 README 文件的模板）
│   ├── index.en-US.md (英文模版)
│   └── index.zh-CN.md （中文模版）
├── __changelog__
│   ├── index.en-US.md (注意：不要手动编辑这个文件，它是在发版时由脚本自动生成的)
│   └── index.zh-CN.md (注意：不要手动编辑这个文件，它是在发版时由脚本自动生成的)
├── __test__
│   ├── __snapshots__
│   │   └── demo.test.js.snap
│   ├── demo.test.ts (快照测试)
│   └── index.test.ts （单元测试）
├── __demo__ （组件演示）
│   ├── basic.md
│   └── advanced.md
├── index.tsx（组件导出）
└── style
    └── index.less（组件样式）
    └── index.ts (组件样式导出)
```

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
