`````
Component / Feedback

# Drawer

A floating layer that slides in from the edge of the screen.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

The drawer is a drawer-like panel that slides out from one side of the screen, which covers part of the screen content when called out.

### Component composition

1. **Title (Required)**: Plain text title;
2. **Body ((Required)**: It can contain text descriptions, forms, tables, step bars, and notifications;
3. **Action button (optional)**: Generally there are two buttons (usually "OK, Cancel");
4. **Cross (optional)**: Click to close the pop-up window;
5. **Black mask (optional)**: The black mask covers the entire page, and the content of the page below the mask does not respond to scrolling and clicking;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0e330263e7d14ed4a211b08ac861637f~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| ------- | --------------------------------------- |
| Basic drawer | Supports information display or entry, usually with a black overlay |
| Help Tips Drawer | For example, help center, information details view, if you need to view it in conjunction with the page content at this time, it does not have a black mask. |

### Component size

The height of the drawer is one screen, and the width cannot exceed one screen

### Component status

1. **Click on the black mask**: The drawer for displaying general information can be closed by clicking the black mask, but if it is the drawer for information entry, it is not recommended to click the black mask to close the dialog, which may cause the data to be filled in. The loss.
2. **Display of overflow content**: If the text content exceeds the maximum height of the drawer, the content part can respond to vertical scrolling, and the title and action buttons remain fixed when scrolling. The contents of the drawer cannot support horizontal scrolling.
3. **Secondary Jump in Drawer**: Drawer stacking method can be used, or enter the second page in the current drawer, after entering the second page, a "breadcrumb/return button" is required to support returning to the first level page.

## When to use

1. **Display auxiliary information**: Display auxiliary information based on page content.
2. **Information quick input**: Enter the quick input of information without interrupting the current process.

## When not to use

When there is too little content in the drawer and no high-frequency operation is required, it is recommended to use **Dialog** instead of **Drawer**.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/241ab4cf3d844aa18601f69fef692665~tplv-uwbnlip3yd-image.image)

## Layout

1. The **position** of the drawer supports four positions "up, down, left, and right". It is recommended to use a unified position within the same business;
2. **Title** in the drawer is aligned to the left;
3. The **action buttons** in the drawer are aligned to the right.

## Copywriting Guide

1. **Title** should be short and use a combination of verbs and nouns to clearly describe the task or purpose.
2. The **text** should only contain content related to the completion of the current task. If you need to include reference documents such as "PDF", please include it as a link in the modal body.
3. **Action button** Use descriptive words for operations such as adding, deleting, and saving, and avoid using fuzzy words.

## Associated Components

[Modal](/react/components/modal)
