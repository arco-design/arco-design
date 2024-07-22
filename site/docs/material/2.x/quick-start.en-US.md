`````
Material Market 2.0

# Get Started

Get started quickly with 2.0

`````

*Auto translate by google.*

> Before reading this document, we assume that you have mastered some basic knowledge required for material development:

* [NPM](https://docs.npmjs.com/getting-started): Since all our materials are ultimately provided in the form of NPM, you need to have a basic understanding of the development process of NPM packages;

* [TypeScript](https://www.typescriptlang.org/): We recommend using TypeScript for material development, which can help you avoid many code problems caused by JS's flexible types. At the same time, our component API document automatic generation function also relies on TypeScript;

* [MDX](https://mdxjs.com/): We maintain material documents based on MDX. If you are familiar with Markdown, it will be very easy to get started;

* [Lerna](https://lerna.js.org/): A for Monorepo management tool, which will be used if you need to manage a multi-package project;

If you are already proficient in using the above tools, please continue reading the document below, and we will guide you to quickly create your first material.
## What is a material
In the development of mid- and back-end projects, we have long been accustomed to using UI component libraries to improve development efficiency. The basic UI component library greatly reduces the cost of interface development, but such components are usually atomic components that are completely decoupled from business logic and cannot fully meet complex business scenarios.
The actual project contains a large number of modules that are strongly coupled with business logic that can be reused, such as site navigation bars and employee selectors. How to reuse basic business modules to the greatest extent within the team to improve efficiency and reduce redundancy? The concept of materials is to solve this problem. The basic business modules are extracted from the project and maintained uniformly, and they can be called "materials".

In addition, materials are not limited to the scope of UI components. We encourage the extraction and maintenance of common logic codes, functional functions, and middle layers from business codes. Such non-UI components can also be used as materials.
## Compared with NPM
### Relying on NPM
The material platform carries material products based on NPM packages. From the essence of material development and use, there is no essential difference between using the material platform and creating and publishing an NPM package from scratch. The capabilities we provide are mainly reflected in the following aspects:

* Automated project creation: Based on the CLI, you can quickly initialize a usable material project, and it is equipped with complete development, construction, testing, and documentation tools;
* Better team collaboration capabilities: Based on the unified maintenance and display of all materials of the team by the material team, you can get an excellent component documentation station experience;
* Share the results with all developers of the material platform.

### ID mapping
The material platform uses components as the smallest granularity, and a single NPM package can contain multiple components. For this reason, we use the combination of [package name + component name] to determine the ID of the material. It may include the following two situations:

* Single package component: Take `@arco-materials/select-with-check-all` as an example, its package contains only one component `SelectWithCheckAll`, and the material ID corresponding to this component is `@arco-materials/select-with-check-all/SelectWithCheckAll`;

* Component library: Take `@arco-design/web-react` as an example, its package contains multiple components, and the material ID corresponding to its components is `@arco-design/web-react/ComponentName`.

### Material version
The material itself does not provide independent version control, and its version depends entirely on the NPM package version. We **strongly recommend** using version numbers that follow [Semver (Semantic Version)](https://semver.org/)
### Reference method
Since the material products are hosted on NPM, all materials can be imported through the NPM package:
```JavaScript
import SelectWithCheckAll from '@arco-materials/select-with-check-all';
```

## Initialize the workspace
Initialize a React component workspace with the following command:
```Bash
npx @arco-cli/generator new workspace-name
```

![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/0740ed5120314888b09f8db9e0cb0ac6~tplv-goo7wpa0wc-image.image)

## Add new materials
If you have previously installed the arco-cli 1.x NPM package globally, when running the `arco xxx` command, Node may hit the 1.x CLI command. In this case, you can use `npm uninstall arco-cli -g` to uninstall the 1.x CLI, or use `npx arco xxx` to specify Node to look for executable commands in the current project's node_modules first.

Enter the workspace created in the previous step and create a blank component with the following command:
```Bash
## Create a blank component
npx arco create ComponentName
```

## Development materials
### Workspace preview
Enter the workspace and preview all the materials for this work:
```Bash
$ cd arco-cli-next-demo
$ npm start
```

Execute the command in the console and you will get the following output:
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/7d050ccc02984412aec3cb1de82cbf65~tplv-goo7wpa0wc-image.image)

And automatically open the workspace page in the browser:
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/4cf1384a2d0b4990821953d8b811ec59~tplv-goo7wpa0wc-image.image)

### Material Directory Structure
The material directory structure is as follows. You can try to modify its source code or document. The page will be automatically updated after the change:

```Plain Text
├── package.json
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
└── tsconfig.json
```

### Provide usage documentation
We use MDX Material documents are maintained in the form of "demo" and "API document". It is recommended to maintain each demo in a separate file, so that the document directory structure is clear, and the CLI will automatically display the demo source code in the document.
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
In MDX, you can write any Markdown syntax, JSX syntax, or import React components through `import`. If you are not familiar with the use of MDX, please refer to [this document](https://mdxjs.com/). By wrapping the component Demo with `<div data-arco-demo="YourDemoName" />`, we will automatically display the source code corresponding to Demo below it:
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/535269455044439590f4da9940a7af96~tplv-goo7wpa0wc-image.image)

### Provide API documentation
We will automatically inject the API documentation table at the end of the documentation page, so you don't have to bother writing Markdown tables. All you need to do is follow the writing conventions we set for the types:
Only `interface` or `type` declarations with `@title` will be extracted. You can specify which files to extract the API from in the jsdoc field in arco.workspace.jsonc.
Property members have the following available description tags:

* `@zh` Chinese description of the property
* `@en` English description of the property (optional)
* `@defaultValue` Default value of the property (optional)
* `@version` From which version the property was added (optional)

```TypeScript
/**
* @title Button (required, only interfaces or types with `title` description will be collected)
*/
interface ButtonProps {
/**
* @zh Button size (Chinese description of the property)
* @en Size of Button (optional, English description of the property)
* @version 1.2.0 (optional, which version the new property is supported in)
* @defaultValue 'default' (optional, default value of the property)
*/
size?: 'mini' | 'small' | 'default' | 'large';
}
```

### Document split
**Version requirement: @arco-cli/arco >= 2.1.0**
If your component has a large number of demos, you can split them through the built-in component `ArcoMDXPreviewSplit` we provide. The usage is as follows:
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

The component's API documentation is rendered to the bottom of the current document by default. You can specify the DOM ID of its rendering node through the MDX header meta information `apiPlaceholderElementId`. The above document will be rendered as follows:
![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/8a18ce45b7074998be33860371408e1e~tplv-goo7wpa0wc-image.image)

## Release Materials
### Build Materials
Before preparing to release materials, please make sure to complete the material building.
```Bash
## Build all materials in the workspace
$ arco build
```

![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/403abe878cff4102acfa0540e06dcc0a~tplv-goo7wpa0wc-image.image)

### Publish to NPM
After the material is built, check its package products, which should contain the following directories:
```Plain Text
├── es ## Products that comply with the ESModule specification
├── lib ## Products that comply with the CommonJS specification
└── artifacts ## Material documents and their preview files (only for material previews on the material platform)
```

After confirmation, modify the `package.json` version number and publish the NPM package:
```Bash
$ npm publish
```

If you don't have NPM If you have experience in publishing packages, please read the NPM documentation for help.
### Synchronize to the material platform
If you are a ByteDance intranet user, use the `arco host arco.bytedance.net` command to switch the Arco domain used in the CLI to the intranet version.

All materials in the workspace can be synchronized to the material platform with the following command:
```Bash
## Synchronize all materials in the workspace to the material platform
$ arco sync
```

The `sync` command requires a line verification of the user identity. Please make sure that you have logged in as a user through the `arco login` command before executing this command.
If you need to verify your identity in the CI process, you can carry the user token information through the Node environment variable:
`ARCO_CONFIG_X_ARCO_ACCESS_TOKEN=YOUR_ACCESS_TOKEN arco sync`
The user token can be obtained through the following ways: Material Platform Homepage -> Click the user avatar in the upper right corner -> Click "Personal Center" -> Click "Add Secret Key"

![](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/a9e4ebdc287c4c24b17a8ccb3f8e9360~tplv-goo7wpa0wc-image.image)

After the synchronization is successful, you can go to [Material Platform] - [My Materials] to view the materials just released:

<div class="markdown-img-layout-2">
<img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/959331ca87f447589147f4eb4a848634~tplv-goo7wpa0wc-image.image"/>
<img src="https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/9d12f46733544d9094a3dcd74e68ea6f~tplv-goo7wpa0wc-image.image"/>
</div>

## Tips
### Execute commands on specific components
Arco CLI's `start/build/test/sync` commands all support specifying component ID filtering rules to execute commands only on specific components.
Assume that your workspace has three components with IDs library/Button, library/ButtonPro, and pro-table/Table. You can filter them using the following rules:
```Bash
## The default filtering rule is that the component ID contains the given characters
## Will get library/Button, library/ButtonPro
arco start library

## When the rule contains the * character, it will be filtered using the Glob rule
## Will get library/Button, library/ButtonPro
arco start Button*

## Manually specify filtering rules (CLI Version >= 2.4.1)

## is: Perform an exact match and get library/Button
arco start is:library/Button
## reg: Perform a regular match and get library/Button, library/ButtonPro
arco start reg:Button$
## glob: Perform a Glob match and get library/Button, library/ButtonPro
arco start glob:library/*

## Multiple filter rules can be separated by commas
arco start reg:Button$,ButtonPro$
arco start is:library/Button,pro-table/Table
```
