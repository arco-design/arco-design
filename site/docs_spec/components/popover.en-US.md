`````
Component / Data Display

# Popover

A floating card popped by hovering, focusing, or clicking on a element.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

When the mouse hovers, focus, or click on a component, a bubble-like card floating layer will pop up. You can operate on the elements on the card.

### Component composition

The bubble card component is composed of background and content.

**1, background** **(required)**: the background of the bubble card.

**2, content** **(required)**: the content of the bubble card (such as title, paragraph, link, button, etc.).

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e1092cb7e7a44b608db7966b9d7ee86b~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| ------ | ------------------------------------------ ---------------- |
| Text type | The bubble content is a card with plain text, which is simple to operate and improves efficiency; it is mostly used for noun interpretation, message prompts, etc. |
| Button/link type | Cards with buttons or links in the bubble content, which have less interference to users and reduce mis-clicks, but may interfere with the user's operation process; it is mostly used for secondary confirmation, prompting and so on. |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/09f7a9584a4341b8a309c1677289ad34~tplv-uwbnlip3yd-image.image)

## When to use

- Used when users need more additional information.

- **Difference from "Tooltip text bubble":** When the mouse moves into the bubble card, the user can operate the elements on the card, so it can carry more complex content, such as links or buttons.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9d53735d5e2247f4b8fee878d120bf42~tplv-uwbnlip3yd-image.image)

## When not to use

- Don't put too much content in the bubble card
- Don't put key information in bubble cards

## Layout

- ### The location of the bubble card

**Card bubbles support 12 different directions**

Supports 12 different orientations. They are: "upper left", "upper", "upper right", "lower left", "down", "lower right", "left upper", "left", "left lower", "right upper", "right" , "Bottom Right".

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ce50e38625984fe78d3a6f3ac47d9479~tplv-uwbnlip3yd-image.image)

- ### **Bubble Card** is closed

**Control the display of bubble cards**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1e1f0b91c4ac43bd8d7ab0f2d05b82ed~tplv-uwbnlip3yd-image.image)

## Copywriting Guide

- Since the bubble card floating layer is a lightweight container, it should be noted during use to avoid excessive complexity and variety of card content elements, causing visual burdens and affecting efficiency.

## Interactive behavior

**Mouse state**: The bubble card can be triggered by hovering, focusing and clicking.

1. Hover the mouse over the trigger container to exhale the bubble card, move the mouse out of the trigger container, and the bubble card disappears.

2. Click the trigger container with the mouse to exhale the bubble card, click the trigger container again with the mouse/click other areas of the page, the bubble card disappears.

3. Click the trigger container to exhale the bubble card, the content area of ​​the bubble card gets the focus/click on other areas of the page, the bubble card disappears.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ba23bed848504b8b8a63edcc85625825~tplv-uwbnlip3yd-image.image)

## Associated Components

[Button](/react/components/button)

[Tooltip](/react/components/tooltip)
