`````
Material Market

# General Guide

Quickly understand the concept of Arco materials and create your first material.
`````

*Auto translate by google.*

[Arco Material Platform](https://arco.design/material) serves the front-end technical team and is committed to enhancing team collaboration, promoting resource sharing, and improving development efficiency. Based on the technology precipitation from the ArcoDesign component library, we provide a simple and easy-to-learn material development program.

## What is material

In the development of mid- and back-end projects, we have long been accustomed to using UI component libraries to improve development efficiency. The basic UI component library greatly reduces the cost of interface development, but such components are usually atomic components that are completely decoupled from business logic and cannot fully meet complex business scenarios.

The actual project contains a large number of modules that can be reused and strongly coupled with business logic, such as the site navigation bar and the employee selector. How to reuse basic business modules to the greatest extent within the team to improve efficiency and reduce redundancy? The concept of materials is to solve this problem. The basic business modules are removed from the project and maintained in a unified manner, and they can be called "materials."

## Material classification

In Arco's material system, we subdivide materials into three categories: components, blocks, and pages.

### Components

The concept of components is the closest to the basic components provided by Arco. They are the basic elements of the page, but may be coupled with business logic. The usage is consistent with the component library, and components are referenced by introducing NPM dependencies.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ee537a3b3da4d336517f0c81e1ec3ca.png~tplv-uwbnlip3yd-webp.webp)

### Block

Blocks are more complex than components and can be understood as a collection of multiple components. A page usually consists of several blocks, and developers can add blocks to their own pages for secondary development. Due to the complexity of the block and the need for secondary development, the way the block is used is different from the component. In essence, the source code of the block is directly downloaded to the local project.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fc4eea64d19e85e4f1135c95e76e3cde.png~tplv-uwbnlip3yd-webp.webp)

### Page

The page is its literal meaning, and its usage is similar to the block. A typical example is the page provided by [ArcoDesign Pro](https://arco.design/pro/).

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b4e39a05533707af57ce5a083d93ad3f.png~tplv-uwbnlip3yd-webp.webp)

## Arco CLI

In order to facilitate developers to quickly build material projects and manage materials. Arco provides a Node-based scaffolding tool arco-cli, which roughly includes the following functions:

- Create an ArcoDesign-based material project based on the template;
- Publish, manage and use materials;
- Use material blocks or pages in the project;

Before starting further process experience, you need to install Arco CLI globally via `npm i arco-cli -g`.

## New Project

Through Arco CLI, we can quickly create a new material project based on ArcoDesign. Use `arco init yourProjectName` to initialize the project:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cceb75d805f175694a3e907c490e5e84.png~tplv-uwbnlip3yd-webp.webp)

After executing the command, we need to select the type of project we need to create. We introduced earlier that the materials are divided into three types of "components, blocks, and pages", but the CLI interface contains 6 options, and their specific meanings are as follows:

- Components: create a "basic" item of "component materials";
- Block: Create a "basic" item of "block material";
- Page: Create a "basic" item of "page material";
- Component library: create a "library library" item of "component materials";
- Lerna Monorepo: Create a "component material" "monorepo library" project based on Lerna management;
- ArcoDesign Pro project: Create a front-end engineering project based on ArcoDesign Pro.

The main difference between the above project types is the material organization form:

- "Basic" item means that the item contains one NPM package and only one material;
- The "library" item means that the item contains one NPM package, but contains multiple materials;
- The "monorepo library" item means that the item contains multiple NPM packages, and each NPM package contains one material.

Regarding the selection of project types, we have the following suggestions:

- Please avoid using "basic" items as much as possible in actual development. The organization form of each item corresponding to one item will bring great inconvenience to subsequent maintenance;
- The materials are only used by the team's internal business. The project of the "library" type is preferred, and all the materials of the team can be used by introducing a single NPM package into the project;
- Materials are provided for all teams to use. Priority is given to projects of the "monorepo library" type. Each material is a separate NPM package for users to introduce. Multiple NPM packages are managed by Lerna to reduce maintenance costs for developers.

Here we choose the "Lerna Monorepo" type to create a project and wait for the completion of the project initialization.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d1da4e1f19ba518ce731d532a8e89406.png~tplv-uwbnlip3yd-webp.webp)

## Add material

According to the instructions of Arco CLI, run `yarn add:package myFirstMaterial` to add our first material. Here we need to answer a few questions about material information.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d5c36e42dd2b9b60cee09efc4bf775d6.png~tplv-uwbnlip3yd-webp.webp)

## Development materials

According to the instructions of Arco CLI, run `yarn dev` to develop preview materials.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c31a051d8426cf0566bea7474547debb.png~tplv-uwbnlip3yd-webp.webp)

### Code Development

All material items are developed by default using TypeScript. In material development, we suggest to follow the following constraints:

