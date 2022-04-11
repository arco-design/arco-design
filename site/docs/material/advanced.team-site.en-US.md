`````
Material Market

# Team Site

Understand the team document site plan of the material platform.
`````

*Auto translate by google.*

**The team site is NOT currently supported in Vue projects, please pay attention to the follow-up upgrade notice.**

On the Arco material platform, the materials belonging to a team are displayed in the form of a list, and only the materials of [one component occupies one NPM package] are previewed. If the team adopts the material library form of [multiple components corresponds to one NPM package], it will Cannot preview on the material platform. These restrictions make this page unable to meet the needs of team members to quickly view material usage documents. We have received feedback from multiple teams. We hope that the material platform can provide a team site similar to [Arco Component Library Documentation Station](https://arco.design/react/docs/start) to facilitate the sharing of materials within the team.

The development preview of all material templates provided by Arco uses the Storybook method. We don't want users to develop and deploy document sites on their own. The cost is too high and it will be completely out of touch with the material platform. In order to achieve the goal of building a team site at low cost, we designed a compromise solution:

- The material platform provides a site framework, grasps the overall structure, unified interaction and style, and unified maintenance;
- Pack all the Demo and API documents of the material, extract the information and upload them for dynamic loading of the content area of ​​the document site;
- Through the configuration method, the team is allowed to configure the site's internationalization options, onCall method and other customized content.

## Initialization

We provide a material site template that is most decoupled from the project structure, so the site project can be initialized in any project.

Use the `arco init arco-team-site --pure` command to initialize the site directory in the project. (Arco CLI version >= 1.19.0)

The command needs to fill in two parameters:

- The package name of the template: @arco-materials/template-team-site
- The package name of the site project: it's up to you.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/94a1d3c76247c37f82fb4f5d52933740.png~tplv-uwbnlip3yd-webp.webp)

## Project Configuration

The initialized directory structure of the site only needs to pay attention to the following directories:

```
├── .config // configuration file directory
│ ├── main.js // site related configuration
│ └── webpack.config.js // Extend webpack build configuration
│
├── docs // Custom document directory
│ ├── en-US // Store documents in the corresponding language
│ └── zh-CN // Store documents in corresponding languages
```

### Config Intellisense

**Version requirement `arco-material-doc-site >= 1.4.0`**

Since `arco-material-doc-site` ships with TypeScript typings, you can leverage your IDE's intellisense with jsdoc type hints:

```js
// .config/main.js

/**
 * @type {import('arco-material-doc-site').MainConfig}
 */
module.exports = {... };
```

```js
// .config/webpack.config.js

/**
 * @param config {import('arco-material-doc-site').WebpackConfig}
 */
module.exports = (config) => {};
```

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/da38d96ab9856876f34f90e0fa05f514.png~tplv-uwbnlip3yd-webp.webp)

### Material entry configuration

In order to ensure that the site construction can process the correct material content, it is necessary to configure the material entry information in `.config/main.js`.

Refer to the following file content. If your project is created based on the Arco "Component Library" or "Monorepo" material template, select the correct `build.globs.component` value.

```javascript
// .config/main.js
module.exports = {
  // Build configuration
  build: {
    // match the path of the document and component
    globs: {
      // Can be used for configuration of Arco Monorepo template
      component: {
        base:'../*',
        doc:'docs/README.md',
        demo:'src/demo/index.js',
        style:'src/style/index.ts',
      },
      // Can be used for configuration of Arco material library template
      // component: {
      // base:'../components/*',
      // doc:'README.md',
      // demo:'demo/index.js',
      // style:'style/index.ts',
      // },
      // Can be used for configuration of Arco tool library templates
      // component: {
      // base:'../src/*',
      // doc:'README.md',
      // demo:'demo/index.js',
      // },
      doc:'./docs/**/*.md',
    },
    // Whether to introduce the material style file
    withMaterialStyle: true,
  },
  // Site configuration
  site: {
    // Languages ​​supported by the site
    languages: ['zh-CN'],
    // ID of Feishu onCall group
    larkGroupID:'',
    // Allow to switch site theme
    allowThemeToggle: false,
  },
};
```

