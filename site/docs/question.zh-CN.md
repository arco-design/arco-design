`````
开发指南

# 常见问题

这里汇总了一些在使用组件库时常见的一些问题。
`````

## 项目中同时存在 `antd` 和 `arco-design`，出现样式问题。

如果项目中同时使用 `antd` 和 `arco-design`，并且都使用 `less` 的引用方式，那么在编译的时候，`less` 变量会出现相互覆盖的情况。
可以使用 `css` 的方式来引入样式，这样就不会有 `less` 变量被覆盖的情况了。

## 支持服务端渲染 (SSR) 吗？

支持服务端渲染。



## 为什么 null 和 "" 在 Select 组件中被当作有值而不显示 placeholder ？

`null` 和 `''` 在 Select 中都被认为是值，如下：

```js
<Select>
  <Option value={null}>未选择</Option>
  <Option value={''}>留空</Option>
  <Option value="male">男</Option>
  <Option value="female">女</Option>
</Select>
```

## 使用 eden 脚手架时，提示 `@arco-design/color` 包找不到。

eden config 加一个配置： `other.edenRuntimeDependencies: ['@arco-design/color']`。

## 如何替换 css 类名前缀

1. 通过 `ConfigProvider` 全局配置组件的 `prefixCls`：

```js
// 这样所有组件的类名前缀都会变为 byte，默认是 arco。
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

3. 通过 `Modal.config` 配置静态方法创建的对话框的 `prefixCls` 前缀：

```js
Modal.config({
   prefixCls: 'byte',
})
```

经过以上三步操作，ArcoDesign 中的组件类名前缀和样式前缀都将变为 `byte-`。


## 弹出元素相关
> 包括但不限于 `Trigger`/`Popover`/`Tooltip`/`Popconfirm`/`Dropdown`, 甚至 `Select`、`Cascader`等。底层弹出均使用相似逻辑。
### 使用 `Trigger` 组件实现的弹出 如 `Tooltip` `Popover` `Select` 等组件，弹出框位置不对，或者在滚动时弹出框没有跟随滚动。

两种解决方式：
1. 弹出框默认挂载在 `body` 下，如果你的滚动容器不是 `body`，那么你需要设置 `getPopupContainer` 来将弹出框挂载到你滚动的容器内。
 `getPopupContainer` 设置的容器，样式里需要加上 `position: relative`。
2. 设置 `Trigger` 组件的 `updateOnScroll` 属性为 `true` ，组件会监听触发节点到`body`间所有可滚动元素的滚动事件，实时更新弹出层位置。


### `Popconfirm`、 `Tooltip` 、`Popover` 嵌套使用的时候只生效了一个？
该问题在 `2.9.0` 已经修复，可升级解决。无法升级的话可以参考以下方式解决 👇

* 如果是`Tooltip` 生效，`Popover`不生效。可以在 `Tooltip` 外层包一个 `span` 标签。

```
<Popover ...>
  <Tooltip ....>
    <Button>click</Button>
  </Tooltip>
</Popover>
```

### Tooltip / Popover 等在包裹自定义组件时无法显示弹出层？
因为组件需要接收 Tooltip 等弹出组件需要把事件透传到包裹元素的 dom 上，所以自定义组件需要对上层传下来的参数做处理，有两种解决方案：

* 组件外层包裹 `div` 或者 `span`

```
<Tooltip>
  <div>
    <MyComponent />
  </div>
</Tooltip>
```



* 组件内解构上层 `props` 到最外层 `dom` 上

```
<Tooltip>
  <MyComponent />
</Tooltip>

