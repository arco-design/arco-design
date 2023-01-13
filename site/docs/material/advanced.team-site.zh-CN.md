`````
物料平台

# 团队站点

了解物料平台的团队文档站点方案。
`````

**团队站点暂不支持在 Vue 项目中使用，请关注后续升级通知。**

Arco 物料平台上，某个团队所属的物料以列表的形式展示，并且仅支持预览【一个组件独占一个 NPM 包】的物料，如果团队采用了【多组件对应一个 NPM 包】的物料库形式，将无法在物料平台进行预览。 这些限制使此页面无法满足团队成员快速查看物料用法文档的需求。我们收到了多个团队的反馈，希望物料平台可以提供类似于 [Arco 组件库文档站](https://arco.design/react/docs/start) 的团队站点，以方便团队内共享使用物料。

Arco 提供的所有物料模板的开发预览使用 Storybook 的方式，我们不希望用户自行开发部署文档站点，其成本过高且将会与物料平台完全脱节。为了实现低成本搭建团队站点的目标，我们设计了一种折中的方案：

- 物料平台提供站点框架，把握整体结构、统一交互和样式，统一维护；
- 将物料的所有 Demo 和 API 文档打包、提取信息后上传，用于文档站点内容区域的动态加载；
- 通过配置的方式，允许团队配置站点的国际化选项、onCall 方式等自定义内容。

## 初始化

我们提供了与项目结构最大程度解耦的物料站点模板，所以可以在任意项目中初始化站点项目。

通过 `arco init arco-team-site --pure` 命令在项目中初始化站点目录。（Arco CLI 版本 >= 1.19.0）

命令需要填写两个参数：

- 模板的包名：@arco-materials/template-team-site
- 站点项目的包名：由你决定。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/94a1d3c76247c37f82fb4f5d52933740.png~tplv-uwbnlip3yd-webp.webp)

## 项目配置

初始化完成的站点目录结构只需要关注以下目录：

```
├── .config // 配置文件目录
│   ├── main.js // 站点相关配置
│   └── webpack.config.js // 扩展 webpack 构建配置
│
├── docs // 自定义文档目录
│   ├── en-US // 存放对应语言的文档
│   └── zh-CN // 存放对应语言的文档
```

### 配置智能提示

**版本要求 `arco-material-doc-site >= 1.4.0`**

`arco-material-doc-site` 的配置项由 TypeScript 书写，你可以通过 IDE 和 JsDoc 的配合来实现智能提示：

```js
// .config/main.js

/**
 * @type {import('arco-material-doc-site').MainConfig}
 */
module.exports = { ... };
```

完整的 `MainConfig` 配置字段声明请 [移步至此](https://github.com/arco-design/arco-cli/blob/main/packages/arco-material-doc-site/src/interface.ts#L55) 。

```js
// .config/webpack.config.js

/**
 * @param config {import('arco-material-doc-site').WebpackConfig}
 */
module.exports = (config) => {};
```

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/da38d96ab9856876f34f90e0fa05f514.png~tplv-uwbnlip3yd-webp.webp)

### 物料入口配置

为了保证站点构建可以处理到正确的物料内容，需要在 `.config/main.js` 中配置物料入口的信息。

参考以下文件内容，如果你的项目是基于 Arco「组件库」或者「Monorepo」物料模板创建，选中正确的 `build.globs.component` 值即可。

```javascript
// .config/main.js
module.exports = {
  // 构建配置
  build: {
    // 匹配文档和组件的路径
    globs: {
      // 可用于 Arco Monorepo 模板的配置
      component: {
        // 相对于站点目录的相对路径，也可指定绝对路径
        base: '../*',
        doc: 'docs/README.md',
        demo: 'src/demo/index.js',
        style: 'src/style/index.less',
      },
      doc: './docs/**/*.md',
    },
    // 是否引入物料的样式文件
    withMaterialStyle: true,
  },
  // 站点配置
  site: {
    // ...
  },
};
```

### 扩展构建配置

