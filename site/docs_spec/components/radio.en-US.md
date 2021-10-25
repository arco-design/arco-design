`````
Component / Data Entry

# Radio

In a set of related and mutually exclusive data, the user can only select one option.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Choose an option from a set of mutually exclusive options.

### Component composition

The radio button component is composed of a group of clickable option buttons. The text label in the option button is located on the right side of the radio button.

1. **Title text (optional):** Describe the option group or provide a selection guide.
2. **Radio button (required):** The button is usually a circle, representing data input and task setting. By default, an option is selected to indicate the current status.
3. **Option text label (required):** Describe the information to be selected or deselected. In addition to the description, it can also be used as an operation hot zone. When the user clicks on the label, the corresponding radio button will be selected.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ed860f026f4f496197523e4ceb6ac2a3~tplv-uwbnlip3yd-image.image)

### Component type

The types of radio buttons include: 1. Basic type, 2. Plain text type, 3. Button type, 4. Icon combination type.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7bbc905e3ba24e0dbc60e920bf2d79fd~tplv-uwbnlip3yd-image.image)

### Component status

The state of the radio button component is divided into: selectable state, focus state and disabled state.

1. Optional: Contains the default options and the currently selected items. After clicking other options, the current options will be cancelled;
2. Focus state: the state when the frame is focused;
3. Disabled state: Including unchecked disabling and selected disabling.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c988ef36b6f84418a4f3fbd7e3dc47af~tplv-uwbnlip3yd-image.image)

## When to use

1. Only 1 option from a set of options is allowed: It is often used to change from one setting to another in a menu, page or component, and the radio button component is placed on the whole page, modal pop-up window or expanded panel In the form.
2. All options need to be displayed visually, when comparing between options.

## When not to use

1. If the user can select multiple options from the list, it is recommended to use the check box.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b4bfe3cca4eb46efb9459db02110b556~tplv-uwbnlip3yd-image.image)

2. The number of options in the radio button is generally between 2-5. When the number of options is particularly large, it is recommended to use the selector or drop-down menu to display.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4760e5d28af44764b220b2214caa1d2d~tplv-uwbnlip3yd-image.image)

## Component layout

### Arrangement

The radio button components can be arranged horizontally or vertically according to the structure, and the text label generally appears on the right side of the radio button input.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/023196fd46d4413c949695ff40faec2b~tplv-uwbnlip3yd-image.image)

### Text overflow

When the text label is too long, it is allowed to wrap to the second line. It is not recommended to truncate the radio button label text with ellipsis, and the text should be left-aligned on the right side of the radio button, and the selection control should be aligned with the top of the text label.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dc3f231c936b4769831e8c6262ce2981~tplv-uwbnlip3yd-image.image)

## Copywriting Guide

1. It is recommended to use clear and concise text labels to clearly state the results that will appear after selecting the option.
2. The length of the text labels should be approximately equal.
3. If you need the unselected state, it is recommended to consider adding the "None" option.

## Interactive behavior

### Default selection

In a group of radio buttons, you can set a default option, this option should be the most likely to be selected or the safest option.

When the user selects a new item, the previous selection will be automatically deselected.

### Trigger form

1. **Mouse:** The user can directly click the radio button to input or click the radio button label to trigger the item.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f9c69bc2615e4dd1a9b136c6a28a4dd5~tplv-uwbnlip3yd-image.image)

2. **Keyboard:** The user can switch between radio button input by pressing the up or down arrow key. When the marquee input has the focus, the user can press Space to trigger the change of state.

## Associated Components

[Checkbox](/react/components/checkbox)

[Switch](/react/components/switch)

[Select](/react/components/select)