function MyComponent(props) {
  const { a,b,c, ...rest } = props;
  return <div {...rest} />
}
```


### 设置了 `getPopupContainer` 后，弹出层位置不对？
默认 `autoFitPosition` 属性为 `true`，也就是说组件会自动调整弹出层位置。
例如设置 `position=top` ，但是上方空间不足，弹出层会被遮住，组件就会根据情况来判断是否将弹出层展示在触发元素的下方。
如果设置了 `getPopupContainer`，弹出层的样式属性`left`最小为 0，也就是最小距离父元素的左边界为 0，避免超出父元素，导致被遮挡。
### 点击弹出层（Trigger，Tooltip，Popover， Modal 等）内容时，触发了外层元素的点击事件？
原理：跟 react portal 有关，具体可看 [Portals – React](https://reactjs.org/docs/portals.html#event-bubbling-through-portals)
解决方案：外层包个标签，阻止下事件冒泡，如：
[在线 demo](https://codepen.io/yinkaihui/pen/qBMYwYo?editors=0011)
```
<div onClick={() => {}}>
    <Modal>aaaa</Modal> // 点击 aaa 会触发外层 div 的 onClick
</div>

<div onClick={() => {}}>
   <span onClick={(e) => {e.stopPropagation()}}>
        <Modal>aaaa</Modal>  // 点击 aaa 不会触发外层 div 上的 onClick
   </span>
</div>
```

### 嵌套在 Trigger / Tooltip / Popover 等弹出层元素内的带有禁用属性的表单元素(button, switch 等)会被包一个 span 标签，且变为 inline-block
[Bug: onMouseLeave does not trigger on disabled button · Issue #18753 · facebook/react](https://github.com/facebook/react/issues/18753)
React 对禁用元素的 onmouseenter 和 onmouseleave 事件触发有问题，组件库内部在识别到带有 disabled 的 button 等表单元素时，做了一层兼容处理，附加了 span 元素和 inline-block 样式 [源码地址](https://github.com/arco-design/arco-design/blob/main/components/Trigger/index.tsx#L806)。
p.s: 我们在考虑使用 onpointerenter 去处理这种情况了，但目前不大能评估到改动的影响范围，所以 delay。
p.p.s: 实在不想要这个效果，给 Button 外随意包一个 span/div 之类的标签，绕开 arco 内部的这部分逻辑处理就行， 但是对弹出层内容的显示/隐藏可能会有问题，需要给 span / div 下的 Button 加个样式 `pointer-events: none` 阻绝事件触发，并且给 span/div 加上 cursor: 'not-allowed' 即可。 具体可查看 arco 内部兼容逻辑 （[源码地址](https://github.com/arco-design/arco-design/blob/main/components/Trigger/index.tsx#L806)）。
### Trigger / Tooltip / Popover 等弹出层元素的 `disabled` 属性变为 true 时，弹出层不会消失？
`disabled` 的作用不是隐藏弹出层，是禁用组件状态改变，也可以理解为禁用用户行为对组件状态产生影响。类比禁用后的 `Input` 不会把输入框内容消失，而是不允许用户聚焦编辑了。建议使用 `popupVisible` 属性去控制弹出层的显示和隐藏
### ConfigProvider 设置的 getPopupContainer 对 Modal / Drawer 不生效？
设计如此。`ConfigProvider.getPopupContainer` 仅对基于 `Trigger` 组件实现的弹出型组件（popver，select，tooltip 等）生效。
Modal 和 Drawer 一般作为全屏显示，节点直接挂载在 body。而 popover，select 等基于 trigger 的弹出型元素比较常见于挂载在页面滚动元素，避免弹出框不跟随页面滚动的问题。如需对 Modal， Drawer 设置默认的 getPopupContianer ，建议使用 ConfigProvider 组件的 `componentConfig.Modal.getPopupContainer`

## Table 相关
### Table 跨分页多选时，如何保证切换页码后原来选择状态不丢失？

* 设置`RowSelection.checkCrossPage` 为 `true`，允许复选框跨页多选。
* 如果数据是受控的还需要设置 `RowSelection.preserveSelectedRowKeys` 为 `true`。表示在数据项不存在时仍保留所选的 `key`

### 表格数据出现错乱，不符合筛选条件的数据一直存在等等？

* 大概率是 **`rowKey`** 不唯一，表格需要每一条数据有一个单独的标识类似数据表的主键。所以一定要保证每条数据有一个**唯一的** **`rowKey`**
* 如果 `rowKey` 为一个字符串，会将 `rowData[rowKey]` 作为唯一标示，如果实在不能保证有唯一 key，可以将 `rowKey` 传入一个函数：`React.Key | ((record: T) => React.Key)`

## Typography 相关
### 开启超出省略功能后出现抖动，在 table 中一直在重复渲染？
`Typography` 的超出省略跟其宽度有直接关系，简单来说就是根据宽度对里面的内容进行了截断。在 resize 场景会重新计算进行内容阶段。
在 Table 中，table 本身会根据内容不断调整单元格宽度，而 `Typography` 又会根据宽度调整内容，所以会陷入计算循环，**所以需要对使用** **`Typography` 的单元格设置宽度，或者开启 `tableLayoutFixed: true`。**
```
{
    title: 'Address',
    dataIndex: 'address',
    width: 200,
    render(x: any) {
      return <Typography.Paragraph ellipsis={{ showTooltip: true }}>{x}</Typography.Paragraph>;
    },
  }
