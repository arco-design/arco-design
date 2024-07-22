

`````
Material Market 2.0

# Workspace

`````

*Auto translate by google.*

We use the concept of "Workspace" to manage and maintain materials in the project. It is important to note its relationship with "Group". The smallest granularity of a material is a component. "Team" and "Workspace" are both aggregations of components. The only difference is that "Team" is an aggregation on the platform side, while "Workspace" is an aggregation on the local project side.

## Configuration
By default, we look for a file named `arco.workspace.jsonc` or `arco.workspace.js` in the project root directory to apply the workspace configuration. Most CLI-related commands can only be executed in the Arco material workspace, otherwise you will get the following error:
```Bash
workspace not found, please run arco command in a arco workspace
```

Through the workspace configuration file, you can configure the materials in the current workspace:
```JavaScript
modules.exports = function () {
return {
'arco.aspect/workspace': {
name: 'WorkspaceName',
components: {
// To avoid duplication, you can put common component configurations here
// Partial<ComponentConfig>
extends: {},
// Configuration list of all components in the current workspace
// ComponentConfig[]
members: []
}
}
};
}
```

The `ComponentConfig` type is defined as:
```TypeScript
type ComponentConfig = {
/**
* The relative path of the NPM package source directory relative to the workspace root directory
* e.g. packages/library/components
*/
rootDir: string;
/**
* Component name, which will be concatenated with the NPM package name as the component ID
*/
name: string;
/**
* Component author
*/
author?: string;
/**
* Component keywords
*/
labels?: string[];
/**
* Component team
*/
group?: number;
/**
* Component code repository address
*/
repository?: string;
/**
* Component design draft address
*/
uiResource?: string;
/**
* Whether the component is allowed to be forked by other users
* The source code directory corresponding to the current component can be configured through the srouces field. They will be uploaded to the material platform, and the default is rootDir
*/
forkable?: boolean | { sources: [] };
/**
* Configuration related to component entry files
*/
entries: {
/**
* The relative path of the component directory relative to rootDir, the default value is ./
* e.g In a single-package component, the component entry is directly located at ./src/index.ts. rootDir is src, base is ./
* e.g In a component library, the component entry is located at ./components/Button/index.ts. rootDir is components, base is Button
*/
base?: string;
/**
* Relative path of component main entry file relative to base
* e.g. if the entry file path is components/Button/index.ts, then rootDir is components, base is Button, and main is index.ts
*/
main?: string;
/**
* Relative path of component style entry file relative to base
* e.g. style/index.less
*/
style?: string;
/**
* Relative path of component preview file relative to base
* e.g. __docs__/index.mdx
*/
preview?: string;
/**
* Relative path of component type declaration file relative to base (automatic parsing and extraction of TypeScript documents will only analyze files configured by this field)
* e.g. interface.ts
*/
jsdoc?: string | string[];
/**
* Glob matching rules for unit test files
* e.g. ['__test__/index.test.tsx']
*/
testFilePatterns?: string[];
/**
* Extra document entry configuration, such as "version record" configuration
* e.g. [{ title: 'Changelog', entry: '__docs__/changelog.md' }]
*/
extraDocs?: Array<{ title: string; entry: string }>;
};
};
```

## Directory structure
We have no special requirements for the overall directory structure of the project. If all your components are maintained in the same NPM package, the project structure may be like this:
```Plain Text
├── components ## Component directory
│ ├── ComponentA
│ ├── ComponentB
│ │...
├── arco.workspace.jsonc
├── package.json
└── tsconfig.json
```

You can also use Monorepo to build multiple NPM The packages are maintained in the same project. In this case, the project structure may be as follows:
```Plain Text
├── packages ## Component directory
│ ├── package-a
│ ├── package-b
│ │...
├── arco.workspace.jsonc
├── package.json
└── tsconfig.json
```

Components usually need to include four parts: component source code, style, documentation, and unit test, so the structure of the component directory is usually as follows:
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

## Initialize the workspace
We provide a component named `@arco-cli/generator` to initialize the workspace. Execute the following command:
```Bash
## Create a standard workspace, which is a single package and multiple components
npx @arco-cli/generator new your-workspace-name

## Create a Monorepo workspace
npx @arco-cli/generator new your-workspace-name --templateArgs="--monorepo"

## Create a new subpackage for Monorepo
## --template specifies the template
## --path Specify the parent directory where the new package will be created
cd your-workspace-name
npx arco create your-package-name --template=react-package --path=packages
```

`@arco-cli/generator` Command Details:
```Plain Text
arco-generate new <name>

create an empty arco material workspace

Location:
name Workspace directory name [string] [required]

Options:
-p, --path Path to new workspace (default to current dir) [string]
--package-name Package name of workspace root NPM package [string]
--package-version Package version of workspace root NPM package [string]
--description Package description of workspace root NPM package
[string]
--force Force overwrite directory, if it already exists [boolean]
--template The template to generating a new workspace [string]
--templateArgs The arguments for template to generating a new
workspace [string]
```

## Initialize components
Add components to the workspace using the following command:
```Bash
npx arco create Button

## --path specifies the parent directory for creating components
npx arco create Button --path="packages/my-sub-package/src"
```

### Configure default behaviors when creating components
In `arco.workspace.jsonc`, use the following fields to configure some default behaviors when adding new components:
```JSON
{
"arco.service/generator": {
// Default directory for adding new components, equivalent to arco create --path="workspace-path/defaultPath"
"defaultPath": "src",
// Default template used when adding new components
// Currently only supports specifying local directories as templates, please use file: as the template path prefix
"defaultTemplate": "file:.scripts/templates/component",
"hooks": {
// Hook function executed after component creation
"afterComponen
tCreated": "./.scripts/workspaceHooks/afterComponentCreated.js"
}
}
}
```

### Custom component template
You can specify a local directory as a component template when `arco create`. The following files will be treated as special files and will not be copied directly to the target directory (all other files will be copied directly to the target directory):

* `__arco.tpl.desc.json` template description file, the field types it receives are as follows:

```TypeScript
interface TemplateDesc {
// Template type
type: 'workspace' | 'package' | 'component';
// Template name
name: string
// Only required for component templates
// Accepts the same entries field in arco.workspace.jsonc component configuration, used to automatically fill in the Workspace configuration after the component is created
entries?: {}
}
```

* `__arco.dir.desc.js` The description file of the file directory needs to expose a CommonJS module:

```JavaScript
module.exports = (context) => {
return {
// You can filter directories through the context.templateArgs parameter. When ignore is true, all files in this directory will be ignored directly
ignore: false,
};
};
```

* `*.tpl.js` The description file of the template file needs to expose a CommonJS module:

```JavaScript
module.exports = (context) => {
return {
// The file name after creation
filename: `${context.name}.tsx`,
// The content of the file after creation
contents: '// your file contenst',
};
};
```

The above functions uniformly receive the context information when the component is created:
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

Please refer to the Arco CLI [built-in templates](https://github.com/arco-design/arco-cli/tree/next/packages/generator/src/templates). Note that the template files in this example have been compiled by Babel, and `*.tpl.js` and `__arco.dir.desc.js` must follow the CommonJS specification.
