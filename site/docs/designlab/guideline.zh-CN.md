`````
风格配置平台

# 平台使用指南

Arco Design Lab是一个旨在提升设计以及开发效率的设计系统配置平台。通过协助企业构建个性化设计系统，以帮助企业更好的管理设计系统，提高产品设计全流程的工作效率。
`````

## 写在前面

风格配置平台提供的是一系列的粒子变量。这些粒子变量就定义在这里，无论你用或者不用，跟用什么组件库无关。 换句话说：平台是所有样式变量的源头，Arco 组件库只是这些样式变量的最佳实践。其他组件库也完全可以基于这些样式变量写自己的组件样式。 如果还是不太理解，可以在体验平台功能后再回想这段话～

## 能做到的

1.  完善的企业级设计系统方案
1.  所见即所得的愉悦配置体验
1.  协同设计语言轻松维护统一性
1.  发布系统智能生成全套代码包

用户只需自定义平台提供的设计系统模版，完成相关配置后发布设计系统，平台将会智能生成代码包，即刻便能投入生产。

## 短短几步，轻松上手

### 一键创建设计系统

在 [平台首页](https://arco.design/themes) 可以快速创建自己的设计系统，其默认展示为 Arco Design 的设计风格。

如果在系统列表看到自己心仪的设计系统，也可以在操作菜单中**一键复制**，以此为基础创建自己的设计系统。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ee4f22faa9994671b8f192317d391e03~tplv-uwbnlip3yd-image.image)

### 样式配置

如上图侧边栏所示，样式配置主要分为**基础样式**和**组件样式**两个部分。

- #### 基础样式

**基础样式： 当修改基础样式的配置时，对全局样式有着强烈的影响。**

基础样式主要包括 Arco Design 设计系统中定义的一系列的粒子变量，如颜色，字体，尺寸等，是设计同学和前端同学约定的一套规范。他们作为基础变量，被Button，Checkbox等基础组件所引用。而 Checkbox，Button等基础组件又是 Modal，Tree 等复杂组件的一部分。所以对基础变量的修改会直接影响到全部组件的设计风格。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ade3de2854b4ad5965a3738d9d38589~tplv-uwbnlip3yd-image.image)

在配置页面基础样式支持颜色，字体，边框，阴影，尺寸的配置。 并且在页面右上角可点击预览按钮，唤出预览页面，实时看到自己的配置效果。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/70bb3fe82ea142a6bcfef2f4217191c0~tplv-uwbnlip3yd-image.image)

ArcoDesign 默认对组件的尺寸为 mini(24px), small(28px), default(32px), large(36px)。如果对修改全局尺寸有需要，可以在`尺寸`菜单中直接修改 组件尺寸 相关配置，快速实现想要的效果。

- #### 组件样式配置

细粒度的定制单个组件的样式。

以`Input`为例：

默认的Input是一个灰底无边框的面性设计。 选中示例，可以在右侧配置面板中修改其背景色，边框色，以此调整视觉规范。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f2d859b8c344dc3b5bb4d9e61b3ae44~tplv-uwbnlip3yd-image.image)

### 开发者模式

尽管配置平台提供了丰富的配置项，但总有一些无法通过配置项实现的需求。在配置面板可以点击右上角按钮进入开发者模式，在弹出的编辑器中编写`less`代码，从而实现样式的覆盖。**因为涉及到代码编写，建议可以由研发同学进行修改。**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8313ab1e0cc844ec8329b0b5c1149638~tplv-uwbnlip3yd-image.image)

### 项目中如何使用

在配置完成后，点击右上角发布按钮，即可在弹出的发布弹窗中配置相关信息，并执行发布流程，将主题配置发布到 `npm`中。如何将主题配置应用到业务项目中可查看： [如何在项目中引入主题包](/docs/designlab/use-theme-package)

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4cf6a94e67c9491f80587fc406c087c7~tplv-uwbnlip3yd-image.image)
