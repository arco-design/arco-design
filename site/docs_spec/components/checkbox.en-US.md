`````
Component / Data Entry

# Checkbox

In a set of data, the user can select one or more data through the Checkbox.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

When there are multiple options to choose from in the list, and the options are not mutually exclusive, check box components can be used.

### Component composition

The check box component consists of a check box and a check box label.

| **Composition** | **Description** |
| ------- | -------------- |
| 1. Check box | Show current status |
| 2. Checkbox label | Describe the information you want to select or deselect |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/89120cf95ad84a368db73c7dfb11bea9~tplv-uwbnlip3yd-image.image)

### Component status

- Including **unselected, focused, selected, and disabled** four states. Disabled is divided into **unselected disabled state and selected disabled state. **
- The default state of the check box is that no option is selected.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/967339027c0c445d883108837288cd79~tplv-uwbnlip3yd-image.image)

## When to use

If multiple options can be selected from the list, check boxes should be used.

- **Filtering or batch processing operations** Used to filter data in pages and menus, and perform batch operations
- **Terms and conditions level** Turn the checkbox on or off to indicate whether the user agrees to these terms.

## When not to use

- When only one option is allowed in the list, use the radio button
- For settings that take effect immediately after the user changes, use the switch

## Component layout

**Alignment**

If there is a grouping checkbox, it can be arranged horizontally or vertically.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d5ac48b1282349d48e16fa02d29fd828~tplv-uwbnlip3yd-image.image)

For long text labels that need to be wrapped, the check box is always aligned with the top of the text label.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ff02c2f991074e5698b63b7a2009ccb0~tplv-uwbnlip3yd-image.image)

**Checkbox group**

Check boxes can have a parent-child relationship with other check boxes

- After selecting the parent option, all child checkboxes are selected
- If the parent checkbox is not checked, all child checkboxes are not checked
- If some (but not all) child checkboxes are selected, the parent checkbox becomes an indeterminate checkbox

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6b0735bf0b4c4d3b94d5a62ffa63646a~tplv-uwbnlip3yd-image.image)

## Interactive behavior

**Mouse Status**: The user can click the check box and the check box label to trigger the target option.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4ac56ebe27d9475ca16fb61915114e9e~tplv-uwbnlip3yd-image.image)

## Associated components

[Radio](/react/components/radio)

[Switch](/react/components/switch)
