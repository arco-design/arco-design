`````
Material Market 2.0

# Env

Arco CLI introduces the concept of component runtime environment (Env)

`````
*Auto translate by google.*

We introduced the concept of component runtime environment (Env) for Arco CLI, aiming to provide a unified upper-level interaction and development experience for components based on different frameworks (React / Vue / Angular) and different execution environments (Browser / Node). Therefore, the configuration expansion of the development environment is the expansion of Env.
Currently, only React Env is provided as a component execution environment. Next, we will introduce in detail how to expand the custom configuration of each link of the React development environment.
## Built-in modules
For component development scenarios, React Env has built-in encapsulation of the following modules:

* TypeScript: Encapsulation for TypeScript, supporting component source code building;

* Less / Sass: Encapsulation for Less / Sass, supporting component style building;

* Jest: Encapsulation for Jest, supporting component unit testing;

* Webpack: Encapsulation for Webpack, supporting component local development preview and component document building.

Therefore, the environment expansion of React Env is the expansion of the above modules.

## Comply with the specification
Before entering the actual development, we recommend that you read the [Material Development Specification](https://arco.design/docs/material/spec). This specification contains some of the best practices and things to avoid in material development that we have summarized.

You don't need to fully comply with the content mentioned in the specification, but all materials in the same team should try to ensure that they use the same development specification.

## Development
Through the `arco start` command, you can enter the development mode to preview all components in the current workspace. Use `arco start ComponentName` to specify the component that needs to start preview.
Next, we will take this directory structure as an example to explain the component development process:
```Plain Text
├── src
│ ├── __docs__ ## Component document directory
│ │ ├── index.mdx ## Component help document
│ │ └── basicUsage.tsx ## Single component Demo is placed in a single file
│ │
│ ├── __test__ ## Component unit test directory
│ │ └── index.test.tsx
│ │
│ ├── UserSelect.tsx ## Component source code
│ ├── index.ts ## Component main entry
│ ├── interface.ts ## Component type definition entry
│ │
│ └── style ## Component style entry
│ ├── index.scss
│ └── index.ts
```

#### Component Documentation
We maintain component usage documentation based on MDX, which is a superset of Markdown. It can directly use all Markdown syntax and supports JSX syntax.
You can configure the entry for component preview documentation and API documentation parsing in the component field in `arco.workspace.jsonc`:
```JSON
{
"arco.aspect/workspace": {
"components": [
{
"name": "ComponentName",
"entries": {
// Configure component documentation entry through this field
"preview": "./__docs__/index.mdx"
// Configure the entry for parsing API documentation through this field, supporting arrays
"jsdoc": ["./interface.ts"]
}
}
]
}
}
```

The usage of component usage documentation and API documentation has been introduced in detail in the "Quick Start - Development Materials" section, so I will not repeat it here.
###### Specify Arco theme package
First of all, it should be clear that Arco theme package should be introduced by business projects according to their own needs. The material itself should not directly introduce a theme package into the material's own style, or use it as an NPM dependency. "Using Arco theme package" here only refers to introducing the theme package style in the material Demo document to show the performance of this material under a certain theme.
We provide two ways to introduce Arco theme package in material preview:
######## Configure component additional style
We provide a simple way to dynamically apply different theme styles to each component, by adding configuration to the component in `arco.workspace.jsonc` to provide a list of themes to choose from. When previewing the material, the `.css` file corresponding to the theme will be introduced as an outline style.
(**After configuring this field, the theme switch will take effect in both the local workspace and the material platform preview**)
```JSON
{
"arco.aspect/workspace": {
"components": [
{
"name": "ComponentName",
// Use this field to configure the extra styles of components that can be dynamically injected
"extraStyles": [
{
"title": "Linear Theme",
"href": "https://sf-unpkg-src.bytedance.net/@arco-design/theme-line@latest/css/arco.css",
}
]
}
]
}
}
```

######## Import through Webpack plug-in
If you need more customized operations for the compilation of the theme package, you can install the theme package in the project by yourself, and then import it through the Arco Webpack plug-in:

1. Add the theme package in the project development dependencies (devDependencies);

2. Add in the project development dependencies (devDependencies) [ArcoWebpack plugin](https://www.npmjs.com/package/@arco-plugins/webpack-react), used for on-demand loading of Arco component styles and application of themes;
3. After the dependency is updated, add the relevant configuration of the ArcoWebapck plugin in `arco.env.config.js`:

```JavaScript
// arco.env.config.js

module.exports = function defineConfig() {
const commonWebpackConfig = {
plugins: [
new ArcoWebpackPlugin({
theme: '@arco-design/theme-line',
webpackImplementation: config.webpack,
// The directory where the plugin takes effect, the default value is src
// If your component source directory is not src, you need to set this field
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
previewConfig: [
(config) => {
return config.merge(commonWebpackConfig);
},
],
}
};
}
```

###### Specify the document's ContextProvider
In some scenarios, your component may need to provide a unified ContextProvider to work. In order to avoid manually wrapping the ContextProvider for each document, we allow the document to be wrapped in context by configuring fields.
```TypeScript
// src/globalContext/index.tsx
import React, { createContext, PropsWithChildren, useMemo } from 'react';

export const GlobalContext = createContext({ appName: '' });

// The default exported component will wrap the content of index.mdx
export default function GlobalContextProvider({ children }: PropsWithChildren) {
const contextValue = useMemo<GlobalContextType>(() => {
return { appName: 'Example Project' };
}, []);
return <GlobalContext.Provider children={children} value={contextValue} />;
}
```

If you need to use the GlobalContext above in each component Demo, you can add the configuration field for `previewContextProvider` in `arco.workspace.jsonc`:
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
// Path relative to component base directory
// The default export module of this document will wrap index.mdx when rendered
"previewContextProvider": "../globalContext/index.tsx"
}
}
]
}
}
```

###### Listening to document page events
We provide the `window.__registerArcoPreviewEventListener` method for the component preview page, which is used to listen to events such as dark mode switching and component theme (extraStyles) switching.
```TypeScript
type EventType =
// Inject the style configured by the component entries.extraStyles into the page
| 'appendExtraStyle'
// Dark mode switch
| 'switchDarkMode'
// Tab switch event when the component document is split by ArcoMDXPreviewSplit
| 'switchActiveTab'
// Page scrolling
| 'scrollIntoView'
// Update the offset of the right anchor relative to the top of the page
| 'updateAnchorOffset';

