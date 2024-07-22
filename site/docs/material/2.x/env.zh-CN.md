`````
Material Market  2.0

# Env

Arco CLI 引入了组件运行环境（Env）的概念

`````

我们为 Arco CLI 引入了组件运行环境（Env）的概念，旨在为基于不同框架（React / Vue / Angular）、不同执行环境（Browser / Node）的组件提供统一的上层交互和开发体验。所以对开发环境的配置拓展，均为对 Env 的拓展。
目前仅提供了 React Env 此一种组件执行环境，接下来我们将详细介绍如何拓展对 React 开发环境各个环节的自定义配置。
## 内置模块
针对组件开发场景，React Env 内置封装了以下模块：

* TypeScript：针对 TypeScript 的封装，支持组件源码构建；
* Less / Sass：针对 Less / Sass 的封装，支持组件样式构建；
* Jest：针对 Jest 的封装，支持组件单元测试；
* Webpack：针对 Webpack 的封装，支持组件本地开发预览和组件文档的构建。

  因此，对于 React Env 的环境拓展即为对上述模块的拓展。
## 遵守规范
在进入实际开发之前，我们建议你阅读[物料开发规范](https://arco.design/docs/material/spec)。此规范包含了我们总结的一些物料开发中的最佳实践和应避免的事项。
你不需要完全遵守规范中所提到的内容，但同一团队内的所有物料都应尽量保证使用同一开发规范。
## 开发
通过 `arco start` 命令，可以进入开发模式以预览当前工作区内的所有组件。通过 `arco start ComponentName` 来指定所需要启动预览的组件。
接下来以此目录结构为例，对组件开发流程进行说明：
```Plain Text
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
```

#### 组件文档
我们基于 MDX 来维护组件使用文档，它是 Markdown 的超集，可以直接使用 Markdown 的所有语法，并支持 JSX 语法。
你可以在 `arco.workspace.jsonc` 中的组件字段中配置组件预览文档和 API 文档解析的入口：
```JSON
{
  "arco.aspect/workspace": {
    "components": [
      {
        "name": "ComponentName",
        "entries": {
          // 通过此字段配置组件文档入口
          "preview": "./__docs__/index.mdx"
          // 通过此字段配置解析 API 文档的入口，支持数组
          "jsdoc": ["./interface.ts"]
        }
      }
    ]
  }
}
```

关于组件使用文档和 API 文档的使用方式，在「快速上手 - 开发物料」部分已经详细介绍，不再赘述。
###### 指定 Arco 主题包
首先需要明确的是，Arco 主题包应该由业务项目根据自身需求自行引入。物料本身**不应该**直接将某一主题包引入物料自身样式，或者将其作为 NPM 依赖。此处所说的 “使用 Arco 主题包”仅仅指在物料 Demo 文档中引入主题包样式，以展示此物料在某一主题下的表现。
我们提供了两种形式来在物料预览中引入 Arco 主题包：
######## 配置组件额外样式
我们提供了一种简便的方式来为每一组件动态应用不同的主题样式，通过在 `arco.workspace.jsonc` 中为组件增添配置来提供可供选择的主题列表。物料预览时，主题对应的 `.css` 文件将以外联样式的形式引入。
（**配置此字段后，主题切换将在本地工作区和物料平台预览同时生效**）
```JSON
{
  "arco.aspect/workspace": {
    "components": [
      {
        "name": "ComponentName",
        // 通过此字段配置可被动态注入的组件额外样式
        "extraStyles": [
          {
            "title": "线性主题",
            "href": "https://sf-unpkg-src.bytedance.net/@arco-design/theme-line@latest/css/arco.css",
          }
        ]
      }
    ]
  }
}
```

######## 通过 Webpack 插件引入
如果你对主题包的编译需要更多自定义操作，那么可以自行在项目中安装主题包，然后通过 Arco Webpack 插件将其引入：

1. 在项目开发依赖（devDependencies）中添加主题包；
2. 在项目开发依赖（devDependencies）中添加 [ArcoWebpack 插件](https://www.npmjs.com/package/@arco-plugins/webpack-react)，用于 Arco 组件样式按需加载和应用主题；
3. 依赖更新后，在 `arco.env.config.js` 中添加 ArcoWebapck 插件的相关配置：

```JavaScript
// arco.env.config.js

module.exports = function defineConfig() {
  const commonWebpackConfig = {
    plugins: [
      new ArcoWebpackPlugin({
        theme: '@arco-design/theme-line',
        webpackImplementation: config.webpack,
        // 插件生效的目录，默认值为 src
        // 如果你的组件源码目录不是 src，则需要设置此字段
        include: 'packages',
      }),
    ],
  };

  return {
    webpack: {
      devServerConfig: [
        (config) => {
          return config.merge(commonWebpackConfig);
        },
      ],
      previewConfig:  [
        (config) => {
          return config.merge(commonWebpackConfig);
        },
      ],
    }
  };
}
```

###### 指定文档的 ContextProvider
在某些场景下，你的组件可能需要提供统一的 ContextProvider 才能工作，为了避免手动为每一个文档包裹 ContextProvider，我们允许通过配置字段来为文档包裹上下文。
```TypeScript
// src/globalContext/index.tsx
import React, { createContext, PropsWithChildren, useMemo } from 'react';

export const GlobalContext = createContext({ appName: '' });

// 默认导出的组件将会包裹 index.mdx 的内容
export default function GlobalContextProvider({ children }: PropsWithChildren) {
  const contextValue = useMemo<GlobalContextType>(() => {
    return { appName: 'Example Project' };
  }, []);
  return <GlobalContext.Provider children={children} value={contextValue} />;
}
```

如果你需要在每一个组件 Demo 中使用上边的 GlobalContext，可以在 `arco.workspace.jsonc` 中添加关于 `previewContextProvider` 的配置字段：
```JSON
// arco.workspace.jsonc
{
  "arco.aspect/workspace": {
    "components": [
      {
        "rootDir": "src",
        "entries": {
          "base": ".",
          "preview": "__docs__/index.mdx",
          // 相对于组件 base 目录的路径
          // 此文档的默认导出模块渲染时将会包裹 index.mdx
          "previewContextProvider": "../globalContext/index.tsx"
        }
      }
    ]
  }
}
```

###### 监听文档页面事件
我们为组件预览页面提供了 `window.__registerArcoPreviewEventListener` 方法，用于监听如暗色模式切换、组件主题（extraStyles）切换等事件。
```TypeScript
type EventType =
  // 为页面注入由组件 entries.extraStyles 配置的样式
  | 'appendExtraStyle'
  // 暗色模式切换
  | 'switchDarkMode'
  // 组件文档由 ArcoMDXPreviewSplit 拆分时，Tab 切换的事件
  | 'switchActiveTab'
  // 页面滚动
  | 'scrollIntoView'
  // 更新右侧锚点相对于页面顶部的偏移量
  | 'updateAnchorOffset';

// 移除事件监听函数
type UnregisterFn = () => void;

// 事件监听函数
type RegisterFn = (
  eventType: EventType,
  callback: (event: { type: EventType; data: any }) => void
) => UnregisterFn;

(window.__registerArcoPreviewEventListener as RegisterFn)?.('switchDarkMode', (event) => {
  console.log('switch dark mode', event);
});
```

#### 版本日志
目前我们没用提供内置的版本日志生成工具，需要手动维护或自行实现版本日志提取功能。
为保证组件使用文档简洁和方便工具自动提取生成版本日志文档，我们支持为组件添加除预览文档之外的其它文档。通过 `arco.workspace.jsonc` 中的组件配置字段来添加额外的文档入口（仅支持 `.md` 文件）：
```JSON
{
  "arco.aspect/workspace": {
    "components": [
      {
        "name": "ComponentName",
        "entries": {
          // 通过此字段配置单元测试文件的匹配规则
          // 默认值：['**/?(*.)+(spec|test).[jt]s?(x)']
          "extraDocs": [
            {
              "title": "Changelog",
              "entry": "./__docs__/changelog.md"
            }
          ]
        }
      }
    ]
  }
}
```

在本地预览和物料平台预览时，`extraDocs` 中的文档将与组件预览文档一同展示在不同的标签之中：
![图片](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0e20e7e1222f4e57b55d3eccc936cc35~tplv-goo7wpa0wc-image.image)
#### 样式
React Env 内置了对于 Sass / Less 的支持。你可以自由选择你偏爱的类型，或者直接使用 CSS 文件书写样式。
###### 支持样式按需加载
可能你已经注意到，默认的目录结构中，`src/style` 下除了 `index.less/scss` 样式文件入口，还存在 `index.ts` 文件。此文件主要用于支持对于组件样式的按需加载，我们以 [babel-plugin-import ](https://www.npmjs.com/package/babel-plugin-import)为例，其实现组件样式按需加载的原理大致如下：
```JavaScript
import { Button } from '@arco-design/web-react';
ReactDOM.render(<Button>xxxx</Button>);

↓ ↓ ↓ ↓ ↓ ↓

var _button = require('@arco-design/web-react/lib/button');
require('@arco-design/web-react/lib/button/style/index.js');
ReactDOM.render(<_button>xxxx</_button>);
```

在开启了按需加载样式的选项后，插件将自动引用 `dirComponent/style/index.js` 。因此为了支持此类插件对于组件样式的按需加载，我们需要在 `src/style/index.ts` 中引入当前组件依赖到的所有样式：
```JavaScript
// style/index.ts

// 引入当前组件的样式文件
import './index.less';

// 引入当前组件依赖的本包内的其他组件样式（如有）
import '../../AnotherComponent/style';

// 引入当前组件依赖的 Arco 组件样式（如有）
import '@arco-design/web-react/es/Button/style';
```

###### 谨慎使用 [CSS Modules](https://github.com/css-modules/css-modules)
在业务项目开发中，CSS Modules 是非常常见的样式代码组织形式。但如果是开发一个需要提供给其他开发者使用的组件，我们建议你谨慎使用此方式。它包含以下两个严重问题：

* 需要特殊的构建支持：不同于可以通过多种方式引入的 `.css` 文件，CSS Modules 构建通常需要一些额外的插件配置支持（例如 Webpack [css-loader](https://www.npmjs.com/package/css-loader##modules)）；
* 用户无法用过类名进行样式覆盖：CSS Modules 经过编译后，其 DOM 类名将变为一串 Hash 字符串，用户没有办法通过类名选择器直接对组件样式进行覆盖；

```CSS
// 使用常规类名组织样式的组件，用户也可以直接通过类名选择器来覆写样式
.arco-btn {
  font-size: 12px;
}
```

###### 避免在 JS 文件中引入样式文件
避免在 JS 文件中引入样式文件。 应尽量保证逻辑与样式的分离，确保用户可以分别引入 JS 和 CSS 文件，避免由于构建环境的不同导致的用户编译失败的问题。
## 测试
默认项目里，组件的单元测试位于 `src/__test__` 下。为组件书写单元测试，你需要熟悉以下工具的使用：

* [Jest](https://jestjs.io/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

通过 `arco.workspace.jsonc` 文件配置单元测试文件的匹配规则：
```JSON
{
  "arco.aspect/workspace": {
    "components": [
      {
        "name": "ComponentName",
        "entries": {
          // 通过此字段配置单元测试文件的匹配规则
          // 默认值：['**/?(*.)+(spec|test).[jt]s?(x)']
          "testFilePatterns": ["__test__/*.test.tsx"];
        }
      }
    ]
  }
}
```

通过 `arco test` 命令来对工作区内的组件进行测试。通过 `arco test ComponentName` 来指定需要测试的组件。
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a2ac18a16b8741e5b9a1ce2a8b5dee19~tplv-goo7wpa0wc-image.image)

#### 传入 Jest CLI 参数
由于 `arco test` 命令是对于测试工具的上层封装，我们避免了让它直接接受某一测试工具的 CLI 命令参数（例如[ Jest CLI](https://jestjs.io/docs/cli)）。如果你需要为 Jest CLI 传入参数，可以通过 `--rawTesterArgs` 来传入：
```Bash
arco test --rawTesterArgs="jest -u --silent=false"
```

## 构建
通过 `arco build` 命令，可以对工作区内的所有组件进行构建。React Env 下，组件的构建产物包括三部分：
```Bash
├── es ## 符合 ESModule 规范的产物
├── lib ## 符合 CommonJS 规范的产物
└── artifacts ## 物料文档及其预览文件（仅用于物料平台的物料预览）
```

实际用户使用时，将会用到 `es/` 或 `lib/` 目录下的产物，而 `artifacts/` 目录下的内容则仅用于物料平台的物料文档预览。在物料构建时，`artifacts/` 的构建相对比较耗费时间，你可以通过额外参数来指定所需构建的组件或者所需的产物：
```Bash
## 通过 ComponentNamePattern 来指定需要构建的组件，多个组件可用逗号隔开
## 同样，test/start/sync 命令均支持此用法
arco build ComponentA,ComponentB

## 通过 --tasks 指定所要执行的构建任务，多个任务名之间可用逗号隔开
## 各个任务的人物名可以通过构建时的输出界面获得
arco build --tasks="TSCompilerESM,TSCompilerCJS"
```

![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d140aa58f3d04e2aab71c8d38202cc23~tplv-goo7wpa0wc-image.image)

构建任务的 ID 格式为 `{AspectId}:{TaskName}`， 所以你可以将上述 ID 的任意部分传入 `--tasks` 参数。例如：
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/434f16a40e6940e788c06f5b9fbc5d5b~tplv-goo7wpa0wc-image.image)

## 发布
如何发布 NPM 包不在本文档范畴内，请参考 NPM 文档或互联网上的其他教程。在发布新版本至 NPM 前，请确认以下内容：

* 已完整执行过单元测试，确保没有引入新的问题；
* 已完整执行过构建任务，构建出最新的组件产物，完整的包产物应该包含 `/es`、`/lib`、`/artifacts` 三个目录；
* 确保新的版本号遵循 [Semver 规范](https://semver.org/)，并且没有引入破坏式更新（如有，请谨慎考虑并在组件使用文档中明确标出）。

在完成 NPM 发布之后，通过 `arco sync` 命令将最新的组件文档同步至物料平台。
## 可拓展配置
#### 配置文件详解
类似于 Workspace 配置，我们会在项目根目录查找名为 `arco.env.config.js` 的文件，此文件即为所有组件 Env 的配置入口。它需要暴露一个返回配置对象的函数，函数可接收一个用于区分不同 Env 的参数：
```JavaScript
// arco.env.config.js

module.exports = function defineConfig(envId) {
  return {
  // ... configs for component env
  };
};
```

React Env 允许的配置字段详情如下：
```TypeScript
type WebpackConfigTransformer = (
  config: WebpackConfigMutator,
  context: WebpackConfigTransformContext
) => WebpackConfigMutator

type TsConfigTransformer = (
  config: TypescriptConfigMutator,
  context: TsConfigTransformContext
) => TypescriptConfigMutator;

/**
 * React Env 允许接受的所有配置字段
 */
type ArcoReactEnvConfig = {
  /**
   * 拓展 Jest 配置
   */
  jest?: {
    /**
     * Jest 配置文件路径
     */
    jestConfigPath?: string;
    /**
     * Jest 模块路径（用以替代 arco-cli 内部依赖的 Jest）
     */
    jestModulePath?: string;
  };
  /**
   * 拓展 Webpack 的构建配置
   * 注意：Webpack 仅用于工作区组件文档的预览和构建，不参与组件产物的构建
   */
  webpack?: {
    /**
     * 拓展组件文档产物构建的配置
     */
    previewConfig?: WebpackConfigTransformer[];
    /**
     * 拓展组件本地预览时的配置
     */
    devServerConfig?: WebpackConfigTransformer[];
  };
  /**
   * extend config of TypeScript compiler
   */
  typescript?: {
    /**
     * 传入 TypeScript 模块以替代 arco-cli 内部依赖的 TypsScript
     */
    tsModule?: any;
    /**
     * 拓展物料产物构建时的配置
     */
    buildConfig?: TsConfigTransformer[];
  };
  /**
   * 拓展 Less 构建配置
   */
  less?: {
    /**
     * less.render 所需的参数。详情：https://lesscss.org/usage/##programmatic-usage
     */
    lessOptions?: Record<string, any>;
    /**
     * 是否需要自动创建包含了所有 Raw 样式文件的入口文件，并构建其产物
     * 例如，源码包含 ComponentA/style.less 和 ComponentB/style.less，此选项将自动创建聚合了上述文件的 index.less，并构建对应的 index.css
     */
    combine?:
      | boolean
      | {
          /**
           * 聚合文件的文件名，也可以是一个相对路径。（默认值：index.less）
           */
          filename: string;
        };
    /**
     * 自定义样式文件编译过程
     */
    compile?: (fileInfo, defaultCompileFn) => Promise<string>;
  };
  /**
   * 拓展 Sass 构建配置
   */
  sass?: {
    /**
     * sass.compile 所需的参数。详情：https://sass-lang.com/documentation/js-api/modules##compile
     */
    sassOptions?: Record<string, any>;
    /**
     * 同 less 字段的同名配置
     */
    combine?:
      | boolean
      | {
          filename: string;
        };
    /**
     * 自定义样式文件编译过程
     */
    compile?: (fileInfo, defaultCompileFn) => Promise<string>;
  };
  /**
   * 拓展生成 API 文档时，ts-document的相关配置
   */
  tsDocument?: {
    /**
     * 接受 ts-document 工具的解析配置
     * https://www.npmjs.com/package/ts-document
     */
    tsDocumentOptions?: Record<string, any>;
  }
};
```

查看 [TypescriptConfigMutator](https://github.com/arco-design/arco-cli/blob/next/packages/aspect/src/typescript/typescriptConfigMutator.ts) 和 [WebpackConfigMutator](https://github.com/arco-design/arco-cli/blob/next/packages/aspect/src/webpack/webpackConfigMutator.ts) 的详细内容。
####  拓展 TS 配置
React Env 已经内置了 TypeScript 构建的[默认配置](https://github.com/arco-design/arco-cli/blob/next/packages/react/src/typescript/tsconfig.json)，即使项目中不存在 `tsconfig.json` 组件也能够正常打包。但除了通过上述 `arco.env.config.js` 中 `typescript` 字段，我们也允许通过 `tsconfig.json` 来自定义 TS 构建配置。NPM 包根目录的 `tsconfig.json` 或者 `tsconfig.build.json` 都会被拓展到构建配置中，此时它们之间的优先级从高至低为：

1. `arco.env.config.js` 指定的 TS 配置；
2. NPM 包根目录 `tsconfig.json` / `tsconfig.build.json` 指定的配置；
3. React Env 中的默认 TS 配置。

#### 拓展 Jest 配置
通过配置 `arco.env.config.js` 的 `jest.jestConfigPath` 字段来自定义 Jest 配置文件路径。
```JavaScript
// arco.env.config.js

module.exports = function defineConfig() {
  return {
    jest: {
      // 相对于项目根目录的路径
      jestConfigPath: './jest.config.js',
    }
  };
};
```

```JavaScript
// jest.config.js
const defaultConfig = require(require.resolve('@arco-cli/react/dist/jest/jest.cjs.config.js'));

// 建议在 React Env 默认 Jest 配置基础上进行拓展
const finalConfig = {
  ...defaultConfig,
  // ... extend config
};

module.exports = finalConfig;
```

#### 拓展 TS 构建流程
React Env 使用 tsc 来进行 `.ts` 文件的编译，输出的产物目录为 `/es` 和 `/lib`。通过配置项，你可以拓展这一编译流程。
下面以使用 [tsc-alias](https://www.npmjs.com/package/tsc-alias) 工具转换产物中通过 `tsconfig.compilerOptions.paths` 属性配置的路径别名为例，介绍此配置字段的用法：
```JavaScript
// arco.env.config.js
const { replaceTscAliasPaths } = require('tsc-alias');

module.exports = function defineConfig() {
  return {
    typescript: {
      // TSCompiler config transformers
      buildConfig: [
        (config) => {
          // 通过自定义 compile 函数，拓展 NPM 包 TS 编译流程
          config.raw.compile = async ({ configFilePath }, defaultCompileFn) => {
            // !!!默认的编译函数必须执行
            defaultCompileFn();
            // 转化通过 tsconfig.json compilerOptions.paths 字段配置的路径别名
            await replaceTscAliasPaths({ configFile: configFilePath });
          };
        },
      ]
    }
  };
};
```

#### 拓展样式构建流程
###### 预处理样式文件
默认的 Less/Sass 构建采用其默认的构建方法进行，但你可以通过配置项，来扩展编译流程，在文件编译前进行其他处理：
```JavaScript
const postcss = require('postcss');
const prefixer = require('postcss-prefixer');

// arco.env.config.js
module.exports = function () {
  return {
    less: {
      // 通过此字段，扩展编译流程
      compile: async (file, defaultCompileFn) => {
        // 通过覆盖 getContents 函数，在 less 文件编译前为其添加内容
        const compiledLess = await defaultCompileFn({
          ...file,
          getContents: () => `/** contents prepend to less file */\n${file.getContents()}`,
        });

        // 处理编译过后的 less 文件，例如为其添加统一类名前缀
        const result = await postcss([
          prefixer({
            prefix: 'custom-prefix-',
            ignore: ['arco-'],
          }),
        ]).process(compiledLess, { from: undefined });
        return result.css;
      },
    },
    sass: {
      // 同 less 配置
      compile: async () => {},
    },
  };
};
```

#### 拓展构建完成的后续任务（>= 2.3.1）
我们为 `arco.service/compiler` 提供了 `postBuild` 选项，通过此配置可以自定义构建完后成的后续任务。
```JSON
// arco.workspace.jsonc
{
  // 此配置项用于指定 TSCompilerESM / TSCompilerCJS 的默认行为
  "arco.service/compiler": {
    // 指定组件构建完成之后的后续任务，接收一个字符串，为脚本文件相对于 Arco 工作区根目录的路径
    "postBuild": './postBuild.js'
  }
}
```

###### 自动在产物的 Less 入口注入对 Arco 的样式依赖
以下任务将在组件构建完成之后，在其 `/{es,lib}/ComponentName/style/index.js` 中自动注入所依赖的 Arco 组件样式依赖：
```JavaScript
// /es/Component/style/index.js
import './index.less';
//## sourceMappingURL=index.js.map
```

↓↓↓
```JavaScript
// /es/Component/style/index.js
import '@arco-design/web-react/es/Radio/style/index.js';
import './index.less';
//## sourceMappingURL=index.js.map
```

任务脚本如下（需安装 `fs-extra^10.1.0` 和 `parse-es-import^0.6.0`）：
暂时无法在飞书文档外展示此内容
#### 指定组件构建顺序
如果你的工作区 NPM 包存在依赖关系，如 B 依赖了 A，则需要保证 A 在 B 之前构建，否则 TypeScript 会抛出 `Cannot find module xxx' or its corresponding type declarations` 的错误。
CLI 内部已经根据 `package.json` 中的 `dependencies` 字段自动分析了各组件的依赖关系，并提供的默认构建顺序。如果仍然需要自定义构建顺序，你可以通过以下字段指定：
```JSON
// arco.workspace.jsonc
{
  // 此配置项用于指定 TSCompilerESM / TSCompilerCJS 的默认行为
  "arco.service/compiler": {
    // 指定组件的编译顺序，接收的字段为：组件 ID、组件 ID 关键词、组件 ID Glob 匹配符
    // 将需要优先构建的组件置于数组前列，未指定的组件将置于构建队列末尾
    "componentCompilationOrders": ["base-component/**", "second-base-component/**"]
  }
}
```

