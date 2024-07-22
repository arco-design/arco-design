`````
Material Market  2.0

# 工作区

了解工作区

`````
我们使用「工作区（Workspace）」的理念来管理和维护项目内的物料，需要注意的是其与「团队（Group）」的关系。物料的最小粒度是组件，「团队」和「工作区」都是对组件的聚合，区别仅仅在于「团队」为平台侧聚合，而「工作区」为本地项目侧聚合。

## 配置
默认地，我们在项目根目录查找名为 `arco.workspace.jsonc` 或 `arco.workspace.js` 的文件以应用工作区配置。绝大多数 CLI 相关的命令都只能在 Arco 物料工作区内执行，否则将会得到以下错误：
```Bash
workspace not found, please run arco command in a arco workspace
```

通过工作区配置文件，可以对当前工作区的物料进行配置：
```JavaScript
modules.exports = function () {
  return {
    'arco.aspect/workspace': {
      name: 'WorkspaceName',
      components: {
        // 为避免重复书写，可将通用的组件配置置于此处
        // Partial<ComponentConfig>
        extends: {},
        // 当前工作区所有组件的配置列表
        // ComponentConfig[]
        members: []
      }
    }
  };
}
```

其中的 `ComponentConfig` 类型定义为：
```TypeScript
type ComponentConfig = {
  /**
   * NPM 包源码目录相对于工作区根目录的相对路径
   * e.g. packages/library/components
   */
  rootDir: string;
  /**
   * 组件名，将与 NPM 包名拼接作为组件 ID
   */
  name: string;
  /**
   * 组件作者
   */
  author?: string;
  /**
   * 组件关键词
   */
  labels?: string[];
  /**
   * 组件所属团队
   */
  group?: number;
  /**
   * 组件代码仓库地址
   */
  repository?: string;
  /**
   * 组件设计稿地址
   */
  uiResource?: string;
  /**
   * 组件是否允许被其他用户 Fork
   * 可通过 srouces 字段配置当前组件对应的源码目录，它们将被上传至物料平台，默认为 rootDir
   */
  forkable?: boolean | { sources: [] };
  /**
   * 组件入口文件相关的配置
   */
  entries: {
    /**
     * 组件目录相对于 rootDir 的相对路径，默认值为 ./
     * e.g 单包组件中，组件入口直接位于 ./src/index.ts。rootDir 为 src， base 为 ./
     * e.g 组件库中，组件入口位于 ./components/Button/index.ts。rootDir 为 components， base 为 Button
     */
    base?: string;
    /**
     * 组件主入口文件相对于 base 的相对路径
     * e.g. 入口文件路径为 components/Button/index.ts，则 rootDir 为 components，base 为 Button，main 为 index.ts
     */
    main?: string;
    /**
     * 组件样式入口文件相对于 base 的相对路径
     * e.g. style/index.less
     */
    style?: string;
    /**
     * 组件预览文件相对于 base 的相对路径
     * e.g. __docs__/index.mdx
     */
    preview?: string;
    /**
     * 组件类型声明文件相对于 base 的相对路径（TypeScript 文档的自动解析提取将仅分析此字段配置的文件）
     * e.g. interface.ts
     */
    jsdoc?: string | string[];
    /**
     * 单元测试文件的 Glob 匹配规则
     * e.g ['__test__/index.test.tsx']
     */
    testFilePatterns?: string[];
    /**
     * 额外文档的入口配置，例如「版本记录」的配置
     * e.g. [{ title: 'Changelog', entry: '__docs__/changelog.md' }]
     */
    extraDocs?: Array<{ title: string; entry: string }>;
  };
};
```

## 目录结构
我们对于项目整体的目录结构没有特别的要求，如果你所有的组件都维护在同一 NPM 包中，项目结构可能是这样的：
```Plain Text
├── components ## 组件目录
│   ├── ComponentA
│   ├── ComponentB
│   │...
├── arco.workspace.jsonc
├── package.json
└── tsconfig.json
```

你也可以基于 Monorepo 来将多个 NPM 包维护在同一项目中，此时项目结构可能是这样的：
```Plain Text
├── packages ## 组件目录
│   ├── package-a
│   ├── package-b
│   │...
├── arco.workspace.jsonc
├── package.json
└── tsconfig.json
```