// Remove event listener function
type UnregisterFn = () => void;

// Event listener function
type RegisterFn = (
eventType: EventType,
callback: (event: { type: EventType; data: any }) => void
) => UnregisterFn;

(window.__registerArcoPreviewEventListener as RegisterFn)?.('switchDarkMode', (event) => {
console.log('switch dark mode', event);
});
```

#### Version log
Currently, we do not provide a built-in version log generation tool, which requires manual maintenance or self-implementation of the version log extraction function.
In order to ensure the simplicity of component usage documents and facilitate the automatic extraction and generation of version log documents by tools, we support adding other documents to components in addition to preview documents. Add additional documentation entries through the component configuration field in `arco.workspace.jsonc` (only supports `.md` files):
```JSON
{
"arco.aspect/workspace": {
"components": [
{
"name": "ComponentName",
"entries": {
// Use this field to configure the matching rules for unit test files
// Default value: ['**/?(*.)+(spec|test).[jt]s?(x)']
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

When previewing locally and on the Material Platform, `extraDocs` The documents in will be displayed in different tags together with the component preview documents:
![Image](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0e20e7e1222f4e57b55d3eccc936cc35~tplv-goo7wpa0wc-image.image)
#### Style
React Env has built-in support for Sass / Less. You can freely choose the type you prefer, or write styles directly in CSS files.
###### Support on-demand style loading
You may have noticed that in the default directory structure, in addition to the `index.less/scss` style file entry under `src/style`, there is also an `index.ts` file. This file is mainly used to support on-demand loading of component styles. Let's take [babel-plugin-import ](https://www.npmjs.com/package/babel-plugin-import) as an example. The principle of implementing on-demand loading of component styles is as follows:
```JavaScript
import { Button } from '@arco-design/web-react';
ReactDOM.render(<Button>xxxx</Button>);

↓ ↓ ↓ ↓ ↓ ↓

var _button = require('@arco-design/web-react/lib/button');
require('@arco-design/web-react/lib/button/style/index.js');
ReactDOM.render(<_button>xxxx</_button>);
```

After turning on the on-demand loading style option, the plugin will automatically reference `dirComponent/style/index.js`. Therefore, in order to support the on-demand loading of component styles by such plug-ins, we need to import all the styles that the current component depends on in `src/style/index.ts`:
```JavaScript
// style/index.ts

// Import the style file of the current component
import './index.less';

// Import other component styles in this package that the current component depends on (if any)
import '../../AnotherComponent/style';

// Import the Arco component style that the current component depends on (if any)
import '@arco-design/web-react/es/Button/style';
```

###### Use [CSS Modules](https://github.com/css-modules/css-modules) with caution
In business project development, CSS Modules is a very common form of style code organization. But if you are developing a component that needs to be provided to other developers, we recommend that you use this method with caution. It contains the following two serious problems:

* Requires special build support: Unlike `.css` files that can be introduced in a variety of ways, CSS Modules builds usually require some additional plug-in configuration support (such as Webpack [css-loader](https://www.npmjs.com/package/css-loader##modules));
* Users cannot use class names to override styles: After CSS Modules are compiled, their DOM class names will become a string of Hash strings, and users cannot directly override component styles through class name selectors;

```CSS
// For components that use regular class names to organize styles, users can also directly override styles through class name selectors
.arco-btn {
font-size: 12px;
}
```

###### Avoid introducing style files in JS files
Avoid introducing style files in JS files. Try to keep logic and style separate, ensure that users can introduce JS and CSS files separately, and avoid user compilation failures due to different build environments.
## Testing
In the default project, unit tests for components are located under `src/__test__`. To write unit tests for components, you need to be familiar with the following tools:

* [Jest](https://jestjs.io/)

* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)

Use the `arco.workspace.jsonc` file to configure the matching rules for unit test files:
```JSON
{
"arco.aspect/workspace": {
"components": [
{
"name": "ComponentName",
"entries": {
// Use this field to configure the matching rules for unit test files
// Default value: ['**/?(*.)+(spec|test).[jt]s?(x)']
"testFilePatterns": ["__test__/*.test.tsx"];
}
}
]
}
}
```

Use the `arco test` command to test the components in the workspace. Use `arco test ComponentName` to specify the component to be tested.
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a2ac18a16b8741e5b9a1ce2a8b5dee19~tplv-goo7wpa0wc-image.image)

#### Pass in Jest CLI parameters
Since the `arco test` command is an upper-level encapsulation of the test tool, we avoid letting it directly accept the CLI command parameters of a test tool (such as [Jest CLI](https://jestjs.io/docs/cli)). If you need to pass parameters to Jest CLI, you can pass it through `--rawTesterArgs`:
```Bash
arco test --rawTesterArgs="jest -u --silent=false"
```

## Build
The `arco build` command can be used to build all components in the workspace. Under React Env, the component build product includes three parts:
```Bash
├── es ## Products that comply with the ESModule specification
├── lib ## Products that comply with the CommonJS specification
└── artifacts ## Material documents and their preview files (only for material previews on the material platform)
```

When actual users use it, the products in the `es/` or `lib/` directories will be used, while the content in the `artifacts/` directory is only used for material document previews on the material platform. When building materials, the construction of `artifacts/` is relatively time-consuming. You can specify the components or products to be built through additional parameters:
```Bash
## Use ComponentNamePattern to specify the components to be built. Multiple components can be separated by commas
## Similarly, the test/start/sync commands all support this usage
arco build ComponentA,ComponentB

## Use --tasks to specify the build tasks to be executed. Multiple task names can be separated by commas
## The names of the characters for each task can be obtained through the output interface during the build
arco build --tasks="TSCompilerESM,TSCompilerCJS"
```

![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/d140aa58f3d04e2aab71c8d38202cc23~tplv-goo7wpa0wc-image.image)

The ID format of the build task is `{AspectId}:{TaskName}`, so you can pass any part of the above ID to the `--tasks` parameter. For example:
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/434f16a40e6940e788c06f5b9fbc5d5b~tplv-goo7wpa0wc-image.image)

## Release
How to release NPM packages is beyond the scope of this document. Please refer to the NPM documentation or other tutorials on the Internet. Before releasing a new version to NPM, please confirm the following:

* The unit test has been fully executed to ensure that no new problems are introduced;

* The build task has been fully executed to build the latest component product. The complete package product should include three directories: `/es`, `/lib`, and `/artifacts`;

* Make sure that the new version number follows the [Semver specification](https://semver.org/) and does not introduce destructive updates (if any, please consider carefully and clearly mark them in the component usage document).

After NPM release is completed, the latest component documents are synchronized to the material platform through the `arco sync` command.
## Expandable configuration
#### Detailed explanation of configuration files
Similar to the Workspace configuration, we will look for a file named `arco.env.config.js` in the project root directory. This file is the configuration entry for all component Env. It needs to expose a function that returns a configuration object, which can receive a parameter to distinguish different Envs:
```JavaScript
// arco.env.config.js

module.exports = function defineConfig(envId) {
return {
// ... configs for component env
};
};
```

The configuration fields allowed by React Env are as follows:
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
* All configuration fields allowed by React Env
*/
type ArcoReactEnvConfig = {
/**
* Extend Jest configuration
*/
jest?: {
/**
* Jest configuration file path
*/
jestConfigPath?: string;
/**
* Jest module path (to replace arco-cli's internal dependency on Jest)
*/
jestModulePath?: string;
};
/**
* Extend Webpack's build configuration
* Note: Webpack is only used for previewing and building component documents in the workspace, and does not participate in the construction of component products
*/
webpack?: {
/**
* Extend component document product build configuration
*/
previewConfig?: WebpackConfigTransformer[];
/**
* Extend component local preview configuration
*/
devServerConfig?: WebpackConfigTransformer[];
};
/**
* extend config of TypeScript compiler
*/
typescript?: {
/**
* Pass in TypeScript module to replace arco-cli's internal dependency TypsScript
*/
tsModule?: any;
/**
* Extend the configuration of material product building
*/
buildConfig?: TsConfigTransformer[];
};
/**
* Extend the Less build configuration
*/
less?: {
/**
* Parameters required by less.render. Details: https://lesscss.org/usage/##programmatic-usage
*/
lessOptions?: Record<string, any>;
/**
* Whether to automatically create an entry file containing all Raw style files and build its products
* For example, the source code contains ComponentA/style.less and ComponentB/style.less. This option will automatically create an index.less that aggregates the above files and build the corresponding index.css
*/
combine?:
| boolean
| {
/**
* The file name of the aggregated file, which can also be a relative path. (Default value: index.less)
*/
filename: string;
};
/**
* Customize the style file compilation process
*/
compile?: (fileInfo, defaultCompileFn) => Promise<string>;
};
/**
* Extend Sass build configuration
*/
sass?: {
/**
* Parameters required by sass.compile. Details: https://sass-lang.com/documentation/js-api/modules##compile
*/
sassOptions?: Record<string, any>;
/**
* Same name configuration as less field
*/
combine?:
| boolean
| {
filename: string;
};
/**
* Customize style file compilation process
*/
compile?: (fileInfo, defaultCompileFn) => Promise<string>;
};
/**
* Extend ts-document related configuration when generating API documents
*/
tsDocument?: {
/**
* Accept parsing configuration of ts-document tool
* https://www.npmjs.com/package/ts-document
*/
tsDocumentOptions?: Record<string, any>;
}
};
```

View Details of [TypescriptConfigMutator](https://github.com/arco-design/arco-cli/blob/next/packages/aspect/src/typescript/typescriptConfigMutator.ts) and [WebpackConfigMutator](https://github.com/arco-design/arco-cli/blob/next/packages/aspect/src/webpack/webpackConfigMutator.ts).
#### Expand TS configuration
React Env has built-in [default configuration](https://github.com/arco-design/arco-cli/blob/next/packages/react/src/typescript/tsconfig.json) for TypeScript build, which can be packaged normally even if the `tsconfig.json` component does not exist in the project. But in addition to the `typescript` field in the above `arco.env.config.js`, we also allow custom TS build configuration through `tsconfig.json`. The `tsconfig.json` or `tsconfig.build.json` in the root directory of the NPM package will be expanded to the build configuration. At this time, their priorities are from high to low:

1. TS configuration specified by `arco.env.config.js`;

2. Configuration specified by `tsconfig.json` / `tsconfig.build.json` in the root directory of the NPM package;

3. Default TS configuration in React Env.

#### Expand Jest configuration
Customize the Jest configuration file path by configuring the `jest.jestConfigPath` field of `arco.env.config.js`.

```JavaScript
// arco.env.config.js

module.exports = function defineConfig() {
return {
jest: {
// Path relative to the project root
jestConfigPath: './jest.config.js',
}
};
};
```

```JavaScript
// jest.config.js
const defaultConfig = require(require.resolve('@arco-cli/react/dist/jest/jest.cjs.config.js'));

// It is recommended to extend the default Jest configuration of React Env
const finalConfig = {
...defaultConfig,
// ... extend config
};

module.exports = finalConfig;
```

#### Extend TS build process
React Env uses tsc to compile `.ts` files, and the output product directories are `/es` and `/lib`. Through configuration items, you can extend this compilation process.
The following uses the path alias configured by the `tsconfig.compilerOptions.paths` property in the conversion product of the [tsc-alias](https://www.npmjs.com/package/tsc-alias) tool as an example to introduce the usage of this configuration field:
```JavaScript
// arco.env.config.js
const { replaceTscAliasPaths } = require('tsc-alias');

module.exports = function defineConfig() {
return {
typescript: {
// TSCompiler config transformers
buildConfig: [
(config) => {
// Expand the NPM package TS compilation process by customizing the compile function
config.raw.compile = async ({ configFilePath }, defaultCompileFn) => {
// !!!The default compilation function must be executed
defaultCompileFn();
// Transform the path alias configured by the tsconfig.json compilerOptions.paths field
await replaceTscAliasPaths({ configFile: configFilePath });
};
},
]
}
};
};
```

#### Extend the style build process
###### Preprocess style files
The default Less/Sass build uses its default build method, but you can extend the compilation process through configuration items to perform additional processing before file compilation:
```JavaScript
const postcss = require('postcss');
const prefixer = require('postcss-prefixer');

// arco.env.config.js
module.exports = function () {
return {
less: {
// Extend the compilation process through this field
compile: async (file, defaultCompileFn) => {
// Add content to the less file before compiling by overriding the getContents function
const compiledLess = await defaultCompileFn({
...file,
getContents: () => `/** contents prepend to less file */\n${file.getContents()}`,
});

// Process the compiled less file, for example, add a unified class name prefix to it
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
// Same as less configuration
compile: async () => {},
},
};
};
```
#### Expand the subsequent tasks after the build is completed (>= 2.3.1)
We provide the `postBuild` option for `arco.service/compiler`, through which you can customize the subsequent tasks after the build is completed.
```JSON
// arco.workspace.jsonc
{
// This configuration item is used to specify the default behavior of TSCompilerESM / TSCompilerCJS
"arco.service/compiler": {
// Specify the subsequent tasks after the component is built, receive a string, which is the path of the script file relative to the root directory of the Arco workspace
"postBuild": './postBuild.js'
}
}
```

###### Automatically inject Arco style dependencies into the Less entry of the product
The following task will automatically inject the dependent Arco component style dependencies into its `/{es,lib}/ComponentName/style/index.js` after the component is built:
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

The task script is as follows (need to install `fs-extra^10.1.0` and `parse-es-import^0.6.0`):
This content cannot be displayed outside the Feishu document for the time being
#### Specify component build order
If your workspace NPM package has dependencies, such as B depends on A, you need to ensure that A is built before B, otherwise TypeScript will throw an error of `Cannot find module xxx' or its corresponding type declarations`.
The CLI has automatically analyzed the dependencies of each component based on the `dependencies` field in `package.json` and provided a default build order. If you still need to customize the build order, you can specify it through the following fields:
```JSON
// arco.workspace.jsonc
{
// This configuration item is used to specify the default behavior of TSCompilerESM / TSCompilerCJS
"arco.service/compiler": {
// Specify the compilation order of components. The fields received are: component ID, component ID keyword, component ID Glob matcher
// Put the components that need to be built first in the array, and the unspecified components will be placed at the end of the build queue
"componentCompilationOrders": ["base-component/**", "second-base-component/**"]
}
}
```