如果遇到任何构建异常，可以尝试扩展 `.config/webpack.config.js` 来解决。在物料项目中构建可能出现下图中的物料模块无法找到的问题。可以通过配置 `webpackConfig.resolve.alias` 字段解决。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/585db8128cbcf0a12ab0ab6f70051450.png~tplv-uwbnlip3yd-webp.webp)

```javascript
// .config/webpack.config.js
const path = require('path');

module.exports = (config) => {
  config.resolve.alias = {
    '@arco-design/rc-xxx': path.resolve('../components'),
  };
};
```

## 开发模式

**版本要求 `arco-material-doc-site >= 1.4.0`**

站点依赖包 `@arco-desgin/arco-doc-site` 提供了 `arco-doc-site dev` 的命令，用于在本地启动团队站点的开发模式，以作为 Storybook 备用选项。通过这种方式，即使你没有使用 Arco 提供的官方物料模板创建项目，也可以轻松开发物料。

**注意：可以通过 Webpack `resolve.alias` 配置来为 Dev 模式提速。**

例如，在你的物料 Demo 中通过 NPM 包名来引入模块：

```jsx
import { Button } from '@arco-design/my-material';

export default () => <Button />;
```

可通过 `resolve.alias` 配置，指定 Webpack 查找此模块的路径。

```js
// .config/webpack.config.js
module.exports = (config) => {
  config.resolve.alias['@arco-design/my-material'] = '/project-root/packages/my-material/src';
};
```

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c6001648f6b03f932f8b99e5505dbc1e.png~tplv-uwbnlip3yd-webp.webp)

## 效果预览

**注意：以下命令都需要在站点目录下操作。**

```
# 尝试构建站点项目
yarn build
```

如果构建成功，就可以预览其在物料平台的实际效果了。

```
# 预览站点的实际显示效果
yarn preview
```

预览内容应该包含自定义文档和物料文档两方面，如果内容缺失请检查上一步骤中的配置项是否正确。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/386069293bf5b040ee09c6c233be765d.png~tplv-uwbnlip3yd-webp.webp)

## 部署绑定

预览确认内容无误之后，需要将站点作为 NPM 包发布，然后在[物料平台 - 团队页面 - 团队站点]配置模块文件的路径。对于访问速度有较高要求的团队也可直接将构建产物上传至 CDN，然后配置资源 CDN 地址。

**仅团队 Owner 有权编辑站点配置。**

**路径支持直接填写站点（非物料包）所对应的 NPM 包名。**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d14e7b6b380cee60d66e7180d05420d5.png~tplv-uwbnlip3yd-webp.webp)

## 个性化配置

通过对 `.config/main.js` 进行配置，你可对站点的进行一些个性化定制。目前支持的配置包括：

