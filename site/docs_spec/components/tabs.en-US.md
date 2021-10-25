`````
Component / Data Display

# Tabs

Organize content in the same view, and view content one view at a time. You can switch tabs to view other content.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

A tab page is a single-selection component that organizes similar content in the same view. The tab allows users to switch between different subtasks, views, and modes at the same level, which has the effect of global navigation.

### Component composition

1. **Label (required)**: A short text description (with icons if necessary), used to summarize the content in the corresponding view, and at the same time as a button to switch views. It is recommended that each label does not exceed 4 Chinese characters. Display no more than 7 tags at a time;
2. **Content area (required)**: Display the content corresponding to the selected label, the content format is not limited, and the area size depends on the amount of content and the page layout;
3. **Slide button (optional)**: When the page space is insufficient, some labels will overflow the container. Use the slide button to slide left and right or up and down to display the remaining labels;
4. **Add & Close button (optional)**: In scenarios where custom tabs are supported, you can delete and delete tabs by adding and closing buttons;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/966a6fd73c364868b40b7dc5e0e70559~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| ------ | ------------------------------------------ ------ |
| Default tab page | The selected tab page is indicated by the underline identification and the color change. |
| Text tab page | Lightweight tab page type, only through the text color change to indicate the selected tab page, suitable for secondary content modules when the page has a lot of information. |
| Tab tab page | Add a background container to the label text, which is suitable for scenarios where important tab pages are emphasized or the content area is large. |

1. Default tab page:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24ceefdc0d764bec9427d048169a9ac3~tplv-uwbnlip3yd-image.image)

2. Text tab page:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73e7d3af2a9a42028e501d9e0a65b727~tplv-uwbnlip3yd-image.image)

3. Tab tab page:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e51de18279bb404a921c9df8fb27f7e5~tplv-uwbnlip3yd-image.image)

### Component size

1. The tab page is generally divided into 4 sizes. Choose the appropriate size according to the different usage scenarios. The large size is often used in the header area, and the small size is often used in small containers such as bullet frames.
2. The default text of the label is 14px, and 12px can be used when the page space is insufficient. The text size of the same group of tab pages needs to be the same;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ecdd01774c6e4fff91d73130c66dcd9f~tplv-uwbnlip3yd-image.image)

### Component status

According to different states, the tags in the tab page can be divided into selected state, default state, disabled state, and focus state;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8ed7cd84696240bd8c25895b841498f7~tplv-uwbnlip3yd-image.image)

## When to use

1. **When displaying content of the same level but different categories**: When the content to be displayed is at the same level but different categories (such as a collection of pictures of animals), using tabs can display content by category more clearly, which is convenient Users quickly get the content they want;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bd3a5597eb46413c86da0aa66cf06132~tplv-uwbnlip3yd-image.image)

2. **When the total amount of information is too much**: When the amount of information on the page is too much (such as the details of class personnel), consider using tabs to streamline the amount of information the user obtains at a time, and help the user to focus more on the content currently displayed , When the amount of information is small, use the form of components such as lists;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/67430fc6dfdc425eb5d43b0e9fd326f3~tplv-uwbnlip3yd-image.image)

## When not to use

1. **When content cannot be clearly categorized by tags**: When using tab pages, the content under each label needs to be clearly different from the content under other labels (such as different types of music). The category should not use the tab page, so as not to cause misunderstanding of the content by users;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/be81bec5a003456495e32a2fb808a979~tplv-uwbnlip3yd-image.image)

2. **Scenarios that need to be compared**: When you need to compare multiple pieces of content (such as different sizes of the same item), it is more convenient to compare the differences by spreading the content on the interface. At this time, tags should not be used Page;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bf6b23a416b54e61ac971df81b75bec1~tplv-uwbnlip3yd-image.image)

3. **When the content has a fixed reading order**: When the content is expected to be read or interacted in a fixed order (such as when booking a performance ticket), tab pages should not be used;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6ce1cd9aeb28418388711677b8d2b388~tplv-uwbnlip3yd-image.image)

## Layout

According to the position of the label, the label page can be divided into up and down layout and left and right layout:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c9c20452d12f40a289d328b2dde74940~tplv-uwbnlip3yd-image.image)

## Copywriting Guide

1. **Strong summary**: The label text needs to use concise and direct strong summary words, which can accurately summarize the content contained under the label;
2. **Clear meaning**: There must be obvious meanings between the label texts, and no ambiguity is caused;

## Interactive behavior

Labels will trigger different states according to different interaction behaviors. For specific states, please refer to the [Component State] module.

When there is a label overflowing the component container, the remaining labels are displayed by sliding the button left and right or up and down (when the device is a touch screen, it needs to support touch sliding).

## Associated Components

[List](/react/components/list)

[Menu](/react/components/menu)
