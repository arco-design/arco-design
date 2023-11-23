`````
Component / Layout

# Layout

The basic layout framework which is often nested with components to build the overall layout of the page.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

The basic layout framework of the page is often nested with components to form the overall layout of the page.

### Component composition

1. **Top navigation** **(optional)**: Components and elements can be nested, often used with logo/label/input box/button/avatar, etc.
2. **Sidebar (optional)**: Components and elements can be nested. Tree selectors/input boxes are often used with them.
3. **Content part (required)**: Components and elements can be nested, and are often used in conjunction with cards/folding panels/empty status/lists/numerical displays/tabs, etc.
4. **Bottom of the page (optional)**: Components and elements can be nested, often used in conjunction with a dividing line, etc.

### Component type

| Components | Description |
| -------- | ---------------------------------------- ----------------------------------- |
| 1. Up and down layout | Generally, it is the display area of ​​the top main navigation and the lower column content. The structure of the upper and lower levels conforms to the user's habit of browsing up and down, and the information display efficiency of the main work area is higher. |
| 2. "T"-shaped layout | The upper part is the top navigation, and the lower part is the side navigation and content display area, which is a common page layout form in the volcano engine. |
| 3. Top, middle and bottom layout | Generally the top main navigation and page title bar area, content display area, often used for content display of secondary subpages |
| 4. Comprehensive layout | Applicable to more complex business product layouts, providing more display module areas, with different forms of structured content display, in addition to the top navigation, fixed side navigation, and middle content area, a fixed area is added to the right Expand the content display area. |

- **Top and bottom layout**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/781c526eebd04c9483c4ae00db187268~tplv-uwbnlip3yd-image.image)

- **"T-shaped" layout**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f4f12fb660ab46daa39e6bee637e6c67~tplv-uwbnlip3yd-image.image)

- **Top, Middle and Bottom Layout**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5959d8e03f9d4ef3af8029d6eecc56a4~tplv-uwbnlip3yd-image.image)

- **Comprehensive layout**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b087ef649c4d403b90751c0158ac491f~tplv-uwbnlip3yd-image.image)

## When to use

1. Use different elements to form the page layout according to different business scenarios

**Custom Sidebar**: Flexible layout, strong maneuverability (mostly used for functional pages, operation buttons can be placed in side navigation or top navigation

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6704b44ba5a940e6bb3eab866a1eaeae~tplv-uwbnlip3yd-image.image)

**Scalable sidebar**: The size of the sidebar can be controlled by the mouse, the layout is flexible, and the user can customize it (mostly used for sidebars with longer text and more levels)

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/2aec7f6685ed4722b6aa89276f0cf7dd~tplv-uwbnlip3yd-image.image)

2. **The top navigation should not be too high, and the sidebar should not be too wide**

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5eed0ebceaee4e8b88a2bd9ccef668b8~tplv-uwbnlip3yd-image.image)

## Layout

- When the system hierarchy is simple and the number of functions is small, you can use the top navigation menu for "up and down layout". The overall visual movement is simple and suitable for information display systems.

- When the system hierarchy is simple but the number of functions is large, you can use the side navigation menu for "left-right layout". The vertical arrangement can display more menu items.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/35cf8c64da984d69902e11e0cea3e85d~tplv-uwbnlip3yd-image.image)

## Copywriting suggestions

1. The navigation needs to provide clear guidance on the target location. Generally, the current location is highlighted by using the background color of the color block, bold font, and highlight.

2. It is recommended to use dark navigation when using the global dark theme

## Related components

[Menu](/react/components/menu)
