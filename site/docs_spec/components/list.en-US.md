`````
Component / Data Display

# List

The most basic list display, which can carry text/pictures/paragraphs, and is often used in the data display page.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

A list is a group of text or graphics, which can contain icon buttons or text buttons to aggregate the same type of content.

### Component composition

1. **Image elements (optional)**: such as icons/pictures, to help users locate the information they need to find more easily;
2. **Body content (required)**: main content, the text can be displayed in one or more lines;
3. **Action button (optional)**: icon button or text button to operate on the contents of this row;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0bd187d471fae53bb9ac1494ee8834ad.png~tplv-uwbnlip3yd-webp.webp)

### Component type

| Type | Description |
| ------ | ------------------------------- |
| 1. Basic list | Suitable for general abbreviated content, including avatars, titles, texts, buttons |
| 2. Module list | A list suitable for rich content, with more pictures and texts. At this time, the button can be placed below the content for easy display |
| 3. Grid list | A list suitable for short text, which can be displayed in multiple columns for better use of space |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1506accb91fc0bedb3091a4ed2e311ef.png~tplv-uwbnlip3yd-webp.webp)

### Component size

The list is divided into three sizes, the column heights are 40px, 48px, and 56px, which can be selected according to business needs.

### Component status

**Loading method**: Divided into **rolling loading, clicking button loading, pagination loading**

| Type | Description |
| -------- | ---------------------------------------- --- |
| 1. Scroll loading | Suitable for information flow pages, more information can be loaded without manual operation by the user, allowing users to be immersed in the content for continuous browsing |
| 2. Click the button to load | Suitable for information flow pages, requiring users to manually load more information, allowing users to be immersed in the content for continuous browsing |
| 3. Pagination loading | Suitable for background operation management, which is convenient for fast page turning and query of content long ago |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a86cd0262d02423b16f4e434e7176ef5.png~tplv-uwbnlip3yd-webp.webp)

## When to use

Aggregate similar information content for quick browsing and query

## When not to use

1. When the list contains multiple types of content and requires complicated background classification, filtering and management, it is recommended to use **table** instead of **list**.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/85fb8a5fa3ec2b53a1af818bad389516.png~tplv-uwbnlip3yd-webp.webp)

2. When the list is more prominent "category" rather than "specific content itself", and similar content has a clear category title, it is recommended to use **fold panel** instead of **list**.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a067c3cc5112f21110f5cb4e12c547ec.png~tplv-uwbnlip3yd-webp.webp)

## Layout

Important information in the list is placed on the left, and secondary information is placed on the right.

## Copywriting Guide

1. The title of the list should be as short and clear as possible, and the title should not exceed one line;
2. If the copy is truncated (for example, the ellipsis is used after three lines), use the text bubble to display the entire content after the mouse is hovered;
3. If the list contains action buttons, avoid the button text being too long and avoid more than three buttons; if the business requires multiple buttons, the secondary buttons can be collapsed.

## Associated Components

[Collapse](/react/components/collapse)

[Table](/react/components/table)
