`````
Material Market  2.0

# 快速上手

快速了解 2.0 的使用
`````

> 阅读此文档前，我们已经默认你已经掌握了一些物料开发所需要的基础知识：

* [NPM](https://docs.npmjs.com/getting-started)：由于我们所有的物料最终都是以 NPM 的形式提供出去，需要对 NPM 包的开发流程有基础的了解；
* [TypeScript](https://www.typescriptlang.org/)：我们推荐使用 TypeScript 进行物料开发，它可以帮你避免很多因为 JS 灵活的类型产生的代码问题，同时我们的组件 API 文档自动生成功能也依赖于 TypeScript；
* [MDX](https://mdxjs.com/): 我们基于 MDX 进行物料文档的维护，如果你熟悉 Markdown，它将非常容易上手；
* [Lerna](https://lerna.js.org/)：一个对于 Monorepo 的管理工具，如果你需要管理一个多包项目，将会使用到它；


如果你已经可以熟练使用上述工具，请继续阅读下边的文档，我们将指引你快速创建属于你的第一个物料。
## 何为物料
在中后台项目开发中，我们早已习惯了使用 UI 组件库提升开发效率。基础的 UI 组件库极大降低了界面开发成本，但此类组件通常都是一些与业务逻辑完全解耦的原子组件，不能完全满足复杂的业务场景。
实际项目中包含了大量的可以复用的业务逻辑强耦合的模块，例如站点导航条、员工选择器。如何在团队内部最大程度复用基础业务模块以提升效率、降低冗余？物料的概念就是为了解决这一问题，将基础业务模块从项目之中抽离，统一维护，它们便可以被称为「物料」。

除此之外，物料也不仅仅局限于 UI 组件的范畴，我们鼓励将通用的逻辑代码、功能函数、中间层从业务代码中抽离维护，这种非 UI 部件同样也可以作为物料。
## 与 NPM 相比
### 依托 NPM
物料平台基于 NPM 包承载物料产物，从物料开发和使用的本质上来讲，使用物料平台和你自行从 0 创建发布一个 NPM 包并无本质区别。我们所提供的能力主要体现在以下方面：

* 自动化的项目创建：基于 CLI 可以快速初始化一个可用的物料项目，并且配备了完整的开发、构建、测试、文档工具；
* 更好团队协作能力：基于物料团队统一维护和展示团队所有的物料，获得优秀的组件文档站体验；
* 与物料平台的所有开发者共享成果。

### ID 映射
物料平台以组件为最小粒度，而单个 NPM 包可包含多个组件，为此我们以 [包名 + 组件名] 组合来确定物料的 ID。它可能包含以下两种情况：

* 单包组件：以 `@arco-materials/select-with-check-all` 为例，其包内只包含了 `SelectWithCheckAll` 一个组件，此组件对应的物料 ID 为 `@arco-materials/select-with-check-all/SelectWithCheckAll`；
* 组件库：以 `@arco-design/web-react` 为例，其包内包含了多个组件，其组件对应的物料 ID 为 `@arco-design/web-react/ComponentName`。

### 物料版本
物料本身不提供独立的版本控制，其版本完全取决于 NPM 包版本。我们**强烈建议**使用遵循[ Semver（语义化版本）](https://semver.org/)的版本号。
### 引用方式
由于物料产物基于 NPM 托管，所有的物料都可以通过 NPM 包的形式引入：
```JavaScript
import SelectWithCheckAll from '@arco-materials/select-with-check-all';
```

## 初始化工作区
通过以下命令初始化一个 React 组件工作区：
```Bash
npx @arco-cli/generator new workspace-name
```

![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0740ed5120314888b09f8db9e0cb0ac6~tplv-goo7wpa0wc-image.image)

## 新增物料
如果你之前全局安装过 arco-cli 1.x 的 NPM 包，运行 `arco xxx` 命令时，Node 可能会命中 1.x 的 CLI 命令。此种情况下，你可以使用 `npm uninstall arco-cli -g` 卸载 1.x CLI，或使用 `npx arco xxx` 指定 Node 优先从当前项目的 node_modules 中查找可执行命令。

进入上一步创建好的工作区，通过以下命令创建一个空白组件：
```Bash
## 创建空白组件
npx arco create ComponentName
```

## 开发物料
### 工作区预览
进入工作区，并预览此工作的所有物料：
```Bash
$ cd arco-cli-next-demo
$ npm start
```

控制台执行命令，将会得到以下输出：
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7d050ccc02984412aec3cb1de82cbf65~tplv-goo7wpa0wc-image.image)

并自动在浏览器打开工作区页面：
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/4cf1384a2d0b4990821953d8b811ec59~tplv-goo7wpa0wc-image.image)

### 物料目录结构
物料目录结构如下，你可以尝试修改其源码或者文档，更改后页面将自动更新：

```Plain Text
├── package.json
├── src
│   ├── __docs__ ## 组件文档目录
│   │   ├── index.mdx ## 组件帮助文档
│   │   └── basicUsage.tsx ## 单个组件 Demo 置于单个文件内
│   │
│   ├── __test__ ## 组件单元测试目录
│   │   └── index.test.tsx
│   │
│   ├── UserSelect.tsx ## 组件源码
│   ├── index.ts ## 组件主入口
│   ├── interface.ts ## 组件类型定义入口
│   │
│   └── style ## 组件样式入口
│       ├── index.scss
│       └── index.ts
└── tsconfig.json
```

### 提供使用文档
我们以 MDX 的形式维护物料文档，物料文档通常应至少包括「Demo」和「API 文档」两方面的内容。推荐将每个 Demo 都维护在独立文件中，这样文档目录结构清晰，并且 CLI 将自动将 Demo 源码展示在文档中。
```TypeScript
// basicUsage.tsx
import React from 'react';
import UserSelect from '..';

export default function () {
  return <UserSelect selectProps={{ placeholder: 'Please select a user' }} />;
}
```

```Markdown
---
description: Basic button ui component.
labels: ['ui', 'input', 'select-user']
---

Here is some description of this component. You can write:

Markdown syntax:

[Arco](https://arco.design)

or JSX:

<div style={{ display: 'flex', alignItems: 'center', width: 150, height: 150, border: '1px solid grey' }}>
  This box is written via JSX
</div>

## Basic Usage

import BasicUsage from './basicUsage';

<div data-arco-demo="BasicUsage">
  <BasicUsage />
</div>
```

在 MDX 中，你可以书写任意 Markdown 语法、JSX 语法，或者通过 `import` 引入 React 组件。如果你还不熟悉 MDX 的使用，请参阅[此文档](https://mdxjs.com/)。通过以 `<div data-arco-demo="YourDemoName" />` 包裹组件 Demo，我们将会自动将 Demo 对应的源码展示在其下方：
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/535269455044439590f4da9940a7af96~tplv-goo7wpa0wc-image.image)

### 提供 API 文档
我们将在文档页面末尾自动注入 API 文档表格，不必费心书写 Markdown 表格。所需的仅是遵循我们制定的类型的书写规范：
只有带有 `@title` 的 `interface` 或者 `type` 声明都会被提取，可以在 arco.workspace.jsonc 里的 jsdoc 字段指定从哪些文件进行 API 提取。
属性成员有以下可用的描述标签：

* `@zh` 属性的中文描述
* `@en` 属性的英文描述 （可选）
* `@defaultValue` 属性的默认值 （可选）
* `@version` 该属性是从哪个版本新增的 （可选）

```TypeScript
/**
 * @title Button (必填，带有 `title` 描述的接口或者类型才会被收集)
 */
interface ButtonProps {
  /**
   * @zh 按钮尺寸 (属性的中文描述)
   * @en Size of Button (可选，属性的英文描述)
   * @version 1.2.0 (可选，新增的属性在哪个版本开始支持)
   * @defaultValue 'default' (可选，属性的默认值)
   */
  size?: 'mini' | 'small' | 'default' | 'large';
}
```

### 文档拆分
**版本要求：@arco-cli/arco >= 2.1.0**
如果你的组件存在大量的 Demo，可以通过我们提供的内置组件 `ArcoMDXPreviewSplit` 对它们进行拆分。使用方式如下：
```Markdown
// index.mdx
---
title: List
description: Some description about this component.
labels: ['Keyword-1', 'Keyword-2']
apiPlaceholderElementId: api-placeholder
---

import PartOne from './part1.mdx';
import PartTwo from './part2.mdx';

<ArcoMDXPreviewSplit panes={
  [
    { title: 'Part One', content: <PartOne /> },
    { title: 'Part Two', content: <PartTwo /> },
    { title: 'API', content: <div id="api-placeholder" /> }
  ]
} />
```

组件的 API 文档默认会渲染到当前文档的底部，你可以通过 MDX 的头部元信息 `apiPlaceholderElementId` 指定其渲染节点的 DOM ID。上边的文档将以以下形式渲染：
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8a18ce45b7074998be33860371408e1e~tplv-goo7wpa0wc-image.image)

## 发布物料
### 构建物料
在准备发布物料前，请确保完成物料构建。
```Bash
## 构建工作区内的所有物料
$ arco build
```

![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/403abe878cff4102acfa0540e06dcc0a~tplv-goo7wpa0wc-image.image)

### 发布至 NPM
完成物料构建后，检查其包产物，应该包含以下目录：
```Plain Text
├── es ## 符合 ESModule 规范的产物
├── lib ## 符合 CommonJS 规范的产物
└── artifacts ## 物料文档及其预览文件（仅用于物料平台的物料预览）
```

确认无误后，修改 `package.json` 版本号并发布 NPM 包：
```Bash
$ npm publish
```

如果你没有 NPM 包的发布经验，请阅读 NPM 文档以获得帮助。
### 同步至物料平台
如果你是 ByteDance 内网用户，请使用 `arco host arco.bytedance.net` 命令将 CLI 中所使用的 Arco 域名切换至内网版本。

通过以下命令，可以将工作区内的所有物料同步至物料平台：
```Bash
## 同步工作区的所有物料至物料平台
$ arco sync
```

`sync` 命令需要对用户身份进A行校验，在执行此命令前请确认你已通过 `arco login` 命令进行过用户登录。
如果需要在 CI 流程中进行身份校验，可以通过 Node 环境变量携带用户 Token 信息：
`ARCO_CONFIG_X_ARCO_ACCESS_TOKEN=YOUR_ACCESS_TOKEN arco sync`
用户 Token 可通过以下途径获得：物料平台首页 -> 点击右上用户头像 -> 点击“个人中心” -> 点击“新增秘钥”

![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a9e4ebdc287c4c24b17a8ccb3f8e9360~tplv-goo7wpa0wc-image.image)

同步成功后，你可以至 [物料平台] - [我的物料] 查看刚刚发布的物料：

<div class="markdown-img-layout-2">
  <img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/959331ca87f447589147f4eb4a848634~tplv-goo7wpa0wc-image.image"/>
  <img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9d12f46733544d9094a3dcd74e68ea6f~tplv-goo7wpa0wc-image.image"/>
</div>

## Tips
### 对特定组件执行命令
Arco CLI 的 `start/build/test/sync` 命令均支持指定组件 ID 过滤规则来仅对特定的组件执行命令。
假设你的工作区存在 ID 分别为 library/Button、 library/ButtonPro、 pro-table/Table 的三个组件，你可以通过以下规则来对其进行过滤：
```Bash
## 默认过滤规则为组件 ID 包含给定的字符
## 将得到 library/Button、library/ButtonPro
arco start library

## 规则中包含 * 字符时，将通过 Glob 规则进行过滤
## 将得到 library/Button、library/ButtonPro
arco start Button*

## 手动指定过滤规则（CLI Version >= 2.4.1）

## is: 进行精确匹配，将得到 library/Button
arco start is:library/Button
## reg: 进行正则匹配，将得到 library/Button、library/ButtonPro
arco start reg:Button$
## glob: 进行 Glob 匹配，将得到 library/Button、library/ButtonPro
arco start glob:library/*

## 多个过滤规则之间可以通过逗号分隔
arco start reg:Button$,ButtonPro$
arco start is:library/Button,pro-table/Table
```



