`````
ArcoDesign

# Style Guideline

In-depth design details from all style aspects.
`````

## Color

Color has a very important influence on the visual communication of products and the carrying of multi-dimensional information. Good products should clearly and accurately convey effective information and brand sense in terms of color configuration. According to different color types and functions, arco divides colors into primary colors, neutral colors, functional colors and mask colors.

### Primary color

The primary color is the representative color of a product, and is generally associated with the brand color. Commonly used for primary buttons and text, key operation status, highlight reminder, empty status, etc. The default primary color of arco is #165DFF, and at the same time, according to the different use scenes, the colors in different states such as click state and floating state are derived based on the primary color.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a748591ee8ab424fb92b2d43bf40677e~tplv-uwbnlip3yd-image.image)

In order to meet the color requirements of more different products as much as possible, arco provides 13 common primary colors, and based on the primary colors, [13 sets of basic color palettes] (/react/docs/palette) are derived through dynamic gradient color algorithms. react/docs/palette). At the same time, we also support users to use [Color Configuration Tool](/palette/list) to configure color palettes suitable for their products.

### Neutral colors

Neutral colors, also known as achromatic colors, can harmonize color matching in the product interface, set off the primary color and other colors, and at the same time help to open up the content level, so that users can focus more on the content. Commonly used for elements such as text, background, icons, borders, and dividing lines. Based on past business experience, arco provides neutral reference colors suitable for lines, fills and text.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bd2a4520b36d49d6b2f4be7f4ae7496e~tplv-uwbnlip3yd-image.image)

### Functional color

The main function of functional color is to clearly convey information and status of success, warning, error, link, etc. to users. Based on users' general knowledge of colors, arco provides functional colors and matching color palettes suitable for different states.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/74b3a2095f254d21a0992c9f367f7078~tplv-uwbnlip3yd-image.image)

### Mask color

The mask color is often used as the background color to highlight the modal window. Generally, black and white are used as the base color and used in conjunction with the transparency percentage. The default mask color of arco is #1D2129, and the transparency is 60%.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/d400ce6b21d04e1983c423622085998a~tplv-uwbnlip3yd-image.image)

## Word

Text is one of the important information transmission elements, and its own visual characteristics and quality affect the quality of information transmission and the efficiency of product operation. Based on past product design experience, arco provides general font, word weight, line height, and paragraph spacing suggestions.

### Font

Users understand content and complete work through words, and a scientific font system should have good readability. The sans serif font is more friendly, modern, clear and easy to read. It is the font type commonly used in web pages, so arco prefers to use the default sans serif fonts in each system.

| **Chinese Fonts** | Mac OS-system | PingFang SC |
| ------------- | --------------- | ----------- |
| Window | Microsoft Yahei | |
| **English Font** | Mac OS-system | Nunito |
| Window | Nunito | |
| **Number Font** | Regular Numbers | Nunito |
| Special Number | Byte Number | |

|  | Mac OS-system   | Window-system |
| ------------- | --------------- | ----------- |
|  **Chinese Fonts**       | PingFang SC | Microsoft Yahei |
| **English Font**      | Nunito      | Nunito          |
| **Number Font**      | Regular: Nunito . Special Number: Byte Number           | Regular: Nunito . Special Number: Byte Number      |

At the same time, considering the actual use of the business and the stability of different platforms, a set of alternate fonts is provided.

```
@font-family: 'nunito_for_arco', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',

  'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
```

### Font size

The size, level, contrast, etc. of the text are all important factors that affect the visual readability and reading efficiency. To ensure the legibility of the text, the interface text must meet the following requirements:

- Minimum recognizable text size: 12px
- Font level: distinguish the main and sub-level of the text, the font size gap should be kept 2-4px
- Do not have too many font levels in a product. It is recommended to choose between 3-5 types. For text information that requires users' attention, it can be highlighted by increasing the font weight.

Considering the versatility and inclusiveness of arco, in the choice of font size, we define the main font size as 14px, and provide different levels of font size to meet the display needs of different information levels.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/db5b5a47727a464f81e4818ada13a67d~tplv-uwbnlip3yd-image.image)

### Line height

In the current general recommendation, the basic line height of the Western language is about 1.2 times the font size. Because Chinese characters are dense and consistent in height, there is no ascender and descender in Western languages ​​to create gaps between the lines. Therefore, the line height generally needs to be larger. It is divided according to the reading population (children, young people, old people). People), can reach 1.5 to 2 times or even greater. The default row height of arco is 1.4 times.

