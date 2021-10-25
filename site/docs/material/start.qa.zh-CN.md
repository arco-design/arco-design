`````
物料平台

# 常见问题

物料开发中的常见问题及其解答。
`````

## 如何创建物料团队？

物料平台不允许用户自行创建团队，请至 [此页面](https://arco.design/material/createGroup/) 提出申请。创建完成后，团队 Owner 可以自行管理团队成员和信息。

## 在哪里查看我上传的物料？

点击平台右上角的用户头像，可以进入用户中心。用户可以在这里查看自己发布的物料、加入的团队等信息。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/be6d4f61e5423b9be492206d88bdb139.png~tplv-uwbnlip3yd-webp.webp)

## 选择哪个项目模板？

Arco 官方提供了多种项目模板供你选择：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cceb75d805f175694a3e907c490e5e84.png~tplv-uwbnlip3yd-webp.webp)

根据你的不同需求，有以下推荐模板：

- 快速体验 Arco 物料的开发流程和平台能力：业务组件模板；
- 创建与全部开发者共享的**弱业务相关**的物料：Lerna Monorepo 模板；
- 创建团队内部共享的**强业务相关**的物料库：组件库模板。

## 是否可以用 TS 来书写物料 Demo？

可以使用，但需要保证 @arco-design/arco-scripts >= 1.20.5。

## 物料开发完成后，如何预览其在物料平台的展示效果？

通过 arco-cli 提供的 `arco preview` 命令，或通过项目中提供的 `npm run preview` 脚本，可以直接预览本地的物料。

## 如何支持业务方对于 Arco 组件的样式按需加载？

首先，我们**不建议**在物料源码中直接 import less/css，在无法确定用户的编译打包环境时，这种写法非常有可能导致编译失败。

为了支持用户可以按需加载物料所依赖的 Arco 组件样式，需要以下步骤：

- 物料提供者：在组件的 `/style/index.ts` 中声明所依赖的 Arco 组件样式

```typescript
// src/style/index.ts
import './index.less';

// 如果物料使用到了 Arco 组件，声明它的依赖
import '@arco-design/web-react/es/Button/style';

// 如果物料使用到了其他物料，也声明它的样式依赖
import '@namespace/some-other-material/es/style';
```

- 物料使用者：配置 [`babel-plugin-import`](https://www.npmjs.com/package/babel-plugin-import) 来按需加载物料的样式

```javascript
// .babelrc 在 babel 配置中加入
plugins: [
  [
    'import',
    {
      libraryName: '@some-namespace/material-package-name',
      libraryDirectory: 'es',
      camel2DashComponentName: false,
      // 按需加载样式
      style: true,
    },
    'some-unique-name'
  ],
]
```

## 物料单元测试报错

物料项目的单元测试采用 [Jest](https://jestjs.io/)，其默认不支持 ES Module 的语法 (import / export)。参考 [此文档](https://jestjs.io/docs/ecmascript-modules)

一种可行的解决方式是显式声明引用 CommonJS 模块。

```javascript
// change
import { Button } from '@arco-design/web-react';

// to
import { Button } from '@arco-design/web-react/lib';
```
