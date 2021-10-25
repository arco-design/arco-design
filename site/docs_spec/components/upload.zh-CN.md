`````
组件 / 数据输入

# 上传 Upload

用户可传输文件或提交相应的内容。
`````

## 基本属性

### 组件定义

用户可传输文件或提交相应的内容。

### 组件构成

| 构成元素        | 说明                            |
| ----------- | ----------------------------- |
| 1、上传触发器（必选） | 点击上传触发器打开本地文件夹，用以选择要上传的文件或文件夹 |
| 2、上传内容（必选）  | 上传后的展示形式有文本、图片列表、图片墙、自定义样式等   |
| 3、删除按钮（可选）  | 用于删除上传过程中或者上传后的文件             |
| 4、上传状态（必选）  | 显示文件上传进度                      |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73f5971058414bfd9bff643f3203b81f~tplv-uwbnlip3yd-image.image)

### 组件类型

根据上传的交互方式分类：基础样式、图片上传、拖拽上传、手动触发上传

| 类型       | 说明                          |
| -------- | --------------------------- |
| 1、基础样式   | 用户点击按钮弹出文件选择框               |
| 2、图片上传   | 点击上传图片，可限制用户上传的图片格式和大小      |
| 3、拖拽上传   | 把文件拖入指定区域，完成上传，同样支持点击上传     |
| 4、手动触发上传 | 选中文件后将不会自动触发上传，需要手动点击按钮触发上传 |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f1935fd3f8eb45698d50268eae57e61c~tplv-uwbnlip3yd-image.image)

根据上传后显示的文件样式分类：文本样式、图片列表样式、图片墙样式、自定义样式

| 类型       | 说明                             |
| -------- | ------------------------------ |
| 1、文本样式   | 文件上传成功后显示icon、文件名称、格式          |
| 2、图片列表样式 | 图片上传成功后显示缩略图、图片名称、格式           |
| 3、图片墙样式  | 图片上传成功后在列表中显示缩略图               |
| 4、自定义样式  | 图片墙卡片样式更加丰富，可包含缩略图、图片名称、预览、删除等 |

文本样式

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f7dd161f8eb44634a7b65990279c1a2b~tplv-uwbnlip3yd-image.image)

图片列表样式

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8c71ba011a55beb8eeb0a03eb8613320.png~tplv-uwbnlip3yd-webp.webp)

图片墙样式

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9b386c0bc8a91870fa6b0f5cfbe638c5.png~tplv-uwbnlip3yd-webp.webp)

自定义样式

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a92d5d17ce4bc6f0755c7227ab850d48.png~tplv-uwbnlip3yd-webp.webp)

在以上分类的基础上，可以增加附加功能：**上传前校验、移除前校验、上传前裁剪、限制上传数量、限制上传文件大小**等。

| 类型       | 说明                              |
| -------- | ------------------------------- |
| 1、上传前校验  | 选择文件后点击上传按钮，出现确认对话框，点击确认后开始上传文件 |
| 2、移除前校验  | 点击移除已上传的文件，出现校验对话框              |
| 3、上传前裁剪  | 上传图片前支持裁剪编辑功能                   |
| 4、限制上传数量 | 限制上传的最大数量，超出规定数量后上传按钮会隐藏或者置灰    |

上传前校验

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e0c8a00351eb4d758af94f2746355198~tplv-uwbnlip3yd-image.image)

移除前校验

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5b8687d7193b4fbf901e1d06274ac7f1~tplv-uwbnlip3yd-image.image)

上传前裁剪

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a3a82213f414448831504f0fe0bf951d.png~tplv-uwbnlip3yd-webp.webp)

限制上传数量

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ef762c662d310d5c1b3a46e248774aa.png~tplv-uwbnlip3yd-webp.webp)

### 组件状态

- **常见状态:** 默认状态、鼠标悬浮状态、点击状态、禁用状态

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/06a002130569455da2c28e88d7346cd3~tplv-uwbnlip3yd-image.image)

- **上传过程状态：** 上传成功、上传失败、上传中

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f8d65c7edf3f15c88d7666bb47b9e39e.png~tplv-uwbnlip3yd-webp.webp)

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。

- 当需要展现上传的进度时。

- 当需要使用拖拽交互时。

## 三、关联组件

[按钮](/react/components/button)

[进度条](/react/components/progress)
