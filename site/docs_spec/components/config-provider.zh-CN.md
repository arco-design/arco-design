`````
组件 / 其他

# 全局配置 ConfigProvider

在应用的最外层进行配置，一次设置，全局生效。一般用于设置国际化语言等功能。
`````

## 基本属性

### 组件定义

为组件提供统一的全局化配置，一次设置，全局生效。

### 组件类型

全局配置可通过不同类型的组件去实现，常用的组件类型有：开关、标签页、筛选框等。

| 类型      | 说明             |
| ------- | -------------- |
| 1、开关形式  | 用于两个配置选项之间来回切换 |
| 2、标签页形式 | 有多个配置选项时使用     |
| 3、筛选框形式 | 有多个配置选项时使用     |

开关形式，如：设置是否隐藏表格分页

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c40e0cf7c9884150b54737d05ae9f31a~tplv-uwbnlip3yd-image.image)

标签页形式，如：修改默认组件尺寸

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6b2965530a614006b324ca60e4b4ceb2~tplv-uwbnlip3yd-image.image)

筛选框形式，如：实现多语言文案切换

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e2f08c06252748f09cf7b026ea020a6e~tplv-uwbnlip3yd-image.image)

## 何时使用

实现多语言文案切换、修改默认组件尺寸等场景

## 关联组件

[开关](/react/components/switch)

[标签页](/react/components/tabs)
