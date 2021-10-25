`````
Component / Data Feedback

# Popconfirm

A simple confirmation box of an action.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Click the trigger and a bubble confirmation box will pop up.

### Component composition

It is composed of 1. flip-flop and 2. floating layer.

| **Composition** | **Description** |
| ------ | ----------------------------- |
| Trigger | Clicking on the trigger will evoke a bubble confirmation box, and the trigger is usually a button or link |
| Floating layer | The floating layer is a confirmation box container, which contains prompt text and operations that require user confirmation |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d6a2400d3ba54b5fb2d1d4c5a8edcf09~tplv-uwbnlip3yd-image.image)

### Component type

- **Different pop-up positions**

In order to display the floating layer as close to the middle of the screen as possible, the display position of the floating layer can be selected according to the position of the trigger on the screen. There are 12 directions: upper left, upper, upper right; lower left, lower, lower right; upper left, left, lower left, upper right, right, and lower right.

- **Custom icon**

The icon in front of the confirmation box can be selected according to the context of the prompt text in the confirmation box. When the confirmation operation is at risk, the icon with a warning can be selected to attract the user's attention.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7f638feb74b6429eb338464184010bd5~tplv-uwbnlip3yd-image.image)

### Component size

The bubble confirmation box is a lightweight feedback method with relatively little content. In use, the width of the floating layer will expand with the content response. In order to prevent the floating layer from being too wide and out of proportion, the content should be set to wrap width. It is recommended to control the width of the floating layer within 320px.

## When to use

The bubble confirmation box is mainly used for the second confirmation operation. For the second confirmation of the more conventional dialog box, the bubble confirmation box is lighter in form, less interference, and the control opening and closing methods are more convenient.

## When not to use

When there is a risk in the operation, a dialog box should be used to draw the user's attention and give the user appropriate resistance to the operation.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0e75ef6c31bf4d9a84a871b1f71a4e82~tplv-uwbnlip3yd-image.image)

## Associated components

[Modal](/react/components/modal)

[Popover](/react/components/popover)
