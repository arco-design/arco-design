`````
物料平台

# 开发规范

Arco 推荐的物料开发规范，遵循此规范以保证用户获得一致的物料使用体验。
`````

我们欢迎任何开发者协助完善此规范，如有任何补充或意见请参与此 [文档](https://github.com/arco-design/arco-design/blob/main/site/docs/material/start.spec.zh-CN.md) 的共建。如果这是你第一次开发组件，也可参考我们的 [基础组件库](https://github.com/arco-design/arco-design) 和 [官方物料仓库](https://github.com/arco-design/official-material-react) 以获得些许启发。

## 项目组织

### 语义化命名

物料的命名应当具有语义，并且避免与基础组件冲突。同一团队/仓库下的物料，也可采用相同的物料名前缀。

```js
// ❌ Bad Case
function SelectV2() {}

// ✅ Good Case
function SelectWithCheckAll() {}
```

### 包名与组件名一致

单物料的 NPM 包名应当尽量与物料名保持一致，物料库的 NPM 包名应尽量包含尽量明确的使用场景信息。

```
## ❌ Bad Case
select-v2
arco-materials

## ✅ Good Case
select-with-check-all
example-platform-materials-react
```

### 最小原则

尽量精简物料包的体积，避免引入第三方依赖库。如果是原生支持或可自行实现的功能，尽量避免引入新的依赖包。

### 单独维护类型文件

推荐将需要对外导出的 TS 类型维护在单独的 `interface.ts` 中，并将其在 `index.ts` 中导出。

```tsx
// ❌ Bad Case
// index.tsx
export interface ButtonProps {
  // ...
}

export default function Button() {}
```

```ts
// ✅ Good Case
// interface.ts
export interface ButtonProps {
  // ...
}

// index.tsx
import type { ButtonProps } from './interface.ts';

export default function Button() {}

export type { ButtonProps };
```

## 组件设计

### 接口定义

#### 类型继承

如果物料是对某个基础组件的二次封装，其 API 应继承自基础组件，避免重新声明。

```ts
// ❌ Bad Case
interface SelectWithCheckAllProps {
  size?: 'default' | 'mini' | 'large';
}

// ✅ Good Case
import { SelectProps } from '@arco-design/web-react';

interface SelectWithCheckAllProps extends Omit<SelectProps, 'onChange'> {
  /**
   * @zh 值改变时的回调
   */
  onChange?: (value) => void;
}
```

#### 书写类型注释

请为你的接口属性书写注释，它将在物料构建阶段被自动提取为 API 文档。

```ts
// ❌ Bad Case
interface ButtonProps {
  size?: 'default' | 'mini' | 'large';
}

// ✅ Good Case
/**
 * @title ButtonProps
 */
interface ButtonProps {
  /**
   * @zh 按钮尺寸
   * @en Size of Button
   * @defaultValue default
   * @version 1.2.0
   */
  size?: 'default' | 'mini' | 'large';
}
```

### 样式相关

#### 避免行内样式和 CSS Modules

避免使用行内样式和 [CSS modules](https://github.com/css-modules/css-modules) ，确保外部可通过类名进行样式覆盖。

❌ Bad Case

避免使用行内样式。

```jsx
function Button() {
  return <button style={{ padding: 10 }} />;
}
```

❌ Bad Case

避免使用 CSS Modules。

```less
// style/index.module.less
.padding {
  padding: 10px;
}
```

```jsx
import style from './style/index.module.less';

function Button() {
  return <button className={style.padding} />;
}
```

✅ Good Case

```less
@am-button-prefix-cls: ~'am-button';

.@{am-button-prefix-cls} {
  padding: 10px;
}
```

```jsx
function Button() {
  const prefxiCls = 'am-button';
  return <button className={prefxiCls} />;
}
```

#### 使用相同的类名前缀

同一物料库下的物料保持相同的类名前缀，尽量降低与用户类名冲突的可能性。

```tsx
// ❌ Bad Case
function Button() {
  return <button className="button-circle" />;
}

function List() {
  return <ul className="list-pro" />;
}
```

```tsx
// ✅ Good Case
const prefixCls = 'p-matirial';

function Button() {
  return <button className={`${prefixCls}-button-circle`} />;
}

function List() {
  return <ul className={`${prefixCls}-list-pro`} />;
}
```

#### 避免在 JS 中引入样式文件

避免在 JS 文件中引入样式文件。 应尽量保证逻辑与样式的分离，确保用户可以分别引入 JS 和 CSS 文件，避免由于构建环境的不同导致的用户编译失败的问题。

```tsx
// ❌ Bad Case
import './style/index.less';
function Button() {}
```

```tsx
// ✅ Good Case
// Pure JS
function Button() {}
```