### Extended build configuration

If you encounter any build exception, you can try to extend `.config/webpack.config.js` to solve it. The problem that the material module in the figure below cannot be found may occur in the construction of the material project. It can be solved by configuring the `webpackConfig.resolve.alias` field.

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

## Development Mode

**Version requirement `arco-material-doc-site >= 1.4.0`**

The site dependency package `@arco-desgin/arco-doc-site` provides the `arco-doc-site dev` command to start the development mode of the team site locally as an alternate option for Storybook. In this way, even if you do not create a project using the official material template provided by Arco, you can easily develop materials.

**Note: You can speed up the Dev mode through Webpack `resolve.alias` configuration.**

For example, use the NPM package name to introduce the module in your material Demo:

```jsx
import {Button} from'@arco-design/my-material';

export default () => <Button/>;
```

You can use the `resolve.alias` configuration to specify the path for Webpack to find this module.

```js
// .config/webpack.config.js
module.exports = (config) => {
   config.resolve.alias['@arco-design/my-material'] ='/project-root/packages/my-material/src';
};
```

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c6001648f6b03f932f8b99e5505dbc1e.png~tplv-uwbnlip3yd-webp.webp)

## Effect preview

**Note: The following commands all need to be operated under the site directory.**

```
# Try to build the site project
yarn build
```

If the construction is successful, you can preview its actual effect on the material platform.

```
# Preview the actual display effect of the site
yarn preview
```

The preview content should include both custom documents and material documents. If the content is missing, please check whether the configuration items in the previous step are correct.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/386069293bf5b040ee09c6c233be765d.png~tplv-uwbnlip3yd-webp.webp)

## Deployment binding

After the preview confirms that the content is correct, you need to publish the site as an NPM package, and then configure the path of the module file in [Material Platform-Team Page-Team Site]. Teams with high requirements for access speed can also upload the build product directly to the CDN, and then configure the resource CDN address.

**Only the team owner has the right to edit the site configuration.**

**The path supports directly filling in the NPM package name corresponding to the site (not the material package).**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d14e7b6b380cee60d66e7180d05420d5.png~tplv-uwbnlip3yd-webp.webp)

## globalization

Multi-language support for site content mainly includes three parts: custom documentation, component API documentation, and component description information.

- Custom documents need to be written under `/site/docs`, and the languages ​​are distinguished by folders.
- The suffix of the component API document distinguishes different languages, for example: `README.zh-CN.md`, `README.en-US.md`. The comments written in `/** xxx */` will be extracted by the document generation tool. The default generated document is named `README.md`. If you need to support other languages, you need to create a corresponding document and translate it.

```typescript
export interface ComponentOneProps {
  /** Child node of the component */
  children?: ReactNode;
  /** Additional style of the component */
  style?: CSSProperties;
}
```

-Component description information needs to be written in JSDOC syntax in `demo/index.js`, and this information will be collected when the site module is packaged.

```jsx
/**
 * @file
 * @name
 * zh-CN: component name
 * en-US: Name of Component
 *
 * @memberOf
 * zh-CN: component classification, for example: data input, navigation
 * en-US: Sort of this component
 *
 * @description
 * zh-CN: description information of the component
 * en-US: Description of this component
 */

/**
 * @name
 * zh-CN: The title of this demo
 * en-US: Title of this demo
 *
 * @description
 * zh-CN: Descriptive information of Demo, which can describe its usage and precautions
 * en-US: Description of this demo
 */
export {default as Basic} from'./basic';

/**
 * @name
 * zh-CN: Advanced usage
 * en-US: Advanced
 *
 * @description
 * zh-CN: This is the advanced usage of the component
 * en-US: This is a advanced usage of ComponentOne.
 */
export {default as Advanced} from'./advanced';
```

## Dark theme

