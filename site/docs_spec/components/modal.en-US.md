`````
Component / Feedback

# Modal

Open a floating layer on the current page to carry related operations.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

The dialog box is used for key information entry or information confirmation. When the dialog box is called out, the user's current task process will be interrupted, so please use the dialog box carefully to avoid excessive interference to the user.

Dialog boxes are usually used for tasks that are quick and do not require frequent operations, such as "rename".

### Component composition

1. **Title (required)**: It can be plain text, or it can have an icon before the text to indicate the status;
2. **Body (optional)**: It can contain text descriptions, forms, tables, step bars, and notifications;
3. **Action button (optional)**: Notification pop-ups generally contain only two buttons, and confirmation or information entry pop-ups generally contain two buttons (usually "OK, Cancel");
4. **Close button** **(optional)**: Click to close the pop-up window;
5. **Black mask (required)**: The black mask covers the entire page, and the content of the page below the mask does not respond to scrolling and clicking.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/69e5ca3d265c4248bdd0289243815a1f~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| ------- | ---------------------------- |
| Function dialog | Support information display or input |
| Confirmation dialog box | Often used for secondary confirmation of delete operations to prevent irreversible data loss |
| Message prompt dialog box | Used for status prompts, including four states of "general information, success, warning, and error" |

- Function dialog

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/64f16a3d03a742768baee1aad92c1f52~tplv-uwbnlip3yd-image.image)

- Confirmation dialog

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fac15e55a1c84b9b8b23ddd9e9e2f22a~tplv-uwbnlip3yd-image.image)

- Message prompt dialog

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3a907a31a98a49e4972af09451f7a217~tplv-uwbnlip3yd-image.image)

**Function dialog box** supports information display or input, and components such as **warning tips**, **tabs, step bars, and data shuttle boxes** can be added to the default form. **

- Warning notice

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/468e59d5f0d84ae4891d96460d1d62b6~tplv-uwbnlip3yd-image.image)

- Bookmark page

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ee7dfd7e8eda4b99b54e6e6a282df15c~tplv-uwbnlip3yd-image.image)

- Step bar

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e37af3eaa8a2499ba2d75872401ada25~tplv-uwbnlip3yd-image.image)

- Data shuttle box

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/76dbf7e88f9647d4a90f5eda0d68c2a4~tplv-uwbnlip3yd-image.image)

### Component size

- There are 3 types of dialog sizes, which are small size (fixed width is 400px), medium size (fixed width is 520px), and large size (fixed width is 720px).
- The dialog box has a limited width and adapts to the height according to the content. The maximum height cannot exceed one screen.

### Component status

1. **Click on the black mask**: The dialog box for general information display can be closed by clicking on the black mask. Fill in the loss of data.
2. **Display of overflow content**: If the text content exceeds the maximum height of the dialog box, the content part can respond to vertical scrolling, and the title and action buttons remain fixed when scrolling. The content of the dialog box cannot support horizontal scrolling.

## When to use

1. **Require immediate response from the user**: Use a dialog box to request to prevent the user from continuing;
2. **Notify user of emergency information**: Use a dialog box to notify users of emergency information about their current tasks, usually used to report system errors or inform results;
3. **Confirm user's decision**: Use the dialog box to confirm the user's decision and clearly describe the potential consequences that the current behavior may cause. If the behavior is destructive or irreversible, use an error warning color.

## When not to use

1. When there is too much content in the dialog box, complicated operations are needed, or even a second jump is required, it is recommended to use **Drawer** or **New Page** instead of **Dialog**.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/81c9fe53dfcb4f43b8fb2437f441a65a~tplv-uwbnlip3yd-image.image)

2. When used for frequent confirmation operations, it is recommended to use **bubble confirmation box** instead of **dialog box**, because the mouse operation line of the **bubble confirmation box** is shorter, which is convenient for users to perform multiple operations.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/483c17a77a33491bb275f50f925a705a~tplv-uwbnlip3yd-image.image)

3. When closing the dialog box requires a second confirmation, it is recommended to use **bubble confirmation box** instead of **superimposed dialog** for "second confirmation".

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1fc49c4ef0974732b1427dbaa00a9abd~tplv-uwbnlip3yd-image.image)

## Layout

1. **Position** of the dialog box supports center or top display. It is recommended to use a unified position within the same business;
2. **Title** in the dialog box supports left or center alignment. It is recommended to use a uniform alignment in the same business;
3. The **action button** in the dialog box supports right or center alignment. It is recommended to use a uniform alignment in the same business;
4. When the dialog box "Loading" and "Loading complete", the **height** should be the same to avoid the size and position jump.

## Copywriting Guide

1. **Title** should be short and use a combination of verbs and nouns to clearly describe the task or purpose.
2. The **text** should only contain content related to the completion of the current task. If you need to include reference documents such as "PDF", please include it as a link in the modal body.
3. **Action button** Use descriptive words for operations such as adding, deleting, and saving, and avoid using fuzzy words.

## Associated Components

[Drawer](/react/components/drawer)

[Popconfirm](/react/components/popconfirm)
