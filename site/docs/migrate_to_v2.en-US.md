`````
Migration Guide

# From v1 to v2

the 2.x version is a major upgrade, with many optimizations and reconstructions. This document will help you complete the migration to this major version successfully.
`````

## NPM Package Name Change

After this upgrade, the component library name changed from ByteDesign to **ArcoDesign** and the package name changed to **@arco-design/web-react**.

**Migration steps:**

1. Upgrade component library

> Due to the change of component library package name, it is better to unload @bytedesign / web-react in order to avoid misusing the old component library package.

```bash
npm remove @bytedesign/web-react && npm i @arco-design/web-react
```

2. Global replacement of all package names used in the project: @bytedesign/web-react -> @arco-design/web-react

> For this step, you can use the global replacement function of editor.

```diff
- import { Transfer } from '@bytedesign/web-react';
+ import { Transfer } from '@arco-design/web-react';

- import { IconRight, IconLeft } from '@bytedesign/web-react/icon';
+ import { IconRight, IconLeft } from '@arco-design/web-react/icon';

- @import '~@bytedesign/web-react/dist/css/byteui.css';
+ @import '~@arco-design/web-react/dist/css/byteui.css';

- import '@bytedesign/web-react/dist/css/byteui.css';
+ import '@arco-design/web-react/dist/css/byteui.css';
```

3. Replace CSS file name: byteui -> arco

```diff
- @import '~@arco-design/web-react/dist/css/byteui.css';
+ @import '~@arco-design/web-react/dist/css/arco.css';

- import '@arco-design/web-react/dist/css/byteui.css';
+ import '@arco-design/web-react/dist/css/arco.css';
```

## CSS Class Name Prefix Change

CSS class name prefix of all components are changed from `byte-` to `arco-`. If there is style overlay of ByteDesign in your project, please follow the migration steps below.

**Migration steps**

Globally replace `byte-` in less with `acro-` for style overlay and confirm whether the corresponding page is still behaving normally.

**If you still want to use** `` **prefix, you need to modify the style prefix globally according to the following steps (not recommended)**

Please note that though there is method to modify the style prefix globally, it is not recommended to use during migration, because ArcoDesign has greatly upgraded the style specification. In order to provide better visual experience, we inevitably modified the DOM structure of some components and adjusted some non-standard class names in ByteDesign.

1. Globally configure `prefixCls` of ArcoDesign:

```js
// 这样所有组件的类名前缀都会变为 byte，默认是 arco
<ConfigProvider prefixCls="byte">
  <App />
</ConfigProvider>
```

2. Configure the `prefix` parameter in less through `modifyVars`

```diff
// webpack.config.js
module.exports = {
  rules: [{
    test: /\.less$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader',
    }, {
      loader: 'less-loader',
+     options: {
+       modifyVars: {
+         prefix: 'byte',
+       },
+       javascriptEnabled: true
+     },
    }],
    ...
  }],
  ...
}
```

3. Configure the `prefixCls` prefix of dialogue box created by static method through `Modal.config`

```js
Modal.config({
   prefixCls: 'byte',
})
```

After the above three steps, the component class name prefix and style prefix in ArcoDesign will be changed to `byte-`, **but we still reminds you that there are some changes of class name and Dom structure in ArcoDesign, please make sure whether there is style overridw on ByteDesign in the project, if there is, please check carefully whether the page performs normally in ArcoDesign.**

## Migration Tool

Since there are many **Breaking Change** in this large version updrade, in order to improve efficiency, we provide **codemod cli** tool `@arco-design/codemod` for you.

> Of course, you can also choose to modify the code yourself.

**Migration steps**

1. Check git state

Before running codemod, it is recommended that you submit or temporarily store all local changes to keep git workspace in a clean state, so that we can check the changes after running codemod.

2. Run codemod

```bash
# 直接通过 npx 运行
npx -p @arco-design/codemod arco-codemod ./src

# 或者全局安装
npm i @arco-design/codemod -g

# 运行
arco-codemod ./src
```

3. Check output

Codemod has overlaid the parts that can be modified automatically as much as possible, but some logic and type modifications cannot be covered. For this part, please pay attention to the prompt information printed in the command line after running codemod. Please check and repair one by one, and you can run codemod repeatedly to check the modification results.

> The output format of codemod processing results may not be consistent with the code formatting tool configured in your project, so after execution, it is recommended to repair it with the code formatting tool configured in your project.

**What did the migration tool do**

The migration tool is intended to help complete part of the mindless physical work. The conversion that can be achieved by modifying AST can be realized by codemod.

