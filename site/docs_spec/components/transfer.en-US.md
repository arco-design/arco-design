`````
Component / Data Entry

# Transfer

A two-column multi-select component that moves elements from one column to another in real time.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

The two-column multi-selection component is divided into candidate area and selected area, allowing users to instantly move data from one column to another in an intuitive way to complete the interactive behavior of selecting or removing data.

### Component composition

1. **To be selected box (required)**: The container on the left side of the component, used to carry the list of data to be selected;
2. **Check box (required)**: The container on the right side of the component, used to hold the selected data list
3. **Data list (required)**: The data content in the to-be-selected box and the selected box. The content format can be multiple selection, tree selection and table according to different scenarios;
4. **Select button (required)**: The button located between the to-be-selected box and the selected box. After selecting data in the to-be-selected box, click this button to select the selected item to the selected box;
5. **Delete button (required)**: Check the secondary button next to the data in the box, click to delete the corresponding data;
6. **Cancel button (optional)**: The button located between the to-be-selected box and the selected box. After selecting data in the selected box, click this button to undo the selection back to the to-be-selected box;
7. **Header inside the box (optional)**: The area at the top of the to-be-selected box and the selected box. This area has a title, all options, and a counter according to the content that can be included in different scenarios;
8. **Footer in the box (optional)**: The area at the bottom of the to-be-selected and selected boxes. This area includes a pager, reset button, and clear button according to the content that can be included in different scenarios;

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/df2826a981bd4a91a3fbc7ff2f25db71~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| ----- | ------------------------------- |
| Two-way shuttle box | Supports data exchange between to-be-selected and selected boxes, which is the default form of data shuttle. |
| One-way shuttle box | Only the data in the to-be-selected box can be selected to the selected box. |

1. Two-way shuttle frame:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8b97ee5d2bc04a318484966f9cc8100b~tplv-uwbnlip3yd-image.image)

2. One-way shuttle frame:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9b586edeee3f4e6f996d65f34be8d6ae~tplv-uwbnlip3yd-image.image)

### Component size

1. The size of the data shuttle box is determined according to the number of data and the page layout. By default, 5 data options are displayed at a time. The to-be-selected box and the selected box need to maintain the same height and length;
2. The length of the to-be-selected box and the selected box should ensure that the typical characters can be directly displayed;
3. The recommended text size is 14px, and the size can be increased or decreased as needed (not less than 12px is recommended), and a uniform size is recommended for the same business;

### Component status

The options are divided into different states according to the operation: default state, focus state, selected state, disabled state

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8ba7cefd992e48019f7bef085db2bfa4~tplv-uwbnlip3yd-image.image)

## When to use

1. **When you need a clearer display of the selected content**: The data shuttle box displays more option information in an intuitive way, which is convenient for users to understand the selected content in real time and increase the user's sense of certainty;
2. **In the formal task scenario**: Compared with the drop-down box selection and other forms, the data shuttle box is more solemn, which can reduce errors caused by information hiding, and is suitable for formal task scenarios such as approval;

## When not to use

1. **When the page location is limited**: Compared with the selector and tree selection, the data shuttle box occupies a larger page space. When the page location is limited, it is not recommended;
2. **When frequent selections are required**: The interactive form of the data shuttle box is more complicated. When users are required to make frequent selections, it is not recommended;

## Interactive behavior

The main interaction behaviors of the data shuttle box are as follows:

1. Select: After checking the data in the to-be-selected box, click the select button, and the selected data will be selected to the selected area. In simple mode, you can directly click the option to move;
2. Cancellation: Under the component type that supports two-way selection, after checking the data in the selected box, click the cancel button, and the selected data will be withdrawn to the to-be-selected box. In simple mode, you can directly click the option to cancel;
3. Movement sequence: When the scene requires it, it can support drag and drop the data list to move in sequence;

## Associated Components

[Select](/react/components/select)

[TreeSelect](/react/components/tree-select)
