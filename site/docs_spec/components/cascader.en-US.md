`````
Component / Data Entry

# Cascader

Display options in a multi-level cascading dropdown component.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Cascading selection means that when the number of Select options in the selector is large, the options are separated by multi-level classification to facilitate user selection.

### Component composition

| Components | Description |
| ---------- | ------------------------------------- |
| 1. Selector (required) | It can only support selection, or it can support direct search options and select |
| 2. Drop-down panel (required) | There are multiple levels of menus in the same floating level. When each level is selected, the results of the options need to be fed back to the selector |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e661c194c2b4435b9e92bffb49bb8e54~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| --------- | --------------------------------------- ----------- |
| 1. Cascade selector single selection | Hover or click on the parent to pop up the options of the child; in the first case, you can select the last child to complete the selection, and in the second case, you can select the parent option to complete the selection |
| 2. Multi-select cascade selector | Multiple options can be checked, and the checked options are fed back to the input box in the form of labels |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e87847604daf485780f03a6469e38a89~tplv-uwbnlip3yd-image.image)

On the basis of the above classification, additional functions can be added, such as: search options and select.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fc6a6cd6c1f94cdd9b57864414d0a3f3~tplv-uwbnlip3yd-image.image)

### Component size

To set size, you can use selectors of four sizes (mini, small, default, large), the heights correspond to 24px, 28px, 32px, 36px.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3dc7df91cc6847e7938b88207c3f8cec~tplv-uwbnlip3yd-image.image)

### Component status

1. **Common status:** Default, Hover, Active

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4521d47864d246c497a727f63ab8ea23~tplv-uwbnlip3yd-image.image)

2. **Move into and expand**: Move into and expand the lower-level menu, click to complete the selection

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3421ce27395148d087cdf14bb00d5686~tplv-uwbnlip3yd-image.image)

3. **Dynamic loading options:** If there is a network delay, etc., you can use the dynamic icon to display the loading options

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/02cfb1edf43f49099c3f712df869f02d~tplv-uwbnlip3yd-image.image)

4. **Options disabled: ** The disabled options are grayed out, and the disabled icon appears when the mouse is hovered over the disabled options

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9d54a9cf244c4aa397912fbefb4080a3~tplv-uwbnlip3yd-image.image)

## When to use

1. You need to choose from a set of related data sets, such as provinces, municipalities, company levels, classifications of things, etc.;
2. When selecting from a larger data set, use multi-level classification to separate it for easy selection;
3. Compared with the **Select selector** component, the selection can be completed in the same floating layer, which has a better experience;

## Layout

The top of the drop-down panel is aligned, and the different levels of the panel maintain the same height to maintain the consistency and smoothness of the operation

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cede3d9ff25845b09c1e6bea6dc3630a~tplv-uwbnlip3yd-image.image)

## Copywriting Guide

**The level must be in line with conventional cognition:** For example, address selection can be classified by provinces, cities, and districts.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d2a9dca4a966464db4368b07dfb76d88~tplv-uwbnlip3yd-image.image)

## Associated Components

[Dropdown](/react/components/dropdown)

[Select](/react/components/select)