### Font weight

Different weights of the same font can convey different information weights and emotions. Thin fonts give people a delicate and brisk feeling, while bold fonts give people an emphasis and serious perception. Therefore, it is very important to use the appropriate font weight for the appropriate scene. In most cases, the two font weights Regular and Medium are used, corresponding to 400 and 500 in the code respectively. In the case of bold English or digital fonts, the font weight of semibold will be used, which corresponds to 600 in the code. In some special scenes, the font weight of Light will be used, which corresponds to 300 in the code.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/68c8456911d84fe19771908d9a8a2956~tplv-uwbnlip3yd-image.image)

### Paragraph spacing

The readability of the text in a paragraph text is determined by the variables of font size, line height and paragraph spacing. In content with more text, there needs to be a certain distance between paragraphs to ensure the best display effect. According to the AAA standard in WCAG, paragraph spacing is at least 1.5 times the font size. The text size of 14px corresponds to a paragraph spacing of 21px.

## shadow

In the interface, we often use shadows to simulate the physical hierarchical relationship between elements. Clear and natural shadows can help users quickly understand the spatial relationship of elements in the interface, and understand the content of the interface more clearly.

Different shadow heights can represent different element levels. Arco defines four basic shadow heights to adapt to the commonly used element levels on the page. The default shadow of low-level elements (such as cards, etc.) can use primary shadows, and regular interaction operations such as hover states can use secondary shadows, which need to be highlighted and represent the uppermost elements in the space (such as drop-down menus, modal boxes) Etc.) Three-level and four-level shadows can be used.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6f3296e4825249e296b9c8ea8ca40c55~tplv-uwbnlip3yd-image.image)

## Copywriting style

The style of the copywriting affects the efficiency and accuracy of information transmission in the interface. The style of the Chinese version of the interface should conform to the corresponding text specifications, and be concise, clear and consistent in expression. Based on Chinese and English copywriting specifications and past business experience, arco summarized the common copywriting style suggestions in middle and back-end products.

### Date and Time

Time is a very commonly used data format in the interface. Arco recommends using a 24-hour system to avoid confusion and misunderstanding caused by inconsistent formats to the greatest extent.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f1b932205155433f9eb455d410077fba~tplv-uwbnlip3yd-image.image)

### Universal punctuation

Use  "..." as an ellipsis.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7146fda6cf3c4c148a47877e2f88c54e~tplv-uwbnlip3yd-image.image)

The dash should occupy two spaces for Chinese characters.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ab9ce77c2f64439fa06839a92fa04286~tplv-uwbnlip3yd-image.image)

Use "≤" to mean "less than or equal to".

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/74421766d8de4e899c79529bb39b072c~tplv-uwbnlip3yd-image.image)

The period (stop, comma, period, etc.), closing quotation mark, closing bracket, etc. cannot appear at the beginning of a line.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6278f43be4474ccaaf0d8c79da33f59a~tplv-uwbnlip3yd-image.image)

The opening quotation mark, opening bracket, opening double title number, etc. cannot appear at the end of a line.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/41949974fe524b3f85b857c0f2d34c15~tplv-uwbnlip3yd-image.image)

### English punctuation

A space is required after the comma, period and other labels.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1d7acf8e004b414e9464a2c68d0e3dc3~tplv-uwbnlip3yd-image.image)

Do not add spaces before the signs of degrees, percent signs and other symbols.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/914ed5a45ad641169c10c5bb49671a40~tplv-uwbnlip3yd-image.image)

No spaces should be added after symbols such as currency signs, positive and negative signs.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cc50836f86d544bc88faa3f89bc4fe07~tplv-uwbnlip3yd-image.image)

Add a space after symbols such as "at" signs (except e-mails), copyright signs, bullet points, etc.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/481c45515cec4a998209dcb8d21e0032~tplv-uwbnlip3yd-image.image)

Add spaces before and after the brackets and quotation marks, and there is no space in the middle.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/11158319359f4c898f090049c9571b11~tplv-uwbnlip3yd-image.image)

The hyphen (-) combines two related words into one word.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/7548a66aff31445ab08d7ec762dc88a6~tplv-uwbnlip3yd-image.image)

