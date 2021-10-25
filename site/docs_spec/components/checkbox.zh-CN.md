`````
组件 / 数据输入

# 复选框 Checkbox

在一组数据中，用户可通过复选框选择一个或多个数据。
`````

## 基本属性

### 组件定义

当列表中有多个选项可供选择，且选项之间不互斥，可使用复选框组件。

### 组件构成

复选框组件由复选框和复选框标签构成。

| **构成**  | **说明**         |
| ------- | -------------- |
| 1、复选框   | 展示当前的状态        |
| 2、复选框标签 | 描述想要选择或取消选择的信息 |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/89120cf95ad84a368db73c7dfb11bea9~tplv-uwbnlip3yd-image.image)

### 组件状态

- 含**未选中、聚焦、选中、禁用**四个状态。禁用又分为**未选中禁用态、已选中禁用态。**
- 复选框的默认状态是未选中任何选项。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/967339027c0c445d883108837288cd79~tplv-uwbnlip3yd-image.image)

## 何时使用

如果可以从列表中选择多个选项，则应使用复选框。

- **筛选或批量处理的操作** 用于过滤页面、菜单中的数据，进行批量操作
- **条款和条件级** 打开或关闭复选框表明用户是否同意这些条款。

## 何时不使用

- 列表中仅允许有一个选项时，使用单选框
- 对于用户更改后立即生效的设置，使用开关

## 组件布局

**对齐方式**

如果存在分组复选框，可以采用水平或垂直的方式排布。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d5ac48b1282349d48e16fa02d29fd828~tplv-uwbnlip3yd-image.image)

需折行的长文本标签，复选框始终与文本标签顶部对齐。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ff02c2f991074e5698b63b7a2009ccb0~tplv-uwbnlip3yd-image.image)

**复选框组**

复选框可以与其他复选框具有父子关系

- 选中父级选项后，所有子复选框均被选中
- 如果未选中父复选框，则所有子复选框均未选中
- 如果选中了部分（但不是全部）子复选框，则父复选框变为不确定的复选框

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6b0735bf0b4c4d3b94d5a62ffa63646a~tplv-uwbnlip3yd-image.image)

## 交互行为

**鼠标状态**：用户鼠标可单击复选框和复选框标签两部分区域来触发目标选项。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4ac56ebe27d9475ca16fb61915114e9e~tplv-uwbnlip3yd-image.image)

## 关联组件

[单选框](/react/components/radio)

[开关](/react/components/switch)
