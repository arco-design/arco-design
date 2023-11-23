`````
组件 / 布局

# 布局 Layout

页面的基础布局框架，常与组件嵌套使用，构建页面整体布局。
`````

## 基本属性

### 组件定义

页面的基础布局框架，常与组件嵌套使用，构成页面整体布局。

### 组件构成

1. **顶部导航** **（可选）** ：可嵌套组件和元素，常与搭配使用的有logo/标签/输入框/按钮/头像等。
2. **侧边栏（可选）** ：可嵌套组件和元素，常与搭配使用的有树选择器/输入框等。
3. **内容部分（必选）** ：可嵌套组件和元素，常与搭配使用有卡片 / 折叠面板 / 空状态 / 列表 / 数值显示 / 标签页等。
4. **页面底部（可选）** ：可嵌套组件和元素，常与搭配使用有分割线等。

### 组件类型

| 构成元素     | 说明                                                                          |
| -------- | --------------------------------------------------------------------------- |
| 1、上下布局   | 一般为顶部主导航和下部通栏内容展示区域，上下级的结构符合用户上下浏览的习惯，主工作区域的信息展示效率更高。                       |
| 2、“T”型布局 | 上部为顶部导航，下部为侧边导航及内容展示区，是在火山引擎中常见的页面布局形式。                                     |
| 3、上中下布局  | 一般为顶部主导航和页面标题栏区、内容展示区，常用于二级子页面的内容展示                                         |
| 4、综合布局   | 适用于较复杂的业务产品布局，提供更多展示模块区域，用不同形式的结构内容展示，除顶部导航、固定侧边导航、中间内容区域外，右侧增加了固定的拓展内容展示区。 |

- **上下布局**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/781c526eebd04c9483c4ae00db187268~tplv-uwbnlip3yd-image.image)

- **“T型”布局**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f4f12fb660ab46daa39e6bee637e6c67~tplv-uwbnlip3yd-image.image)

- **上中下布局**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5959d8e03f9d4ef3af8029d6eecc56a4~tplv-uwbnlip3yd-image.image)

- **综合布局**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b087ef649c4d403b90751c0158ac491f~tplv-uwbnlip3yd-image.image)

## 何时使用

1. 根据业务场景的不同使用不同元素构成页面布局

**自定义侧边栏** ：布局灵活，可操控性强（多用于功能性页面，操作按钮可放置在侧导航或顶部导航

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6704b44ba5a940e6bb3eab866a1eaeae~tplv-uwbnlip3yd-image.image)

**可伸缩侧边栏** ：可用鼠标控制侧边栏大小，布局灵活，用户可自己定制（多用于文字较长和层级较多的侧边栏）

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/2aec7f6685ed4722b6aa89276f0cf7dd~tplv-uwbnlip3yd-image.image)

2. **顶部导航不宜过高，侧边栏不宜过宽**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5eed0ebceaee4e8b88a2bd9ccef668b8~tplv-uwbnlip3yd-image.image)

## 布局

- 系统层级简单且功能数量少时，可使用顶部导航菜单进行“上下布局”。该整体视觉动线简单，适合信息展示类系统。

- 系统层级简单但功能数量多时，可使用侧边导航菜单进行“左右布局”。竖向排列的形式可以展示更多的菜单项。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/35cf8c64da984d69902e11e0cea3e85d~tplv-uwbnlip3yd-image.image)

## 文案建议

1. 导航需提供清晰的目标位置指引，一般使用色块底色强调、字体加粗、高亮的方式凸显目前位置

2. 建议在使用全局深色主题时使用深色导航

## 相关组件

[菜单](/react/components/menu)