*codemod running process*

<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/de0edfe3ea17ee9be4c911fdb75355ef.gif~tplv-uwbnlip3yd-image.image" alt="codemod cli 运行过程" width="720"/>

*breaking change processing results examples*

```diff
//  `Button` 的 `type='danger'`, 请使用 `status='danger'` 替代 - <Button type='danger'/> + <Button status='danger'/> // 调整了 `Form` 的 `wrapperCol` 的默认值为 `{{ span: 19 }}`, 原来是 12 - <Form ...></Form> + <Form ... warpperCol={{ span: 12 }}></Form> // 移除了 `AutoComplete` 的 `children`, 请使用 `triggerElement` 替代 - <AutoComponent><TextArea/></AutoComponent> + <AutoComponent triggerElement={<TextArea/>}></AutoComponent>
```

## Breaking Change List

- **Global adjustment**
  -   Adjusted the `size` gradient from `small`|`default`|`large`|`huge` to `mini`|`small`|`default`|`large`

- **Icon**
  -   Removed the icons to be discarded as ByteDesign prompted

- **Button**
  -   Removed `type='warning'`, please replace it with `status='warning'`
  -   Removed `type='danger'`, please replace it with `status='danger'`
  -   Removed `ghost`

- **Grid**
  -   Removed `flex` of `Grid.Row`, component layout is directly achieved through `flex` without configuration

- **Table**
  -   Removed `checkbox`, please replace it with ` rowSelection.type='checkbox'  `
  -   Removed `checkAll`, please replace it with ` rowSelection.checkAll={true}  `

- **Tabs**
  -   Removed `destoryOnHide`, please replace it with `destroyOnHide`
  -   Adjusted the default value of `lazyload` as `true`

- **Tag**
  -   Removed `fill`, ArcoDesign itself is graphic design
  -   Adjusted the built-in 12 colors

- **AutoComplete**
  -   Adjusted the type of `filterOption` to be consistent with `Select.props.filterOption`
  -   Removed `renderOptions`, please replace it with `dropdownRender`, and its type is consistent with `Select.props.dropdownRender`
  -   Adjusted the type of the second parameter of `onSelect` to be consistent with `Select.option`
  -   Adjusted the type of the second parameter of `onChange` to be consistent with `Select.option`
  -   Removed `children`, please replace it with `triggerElement`

- **Checkbox**
  -   Adjusted the priority of `Option` of `Checkbox.Group`, after adjustment, the priority of `options` is higher than that of `children` and is consistent with `Radio.Group`

- **Switch**
  - Removed `children` whose `key` is `open`, please specify the strings to be opened through `checkedText`
  - Removed `children` whose `key` is `close`, please specify the strings to be closed through `uncheckedText`

- **Select**
  - Removed `hideArrowIcon`, please replace it with `arrowIcon={null}`
  - Removed `optionSelectedIcon`, use check box to identify whether the multi-choice option is selected
  - Removed `tagClassName`, please use `tagRender` to customize multi-choice tag style

- **Slider**
  - Removed `showTooltip`, please replace it with `tooltipVisible`

- **Form**
  - Removed the `validateFields` method of `Form`, please replace it with `validate`
  - Adjusted the default value of `wrapperCol` of `Form` from `{{ span: 12 }}` to `{{ span: 19 }}`
  - Adjusted the logic of `initialValue` of `FormItem`, which only takes effect once and doesn't trigger form widget update when changed
  - Adjusted the logic of `initialValue` of `FormControl`, which only takes effect once and doesn't trigger form widget update when changed

-   **Transfer**
    -   Adjusted `selectedKeys`, it is in the controlled mode once imported, if you want to cancel, please replace it with `defaultSelectedKeys`
    -   Adjusted `targetKeys`, t is in the controlled mode once imported, if you want to cancel, please replace it with `defaultTargetKeys` 

-   **Message**
    -   Adjusted `getContainer`, global configuration can only be set through `Message.config`

-   **Notification**
    -   Adjusted `getContainer`, global configuration can only be set through `Notification.config`

-   **Menu**
    -   Removed `activeItemBorderDirection` of `Menu`, ArcoDesign doesn't contain highlighted indication of the selected state
    -   Removed `propClassName` of `SubMenu`, please replace it with `triggerProps.className`

-   **Trigger**
    -   Removed `trigger='manual'`, you only need to import `popupVisible` to control

-   **Upload**
    -   `uid` property changed to required, in order to solve the problem of accidental control invalidation in version `1.x`
