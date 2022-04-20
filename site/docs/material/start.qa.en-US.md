`````
Material Market

# Common Problem

Common questions and answers in material development.
`````

*Auto translate by google.*

## CLI version upgrade

As of version `1.26.0`, `@arco-design/arco-cli` has been renamed to `arco-cli`. We apologize for the inconvenience caused by the package name change, please use the following commands to uninstall the old package and install the latest package:

```bash
# Uninstall old version CLI
npm uninstall @arco-design/arco-cli -g

# Install the latest version of the CLI
npm install arco-cli -g
````

After that, you can update the CLI version with the following command:

```bash
npm install arco-cli@latest -g
````

In addition, the name of the dependency package of the material project has also changed. When upgrading the Dev dependency of the project, you may need to change the package name:

* As of `1.25.15`, `@arco-design/arco-scripts` has been changed to `arco-scripts`.
* As of `1.9.3`, `@arco-design/arco-doc-site` has been changed to `arco-material-doc-site`.

## How to create a material team?

The material platform does not allow users to create teams by themselves, please go to [this page](https://arco.design/material/createGroup/) to apply. After the creation is complete, the team owner can manage the team members and information by themselves.

## Where can I view the materials I uploaded?

Click on the user profile picture in the upper right corner of the platform to enter the user center. Users can view information about the materials they have released, the teams they have joined, and so on.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/be6d4f61e5423b9be492206d88bdb139.png~tplv-uwbnlip3yd-webp.webp)

## Which project template to choose?

Arco officially provides a variety of project templates for you to choose:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cceb75d805f175694a3e907c490e5e84.png~tplv-uwbnlip3yd-webp.webp)

According to your different needs, there are the following recommended templates:

-Quickly experience the development process and platform capabilities of Arco materials: business component templates;
-Create a **weak business-related** material shared with all developers: Lerna Monorepo template;
-Create a **strong business-related** material library shared within the team: component library template.

## Can I use TS to write material Demo?

It can be used, but you need to ensure that arco-scripts >= 1.20.5.

## After the material development is completed, how to preview its display effect on the material platform?

You can directly preview the local materials through the `arco preview` command provided by arco-cli or the `npm run preview` script provided in the project.

## How to support the business side to load Arco component styles on demand?

First of all, we **do not recommend** import less/css directly in the source code of the material. When the user's compilation and packaging environment cannot be determined, this way of writing is very likely to cause compilation failure.

In order to support users to load the Arco component styles on which materials depend on demand, the following steps are required:

-Material provider: Declare the dependent Arco component style in the component `/style/index.ts`

```typescript
// src/style/index.ts
import'./index.less';

// If the material uses Arco components, declare its dependencies
import'@arco-design/web-react/es/Button/style';

// If the material uses other materials, also declare its style dependency
import'@namespace/some-other-material/es/style';
```

-Material user: Configure [`babel-plugin-import`](https://www.npmjs.com/package/babel-plugin-import) to load the material style on demand

```javascript
// .babelrc is added to the babel configuration
plugins: [
  [
    'import',
    {
      libraryName:'@some-namespace/material-package-name',
      libraryDirectory:'es',
      camel2DashComponentName: false,
      // Load styles on demand
      style: true,
    },
    'some-unique-name'
  ],
]
```

## How to associate Design Lab theme?

The first thing to be clear is: **Theme package should be imported by the project itself, not the material**. The theme association provided by the material market is only used to show the effect when the material is used with a theme.

### Via group settings (recommended)

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/screenshot-20220408-145533.png~tplv-uwbnlip3yd-webp.webp)

On the group page, click the "⚙" button to configure the team settings (only available for team administrators), search for the desired related theme and submit it. After completing the configuration, the platform will preferentially load the associated theme package instead of Arco's default style when previewing the material.

If you are not using the "Team Site" feature, you can skip the content below.

---

This configuration item is valid for both "Material List" and "Team Site" material preview. It is important to note that since the local preview and Dev mode of the "team site" is not associated with a specific team, you need to configure the fields in the `.config/main.js` of the local site project to associate it with a specific team.

**Note: `arco-material-doc-site >= 1.10.0` is required and the NPM package corresponding to the theme needs to be installed locally, otherwise an error will be reported due to missing modules in Dev mode.**

````js
//.config/main.js
/**
 * @type {import('arco-material-doc-site').MainConfig}
 */
module.exports = {
  // ... Other settings...
  // Configure the associated team configuration when configuring local preview or Dev through the group field
  group: {
    id: 1,
    // Whether it is an intranet team
    private: false,
  },
};
````

After completing the above configuration, the "team site" local Dev will try to use the theme configuration information of the corresponding team:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/screenshot-20220408-153706.png~tplv-uwbnlip3yd-webp.webp)

### Used for team site only

If you only need to use the theme on the "team site", you can also configure the fields in the `.config/main.js` of the local site project directly. This field takes precedence over the team-level configuration in the previous section.

**Note: The NPM package corresponding to the theme needs to be installed locally, otherwise an error will be reported due to missing modules in Dev mode. **

````js
//.config/main.js
/**
 * @type {import('arco-material-doc-site').MainConfig}
 */
module.exports = {
  // ... Other settings...
  site: {
    // ... Other settings...
    // NPM package name corresponding to the theme
    arcoDesignLabTheme: '@arco-design/theme-volcengine-ui'
  },
};
````

## Team-level material keyword configuration

When creating a material project in `arco init`, we provide a series of material keywords to choose from. These keywords are convenient for users to quickly filter materials. Team managers can customize the list of alternative keywords by configuring:

![](http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/screenshot-20220420-150133.png~tplv-uwbnlip3yd-webp.webp)

Once configured, the team material list will be filtered using the configured keyword list. Arco CLI can also link specific teams via `arco group --link`:

**Version requirements: arco-cli >= 1.27.0**

```bash
# Choose one of the joined teams to associate
arco group --link

# Associate the specified team, the parameter is not your team ID
arco group --link 1

# unlink team
arco group --link 0
````

The following changes will be made after linking teams:

* `arco init` will use the keyword list configured by the team as an alternative when creating a project;
* When `arco sync` publishes materials, the materials will be released to the associated team first.

## Material unit test error

The unit test of the material item uses [Jest](https://jestjs.io/), which does not support ES Module syntax (import / export) by default. Reference [this document](https://jestjs.io/docs/ecmascript-modules)

One possible solution is to explicitly declare the reference to the CommonJS module.

```javascript
// change
import {Button} from'@arco-design/web-react';

// to
import {Button} from'@arco-design/web-react/lib';
```
