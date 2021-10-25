`````
Component / Layout

# Grid

Grid can effectively ensure the consistency and logic of the page, strengthen teamwork and unity.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

Grid can effectively ensure the consistency and logic of the page, strengthen teamwork and unity.

### Component composition

1. **Page width W**: Refers to the overall width of the page, represented by W.
2. **Number of grids A**: Refers to how many grids there are on the whole page.
3. **Number of water tanks B**: Refers to the number of spaces between the grids.
4. **Grid width C**: refers to the width of each grid (Column)
5. **sink width G**: refers to the width of each sink (Gutter)
6. **Margin**: refers to the distance between the first grid and the page border (Margin)

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/aceeb26b9c6745019a359207fc65e868~tplv-uwbnlip3yd-image.image)

### Component type

Can be adjusted according to the business scenario design side

There are currently two mainstream equal division methods: 12 equal division and 24 equal division

| Type | Description |
| -------- | --------------------------------- |
| 12-division grid system | The overall page is equally divided by 12 grids, which is suitable for middle and back-end page design with less business information grouping. |
| 24 equally divided grid system | The overall page is equally divided by 24 grids, which is suitable for page design with large amount of business information and complex scenes |

1. **12-division grid system**: It is widely used in the popular front-end development tool libraries Bootstrap and Foundation. It is suitable for middle and back-end page design with less business information grouping and larger volume of information in a single box.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c263adbaab194834a3bd030d101a8111~tplv-uwbnlip3yd-image.image)

2. **24 equally divided grid system**: It is suitable for the design of middle and backstage pages with a large amount of business information, more information groups, and a small volume of information in a single box; compared with 12 grid systems, 24 grid systems Changes are more flexible and more suitable for complex scene designs with diverse contents

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/23db1f1fa08042bcaa8265c2a2c1996f~tplv-uwbnlip3yd-image.image)

### Component size

1. **Grid Width**: It is recommended to select 8 as the atomic unit of the grid system for the grid size of the grid system. The current mainstream design screen resolution can be divisible by 8 in both the horizontal and vertical directions, and 8 is used as the minimum Atoms are adequately adapted.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/642155a43ac341fb8a48d51226eb0ab2~tplv-uwbnlip3yd-image.image)

2. **Sink width**: The value of the sink can be customized according to the business. For example, 8, 16, 24, 32, 40, etc. After practical experience, under normal circumstances, when the width of the sink is 24, the visual effect is the best.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/50db79aca9d84fffbe34b413cd16e709~tplv-uwbnlip3yd-image.image)

## When to use

1. **When board design and content layout**: The grid system can assist the designer to adjust the position and alignment of the content, which can make the content regular and orderly.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/72d86d2aaf424e0c9bfae464b0db14c3~tplv-uwbnlip3yd-image.image)

2. **Content elements should not be left in the sink**: Content elements should be aligned to the grid instead of the sink.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d667be8c4f9a4bd28a513a4722b9a1cf~tplv-uwbnlip3yd-image.image)

## When not to use

**Unconventional design**: There is no need to rigidly adhere to the traditional grid system, and it can be revised according to the design scenario.

## Layout

- **Box model**: Padding is the distance between the main content and the outside of the box (the main content can be a button, a piece of text, a picture or a table, etc.); Margin is the distance between two adjacent boxes, corresponding to The background grid system is the size of the sink.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5129496216db4296bfd965e644b38e2f~tplv-uwbnlip3yd-image.image)

- **Common grids**: Most portal websites and e-commerce websites on the market basically use 960 grids. The page width is 960px, 12 columns, each column is 60px, and the sink is 20.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/b593618525d54e0aac8f1db85b3904c1~tplv-uwbnlip3yd-image.image)
