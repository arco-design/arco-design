`````
Component / Navigation

# Menu

A component to organize, arrange, and display a list of options.
`````

## Basic Properties

### Component Definition

Menus are the main form of navigation in the system, and users can access target functions through menus.

### Component Composition

The menu consists of 1. text labels, 2. icons (optional).

| Constituent elements | Description |
| :---- | :---- |
| Text Tags | The text label is the main element of the menu, indicating the functional module to which the menu item is linked |
| Icons | Icons can assist in illustrating text labels, and graphical representations can increase the efficiency of user identification of menu items |
![组件构成](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b07890ee2f3965fe30daf69b8d61f67e.png~tplv-uwbnlip3yd-png.png)

### Component Type

The menu is divided into 1. top navigation menu, 2. side navigation menu, 3. buoy button menu.

| Component Type       | Description                                                                                                                                  |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| Top navigation menu  | Appears as a page level navigation, commonly used in information display class website                                                       |
| Side navigation menu | Can be used with the top navigation menu as a secondary menu, or as a primary menu on its own                                                |
| Float button menu    | Use the form of buoys to carry functions, generally located in the lower right corner of the page, suitable for carrying auxiliary functions |

![组件类型](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/2d489e5eebdb656248ca5bfe3215924c.png~tplv-uwbnlip3yd-png.png)

### Component Size

The width of the side navigation can be defined according to the length of the text label in the actual business. The common ones are 200PX, 220PX, 240PX, 260PX.

### Component Status

Default, hover, active, disabled 4 states; default, hover, active 3 states must be presented; when the menu item is inaccessible due to permission or system reasons, the disabled state can be used.

![组件状态](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5854cd228febcac2ac6ec2cf6199a65b.png~tplv-uwbnlip3yd-png.png)

---

## When to use

When the system has more functions, the navigation menu can be used to organize and split the functions to help users recognize the overall functions of the product more quickly and make it easy for them to find the target content quickly.

### Usage Scenarios

| Component Type                   | Description                                                                                                                                                                                                                  | Figure legend                                                                                                         |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| Top navigation menu              | When the system level is simple and the number of functions is small, the top navigation menu can be used for the "top and bottom layout". This is a simple overall visual layout, suitable for information display systems. | ![图例1](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d535ca3bcfe8239c0a911176231f21c5.png~tplv-uwbnlip3yd-png.png) |
| Side navigation menu             | When the system has a simple hierarchy but a large number of functions, you can use the side navigation menu for "left-right layout". The vertical arrangement allows for more menu items to be displayed.                   | ![图例2](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7ba838c5d8302c6e4ca9e1c5e69972bb.png~tplv-uwbnlip3yd-png.png) |
| Top Guide Menu & Side Guide Menu | When the system has a simple hierarchy but a large number of functions, you can use the side navigation menu for "left-right layout". The vertical arrangement allows for more menu items to be displayed.                   | ![图例3](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/25298e65510c5f7dfd32f8668f063341.png~tplv-uwbnlip3yd-png.png) |
| Float button menu                | The buoy button menu is suitable for carrying auxiliary functions, without affecting the user's access to the main functions, to ensure the user's demand for convenient use of auxiliary functions                          | ![图例4](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/279522b449c57107fb7cf506747643f3.png~tplv-uwbnlip3yd-png.png) |

### Principles of use

**Keep the menu flat**
A flat hierarchy allows more features to be exposed to users first, thus increasing the efficiency of reaching information and reducing operation steps.

**Control the number of menu items**
According to Miller's Law, the average user can remember 5-9 items. And too many items will increase the user's selection time, too many menu items will also make the user feel intimidated by the system's extensive content.

---

## When not to use

Navigation menus are suitable for system-level functional navigation and should not be used in the content and functional organization of sub-modules, which should use tabbed components for information navigation.

---

## Copywriting Guide

Text tags need to clearly summarize the content of the module and should use concise terms, such as "Home", "Discover", "Wallet", etc.

---

## Associated Components

[Tabs](/react/components/tabs)
