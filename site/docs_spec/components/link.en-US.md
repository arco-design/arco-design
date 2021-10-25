`````
Component / General

# Link

Basic style of link.
`````

## Basic Properties

### Component definition

A link is a text with navigation properties, which jumps to a certain page when clicked.

### Component composition

The link component consists of text labels and icons.

| Constituent elements | Description                                                       |
| :------------------- | :---------------------------------------------------------------- |
| 1.Icon (optional)    | Use icons to convey more meaning.                                 |
| 2.Text label         | Concisely, clearly and accurately convey the content of the link. |

![1.2 链接构成](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ac4531836396c269b96e4d996b7df0b9.png~tplv-uwbnlip3yd-png.png)

### Component status

**1.Link status**：failure, warning, and success;
**2.Link interaction status**：Default, hover, active, and disabled；
The three states of default, hover, and click must be presented;
In the disabled state, the designer can choose to use it according to specific scenarios.

![1.3 链接状态](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/132b43cf9f5a3b99b9b2107d7cc77c70.png~tplv-uwbnlip3yd-png.png)

## When to use

When to use: Use links when you want users to do the following:

- Jump to other pages in the system
- Open a completely different site
- Jump to other elements on the same page

#### Scenes to be used

**As a standalone link**

Independent links cannot use them in sentences or paragraphs. A standalone link can be combined with an icon. The icon is placed next to the link, and the icon always uses the same color as the link text.
![2.1 使用场景](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3efb4591eb28e1c41f93fa99fffb2b34.png~tplv-uwbnlip3yd-png.png)

**Inline link level**

Inline links are used in sentences or text paragraphs. The default is blue, which helps to distinguish it from the text next to it and allows users to interact with it clearly. The interactive behavior of embedded links is the same as that of independent links. Embedded links are not used alone or in combination with icons.

![2.1 使用场景-英文](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3f883a23d2fae527800ea7721268f41e.png~tplv-uwbnlip3yd-png.png)

---

## When not to use

When not to use: If you trigger an operation or change the state on the current page, you should use the Buttons instead of Links.

---

## Interactive behavior

**Mouse state**：The user can trigger the link by clicking the link text with the mouse. The mouse in the hovering state turns into a smaller hand, and the mouse in the disabled state turns into a circle slash.

---

## Associated components

[Button](/react/components/button)
[Breadcrumb](/react/components/breadcrumb)
