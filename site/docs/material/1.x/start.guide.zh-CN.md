`````
物料平台

# 物料指南

快速了解 Arco 物料概念，创建你的第一个物料。
`````

[Arco 物料平台](https://arco.design/material) 服务于前端技术团队，致力于增强团队协作、促进资源共享、提升开发效率。我们基于来自 ArcoDesign 组件库的技术沉淀，提供了简单易学的物料开发方案。

## 何为物料

在中后台项目开发中，我们早已习惯了使用 UI 组件库提升开发效率。基础的 UI 组件库极大降低了界面开发成本，但此类组件通常都是一些与业务逻辑完全解耦的原子组件，不能完全满足复杂的业务场景。

实际项目中包含了大量的可以复用的业务逻辑强耦合的模块，例如站点导航条、员工选择器。如何在团队内部最大程度复用基础业务模块以提升效率、降低冗余？物料的概念就是为了解决这一问题，将基础业务模块从项目之中抽离，统一维护，它们便可以被称为「物料」。

## 物料分类

在 Arco 的物料体系中，我们将物料细分为了三个种类：组件、区块、页面。

### 组件

组件的概念与 Arco 提供的基础组件最为接近，它们是页面的基础元素构成，但是可能与业务逻辑产生了耦合。使用方式与组件库保持一致，通过引入 NPM 依赖来引用组件。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ee537a3b3da4d336517f0c81e1ec3ca.png~tplv-uwbnlip3yd-webp.webp)

### 区块

区块相比组件更为复杂，可以理解为多个组件的集合。一个页面通常由若干个区块组成，开发者可以将区块添加到自己的页面进行二次开发。由于区块的复杂性和二次开发的需求存在，区块使用方式与组件不同，本质上是将区块的源码直接下载到本地项目之中。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fc4eea64d19e85e4f1135c95e76e3cde.png~tplv-uwbnlip3yd-webp.webp)

### 页面

页面即其字面意思，使用方式与区块类似。典型的例子为 [ArcoDesign Pro](https://arco.design/pro/) 所提供的页面。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b4e39a05533707af57ce5a083d93ad3f.png~tplv-uwbnlip3yd-webp.webp)

## Arco CLI

为了方便开发者快速搭建物料项目、管理使用物料。Arco 提供了基于 Node 的脚手架工具 arco-cli，它大致包含了以下的功能：

- 根据模板创建基于 ArcoDesign 的物料项目；
- 发布、管理、使用物料；
- 在项目中使用物料区块或者页面；

在开始进一步的流程体验之前，你需要通过 ` npm i arco-cli -g` 全局安装 Arco CLI。

## 新建项目

通过 Arco CLI，我们可以快速新建一个基于 ArcoDesign 的物料项目。使用 `arco init yourProjectName` 初始化项目：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cceb75d805f175694a3e907c490e5e84.png~tplv-uwbnlip3yd-webp.webp)

执行命令之后，我们需要选择所需创建的项目类型。我们前边介绍了物料分为「组件、区块、页面」三个类型，但 CLI 界面包含了 6 个选项，他们的具体含义如下：

- 组件：创建一个「组件物料」的「基础」项目；
- 区块：创建一个「区块物料」的「基础」项目；
- 页面：创建一个「页面物料」的「基础」项目；
- 组件库：创建一个「组件物料」的「library 库」项目；
- Lerna Monorepo：创建一个「组件物料」的基于 Lerna 管理的「monorepo 库」项目；
- ArcoDesign Pro 项目：创建一个基于 ArcoDesign Pro 的前端工程项目。

上述项目类型之间主要是物料组织形式的不同：

- 「基础」项目表示该项目包含一个 NPM 包，并且仅包含一个物料；
- 「library 库」项目表示该项目包含一个 NPM 包，但是包含了多个物料；
- 「monorepo 库」项目表示该项目包含多个 NPM 包，每个 NPM 包包含一个物料。

关于项目类型的选择，我们有以下的建议：

