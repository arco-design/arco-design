`````
Material platform

# development specification

Arco recommended material development specification, follow this specification to ensure that users get a consistent material experience.
`````

*Auto translate by google.*

We welcome any developer to help improve this specification. If you have any supplements or comments, please participate in the co-construction of this [document](https://github.com/arco-design/arco-design/blob/main/site/docs/material/start.qa.en-US.md). If this is your first time developing components, you can also refer to our [Basic Component Library](https://github.com/arco-design/arco-design) and [Official Material Repository](https://github. com/arco-design/official-material-react) for some inspiration.

## project organization

### Semantic naming

Materials should be named semantically and avoid conflicts with base components. Materials under the same team/warehouse can also use the same material name prefix.

```js
// ❌ Bad Case
function SelectV2() {}

// ✅ Good Case
function SelectWithCheckAll() {}
```

### The package name is the same as the component name

The NPM package name of a single material should be as consistent as possible with the material name, and the NPM package name of the material library should contain as clear usage scenario information as possible.

```
## ❌ Bad Case
select-v2
arco-materials

## ✅ Good Case
select-with-check-all
example-platform-materials-react
```

### Minimum principle

Try to simplify the size of the material package and avoid introducing third-party dependent libraries. If it is a natively supported or self-implemented function, try to avoid introducing new dependency packages.

### Maintain type files separately

It is recommended to maintain the TS types that need to be exported externally in a separate `interface.ts` and export them in `index.ts`.

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

## component design

### Interface definition

#### Type inheritance

If the material is a secondary encapsulation of a basic component, its API should be inherited from the basic component to avoid redeclaration.

```ts
// ❌ Bad Case
interface SelectWithCheckAllProps {
  size?: 'default' | 'mini' | 'large';
}

// ✅ Good Case
import { SelectProps } from '@arco-design/web-react';

interface SelectWithCheckAllProps extends Omit<SelectProps, 'onChange'> {
  /**
   * Callback when @zh value changes
   */
  onChange?: (value) => void;
}
```

#### Write type comments

Please write comments for your interface properties and it will be automatically extracted as API documentation during the material build phase.

```ts
// ❌ Bad Case
interfaceButtonProps {
  size?: 'default' | 'mini' | 'large';
}

// ✅ Good Case
/**
 * @titleButtonProps
 */
interfaceButtonProps {
  /**
   * @en button size
   * @en Size of Button
   * @defaultValue default
   * @version 1.2.0
   */
  size?: 'default' | 'mini' | 'large';
}
```

### style related

#### Avoid inline styles and CSS Modules

Avoid using inline styles and [CSS modules](https://github.com/css-modules/css-modules) , make sure external styles can be overridden by class name.

❌ Bad Case

Avoid using inline styles.

```jsx
function Button() {
  return <button style={{ padding: 10 }} />;
}
```

❌ Bad Case

Avoid using CSS Modules.

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

#### Use the same class name prefix

Materials under the same material library keep the same class name prefix to minimize the possibility of conflict with user class names.

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

#### Avoid including style files in JS

Avoid including style files in JS files. The separation of logic and style should be ensured as much as possible to ensure that users can import JS and CSS files separately, so as to avoid the problem of user compilation failure caused by different build environments.

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
