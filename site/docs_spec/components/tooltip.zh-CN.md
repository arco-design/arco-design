`````
组件 / 数据展示

# 文字气泡 Tooltip

鼠标悬停、聚焦或点击在某个组件时，弹出的文字提示。
`````

## 基本属性

### 组件定义

鼠标悬停或键盘聚焦在一个UI元素（如按钮、图标等）上时，在元素周围弹出的简单文字提示，用于展示该元素的辅助信息。

### 组件构成

1. **气泡框（必有）** ：承载文字的容器，让文字能够更清晰的展示。建议带箭头，箭头指向目标元素。
2. **文字（必有）** ：简单的描述性文字，作为目标元素的辅助信息。建议不超过4行，每行文字不超过20个汉字。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0252b9200f204b96b4bdb34d095b0da8~tplv-uwbnlip3yd-image.image)

### 组件类型

| 类型    | 说明                                 |
| ----- | ---------------------------------- |
| 功能引导类 | 用于说明一个UI元素的功能、含义或状态等信息，如：对图标功能的说明。 |
| 拓展信息类 | 对已有信息或元素的进一步拓展和定义，如：对段落中词义的解释。     |

1. 功能引导类：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/55e2e22c16fd4c1eb8d94e8a3677c436~tplv-uwbnlip3yd-image.image)

2. 拓展信息类：

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bd0f8eac557a42dd808cb12a6a1f352e~tplv-uwbnlip3yd-image.image)

### 组件尺寸

1. 文字建议为14px，尺寸可根据需要适当增大或减小（建议不小于12px），同一业务内建议采用统一的尺寸；
2. 气泡框在内容的基础上留有适当的边距，建议左右边距为12px，单行高度最小为30px（迷你尺寸，试用于小场景或数字信息），默认为38px。上下边距相同，左右边距相同，同一业务内建议采用统一的尺寸。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d4cebfab562c4638a0c36a1530e204b0~tplv-uwbnlip3yd-image.image)

## 何时使用

1. **展示简短的帮助性信息**：当用户不理解一个UI元素，或想要获得更多信息时，文字气泡能展示相关联的更多帮助性信息；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/90e8043247f640e192e87f0901729c15~tplv-uwbnlip3yd-image.image)

2. **增强交互的确定感**：当用户与界面进行交互时，文字气泡能够帮助用户增强对所交互元素效果的确定感；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/06e60a9b2c734238994f171f3b6f3bc0~tplv-uwbnlip3yd-image.image)

3. **页面位置有限时**：当页面位置有限时，一些UI元素需要以简化的形式出现（如单独的图标），结合文字气泡能够帮助减少页面中复杂的信息。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ce015efc13ef49e6b115f8acf9a9abe6~tplv-uwbnlip3yd-image.image)

## 何时不使用

1. **展示任务相关的重要信息：** 不要将完成任务所需的重要信息放在文字气泡内，重要的信息不应隐藏，应当始终直接展示在页面中；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3718b1720c934dda823cdf7ed0a2968f~tplv-uwbnlip3yd-image.image)

2. **展示重复或多余的信息**：当目标元素含义显而易见时，无需再使用文字气泡。不应在文字气泡中展示与其目标元素重复的信息；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7a78551a908e4286907eb09e535b4cae~tplv-uwbnlip3yd-image.image)

3. **展示类型复杂的信息**：文字气泡中的内容应是简单直接的，整体文本不宜过长，不应展示图片等复杂的信息。当需要展示复杂信息时，可考虑使用对话框（Modal）组件；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4319978f68718a3c18daf38c0a2e31c2.png~tplv-uwbnlip3yd-webp.webp)

4. **展示可交互信息**：文字气泡不应承载可交互的操作信息。当需要展示操作时，可考虑使用气泡卡片（Popover）。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3a5cd045ad2a4e6793e08d5c9e472758~tplv-uwbnlip3yd-image.image)

## 布局

1. 文字气泡支持12个不同方位，分别为：上左、上、上右、下左、下、下右、左上、左、左下、右上、右、右下；
2. 根据视线流及页面布局限制来决定文字气泡的方位，防止文字气泡遮挡相关信息，打断工作流。同一业务内建议采用统一的布局方式；

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5d6da46eb3c94ef390caa745a47a4e9c~tplv-uwbnlip3yd-image.image)

## 文案指南

1. **简洁：** 文字描述应尽量简短；
2. **直接**：直接描述信息，不增加装饰性词语；

## 交互行为

1. 鼠标悬停或键盘聚焦在目标元素上时，文字气泡立即出现；
2. 鼠标或键盘移出目标元素时，文字气泡立即消失。

## 关联组件

[气泡卡片](/react/components/popover)

[对话框](/react/components/modal)