```

### 在 `flex` 布局下超出省略出现问题？
`flex` 布局也会影响 **`.arco-typography`** 的宽度 ，可以给 `Typography`加上 `width:100%` 用来填充容器。如果还是不行可以尝试添加 **`flex-shrink: 0` ** 避免弹性容器中 `Typography` 的宽度受到影响。
### 3. 万能解决办法
尝试给 `Typography` 组件定宽，本身超出省略的定义就是在**固定尺寸的容器**里进行省略
### 性能问题
对于大量使用 超出省略 场景，由于默认是通过 js 计算，造成了性能问题，可以尝试给 `Typography` 组件定宽，并且开启 `ellipsis.cssEllipsis` 为 `true` 即可。
### 使用谷歌翻译页面之后报错
这个是因为某版本修复问题，用了 `React.Fragement` 导致的问题。是 React 原生的 bug （[Issue 链接](https://github.com/facebook/react/issues/17256)）。
可以设置 `ellipsis.wrapper` 解决。比如 `ellipsis={{ wrapper: 'span' }}`。

## Upload 相关
### 上传前后文件数据改变、接口报错等
首先需要反复确定**是不是接口本身的问题，** Upload 的上传功能 **完全不会操作业务自身的接口**
### 自定义上传触发器
可以将元素作为 `Upload` 的子元素，如果 `Upload` 组件存在 `children` 的话，将会渲染 `children` 作为上传触发器。
### 默认不发起上传请求
设置 `autoUpload=false` 即可关闭自动上传
### 设置了accept 分别为 txt doc docx pdf 的mime类型，唤起的文件列表还是会存在一些其他 mime 类型
文件选择器里是否文件允许被选中是浏览器 accept 属性对应的默认行为，组件啥也控制不了。但是你可以在 beforeUpload 里对文件进行再次的判断，过滤掉不符合上传条件的文件。
### 上传失败时自定义 Upload 的错误信息提示？
Upload 的错误提示默认是直接显示上传文件的 repsonse 字段，如果想要自定义上传失败的错误信息展示，自定义下 response 字段就行。（p.s: 如果不大能理解这块，可以试试在控制台打印下 onChange 的参数，会发现 fileList 的每个元素都有一个 response 字段，这块用户是可以完全自定义的）
![官网示例](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/1fa8f4196d544195ba2a8292e7f64e2e~tplv-goo7wpa0wc-image.image)


## Menu 相关
### 设置了 `autoOpen` 但是菜单没有按预期展开
`autoOpen` 会在第一次渲染时展开所有子菜单，所以如果菜单配置异步获取时会无法导致按预期展开。**可以在获取到菜单配置后再渲染** **`Menu`**
## Modal 相关
### 我不想打开弹窗后自动聚焦怎么办？不想弹窗抢焦点怎么办？modal / drawer 弹出后页面上其他元素无法获取焦点了怎么办？
设置 `focusLock=false` 和 `autoFocus=false`

### 在 Iframe 中使用 Modal/Drawer 等出现问题。

* 在 `2.39.3` 版本升级了 `react-focus-lock` 依赖版本且传入 `crossFrame=false` 配置，在 iframe 里不进行 focusLock。应该可以解决这个问题 具体 PR 可看 https://github.com/arco-design/arco-design/pull/1359

## Tabs 相关
### Tabs 为啥有一个 overflow: hidden 属性会把内部的元素给截断
因为有动画效果，所以只能这样。如果不需要动画效果的话，做些样式覆盖，覆盖掉 overflow: hidden 以及 .arco-tab-content 上的 margin-left ， 被隐藏的 .arco-tab-pane 的 display:none 就行。

### Tabs 或者其他组件 切换视图的时候宽度忽然变大把容器撑开了？

* 检查下容器是不是 `flex` 布局，有没有设置 `flex: 1`。对外层的 `flex: 1` 的容器加上 `overflow: hidden` 或者 `overflow: auto` 即可。

## Input 相关
### `TextArea` 字数限制展示会遮挡文字？
已知组件设计问题，暂时没有好的设计方案，组件库这边不会进行样式修改，业务方可以自己进行加 `style={{marginBottom: 12px}}` 等样式来解决。
## Carousel 相关
### 通过 `currentIndex` 控制翻页没有动画效果
因为 Carousel 翻页需要处理动画所需的时间，请使用 `carousel` 属性获得带有 API 方法的组件引用，然后调用 API `goto` 进行翻页。
```
import { Carousel } from '@arco-design/web-react';
import type { CarouselHandle } from "@arco-design/web-react/es/Carousel/interface";