The material supports the dark theme without additional configuration, just use Arco's built-in color variables to define the color in the component development. Reference [ArcoDesign | Dark Mode](https://arco.design/react/docs/dark)

```css
table {
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-1);
}
```

## Using the Arco Design Lab theme

See ["FAQ - Associated Topics"](/docs/en-US/material/qa#how-to-associate-design-lab-theme).

## Site configuration

Through the open configuration field, we allow some simple configuration of the site, currently supported configurations include:

- Multi-language options
- Theme switching options

The basic site configuration can be quickly configured in `/.config/main.js`, and the material platform will render the page according to the configuration after adding this module:

```javascript
module.exports = {
  // ...
  // Site configuration
  site: {
    // Languages ​​supported by the site
    languages: ['zh-CN'],
    // Allow to switch site theme
    allowThemeToggle: false,
  },
};
```

By exposing the module with the specified name in the site building product, it can theoretically support a higher degree of customization, such as fully customizing the footer, rendering team custom components (floating help window), etc.

## Use Hook

We exposed the Hook of the site Demo runtime, and you can specify the function to be executed at a specific time through configuration.

```javascript
// .config/main.js
module.exports = {
  build: {
    globs: {
      hook: {
        // The path to execute the function when the site is initialized
        beforeAll:'hooks/beforeAll.ts',
      },
    }
  },
};
```

```typescript
// hooks/beforeAll.ts
type Params = {
  // Current site language
  language: string;
};

export default function beforeAll({ language }: Params) {
  // return Promise
}
```

## Specify Arco version

By default, we have already externalized `@arco-design/web-react` when building the site, so the packaged product does not contain the Arco component library code and styles, they will be injected globally by the site page. You can configure the Arco component library version it uses in [Material Platform-Team Page-Team Site].

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cc7585da8cb507694e28f1d30d7d557a.png~tplv-uwbnlip3yd-webp.webp)

> When you use the `arco preview` command to preview the site locally, you can specify the Arco component library version by adding a Query parameter of `arcoVersion=2.12.0` to the URL.

By modifying the webpack configuration, you can avoid externalizing `@arco-design/web-react`, but we generally do not recommend this approach (the materials should be available in all Arco versions as much as possible).If you do not need to use the globally injected Arco component library, you can choose "Do not inject Arco".

## Transformation of own projects

The Arco document site has been decoupled from the project structure to the greatest extent. Theoretically, the document site can be initialized from any existing project. Follow the steps below:

### Initialize the site

Refer to the steps in [Basic Usage-Initialization] to initialize the site directory in the project.

### Add Demo document

Add the `/demos` directory to the initialized site directory, and then write the corresponding Demo and README files for each material in this directory.

```
demos
├── add // Each material corresponds to a separate folder
│ ├── README.md // write any material help file
│ └── index.js // Write Demo for materials
```

The format conventions written by Demo are as follows:

- Component materials (currently only React components are supported)

```jsx
// basic.jsx
// Each Demo corresponds to a JSX file
import React from'react';

import {ComponentOne} from'@arco-design/rc-xxx';

export default () => {
  return <ComponentOne />;
};
```

```jsx
// index.js
// Summarize all demos by index.js, and add descriptions of materials and demos in the form of JSDoc

/**
 * @file
 * @name ComponentOne
 * @memberOf component type, for example: data input
 * @description Describe your component.
 * @author Material author
 */

/**
 * @name basic usage
 * @description describe your example
 */
export {default as Basic} from'./basic';
```

- Function material

```javascript
// index.js
// Add description information for materials and Demo in the form of JSDoc

/**
 * @file
 * @name function name
 * @memberOf function classification, for example: array processing
 * @description describes your function
 */
import add from'../../../src/add';

/**
 * @name basic usage
 * @description describe your example
 */
export const basic = {
  // Function execution method
  exec: () => add(),
  // Expected return of function execution
  result: null,
};
```

### Change site configuration

Modify the file entry configuration in `.config/main.js` so that it can correctly find the material Demo entry.