- 实际开发中请尽量避免使用「基础」项目，每个物料对应一个项目的组织形式将为后续的维护带来极大的不便；
- 物料仅供团队内部业务使用，优先选择「library 库」类型的项目，通过在项目中引入单个 NPM 包即可使用团队的所有物料；
- 物料提供给所有的团队使用，优先选择「monorepo 库」类型的项目，每个物料为单独的 NPM 包方便用户引入，多个 NPM 包由 Lerna 统一管理降低了开发者的维护成本。

这里我们选择「Lerna Monorepo」类型创建一个项目，等待项目初始化完成。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d1da4e1f19ba518ce731d532a8e89406.png~tplv-uwbnlip3yd-webp.webp)

## 添加物料

依据 Arco CLI 的指引，运行 `yarn add:package myFirstMaterial` 添加我们的第一个物料，这里需要回答几个关于物料信息的问题。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d5c36e42dd2b9b60cee09efc4bf775d6.png~tplv-uwbnlip3yd-webp.webp)

## 开发物料

依据 Arco CLI 的指引，运行 `yarn dev` 来开发预览物料。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c31a051d8426cf0566bea7474547debb.png~tplv-uwbnlip3yd-webp.webp)

### 代码开发

所有的物料项目都默认采用了 TypeScript 进行开发，在物料开发中我们建议遵循以下约束：