组件通常需要包含组件源码、样式、文档、单元测试四个部分，所以组件目录的结构通常如下：
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

## 初始化工作区
我们提供了名为 `@arco-cli/generator` 的组件用来初始化工作区，执行以下命令：
```Bash
## 创建一个标准工作区，它是单包多组件形式
npx @arco-cli/generator new your-workspace-name

## 创建一个 Monorepo 工作区
npx @arco-cli/generator new your-workspace-name --templateArgs="--monorepo"

## 为 Monorepo 创建一个新的子包
## --template 指定模板
## --path 指定创建新包的父目录
cd  your-workspace-name
npx arco create your-package-name --template=react-package --path=packages
```

`@arco-cli/generator` 命令详情：
```Plain Text
arco-generate new <name>

create an empty arco material workspace

位置：
  name  Workspace directory name                                 [字符串] [必需]

选项：
  -p, --path             Path to new workspace (default to current dir) [字符串]
      --package-name     Package name of workspace root NPM package     [字符串]
      --package-version  Package version of workspace root NPM package  [字符串]
      --description      Package description of workspace root NPM package
                                                                        [字符串]
      --force            Force overwrite directory, if it already exists  [布尔]
      --template         The template to generating a new workspace     [字符串]
      --templateArgs     The arguments for template to generating a new
                         workspace                                      [字符串]
```

## 初始化组件
通过以下命令来为工作区添加组件：
```Bash
npx arco create Button

## --path 指定创建组件的父目录
npx arco create Button --path="packages/my-sub-package/src"
```

### 配置组件创建时的默认行为
在 `arco.workspace.jsonc` 中，通过以下字段配置新增组件时的一些默认行为：
```JSON
{
  "arco.service/generator": {
    // 新增组件的默认目录，等同 arco create --path="workspace-path/defaultPath"
    "defaultPath": "src",
    // 新增组件时使用的默认模板
    // 目前仅支持指定本地目录作为模板，请使用 file: 作为模板路径前缀
    "defaultTemplate": "file:.scripts/templates/component",
    "hooks": {
      // 组件创建完成后所执行的 Hook 函数
      "afterComponentCreated": "./.scripts/workspaceHooks/afterComponentCreated.js"
    }
  }
}
```

### 自定义组件模板
你可以将本地目录指定为 `arco create` 时的组件模板。以下文件会被视为特殊文件，它们将不会被直接拷贝至目标目录（除此之外的所有文件，都将直接被拷贝至目标目录）：

* `__arco.tpl.desc.json` 模板描述文件，它所接收的字段类型如下：

```TypeScript
interface TemplateDesc {
  // 模板类型
  type: 'workspace' | 'package' | 'component';
  // 模板名称
  name: string
  // 仅组件模板需要
  // 可接受 arco.workspace.jsonc 组件配置中相同的 entries 字段，用于在组件创建完成后自动填充 Workspace 配置
  entries?: {}
}
```


* `__arco.dir.desc.js` 文件目录的描述文件，它需要暴露一个CommonJS 模块：

```JavaScript
module.exports = (context) => {
  return {
    // 可通过 context.templateArgs 参数进行目录过滤，ignore 为 true 时将直接忽略此目录下的所有文件
    ignore: false,
  };
};
```


* `*.tpl.js` 模板文件的描述文件，它需要暴露一个 CommonJS 模块：

```JavaScript
module.exports = (context) => {
  return {
    // 创建后的文件名
    filename: `${context.name}.tsx`,
    // 创建后的文件内容
    contents: '// your file contenst',
  };
};
```

以上函数统一接收组件创建时的上下文信息：
```TypeScript
type GeneratorContext = {
  path: string;
  name: string;
  packageName: string;
  templateArgs: Record<string, any>;
  version: string;
  description: string;
};
```

可参考 Arco CLI [内置模板](https://github.com/arco-design/arco-cli/tree/next/packages/generator/src/templates)。需要注意，此示例中的模板文件经过了 Babel 编译， `*.tpl.js` 和 `__arco.dir.desc.js` 必须遵循 CommonJS 规范。