```javascript
module.exports = {
  // Build configuration
  build: {
    // match the path of the document and component
    globs: {
      component: {
        base:'demos/*',
        doc:'README.md',
        demo:'index.js',
      },
      doc:'docs/**/*.md',
    },
    ...
  },
  // Site configuration
  site: {
    ...
  },
};
```

Complete site preview and deployment.

## Detailed configuration file

All available configurations of `.config/main.js` are as follows:

```typescript
interface MainConfig {
  /**
   * Build config for site
   * @zh 站点构建配置
   */
  build: {
    /**
     * Rules to match the path of document and demos
     * @zh 配置文档和 Demo 的路径
     */
    globs: {
      /**
       * Glob pattern of pure document
       * @zh 纯文档的 Glob 匹配符
       */
      doc: string;
      /**
       * Glob patterns of component
       * @zh 组件相关的 Glob 匹配规则
       */
      component: {
        /**
         * Glob pattern to math the path of component
         * @zh 组件目录的 Glob 匹配符
         * @e.g ../components/*
         */
        base: string;
        /**
         * Glob pattern of component demos
         * @zh 组件 Demo 的 Glob 匹配符
         * @e.g demo/index.js
         */
        demo: string;
        /**
         * Glob pattern of component document
         * @zh 组件文档的 Glob 匹配符
         * @e.g README.md
         */
        doc?: string;
        /**
         * Path of component style
         * @zh 组件样式路径
         * @e.g style/index.less
         */
        style?: string;
      };
      /**
       * Hooks to execute when demos are rendered
       * @zh Demo 渲染时执行的钩子函数
       */
      hook?: {
        /**
         * Callback function executed before all demos are rendered
         * @zh 在所有 Demo 渲染之前执行的回调函数
         */
        beforeAll?: string;
        /**
         * Callback function executed before each demo is rendered
         * @zh 在每个 Demo 渲染之前执行的回调函数
         */
        beforeEach?: string;
      };
    };
    /**
     * Whether to import material style file
     * @zh 是否将组件的样式一同打包
     */
    withMaterialStyle?: boolean;
    /**
     * Options for development mode
     * @zh 站点 Dev 模式时的配置
     */
    devOptions?: {
      /**
       * Whether to auto import Arco library style
       * @zh 是否自动注入 Arco 组件库的样式
       * @default true
       */
      withArcoStyle?: boolean;
    };
  };
  /**
   * Runtime config for site
   * @zh 站点运行时配置
   */
  site: {
    /**
     * Languages allowed to switch
     * @zh 可切换的语言类型
     * @e.g ['zh-CN', 'en-US']
     */
    languages: string[];
    /**
     * Lark group id for on call
     * @zh 飞书 onCall 群的 ID
     */
    larkGroupID?: string;
    /**
     * Theme package name of Arco Design Lab
     * @zh 关联使用的 Arco 主题商店主题包名
     */
    arcoDesignLabTheme?: string;
    /**
     * Whether switching themes is allowed
     * @zh 是否允许切换主题
     */
    allowThemeToggle?: boolean;
    /**
     * Config of material demos
     * @zh 页面 Demo 的配置
     */
    demo?: {
      /**
       * Whether demos are editable
       * @zh Demo 是否允许编辑调试
       */
      editable?: boolean;
      /**
       * Default external info of code editor
       * @zh Demo 编辑器默认的 External 资源配置
       */
      defaultExternalList?: ExternalSourceInfo[];
    };
    /**
     * Config menu items
     * @zh 配置菜单栏
     */
    menu?: {
      /**
       * The maximum allowed sub-menu level, the excess levels will be displayed in groups
       * @zh 允许的最大菜单层级，超出的层级将以分组的形式展示
       * @default 1
       */
      maxSubMenuLevel?: number;
      /**
       * Sort rule of menu items. The higher the menu item, the higher the priority
       * @zh 菜单排序规则，越靠前的菜单项优先级越高
       * @e.g { guide: ['document2', 'document1'] }
       */
      sortRule?: Record<string, String[]>;
    };
  };
}
```
