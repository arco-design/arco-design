`````
物料平台

# 项目模板

了解 Arco 官方提供的各种物料项目模板。
`````

## 官方模板

目前，Arco 提供了以下模板：

- 组件模板 —— 用于创建组件物料；
- 区块模板 —— 用于创建区块物料；
- 页面模板 —— 用于创建页面物料；
- 工具库模板 —— 用于创建函数工具库；
- 组件库模板 —— 用于创建结构类似于 [Arco 组件库](https://github.com/arco-design/arco-design) 的业务组件库项目 **（推荐）** ；
- Monorepo 模板 —— 用于创建基于 Lerna 管理的 Monorepo 项目 **（推荐）** ；

使用上述模板只需在 `arco init` 时选择对应的分类即可。

### 技术栈

Arco 官方模板创建的项目中，使用到了以下技术栈：

- [TypeScript](https://www.typescriptlang.org/)：使用 TypeScript 进行物料开发
- [Less](http://lesscss.org/)：样式开发
- [Jest](https://jestjs.io/)：单元测试和快照测试
- [Storybook](https://storybook.js.org/)：快速进行组件开发预览
- ESLint & StyleLint & Prettier：代码风格检查和格式化相关

### 组件模板

我们用组件模板创建一个物料项目并且进行一次构建，目录结构和详细说明如下：

```
├── .config // arco-scripts 配置项，包括构建、测试、文档生成，详情可见下一章节 [自定义配置]
│   ├── babel.config.js
│   ├── docgen.config.js
│   ├── jest.config.js
│   ├── style.config.js
│   └── webpack.config.js
│
├── .storybook // Storybook 配置项，详情可参考 https://storybook.js.org/docs/react/configure/overview
│   ├── main.js
│   └── preview.js
│
├── arco.config.js // arco-cli 配置项
│
├── dist // 构建产物（UMD 版本）
├── docs // 构建产物（Prop 和 Demo 文档）
├── es // 构建产物 （ES 版本）
├── lib // 构建产物 （CJS 版本）
│
├—— src
│   ├── TEMPLATE.md // 用于文档生成的模板
│   ├── __test__ // 单元测试目录
│   │   ├── __snapshots__ // 基于 Demo 生成的组件快照
│   │   ├── demo.test.tsx // 快照测试
│   │   └── index.test.tsx // 组件逻辑测试
│   ├── demo // Demo 目录
│   │   └── basic.jsx
│   ├── index.tsx
│   └── style
│       ├── index.less
│       └── index.ts
│
├── stories // Storybook 预览入口
│   └── stories.jsx // 在这个文件里将 Demo 作为 Story 暴露
│
└── tests // Jest 单元测试入口和工具函数
    ├── demoTest.tsx
    ├── mockDate.js
    ├── mountTest.tsx
    └── setup.js
```

组件模板非常适合快速熟悉 Arco 物料的开发发布流程，但其一个项目只能对应一个物料，当你的团队需要共建物料时，这将使维护、发版变得异常复杂。因此我们推荐你使用 Monorepo 项目来统一管理你的所有物料。

### Monorepo 模板 [推荐]

**Monorepo 模板依赖 Lerna 和 Yarn，请确保你已经全局安装了这两个 NPM 包。**

使用 Monorepo 模板管理团队的所有物料是 Arco 推荐的最佳实践，下边我们将详细介绍这个模板。通过 `arco init` 创建的 Monorepo 项目是一个不包含任何 Package 的骨架项目，目录结构和详细说明如下：

```
├── .storybook // Storybook 配置项，详情可参考 https://storybook.js.org/docs/react/configure/overview
│   ├── main.js
│   └── preview.js
│
├── tests // Jest 单元测试入口和工具函数
│   ├── demoTest.tsx
│   ├── mockDate.js
│   ├── mountTest.tsx
│   └── setup.js
│
├── packages // lerna workspace
│
├── arco.config.js // arco-cli 配置项
├── arco.scripts.config.js // 所有 package 公用的 arco-scripts 配置项
├── lerna.json
├── package.json
└── tsconfig.json // 所有 package 公用的 ts 配置
```

初始化项目骨架之后，你可以通过 `yarn run add:package -- yourPackageName` 来添加第一个物料，创建出来的物料与组件模板大致相同，但其所有的依赖项都已经被提至最外层。一个创建好的 Package 的目录结构和详细说明如下：

```
├── .config // 扩展 arco-scripts 配置项，包括构建、测试、文档生成，详情可见下一章节 [自定义配置]
│   ├── babel.config.js
│   ├── docgen.config.js
│   ├── jest.config.js
│   ├── style.config.js
│   └── webpack.config.js
│
├── dist // 构建产物（UMD 版本）
├── docs // 构建产物（Prop 和 Demo 文档）
├── es // 构建产物 （ES 版本）
├── lib // 构建产物 （CJS 版本）
│
├── src // 同组件模板
│   ├── TEMPLATE.md
│   ├── __test__
│   ├── demo
│   ├── index.tsx
│   └── style
|
├── stories // Storybook 预览入口
│   └── stories.jsx // 在这个文件里将 Demo 作为 Story 暴露
│
├── README.md
├── package.json
└── tsconfig.json // 扩展 TS 配置，继承项目根目录的 tsconfig.json
```

以上，我们了解了 Monorepo 模板的项目结构。相对于普通的单组件模板，它的差异主要表现在：

- 公共依赖项提升至根目录
  - 项目根目录的 `package.json` 文件中你可以发现这里包含了大量的公共依赖项；
  - 新创建好的 Package 里不包含任何依赖项，你可以通过 `lerna add <pkg> --scope <packageName>` 来为某个 Package 添加特有的依赖项；
- Storybook 位于项目根目录，可同时预览所有的 Package 内容
  - 需要注意的是 Storybook 内置的 Webpack Dev Server 仅负责监听所有 Story 的改变（即 /src/demo 下的文件）；
  - `yarn run dev` 实际上包含了两个步骤：`yarn run storyboook` 和 `lerna run dev`，你也可以通过 Lerna 命令的 `--scope` 参数指定仅监听某个 Package 的源代码变化；

- 物料发包与信息同步
  - 使用 `lerna publish` 命令来发布 NPM 包；
  - 使用 `arco generate` 和 `arco sync` 命令来生成和同步所有的物料元信息。如果仅需对某一个物料进行操作，上述两个命令都支持 `--from-current-package` 参数；

## 自定义模板

arco-cli 允许通过指定模板（本地/线上）来创建项目，通过 `--template` 来指向本地路径或者一个 npm 包，这在你开发自定义模板时将非常有用。

```bash
arco init <projectName> --template [templatePackageName|file:templatePath]

# e.g.
arco init my-site --template @arco-materials/template-core

arco init my-site --template file:../path/to/your/template/acro-template-site
```

关于模板开发的进一步指引，请移步[模板开发](/docs/material/develop-template)。
