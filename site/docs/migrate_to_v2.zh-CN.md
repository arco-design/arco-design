`````
迁移指南

# 从 v1 到 v2

本次 2.x 版本是一次重大的升级，做了许多的优化和重构，本文档将助力大家顺利完成这次大版本的迁移。
`````

## NPM 包名改变

此次升级，组件库由 ByteDesign 更名为 **ArcoDesign**，包名更新为 **@arco-design/web-react**。

**迁移步骤：** 

1. 升级组件库

> 由于组件库包名变更，为了避免误引用旧的组件库包，最好将 @bytedesign/web-react 卸载掉。

```bash
npm remove @bytedesign/web-react && npm i @arco-design/web-react
```

2. 项目中所有用到的包名全局替换：@bytedesign/web-react -> @arco-design/web-react

> 这一步可利用编辑器的全局替换功能。

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

3. 替换 css 的文件名：byteui -> arco

```diff
- @import '~@arco-design/web-react/dist/css/byteui.css';
+ @import '~@arco-design/web-react/dist/css/arco.css';

- import '@arco-design/web-react/dist/css/byteui.css';
+ import '@arco-design/web-react/dist/css/arco.css';
```

## CSS 类名前缀改变

所有组件的 CSS 类名前缀由 `byte-` 变成了 `arco-`。如果您的项目中存在对 ByteDesign 的样式覆盖，请进行以下迁移步骤。

**迁移步骤**

全局替换您做样式覆盖的 less 中的 `byte-` 为 `arco-`，并确认对应页面是否表现依旧正常。

**如果您依旧想要使用 `byte-` 前缀，那么您需要做以下步骤全局修改样式前缀（不建议）**

请注意，尽管我们存在途径可以全局修改样式前缀，但并不推荐您在迁移中使用。因为 ArcoDesign 对样式规范做了较大的升级，为了更好的视觉体验，我们不可避免地修改了一些组件的 DOM 结构，以及对一些 ByteDesign 中存在的不规范类名进行了调整。

1. 全局配置 ArcoDesign 的 `prefixCls`：

```js
// 这样所有组件的类名前缀都会变为 byte，默认是 arco
<ConfigProvider prefixCls="byte">
  <App />
</ConfigProvider>
```

2. 通过 `modifyVars` 配置 less 里的 `prefix` 变量：

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

3. 通过 `Modal.config` 配置静态方法创建的对话框的 `prefixCls` 前缀

```js
Modal.config({
   prefixCls: 'byte',
})
```

经过以上三步操作，ArcoDesign 中的组件类名前缀和样式前缀都将变为 `byte-`，**但是依旧提醒您，ArcoDesign 中存在一定的类名和 Dom 结构变动，请您确认下项目中是否存在对 ByteDesign 的样式覆盖，如果存在，请认真检查页面是否在 ArcoDesign 下表现正常。**

## 迁移工具

鉴于本次大版本升级的 **Breaking Change** 比较多，为了帮助大家提高效率，我们提供了 **codemod cli** 工具 `@arco-design/codemod`。

> 当然您也可以选择自己修改代码。

**迁移步骤**

1. 检查 git 状态

在运行 codemod 之前，建议您先将本地修改都提交或者暂存，让 git 工作区处于一个干净的状态，方便我们在运行 codemod 之后，检查变更。

2. 运行 codemod

```bash
# 直接通过 npx 运行
npx -p @arco-design/codemod arco-codemod ./src

# 或者全局安装
npm i @arco-design/codemod -g

# 运行
arco-codemod ./src
```

3. 检查输出

codemod 已经尽量覆盖能自动修改的部分，还有一部分是逻辑或者类型修改无法覆盖，对于这部分，请关注 codemod 运行后在命令行中打印的提示信息，请逐条检查修复，可反复运行 codemod 来检查修改结果。

> codemod 的处理结果所输出的格式可能跟您项目配置的代码格式化工具不一致，所以在执行完之后，建议使用您项目中所配置的代码格式化工具修复一下。

**迁移工具做了什么**

迁移工具意在帮助完成一部分无脑的体力活，能够通过修改 AST 实现的转换都可以通过 codemod 实现。

*codemod 运行过程*

<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/de0edfe3ea17ee9be4c911fdb75355ef.gif~tplv-uwbnlip3yd-image.image" alt="codemod cli 运行过程" width="720"/>

*breaking change 处理结果示例*

