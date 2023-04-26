`````
组件 / 反馈

# 警告提示 Alert

向用户显示警告的信息时，通过警告提示，展现需要关注的信息。
`````

## 基本属性

### 组件定义

展现需要关注的信息，适用于简短的警告提示。

### 组件构成

1. **图标（可选）** ：可以在警告提示的文字前添加图标，用以明示当前信息状态；
2. **提示文字（必选）** ：提示的内容，建议不要超过1行；
3. **辅助性文字（可选）** ：当内容比较长时，可通过辅助性文字进行补充提示；
4. **链接（可选）** ：可以在警告提示的文字后添加链接；
5. **叉号（可选）** ：点击后关闭警告提示；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5d2671f5d8cc4fd198700e2f92a1b582~tplv-uwbnlip3yd-image.image)

### 组件类型

共有四种样式：常规、成功、警告、错误，可根据不同场景配置。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/894d4fcf228c40bc87e48a86de04c655~tplv-uwbnlip3yd-image.image)

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 何时不使用

1. 正常输入项报错时，使用输入项本身的报错样式，或者使用 **全局提示** ，而不要使用 **警告提示** 。

![](https://lf3-static.bytednsdoc.com/obj/eden-cn/unpzlK_vjyH/ljhwZthlaukjlkulzlp/site/alert.png)

2. 用于呈现普通提示信息时，建议使用 **卡片** 或 **气泡卡片** ，而不要使用 **警告提示**。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8eee5fc33b4e4ec0ba4bef155a9d7e02~tplv-uwbnlip3yd-image.image)

## 布局

可放于“页面、对话框、抽屉”等多种容器中，一般展示在容器顶部。

## 关联组件

[全局提示](/react/components/message)

[气泡卡片](/react/components/popover)
