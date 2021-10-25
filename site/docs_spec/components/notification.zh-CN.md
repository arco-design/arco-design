`````
组件 / 反馈

# 通知提醒框 Notification

全局展示通知提醒，将信息及时有效的传达给用户。
`````

## 基本属性

### 组件定义

用于向用户反馈重要的警告提示和通知消息。

### 组件构成

1. **标题（必有）** ：传递核心信息，为用户提供通知的快速概览或直接结果。
2. **通知文本（可选）** ：用于描述额外的细节或可操作的步骤，通知的正文中可包含[链接](/docs/spec/Link)，这些链接可定向到后续步骤中。
3. **行动按钮（可选）** ：允许用户处理通知或将他们导航到包含更多详细信息的页面。
4. **关闭按钮（可选）** ：关闭通知提醒框。
5. **图标（可选）** ：辅助解释通知类型，让用户更快速、直观地理解信息
6. **容器（必有）** ：用于承载通知提醒框。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/60a7ff7253a14bc1ad612e5046c27cf4~tplv-uwbnlip3yd-image.image)

### 组件类型

1. **普通信息**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/864dd751201247f4a0cf2aac99b14b1b~tplv-uwbnlip3yd-image.image)

2. **带图标：** 常用来显示「成功、错误、消息、警告」类的系统消息，其中图标也可被自定义。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0a7e733cdba848be847f245b6e4e7efc~tplv-uwbnlip3yd-image.image)

3. **带行动按钮：** 行动按钮允许用户处理通知，或将他们导航到包含更多详细信息的页面。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/49bf0f89c48246c7ad3f3e855a05fc1a~tplv-uwbnlip3yd-image.image)

## 何时使用

一般用于系统级通知，需要吸引用户关注但又不强制用户去处理的场景。当消息出现时，用户可以选择继续当前操作，也可以选择处理当前消息。

1. **仅用于通知，无需用户处理**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ed26e25034e4a5da203357468631209~tplv-uwbnlip3yd-image.image)

用户可以自行选择关闭，也可由系统在延时后自动关闭。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b14cee629c1b495989314b2603cf9138~tplv-uwbnlip3yd-image.image)

2. **需要用户处理：** 用户需要点击行动按钮进行选择、确认才能进行。如果用户阅读通知或与通知交互很重要，则不应包含关闭按钮。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b2b3c9d070b14b278f16d621872a44bb~tplv-uwbnlip3yd-image.image)

## 何时不使用

1. **重要的信息需要用户一定注意和做出行动时**：建议使用对话框组件。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7ff0a949552246119643a993ae3269fb~tplv-uwbnlip3yd-image.image)

2. **一些频繁的、不重要的简短提示**，建议使用警告提示组件。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/622ace98d184450a8c0ceac1ab5af4eb~tplv-uwbnlip3yd-image.image)

## 组件布局

通知提醒框一般在在页面中的边缘位置弹出消息提示，可以从左上角、右上角、左下角、右下角弹出。在同一系统中需保持一致。

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3a7c202e32dc4265a85bc15e8b24753c~tplv-uwbnlip3yd-image.image)

## 文案指南

通知提醒框为内容提供的空间有限，因此内容必须简短明了。 用户应该能够快速浏览通知，了解情况，并知道下一步该做什么。

1. **标题**

标题应该简短且具有描述性，解释最重要的信息。如果可能，建议仅使用标题传达主要信息。仅当标题是一个完整的句子时才使用句点。

2. **正文内容**

简明扼要，避免重复或改写标题。将内容限制为一两个短句。通过故障排除操作 ，或后续步骤来解释如何解决问题，可以在通知正文中包含将用户重定向到后续步骤的链接。

3. **行为标签**

保持标签简洁，并清楚地表明用户可以采取的行动，将行为标签限制为一两个词。

## 交互行为

1. **关闭**

通知提醒可以手动关闭，也可以设置时间自动关闭，延时关闭一般在弹出3 秒后自动关闭。

2. **对通知进行操作**

用户可以点击行动按钮解决通知，如“回复”、“确认”或进入跳转链接。

## 关联组件

[警告提示](/react/components/alert)

[全局提示](/react/components/message)

[对话框](/react/components/modal)