```diff
// 移除了 `Button` 的 `type='danger'`, 请使用 `status='danger'` 替代
- <Button type='danger'/>
+ <Button status='danger'/>

// 调整了 `Form` 的 `wrapperCol` 的默认值为 `{{ span: 19 }}`, 原来是 12
- <Form ...></Form>
+ <Form ... warpperCol={{ span: 12 }}></Form>

// 移除了 `AutoComplete` 的 `children`, 请使用 `triggerElement` 替代
- <AutoComponent><TextArea/></AutoComponent>
+ <AutoComponent triggerElement={<TextArea/>}></AutoComponent>
```

## Breaking Change 列表

- **全局调整**
  - 调整了 `size` 的梯度 `small`|`default`|`large`|`huge` 为 `mini`|`small`|`default`|`large`

- **图标 Icon**
  - 移除了 ByteDesign 已经提示过要废弃的图标

- **按钮 Button**
  - 移除了 `type='warning'`, 请使用 `status='warning'` 替代
  - 移除了 `type='danger'`, 请使用 `status='danger'` 替代
  - 移除了 `ghost`

- **栅格 Grid**
  - 移除了 `Grid.Row` 的 `flex`， 组件直接采用 `flex` 来实现布局不需要配置

- **表格 Table**
  - 移除了 `checkbox`,  请使用 `rowSelection.type='checkbox'` 替代
  - 移除了 `checkAll`,  请使用 `rowSelection.checkAll={true}` 替代

- **标签页 Tabs**
  - 移除了 `destoryOnHide`, 请使用 `destroyOnHide` 替代
  - 调整了 `lazyload` 的默认值为 `true`

- **标签 Tag**
  - 移除了 `fill`, ArcoDesign 本身即为面性设计
  - 调整了内置的12种颜色

- **自动补全 AutoComplete**
  - 调整了 `filterOption` 的类型， 与 `Select.props.filterOption` 保持一致
  - 移除了 `renderOptions`, 请使用 `dropdownRender` 替代，并且类型与 `Select.props.dropdownRender` 保持一致
  - 调整了 `onSelect` 的第二个参数的类型，与 `Select.option` 保持一致
  - 调整了 `onChange` 的第二个参数的类型，与 `Select.option` 保持一致
  - 移除了 `children`, 请使用 `triggerElement` 替代

- **复选框 Checkbox**
  - 调整了 `Checkbox.Group` 的 `Option` 的优先级， 调整后 `options` 的优先级高于 `children`, 同 `Radio.Group` 保持一致

- **开关 Switch**
  - 移除了 `key` 为 `open` 的 `children`, 请使用 `checkedText` 指定开启的文案
  - 移除了 `key` 为 `close` 的 `children`, 请使用 `uncheckedText` 指定关闭的文案

- **选择器 Select**
  - 移除了 `hideArrowIcon`, 请使用 `arrowIcon={null}` 替代
  - 移除了 `optionSelectedIcon`, 多选选项使用复选框来标识是否选中
  - 移除了 `tagClassName`, 请使用 `tagRender` 来自定义多选标签样式

- **滑动输入条 Slider**
  - 移除了 `showTooltip`, 请使用 `tooltipVisible` 替代

- **表单 Form**
  - 移除了 `Form` 的 `validateFields` 方法，请使用 `validate` 替代
  - 调整了 `Form` 的 `wrapperCol` 的默认值为 `{{ span: 19 }}`, 原先是 `{{ span: 12 }}`
  - 调整了 `FormItem` 的 `initialValue` 的逻辑，只生效一次，改变时不触发表单控件更新
  - 调整了 `FormControl` 的 `initialValue` 的逻辑，只生效一次，改变时不触发表单控件更新

- **数据穿梭框 Transfer**
  - 调整了 `selectedKeys`, 传入即为受控模式，如果不想受控，请使用 `defaultSelectedKeys` 替代
  - 调整了 `targetKeys`, 传入即为受控模式，如果不想受控，请使用 `defaultTargetKeys` 替代

- **全局提示 Message**
  - 调整了 `getContainer`, 只能通过 `Message.config` 全局设置

- **通知提醒框 Notification**
  - 调整了 `getContainer`, 只能通过 `Notification.config` 全局设置

- **菜单 Menu**
  - 移除了 `Menu` 的 `activeItemBorderDirection`, ArcoDesign 设计中不再包含选中状态的亮色指示
  - 移除了 `SubMenu` 的 `propClassName`,  请使用 `triggerProps.className` 来替代

- **触发器 Trigger**
  - 移除了 `trigger='manual'`, 只需要传入 `popupVisible` 即可受控

- **上传 Upload**
  - `uid` 属性变为必传，以此解决`1.x`版本中偶发受控失效的问题。