- Provide detailed API description;
- Follow the [semver](https://semver.org/lang/zh-CN/) version specification to avoid destructive updates in the main version;
- Materials for all users should avoid coupling with business logic and interface calls;
- Try to avoid using CSS Modules. If you cannot determine the user's technical selection, please ensure that the materials you develop will not cause unexpected development environment errors;
- Write test cases. The project has built-in Jest unit tests, and the robustness of materials is improved by writing unit tests.
- Try to use the CSS variables provided by Arco to define colors, so that your materials can seamlessly support [Dark Mode](https://arco.design/react/docs/dark).

### Demo writing

Please provide as detailed usage examples as possible for your materials.

The writing location of Demo is in the `/src/demo` directory, and each example should correspond to a separate file. When writing examples, you need to pay attention to the following:

- Declare and export the Demo in `/src/demo/index.js`. Only by declaring and exporting here can you preview the newly added Demo in Storybook;
- Add descriptions of components and Demo in `/src/demo/index.js`, these descriptions will be extracted during construction for display on the material platform;
- Demo does not support reference to other dependency packages related to React and Arco component library by default. If you need to import it, please refer to [Demo dependency](/docs/material/build#demo-dependency).

```javascript
 /**
 * @file
 * @title CloudIcon
 * @memberOf general
 * @description byte cloud icon
 */

/**
 * @title basic application
 * @description `CloudIcon` example
 */
export {default as Basic} from'./basic';

/**
 * @title all icons
 * @description `CloudIcon` includes all icons
 */
export {default as AllIcon} from'./icon';

```

### Documentation generation

The material document contains two aspects: component Props parameters and sample code. The directory structure of the material `/src` is as follows:

```
─ /src
  ├── __test__
  ├── TEMPLATE.md
  ├── demo
  │ └── basic.jsx
  ├── index.tsx
  └── style
```

You need to pay attention to `TEMPLATE.md` and `demo`. In projects using TypeScript, arco-scripts can quickly generate component interface documentation by extracting the content of comments. `TEMPLATE.md` is a template generated by the document. Its contents are as follows:

```
---
file: index
---

# TooltipButton

## Properties/Props

%%Props%%

## Demos

%%Demos%%
```

Among them, `%%Props%%` will be filled with the `Props` parameters of the component after the `docgen` command, and `%%Demos%%` will be filled with the Demo code in `/src/demo`.

```markdown
# TooltipButton

## Properties/Props

### `<TooltipButton>`

| Parameter name | Description | Type | Default value |
| ------ | :--------: | :---------: | -----: |
| title | Tip of the button | `ReactNode` | `-` |

## Demos

~~~jsx
import React from'react';
import TooltipButton from'@arco-design/rc-xxx';

/**
 * Basic usage
 */
export default () => {
  return <TooltipButton title="tooltip title">Demo Basic</TooltipButton>;
};
~~~
```

In the project created by the Arco official material template, you don't have to bother to deal with document generation, we will generate a new document before `npm publish` and upload it to NPM.

### Blocks and pages

The development of blocks and pages is slightly different from components. If you don't need to develop blocks or pages, you can skip this part for now.

Take the block project as an example, the file structure of `/src` is as follows:

```
src
├── README.md
├── __test__
│ ├── __snapshots__
│ │ └── demo.test.tsx.snap
│ └── index.test.tsx
├── demo
│ ├── basic.jsx
│ └── index.js
├── index.tsx
└── lib
    ├── index.tsx
    └── style
        └── index.less
```

Compared with components, you need to pay attention to the following differences:

- Develop your block under `/src/lib` (page is `/src/page`), this directory will be copied into the user's project when the user uses this block;
- There is no need to write demos for blocks and pages, just focus on their own development. The material platform will display the modules exposed by `/src/index` by default;

If you need to write a preview of the block displayed on the material platform, refer to the following steps:

- Modify the `docgen` command in the block package.json to `arco-scripts docgen`;
- Make sure arco-scripts >= 1.20.4;
- Make sure that `config.template ='README.md'` is configured in `/.config/docgen.config.js`;
- Add the following content to `/src/README.md`:

```markdown
 ## Demos

 %%Demos%%
```

- Write Demo for the material;
- After the local development is completed, you can use `yarn prepublishOnly && arco preview` to preview the actual display effect of the material platform.

## Preview material

In order to ensure that the developed materials can be previewed normally on the materials platform, we provide the `arco preview` command to preview local materials. Before previewing, ensure that the material has been constructed and generated documents, you can quickly achieve it through the following commands:

```bash
# Build and generate documentation
yarn prepublishOnly

# If material information has not been generated, generate material information
yarn generate

# Preview material
arco preview
```

## Release materials

After the preview is normal, we can publish our materials. In the Lerna project, the NPM version can be published through the `lerna publish` command.

After the NPM is released, we need to synchronize the material information to the material platform. If you are a member of a team and need to publish all materials in the project under the team, you can modify the default `group` field in the `arco.config.js` of the project root directory to be your team ID. In this way, all new materials will be released to your team by default when they are released.

```javascript
module.exports = {
  // globs to your packages
  // e.g. ['packages/*']
  packages: ['packages/*'],
  // command you want to replace'arco subCommand'
  // e.g. publish:'lerna publish'
  alias: {
    publish:'lerna publish',
  },
  // initial meta for'arco generate'
  initialMeta: {
    // Modify this to be your team ID
    group: 1,
  },
  // path of arco block insertion, relative to /src ('myPath' will be resolved as'/src/myPath')
  // pathBlockInsert:'pathRelativeToSrc',
};

```

Use the following command to synchronize material information:

```bash
# Synchronize the material information in the current directory
arco sync --from-current-package

# or
yarn sync

# Synchronize all material information under the current project
arco sync
```

So far, we have completed a material development and release process.

## Team Site

The team site is a more centralized display of team materials, and its format is based on the official Arco component documentation page. Before creating a team site, you need to go to [this page](https://arco.design/material/createGroup/) to apply for creating your own material team.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6ee1b1c7df7c084da691b5e8797e7ae9.png~tplv-uwbnlip3yd-webp.webp)

Regarding the configuration and usage of the team site, please go to [team site](/docs/material/team-site).