- 多语言切换
- 暗色模式切换
- Demo 行为
- 侧边菜单行为
- 自定义页面模块
- [ArcoDesignLab](https://arco.design/themes) 主题包关联
- [ArcoIconBox](https://arco.design/iconbox/libs) 图标库关联

配置字段详情请 [移步至此](https://github.com/arco-design/arco-cli/blob/main/packages/arco-material-doc-site/src/interface.ts#L93) ，参考 `MainConfig.site` 字段类型。

### 自定义页面模块

通过 `MainConfig.build.customModulePath` 字段，你可以指定一个用以暴露自定义模块的入口文件。例如

```javascript
// .config/main.js
module.exports = {
  // 构建配置
  build: {
    // ...
    customModulePath: './customModule.tsx',
  },
};
```

在 `customModule.tsx` 中暴露特定名称的模块，站点页面将会将其渲染至页面中。目前可自定义的模块包括 `Navbar | Footer | Menu | Sider | DocHeader | Affix`。[示例代码](https://github.com/arco-design/official-material-react/blob/main/team-site/fixtures/customModule.tsx)

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/screenshot-20221010-153712.png~tplv-uwbnlip3yd-webp.webp)

## 使用 Arco 主题商店主题

参考 [「常见问题 - 关联主题」](/docs/material/qa#如何关联主题？)。

## 使用 Hook

我们暴露了站点 Demo 运行时的 Hook，你可以通过配置来指定特定时机执行的函数。

```javascript
// .config/main.js
module.exports = {
  build: {
    globs: {
      hook: {
        // 站点初始化时执行函数的路径
        beforeAll: 'hooks/beforeAll.ts',
      },
    },
  },
};
```

```typescript
// hooks/beforeAll.ts
type Params = {
  // 当前的站点语言
  language: string;
};

export default function beforeAll({ language }: Params) {
  // 可返回 Promise
}
```

## 指定 Arco 版本

默认情况下，我们在站点构建时已经将 `@arco-design/web-react` 进行了 external，所以打包产物中不包含 Arco 组件库代码和样式，它们将由站点页面进行全局注入。你可以在 [物料平台 - 团队页面 - 团队站点] 配置其使用的 Arco 组件库版本。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cc7585da8cb507694e28f1d30d7d557a.png~tplv-uwbnlip3yd-webp.webp)

> 使用 `arco preview` 命令在本地预览站点时，可通过为 URL 新增 `arcoVersion=2.12.0` 的 Query 参数来指定 Arco 组件库版本。

通过修改 webpack 配置，可以避免对 `@arco-design/web-react` 进行 external，但我们一般不推荐这种做法（物料应尽量保证在所有 Arco 版本下都可用）。如果你不需要使用全局注入的 Arco 组件库，可以选择 "不注入 Arco"。

## 改造自有项目

Arco 文档站点已经最大程度与项目结构解耦，理论上可以从任意已有的项目中初始化文档站。遵循以下步骤：

### 初始化站点

参考【基础使用 - 初始化】中的步骤，在项目中初始化站点目录。

### 添加 Demo 文档

在初始化完成的站点目录中添加 `/demos` 目录，然后在此目录中为每个物料书写对应的 Demo 和 README 文档。

```
demos
├── add // 每个物料对应单独的文件夹
│   ├── README.md // 书写任意的物料帮助文档
│   └── index.js // 为物料书写 Demo
```

Demo 书写的格式约定如下：

- 组件物料（目前仅支持 React 组件）

```jsx
// basic.jsx
// 每个 Demo 对应一个 JSX 文件
import React from 'react';

import { ComponentOne } from '@arco-design/rc-xxx';

export default () => {
  return <ComponentOne />;
};
```

```jsx
// index.js
// 由 index.js 汇总所有的 Demo，并以 JSDoc 的形式添加对于物料和 Demo 的描述信息

/**
 * @file
 * @title ComponentOne
 * @memberOf 组件类型，例如：数据输入
 * @description 描述你的组件。
 * @author 物料作者
 */

/**
 * @title 基本用法
 * @description 描述你的例子
 */
export { default as Basic } from './basic';
```

- 函数物料

```javascript
// index.js
// 以 JSDoc 的形式添加对于物料和 Demo 的描述信息

/**
 * @file
 * @title 函数名称
 * @memberOf 函数分类，例如：数组处理
 * @description 描述你的函数
 */
import add from '../../../src/add';

/**
 * @title 基本用法
 * @description 描述你的例子
 */
export const basic = {
  // 函数执行方法
  exec: () => add(),
  // 函数执行的预期返回
  result: null,
};
```

### 更改站点配置

修改 `.config/main.js` 中的文件入口配置，使其能正确发现物料 Demo 入口。

```javascript
module.exports = {
  // 构建配置
  build: {
    // 匹配文档和组件的路径
    globs: {
      component: {
        base: 'demos/*',
        doc: 'README.md',
        demo: 'index.js',
      },
      doc: 'docs/**/*.md',
    },
    ...
  },
  // 站点配置
  site: {
    ...
  },
};
```

完成站点预览和部署。

## 国际化

站点内容的多语言支持主要包括三部分：自定义文档、组件 API 文档、组件描述信息。

- 自定义文档需要在 `/site/docs` 下书写，以文件夹区分语言。
- 组件 API 文档以后缀名区分不同的语言，例如: `README.zh-CN.md`、 `README.en-US.md`。书写于 `/** xxx */` 之内的注释会被文档生成工具提取，默认生成的文档名为 `README.md`，如需支持其他语言需要创建对应的文档并翻译它。

```typescript
export interface ComponentOneProps {
  /** 组件的子节点 */
  children?: ReactNode;
  /** 组件的附加样式 */
  style?: CSSProperties;
}
```

- 组件描述信息需要在 `demo/index.js` 中以 JSDOC 的语法书写，这些信息将会在站点模块打包时被收集。

```jsx
/**
 * @file
 * @title
 * zh-CN: 组件名
 * en-US: Name of Component
 *
 * @memberOf
 * zh-CN: 组件分类，例如：数据输入、导航
 * en-US: Sort of this component
 *
 * @description
 * zh-CN: 组件的描述信息
 * en-US: Description of this component
 */

/**
 * @title
 * zh-CN: 此 Demo 的标题
 * en-US: Title of this demo
 *
 * @description
 * zh-CN: Demo 的描述信息，可描述其用法、注意事项
 * en-US: Description of this demo
 */
export { default as Basic } from './basic';
```

## 私有化部署

**版本要求 `arco-material-doc-site >= 1.12.0`**

我们提供了两种方式来将团队站点部署到你的域名之下。在此之前，你需要在站点项目的配置文件中预先配置自己的团队信息，我们会对其进行合法性校验。

```js
// .config/main.js
module.exports = {
  // ...
  // 配置你的团队信息
  group: {
    // 团队 ID
    id: 1,
    // 是否是物料平台内网版团队
    private: false,
  },
};
```

### 通过静态页面部署

站点项目的产物文件如下，它包含了完整的站点静态资源。通过页面托管的形式，你可以直接将产物文件部署在自己的域名。

```text
./dist
├── arcoSite.css
├── arcoSite.zh-CN.js
└── index.html
```

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/isolate.png~tplv-uwbnlip3yd-webp.webp)

### 通过 React 组件引入

我们提供了名为 `@arco-materials/material-site-viewer` 的物料用于预览团队站点，你可以在自己的项目中使用它。通过组件的形式引入站点进行渲染会存在以下副作用：

- 需要在全局作用域注入 React/ReactDOM/arco/arcoicon；
- 需要全量引入 `@arco-design/web-react` 的组件样式（或主题包样式）；
- Demo 未在沙盒环境中运行，任何全局性的操作都会直接影响当前页面；
- 需要额外的操作来处理路由逻辑。

**因此我们强烈建议在你的应用中开辟新的 HTML 入口来作为文档页，而非采用前端路由的形式在原有应用页面中进行扩展。** 具体的用法可以参考下边的代码片段。

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import * as arco from '@arco-design/web-react';
import * as arcoicon from '@arco-design/web-react/icon';

import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import SiteViewer from '@arco-materials/material-site-viewer';

// 确保当前项目中全局引入了 arco 的样式
// 如果使用了 Design Lab 主题，可引入主题包的 css 文件
import '@arco-design/web-react/dist/css/arco.min.css';

// 由于站点产物文件已经将 React/ReactDOM/Arco 去除，需要在全局作用域将其暴露
(function injectGlobalDependencies() {
  const globalDependencies = {
    React,
    ReactDOM,
    arco,
    arcoicon,
  };

  Object.entries(globalDependencies).forEach(([key, value]) => {
    window[key] = value;
  });
})();

export default () => {
  return (
    <Router history={createBrowserHistory({ basename: '' })}>
      <SiteViewer
        // 文档站页面的基础路由
        routerHistoryBasename="/doc/"
        // 指定站点产物的 URL（非文件路径
        siteFileUrl={{
          js: 'https://unpkg.com/@arco-materials/material-team-site@latest/dist/arcoSite.zh-CN.js',
          css: 'https://unpkg.com/@arco-materials/material-team-site@latest/dist/arcoSite.css',
        }}
        // route 中包含了所点击的菜单项对应的页面路径信息，可以根据这个信息自行修改页面路由
        onClickMenuItem={(route) => {
          console.log(route);
        }}
      />
    </Router>
  );
};
```
