`````
Component / Data Display

# Tooltip

A simple text popup tip.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

When the mouse is hovered or the keyboard is focused on a UI element (such as a button, icon, etc.), a simple text prompt pops up around the element to display the auxiliary information of the element.

### Component composition

1. **Bubble box (required)**: A container that carries text, so that text can be displayed more clearly. It is recommended to bring an arrow, which points to the target element.
2. **Text (required)**: Simple descriptive text as auxiliary information for the target element. It is recommended that there be no more than 4 lines and no more than 20 Chinese characters per line.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0252b9200f204b96b4bdb34d095b0da8~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| ----- | ---------------------------------- |
| Function guide class | Used to explain the function, meaning or status of a UI element, such as: the description of the icon function. |
| Expand the information category | Further expansion and definition of existing information or elements, such as: explanation of the meaning of words in paragraphs. |

1. Function guide class:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/55e2e22c16fd4c1eb8d94e8a3677c436~tplv-uwbnlip3yd-image.image)

2. Expand the information category:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bd0f8eac557a42dd808cb12a6a1f352e~tplv-uwbnlip3yd-image.image)

### Component size

1. The text is recommended to be 14px, and the size can be increased or decreased as needed (not less than 12px is recommended), and a uniform size is recommended for the same business;
2. The bubble box has appropriate margins on the basis of the content. It is recommended that the left and right margins be 12px, and the minimum height of a single line is 30px (mini size, try for small scenes or digital information), and the default is 38px. The upper and lower margins are the same, and the left and right margins are the same. A uniform size is recommended for the same business.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d4cebfab562c4638a0c36a1530e204b0~tplv-uwbnlip3yd-image.image)

## When to use

1. **Show brief helpful information**: When the user does not understand a UI element or wants to get more information, the text bubble can display more related helpful information;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/90e8043247f640e192e87f0901729c15~tplv-uwbnlip3yd-image.image)

2. **Enhance the sense of certainty of the interaction**: When the user interacts with the interface, the text bubble can help the user to enhance the sense of certainty of the effect of the interacted elements;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/06e60a9b2c734238994f171f3b6f3bc0~tplv-uwbnlip3yd-image.image)

3. **When the page location is limited**: When the page location is limited, some UI elements need to appear in a simplified form (such as a separate icon), combined with text bubbles can help reduce complex information on the page.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ce015efc13ef49e6b115f8acf9a9abe6~tplv-uwbnlip3yd-image.image)

## When not to use

1. **Display important information related to the task:** Don't put the important information needed to complete the task in the text bubble, the important information should not be hidden, and should always be displayed directly on the page;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3718b1720c934dda823cdf7ed0a2968f~tplv-uwbnlip3yd-image.image)

2. **Show repetitive or redundant information**: When the meaning of the target element is obvious, there is no need to use text bubbles. Do not display information that overlaps with the target element in the text bubble;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7a78551a908e4286907eb09e535b4cae~tplv-uwbnlip3yd-image.image)

3. **Display complex information**: The content in the text bubble should be simple and straightforward, the overall text should not be too long, and complex information such as pictures should not be displayed. When you need to display complex information, you can consider using a dialog box (Modal) component;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4319978f68718a3c18daf38c0a2e31c2.png~tplv-uwbnlip3yd-webp.webp)

4. **Display interactive information**: The text bubble should not carry interactive operation information. When you need to show the operation, you can consider using a bubble card (Popover).

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3a5cd045ad2a4e6793e08d5c9e472758~tplv-uwbnlip3yd-image.image)

## Layout

1. The text bubble supports 12 different directions, namely: top left, top, top right, bottom left, bottom, bottom right, top left, left, bottom left, top right, right, bottom right;
2. Determine the position of the text bubble according to the line of sight flow and page layout restrictions to prevent the text bubble from obstructing relevant information and interrupting the workflow. It is recommended to adopt a unified layout within the same business;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5d6da46eb3c94ef390caa745a47a4e9c~tplv-uwbnlip3yd-image.image)

## Copywriting Guide

1. **Concise:** The text description should be as short as possible;
2. **Direct**: directly describe the information without adding decorative words;

## Interactive behavior

1. When the mouse is hovered or the keyboard is focused on the target element, the text bubble will appear immediately;
2. When the mouse or keyboard moves out of the target element, the text bubble disappears immediately.

## Associated Components

[Popover](/react/components/popover)

[Modal](/react/components/modal)
