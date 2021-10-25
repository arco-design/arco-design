`````
DesignLab

# Guideline

Arco Design Lab is a design system configuration platform aimed at improving design and development efficiency. By assisting companies to build a personalized design system to help companies better manage the design system and improve the efficiency of the entire process of product design.
`````

*Auto translate by google.*

## Preface

The style configuration platform provides a series of particle variables. These particle variables are defined here, whether you use it or not, it has nothing to do with what component library you use. In other words: the platform is the source of all style variables, and the Arco component library is just the best practice for these style variables. Other component libraries can also write their own component styles based on these style variables. If you still don’t understand, you can recall this passage after experiencing the platform functions~

## Highlight

1. Complete enterprise-level design system plan
1. WYSIWYG pleasant configuration experience
1. Collaborative design language easily maintains unity
1. Release the system to generate a complete set of code packages intelligently

Users only need to customize the design system template provided by the platform, and release the design system after completing the relevant configuration. The platform will intelligently generate a code package and it can be put into production immediately.

## Just a few steps, easy to get started

### Create a design system with one click

In [Platform Home Page](https://arco.design/themes), you can quickly create your own design system, which is displayed as the design style of Arco Design by default.

If you see your favorite design system in the system list, you can also use **one-click copy** in the operation menu to create your own design system based on this.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ee4f22faa9994671b8f192317d391e03~tplv-uwbnlip3yd-image.image)

### Style configuration

As shown in the sidebar of the figure above, the style configuration is mainly divided into two parts: the basic style and the component style.

- #### Basic style

**Basic style: When the configuration of the basic style is modified, it has a strong influence on the global style.**

The basic style mainly includes a series of particle variables defined in the Arco Design design system, such as color, font, size, etc. It is a set of specifications agreed by design students and front-end students. As basic variables, they are referenced by basic components such as Button and Checkbox. Basic components such as Checkbox and Button are part of complex components such as Modal and Tree. Therefore, the modification of the basic variables will directly affect the design style of all components.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5ade3de2854b4ad5965a3738d9d38589~tplv-uwbnlip3yd-image.image)

The basic style on the configuration page supports the configuration of colors, fonts, borders, shadows, and sizes. And you can click the preview button in the upper right corner of the page to call up the preview page and see your configuration effect in real time.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/70bb3fe82ea142a6bcfef2f4217191c0~tplv-uwbnlip3yd-image.image)

ArcoDesign defaults to the component sizes as mini(24px), small(28px), default(32px), large(36px). If you need to modify the global size, you can directly modify the relevant configuration of the component size in the `Size` menu to quickly achieve the desired effect.

- #### Component style configuration

Fine-grained customization of the style of individual components.

Take `Input` as an example:

The default Input is a flat design with a gray background and no borders. Select the example, you can modify its background color and border color in the right configuration panel to adjust the visual standard.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f2d859b8c344dc3b5bb4d9e61b3ae44~tplv-uwbnlip3yd-image.image)

### Developer Mode

Although the configuration platform provides a wealth of configuration items, there are always some requirements that cannot be achieved through configuration items. In the configuration panel, you can click the button in the upper right corner to enter the developer mode, and write the `less` code in the pop-up editor to achieve style coverage. **Because it involves code writing, it is recommended that the R&D students can modify it. **

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8313ab1e0cc844ec8329b0b5c1149638~tplv-uwbnlip3yd-image.image)

### How to use in the project

After the configuration is complete, click the publish button in the upper right corner to configure the relevant information in the pop-up publishing pop-up window, and execute the publishing process to publish the theme configuration to `npm`. How to apply the theme configuration to the business project can be viewed: [How to use theme package in project](/docs/designlab/use-theme-package)

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4cf6a94e67c9491f80587fc406c087c7~tplv-uwbnlip3yd-image.image)
