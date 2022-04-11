`````
物料平台

# 常见问题

物料开发中的常见问题及其解答。
`````

## CLI 版本升级

从 `1.26.0` 的版本起，`@arco-design/arco-cli` 更名为 `arco-cli`。对包名变动引起的不便我们深表歉意，请使用以下命令卸载旧有包并安装最新包：

```bash
# 卸载旧版本 CLI
npm uninstall @arco-design/arco-cli -g

# 安装最新版 CLI
npm install arco-cli -g
```

之后，你可采用以下命令更新 CLI 版本：

```bash
npm install arco-cli@latest -g
```

此外，物料项目依赖包名也发生了变动，在升级项目 Dev 依赖时，你可能需要更换包名：

* 自 `1.25.15` 起，`@arco-design/arco-scripts` 变更为 `arco-scripts`。
* 自 `1.9.3` 起，`@arco-design/arco-doc-site` 变更为 `arco-material-doc-site`。

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

可以使用，但需要保证 arco-scripts >= 1.20.5。

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

## 如何关联主题？

首先需要明确的是：**主题包应由业务项目本身而非物料引入**。物料平台所提供的主题关联，仅用于物料搭配某主题使用时的效果展示。

### 通过团队配置（推荐）

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/screenshot-20220408-145533.png~tplv-uwbnlip3yd-webp.webp)

在团队页面点击「⚙」按钮进行团队信息配置（仅团队管理员可配），搜索所需关联的主题并提交。完成配置后，平台将在物料预览时优先加载所关联主题包而非 Arco 默认的样式。

如你未使用「团队站点」功能，可略过下边的内容。

---

此配置项对「物料列表」和「团队站点」的物料预览均可生效。需要额外注意的是，由于「团队站点」的本地预览和 Dev 模式未与具体的团队相关联，需配置本地站点项目的 `.config/main.js` 中的字段使其与具体团队关联。

**注意：需要 `arco-material-doc-site >= 1.10.0` 且本地需安装主题对应的 NPM 包，否则 Dev 模式下会因模块缺失而报错。**

```js
// .config/main.js
/**
 * @type {import('arco-material-doc-site').MainConfig}
 */
module.exports = {
  // ... Other settings...
  // 通过 group 字段配置本地预览或者 Dev 时所需关联的团队配置
  group: {
    id: 1,
    // 是否为内网团队
    private: false,
  },
};
```

完成以上配置后，「团队站点」本地 Dev 时将尝试使用对应团队的主题配置信息：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/screenshot-20220408-153706.png~tplv-uwbnlip3yd-webp.webp)

### 仅配置团队站点

如果仅需要在「团队站点」使用主题，也可以直接配置本地站点项目的 `.config/main.js` 中的字段。此字段的优先级高于上一部分的团队级配置。

**注意：本地需安装主题对应的 NPM 包，否则 Dev 模式下会因模块缺失而报错。**

```js
// .config/main.js
/**
 * @type {import('arco-material-doc-site').MainConfig}
 */
module.exports = {
  // ... Other settings...
  site: {
    // ... Other settings...
    // 主题对应的 NPM 包名
    arcoDesignLabTheme: '@arco-design/theme-volcengine-ui'
  },
};
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
