`````
Component / Data Entry

# Select

When users need to select one or more from a group of similar data, they can use Select to click and select the corresponding item.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Used to select one or more values ​​in a set of options, often used in form filling and data filtering.

### Component composition

It is composed of 1. text label, 2. selection box, 3. drop-down panel, and 4. asterisk.

| **Composition** | **Description** |
| ------ | ------------------------------------------ -------------- |
| Text label | High-level summary of option content |
| Selection box | A container for the selected options and also a trigger for the drop-down panel |
| Drop-down panel | A container that holds all options, and the height of the drop-down panel can be controlled according to the number of options. When the options are too much to scroll, it is recommended to display 50% of the height of the last menu item |
| Asterisk | Indicate that the entry is required, generally located on the left side of the text label |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c8f887fd4ed64fb584baa87c9f845307~tplv-uwbnlip3yd-image.image)

### Component type

It can be divided into 1. basic selector, 2. multiple selection selector, 3. no border, 3 types.

| **Type** | **Description** |
| ------ | ---------------------- |
| Basic selector | The simplest selector, generally only supports selecting one option |
| Multiple selection selector | Allow users to select multiple options from a list |
| No border | A selector type that weakens the concept of a select box, and has a more concise and compact style |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/77b7a675052f45a9a791695bba88029a~tplv-uwbnlip3yd-image.image)

In practical applications, the function of the selector can be expanded on the basis of the above component types, such as 1. Menu grouping, 2. Search, 3 can be cleared.

| **Attribute** | **Description** |
| ------ | ----------------------------- |
| Menu grouping | If there are too many options, you can use categories to organize the options for users to choose |
| Search | If the user is familiar with the option data, the search function can be used to quickly locate the target option |
| Can be cleared | When there is a value in the selection box, you can use the clear button to cancel the selection |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/303d43f61a79480698d26311f2112d1b~tplv-uwbnlip3yd-image.image)

### Component size

The selector can be divided into 4 sizes: 1. Mini size (24px), 2. Small size (28px), 3. Medium size (32px), 4. Large size (36px).

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/71b5c5bf37414199a49a39887dbc230c~tplv-uwbnlip3yd-image.image)

## When to use

Mainly used for form filling (entry) and attribute selection (filtering) scenarios.

- **Form Filling**

In the form filling scenario, because only legal options are displayed in the drop-down panel, the use of selectors can prevent users from entering incorrect data. Several key points in use:

| **Key Points** | **Explanation** |
| ------ | ----------------------------------- |
| Use asterisks reasonably | When all the items in the form are basically required, you can omit the display of asterisks to avoid interference to users due to too many asterisks |
| Placeholder text | Keep the dark prompts concise and avoid using the dark prompts as an auxiliary description for the selector |
| Selection box width | The selection box width should be defined according to the option length, a metaphor for the content of the drop-down box |

- **Attribute selection**

Users can select a value from the menu, often with information blocks such as lists and tables as information filtering.

## When not to use

The advantage of the drop-down menu is to hide the content of the options, keep the main interface concise, avoid confusion, and at the same time use selection instead of input to improve user efficiency. When the actual scene does not reflect the above two advantages, it is not recommended to use the drop-down menu, which is also the basis for our reasonable selection of controls.

- **Avoid using selectors to carry too few options**

When the number of menus is small, it is recommended to directly use the selection box to spread on the main interface to reduce the user's operation step. It is recommended to use marquee tiles when there are less than 5.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/817699c64f1d44e2b175f8985a2e1930~tplv-uwbnlip3yd-image.image)

- **Avoid using selectors to store data that is very familiar and simple to users**

For example, the user’s date of birth, month or year, etc., using the selector may bring more work to the user.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7253cc7b4ea7486dbcae9222590a848a~tplv-uwbnlip3yd-image.image)

## Layout

There are two main layout methods inside the selector, 1. The label and the selection box are laid out up and down, 2. The label and the selection box are laid out on the left and right.

| **Type** | **Description** |
| ------ | ---------------------------------------- |
| Top and bottom layout | Suitable for long text labels or use in English scenes, the disadvantage is that the visual movement lines are more complicated |
| Left and right layout | The more common layout method, the visual movement line is simpler, the disadvantage is that it is easy to cause waste of horizontal space and cause the form to be too long |

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/37eb0fbacea94171ba238120afc72d48~tplv-uwbnlip3yd-image.image)

## Associated components

[Dropdown](/react/components/dropdown)

[Checkbox](/react/components/checkbox)

[Radio](/react/components/radio)
