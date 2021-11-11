`````
物料平台

# 文档生成

了解如何自动生成物料 API 文档。
`````

*本文基于 Arco 官方物料模板所创建的项目进行说明*

## 目录结构

物料文档包含了两个方面：组件 Props 参数和示例代码。通过 arco-scripts，一个完善的物料文档可以被自动生成。首先，物料的 `/src` 目录结构如下：

```
─ /src
  ├── __test__
  ├── TEMPLATE.md
  ├── demo
  │   └── basic.jsx
  ├── index.tsx
  └── style
```

你需要关注的有 `TEMPLATE.md` 和 `demo`，在使用 TypeScript 的项目中，arco-scripts 可以通过提取注释内容来快速生成组件接口文档。`TEMPLATE.md` 为文档生成的模板。其内容如下：

```markdown
---
file: index
---

# TooltipButton

## 属性/Props

%%Props%%

## Demos

%%Demos%%
```

其中 `%%Props%%` 会在 `docgen` 命令之后组件的 `Props` 参数填充，`%%Demos%%` 会被 `/src/demo` 中的 Demo 代码填充。最终生成的文档如下：

```markdown
# TooltipButton

## 属性/Props

### `<TooltipButton>`

| 参数名 |    描述    |    类型     | 默认值 |
| ------ | :--------: | :---------: | -----: |
| title  | 按钮的提示 | `ReactNode` |    `-` |

## Demos

~~~jsx
import React from 'react';
import TooltipButton from '@arco-design/rc-xxx';

/**
 * 基本用法
 */
export default () => {
  return <TooltipButton title="tooltip title">Demo Basic</TooltipButton>;
};
~~~
```

## 书写注释

`docgen` 命令通过解析 TypeScript interface 中的注释来生成文档，所以需要以 [TSDoc](https://tsdoc.org/) 的形式为 interface 书写注释。

arco-scripts 从 **1.23.0** 开始，提供了两种可选的底层工具（[ts-document](https://www.npmjs.com/package/ts-document), [react-docgen-typescript](https://www.npmjs.com/package/react-docgen-typescript)）用于 TS 解析，这两种工具对应了两种不同的注释写法。你可以通过修改项目根目录的 `.config/docgen.config.js` 来指定工具：

```javascript
// .config/docgen.config.js
module.exports = (config) => {
  ...
  // ['react-docgen-typescript'] 为默认值
  config.tsParseTool = ['ts-document']
}
```

我们**推荐**使用 `ts-document`，其为 Arco 自研工具，具有更好的语法兼容性和双语言支持。在你阅读此文档时，所有新创建的物料项目已经默认使用 `ts-document` 进行 API 参数提取。

在 Arco 官方物料模板所创建的项目中，你不必费心地去处理文档生成，我们会在 `npm publish` 之前生成一份最新的文档并将其上传至 NPM。

### 使用 ts-document

用以下方式书写注释，所有带有 `@title` 的 interface 或者 type 声明都会被提取。属性注释有以下可用的 tag：

- `@zh` 属性的中文描述
- `@en` 属性的英文描述 （可选）
- `@defaultValue` 属性的默认值 （可选）
- `@version` 该属性是从哪个版本新增的 （可选）

当 `@zh` 或者 `@en` 缺失时，`/** Some comment */` 中的内容会被提取作为属性的描述。

``` typescript
/**
 * @title Button (必填，带有 `title` 描述的接口或者类型才会被收集)
 */
interface ButtonProps {
  /**
   * @zh 按钮尺寸 (属性的中文描述)
   * @en Size of Button (可选，属性的英文描述)
   * @version 1.2.0 (可选，新增的属性在哪个版本开始支持)
   * @defaultValue 'default' (可选，属性的默认值)
   */
  size?: 'mini' | 'small' | 'default' | 'large';

  /**
   * @zh 按钮状态
   * @en Status of Button
   */
  status?: 'danger' | 'error' | 'success';
}
```

如要生成双语言的文档，可对 `docgen.config.js` 进行如下配置：

```javascript
// .config/docgen.config.js
module.exports = (config) => {
  config.tsParseTool = ['ts-document'];
  config.languages = ['zh-CN', 'en-US'];

  // 需分别准备 TEMPLATE.zh-CN.md 和 TEMPLATE.en-US.md 两份文件
  config.template = 'TEMPLATE.[language].md';
  // 也可中英文共用同一份模板文件（默认值）
  // config.template = 'TEMPLATE.md';

  // 将输出 README.zh-CN.md 和 README.en-US.md 两份文件
  config.outputFileName = 'README.[language].md';

}
```

### 使用 react-docge-typescript

使用如下方式书写注释，需要注意以下方面：

- 必须以 TSDoc 的形式书写注释（// 形式的单行注释无法被提取）
- 需要被提取文档的组件必须以 `export const Component = (props: ComponentProps) => {}` 的形式额外导出，否则不能被工具识别；
- 默认值必须以 `Component.defaultProps = {}` 的形式书写，才能被工具提取。
- 如遇到其他问题，可参考 [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript/) 仓库。

```typescript
interface ButtonProps {
  /**
   * 按钮尺寸
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * 按钮状态
   */
  status?: 'danger' | 'error' | 'success';
}

// 需要将 Button 以 const 声明，并且 export，否则工具可能识别不到
export const Button = (props: ButtonProps) => {
  ...
};

// 只有用 defaultProps 声明的默认值才能被工具提取
Button.defaultProps = {
  size: 'default';
};

export default Button;
```

**react-docgen-typescript 方式不支持自动生成中/英两种文档，需要手动处理。**
