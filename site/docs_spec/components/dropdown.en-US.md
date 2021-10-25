`````
Component / Navigation

# Dropdown

When there are too many commands, the alternative commands can be stored in the floating container that expands downward.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Collapse alternative commands or menus into a floating container that expands downward.

### Component composition

1. **Menu item (required):** The menu item is to convey the content or operation currently selected by the user.
2. **Drop-down items (optional):** Display other menu items.
3. **Search (optional):** Search allows users to quickly find alternative menu items.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cbc72a54138443b7aebe8060fc95f7f2~tplv-uwbnlip3yd-image.image)

### Component type

From the style of menu items and drop-down items to classify:

1. **Menu item type**: Divided into 1. Text-type menu items and 2. Button-type menu items.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/73a7e2287bfc43fca3e049fce7900808~tplv-uwbnlip3yd-image.image)

2. **Drop-down item type**: Divided into 1. Text drop-down item, 2. Left icon drop-down item, 3. Right icon drop-down item.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3661fd6999be44c5b01ddca7b1041b27~tplv-uwbnlip3yd-image.image)

From the purpose of classification, it can be divided into: basic drop-down menu, multi-level drop-down menu, grouped drop-down menu, and search drop-down menu.

1. **Basic drop-down menu**

The basic drop-down menu looks very similar to a text input field, and the user can click on it to open a menu. Menu items can be composed of icons + text labels.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3a3f2c9150aa49c0b2cfbf4adc358aaf~tplv-uwbnlip3yd-image.image)

2. **Multi-level drop-down menu**

When there are multiple levels of operation commands, they float on the parent level and display the commands of the children.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6bdc12441862416fa016830dc63b9b26~tplv-uwbnlip3yd-image.image)

3. **Group drop-down menu**

When there are more than 10 commands in the drop-down menu, or scroll bars appear in the floating layer, it is recommended to classify the commands. You can directly use the dividing line to classify, if the scene needs to clearly group the category, you can add the group title

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/2c630a50b11c4aebbda3aaa98e9c28c9~tplv-uwbnlip3yd-image.image)

4. **Dropdown menu with search**

When there are more than 25 operation commands, it is recommended to support the search function to quickly find the specified related content.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f2b1058203e34b379fe62a8588fefe8d~tplv-uwbnlip3yd-image.image)

### Component status

The status of the pull-down menu includes 1. Menu status and 2. Option status.

It is divided into several states, such as default, hovering, click, and disabled; among them, the menu disabled means that the user cannot activate, the menu is grayed out and the user cannot click; the option disabled means that the option cannot be clicked, but does not affect the entire option. Choose a situation. The font of the disabled option is grayed out, and there will be no Hover status in the disabled option.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e81681d0f919453d84f56f2000841b10~tplv-uwbnlip3yd-image.image)

## When to use

The drop-down menu is often used to filter or sort the content on the page. You can set the style according to your needs. The main usage scenarios are in the navigation, tool menu, and part of the operation set.

1. **In the navigation menu**: Through the drop-down menu, product navigation can be grouped and placed together.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/384543828e484ef39518a607f4700b78~tplv-uwbnlip3yd-image.image)

2. **In the Tools menu**: The toolbar is presented by using the drop-down menu.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1450dbd309f74f69bb8c986d6735eb04~tplv-uwbnlip3yd-image.image)

3. **In some operation sets**: For example, in the operation area of ​​a table, a drop-down menu is often used to group multiple operations together.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/223bd2948893455f922fbd3090cfbe56~tplv-uwbnlip3yd-image.image)

## When not to use

1. If there are two options to choose from, it is best not to use the drop-down menu. In this case, it is recommended to use a radio button.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4acbc62f79fb4bcbbe23784cf0ea9b96~tplv-uwbnlip3yd-image.image)

2. It is not recommended to nest drop-down lists or use them to display overly complex information. Make the selection of options as straightforward as possible.

## Layout

**Eject direction**

The drop-down panel in the drop-down menu supports specifying 6 pop-up orientations. They are: up, top left, top right, bottom (default), bottom left, bottom right.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c74d51f4077e4d37aa9c836940bb2f68~tplv-uwbnlip3yd-image.image)

## Copywriting Guide

1. The operation commands displayed in the drop-down menu should be relevant.
2. It is recommended that the text label in the drop-down menu does not exceed 6 Chinese characters.

## Interactive behavior

Supports floating and clicking two trigger methods to activate the drop-down floating layer.

1. **Mouse hovering trigger**: After moving into the drop-down menu area, the drop-down floating layer expands. When the user removes the mouse or clicks on other areas of the page or retracts the arrow, the drop-down floating layer is closed.
2. **Triggered by mouse click (left/right click)**: The user can click the mouse to expand the drop-down menu.

## Associated Components

[Selector](/react/components/select)

The difference is that Select is used for selection, while Dropdown is a collection of commands.