- 提供详细的 API 说明；
- 遵循 [semver](https://semver.org/lang/zh-CN/) 版本规范，避免主版本内的破坏式更新；
- 面向所有用户的物料尽量避免与业务逻辑耦合，避免接口调用；
- 尽量避免使用 CSS Modules。如果无法确定用户的技术选型，请保证你开发的物料不会导致意料之外的开发环境错误；
- 编写测试用例。项目内置了 Jest 单元测试，通过编写单元测试来提升物料的健壮性。
- 尽量使用 Arco 提供的 CSS 变量来定义颜色，可以让你的物料无缝支持 [暗色模式](https://arco.design/react/docs/dark)。

### Demo书写

请为你的物料提供尽可能详细的用法示例。

Demo 的书写位置位于 `/src/demo` 目录下，每个示例应对应一个单独的文件。在书写示例时，你需要注意以下事项：

- 在 `/src/demo/index.js` 中声明并导出 Demo，只有在这里声明并导出才可以在 Storybook 中预览到新添加的 Demo；
- 在 `/src/demo/index.js` 中添加组件和 Demo 的描述，这些描述将在构建时被提取，用于在物料平台的展示；
- Demo 默认不支持引用除 React 和 Arco 组件库相关的其他依赖包，如需引入请参考 [Demo 依赖](/docs/material/build#demo-依赖)。

```javascript
 /**
 * @file
 * @title CloudIcon
 * @memberOf 通用
 * @description 字节云图标
 */

/**
 * @title 基本应用
 * @description `CloudIcon` 示例
 */
export { default as Basic } from './basic';

/**
 * @title 所有的Icon
 * @description `CloudIcon` 所包含的所有图标
 */
export { default as AllIcon } from './icon';

```

### 文档生成

物料文档包含了两个方面：组件 Props 参数和示例代码。物料的 `/src` 目录结构如下：

```
─ /src
  ├── __test__
  ├── TEMPLATE.md
  ├── demo
  │   └── basic.jsx
  ├── index.tsx
  └── style
```

你需要关注的有 `TEMPLATE.md` 和 `demo`，在使用 TypeScript 的项目中，arco-scripts 可以通过提取注释内容来快速生成组件接口文档。`TEMPLATE.md` 为文档生成的模板。其内容如下：

```
---
file: index
---

# TooltipButton

## 属性/Props

%%Props%%

## Demos

%%Demos%%
```

其中 `%%Props%%` 会在 `docgen` 命令之后组件的 `Props` 参数填充，`%%Demos%%` 会被 `/src/demo` 中的 Demo 代码填充。

```markdown
# TooltipButton

## API

### `<TooltipButton>`

| 参数名 |    描述    |    类型     | 默认值 |
| ------ | :--------: | :---------: | -----: |
| title  | 按钮的提示 | `ReactNode` |    `-` |

## Demos

~~~jsx
import React from 'react';
import TooltipButton from '@arco-design/rc-xxx';

/**
 * 基本用法
 */
export default () => {
  return <TooltipButton title="tooltip title">Demo Basic</TooltipButton>;
};
~~~
```

在 Arco 官方物料模板所创建的项目中，你不必费心地去处理文档生成，我们会在 `npm publish` 之前生成一份最新的文档并将其上传至 NPM。

### 区块和页面

区块和页面的开发与组件略有不同，如果你不需要开发区块或者页面，可以暂时跳过此部分。

以区块项目为例，其 `/src` 的文件结构如下：

```
src
├── README.md
├── __test__
│   ├── __snapshots__
│   │   └── demo.test.tsx.snap
│   └── index.test.tsx
├── demo
│   ├── basic.jsx
│   └── index.js
├── index.tsx
└── lib
    ├── index.tsx
    └── style
        └── index.less
```

与组件相比，你需要注意以下几点不同：

- 在 `/src/lib` 下开发你的区块（页面为 `/src/page`），此目录将在用户使用此区块时被拷贝用户的项目中；
- 无需为区块、页面书写 Demo，仅关注其本身的开发即可，物料平台会默认展示 `/src/index` 所暴露出来的模块；

如果你需要自行书写物料平台所展示的区块预览，参考以下步骤：

- 修改区块 package.json 中的 `docgen` 命令为 `arco-scripts docgen`；
- 确保 arco-scripts >= 1.20.4；
- 确保 `/.config/docgen.config.js` 中配置了 `config.template = 'README.md'`；
- 为 `/src/README.md` 添加以下内容：

```markdown
 ## Demos

 %%Demos%%
```

- 为物料书写 Demo；
- 本地开发完成后可以通过 `yarn prepublishOnly && arco preview` 来区块在预览物料平台的实际展示效果。

## 预览物料

为了保证所开发的物料在物料平台能够被正常预览，我们提供了 `arco preview` 命令来预览本地物料。在预览之前，保证物料已经被构建和生成文档，你可以通过以下命令快速实现：

```bash
# 构建以及生成文档
yarn prepublishOnly

# 如果未生成过物料信息，生成物料信息
yarn generate

# 预览物料
arco preview
```

## 发布物料

在确保物料功能正常、API 文档完整、物料平台预览正常之后，就可以发布我们的物料了。在 Lerna 项目中，可以通过 `lerna publish` 命令发布 NPM 版本。

NPM 发布完毕之后，我们需要将物料信息同步至物料平台。如果你是某一团队的成员，需要将项目中的所有物料发布在团队下，可以修改 项目根目录的 `arco.config.js` 中的默认 `group` 字段为你的团队 ID。这样，所有新物料在发布时都会默认发布到你的团队之下。

```javascript
module.exports = {
  // globs to your packages
  // e.g. [ 'packages/*' ]
  packages: ['packages/*'],
  // command you want to replace 'arco subCommand'
  // e.g. publish: 'lerna publish'
  alias: {
    publish: 'lerna publish',
  },
  // initial meta for 'arco generate'
  initialMeta: {
    // 修改此处为你的团队 ID
    group: 1,
  },
  // path of arco block insertion, relative to /src ('myPath' will be resolved as '/src/myPath')
  // pathBlockInsert: 'pathRelativeToSrc',
};

```

通过以下命令，同步物料信息：

```bash
# 同步当前目录下的物料信息
arco sync --from-current-package

# 或者
yarn sync

# 同步当前项目下的所有物料信息
arco sync
```

至此，我们已经完成了一个物料的开发、发布流程。

## 团队站点

团队站点是一个更为集中的团队物料展示方案，它的形式基于 Arco 官方组件文档页面。创建团队站点之前，你需要至 [此页面](https://arco.design/material/createGroup/) 申请创建自己的物料团队。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6ee1b1c7df7c084da691b5e8797e7ae9.png~tplv-uwbnlip3yd-webp.webp)

关于团队站点的配置和使用方法，请移步 [团队站点](/docs/material/team-site) 。