function Demo() {
  const refCarousel = useRef<CarouselHandle>(null);

  const goto = (index) => {
    refCarousel.current?.goto({ index });
  };

  return <Carousel carousel={refCarousel} />;
return <}
```

## Arco Webpack 插件相关
包名：**@arco-plugins/webpack-react**
### TypeError: The 'compilation' argument must be an instance of compilation
报错如下：
![demo](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/5798e09fc4284ee5b05697a80ac886f7~tplv-goo7wpa0wc-image.image)

一般是因为项目存在多个 webpack 实例导致的，解决方式：
通过 arco plugin 的 webpackImplementation 参数把实际使用的 webpack 实例传入即可

![demo](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/fec71d3b12204d57a2a11390146c4df8~tplv-goo7wpa0wc-image.image)


### Module not found: Error: Can't resolve 'important;cursor:not-allowed ....
样式引入报错，关键词: `!important`。样式文件里含有类似：color: red !important 的语句时，可能触发此编译报错，常见和 `eden` 、`jupiter` `pnpm` 一起使用时出现。
解决方式：升级 `@arco-plugins/webpack-react` 到最新版本，（可能需要清除下本地编译缓存），重新编译下。
### **Can't resolve'./@arco-design/web-react/es/style/theme/default.less' in 'xxxx'**
对 arco 封装后引入组件库的样式文件编译报错，常见报错信息为
**Can't resolve'./@arco-design/web-react/es/style/theme/default.less' in 'xxxx'**
![image](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/2087f90111614367aec5116b17d244d5~tplv-goo7wpa0wc-image.image)

**解决方式：**通过修改 webpack less-loader 配置项解决，将查找路径指定为组件库实际安装的位置。其他打包工具类似，这个 `paths` 是 `less` 本身支持的属性。
![image](https://p9-arcosite.byteimg.com/tos-cn-i-goo7wpa0wc/11403203bebb48c88e6bbb7d3243229f~tplv-goo7wpa0wc-image.image)


## 其他常见问题

### 不能用作 JSX 组件, 不是有效的 JSX 元素
出现这个问题一般都是由于有多个版本的 `@types/react` 造成的，可以通过

1. `yarn why @types/react` 或者 `npm ls @types/react` 验证是否还有多个版本的 `@types/react`
2. 然后在 `package.json` 中配置 `resolutions` 统一 `@types/react` 版本。

```
 "resolutions": {
    "@types/react": "^17.0.0"
 }
```

### 如何运行时切换主题？

* 参考这里吧

https://codesandbox.io/p/sandbox/late-rgb-gw63ys?file=%2Fdemo.js%3A50%2C11
