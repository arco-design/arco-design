`````
Material Market

# Common Problem

Common questions and answers in material development.
`````

*Auto translate by google.*

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

It can be used, but you need to ensure that @arco-design/arco-scripts >= 1.20.5.

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

## Material unit test error

The unit test of the material item uses [Jest](https://jestjs.io/), which does not support ES Module syntax (import / export) by default. Reference [this document](https://jestjs.io/docs/ecmascript-modules)

One possible solution is to explicitly declare the reference to the CommonJS module.

```javascript
// change
import {Button} from'@arco-design/web-react';

// to
import {Button} from'@arco-design/web-react/lib';
```
