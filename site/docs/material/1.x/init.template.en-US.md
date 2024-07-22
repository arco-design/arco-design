`````
Material Market

# Template

Learn about various material project templates officially provided by Arco.
`````

*Auto translate by google.*

## Official template

Currently, Arco provides the following templates:

- Component - used to create component materials;
- Block - used to create block materials;
- Page - used to create page materials;
- Utils - used to create function tool library;
- Component library - used to create a business component library project with a structure similar to [Arco Component Library](https://github.com/arco-design/arco-design) **(recommended)**;
- Monorepo - used to create Lerna-managed Monorepo projects **(recommended)**;

To use the above template, just select the corresponding category during `arco init`.

### Technology Stack

In the project created by the official Arco template, the following technology stacks are used:

- [TypeScript](https://www.typescriptlang.org/): Use TypeScript for material development
- [Less](http://lesscss.org/): Style development
- [Jest](https://jestjs.io/): unit test and snapshot test
- [Storybook](https://storybook.js.org/): Quickly preview the component development
- ESLint & StyleLint & Prettier: code style checking and formatting related

### Component template

We use the component template to create a material project and build it once. The directory structure and detailed description are as follows:

```
├── .config // arco-scripts configuration items, including build, test, and document generation. For details, see the next chapter [Custom Configuration]
│ ├── babel.config.js
│ ├── docgen.config.js
│ ├── jest.config.js
│ ├── style.config.js
│ └── webpack.config.js
│
├── .storybook // Storybook configuration items, for details, please refer to https://storybook.js.org/docs/react/configure/overview
│ ├── main.js
│ └── preview.js
│
├── arco.config.js // arco-cli configuration item
│
├── dist // Build product (UMD version)
├── docs // Build product (Prop and Demo documents)
├── es // Build product (ES version)
├── lib // build product (CJS version)
│
├—— src
│ ├── TEMPLATE.md // template for document generation
│ ├── __test__ // Unit test directory
│ │ ├── __snapshots__ // Snapshots of components generated based on Demo
│ │ ├── demo.test.tsx // snapshot test
│ │ └── index.test.tsx // component logic test
│ ├── demo // Demo directory
│ │ └── basic.jsx
│ ├── index.tsx
│ └── style
│ ├── index.less
│ └── index.ts
│
├── stories // Storybook preview entry
│ └── stories.jsx // Expose Demo as Story in this file
│
└── tests // Jest unit test entry and utility functions
    ├── demoTest.tsx
    ├── mockDate.js
    ├── mountTest.tsx
    └── setup.js
```

Component templates are very suitable for quickly familiarizing themselves with the development and release process of Arco materials, but one project can only correspond to one material. When your team needs to build materials together, this will make maintenance and release extremely complicated. Therefore, we recommend that you use the Monorepo project to manage all your materials in a unified manner.

### Monorepo template [recommended]

**Monorepo template depends on Lerna and Yarn, please make sure you have installed these two NPM packages globally.**

Using the Monorepo template to manage all the materials of the team is the best practice recommended by Arco. Below we will introduce this template in detail. The Monorepo project created by `arco init` is a skeleton project without any Package. The directory structure and detailed description are as follows:

```
├── .storybook // Storybook configuration items, for details, please refer to https://storybook.js.org/docs/react/configure/overview
│ ├── main.js
│ └── preview.js
│
├── tests // Jest unit test entry and utility functions
│ ├── demoTest.tsx
│ ├── mockDate.js
│ ├── mountTest.tsx
│ └── setup.js
│
├── packages // lerna workspace
│
├── arco.config.js // arco-cli configuration item
├── arco.scripts.config.js // arco-scripts configuration items common to all packages
├── lerna.json
├── package.json
└── tsconfig.json // ts configuration common to all packages
```

After initializing the project skeleton, you can add the first material through `yarn run add:package - yourPackageName`. The created material is roughly the same as the component template, but all its dependencies have been added to the outermost layer. The directory structure and detailed description of a created Package are as follows:

```
├── .config // Expand arco-scripts configuration items, including build, test, and document generation. For details, see the next chapter [Custom Configuration]
│ ├── babel.config.js
│ ├── docgen.config.js
│ ├── jest.config.js
│ ├── style.config.js
│ └── webpack.config.js
│
├── dist // Build product (UMD version)
├── docs // Build product (Prop and Demo documents)
├── es // Build product (ES version)
├── lib // build product (CJS version)
│
├── src // Same component template
│ ├── TEMPLATE.md
│ ├── __test__
│ ├── demo
│ ├── index.tsx
│ └── style
|
├── stories // Storybook preview entry
│ └── stories.jsx // Expose Demo as Story in this file
│
├── README.md
├── package.json
└── tsconfig.json // Extend the TS configuration and inherit the tsconfig.json of the project root directory
```

Above, we have learned about the project structure of the Monorepo template. Compared with ordinary single-component templates, its differences are mainly manifested in:

- Public dependencies are promoted to the root directory
- You can find a large number of public dependencies in the `package.json` file in the root directory of the project;
- The newly created Package does not contain any dependencies. You can add unique dependencies to a Package by using `lerna add <pkg> --scope <packageName>`;
- Storybook is located in the root directory of the project, you can preview all the package contents at the same time
- It should be noted that Storybook's built-in Webpack Dev Server is only responsible for monitoring all Story changes (ie files under /src/demo);
- `yarn run dev` actually includes two steps: `yarn run storyboook` and `lerna run dev`. You can also specify to monitor only the source code changes of a package through the `--scope` parameter of the Lerna command;

- Material outsourcing and information synchronization
- Use the `lerna publish` command to publish the NPM package;
- Use the `arco generate` and `arco sync` commands to generate and synchronize all material meta information. If you only need to operate on a certain material, the above two commands both support the `--from-current-package` parameter;

## Custom template

arco-cli allows you to create a project by specifying a template (local/online), using `--template` to point to a local path or an npm package, which will be very useful when you develop custom templates.

```bash
arco init <projectName> --template [templatePackageName|file:templatePath]

# e.g.
arco init my-site --template @arco-materials/template-core

arco init my-site --template file:../path/to/your/template/acro-template-site
```

For further guidance on template development, please go to [Template Development](/docs/material/develop-template).
