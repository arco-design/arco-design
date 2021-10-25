`````
Component / Data Display

# Table

Used for data collection, display, analysis, and processing.
`````

*Auto translate by google.*

## Basic attributes

### Component definition

A table is a structured display of information in the form of rows and columns; it is convenient for users to view and analyze data.

### Component composition

1. **Header (must have **): Indicate the information category of this column. You can also place some sorting, filtering and other operation buttons in the header.
2. **Cell (required)**: The main body of the table consists of multiple cells, and the cells support text, icons, buttons, labels, radio boxes, check boxes and other elements.
3. **Line and column dividing line (not necessarily **): Separate information visually.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/578da9d60e314bf1aa02314a8c2ce78d~tplv-uwbnlip3yd-image.image)

### Component type

| Type | Description |
| ------- | ----------------------------- |
| Basic table | Consists of headers and cells, without other expansion operations, the most basic display of data. |
| Fixed row table | Used to display incomplete scenes at a fixed table height. A scroll bar appears to be previewed by sliding. |
| Fixed column + row table | Used to fix important information columns and rows, you can slide up and down, left and right to view other content information. |
| Single-selection/multiple-selection form | Single-selection/multiple-selection is possible for the form. |
| Expandable table | Table rows can be expanded to show more information. |
| Tree table | When the data information has a clear hierarchical relationship, you can use the tree table. |

1. Basic form:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/103105bf50024ce78443b214513b4722~tplv-uwbnlip3yd-image.image)

2. Fixed row table:

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/43ddc8d74e4541aca2ca3b1ba7f1532a~tplv-uwbnlip3yd-image.image)

3. Fixed row + list grid

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d21a28de79764e928b09daa999947e6a~tplv-uwbnlip3yd-image.image)

4. Single/multiple selection form

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7dbe7bc6fdc4480ab18c4f79d31267a5~tplv-uwbnlip3yd-image.image)

5. Expandable table

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5cfe5b8f6d054172aefcbb26b1972b17~tplv-uwbnlip3yd-image.image)

6. Tree Table

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eb93c9f1b39a4a0b91ac86e2105da738~tplv-uwbnlip3yd-image.image)

## When to use

1. **When data needs to be displayed**: When there is a large amount of structured data that needs to be displayed, tables can be used to display the data in an orderly manner, which is more conducive to users' acquisition of data.
2. **When you need to perform complex operations on the data**: When you need to sort, search, filter and other operations on the data, you can use the table component to facilitate the operation on the data.
3. **When data needs to be compared, summarized and classified**: When data needs to be compared, summarized, classified, etc., table components can be used to make it easy to compare information and facilitate users to quickly query the differences. And change, association and difference.

## When not to use

- **In the case of separate options and corresponding options:** When the separate options correspond to options, a list component can be used instead of a table component.

## Layout

1. Complex global operations are generally at the head of the table, such as filtering, sorting, searching, etc.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/228539d036854fc8bb84ddcd136b2f3b~tplv-uwbnlip3yd-image.image)

2. Splitting method: no dividing line, dividing line, zebra crossing, etc.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fde23c37bf684a279286648022f5b53b~tplv-uwbnlip3yd-image.image)

## Copywriting Guide

1. **High legibility:** The text description in the form should be as short as possible and highly legible;
1. **Direct**: directly describe the information without adding decorative words;

## Interactive behavior

1. In the table, you can check and interact through single-select boxes and multiple-select boxes;
2. If the information in the form is editable, click to interact with it;
3. When the table information is still loading, the feedback of loading animation can be displayed.

## Associated Components

[List](/react/components/list)

[Icon](/react/components/icon)