The full-width connection number (—) often indicates an interruption, turning point, or explanation of the article.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6f27e138dee0457f98d3be0bd9552f96~tplv-uwbnlip3yd-image.image)

### Chinese and English typesetting rules

A space must be added between Chinese and English.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/209990b4a6444f77bebe80e75afdb498~tplv-uwbnlip3yd-image.image)

Add a space between Chinese and the link.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/5e4ca3b1017541358b8259ca98c78c85~tplv-uwbnlip3yd-image.image)

Use the correct abbreviation.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/66b1914dfa4447788b58c8ff8ec9835b~tplv-uwbnlip3yd-image.image)

There should be no spaces between full-width punctuation and English or numbers.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9f9498ef4d4c478d8f751687d06dbacd~tplv-uwbnlip3yd-image.image)

Use half-width punctuation when you encounter complete English sentences.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ea1667e785e4205aa819cf78c1e2df4~tplv-uwbnlip3yd-image.image)

### number

Boundary conditions: If there are constantly changing numbers in the copy, the boundary conditions should be considered.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/faad3b5da3214f3faa03d812e75a2a0f~tplv-uwbnlip3yd-image.image)

Chinese character numbers: When it is necessary to highlight the solemn and elegant expression effect, Chinese character numbers should be used.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e8698b7b77e24d2a98512e2859879bc5~tplv-uwbnlip3yd-image.image)

Number subsections: For easier reading, integers or decimals with more than four digits should be subdivided using a thousand mark: the whole number is divided into three digits in groups, divided by ",", and the decimal part is not divided into sections. Integers up to four digits (including four digits) may not be divided into sections.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/2ef34ebf7771429790357902d552f003~tplv-uwbnlip3yd-image.image)

Numerical value range: When expressing the numerical value range, a wave-shaped connection number "~" or a word line connection number "—" can be used. When the additional symbols or measurement units of the two previous values ​​are the same, the additional symbol or measurement unit of the previous value can be omitted without causing ambiguity.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/51f9f21996f4422abce9231f942c74fb~tplv-uwbnlip3yd-image.image)

A space is required between the Chinese and the number, but there is no need to add a space for numbers that do not express quantitative information such as "Line 7" and "3D printing".

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9da0015fabf74304a89c6b21be2ba79f~tplv-uwbnlip3yd-image.image)

## Principles of terminology

The language in the interface should follow 5 main principles: unified vocabulary, correct grammar, refined copywriting, easy-to-understand, and language-friendly.

### Unified vocabulary

The vocabulary used to describe the same thing in different scenarios needs to be unified.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e427572c9c4d46728a81ca9c2364be95~tplv-uwbnlip3yd-image.image)

The page entry copy and the secondary page Title copy should be related and not unrelated.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/bc0ca7e1e131410faefa216a95dbd35d~tplv-uwbnlip3yd-image.image)

### The syntax is correct

Statistical copywriting format: number + unit + verb/noun.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6af8b1a3854d47f8a5168b2727534505~tplv-uwbnlip3yd-image.image)

Operational copywriting format: verb + noun.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0aa15c6c04c84036b35e4018589f86e5~tplv-uwbnlip3yd-image.image)

### Copywriting refinement

Simplify sentences and reduce the burden on users to understand.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c310d02cbec8497ebfecea334ceb9f82~tplv-uwbnlip3yd-image.image)

Avoid colloquialism.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/dae1f41bd58f49f9a97fd3ef165ece94~tplv-uwbnlip3yd-image.image)

### Easy to understand

When an error is reported, inform the user of the reason.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0bad1bffa0e4473b851e1e624afbe075~tplv-uwbnlip3yd-image.image)

Use language familiar to users and avoid unintelligible terms.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6ab450468f404d6ead9328353b5806ee~tplv-uwbnlip3yd-image.image)

### Language friendly

Use personal pronouns correctly: Do not use the honorific name "you" and gender-ambiguous pronouns.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ac3c6f0c222e4a31a4927149626c40a5~tplv-uwbnlip3yd-image.image)

By default, avoid using "Don't", "Can't", and "Don't".

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40b1de64e26445b9b04d27964870001b~tplv-uwbnlip3yd-image.image)

Avoid using too absolute statements, which will make users feel uncomfortable.

![](https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e78b11cca3f54c1caae500e34bfe3380~tplv-uwbnlip3yd-image.image)
